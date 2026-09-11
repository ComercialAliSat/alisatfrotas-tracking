// -----------------------------------------------------------------------------
// Pipedrive webhook adapter.
//
// URL shape: /webhook/pipedrive/<PIPEDRIVE_WEBHOOK_SLUG>
// The per-recipient UUID stored in env.PIPEDRIVE_WEBHOOK_SLUG gates the endpoint.
//
// -----------------------------------------------------------------------------
// LIFECYCLE (Fase 1 — see ARCHITECTURE_V2_PLAN.md, Hop 8 in docs/data-flow.md)
// -----------------------------------------------------------------------------
//   open → won   : the only transition that fires ad-platform conversions.
//                  Meta CAPI + Google Ads uploadClickConversions, WITHOUT the
//                  real deal value — these platforms only learn "a sale
//                  happened", never the contract amount (explicit product
//                  decision). The real value is still stored internally in
//                  crm_deals.value and purchase_log.value.
//   * → lost      : internal bookkeeping only (crm_deals.status='lost',
//                  lost_reason, lost_at). Nothing is sent to Meta/Google.
//   lost → open   : bookkeeping only (crm_deals.reopened_at) — this covers a
//                  rep reopening the Deal directly inside Pipedrive. The
//                  *lead-initiated* reopen path lives in
//                  functions/outputs/pipedrive.js instead (it also calls the
//                  Pipedrive API to move the Deal, this handler only needs to
//                  reflect the resulting state).
//   won → open    : same bookkeeping-only handler as lost → open — a rep
//                  manually reopening a Won deal. won_at is deliberately
//                  preserved (never cleared): we still want to know this
//                  Deal was won at some point even though it's open again.
//                  No conversion is re-sent or reversed.
//   anything else : stage/value/pipeline bookkeeping only, never a lifecycle
//                  side effect (e.g. editing a Won deal's value later doesn't
//                  re-fire a conversion).
//
// Idempotency: every status transition is claimed with a single conditional
// UPSERT (`... ON CONFLICT DO UPDATE ... WHERE crm_deals.status != 'X'`). If
// Pipedrive redelivers the exact same webhook (its own retry-on-failure
// behavior), the second delivery's claim affects 0 rows and the handler
// returns early — Meta/Google are never called twice for the same Won.
//
// Out-of-order protection: the status check above is not enough on its own
// — it protects against a REDELIVERY of the same transition, but not
// against an OLDER transition arriving after a NEWER one already changed
// the status (e.g. a delayed "open→won" landing after a "won→lost" that
// happened moments later in Pipedrive but was delivered first). Every claim
// above ALSO compares Pipedrive's own `meta.timestamp_micro` (fallback:
// `meta.timestamp`, seconds) — a documented field in the v1 webhook
// envelope, see https://pipedrive.readme.io/docs/guide-for-webhooks —
// against `crm_deals.pipedrive_updated_at`, and only applies the claim if
// the incoming event is strictly newer. An older, out-of-order delivery is
// silently ignored: no status regression, no Meta/Google call. When
// neither timestamp field is present (shouldn't happen with a real
// Pipedrive delivery), the comparison is skipped and the pre-existing
// status-only check is the only guard.
//
// KNOWN TECH DEBT — "External conversion delivery retry": the claim above
// happens BEFORE we know whether the Meta/Google calls actually succeed. If
// both fail on the one attempt a Won gets, `crm_deals.status` is already
// `'won'`, so a Pipedrive redelivery of that same webhook is treated as an
// already-processed duplicate and will NOT retry the external send. This
// stack has no retry queue by design (see docs/architecture.md) — flagging
// this explicitly as a gap to revisit later, not fixing it in Fase 1.
//
// Required env vars:
//   PIPEDRIVE_WEBHOOK_SLUG              — UUID generated during deploy-stack
//   PIPEDRIVE_API_TOKEN                 — Pipedrive personal API token
//
// Optional env vars (same pattern as all other adapters):
//   META_PIXEL_ID, META_ACCESS_TOKEN, META_TEST_EVENT_CODE
//   GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_LOGIN_CUSTOMER_ID,
//   GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID,
//   GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN,
//   PIPEDRIVE_GOOGLE_ADS_CONVERSION_ACTION_ID
//   TIMEZONE_OFFSET (default -03:00)
//
// NOTE on "no value to Meta/Google": Meta's CAPI does not require
// custom_data.value/currency at the request-validation level — omitting them
// is a supported way to send a valueless Purchase signal. Google Ads'
// uploadClickConversions conversionValue field, however, is a plain
// protobuf/JSON double with no distinct "absent" state — omitting the key is
// wire-equivalent to sending 0.0. That is a platform limitation, not a choice
// made here; it's called out again at the call site below.
// -----------------------------------------------------------------------------

import { guardSlug } from '../_utils.js';

// Module-scope OAuth2 token cache — mirrors _core.js, kept local to avoid
// cross-module state coupling between the purchase and CRM pipelines.
let googleAdsTokenCache = { token: null, expiresAt: 0 };

// Out-of-order webhook protection. Pipedrive's v1 webhook envelope carries a
// documented `meta` object with `meta.timestamp` (unix seconds) and
// `meta.timestamp_micro` (microseconds) — see
// https://pipedrive.readme.io/docs/guide-for-webhooks. We use whichever is
// present (preferring the finer-grained one) to detect a delivery that
// describes an OLDER change than one we've already applied to crm_deals.
// Returns null when neither is present (malformed/test payload) — callers
// treat null as "no ordering info", falling back to the pre-existing
// status-only idempotency check.
function extractPipedriveTimestamp(meta) {
  if (!meta) return null;
  if (typeof meta.timestamp_micro === 'number') return meta.timestamp_micro;
  if (typeof meta.timestamp === 'number') return meta.timestamp * 1000000;
  return null;
}

export async function onRequestPost(context) {
  const { request, env, params } = context;

  const slugFailure = guardSlug(params.slug, env.PIPEDRIVE_WEBHOOK_SLUG);
  if (slugFailure) return slugFailure;

  try {
    const body = await request.json();

    if (body.event !== 'updated.deal') {
      return jsonResponse({ ok: true, skipped: 'not updated.deal', event: body.event });
    }

    const current = body.current || {};
    const previous = body.previous || {};
    const dealId = current.id;
    if (!dealId) {
      return jsonResponse({ ok: true, skipped: 'no deal id on payload' });
    }

    const now = Math.floor(Date.now() / 1000);
    const currStatus = current.status;   // 'open' | 'won' | 'lost'
    const prevStatus = previous.status;
    const incomingTs = extractPipedriveTimestamp(body.meta);

    if (!env.DB) {
      return jsonResponse({ ok: true, skipped: 'DB not configured', deal_id: String(dealId) });
    }

    if (currStatus === 'won' && prevStatus !== 'won') {
      return await handleWonTransition({ dealId, current, now, incomingTs, env, context });
    }

    if (currStatus === 'lost' && prevStatus !== 'lost') {
      return await handleLostTransition({ dealId, current, now, incomingTs, env });
    }

    if (currStatus === 'open' && (prevStatus === 'lost' || prevStatus === 'won')) {
      return await handleReopenedInPipedrive({ dealId, current, now, incomingTs, env });
    }

    return await handleBookkeepingOnly({ dealId, current, now, incomingTs, env });

  } catch (err) {
    console.error('Pipedrive webhook error:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// -----------------------------------------------------------------------------
// WON — the only transition that fires ad-platform conversions.
// -----------------------------------------------------------------------------
async function handleWonTransition({ dealId, current, now, incomingTs, env, context }) {
  const claim = await env.DB.prepare(`
    INSERT INTO crm_deals (deal_id, person_id, org_id, status, pipeline_id, stage_id, value, currency, won_at, pipedrive_updated_at, created_at, updated_at)
    VALUES (?, ?, ?, 'won', ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(deal_id) DO UPDATE SET
      status = 'won',
      pipeline_id = excluded.pipeline_id,
      stage_id = excluded.stage_id,
      value = excluded.value,
      currency = excluded.currency,
      won_at = excluded.won_at,
      pipedrive_updated_at = excluded.pipedrive_updated_at,
      updated_at = excluded.updated_at
    WHERE crm_deals.status != 'won'
      AND (? IS NULL OR crm_deals.pipedrive_updated_at IS NULL OR ? > crm_deals.pipedrive_updated_at)
  `).bind(
    dealId, current.person_id || null, normalizeOrgId(current.org_id),
    current.pipeline_id || null, current.stage_id || null,
    parseFloat(current.value) || 0, current.currency || 'BRL',
    now, incomingTs, now, now,
    incomingTs, incomingTs,
  ).run().catch(e => { console.error('crm_deals won-claim error:', e.message); return null; });

  if (!claim || !claim.meta || claim.meta.changes === 0) {
    // Duplicate delivery of a Won we already processed (or a concurrent
    // delivery that lost the race) — do not re-fire conversions.
    return jsonResponse({ ok: true, deal_id: String(dealId), skipped: 'won already processed' });
  }

  const personId = current.person_id;
  const email = personId ? await fetchPersonEmail(personId, env) : null;
  if (!email) {
    return jsonResponse({ ok: true, deal_id: String(dealId), skipped: 'no email for pipedrive person', event: 'won' });
  }

  // NOTE: `sessions` has never had gbraid/wbraid columns (only
  // checkout_sessions and purchase_log do — see migrations 0001/0002). The
  // pre-existing version of this query selected s.gbraid/s.wbraid anyway,
  // which made the whole SELECT throw "no such column" on every call —
  // caught by this try/catch, so sessionData silently stayed null and Won
  // conversions never carried fbp/fbc/gclid enrichment. Fixed here by only
  // selecting columns that actually exist on `sessions`; gbraid/wbraid
  // recovery for a Pipedrive Won simply isn't available via this email-based
  // lookup (there's no `trk` to join through checkout_sessions for a CRM
  // deal) — Google Ads fan-out below now correctly relies on gclid only.
  let sessionData = null;
  try {
    sessionData = await env.DB.prepare(`
      SELECT s.session_id, s.fbp, s.fbc, s.external_id,
             s.ip_address, s.user_agent, s.gclid,
             s.landing_url, s.utm_source, s.utm_medium, s.utm_campaign,
             s.utm_content, s.utm_term
      FROM event_log e
      JOIN sessions s ON e.session_id = s.session_id
      WHERE e.raw_email = ? AND e.session_id IS NOT NULL
      ORDER BY e.timestamp ASC
      LIMIT 1
    `).bind(email.toLowerCase().trim()).first();
  } catch (e) {
    console.error('Pipedrive D1 session lookup error:', e.message);
  }

  // Internal-only — never sent to Meta/Google (see module header).
  const internalValue = parseFloat(current.value) || 0;
  const internalCurrency = current.currency || 'BRL';

  const eventId = crypto.randomUUID();
  const eventTime = now;

  const hashedEm = await sha256(email);
  const hashedExternalId = sessionData?.external_id ? await sha256(sessionData.external_id) : '';

  const [metaResult, googleAdsResult] = await Promise.allSettled([
    sendToMeta({ sessionData, hashedEm, hashedExternalId, dealId, eventId, eventTime, env }),
    sendToGoogleAds({ sessionData, hashedEm, dealId, eventTime, env }),
  ]);

  let metaStatusCode = 0, metaResponseOk = 0, metaResponseBody = '', metaPayloadSent = null;
  if (metaResult.status === 'fulfilled' && metaResult.value) {
    const v = metaResult.value;
    metaPayloadSent = v.payload;
    if (v.skipped) {
      metaResponseBody = `skipped: ${v.skipped}`;
    } else if (v.response) {
      metaStatusCode = v.response.status;
      metaResponseOk = v.response.ok ? 1 : 0;
      try { metaResponseBody = await v.response.text(); } catch (e) { metaResponseBody = `Read error: ${e.message}`; }
    }
  } else if (metaResult.status === 'rejected') {
    metaResponseBody = `Fetch error: ${metaResult.reason?.message || 'unknown'}`;
  }

  let googleAdsStatusCode = 0, googleAdsResponseOk = 0, googleAdsResponseBody = '', googleAdsPayloadSent = null;
  if (googleAdsResult.status === 'fulfilled' && googleAdsResult.value) {
    const v = googleAdsResult.value;
    googleAdsPayloadSent = v.payload;
    if (v.skipped) {
      googleAdsResponseBody = `skipped: ${v.skipped}`;
    } else if (v.response) {
      googleAdsStatusCode = v.response.status;
      try { googleAdsResponseBody = await v.response.text(); } catch (e) { googleAdsResponseBody = `Read error: ${e.message}`; }
      if (v.response.ok) {
        let partialErr = null;
        try { partialErr = JSON.parse(googleAdsResponseBody)?.partialFailureError || null; } catch (_) {}
        googleAdsResponseOk = partialErr ? 0 : 1;
      }
    }
  } else if (googleAdsResult.status === 'rejected') {
    googleAdsResponseBody = `Fetch error: ${googleAdsResult.reason?.message || 'unknown'}`;
  }

  context.waitUntil(
    logToPurchaseLog({
      dealId, email, hashedEm, hashedExternalId, sessionData,
      value: internalValue, currency: internalCurrency, eventId, eventTime,
      metaStatusCode, metaResponseOk, metaResponseBody, metaPayloadSent,
      googleAdsStatusCode, googleAdsResponseOk, googleAdsResponseBody, googleAdsPayloadSent,
      env,
    })
  );

  return jsonResponse({ ok: true, event_id: eventId, deal_id: String(dealId), event: 'won' });
}

// -----------------------------------------------------------------------------
// LOST — internal bookkeeping only. Nothing sent to Meta/Google.
// -----------------------------------------------------------------------------
async function handleLostTransition({ dealId, current, now, incomingTs, env }) {
  const claim = await env.DB.prepare(`
    INSERT INTO crm_deals (deal_id, person_id, org_id, status, pipeline_id, stage_id, value, currency, lost_reason, lost_at, pipedrive_updated_at, created_at, updated_at)
    VALUES (?, ?, ?, 'lost', ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(deal_id) DO UPDATE SET
      status = 'lost',
      pipeline_id = excluded.pipeline_id,
      stage_id = excluded.stage_id,
      value = excluded.value,
      currency = excluded.currency,
      lost_reason = excluded.lost_reason,
      lost_at = excluded.lost_at,
      pipedrive_updated_at = excluded.pipedrive_updated_at,
      updated_at = excluded.updated_at
    WHERE crm_deals.status != 'lost'
      AND (? IS NULL OR crm_deals.pipedrive_updated_at IS NULL OR ? > crm_deals.pipedrive_updated_at)
  `).bind(
    dealId, current.person_id || null, normalizeOrgId(current.org_id),
    current.pipeline_id || null, current.stage_id || null,
    parseFloat(current.value) || 0, current.currency || 'BRL',
    current.lost_reason || null, now, incomingTs, now, now,
    incomingTs, incomingTs,
  ).run().catch(e => { console.error('crm_deals lost-claim error:', e.message); return null; });

  if (!claim || !claim.meta || claim.meta.changes === 0) {
    return jsonResponse({ ok: true, deal_id: String(dealId), skipped: 'lost already processed' });
  }

  return jsonResponse({ ok: true, deal_id: String(dealId), event: 'lost' });
}

// -----------------------------------------------------------------------------
// Reopened directly inside Pipedrive (not via outputs/pipedrive.js) — covers
// BOTH lost→open and won→open (e.g. a rep manually reopening a Won deal).
// Bookkeeping only: never fires Meta/Google, never creates a Deal, and
// deliberately does NOT touch won_at — we want to keep remembering that this
// Deal was won at some point even if it's open again right now. Pipedrive
// remains the source of truth for the current commercial status; this just
// mirrors it into crm_deals.
// -----------------------------------------------------------------------------
async function handleReopenedInPipedrive({ dealId, current, now, incomingTs, env }) {
  const claim = await env.DB.prepare(`
    INSERT INTO crm_deals (deal_id, person_id, org_id, status, pipeline_id, stage_id, value, currency, reopened_at, pipedrive_updated_at, created_at, updated_at)
    VALUES (?, ?, ?, 'open', ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(deal_id) DO UPDATE SET
      status = 'open',
      pipeline_id = excluded.pipeline_id,
      stage_id = excluded.stage_id,
      value = excluded.value,
      currency = excluded.currency,
      reopened_at = excluded.reopened_at,
      pipedrive_updated_at = excluded.pipedrive_updated_at,
      updated_at = excluded.updated_at
    WHERE crm_deals.status != 'open'
      AND (? IS NULL OR crm_deals.pipedrive_updated_at IS NULL OR ? > crm_deals.pipedrive_updated_at)
  `).bind(
    dealId, current.person_id || null, normalizeOrgId(current.org_id),
    current.pipeline_id || null, current.stage_id || null,
    parseFloat(current.value) || 0, current.currency || 'BRL',
    now, incomingTs, now, now,
    incomingTs, incomingTs,
  ).run().catch(e => { console.error('crm_deals reopen-claim error:', e.message); return null; });

  return jsonResponse({
    ok: true,
    deal_id: String(dealId),
    event: (claim && claim.meta && claim.meta.changes > 0) ? 'reopened' : 'no-op',
  });
}

// -----------------------------------------------------------------------------
// Any other change (stage move, value edit) with no status transition —
// keep bookkeeping fresh, never a lifecycle side effect.
// -----------------------------------------------------------------------------
async function handleBookkeepingOnly({ dealId, current, now, incomingTs, env }) {
  try {
    // No status-transition guard here (this path never changes status), but
    // we still gate on ordering so a stale, out-of-order bookkeeping update
    // can't overwrite pipeline_id/stage_id/value with older data — and so
    // the pipedrive_updated_at cursor itself only ever moves forward.
    await env.DB.prepare(`
      INSERT INTO crm_deals (deal_id, person_id, org_id, status, pipeline_id, stage_id, value, currency, pipedrive_updated_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET
        pipeline_id = excluded.pipeline_id,
        stage_id = excluded.stage_id,
        value = excluded.value,
        currency = excluded.currency,
        pipedrive_updated_at = excluded.pipedrive_updated_at,
        updated_at = excluded.updated_at
      WHERE ? IS NULL OR crm_deals.pipedrive_updated_at IS NULL OR ? > crm_deals.pipedrive_updated_at
    `).bind(
      dealId, current.person_id || null, normalizeOrgId(current.org_id),
      current.status || 'open', current.pipeline_id || null, current.stage_id || null,
      parseFloat(current.value) || 0, current.currency || 'BRL',
      incomingTs, now, now,
      incomingTs, incomingTs,
    ).run();
  } catch (e) {
    console.error('crm_deals bookkeeping error:', e.message);
  }
  return jsonResponse({ ok: true, deal_id: String(dealId), skipped: 'no lifecycle transition' });
}

function normalizeOrgId(orgId) {
  if (orgId == null) return null;
  if (typeof orgId === 'object') return orgId.value ?? null;
  return orgId;
}

// -----------------------------------------------------------------------------
// Fetch primary email from the Pipedrive Persons API.
// -----------------------------------------------------------------------------
async function fetchPersonEmail(personId, env) {
  if (!env.PIPEDRIVE_API_TOKEN) {
    console.error('Pipedrive: missing PIPEDRIVE_API_TOKEN');
    return null;
  }

  try {
    const resp = await fetch(
      `https://api.pipedrive.com/v1/persons/${personId}?api_token=${env.PIPEDRIVE_API_TOKEN}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (!resp.ok) {
      console.error('Pipedrive Persons API error:', resp.status);
      return null;
    }
    const data = await resp.json();
    const emails = data?.data?.email || [];
    const primary = emails.find(e => e.primary) || emails[0];
    return primary?.value || null;
  } catch (e) {
    console.error('Pipedrive Persons API fetch error:', e.message);
    return null;
  }
}

// -----------------------------------------------------------------------------
// META CAPI — Purchase signal, no value/currency (see module header note).
// -----------------------------------------------------------------------------
async function sendToMeta({ sessionData, hashedEm, hashedExternalId, dealId, eventId, eventTime, env }) {
  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
    return { skipped: 'missing meta env', payload: null, response: null };
  }

  const userData = {
    client_ip_address: sessionData?.ip_address || '',
    client_user_agent: sessionData?.user_agent || '',
  };
  if (hashedEm) userData.em = [hashedEm];
  if (hashedExternalId) userData.external_id = [hashedExternalId];
  if (sessionData?.fbp) userData.fbp = sessionData.fbp;
  if (sessionData?.fbc) userData.fbc = sessionData.fbc;

  const metaPayload = {
    data: [{
      event_name: 'Purchase',
      event_time: eventTime,
      event_id: eventId,
      event_source_url: sessionData?.landing_url || '',
      action_source: 'website',
      user_data: userData,
      // No `value`/`currency` — Meta only learns a sale occurred, per
      // product decision (see ARCHITECTURE_V2_PLAN.md §4 / module header).
      custom_data: {
        content_type: 'product',
        content_ids: [String(dealId)],
        num_items: 1,
      },
    }],
  };

  if (env.META_TEST_EVENT_CODE) {
    metaPayload.test_event_code = env.META_TEST_EVENT_CODE;
  }

  const payloadJson = JSON.stringify(metaPayload);
  const response = await fetch(
    `https://graph.facebook.com/v25.0/${env.META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payloadJson,
    }
  );
  return { payload: payloadJson, response };
}

// -----------------------------------------------------------------------------
// GOOGLE ADS — uploadClickConversions (v21 REST), no conversionValue.
//
// Google Ads' ClickConversion.conversion_value is a scalar double; the REST/
// JSON API has no way to represent "value absent" distinctly from "value is
// 0" for that field type — omitting the key and sending 0.0 are the exact
// same wire payload. That is a Google Ads API limitation, not a choice made
// here: the key is simply not included in the JSON body below.
// -----------------------------------------------------------------------------
async function getGoogleAdsAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (googleAdsTokenCache.token && googleAdsTokenCache.expiresAt > now + 30) {
    return googleAdsTokenCache.token;
  }

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: env.GOOGLE_ADS_CLIENT_ID,
      client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
    }),
  });

  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    console.error('Google Ads token refresh failed:', resp.status, errBody);
    return null;
  }

  const data = await resp.json();
  if (!data.access_token) {
    console.error('Google Ads token refresh: no access_token in response');
    return null;
  }

  googleAdsTokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in || 3600) - 60,
  };
  return data.access_token;
}

function formatConversionDateTime(unixSeconds, offsetString) {
  const tz = offsetString || '-03:00';
  const match = /^([+-])(\d{2}):(\d{2})$/.exec(tz);
  if (!match) {
    const d = new Date(unixSeconds * 1000);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ` +
      `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}+00:00`;
  }
  const sign = match[1] === '-' ? -1 : 1;
  const offsetSeconds = sign * (parseInt(match[2], 10) * 3600 + parseInt(match[3], 10) * 60);
  const shifted = new Date((unixSeconds + offsetSeconds) * 1000);
  const pad = n => String(n).padStart(2, '0');
  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(shifted.getUTCDate())} ` +
    `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}:${pad(shifted.getUTCSeconds())}${tz}`;
}

async function sendToGoogleAds({ sessionData, hashedEm, dealId, eventTime, env }) {
  if (!env.GOOGLE_ADS_CUSTOMER_ID || !env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ||
      !env.GOOGLE_ADS_DEVELOPER_TOKEN || !env.GOOGLE_ADS_CLIENT_ID ||
      !env.GOOGLE_ADS_CLIENT_SECRET || !env.GOOGLE_ADS_REFRESH_TOKEN) {
    return { skipped: 'missing google ads env', payload: null, response: null };
  }

  if (!env.PIPEDRIVE_GOOGLE_ADS_CONVERSION_ACTION_ID) {
    return { skipped: 'missing PIPEDRIVE_GOOGLE_ADS_CONVERSION_ACTION_ID', payload: null, response: null };
  }

  // Only gclid is recoverable via this email-based session lookup — see the
  // NOTE above the SELECT in handleWonTransition (sessions has no
  // gbraid/wbraid columns to recover in the first place).
  const gclid = sessionData?.gclid || '';
  if (!gclid) {
    return { skipped: 'no click id in session', payload: null, response: null };
  }

  const accessToken = await getGoogleAdsAccessToken(env);
  if (!accessToken) {
    return { skipped: 'oauth token unavailable', payload: null, response: null };
  }

  const customerId = String(env.GOOGLE_ADS_CUSTOMER_ID).replace(/-/g, '');
  const loginCustomerId = String(env.GOOGLE_ADS_LOGIN_CUSTOMER_ID).replace(/-/g, '');

  const conversion = {
    conversionAction: `customers/${customerId}/conversionActions/${env.PIPEDRIVE_GOOGLE_ADS_CONVERSION_ACTION_ID}`,
    conversionDateTime: formatConversionDateTime(eventTime, env.TIMEZONE_OFFSET),
    orderId: String(dealId),
    // No conversionValue/currencyCode — see module header + function comment.
  };
  conversion.gclid = gclid;

  if (hashedEm) {
    conversion.userIdentifiers = [{ hashedEmail: hashedEm }];
  }

  const body = {
    conversions: [conversion],
    partialFailure: true,
    validateOnly: false,
  };

  const payloadJson = JSON.stringify(body);
  const response = await fetch(
    `https://googleads.googleapis.com/v21/customers/${customerId}:uploadClickConversions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': env.GOOGLE_ADS_DEVELOPER_TOKEN,
        'login-customer-id': loginCustomerId,
        'Content-Type': 'application/json',
      },
      body: payloadJson,
    }
  );
  return { payload: payloadJson, response };
}

// -----------------------------------------------------------------------------
// D1 — Persist result to purchase_log for dashboard visibility. The real
// deal value IS stored here (internal bookkeeping) even though it was never
// sent to Meta/Google above.
// -----------------------------------------------------------------------------
async function logToPurchaseLog({
  dealId, email, hashedEm, hashedExternalId, sessionData,
  value, currency, eventId, eventTime,
  metaStatusCode, metaResponseOk, metaResponseBody, metaPayloadSent,
  googleAdsStatusCode, googleAdsResponseOk, googleAdsResponseBody, googleAdsPayloadSent,
  env,
}) {
  if (!env.DB) return;

  try {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO purchase_log (
        trk, event_id, event_time,
        raw_email, hashed_em, hashed_external_id,
        client_ip_address, client_user_agent, fbp, fbc,
        value, currency, transaction_id,
        event_source_url,
        meta_status_code, meta_response_ok, meta_response_body, meta_payload_sent,
        google_ads_status_code, google_ads_response_ok, google_ads_response_body, google_ads_payload_sent,
        gclid, gbraid, wbraid,
        utm_source, utm_medium, utm_campaign, utm_content, utm_term,
        product_id, product_name,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      `pipedrive_${dealId}`, eventId, eventTime,
      email, hashedEm, hashedExternalId,
      sessionData?.ip_address || '', sessionData?.user_agent || '',
      sessionData?.fbp || '', sessionData?.fbc || '',
      parseFloat(value) || 0, currency, String(dealId),
      sessionData?.landing_url || '',
      metaStatusCode, metaResponseOk, metaResponseBody, metaPayloadSent ?? null,
      googleAdsStatusCode, googleAdsResponseOk, googleAdsResponseBody, googleAdsPayloadSent ?? null,
      sessionData?.gclid || '', sessionData?.gbraid || '', sessionData?.wbraid || '',
      sessionData?.utm_source || '', sessionData?.utm_medium || '',
      sessionData?.utm_campaign || '', sessionData?.utm_content || '',
      sessionData?.utm_term || '',
      String(dealId), `Pipedrive Deal #${dealId}`,
      Math.floor(Date.now() / 1000)
    ).run();
  } catch (e) {
    console.error('Pipedrive D1 purchase_log error:', e.message);
  }
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
async function sha256(value) {
  if (!value) return '';
  const normalized = value.toLowerCase().trim();
  const encoded = new TextEncoder().encode(normalized);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

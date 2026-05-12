// -----------------------------------------------------------------------------
// Pipedrive webhook adapter.
//
// URL shape: /webhook/pipedrive/<PIPEDRIVE_WEBHOOK_SLUG>
// The per-recipient UUID stored in env.PIPEDRIVE_WEBHOOK_SLUG gates the endpoint.
//
// Platform specifics:
//   - Pipedrive fires `updated.deal` on any deal field change. We gate on
//     status transitioning to 'won' (current.status === 'won' &&
//     previous.status !== 'won') to avoid double-firing on unrelated edits.
//   - The deal's `person_id` is used to fetch the contact email via the
//     Pipedrive Persons REST API (requires env.PIPEDRIVE_API_TOKEN).
//   - Email is used to look up the earliest session in D1 that matches
//     event_log.raw_email → sessions, recovering fbp/fbc/gclid for enrichment.
//   - Fires Meta CAPI Purchase + Google Ads uploadClickConversions (v21).
//   - Logs to purchase_log with trk = 'pipedrive_<deal_id>' as a synthetic key
//     so the dashboard can display Pipedrive-sourced revenue alongside normal
//     platform purchases.
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
//   TIMEZONE_OFFSET (default -03:00), DEFAULT_COUNTRY_CODE (default 55)
// -----------------------------------------------------------------------------

import { guardSlug } from '../_utils.js';

// Module-scope OAuth2 token cache — mirrors _core.js, kept local to avoid
// cross-module state coupling between the purchase and CRM pipelines.
let googleAdsTokenCache = { token: null, expiresAt: 0 };

export async function onRequestPost(context) {
  const { request, env, params } = context;

  const slugFailure = guardSlug(params.slug, env.PIPEDRIVE_WEBHOOK_SLUG);
  if (slugFailure) return slugFailure;

  try {
    const body = await request.json();

    // Pipedrive sends updated.deal for every field change — filter early.
    if (body.event !== 'updated.deal') {
      return jsonResponse({ ok: true, skipped: 'not updated.deal', event: body.event });
    }

    const current = body.current || {};
    const previous = body.previous || {};

    // Only fire on the won transition. Editing a won deal should not re-fire.
    if (current.status !== 'won' || previous.status === 'won') {
      return jsonResponse({
        ok: true,
        skipped: 'not a won transition',
        current_status: current.status,
        previous_status: previous.status,
      });
    }

    const dealId = String(current.id || '');
    const personId = current.person_id;
    if (!personId) {
      return jsonResponse({ ok: true, skipped: 'no person_id on deal', deal_id: dealId });
    }

    // Fetch primary email from Pipedrive Persons API.
    const email = await fetchPersonEmail(personId, env);
    if (!email) {
      return jsonResponse({ ok: true, skipped: 'no email for pipedrive person', deal_id: dealId, person_id: personId });
    }

    // Recover earliest session linked to this email from D1.
    // event_log.raw_email stores the address exactly as submitted by the lead
    // form, so we normalize to lowercase before comparing.
    let sessionData = null;
    if (env.DB) {
      try {
        sessionData = await env.DB.prepare(`
          SELECT s.session_id, s.fbp, s.fbc, s.external_id,
                 s.ip_address, s.user_agent, s.gclid, s.gbraid, s.wbraid,
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
    }

    const value = parseFloat(current.value) || 0;
    const currency = current.currency || 'BRL';
    const eventId = crypto.randomUUID();
    const eventTime = Math.floor(Date.now() / 1000);

    const hashedEm = await sha256(email);
    const hashedExternalId = sessionData?.external_id ? await sha256(sessionData.external_id) : '';

    const [metaResult, googleAdsResult] = await Promise.allSettled([
      sendToMeta({ sessionData, hashedEm, hashedExternalId, value, currency, dealId, eventId, eventTime, env }),
      sendToGoogleAds({ sessionData, hashedEm, value, currency, dealId, eventTime, env }),
    ]);

    // Parse Meta result.
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

    // Parse Google Ads result.
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

    // Persist in background — does not block the 200 response to Pipedrive.
    context.waitUntil(
      logToPurchaseLog({
        dealId, email, hashedEm, hashedExternalId, sessionData,
        value, currency, eventId, eventTime,
        metaStatusCode, metaResponseOk, metaResponseBody, metaPayloadSent,
        googleAdsStatusCode, googleAdsResponseOk, googleAdsResponseBody, googleAdsPayloadSent,
        env,
      })
    );

    return jsonResponse({ ok: true, event_id: eventId, deal_id: dealId });

  } catch (err) {
    console.error('Pipedrive webhook error:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
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
// META CAPI — Purchase event enriched with D1 session tracking data.
// -----------------------------------------------------------------------------
async function sendToMeta({ sessionData, hashedEm, hashedExternalId, value, currency, dealId, eventId, eventTime, env }) {
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
      custom_data: {
        value: parseFloat(value) || 0,
        currency: currency,
        content_type: 'product',
        content_ids: [dealId],
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
// GOOGLE ADS — uploadClickConversions (v21 REST).
// Requires a click identifier (gclid/wbraid/gbraid) recovered from the session.
// -----------------------------------------------------------------------------
async function sendToGoogleAds({ sessionData, hashedEm, value, currency, dealId, eventTime, env }) {
  if (!env.GOOGLE_ADS_CUSTOMER_ID || !env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ||
      !env.GOOGLE_ADS_DEVELOPER_TOKEN || !env.GOOGLE_ADS_CLIENT_ID ||
      !env.GOOGLE_ADS_CLIENT_SECRET || !env.GOOGLE_ADS_REFRESH_TOKEN) {
    return { skipped: 'missing google ads env', payload: null, response: null };
  }

  if (!env.PIPEDRIVE_GOOGLE_ADS_CONVERSION_ACTION_ID) {
    return { skipped: 'missing PIPEDRIVE_GOOGLE_ADS_CONVERSION_ACTION_ID', payload: null, response: null };
  }

  const gclid = sessionData?.gclid || '';
  const wbraid = sessionData?.wbraid || '';
  const gbraid = sessionData?.gbraid || '';
  if (!gclid && !wbraid && !gbraid) {
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
    conversionValue: parseFloat(value) || 0,
    currencyCode: currency || 'BRL',
    orderId: dealId,
  };
  if (gclid) conversion.gclid = gclid;
  else if (wbraid) conversion.wbraid = wbraid;
  else if (gbraid) conversion.gbraid = gbraid;

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
// D1 — Persist result to purchase_log for dashboard visibility.
// Uses INSERT OR IGNORE so Pipedrive webhook retries on the same deal are safe.
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
      parseFloat(value) || 0, currency, dealId,
      sessionData?.landing_url || '',
      metaStatusCode, metaResponseOk, metaResponseBody, metaPayloadSent ?? null,
      googleAdsStatusCode, googleAdsResponseOk, googleAdsResponseBody, googleAdsPayloadSent ?? null,
      sessionData?.gclid || '', sessionData?.gbraid || '', sessionData?.wbraid || '',
      sessionData?.utm_source || '', sessionData?.utm_medium || '',
      sessionData?.utm_campaign || '', sessionData?.utm_content || '',
      sessionData?.utm_term || '',
      dealId, `Pipedrive Deal #${dealId}`,
      Math.floor(Date.now() / 1000)
    ).run();
  } catch (e) {
    console.error('Pipedrive D1 purchase_log error:', e.message);
  }
}

// -----------------------------------------------------------------------------
// HELPERS
// (Mirrored from _core.js — kept local to avoid coupling the CRM and
// sales-platform pipelines through shared mutable state.)
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

// Format unix seconds → "YYYY-MM-DD HH:MM:SS±HH:MM" for Google Ads.
// Mirrors _core.js exactly — offset must match the ad account's timezone.
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

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

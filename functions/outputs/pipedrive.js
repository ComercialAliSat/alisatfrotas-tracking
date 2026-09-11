// -----------------------------------------------------------------------------
// Pipedrive output handler — creates or reuses a Deal (+ Person + Organization)
// for every incoming Lead.
//
// This is the mirror image of functions/webhook/pipedrive/[slug].js (which
// listens for Deal status changes — won/lost/reopened — and fires ad-platform
// conversions on Won). This file goes the other direction: a Lead event on
// /tracker either creates the Deal in the first place, or — if this contact
// already has one — reuses it instead of creating a duplicate.
//
// -----------------------------------------------------------------------------
// DEAL LIFECYCLE (Fase 1 — see ARCHITECTURE_V2_PLAN.md)
// -----------------------------------------------------------------------------
//   No Deal yet         → create Deal, insert crm_deals (status='open').
//   Deal status='open'  → do NOT create a new Deal. Add a note describing the
//                          new conversion, bump crm_deals.updated_at.
//   Deal status='lost'  → do NOT create a new Deal. Reopen the SAME Deal
//                          (Pipedrive PUT: status='open', stage_id=<first
//                          stage of "Pré Vendas">), add a note, update
//                          crm_deals (status='open', reopened_at=now).
//                          Prior notes/activity on the Deal are untouched.
//   Deal status='won'   → do NOT create or reopen anything. Add a note only.
//                          A Won customer converting again may want a
//                          different product (upsell/cross-sell) — creating
//                          a *new* opportunity for existing customers is
//                          deliberately deferred to a future phase with its
//                          own rule, per explicit product decision.
//
// crm_deals is looked up by person_id (Person is always resolved first, via
// Pipedrive's own email/phone search). If no local row exists — e.g. this
// Person had a Deal created before crm_deals existed, or created manually by
// a rep — we fall back to asking Pipedrive directly (GET persons/:id/deals)
// before assuming "no Deal" and creating a duplicate. That fallback is only
// attempted for a *pre-existing* Person (never for a Person we just created
// in this same request, which by definition cannot have a prior Deal) —
// keeps the common path down to zero extra Pipedrive API calls.
//
// Usage:
//   import { sendToPipedrive } from '../outputs/pipedrive.js';
//   const result = await sendToPipedrive({ eventName, email, name, phone,
//     empresa, cnpj, segmento, cidade, estado, lgpdConsent, product, sourceUrl,
//     utmSource, utmMedium, utmCampaign, utmContent, utmTerm, externalId, env });
//   // result: { payload: string|null, response: Response|null, skipped?: string }
//
// Required env vars:
//   PIPEDRIVE_API_TOKEN   — same token already used by the won-deal webhook.
//
// Pipeline/stage are resolved BY NAME at request time (not env vars) so the
// recipient never has to look up numeric IDs — see resolvePipelineStage().
// Target: pipeline "Pré Vendas", stage "ASAP". Update the constants below if
// renamed. The same stage is used both for creating a fresh Deal and for
// moving a reopened Deal back to the top of the pipeline.
//
// Custom field keys below are literal Pipedrive API field hashes (recipient
// pasted these from Configurações → Campos de dados), NOT env vars — they're
// account-specific but not secret (same treatment as config/products.js).
// -----------------------------------------------------------------------------

const PIPELINE_NAME = 'Pré Vendas';
const STAGE_NAME = 'ASAP';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

const ORG_FIELD_CNPJ = 'c6400d306b8ecab770956fd9e9bc3e8df3c542fd';
const PERSON_FIELD_SEGMENTO = '1742f38ff27ac103fca7e223560ba3c4e7aae9cc';
const PERSON_FIELD_UTM = '27d55d2f531b1fb06115c6bb0185acea4c82d32a';
const PERSON_FIELD_CIDADE = '4f22e614b16e6ce3f2f47e9061c130a530ffcb32';
const PERSON_FIELD_ESTADO = 'd8013695b4be077ab158b3e4c55b872b7c477802';
const PERSON_FIELD_LGPD = 'a7123b8a03a43fdf959a6b1c7c07f6f1a147cf7e';

let pipelineStageCache = { stageId: null, pipelineId: null, resolvedAt: 0 };
let lgpdFieldCache = { resolved: false, kind: null, value: null, resolvedAt: 0 }; // kind: 'option' | 'text'

export async function sendToPipedrive({
  eventName, email, name, phone, empresa, cnpj, segmento, cidade, estado, lgpdConsent,
  product, sourceUrl, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, externalId, env,
}) {
  if ((eventName || '').toLowerCase() !== 'lead') {
    return { skipped: 'not a Lead event', payload: null, response: null };
  }
  if (!env.PIPEDRIVE_API_TOKEN) {
    return { skipped: 'missing PIPEDRIVE_API_TOKEN', payload: null, response: null };
  }
  if (!email && !phone) {
    return { skipped: 'no email and no phone', payload: null, response: null };
  }

  const orgId = await findOrCreateOrganization({ empresa, cnpj, env });

  const utmCombined = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((k, i) => [k, [utmSource, utmMedium, utmCampaign, utmContent, utmTerm][i]])
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const lgpdValue = lgpdConsent ? await resolveLgpdConsentValue(env) : null;

  const { personId, created: personWasCreated } = await findOrCreatePerson({
    email, phone, name, segmento, cidade, estado, utmCombined, lgpdValue, orgId, env,
  });
  if (!personId) {
    return { skipped: 'failed to find/create Pipedrive person', payload: null, response: null };
  }

  const noteFields = { utmSource, utmMedium, utmCampaign, utmContent, utmTerm, sourceUrl, product };
  const now = Math.floor(Date.now() / 1000);

  // A brand-new Person cannot already have a Deal — skip the lookup entirely.
  const dealState = personWasCreated ? null : await resolveDealState({ personId, env });

  if (!dealState) {
    return createDeal({ personId, orgId, externalId, product, empresa, name, email, sourceUrl, now, noteFields, env });
  }

  if (dealState.status === 'lost') {
    return reopenDeal({ dealState, noteFields, now, env });
  }

  if (dealState.status === 'won') {
    return addConversionNoteOnly({
      dealId: dealState.deal_id, now, env, noteFields,
      headline: 'Nova conversão registrada — cliente já convertido (Deal mantido como Won).',
    });
  }

  // status === 'open'
  return addConversionNoteOnly({
    dealId: dealState.deal_id, now, env, noteFields,
    headline: 'Nova conversão registrada.',
  });
}

// -----------------------------------------------------------------------------
// SEM DEAL — create Person's first Deal.
// -----------------------------------------------------------------------------
async function createDeal({ personId, orgId, externalId, product, empresa, name, email, sourceUrl, now, noteFields, env }) {
  const { stageId, pipelineId } = await resolvePipelineStage(env);
  if (!stageId) {
    return { skipped: `could not resolve Pipedrive stage "${STAGE_NAME}" in pipeline "${PIPELINE_NAME}"`, payload: null, response: null };
  }

  const title = [product, empresa || name].filter(Boolean).join(' — ') || `Lead — ${email}`;
  const dealPayload = { title, person_id: personId, stage_id: stageId };
  if (orgId) dealPayload.org_id = orgId;
  const payloadJson = JSON.stringify(dealPayload);

  const response = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payloadJson,
  });

  if (response.ok) {
    const dealData = await response.clone().json().catch(() => null);
    const dealId = dealData?.data?.id;
    if (dealId) {
      if (env.DB) {
        try {
          await env.DB.prepare(`
            INSERT INTO crm_deals (deal_id, person_id, org_id, external_id, status, pipeline_id, stage_id, value, currency, created_at, updated_at)
            VALUES (?, ?, ?, ?, 'open', ?, ?, 0, 'BRL', ?, ?)
            ON CONFLICT(deal_id) DO NOTHING
          `).bind(dealId, personId, orgId || null, externalId || null, pipelineId || null, stageId, now, now).run();
        } catch (e) {
          console.error('crm_deals insert error (createDeal):', e.message);
        }
      }
      const note = buildConversionNote({ headline: 'Nova conversão registrada.', dateStr: formatNoteDate(now, env.TIMEZONE_OFFSET), ...noteFields, sourceUrl });
      await addDealNote(dealId, note, env).catch(() => {});
    }
  }

  return { payload: payloadJson, response };
}

// -----------------------------------------------------------------------------
// DEAL OPEN / WON — no new Deal, no reopen, just a note.
// -----------------------------------------------------------------------------
async function addConversionNoteOnly({ dealId, now, env, noteFields, headline }) {
  const note = buildConversionNote({ headline, dateStr: formatNoteDate(now, env.TIMEZONE_OFFSET), ...noteFields });
  const response = await addDealNote(dealId, note, env).catch(() => null);

  if (env.DB) {
    try {
      await env.DB.prepare('UPDATE crm_deals SET updated_at = ? WHERE deal_id = ?').bind(now, dealId).run();
    } catch (e) {
      console.error('crm_deals update error (addConversionNoteOnly):', e.message);
    }
  }

  return { payload: note, response };
}

// -----------------------------------------------------------------------------
// DEAL LOST — reopen the same Deal, move to the first stage, add a note.
// -----------------------------------------------------------------------------
async function reopenDeal({ dealState, noteFields, now, env }) {
  const { stageId, pipelineId } = await resolvePipelineStage(env);
  const dealId = dealState.deal_id;

  const reopenResp = await fetch(`https://api.pipedrive.com/v1/deals/${dealId}?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'open', stage_id: stageId || undefined }),
  }).catch(e => {
    console.error('Pipedrive reopen deal error:', e.message);
    return null;
  });

  if (reopenResp && !reopenResp.ok) {
    console.error('Pipedrive reopen deal failed:', reopenResp.status, await reopenResp.text().catch(() => ''));
  }

  const note = buildConversionNote({
    headline: 'Lead retornou. Deal reaberto automaticamente.',
    dateStr: formatNoteDate(now, env.TIMEZONE_OFFSET),
    ...noteFields,
  });
  await addDealNote(dealId, note, env).catch(() => {});

  if (env.DB) {
    try {
      await env.DB.prepare(`
        UPDATE crm_deals
        SET status = 'open', stage_id = ?, pipeline_id = ?, reopened_at = ?, updated_at = ?
        WHERE deal_id = ? AND status != 'open'
      `).bind(stageId || null, pipelineId || null, now, now, dealId).run();
    } catch (e) {
      console.error('crm_deals update error (reopenDeal):', e.message);
    }
  }

  return { payload: note, response: reopenResp };
}

// -----------------------------------------------------------------------------
// crm_deals lookup, with a one-time Pipedrive fallback for Persons whose Deal
// predates this table (or was created manually, outside our flow).
// -----------------------------------------------------------------------------
async function resolveDealState({ personId, env }) {
  if (env.DB) {
    try {
      const row = await env.DB.prepare(
        'SELECT deal_id, status FROM crm_deals WHERE person_id = ? ORDER BY updated_at DESC LIMIT 1'
      ).bind(personId).first();
      if (row) return row;
    } catch (e) {
      console.error('crm_deals lookup error:', e.message);
    }
  }
  return backfillDealStateFromPipedrive({ personId, env });
}

async function backfillDealStateFromPipedrive({ personId, env }) {
  try {
    const resp = await fetch(
      `https://api.pipedrive.com/v1/persons/${personId}/deals?status=all_not_deleted&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (!resp.ok) return null;
    const data = await resp.json();
    const deals = data?.data || [];
    if (!deals.length) return null;

    // Prefer an open Deal; else the most recently touched won/lost one.
    const priority = { open: 0, won: 1, lost: 2 };
    deals.sort((a, b) => {
      const pa = priority[a.status] ?? 3;
      const pb = priority[b.status] ?? 3;
      if (pa !== pb) return pa - pb;
      return String(b.update_time || '').localeCompare(String(a.update_time || ''));
    });
    const chosen = deals[0];
    const now = Math.floor(Date.now() / 1000);

    if (env.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO crm_deals (deal_id, person_id, org_id, status, pipeline_id, stage_id, value, currency, lost_reason, created_at, updated_at, won_at, lost_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(deal_id) DO NOTHING
        `).bind(
          chosen.id, personId, normalizeOrgId(chosen.org_id),
          chosen.status || 'open', chosen.pipeline_id || null, chosen.stage_id || null,
          parseFloat(chosen.value) || 0, chosen.currency || 'BRL', chosen.lost_reason || null,
          now, now,
          chosen.status === 'won' ? now : null,
          chosen.status === 'lost' ? now : null,
        ).run();
      } catch (e) {
        console.error('crm_deals backfill insert error:', e.message);
      }
    }

    return { deal_id: chosen.id, status: chosen.status || 'open' };
  } catch (e) {
    console.error('Pipedrive persons/:id/deals fetch error:', e.message);
    return null;
  }
}

function normalizeOrgId(orgId) {
  if (orgId == null) return null;
  if (typeof orgId === 'object') return orgId.value ?? null;
  return orgId;
}

// -----------------------------------------------------------------------------
// Notes — single reusable builder + sender so every call site produces the
// same format, and never prints "undefined"/"null" for a missing field.
// -----------------------------------------------------------------------------
function buildConversionNote({ headline, dateStr, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, sourceUrl, product }) {
  const lines = [headline, '', `Data: ${dateStr}`];
  const push = (label, value) => { if (value) lines.push(`${label}: ${value}`); };
  push('Origem', utmSource);
  push('Mídia', utmMedium);
  push('Campanha', utmCampaign);
  push('UTM Content', utmContent);
  push('UTM Term', utmTerm);
  push('Landing Page', sourceUrl);
  push('Produto', product);
  return lines.join('\n');
}

function formatNoteDate(unixSeconds, offsetString) {
  const tz = offsetString || '-03:00';
  const match = /^([+-])(\d{2}):(\d{2})$/.exec(tz);
  let d;
  if (!match) {
    d = new Date(unixSeconds * 1000);
  } else {
    const sign = match[1] === '-' ? -1 : 1;
    const offsetSeconds = sign * (parseInt(match[2], 10) * 3600 + parseInt(match[3], 10) * 60);
    d = new Date((unixSeconds + offsetSeconds) * 1000);
  }
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

async function addDealNote(dealId, content, env) {
  return fetch(`https://api.pipedrive.com/v1/notes?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deal_id: dealId, content: content.replace(/\n/g, '<br>') }),
  });
}

// -----------------------------------------------------------------------------
// Resolve {stageId, pipelineId} for PIPELINE_NAME / STAGE_NAME, cached in
// module scope. Used both to create a fresh Deal and to reopen a Lost one.
// -----------------------------------------------------------------------------
async function resolvePipelineStage(env) {
  const now = Date.now();
  if (pipelineStageCache.stageId && now - pipelineStageCache.resolvedAt < CACHE_TTL_MS) {
    return pipelineStageCache;
  }

  try {
    const pipelinesResp = await fetch(`https://api.pipedrive.com/v1/pipelines?api_token=${env.PIPEDRIVE_API_TOKEN}`);
    if (!pipelinesResp.ok) return { stageId: null, pipelineId: null };
    const pipelinesData = await pipelinesResp.json();
    const pipeline = (pipelinesData?.data || []).find(
      p => (p.name || '').trim().toLowerCase() === PIPELINE_NAME.toLowerCase()
    );
    if (!pipeline) return { stageId: null, pipelineId: null };

    const stagesResp = await fetch(
      `https://api.pipedrive.com/v1/stages?pipeline_id=${pipeline.id}&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (!stagesResp.ok) return { stageId: null, pipelineId: pipeline.id };
    const stagesData = await stagesResp.json();
    const stage = (stagesData?.data || []).find(
      s => (s.name || '').trim().toLowerCase() === STAGE_NAME.toLowerCase()
    );
    if (!stage) return { stageId: null, pipelineId: pipeline.id };

    pipelineStageCache = { stageId: stage.id, pipelineId: pipeline.id, resolvedAt: now };
    return pipelineStageCache;
  } catch (e) {
    console.error('Pipedrive pipeline/stage resolution error:', e.message);
    return { stageId: null, pipelineId: null };
  }
}

// -----------------------------------------------------------------------------
// The "Política de privacidade" Person field could be a plain text field or
// a single-option (enum) field — the API key alone doesn't tell us which,
// and sending a raw string to an enum field silently fails to set it. Look
// the field up once, inspect field_type, and cache what to send.
// -----------------------------------------------------------------------------
async function resolveLgpdConsentValue(env) {
  const now = Date.now();
  if (lgpdFieldCache.resolved && now - lgpdFieldCache.resolvedAt < CACHE_TTL_MS) {
    return lgpdFieldCache.value;
  }

  const fallbackText = 'Concordo em fornecer meus dados.';
  try {
    const resp = await fetch(`https://api.pipedrive.com/v1/personFields?api_token=${env.PIPEDRIVE_API_TOKEN}`);
    if (!resp.ok) return fallbackText;
    const data = await resp.json();
    const field = (data?.data || []).find(f => f.key === PERSON_FIELD_LGPD);
    if (!field) return fallbackText;

    if (field.field_type === 'enum' || field.field_type === 'set') {
      const options = field.options || [];
      const match = options.find(o => /sim|aceit|concord|yes|consent/i.test(o.label || ''));
      const value = match ? match.id : (options[0]?.id ?? fallbackText);
      lgpdFieldCache = { resolved: true, kind: 'option', value, resolvedAt: now };
      return value;
    }

    lgpdFieldCache = { resolved: true, kind: 'text', value: fallbackText, resolvedAt: now };
    return fallbackText;
  } catch (e) {
    console.error('Pipedrive LGPD field resolution error:', e.message);
    return fallbackText;
  }
}

// -----------------------------------------------------------------------------
// Find an Organization by CNPJ (preferred) or name, else create one.
// Returns null (not an error) when there's no empresa/cnpj to work with —
// callers treat a missing org as "skip the link", not a failure.
// -----------------------------------------------------------------------------
async function findOrCreateOrganization({ empresa, cnpj, env }) {
  if (!empresa && !cnpj) return null;

  try {
    const term = cnpj || empresa;
    const fields = cnpj ? 'custom_fields' : 'name';
    const searchResp = await fetch(
      `https://api.pipedrive.com/v1/organizations/search?term=${encodeURIComponent(term)}&fields=${fields}&exact_match=true&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (searchResp.ok) {
      const searchData = await searchResp.json();
      const existingId = searchData?.data?.items?.[0]?.item?.id;
      if (existingId) return existingId;
    }
  } catch (e) {
    console.error('Pipedrive organization search error:', e.message);
  }

  try {
    const createPayload = { name: empresa || cnpj };
    if (cnpj) createPayload[ORG_FIELD_CNPJ] = cnpj;

    const createResp = await fetch(`https://api.pipedrive.com/v1/organizations?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload),
    });
    if (!createResp.ok) return null;
    const createData = await createResp.json();
    return createData?.data?.id || null;
  } catch (e) {
    console.error('Pipedrive organization create error:', e.message);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Find an existing Person by e-mail first, phone as fallback, else create
// one with the full custom-field set. Existing persons are reused as-is (not
// overwritten) — a returning lead's sales-team-edited data in Pipedrive
// isn't clobbered by a repeat form submission.
//
// Dedup rule (see ARCHITECTURE_V2_PLAN.md): e-mail is the primary identifier;
// phone is only consulted when there's no e-mail, or the e-mail search found
// nothing. Name is never used to match — two different people who happen to
// share a name must never be merged automatically.
// -----------------------------------------------------------------------------
async function findOrCreatePerson({ email, phone, name, segmento, cidade, estado, utmCombined, lgpdValue, orgId, env }) {
  // Normalize once here (trim + lowercase) so the SAME value is used both
  // for the search and for the create payload — "JOAO@X.COM" and
  // "joao@x.com" must resolve to the same Person. The original `email`
  // (as typed) is intentionally left untouched everywhere else (e.g. the
  // Deal title fallback in createDeal) — this normalization is scoped to
  // Person lookup/creation only.
  const normalizedEmail = normalizeEmail(email);
  let existingId = null;

  if (normalizedEmail) {
    existingId = await findPersonByEmail(normalizedEmail, env);
  }
  if (!existingId && phone) {
    existingId = await findPersonByPhone(phone, env);
  }
  if (existingId) return { personId: existingId, created: false };

  try {
    const createPayload = { name: name || email || phone };
    if (normalizedEmail) createPayload.email = [{ value: normalizedEmail, label: 'work', primary: true }];
    if (phone) createPayload.phone = [{ value: phone, label: 'work', primary: true }];
    if (segmento) createPayload[PERSON_FIELD_SEGMENTO] = segmento;
    if (utmCombined) createPayload[PERSON_FIELD_UTM] = utmCombined;
    if (cidade) createPayload[PERSON_FIELD_CIDADE] = cidade;
    if (estado) createPayload[PERSON_FIELD_ESTADO] = estado;
    if (lgpdValue != null) createPayload[PERSON_FIELD_LGPD] = lgpdValue;
    if (orgId) createPayload.org_id = orgId;

    const createResp = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload),
    });
    if (!createResp.ok) return { personId: null, created: false };
    const createData = await createResp.json();
    const personId = createData?.data?.id || null;
    return { personId, created: !!personId };
  } catch (e) {
    console.error('Pipedrive person create error:', e.message);
    return { personId: null, created: false };
  }
}

// trim + lowercase. Called once in findOrCreatePerson before both the
// search and the create payload use the result — see the dedup rule in
// ARCHITECTURE_V2_PLAN.md ("e-mail é o identificador principal").
function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

async function findPersonByEmail(email, env) {
  try {
    const searchResp = await fetch(
      `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(email)}&fields=email&exact_match=true&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (!searchResp.ok) return null;
    const searchData = await searchResp.json();
    return searchData?.data?.items?.[0]?.item?.id || null;
  } catch (e) {
    console.error('Pipedrive person search (email) error:', e.message);
    return null;
  }
}

// Pipedrive stores phone however it was typed (spaces, hyphens, parens vary),
// so an exact-match search on our normalized digits can miss a real match.
// Search loosely by the last 9 digits (fairly unique for a Brazilian mobile
// number), then fetch each candidate's full record and compare normalized
// values ourselves. Bounded to a handful of API calls, and only runs on the
// fallback path (no e-mail, or e-mail search found nothing).
async function findPersonByPhone(phone, env) {
  const normalized = normalizePhone(phone, env.DEFAULT_COUNTRY_CODE);
  if (!normalized || normalized.length < 9) return null;
  const searchTerm = normalized.slice(-9);

  try {
    const searchResp = await fetch(
      `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(searchTerm)}&fields=phone&exact_match=false&limit=5&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (!searchResp.ok) return null;
    const searchData = await searchResp.json();
    const candidateIds = (searchData?.data?.items || []).map(i => i.item?.id).filter(Boolean);

    for (const candidateId of candidateIds) {
      const personResp = await fetch(`https://api.pipedrive.com/v1/persons/${candidateId}?api_token=${env.PIPEDRIVE_API_TOKEN}`);
      if (!personResp.ok) continue;
      const personData = await personResp.json();
      const phones = personData?.data?.phone || [];
      for (const p of phones) {
        if (normalizePhone(p.value, env.DEFAULT_COUNTRY_CODE) === normalized) return candidateId;
      }
    }
  } catch (e) {
    console.error('Pipedrive person search (phone) error:', e.message);
  }
  return null;
}

// Same normalization used across the stack (tracker.js, webhook/_core.js):
// strip everything but digits, drop leading zeros, prepend the default
// country code (55 = Brazil) for a plausibly-local number. Kept local to
// this file rather than imported — matches the existing convention of not
// coupling webhook/output modules together (see webhook/pipedrive/[slug].js).
function normalizePhone(ph, countryCode) {
  if (!ph) return '';
  const cc = String(countryCode || '55');
  const digits = ph.replace(/\D/g, '').replace(/^0+/, '');
  if (!digits) return '';
  if (digits.startsWith(cc) && digits.length >= cc.length + 8 && digits.length <= cc.length + 11) {
    return digits;
  }
  if (digits.length >= 8 && digits.length <= 11) {
    return cc + digits;
  }
  return digits;
}

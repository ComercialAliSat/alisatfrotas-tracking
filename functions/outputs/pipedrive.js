// -----------------------------------------------------------------------------
// Pipedrive output handler — creates a Deal (+ Person + Organization) for
// every incoming Lead.
//
// This is the mirror image of functions/webhook/pipedrive/[slug].js (which
// listens for a deal being marked WON and fires ad-platform conversions).
// This file goes the other direction: a Lead event on /tracker creates the
// Deal in the first place, so it shows up in the sales team's pipeline.
//
// Usage:
//   import { sendToPipedrive } from '../outputs/pipedrive.js';
//   const result = await sendToPipedrive({ eventName, email, name, phone,
//     empresa, cnpj, segmento, cidade, estado, lgpdConsent, product, sourceUrl,
//     utmSource, utmMedium, utmCampaign, utmContent, utmTerm, env });
//   // result: { payload: string|null, response: Response|null, skipped?: string }
//
// Required env vars:
//   PIPEDRIVE_API_TOKEN   — same token already used by the won-deal webhook.
//
// Pipeline/stage are resolved BY NAME at request time (not env vars) so the
// recipient never has to look up numeric IDs — see resolveStageId(). Target:
// pipeline "Pré Vendas", stage "ASAP". Update the constants below if renamed.
//
// Custom field keys below are literal Pipedrive API field hashes (recipient
// pasted these from Configurações → Campos de dados), NOT env vars — they're
// account-specific but not secret (same treatment as config/products.js).
//
// Data model:
//   Organization (empresa, CNPJ) ← Person (nome, e-mail, telefone, segmento,
//   cidade, estado, UTM, consentimento LGPD) ← Deal (title, linked to both).
//   Organization is looked up by CNPJ; Person by e-mail. Both are reused
//   across submissions — a new Deal is created every time regardless, since
//   each form submission may represent a fresh opportunity.
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

let stageCache = { id: null, resolvedAt: 0 };
let lgpdFieldCache = { resolved: false, kind: null, value: null, resolvedAt: 0 }; // kind: 'option' | 'text'

export async function sendToPipedrive({
  eventName, email, name, phone, empresa, cnpj, segmento, cidade, estado, lgpdConsent,
  product, sourceUrl, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, env,
}) {
  if ((eventName || '').toLowerCase() !== 'lead') {
    return { skipped: 'not a Lead event', payload: null, response: null };
  }
  if (!env.PIPEDRIVE_API_TOKEN) {
    return { skipped: 'missing PIPEDRIVE_API_TOKEN', payload: null, response: null };
  }
  if (!email) {
    return { skipped: 'no email', payload: null, response: null };
  }

  const stageId = await resolveStageId(env);
  if (!stageId) {
    return { skipped: `could not resolve Pipedrive stage "${STAGE_NAME}" in pipeline "${PIPELINE_NAME}"`, payload: null, response: null };
  }

  const orgId = await findOrCreateOrganization({ empresa, cnpj, env });

  const utmCombined = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((k, i) => [k, [utmSource, utmMedium, utmCampaign, utmContent, utmTerm][i]])
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const lgpdValue = lgpdConsent ? await resolveLgpdConsentValue(env) : null;

  const personId = await findOrCreatePerson({
    email, name, phone, segmento, cidade, estado, utmCombined, lgpdValue, orgId, env,
  });
  if (!personId) {
    return { skipped: 'failed to find/create Pipedrive person', payload: null, response: null };
  }

  const title = [product, empresa || name].filter(Boolean).join(' — ') || `Lead — ${email}`;

  const dealPayload = {
    title,
    person_id: personId,
    stage_id: stageId,
  };
  if (orgId) dealPayload.org_id = orgId;
  const payloadJson = JSON.stringify(dealPayload);

  const response = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payloadJson,
  });

  // Anything without a dedicated field (origin LP, landing page URL) goes on
  // a Note so it isn't lost, even though the structured data now lives on
  // the Person/Organization/Deal fields above.
  if (response.ok) {
    const dealData = await response.clone().json().catch(() => null);
    const dealId = dealData?.data?.id;
    if (dealId) {
      const noteLines = [
        product ? `Origem (LP): ${product}` : '',
        sourceUrl ? `Página: ${sourceUrl}` : '',
      ].filter(Boolean);
      if (noteLines.length) {
        await addNote(dealId, noteLines.join('\n'), env).catch(() => {});
      }
    }
  }

  return { payload: payloadJson, response };
}

// -----------------------------------------------------------------------------
// Resolve stage_id for PIPELINE_NAME / STAGE_NAME, cached in module scope.
// -----------------------------------------------------------------------------
async function resolveStageId(env) {
  const now = Date.now();
  if (stageCache.id && now - stageCache.resolvedAt < CACHE_TTL_MS) {
    return stageCache.id;
  }

  try {
    const pipelinesResp = await fetch(`https://api.pipedrive.com/v1/pipelines?api_token=${env.PIPEDRIVE_API_TOKEN}`);
    if (!pipelinesResp.ok) return null;
    const pipelinesData = await pipelinesResp.json();
    const pipeline = (pipelinesData?.data || []).find(
      p => (p.name || '').trim().toLowerCase() === PIPELINE_NAME.toLowerCase()
    );
    if (!pipeline) return null;

    const stagesResp = await fetch(
      `https://api.pipedrive.com/v1/stages?pipeline_id=${pipeline.id}&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (!stagesResp.ok) return null;
    const stagesData = await stagesResp.json();
    const stage = (stagesData?.data || []).find(
      s => (s.name || '').trim().toLowerCase() === STAGE_NAME.toLowerCase()
    );
    if (!stage) return null;

    stageCache = { id: stage.id, resolvedAt: now };
    return stage.id;
  } catch (e) {
    console.error('Pipedrive stage resolution error:', e.message);
    return null;
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
// Find an existing Person by exact email match, else create one with the
// full custom-field set. Existing persons are reused as-is (not overwritten)
// — a returning lead's sales-team-edited data in Pipedrive isn't clobbered
// by a repeat form submission.
// -----------------------------------------------------------------------------
async function findOrCreatePerson({ email, name, phone, segmento, cidade, estado, utmCombined, lgpdValue, orgId, env }) {
  try {
    const searchResp = await fetch(
      `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(email)}&fields=email&exact_match=true&api_token=${env.PIPEDRIVE_API_TOKEN}`
    );
    if (searchResp.ok) {
      const searchData = await searchResp.json();
      const existingId = searchData?.data?.items?.[0]?.item?.id;
      if (existingId) return existingId;
    }
  } catch (e) {
    console.error('Pipedrive person search error:', e.message);
  }

  try {
    const createPayload = {
      name: name || email,
      email: [{ value: email, label: 'work', primary: true }],
    };
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
    if (!createResp.ok) return null;
    const createData = await createResp.json();
    return createData?.data?.id || null;
  } catch (e) {
    console.error('Pipedrive person create error:', e.message);
    return null;
  }
}

async function addNote(dealId, content, env) {
  return fetch(`https://api.pipedrive.com/v1/notes?api_token=${env.PIPEDRIVE_API_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deal_id: dealId, content: content.replace(/\n/g, '<br>') }),
  });
}

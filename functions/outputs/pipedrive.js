// -----------------------------------------------------------------------------
// Pipedrive output handler — creates a Deal for every incoming Lead.
//
// This is the mirror image of functions/webhook/pipedrive/[slug].js (which
// listens for a deal being marked WON and fires ad-platform conversions).
// This file goes the other direction: a Lead event on /tracker creates the
// Deal in the first place, so it shows up in the sales team's pipeline.
//
// Usage:
//   import { sendToPipedrive } from '../outputs/pipedrive.js';
//   const result = await sendToPipedrive({ eventName, email, name, phone,
//     empresa, cnpj, segmento, product, sourceUrl,
//     utmSource, utmMedium, utmCampaign, utmContent, utmTerm, env });
//   // result: { payload: string|null, response: Response|null, skipped?: string }
//
// Required env vars:
//   PIPEDRIVE_API_TOKEN   — same token already used by the won-deal webhook.
//
// Pipeline/stage are resolved BY NAME at request time (not env vars) so the
// recipient never has to look up numeric IDs — see resolveStageId() below.
// Hard-coded target: pipeline "Pré Vendas", stage "ASAP". Change the two
// constants below if the recipient renames either in Pipedrive.
//
// Behavior:
//   - Fires only for event_name === 'Lead' (never LeadUpdate/Purchase).
//   - Finds the existing Person by email (Pipedrive search) to avoid
//     duplicate contacts; always creates a NEW Deal even on repeat
//     submissions from the same email — each submission may be a fresh
//     opportunity and the sales team can merge/discard duplicates manually.
//   - Extra context (segmento, CNPJ, telefone, produto, UTMs) that has no
//     dedicated Pipedrive field is attached as a Note on the new Deal.
// -----------------------------------------------------------------------------

const PIPELINE_NAME = 'Pré Vendas';
const STAGE_NAME = 'ASAP';
const STAGE_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h — re-resolve occasionally in case of rename

let stageCache = { id: null, resolvedAt: 0 };

export async function sendToPipedrive({
  eventName, email, name, phone, empresa, cnpj, segmento, product, sourceUrl,
  utmSource, utmMedium, utmCampaign, utmContent, utmTerm, env,
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

  const personId = await findOrCreatePerson({ email, name, phone, env });
  if (!personId) {
    return { skipped: 'failed to find/create Pipedrive person', payload: null, response: null };
  }

  const title = [product, empresa || name].filter(Boolean).join(' — ') || `Lead — ${email}`;

  const dealPayload = {
    title,
    person_id: personId,
    stage_id: stageId,
  };
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
      const noteLines = [
        product ? `Origem: ${product}` : '',
        segmento ? `Segmento: ${segmento}` : '',
        cnpj ? `CNPJ: ${cnpj}` : '',
        phone ? `Telefone: ${phone}` : '',
        sourceUrl ? `Página: ${sourceUrl}` : '',
        [utmSource, utmMedium, utmCampaign, utmContent, utmTerm].some(Boolean)
          ? `UTMs: source=${utmSource || ''} medium=${utmMedium || ''} campaign=${utmCampaign || ''} content=${utmContent || ''} term=${utmTerm || ''}`
          : '',
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
// Two-step lookup (pipelines → stages filtered by pipeline_id) rather than
// relying on the stage object's inlined pipeline_name field, which isn't
// guaranteed present on every Pipedrive plan/API version.
// -----------------------------------------------------------------------------
async function resolveStageId(env) {
  const now = Date.now();
  if (stageCache.id && now - stageCache.resolvedAt < STAGE_CACHE_TTL_MS) {
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
// Find an existing Person by exact email match, else create one.
// -----------------------------------------------------------------------------
async function findOrCreatePerson({ email, name, phone, env }) {
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

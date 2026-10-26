// -----------------------------------------------------------------------------
// Generic outbound integrations dispatcher — the "socket" the operator plugs
// webhooks (a spreadsheet via Google Apps Script Web App, Zapier, a future
// CRM, anything that accepts an HTTP POST) into from the /plataforma UI.
//
// Unlike functions/outputs/*.js (one hardcoded destination each, env-var
// gated), integrations are rows in D1 the operator manages themselves — no
// code change or redeploy needed to add one.
//
// Usage (fire-and-forget, non-blocking):
//   import { dispatchIntegrations } from '../lib/integrations-dispatch.js';
//   context.waitUntil(dispatchIntegrations({ env, eventName: 'Lead', data }));
//
// `data` is a FLAT object (no nesting) of raw, unhashed fields available for
// that event — integrations exist to feed a CRM/spreadsheet, not an ad
// platform, so PII goes out as typed, not hashed. Callers are responsible
// for flattening (e.g. user_data.em → data.em).
//
// Two independent auth mechanisms, for two different directions:
//   - `secret` (HMAC-SHA256, header X-Ali-Signature) proves to a receiver
//     WE control (Apps Script, n8n) that the request came from us.
//   - `auth_header_name` + `auth_env_var` is the opposite direction: calling
//     an authenticated third-party API (a CRM) with a key IT issued. The key
//     itself is never stored in D1 — `auth_env_var` just names the
//     Cloudflare environment variable holding it (set in the dashboard, same
//     as META_ACCESS_TOKEN etc.), read fresh on every delivery.
// -----------------------------------------------------------------------------

export async function dispatchIntegrations({ env, eventName, data }) {
  if (!env.DB || !eventName) return;

  let rows;
  try {
    rows = await env.DB.prepare('SELECT * FROM integrations WHERE active = 1').all();
  } catch (e) {
    console.error('integrations lookup error:', e.message);
    return;
  }

  const matches = (rows.results || []).filter(integration =>
    parseEvents(integration.events).includes(eventName)
  );
  if (matches.length === 0) return;

  await Promise.allSettled(
    matches.map(integration => deliver({ env, integration, eventName, data }))
  );
}

// Sends a one-off test delivery for the "Testar envio" button in /plataforma —
// same delivery/logging path as a real event, so a green test is a real
// signal the destination is reachable and parsing the payload correctly.
export async function testIntegration({ env, integration, data }) {
  return deliver({ env, integration, eventName: 'test', data });
}

async function deliver({ env, integration, eventName, data }) {
  const mappings = parseMappings(integration.field_mappings);
  const payload = applyMappings(mappings, data);
  const payloadJson = JSON.stringify(payload);

  const headers = {
    'Content-Type': 'application/json',
    'Idempotency-Key': data.event_id || crypto.randomUUID(),
  };
  if (integration.secret) {
    headers['X-Ali-Signature'] = await hmacSha256Hex(integration.secret, payloadJson);
  }
  if (integration.auth_header_name && integration.auth_env_var) {
    const keyValue = env[integration.auth_env_var];
    if (!keyValue) {
      return logDelivery({ env, integration, eventName, payload, payloadJson, statusCode: 0, ok: 0, responseBody: '', error: `missing env var ${integration.auth_env_var}` });
    }
    headers[integration.auth_header_name] = (integration.auth_header_prefix || '') + keyValue;
  }

  let statusCode = 0, ok = 0, responseBody = '', error = '';
  try {
    const response = await fetch(integration.target_url, {
      method: 'POST',
      headers,
      body: payloadJson,
    });
    statusCode = response.status;
    ok = response.ok ? 1 : 0;
    try { responseBody = (await response.text()).slice(0, 2000); } catch (e2) { responseBody = `Read error: ${e2.message}`; }
  } catch (e) {
    error = e.message;
  }

  return logDelivery({ env, integration, eventName, payload, payloadJson, statusCode, ok, responseBody, error });
}

async function logDelivery({ env, integration, eventName, payload, payloadJson, statusCode, ok, responseBody, error }) {
  if (env.DB) {
    try {
      await env.DB.prepare(`
        INSERT INTO integration_log (integration_id, event_name, status_code, ok, response_body, payload_sent, error, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        integration.id, eventName, statusCode, ok,
        responseBody, payloadJson, error,
        Math.floor(Date.now() / 1000)
      ).run();
    } catch (e) {
      console.error('integration_log insert error:', e.message);
    }
  }

  return { statusCode, ok, responseBody, error, payloadSent: payload };
}

function parseEvents(eventsCsv) {
  return (eventsCsv || '').split(',').map(s => s.trim()).filter(Boolean);
}

function parseMappings(json) {
  try {
    const parsed = JSON.parse(json || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

// No mappings configured yet → send the full flat payload as-is, so a
// freshly created integration is still useful before the operator sets up
// field mapping. Once mappings exist, only the mapped fields go out.
function applyMappings(mappings, data) {
  if (mappings.length === 0) return data;

  const out = {};
  for (const m of mappings) {
    const source = (m.source || '').trim();
    const target = (m.target || '').trim() || source;
    if (!source) continue;
    const value = data[source];
    if (value !== undefined && value !== null && value !== '') {
      out[target] = value;
    }
  }
  return out;
}

async function hmacSha256Hex(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

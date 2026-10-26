// GET  /api/integrations?key=...
//   Lista todas as integrações cadastradas (webhooks/planilhas), com o
//   status da última entrega para cada uma. Nunca devolve o `secret` em
//   texto puro — só `has_secret`.
//
// POST /api/integrations?key=...
//   Cria uma nova integração. Body JSON:
//   { name, target_url, events: string[], field_mappings?: [{source,target}], secret?: string, active?: bool }

import { ALLOWED_EVENTS, requireAuth, validateIntegrationInput, parseCsv, parseJsonArray, json } from './_shared.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  try {
    const rows = await env.DB.prepare(`
      SELECT
        i.id, i.name, i.target_url, i.events, i.field_mappings, i.active,
        i.auth_header_name, i.auth_header_prefix, i.auth_env_var,
        i.created_at, i.updated_at,
        (i.secret IS NOT NULL AND i.secret != '') AS has_secret,
        (SELECT ok          FROM integration_log l WHERE l.integration_id = i.id ORDER BY l.created_at DESC LIMIT 1) AS last_ok,
        (SELECT status_code FROM integration_log l WHERE l.integration_id = i.id ORDER BY l.created_at DESC LIMIT 1) AS last_status,
        (SELECT created_at  FROM integration_log l WHERE l.integration_id = i.id ORDER BY l.created_at DESC LIMIT 1) AS last_at,
        (SELECT COUNT(*)    FROM integration_log l WHERE l.integration_id = i.id) AS delivery_count
      FROM integrations i
      ORDER BY i.created_at DESC
    `).all();

    const integrations = (rows.results || []).map(r => ({
      ...r,
      events: parseCsv(r.events),
      field_mappings: parseJsonArray(r.field_mappings),
      active: !!r.active,
      has_secret: !!r.has_secret,
      last_ok: r.last_at == null ? null : !!r.last_ok,
    }));

    return json({ integrations, allowed_events: ALLOWED_EVENTS });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'JSON inválido' }, 400); }

  const validation = validateIntegrationInput(body);
  if (validation.error) return json({ error: validation.error }, 400);
  const { name, target_url, events, field_mappings, secret, active, auth_header_name, auth_header_prefix, auth_env_var } = validation.value;

  const now = Math.floor(Date.now() / 1000);
  const id = crypto.randomUUID();

  try {
    await env.DB.prepare(`
      INSERT INTO integrations (id, name, target_url, events, field_mappings, secret, auth_header_name, auth_header_prefix, auth_env_var, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(id, name, target_url, events.join(','), JSON.stringify(field_mappings), secret || null, auth_header_name || null, auth_header_prefix || null, auth_env_var || null, active ? 1 : 0, now, now).run();

    return json({
      id, name, target_url, events, field_mappings,
      has_secret: !!secret, auth_header_name, auth_header_prefix, auth_env_var,
      active, created_at: now, updated_at: now,
    }, 201);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

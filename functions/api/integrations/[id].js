// GET    /api/integrations/:id?key=...
// PUT    /api/integrations/:id?key=...   Body: same shape as POST /api/integrations
//          — an empty/omitted `secret` LEAVES the existing secret untouched
//          (so the UI never has to round-trip the real secret back to us).
//          Send `secret: null` explicitly to clear it.
// DELETE /api/integrations/:id?key=...   Also deletes its integration_log rows.

import { requireAuth, validateIntegrationInput, parseCsv, parseJsonArray, json } from './_shared.js';

export async function onRequestGet(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  try {
    const row = await env.DB.prepare(`
      SELECT id, name, target_url, events, field_mappings, active, created_at, updated_at,
        auth_header_name, auth_header_prefix, auth_env_var,
        (secret IS NOT NULL AND secret != '') AS has_secret
      FROM integrations WHERE id = ?
    `).bind(params.id).first();

    if (!row) return json({ error: 'Integração não encontrada' }, 404);

    return json({
      ...row,
      events: parseCsv(row.events),
      field_mappings: parseJsonArray(row.field_mappings),
      active: !!row.active,
      has_secret: !!row.has_secret,
    });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'JSON inválido' }, 400); }

  const validation = validateIntegrationInput(body);
  if (validation.error) return json({ error: validation.error }, 400);
  const { name, target_url, events, field_mappings, secret, active, auth_header_name, auth_header_prefix, auth_env_var } = validation.value;

  const now = Math.floor(Date.now() / 1000);

  try {
    const existing = await env.DB.prepare('SELECT id, secret FROM integrations WHERE id = ?').bind(params.id).first();
    if (!existing) return json({ error: 'Integração não encontrada' }, 404);

    // '' means "not provided" → keep current secret. `null` (explicit) clears it.
    const nextSecret = body.secret === null ? null : (secret ? secret : existing.secret);

    await env.DB.prepare(`
      UPDATE integrations
      SET name = ?, target_url = ?, events = ?, field_mappings = ?, secret = ?,
          auth_header_name = ?, auth_header_prefix = ?, auth_env_var = ?,
          active = ?, updated_at = ?
      WHERE id = ?
    `).bind(
      name, target_url, events.join(','), JSON.stringify(field_mappings), nextSecret,
      auth_header_name || null, auth_header_prefix || null, auth_env_var || null,
      active ? 1 : 0, now, params.id
    ).run();

    return json({
      id: params.id, name, target_url, events, field_mappings,
      has_secret: !!nextSecret, auth_header_name, auth_header_prefix, auth_env_var,
      active, updated_at: now,
    });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

export async function onRequestDelete(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  try {
    const existing = await env.DB.prepare('SELECT id FROM integrations WHERE id = ?').bind(params.id).first();
    if (!existing) return json({ error: 'Integração não encontrada' }, 404);

    await env.DB.batch([
      env.DB.prepare('DELETE FROM integration_log WHERE integration_id = ?').bind(params.id),
      env.DB.prepare('DELETE FROM integrations WHERE id = ?').bind(params.id),
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

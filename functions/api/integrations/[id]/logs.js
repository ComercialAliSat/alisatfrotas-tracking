// GET /api/integrations/:id/logs?key=...&limit=30
//   Recent delivery attempts for one integration (real events + manual
//   tests), newest first — what the dashboard shows when the operator wants
//   to see why a delivery failed.

import { requireAuth, json } from '../_shared.js';

export async function onRequestGet(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  const limit = Math.max(1, Math.min(200, parseInt(url.searchParams.get('limit') || '30', 10) || 30));

  try {
    const rows = await env.DB.prepare(`
      SELECT id, event_name, status_code, ok, response_body, payload_sent, error, created_at
      FROM integration_log
      WHERE integration_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(params.id, limit).all();

    return json({ logs: rows.results || [] });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

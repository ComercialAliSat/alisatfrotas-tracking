// GET /api/auth/users
// Header: x-session-token: <sessionToken from /api/auth/login>
// Admin-only. Returns the full team list for the Configurações screen.

import { requireAdmin } from './_session.js';

export async function onRequestGet(context) {
  const { request, env } = context;

  if (!env.DB) return json({ error: 'DB não configurado' }, 500);

  const token = request.headers.get('x-session-token') || '';
  const { session, error } = await requireAdmin(env, token);
  if (error) return error;

  const { results } = await env.DB
    .prepare('SELECT id, email, role, created_at, last_login FROM platform_users ORDER BY created_at ASC')
    .all();

  return json({ ok: true, users: results || [], currentUserId: session.userId });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'same-origin' },
  });
}

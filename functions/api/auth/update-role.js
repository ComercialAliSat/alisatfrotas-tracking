// POST /api/auth/update-role
// Header: x-session-token: <sessionToken from /api/auth/login>
// Body: { userId, role: 'admin' | 'member' }
// Admin-only. Refuses to demote yourself if you're the last admin (same
// zero-admin guard as delete-user.js — you CAN demote yourself if another
// admin still exists).

import { requireAdmin } from './_session.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) return json({ error: 'DB não configurado' }, 500);

  const token = request.headers.get('x-session-token') || '';
  const { session, error } = await requireAdmin(env, token);
  if (error) return error;

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Corpo inválido' }, 400); }

  const userId = parseInt(body.userId, 10);
  const role = body.role === 'admin' ? 'admin' : (body.role === 'member' ? 'member' : null);
  if (!Number.isFinite(userId) || !role) return json({ error: 'Parâmetros inválidos' }, 400);

  const target = await env.DB
    .prepare('SELECT id, role FROM platform_users WHERE id = ?')
    .bind(userId).first();
  if (!target) return json({ error: 'Usuário não encontrado' }, 404);

  if (target.role === 'admin' && role === 'member') {
    const adminCountRow = await env.DB
      .prepare("SELECT COUNT(*) as c FROM platform_users WHERE role = 'admin'")
      .first();
    if ((adminCountRow?.c || 0) <= 1) {
      return json({ error: 'Não é possível remover o último administrador' }, 400);
    }
  }

  await env.DB.prepare('UPDATE platform_users SET role = ? WHERE id = ?').bind(role, userId).run();

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'same-origin' },
  });
}

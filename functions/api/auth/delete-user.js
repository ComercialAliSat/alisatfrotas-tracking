// POST /api/auth/delete-user
// Header: x-session-token: <sessionToken from /api/auth/login>
// Body: { userId }
// Admin-only. Refuses to delete yourself (avoid an accidental self-lockout)
// and refuses to delete the last remaining admin (avoid a zero-admin
// account — recoverable via the bootstrap path in register.js, but that
// means creating a brand-new user, not restoring one, so better to just
// block it with a clear error).

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
  if (!Number.isFinite(userId)) return json({ error: 'userId inválido' }, 400);

  if (userId === session.userId) {
    return json({ error: 'Você não pode excluir sua própria conta' }, 400);
  }

  const target = await env.DB
    .prepare('SELECT id, role FROM platform_users WHERE id = ?')
    .bind(userId).first();
  if (!target) return json({ error: 'Usuário não encontrado' }, 404);

  if (target.role === 'admin') {
    const adminCountRow = await env.DB
      .prepare("SELECT COUNT(*) as c FROM platform_users WHERE role = 'admin'")
      .first();
    if ((adminCountRow?.c || 0) <= 1) {
      return json({ error: 'Não é possível excluir o último administrador' }, 400);
    }
  }

  await env.DB.prepare('DELETE FROM platform_users WHERE id = ?').bind(userId).run();

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'same-origin' },
  });
}

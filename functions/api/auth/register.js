// POST /api/auth/register
// Body: { email, password, adminKey }
// adminKey must equal DASH_KEY — used by any logged-in admin to create accounts.
// This is also the bootstrap endpoint for creating the very first user.

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB)       return json({ error: 'DB não configurado' }, 500);
  if (!env.DASH_KEY) return json({ error: 'DASH_KEY não configurado' }, 500);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Corpo inválido' }, 400); }

  const adminKey = (body.adminKey || '').trim();
  if (adminKey !== env.DASH_KEY) return json({ error: 'Não autorizado' }, 401);

  const email    = (body.email    || '').trim().toLowerCase();
  const password = (body.password || '').trim();

  if (!email || !password) return json({ error: 'E-mail e senha obrigatórios' }, 400);
  if (password.length < 8) return json({ error: 'Senha deve ter ao menos 8 caracteres' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'E-mail inválido' }, 400);

  const hash = await hashPassword(password);

  try {
    await env.DB
      .prepare('INSERT INTO platform_users (email, password_hash) VALUES (?, ?)')
      .bind(email, hash).run();
  } catch (e) {
    if (e.message?.includes('UNIQUE')) return json({ error: 'E-mail já cadastrado' }, 409);
    return json({ error: e.message }, 500);
  }

  return json({ ok: true, email });
}

// ── PBKDF2 helpers ─────────────────────────────────────────────────────────

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key  = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256
  );
  return btoa(String.fromCharCode(...salt)) + ':' + btoa(String.fromCharCode(...new Uint8Array(bits)));
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'same-origin' },
  });
}

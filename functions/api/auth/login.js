// POST /api/auth/login
// Body: { email, password }
// Returns: { ok: true, key: DASH_KEY } on success, { error: '...' } on failure.
// The key is stored client-side in sessionStorage so the existing ?key= API pattern
// continues to work without touching any other endpoint.

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB)       return json({ error: 'DB não configurado' }, 500);
  if (!env.DASH_KEY) return json({ error: 'DASH_KEY não configurado' }, 500);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Corpo inválido' }, 400); }

  const email    = (body.email    || '').trim().toLowerCase();
  const password = (body.password || '').trim();

  if (!email || !password) return json({ error: 'E-mail e senha obrigatórios' }, 400);

  const user = await env.DB
    .prepare('SELECT id, password_hash FROM platform_users WHERE email = ?')
    .bind(email).first();

  if (!user) return json({ error: 'E-mail ou senha incorretos' }, 401);

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return json({ error: 'E-mail ou senha incorretos' }, 401);

  await env.DB
    .prepare('UPDATE platform_users SET last_login = ? WHERE id = ?')
    .bind(Math.floor(Date.now() / 1000), user.id).run();

  return json({ ok: true, key: env.DASH_KEY });
}

// ── PBKDF2 helpers ─────────────────────────────────────────────────────────

async function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [saltB64, hashB64] = stored.split(':');
  try {
    const salt = Uint8Array.from(atob(saltB64), c => c.charCodeAt(0));
    const key  = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
    );
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256
    );
    return btoa(String.fromCharCode(...new Uint8Array(bits))) === hashB64;
  } catch { return false; }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'same-origin' },
  });
}

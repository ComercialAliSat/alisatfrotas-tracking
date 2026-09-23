// Shared session-token helpers for the platform admin/member role system.
//
// The login flow already hands every user the same shared DASH_KEY (used
// for all existing ?key= reads — untouched by this file, kept for backward
// compatibility). That alone can't identify WHICH user is calling, so it
// can't gate admin-only actions (delete user, change role). This adds a
// second, per-user signed token on top, without a sessions table: it's a
// stateless HMAC-SHA256 token (userId.role.expiry, signed with DASH_KEY as
// the HMAC secret — already a server-only value, no new secret needed).
//
// Not a general-purpose auth system — scoped narrowly to the 3 admin-only
// endpoints in this directory (users.js, delete-user.js, update-role.js).

import { timingSafeEqual } from '../../webhook/_utils.js';

const SESSION_TTL_SECONDS = 7 * 24 * 3600; // 7 days

export async function createSessionToken(env, userId, role) {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${userId}.${role}.${expiry}`;
  const sig = await hmac(env.DASH_KEY, payload);
  return `${b64url(payload)}.${sig}`;
}

// Returns { userId, role } on success, null on any failure (missing token,
// bad signature, expired, malformed).
export async function verifySessionToken(env, token) {
  if (!token || typeof token !== 'string' || !env.DASH_KEY) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;

  let payload;
  try { payload = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')); }
  catch { return null; }

  const expectedSig = await hmac(env.DASH_KEY, payload);
  if (!timingSafeEqual(sig, expectedSig)) return null;

  const segments = payload.split('.');
  if (segments.length !== 3) return null;
  const [userIdStr, role, expiryStr] = segments;
  const expiry = parseInt(expiryStr, 10);
  if (!Number.isFinite(expiry) || Math.floor(Date.now() / 1000) > expiry) return null;
  if (role !== 'admin' && role !== 'member') return null;

  return { userId: parseInt(userIdStr, 10), role };
}

// Convenience: verify the token AND require admin role. Returns the decoded
// session on success, or a Response the caller should return directly on
// failure (401 missing/invalid token, 403 valid but not admin).
export async function requireAdmin(env, token) {
  const session = await verifySessionToken(env, token);
  if (!session) {
    return { error: new Response(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    }) };
  }
  if (session.role !== 'admin') {
    return { error: new Response(JSON.stringify({ error: 'Apenas administradores podem fazer isso' }), {
      status: 403, headers: { 'Content-Type': 'application/json' },
    }) };
  }
  return { session };
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return b64url(String.fromCharCode(...new Uint8Array(sigBuffer)));
}

function b64url(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

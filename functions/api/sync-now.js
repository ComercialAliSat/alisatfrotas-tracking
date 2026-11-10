// POST /api/sync-now?key=<DASH_KEY>
//
// Manual "reload spend" trigger for the dashboard's "Investimento por canal"
// card. The /api/sync/* endpoints are gated by SYNC_SECRET (for external
// cron), and that secret must never reach the browser — so this route is
// gated by DASH_KEY instead and calls the three sync handlers server-side,
// injecting SYNC_SECRET itself. Same code path as the cron, same sync_log rows.
//
// Body (optional): { date_from?: 'YYYY-MM-DD', date_to?: 'YYYY-MM-DD' }
// (defaults to the handlers' own default: last 7 days).
// Returns: { ok, results: { meta, google, chatgpt } } — each result is
// { status: 'ok'|'skipped'|'error', rows_upserted?, message? }.

import { requireAuth, json } from './integrations/_shared.js';
import { onRequestPost as syncMeta } from './sync/meta-ads.js';
import { onRequestPost as syncGoogle } from './sync/google-ads.js';
import { onRequestPost as syncChatgpt } from './sync/chatgpt-ads.js';

const CHANNELS = [
  ['meta', syncMeta],
  ['google', syncGoogle],
  ['chatgpt', syncChatgpt],
];

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);
  if (!env.SYNC_SECRET) return json({ error: 'SYNC_SECRET não configurado no Cloudflare' }, 500);

  let body = {};
  try { body = await request.json(); } catch (_) { body = {}; }
  const payload = JSON.stringify({ date_from: body.date_from, date_to: body.date_to });

  const settled = await Promise.allSettled(CHANNELS.map(async ([, handler]) => {
    const res = await handler({
      env,
      request: new Request(request.url, {
        method: 'POST',
        headers: { 'x-sync-secret': env.SYNC_SECRET, 'Content-Type': 'application/json' },
        body: payload,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.skipped) return { status: 'skipped', message: data.reason || 'não configurado' };
    if (!res.ok || data.ok === false) return { status: 'error', message: data.error || ('HTTP ' + res.status) };
    return { status: 'ok', rows_upserted: data.rows_upserted ?? 0 };
  }));

  const results = {};
  CHANNELS.forEach(([name], i) => {
    const s = settled[i];
    results[name] = s.status === 'fulfilled' ? s.value : { status: 'error', message: s.reason?.message || String(s.reason) };
  });

  return json({ ok: Object.values(results).every(r => r.status !== 'error'), results });
}

// POST /api/sync/google-ads-backfill
//
// Re-sends Lead conversions to Google Ads for leads that were captured while
// the live upload in tracker.js was not working (expired refresh token,
// missing GOOGLE_ADS_LEAD_CONVERSION_ACTION_ID, migration not applied...).
// The click ids stay in D1 (sessions.gclid / wbraid / gbraid) and Google
// accepts click conversions up to 90 days after the click, so nothing is lost
// as long as the backfill runs inside that window.
//
// Auth:  header `x-sync-secret: <env.SYNC_SECRET>`
// Body:  {
//          days?:    how far back to look at event_log (default 30, max 90),
//          dry_run?: default TRUE. Only lists what would be sent.
//          limit?:   max leads per call (default 50, max 100),
//          retry_rejected?: also retry leads whose last attempt was rejected
//        }
//
// Idempotent: orderId = event_id, the same value the live upload uses, so
// Google ignores a lead it already has for this conversion action. Leads with
// an accepted row in google_ads_log are skipped locally too. Every real
// attempt is written to google_ads_log (visible in /api/google-ads-log).
//
// Requires migration 0031 (google_ads_log, sessions.wbraid/gbraid) and the
// same env vars as the live upload.

import { sendToGoogleAds, summarizeGoogleAds, logGoogleAds, normalizeEmailForGoogle } from '../../tracker.js';

const DAY = 86400;

export async function onRequestPost(context) {
  const { request, env } = context;

  const sentSecret = request.headers.get('x-sync-secret') || '';
  if (!env.SYNC_SECRET || sentSecret !== env.SYNC_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }
  if (!env.DB) return json({ error: 'DB not configured' }, 500);
  if (!env.GOOGLE_ADS_LEAD_CONVERSION_ACTION_ID) {
    return json({ ok: false, error: 'GOOGLE_ADS_LEAD_CONVERSION_ACTION_ID not set' }, 400);
  }

  let opts = {};
  try { opts = await request.json(); } catch (_) { opts = {}; }
  const days = clamp(parseInt(opts.days, 10) || 30, 1, 90);
  const limit = clamp(parseInt(opts.limit, 10) || 50, 1, 100);
  const dryRun = opts.dry_run !== false;
  const retryRejected = opts.retry_rejected === true;

  const now = Math.floor(Date.now() / 1000);
  const since = now - days * DAY;

  let rows;
  try {
    rows = (await env.DB.prepare(`
      SELECT e.session_id, e.event_id, e.timestamp, e.raw_email, e.raw_phone,
             s.gclid, s.wbraid, s.gbraid,
             (SELECT MAX(g.response_ok) FROM google_ads_log g
               WHERE g.event_id = e.event_id AND g.event_name = 'Lead') AS already_ok,
             (SELECT COUNT(*) FROM google_ads_log g
               WHERE g.event_id = e.event_id AND g.event_name = 'Lead' AND g.skipped_reason = '') AS attempts
      FROM event_log e
      LEFT JOIN sessions s ON s.session_id = e.session_id
      WHERE LOWER(e.event_name) = 'lead'
        AND e.is_bot = 0
        AND e.timestamp >= ?
      ORDER BY e.timestamp ASC
    `).bind(since).all()).results || [];
  } catch (e) {
    // Most likely: migration 0031 not applied.
    return json({ ok: false, error: e.message }, 500);
  }

  const summary = {
    leads_in_window: rows.length,
    already_accepted: 0,
    already_attempted_rejected: 0,
    no_click_id: 0,
    to_send: 0,
  };
  const queue = [];
  for (const r of rows) {
    if (r.already_ok === 1) { summary.already_accepted++; continue; }
    if (!r.gclid && !r.wbraid && !r.gbraid) { summary.no_click_id++; continue; }
    if (r.attempts > 0 && !retryRejected) { summary.already_attempted_rejected++; continue; }
    queue.push(r);
  }
  summary.to_send = queue.length;
  const batch = queue.slice(0, limit);

  if (dryRun) {
    return json({
      ok: true, dry_run: true, days, summary,
      would_send_now: batch.length,
      preview: batch.map(r => ({
        event_id: r.event_id,
        lead_time: new Date(r.timestamp * 1000).toISOString(),
        click_id_type: r.gclid ? 'gclid' : (r.wbraid ? 'wbraid' : 'gbraid'),
        has_email: !!r.raw_email, has_phone: !!r.raw_phone,
        retry: r.attempts > 0,
      })),
      hint: 'Send {"dry_run": false} to upload. Raise "limit" (max 100) or call again for the rest.',
    });
  }

  const result = { accepted: 0, rejected: 0, skipped: 0 };
  const failures = [];
  for (const r of batch) {
    const sessionData = { gclid: r.gclid || '', wbraid: r.wbraid || '', gbraid: r.gbraid || '' };
    let settled;
    try {
      const value = await sendToGoogleAds({
        sessionData,
        body: {},
        conversionActionId: env.GOOGLE_ADS_LEAD_CONVERSION_ACTION_ID,
        hashedEm: r.raw_email ? await sha256(normalizeEmailForGoogle(r.raw_email)) : '',
        hashedPh: await hashPhone(r.raw_phone, env.DEFAULT_COUNTRY_CODE),
        value: env.GOOGLE_ADS_LEAD_VALUE || 0,
        currency: 'BRL',
        eventTime: Math.min(Number(r.timestamp) || now, now),
        orderId: r.event_id,
        env,
      });
      settled = { status: 'fulfilled', value };
    } catch (e) {
      settled = { status: 'rejected', reason: e };
    }
    const gads = await summarizeGoogleAds(settled);
    await logGoogleAds(env, {
      sessionId: r.session_id, eventName: 'Lead', eventId: r.event_id,
      conversionActionId: env.GOOGLE_ADS_LEAD_CONVERSION_ACTION_ID,
      clickIdType: gads.clickIdType, statusCode: gads.statusCode, ok: gads.ok,
      skipped: gads.skipped, body: gads.body, payload: gads.payload,
    });
    if (gads.skipped) {
      result.skipped++;
      failures.push({ event_id: r.event_id, reason: gads.skipped });
      // Credentials/config problem: every remaining lead would fail the same way.
      if (gads.skipped === 'oauth token unavailable' || gads.skipped === 'missing google ads env') break;
    } else if (gads.ok) {
      result.accepted++;
    } else {
      result.rejected++;
      failures.push({ event_id: r.event_id, status: gads.statusCode, response: String(gads.body).slice(0, 300) });
    }
  }

  return json({
    ok: true, dry_run: false, days, summary,
    sent_this_call: result.accepted + result.rejected,
    ...result,
    remaining_after_this_call: Math.max(0, queue.length - batch.length),
    failures,
  });
}

async function sha256(value) {
  if (!value) return '';
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(value).toLowerCase().trim()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Same normalization as tracker.js: digits + country code, hashed in E.164 with '+'.
async function hashPhone(ph, countryCode) {
  if (!ph) return '';
  const cc = String(countryCode || '55');
  const digits = String(ph).replace(/\D/g, '').replace(/^0+/, '');
  if (!digits) return '';
  let full = digits;
  if (!(digits.startsWith(cc) && digits.length >= cc.length + 8 && digits.length <= cc.length + 11)
      && digits.length >= 8 && digits.length <= 11) {
    full = cc + digits;
  }
  return sha256('+' + full);
}

function clamp(n, lo, hi) { return Math.min(Math.max(n, lo), hi); }

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

// GET /api/google-ads-log?key=<DASH_KEY>[&limit=50][&payload=1]
//
// Last server-side Google Ads conversion uploads (table google_ads_log, written
// by functions/tracker.js). Answers "did Google accept my lead?" without
// waiting for the Uploads screen in Google Ads or tailing Worker logs.
//
// response_ok = 1 only when Google answered HTTP ok AND returned no
// partialFailureError. A row with skipped_reason set was never sent:
//   'no click id'                  organic/direct lead, no gclid/wbraid/gbraid
//   'missing google ads env'       one of the GOOGLE_ADS_* variables is empty
//   'no conversion action configured'  GOOGLE_ADS_LEAD_CONVERSION_ACTION_ID empty
//   'oauth token unavailable'      refresh token revoked/expired
//
// `payload=1` also returns the JSON sent to Google (hashed identifiers + click id).

export async function onRequestGet(context) {
  const { request, env } = context;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB not configured' }), { status: 500, headers });
  }

  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 200);
  const withPayload = url.searchParams.get('payload') === '1';

  try {
    const rows = await env.DB.prepare(`
      SELECT id, session_id, event_name, event_id, conversion_action_id, click_id_type,
             status_code, response_ok, skipped_reason, response_body,
             ${withPayload ? 'payload_sent,' : ''} created_at
      FROM google_ads_log
      ORDER BY created_at DESC, id DESC
      LIMIT ?
    `).bind(limit).all();

    const summary = await env.DB.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN response_ok = 1 THEN 1 ELSE 0 END) AS accepted,
        SUM(CASE WHEN response_ok = 0 AND skipped_reason = '' THEN 1 ELSE 0 END) AS rejected,
        SUM(CASE WHEN skipped_reason != '' THEN 1 ELSE 0 END) AS skipped
      FROM google_ads_log
      WHERE created_at > ?
    `).bind(Math.floor(Date.now() / 1000) - 7 * 86400).first();

    return new Response(JSON.stringify({ last_7_days: summary, rows: rows.results || [] }), { status: 200, headers });
  } catch (e) {
    // Most likely cause: migration 0031 not applied yet.
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
}

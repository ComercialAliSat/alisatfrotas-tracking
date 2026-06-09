// GET /api/leads?key=...&days=30&limit=100
//           OR  ?key=...&from=YYYY-MM-DD&to=YYYY-MM-DD&limit=100
import { parseDateRange } from './_range.js';

export async function onRequestGet(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const { since, until } = parseDateRange(url);
  const limit       = Math.max(1, Math.min(2000, parseInt(url.searchParams.get('limit') || '100', 10) || 100));
  const includeBots = url.searchParams.get('include_bots') === '1';
  const botClause   = includeBots ? '' : 'AND e.is_bot = 0';

  try {
    const rows = await env.DB.prepare(`
      SELECT
        e.event_id,
        e.timestamp,
        e.session_id,
        e.raw_email,
        e.raw_name,
        e.raw_phone,
        e.raw_form_data,
        e.browser,
        e.os,
        e.is_mobile,
        e.is_bot,
        e.bot_reason,
        e.consent_status,
        e.meta_status_code,
        e.meta_response_ok,
        e.meta_response_body,
        e.meta_payload_sent,
        e.ga4_status_code,
        e.ga4_response_ok,
        e.ga4_response_body,
        e.ga4_payload_sent,
        e.fbp_source,
        e.fbc_source,
        e.fbclid_source,
        e.country,
        e.city,
        e.region,
        COALESCE(NULLIF(e.utm_source,''),   s.utm_source)   AS utm_source,
        COALESCE(NULLIF(e.utm_medium,''),   s.utm_medium)   AS utm_medium,
        COALESCE(NULLIF(e.utm_campaign,''), s.utm_campaign) AS utm_campaign,
        COALESCE(NULLIF(e.utm_content,''),  s.utm_content)  AS utm_content,
        COALESCE(NULLIF(e.utm_term,''),     s.utm_term)     AS utm_term,
        s.fbclid,
        s.gclid,
        s.referrer,
        s.landing_url
      FROM event_log e
      LEFT JOIN sessions s ON e.session_id = s.session_id
      WHERE e.event_name = 'Lead'
        AND e.timestamp >= ? AND e.timestamp <= ?
        ${botClause}
      ORDER BY e.timestamp DESC
      LIMIT ?
    `).bind(since, until, limit).all();

    const summary = await env.DB.prepare(`
      SELECT
        COALESCE(NULLIF(COALESCE(NULLIF(e.utm_source,''), s.utm_source), ''), '(direct)') as src,
        COUNT(*) as count
      FROM event_log e
      LEFT JOIN sessions s ON e.session_id = s.session_id
      WHERE e.event_name = 'Lead'
        AND e.timestamp >= ? AND e.timestamp <= ?
        AND e.is_bot = 0
      GROUP BY 1
      ORDER BY count DESC
    `).bind(since, until).all();

    return json({
      since, until,
      leads:   rows.results    || [],
      summary: summary.results || [],
    });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

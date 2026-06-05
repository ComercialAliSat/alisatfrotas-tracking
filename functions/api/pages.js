// GET /api/pages?key=...&days=30
//
// Per-landing-page stats: visits, leads, conversion rate.
// Powers the "Minhas Páginas" section of the plataforma dashboard.
//
// Joins sessions → event_log so a single query returns both visit counts
// and lead counts per distinct landing URL.

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const days = clampInt(url.searchParams.get('days'), 30, 1, 365);
  const since = Math.floor(Date.now() / 1000) - days * 86400;

  try {
    const rows = await env.DB.prepare(`
      SELECT
        s.landing_url,
        COUNT(DISTINCT s.session_id)                                                        AS visits,
        SUM(CASE WHEN e.event_name = 'Lead' AND e.is_bot = 0 THEN 1 ELSE 0 END)            AS leads,
        MAX(s.created_at)                                                                   AS last_visit
      FROM sessions s
      LEFT JOIN event_log e ON e.session_id = s.session_id
      WHERE s.created_at >= ?
        AND s.landing_url IS NOT NULL
        AND s.landing_url != ''
      GROUP BY s.landing_url
      ORDER BY visits DESC
      LIMIT 50
    `).bind(since).all();

    const pages = (rows.results || []).map(row => ({
      url:             row.landing_url,
      visits:          row.visits  || 0,
      leads:           row.leads   || 0,
      conversion_rate: row.visits > 0
        ? parseFloat(((row.leads / row.visits) * 100).toFixed(1))
        : 0,
      last_visit:      row.last_visit,
    }));

    return json({ days, pages });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function clampInt(raw, fallback, min, max) {
  const n = parseInt(raw || '', 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

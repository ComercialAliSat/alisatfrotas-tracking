// GET /api/visits?key=...&days=30
//
// Returns visit and lead counts for the requested period.
// Powers the /dash/leads.html dashboard.
//
// Totals, daily time series (visits + leads merged), top sources, top landing pages.

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
    const [
      totalsVisits,
      totalsLeads,
      dailyVisits,
      dailyLeads,
      bySource,
      byPage,
    ] = await Promise.all([
      env.DB.prepare(
        `SELECT COUNT(*) as sessions FROM sessions WHERE created_at >= ?`
      ).bind(since).first(),

      env.DB.prepare(
        `SELECT COUNT(*) as leads FROM event_log WHERE event_name = 'Lead' AND timestamp >= ? AND is_bot = 0`
      ).bind(since).first(),

      env.DB.prepare(`
        SELECT date(created_at, 'unixepoch') as day, COUNT(*) as visits
        FROM sessions WHERE created_at >= ?
        GROUP BY day ORDER BY day
      `).bind(since).all(),

      env.DB.prepare(`
        SELECT date(timestamp, 'unixepoch') as day, COUNT(*) as leads
        FROM event_log WHERE event_name = 'Lead' AND timestamp >= ? AND is_bot = 0
        GROUP BY day ORDER BY day
      `).bind(since).all(),

      env.DB.prepare(`
        SELECT
          COALESCE(NULLIF(utm_source, ''), '(direto)') as source,
          COUNT(*) as visits
        FROM sessions WHERE created_at >= ?
        GROUP BY source ORDER BY visits DESC LIMIT 10
      `).bind(since).all(),

      env.DB.prepare(`
        SELECT landing_url, COUNT(*) as visits
        FROM sessions WHERE created_at >= ?
        GROUP BY landing_url ORDER BY visits DESC LIMIT 10
      `).bind(since).all(),
    ]);

    // Merge daily visits + leads into one array keyed by date
    const dayMap = {};
    for (const row of (dailyVisits.results || [])) {
      dayMap[row.day] = { visits: row.visits, leads: 0 };
    }
    for (const row of (dailyLeads.results || [])) {
      if (!dayMap[row.day]) dayMap[row.day] = { visits: 0, leads: row.leads };
      else dayMap[row.day].leads = row.leads;
    }
    const daily = Object.entries(dayMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, v]) => ({ day, ...v }));

    const sessions = totalsVisits?.sessions || 0;
    const leads = totalsLeads?.leads || 0;

    return json({
      days,
      totals: {
        sessions,
        leads,
        conversion_rate: sessions > 0
          ? parseFloat(((leads / sessions) * 100).toFixed(2))
          : 0,
      },
      daily,
      by_source: bySource.results || [],
      by_page: byPage.results || [],
    });
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

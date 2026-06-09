// GET /api/revenue?key=...&days=30
//            OR   ?key=...&from=YYYY-MM-DD&to=YYYY-MM-DD
import { parseDateRange } from './_range.js';

export async function onRequestGet(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const { since, until } = parseDateRange(url);

  try {
    const totals = await env.DB.prepare(`
      SELECT
        COALESCE(SUM(value), 0) as gross,
        COUNT(*) as sales,
        COALESCE(AVG(value), 0) as aov,
        COALESCE(MAX(currency), 'BRL') as currency
      FROM purchase_log
      WHERE created_at >= ? AND created_at <= ?
    `).bind(since, until).first();

    const series = await env.DB.prepare(`
      SELECT
        date(created_at, 'unixepoch') as date,
        COALESCE(SUM(value), 0) as revenue,
        COUNT(*) as sales
      FROM purchase_log
      WHERE created_at >= ? AND created_at <= ?
      GROUP BY date(created_at, 'unixepoch')
      ORDER BY date ASC
    `).bind(since, until).all();

    return json({
      gross:    Number(totals?.gross || 0),
      sales:    Number(totals?.sales || 0),
      aov:      Number(totals?.aov   || 0),
      currency: totals?.currency || 'BRL',
      since, until,
      time_series: series.results || [],
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

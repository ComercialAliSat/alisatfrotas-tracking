// GET /api/products?key=...&days=30
//             OR   ?key=...&from=YYYY-MM-DD&to=YYYY-MM-DD
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
    const products = await env.DB.prepare(`
      SELECT
        product_id,
        COALESCE(MAX(product_name), product_id) as product_name,
        COALESCE(SUM(value), 0) as revenue,
        COUNT(*) as sales,
        COALESCE(AVG(value), 0) as aov,
        COALESCE(MAX(currency), 'BRL') as currency
      FROM purchase_items
      WHERE created_at >= ? AND created_at <= ?
      GROUP BY product_id
      ORDER BY revenue DESC
    `).bind(since, until).all();

    const series = await env.DB.prepare(`
      SELECT
        date(created_at, 'unixepoch') as date,
        product_id,
        COALESCE(MAX(product_name), product_id) as product_name,
        COUNT(*) as sales,
        COALESCE(SUM(value), 0) as revenue
      FROM purchase_items
      WHERE created_at >= ? AND created_at <= ?
      GROUP BY date(created_at, 'unixepoch'), product_id
      ORDER BY date ASC
    `).bind(since, until).all();

    return json({
      since, until,
      products:    products.results || [],
      time_series: series.results   || [],
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

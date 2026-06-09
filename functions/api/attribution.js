// GET /api/attribution?key=...&days=30
//                OR   ?key=...&from=YYYY-MM-DD&to=YYYY-MM-DD
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
    const rows = await env.DB.prepare(`
      SELECT
        CASE
          WHEN fbc IS NOT NULL AND fbc != '' THEN 'meta'
          WHEN (gclid != '' AND gclid IS NOT NULL)
            OR (gbraid != '' AND gbraid IS NOT NULL)
            OR (wbraid != '' AND wbraid IS NOT NULL) THEN 'google'
          ELSE 'organic'
        END as source_type,
        COUNT(*) as sales,
        COALESCE(SUM(value), 0) as revenue
      FROM purchase_log
      WHERE created_at >= ? AND created_at <= ?
      GROUP BY source_type
    `).bind(since, until).all();

    const groups = { meta: empty(), google: empty(), organic: empty() };
    for (const row of rows.results || []) {
      if (groups[row.source_type]) {
        groups[row.source_type] = {
          sales:   Number(row.sales   || 0),
          revenue: Number(row.revenue || 0),
        };
      }
    }

    const sinceDate = ymd(new Date(since * 1000));
    const untilDate = ymd(new Date(until * 1000));
    const spendRow = await env.DB.prepare(`
      SELECT COALESCE(SUM(spend_cents), 0) as spend_cents
      FROM ad_spend
      WHERE platform = 'meta' AND date >= ? AND date <= ?
    `).bind(sinceDate, untilDate).first();

    const metaSpend = Number(spendRow?.spend_cents || 0) / 100;

    const syncRow = await env.DB.prepare(`
      SELECT MAX(run_at) as last_synced_at
      FROM sync_log
      WHERE platform = 'meta' AND status = 'ok'
    `).first();

    return json({
      since, until,
      groups,
      meta_spend:    metaSpend,
      meta_cpa:      groups.meta.sales  > 0 ? metaSpend / groups.meta.sales  : null,
      meta_roas:     metaSpend          > 0 ? groups.meta.revenue / metaSpend : null,
      last_synced_at: syncRow?.last_synced_at || null,
    });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

function empty() { return { sales: 0, revenue: 0 }; }

function ymd(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

// GET /api/attribution?key=...&days=30
//                OR   ?key=...&from=YYYY-MM-DD&to=YYYY-MM-DD
//
// Per-channel performance summary: Investimento, Impressões, Cliques,
// Visitas, Leads, Vendas, CPL, CAC — for meta / google / linkedin / chatgpt,
// plus an 'organic' bucket for visits/leads/vendas (no spend concept for
// organic, so no CPL/CAC there).
//
// Channel classification (mirrors the click-identifier waterfall already
// used elsewhere in this stack — fbc > gclid/gbraid/wbraid > li_fat_id >
// oppref > organic):
//   - Visitas: sessions.{fbc,gclid,li_fat_id,oppref} (gbraid/wbraid were
//     never captured on sessions, only on checkout_sessions/purchase_log)
//   - Leads: event_log (event_name='Lead') JOIN sessions for the same fields
//   - Vendas: purchase_log.{fbc,gclid,gbraid,wbraid,oppref} directly, with a
//     LEFT JOIN through checkout_sessions -> sessions for li_fat_id (the
//     only place LinkedIn's identifier lives — purchase_log/checkout_sessions
//     never capture it directly)
//
// KNOWN GAP: Pipedrive-Won purchases (functions/webhook/pipedrive/[slug].js)
// write fbc/gclid/gbraid/wbraid to purchase_log but NOT oppref (that file is
// intentionally untouched right now — CRM migration pending), so a
// ChatGPT-Ads-attributed sale closed via Pipedrive currently falls through
// to 'organic' here. Not a bug in this file — a known upstream omission.
import { parseDateRange } from './_range.js';

const CHANNELS = ['meta', 'google', 'linkedin', 'chatgpt'];

export async function onRequestGet(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const { since, until } = parseDateRange(url);
  const sinceDate = ymd(new Date(since * 1000));
  const untilDate = ymd(new Date(until * 1000));

  try {
    const [visits, leads, sales, spend, syncStatus] = await Promise.all([
      classifiedCounts(env.DB, `
        SELECT ${channelCase('fbc', 'gclid', null, null, 'li_fat_id', 'oppref')} as channel, COUNT(*) as n
        FROM sessions
        WHERE created_at >= ? AND created_at <= ?
        GROUP BY channel
      `, [since, until]),
      classifiedCounts(env.DB, `
        SELECT ${channelCase('s.fbc', 's.gclid', null, null, 's.li_fat_id', 's.oppref')} as channel, COUNT(*) as n
        FROM event_log e
        JOIN sessions s ON e.session_id = s.session_id
        WHERE e.event_name = 'Lead' AND e.timestamp >= ? AND e.timestamp <= ? AND e.is_bot = 0
        GROUP BY channel
      `, [since, until]),
      classifiedCountsAndRevenue(env.DB, `
        SELECT ${channelCase('pl.fbc', 'pl.gclid', 'pl.gbraid', 'pl.wbraid', 's.li_fat_id', 'pl.oppref')} as channel,
               COUNT(*) as n, COALESCE(SUM(pl.value), 0) as revenue
        FROM purchase_log pl
        LEFT JOIN checkout_sessions cs ON pl.trk = cs.trk
        LEFT JOIN sessions s ON cs.session_id = s.session_id
        WHERE pl.created_at >= ? AND pl.created_at <= ?
        GROUP BY channel
      `, [since, until]),
      spendByPlatform(env.DB, sinceDate, untilDate),
      syncStatusByPlatform(env.DB),
    ]);

    const groups = {};
    for (const ch of [...CHANNELS, 'organic']) {
      const spendCents = spend[ch]?.spend_cents || 0;
      const impressions = spend[ch]?.impressions || 0;
      const clicks = spend[ch]?.clicks || 0;
      const investimento = spendCents / 100;
      const leadsN = leads[ch] || 0;
      const salesN = sales[ch]?.n || 0;

      groups[ch] = {
        investimento,
        impressoes: impressions,
        cliques: clicks,
        visitas: visits[ch] || 0,
        leads: leadsN,
        vendas: salesN,
        revenue: sales[ch]?.revenue || 0,
        cpl: leadsN > 0 && investimento > 0 ? investimento / leadsN : null,
        cac: salesN > 0 && investimento > 0 ? investimento / salesN : null,
        sync_configured: ch === 'organic' ? null : !!syncStatus[ch],
        last_synced_at: syncStatus[ch]?.last_synced_at || null,
      };
    }

    return json({ since, until, groups });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

// Builds the shared CASE-WHEN channel classifier. Pass column expressions
// (already qualified with a table alias where needed) or null to skip a
// field that doesn't exist on that particular table.
function channelCase(fbcCol, gclidCol, gbraidCol, wbraidCol, liFatIdCol, opprefCol) {
  const googleParts = [gclidCol, gbraidCol, wbraidCol]
    .filter(Boolean)
    .map(c => `(${c} != '' AND ${c} IS NOT NULL)`)
    .join(' OR ');
  return `
    CASE
      WHEN ${fbcCol} IS NOT NULL AND ${fbcCol} != '' THEN 'meta'
      ${googleParts ? `WHEN ${googleParts} THEN 'google'` : ''}
      WHEN ${liFatIdCol} IS NOT NULL AND ${liFatIdCol} != '' THEN 'linkedin'
      WHEN ${opprefCol} IS NOT NULL AND ${opprefCol} != '' THEN 'chatgpt'
      ELSE 'organic'
    END
  `;
}

async function classifiedCounts(db, sql, binds) {
  const { results } = await db.prepare(sql).bind(...binds).all();
  const out = {};
  for (const row of results || []) out[row.channel] = Number(row.n || 0);
  return out;
}

async function classifiedCountsAndRevenue(db, sql, binds) {
  const { results } = await db.prepare(sql).bind(...binds).all();
  const out = {};
  for (const row of results || []) {
    out[row.channel] = { n: Number(row.n || 0), revenue: Number(row.revenue || 0) };
  }
  return out;
}

async function spendByPlatform(db, sinceDate, untilDate) {
  const { results } = await db.prepare(`
    SELECT platform,
           COALESCE(SUM(spend_cents), 0) as spend_cents,
           COALESCE(SUM(impressions), 0) as impressions,
           COALESCE(SUM(clicks), 0) as clicks
    FROM ad_spend
    WHERE date >= ? AND date <= ?
    GROUP BY platform
  `).bind(sinceDate, untilDate).all();
  const out = {};
  for (const row of results || []) {
    out[row.platform] = {
      spend_cents: Number(row.spend_cents || 0),
      impressions: Number(row.impressions || 0),
      clicks: Number(row.clicks || 0),
    };
  }
  return out;
}

async function syncStatusByPlatform(db) {
  const { results } = await db.prepare(`
    SELECT platform, MAX(run_at) as last_synced_at
    FROM sync_log
    WHERE status = 'ok'
    GROUP BY platform
  `).all();
  const out = {};
  for (const row of results || []) {
    out[row.platform] = { last_synced_at: Number(row.last_synced_at || 0) };
  }
  return out;
}

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

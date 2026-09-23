// POST /api/sync/chatgpt-ads
//
// Pulls spend, impressions, and clicks from the OpenAI Ads Insights API for
// the account scoped to CHATGPT_ADS_API_KEY and UPSERTs them into the
// `ad_spend` table (platform='chatgpt'). Called on a schedule by an external
// cron, same pattern as /api/sync/meta-ads — see docs/ad-spend-sync.md.
//
// Auth:     header `x-sync-secret: <env.SYNC_SECRET>` — any request missing
//           or mismatching the secret is rejected 401. Reuses the same
//           SYNC_SECRET already configured for Meta.
// Body:     { date_from?: 'YYYY-MM-DD', date_to?: 'YYYY-MM-DD' }
//           Defaults to the last 7 days if omitted.
// Required env:
//   SYNC_SECRET            random string, shared between cron and this endpoint
//   CHATGPT_ADS_API_KEY    OpenAI Ads Advertiser API key (Bearer token,
//                          generated in Ads Manager → Settings). Scoped to
//                          one ad account — no separate account ID needed
//                          for these endpoints.
//
// If CHATGPT_ADS_API_KEY is missing, returns 200 with skipped:true so the
// cron provider doesn't mark the endpoint as failing.
//
// Source of the API shape: https://developers.openai.com/ads/api-reference/insights
// verified live against the real account on 2026-09-23:
//   - `time_ranges[]` must be a single JSON OBJECT per entry (not an array):
//     `{"type":"date_range","since":"YYYY-MM-DD","until":"YYYY-MM-DD"}`.
//   - `fields[]` values are dotted `entity.field` names, and the valid set
//     depends on `aggregation_level`. At `aggregation_level=campaign` the
//     available fields are `campaign.id/name/spend/impressions/clicks/...`
//     — no ad-level fields (mirrors Meta's `level=campaign` call, where
//     `ad_id`/`ad_name` are always null; ad-level breakdown would need a
//     separate `aggregation_level=ad` call and is not done here).
//   - The response rows are flat snake_case (`campaign_id`, `campaign_name`,
//     `spend`, `impressions`, `clicks`, `readable_time`), regardless of the
//     dotted request field names.
//   - `spend` is a decimal currency amount (e.g. `50.29`), NOT micros —
//     confirmed against a real response. `GET /ad_account` returned
//     `currency_code: "BRL"` for this account, matching the hardcoded
//     'BRL' fallback below (no currency field is present per-row).

export async function onRequestPost(context) {
  const { request, env } = context;

  const sentSecret = request.headers.get('x-sync-secret') || '';
  if (!env.SYNC_SECRET || sentSecret !== env.SYNC_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  if (!env.CHATGPT_ADS_API_KEY) {
    return json({
      ok: true,
      skipped: true,
      reason: 'CHATGPT_ADS_API_KEY must be set to enable sync',
    });
  }

  let body = {};
  try { body = await request.json(); } catch (_) { body = {}; }

  const { dateFrom, dateTo } = resolveRange(body.date_from, body.date_to);

  const runStartedAt = Date.now();
  let status = 'ok';
  let errorMessage = null;
  let rowsUpserted = 0;

  try {
    const rows = await fetchAllInsights(env.CHATGPT_ADS_API_KEY, dateFrom, dateTo);
    rowsUpserted = await upsertAdSpend(env.DB, rows);
  } catch (err) {
    status = 'error';
    errorMessage = err.message || String(err);
  }

  const durationMs = Date.now() - runStartedAt;
  const runAt = Math.floor(Date.now() / 1000);

  try {
    await env.DB.prepare(`
      INSERT INTO sync_log (platform, status, rows_upserted, date_from, date_to, error_message, duration_ms, run_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind('chatgpt', status, rowsUpserted, dateFrom, dateTo, errorMessage, durationMs, runAt).run();
  } catch (_) { /* ignore */ }

  if (status === 'error') {
    return json({ ok: false, error: errorMessage, rows_upserted: rowsUpserted, duration_ms: durationMs }, 500);
  }
  return json({ ok: true, rows_upserted: rowsUpserted, duration_ms: durationMs, date_from: dateFrom, date_to: dateTo });
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

async function fetchAllInsights(apiKey, dateFrom, dateTo) {
  const all = [];
  let after = null;
  let safety = 20; // prevent runaway pagination on buggy responses

  const timeRange = JSON.stringify({ type: 'date_range', since: dateFrom, until: dateTo });

  while (safety-- > 0) {
    const params = new URLSearchParams();
    params.set('aggregation_level', 'campaign');
    params.set('time_granularity', 'daily');
    params.append('time_ranges[]', timeRange);
    params.append('fields[]', 'campaign.id');
    params.append('fields[]', 'campaign.name');
    params.append('fields[]', 'campaign.spend');
    params.append('fields[]', 'campaign.impressions');
    params.append('fields[]', 'campaign.clicks');
    params.append('fields[]', 'metadata.readable_time');
    params.set('limit', '500');
    if (after) params.set('after', after);

    const url = `https://api.ads.openai.com/v1/ad_account/insights?${params.toString()}`;
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`ChatGPT Ads API ${resp.status}: ${text.slice(0, 300)}`);
    }

    const data = await resp.json();
    if (Array.isArray(data.data)) all.push(...data.data);
    if (!data.has_more || !data.last_id) break;
    after = data.last_id;
  }

  return all;
}

async function upsertAdSpend(db, rows) {
  if (!db || rows.length === 0) return 0;
  const now = Math.floor(Date.now() / 1000);

  // aggregation_level=campaign never returns ad-level fields, so ad_id/
  // ad_name stay NULL here — mirrors the Meta sync's own campaign-level call.
  const stmt = db.prepare(`
    INSERT INTO ad_spend
      (platform, date, campaign_id, campaign_name, ad_id, ad_name, spend_cents, currency, impressions, clicks, synced_at)
    VALUES ('chatgpt', ?, ?, ?, NULL, NULL, ?, ?, ?, ?, ?)
    ON CONFLICT(platform, date, campaign_id, COALESCE(ad_id, ''))
    DO UPDATE SET
      campaign_name = excluded.campaign_name,
      spend_cents   = excluded.spend_cents,
      currency      = excluded.currency,
      impressions   = excluded.impressions,
      clicks        = excluded.clicks,
      synced_at     = excluded.synced_at
  `);

  const batch = rows.map(r => stmt.bind(
    r.readable_time || '',
    String(r.campaign_id || ''),
    r.campaign_name || '',
    Math.round(parseFloat(r.spend || '0') * 100),
    'BRL',
    parseInt(r.impressions || '0', 10) || 0,
    parseInt(r.clicks || '0', 10) || 0,
    now,
  ));

  await db.batch(batch);
  return rows.length;
}

function resolveRange(dateFrom, dateTo) {
  const today = new Date();
  const fallbackFrom = addDays(today, -7);
  const from = isYmd(dateFrom) ? dateFrom : ymd(fallbackFrom);
  const to = isYmd(dateTo) ? dateTo : ymd(today);
  return { dateFrom: from, dateTo: to };
}

function isYmd(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function ymd(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function addDays(d, n) {
  const nd = new Date(d);
  nd.setUTCDate(nd.getUTCDate() + n);
  return nd;
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

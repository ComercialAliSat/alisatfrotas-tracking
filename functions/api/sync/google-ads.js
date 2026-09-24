// POST /api/sync/google-ads
//
// Pulls spend, impressions, and clicks from the Google Ads API (the same
// API surface already used for uploadClickConversions in tracker.js, just
// a reporting query instead of a conversion upload) and UPSERTs them into
// the `ad_spend` table (platform='google'). Same pattern as meta-ads.js and
// chatgpt-ads.js — see docs/ad-spend-sync.md.
//
// Auth:     header `x-sync-secret: <env.SYNC_SECRET>` — reuses the same
//           SYNC_SECRET already configured for Meta/ChatGPT.
// Body:     { date_from?: 'YYYY-MM-DD', date_to?: 'YYYY-MM-DD' }
//           Defaults to the last 7 days if omitted.
// Required env (identical set already used by tracker.js's Google Ads
// conversion upload — no new credentials needed):
//   SYNC_SECRET
//   GOOGLE_ADS_CUSTOMER_ID        the account being queried (no dashes)
//   GOOGLE_ADS_LOGIN_CUSTOMER_ID  manager account for the login-customer-id header
//   GOOGLE_ADS_DEVELOPER_TOKEN
//   GOOGLE_ADS_CLIENT_ID
//   GOOGLE_ADS_CLIENT_SECRET
//   GOOGLE_ADS_REFRESH_TOKEN
//
// If any required env is missing, returns 200 with skipped:true.
//
// cost_micros: Google Ads API returns cost in micros (1,000,000 micros =
// 1 currency unit), a documented, stable unit for this API — divided by
// 10,000 to get integer cents (matches ad_spend.spend_cents convention).

export async function onRequestPost(context) {
  const { request, env } = context;

  const sentSecret = request.headers.get('x-sync-secret') || '';
  if (!env.SYNC_SECRET || sentSecret !== env.SYNC_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const requiredEnv = [
    'GOOGLE_ADS_CUSTOMER_ID', 'GOOGLE_ADS_LOGIN_CUSTOMER_ID', 'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN',
  ];
  const missing = requiredEnv.filter(k => !env[k]);
  if (missing.length > 0) {
    return json({ ok: true, skipped: true, reason: `Missing env: ${missing.join(', ')}` });
  }

  let body = {};
  try { body = await request.json(); } catch (_) { body = {}; }

  const { dateFrom, dateTo } = resolveRange(body.date_from, body.date_to);

  const runStartedAt = Date.now();
  let status = 'ok';
  let errorMessage = null;
  let rowsUpserted = 0;

  try {
    const accessToken = await getAccessToken(env);
    if (!accessToken) throw new Error('OAuth token refresh failed');
    const rows = await fetchCampaignReport(env, accessToken, dateFrom, dateTo);
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
    `).bind('google', status, rowsUpserted, dateFrom, dateTo, errorMessage, durationMs, runAt).run();
  } catch (_) { /* ignore */ }

  if (status === 'error') {
    return json({ ok: false, error: errorMessage, rows_upserted: rowsUpserted, duration_ms: durationMs }, 500);
  }
  return json({ ok: true, rows_upserted: rowsUpserted, duration_ms: durationMs, date_from: dateFrom, date_to: dateTo });
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

async function getAccessToken(env) {
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: env.GOOGLE_ADS_CLIENT_ID,
      client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
    }),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`OAuth refresh ${resp.status}: ${text.slice(0, 300)}`);
  }
  const data = await resp.json();
  return data.access_token || null;
}

async function fetchCampaignReport(env, accessToken, dateFrom, dateTo) {
  const customerId = String(env.GOOGLE_ADS_CUSTOMER_ID).replace(/-/g, '');
  const loginCustomerId = String(env.GOOGLE_ADS_LOGIN_CUSTOMER_ID).replace(/-/g, '');

  const query = `
    SELECT campaign.id, campaign.name, metrics.cost_micros, metrics.impressions,
           metrics.clicks, segments.date
    FROM campaign
    WHERE segments.date BETWEEN '${dateFrom}' AND '${dateTo}'
      AND campaign.status != 'REMOVED'
  `.trim();

  const resp = await fetch(
    `https://googleads.googleapis.com/v21/customers/${customerId}/googleAds:searchStream`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'developer-token': env.GOOGLE_ADS_DEVELOPER_TOKEN,
        'login-customer-id': loginCustomerId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Google Ads API ${resp.status}: ${text.slice(0, 500)}`);
  }

  // searchStream returns a JSON array of { results: [...] } chunks (or a
  // single object with `results` — the API streams but Workers' fetch()
  // buffers the whole body, so we just parse whatever JSON shape comes back).
  const data = await resp.json();
  const chunks = Array.isArray(data) ? data : [data];
  const rows = [];
  for (const chunk of chunks) {
    for (const r of chunk.results || []) {
      rows.push({
        date: r.segments?.date || '',
        campaignId: r.campaign?.id != null ? String(r.campaign.id) : '',
        campaignName: r.campaign?.name || '',
        costMicros: r.metrics?.costMicros ?? r.metrics?.cost_micros ?? '0',
        impressions: r.metrics?.impressions ?? '0',
        clicks: r.metrics?.clicks ?? '0',
      });
    }
  }
  return rows;
}

async function upsertAdSpend(db, rows) {
  if (!db || rows.length === 0) return 0;
  const now = Math.floor(Date.now() / 1000);

  const stmt = db.prepare(`
    INSERT INTO ad_spend
      (platform, date, campaign_id, campaign_name, ad_id, ad_name, spend_cents, currency, impressions, clicks, synced_at)
    VALUES ('google', ?, ?, ?, NULL, NULL, ?, ?, ?, ?, ?)
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
    r.date,
    r.campaignId,
    r.campaignName,
    Math.round(parseInt(r.costMicros, 10) / 10000),
    'BRL',
    parseInt(r.impressions, 10) || 0,
    parseInt(r.clicks, 10) || 0,
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

// GET /api/journey?key=...                → lista leads com email, nome, último acesso
// GET /api/journey?key=...&email=X        → page_views de todas as sessões desse email

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const email = (url.searchParams.get('email') || '').trim().toLowerCase();

  try {
    if (!email) {
      // Lista de leads: agrupa por email, mostra nome e último acesso
      const rows = await env.DB.prepare(`
        SELECT
          LOWER(raw_email)          AS email,
          MAX(raw_name)             AS name,
          MAX(timestamp)            AS last_seen,
          COUNT(*)                  AS lead_count,
          MAX(utm_source)           AS utm_source,
          MAX(utm_medium)           AS utm_medium
        FROM event_log
        WHERE event_name = 'Lead'
          AND raw_email != ''
        GROUP BY LOWER(raw_email)
        ORDER BY last_seen DESC
        LIMIT 500
      `).all();
      return json({ leads: rows.results || [] });
    }

    // Jornada: page_views de todas as sessões que tiveram um Lead com esse email
    const pvRows = await env.DB.prepare(`
      SELECT
        pv.url,
        pv.title,
        pv.utm_source,
        pv.utm_medium,
        pv.utm_campaign,
        pv.timestamp,
        pv.country,
        pv.city,
        pv.region,
        pv.session_id
      FROM page_views pv
      WHERE pv.session_id IN (
        SELECT DISTINCT session_id
        FROM event_log
        WHERE event_name = 'Lead'
          AND LOWER(raw_email) = ?
          AND session_id IS NOT NULL
          AND session_id != ''
      )
      ORDER BY pv.timestamp ASC
      LIMIT 1000
    `).bind(email).all();

    // Lead events desse email (para contexto: quando converteu, de onde)
    const leadRows = await env.DB.prepare(`
      SELECT
        timestamp, utm_source, utm_medium, utm_campaign,
        country, city, raw_form_data, raw_name
      FROM event_log
      WHERE event_name = 'Lead'
        AND LOWER(raw_email) = ?
      ORDER BY timestamp ASC
    `).bind(email).all();

    return json({
      email,
      page_views:  pvRows.results  || [],
      lead_events: leadRows.results || [],
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

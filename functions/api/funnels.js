// GET  /api/funnels?key=...&days=30
//   Retorna todos os funis registrados em marketing_funnels,
//   enriquecidos com métricas reais do D1 (visits via sessions,
//   leads via event_log). Esse é o cruzamento de dados GTM+Tracking.
//
// POST /api/funnels?key=...
//   Cria um novo funil.  Body JSON: { name, slug, status? }

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) return json({ error: 'Unauthorized' }, 401);

  const days  = clampInt(url.searchParams.get('days'), 30, 1, 365);
  const since = Math.floor(Date.now() / 1000) - days * 86400;

  try {
    const rows = await env.DB.prepare(`
      SELECT
        f.id,
        f.name,
        f.slug,
        f.status,
        f.created_at,
        f.updated_at,
        COUNT(DISTINCT s.session_id)                                                         AS visits,
        SUM(CASE WHEN e.event_name = 'Lead' AND e.is_bot = 0 THEN 1 ELSE 0 END)             AS leads
      FROM marketing_funnels f
      LEFT JOIN sessions s
        ON (s.landing_url LIKE '%/' || f.slug
         OR s.landing_url LIKE '%/' || f.slug || '/')
        AND s.created_at >= ?
      LEFT JOIN event_log e ON e.session_id = s.session_id
      GROUP BY f.id, f.name, f.slug, f.status, f.created_at, f.updated_at
      ORDER BY f.created_at DESC
    `).bind(since).all();

    const funnels = (rows.results || []).map(r => ({
      id:              r.id,
      name:            r.name,
      slug:            r.slug,
      status:          r.status,
      created_at:      r.created_at,
      updated_at:      r.updated_at,
      visits:          r.visits  || 0,
      leads:           r.leads   || 0,
      conversion_rate: r.visits > 0
        ? parseFloat(((r.leads / r.visits) * 100).toFixed(1))
        : 0,
    }));

    return json({ days, funnels });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const key = url.searchParams.get('key');
  if (!env.DASH_KEY || key !== env.DASH_KEY) return json({ error: 'Unauthorized' }, 401);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'JSON inválido' }, 400); }

  const { name, slug, status = 'draft' } = body ?? {};

  if (!name || typeof name !== 'string' || !name.trim())
    return json({ error: 'name é obrigatório' }, 400);

  if (!slug || typeof slug !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(slug.trim()))
    return json({ error: 'slug inválido — use apenas letras minúsculas, números e hífens' }, 400);

  if (!['draft', 'published'].includes(status))
    return json({ error: 'status inválido' }, 400);

  const now = Math.floor(Date.now() / 1000);
  const id  = crypto.randomUUID();

  try {
    await env.DB.prepare(
      `INSERT INTO marketing_funnels (id, name, slug, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(id, name.trim(), slug.trim(), status, now, now).run();

    return json({ id, name: name.trim(), slug: slug.trim(), status, created_at: now, updated_at: now }, 201);
  } catch (err) {
    if (err.message?.includes('UNIQUE'))
      return json({ error: 'Esse slug já está em uso.' }, 409);
    return json({ error: err.message }, 500);
  }
}

// ── helpers ──────────────────────────────────────────────────────────────────
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

function clampInt(raw, fallback, min, max) {
  const n = parseInt(raw || '', 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

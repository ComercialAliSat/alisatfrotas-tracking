// Shared helpers for the /api/integrations/* route files. Leading underscore
// keeps this out of Pages Functions' file-based routing (same convention as
// functions/api/_range.js and functions/webhook/_utils.js).

export const ALLOWED_EVENTS = ['Lead', 'LeadUpdate', 'Purchase', 'InitiateCheckout', 'PageView'];

export function requireAuth(url, env) {
  const key = url.searchParams.get('key');
  return !!env.DASH_KEY && key === env.DASH_KEY;
}

// Shared by POST (create) and PUT (update) — returns { value } on success or
// { error } on the first validation failure.
export function validateIntegrationInput(body) {
  const {
    name, target_url, events, field_mappings = [], secret, active = true,
    auth_header_name, auth_header_prefix, auth_env_var,
  } = body ?? {};

  if (!name || typeof name !== 'string' || !name.trim())
    return { error: 'name é obrigatório' };

  if (!target_url || typeof target_url !== 'string' || !/^https?:\/\/.+/i.test(target_url.trim()))
    return { error: 'target_url precisa ser uma URL http(s) válida' };

  if (!Array.isArray(events) || events.length === 0)
    return { error: 'events precisa ter ao menos um evento' };
  const badEvent = events.find(e => !ALLOWED_EVENTS.includes(e));
  if (badEvent)
    return { error: `evento desconhecido: ${badEvent}. Use um de: ${ALLOWED_EVENTS.join(', ')}` };

  if (!Array.isArray(field_mappings))
    return { error: 'field_mappings precisa ser uma lista' };
  for (const m of field_mappings) {
    if (!m || typeof m.source !== 'string' || !m.source.trim())
      return { error: 'cada mapeamento precisa de um campo de origem (source)' };
  }

  if (auth_header_name && !auth_env_var)
    return { error: 'auth_env_var é obrigatório quando auth_header_name é definido' };

  return {
    value: {
      name: name.trim(),
      target_url: target_url.trim(),
      events,
      field_mappings: field_mappings.map(m => ({ source: m.source.trim(), target: (m.target || m.source).trim() })),
      // '' (not touching the stored secret) is distinguished from a real value
      // by the caller — PUT treats '' as "leave the existing secret alone".
      secret: typeof secret === 'string' ? secret.trim() : '',
      // Auth-header fields are config, not secrets — the real key lives only
      // in the Cloudflare env var named by auth_env_var, never here.
      auth_header_name: typeof auth_header_name === 'string' ? auth_header_name.trim() : '',
      auth_header_prefix: typeof auth_header_prefix === 'string' ? auth_header_prefix : '',
      auth_env_var: typeof auth_env_var === 'string' ? auth_env_var.trim() : '',
      active: !!active,
    },
  };
}

export function parseCsv(csv) {
  return (csv || '').split(',').map(s => s.trim()).filter(Boolean);
}

export function parseJsonArray(json) {
  try {
    const parsed = JSON.parse(json || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

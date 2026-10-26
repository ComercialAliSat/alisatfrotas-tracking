-- Adds optional "call an authenticated API" support to integrations — the
-- HMAC `secret` column (migration 0028) signs OUR outgoing payload so a
-- receiver we control (Apps Script, n8n) can verify it came from us; this is
-- the opposite direction: proving to a third-party API (a CRM) that WE are
-- allowed to call THEM, using a key they issued.
--
-- The API key itself is never stored here — auth_env_var names a Cloudflare
-- environment variable (set in the dashboard, same as META_ACCESS_TOKEN
-- etc.) and the dispatcher reads it at delivery time. Keeps real secrets out
-- of the D1 row the /dash UI can display/edit.
ALTER TABLE integrations ADD COLUMN auth_header_name TEXT;   -- e.g. 'x-api-key', 'Authorization'
ALTER TABLE integrations ADD COLUMN auth_header_prefix TEXT; -- e.g. 'Bearer ' — prepended to the env var value, optional
ALTER TABLE integrations ADD COLUMN auth_env_var TEXT;       -- e.g. 'CRM' — name of the Cloudflare env var holding the key

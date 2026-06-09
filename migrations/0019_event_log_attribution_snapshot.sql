-- Snapshot de atribuição por evento: congela UTMs e geo no momento da conversão.
-- Resolve contaminação de UTM: o JOIN à sessions retornava UTMs mutáveis;
-- agora cada lead tem suas próprias UTMs imutáveis tiradas no momento do disparo.
-- Geo vem dos headers Cloudflare (request.cf) disponíveis no Worker.

ALTER TABLE event_log ADD COLUMN utm_source   TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN utm_medium   TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN utm_campaign TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN utm_content  TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN utm_term     TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN country      TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN city         TEXT NOT NULL DEFAULT '';
ALTER TABLE event_log ADD COLUMN region       TEXT NOT NULL DEFAULT '';

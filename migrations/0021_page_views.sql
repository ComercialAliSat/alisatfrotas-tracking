-- Histórico de page views por sessão.
-- PageView nunca é gravado em event_log (regra do stack: D1 write volume).
-- Esta tabela captura visitas de página para alimentar a Jornada do Lead no dash.
-- Vinculada a leads via: page_views.session_id → event_log.session_id (mesmo _krob_sid na visita).

CREATE TABLE IF NOT EXISTS page_views (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id   TEXT    NOT NULL,
  url          TEXT    NOT NULL DEFAULT '',
  title        TEXT    NOT NULL DEFAULT '',
  utm_source   TEXT    NOT NULL DEFAULT '',
  utm_medium   TEXT    NOT NULL DEFAULT '',
  utm_campaign TEXT    NOT NULL DEFAULT '',
  timestamp    INTEGER NOT NULL,
  country      TEXT    NOT NULL DEFAULT '',
  city         TEXT    NOT NULL DEFAULT '',
  region       TEXT    NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_page_views_session   ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);

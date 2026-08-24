-- Lead scoring, keyed by external_id (not session_id — a lead spans many
-- sessions/devices; external_id is what survives across them, recovered via
-- the leadid loop in functions/_middleware.js when needed).
-- Written by functions/webhook/brevo/[slug].js on opened/click/unsubscribed/
-- hard_bounce/soft_bounce events. funnel_stage is populated starting in a
-- later phase (content-weighted page views) — left '' until then.
CREATE TABLE IF NOT EXISTS lead_score (
    external_id       TEXT    PRIMARY KEY,
    score             INTEGER NOT NULL DEFAULT 0,
    funnel_stage      TEXT    NOT NULL DEFAULT '',   -- '' | 'topo' | 'meio' | 'fundo'
    last_event_type   TEXT    NOT NULL DEFAULT '',
    last_event_at     INTEGER,
    hot_alert_sent_at INTEGER,
    created_at        INTEGER NOT NULL,
    updated_at        INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lead_score_updated_at ON lead_score(updated_at);

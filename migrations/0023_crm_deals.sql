-- crm_deals: bridge table between our identity (external_id) and the
-- Pipedrive CRM (person_id / deal_id). Fixes the "every form resubmit
-- creates a new Deal" bug — see ARCHITECTURE_V2_PLAN.md Fase 1.
--
-- One row per Pipedrive Deal WE created (or backfilled from Pipedrive when
-- a Lead/webhook touches a person who already had a Deal before this
-- table existed). deal_id is the Pipedrive deal id itself (not an
-- autoincrement) — there is exactly one Deal per person in this Fase 1
-- (we never create a second Deal for a person who already has one, in
-- any status), so deal_id doubles as "the opportunity for this person".
--
-- email/phone are deliberately NOT duplicated here — Pipedrive's own
-- Person record is already the source of truth for those; crm_deals only
-- needs to know WHICH person/deal, not re-store contact fields.
--
-- value/currency are for INTERNAL bookkeeping only (dashboard, future
-- reporting) — functions/webhook/pipedrive/[slug].js never sends these to
-- Meta or Google Ads (see docs/data-flow.md Hop 8).
CREATE TABLE IF NOT EXISTS crm_deals (
    deal_id      INTEGER PRIMARY KEY,   -- Pipedrive deal id = our opportunity_id
    person_id    INTEGER NOT NULL,      -- Pipedrive person id
    org_id       INTEGER,               -- Pipedrive organization id, when applicable
    external_id  TEXT,                  -- our contact_id (sessions.external_id), when known at creation time
    status       TEXT NOT NULL DEFAULT 'open',  -- 'open' | 'won' | 'lost'
    pipeline_id  INTEGER,
    stage_id     INTEGER,
    value        REAL NOT NULL DEFAULT 0,   -- internal only, never sent to ad platforms
    currency     TEXT NOT NULL DEFAULT 'BRL',
    lost_reason  TEXT,
    created_at   INTEGER NOT NULL,
    updated_at   INTEGER NOT NULL,
    won_at       INTEGER,
    lost_at      INTEGER,
    reopened_at  INTEGER
);

CREATE INDEX IF NOT EXISTS idx_crm_deals_external_id ON crm_deals(external_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_person_id   ON crm_deals(person_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_status      ON crm_deals(status);

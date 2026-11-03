-- Google Ads server-side conversion log + iOS/Safari click identifiers.
--
-- 1) wbraid / gbraid on sessions: Google sends these instead of gclid on some
--    iOS (privacy-limited) clicks. The middleware now stores them next to
--    gclid so uploadClickConversions can fall back to them (gclid > wbraid >
--    gbraid, the order the code already used).
--
-- 2) google_ads_log: one row per upload attempt from /tracker. The upload uses
--    partialFailure, so Google answers HTTP 200 even when it rejects the
--    conversion (bad gclid, conversion before click, wrong action type...).
--    response_ok is 0 in that case and response_body keeps Google's reason.
--    Kept in its own table so a logging problem can never affect event_log.
--
-- APPLY BEFORE DEPLOYING the code that writes these columns/table.
ALTER TABLE sessions ADD COLUMN wbraid TEXT;
ALTER TABLE sessions ADD COLUMN gbraid TEXT;

CREATE TABLE IF NOT EXISTS google_ads_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    event_name TEXT,                  -- 'Lead' | 'LeadQualificado'
    event_id TEXT,                    -- also sent to Google as order_id (dedup on retries)
    conversion_action_id TEXT,
    click_id_type TEXT,               -- 'gclid' | 'wbraid' | 'gbraid' | '' (skipped)
    status_code INTEGER DEFAULT 0,    -- HTTP status from Google (0 = not sent)
    response_ok INTEGER DEFAULT 0,    -- 1 only if HTTP ok AND no partialFailureError
    skipped_reason TEXT,              -- e.g. 'no click id', 'missing google ads env'
    response_body TEXT,
    payload_sent TEXT,
    created_at INTEGER NOT NULL       -- unix seconds
);

CREATE INDEX IF NOT EXISTS idx_google_ads_log_created
    ON google_ads_log(created_at DESC);

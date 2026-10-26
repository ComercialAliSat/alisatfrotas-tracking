-- Generic outbound integrations ("sockets"): the operator plugs in a
-- webhook URL (a spreadsheet via Google Apps Script Web App, Zapier, a new
-- CRM, anything that accepts an HTTP POST) from the /dash UI, without any
-- code change or redeploy. Each integration subscribes to one or more event
-- names and defines its own field_mappings (source field → output key), so
-- different destinations can receive different shapes from the same event.
-- The operator's own CRM/spreadsheet gets wired in here, not hardcoded
-- into application code.
CREATE TABLE IF NOT EXISTS integrations (
    id             TEXT    PRIMARY KEY,              -- uuid
    name           TEXT    NOT NULL,
    target_url     TEXT    NOT NULL,
    events         TEXT    NOT NULL,                  -- comma-separated: Lead,LeadUpdate,Purchase,InitiateCheckout,PageView
    field_mappings TEXT    NOT NULL DEFAULT '[]',      -- JSON array [{ "source": "em", "target": "email" }, ...]
    secret         TEXT,                               -- optional — HMAC-SHA256 signs the outgoing body when set
    active         INTEGER NOT NULL DEFAULT 1,
    created_at     INTEGER NOT NULL,
    updated_at     INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_integrations_active ON integrations(active);

-- Delivery log — every attempt (real event or manual "Testar envio"), so the
-- dashboard can show per-integration health without needing a queue/retry
-- system (consistent with the rest of the stack: no queue infra).
CREATE TABLE IF NOT EXISTS integration_log (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    integration_id TEXT    NOT NULL,
    event_name     TEXT    NOT NULL,
    status_code    INTEGER NOT NULL DEFAULT 0,
    ok             INTEGER NOT NULL DEFAULT 0,
    response_body  TEXT,
    payload_sent   TEXT,
    error          TEXT,
    created_at     INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_integration_log_integration_id ON integration_log(integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_log_created_at     ON integration_log(created_at);

-- Capture LinkedIn's first-party ads tracking cookie (li_fat_id) in sessions.
-- Set by the LinkedIn Insight Tag; used as a user identifier in the LinkedIn
-- Conversions API alongside hashed email. NULL on sessions where the visitor
-- did not have the Insight Tag cookie present at page load.
ALTER TABLE sessions ADD COLUMN li_fat_id TEXT;

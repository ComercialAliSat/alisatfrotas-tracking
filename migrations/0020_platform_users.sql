-- Platform users for email+password login
CREATE TABLE IF NOT EXISTS platform_users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT    NOT NULL,
  created_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  last_login    INTEGER
);

-- Admin/member roles for platform_users. Schema only — all rows default
-- to 'member' here; promoting the initial admin(s) is a deliberate,
-- separate data step (not baked into the migration), same as every other
-- data backfill in this project.
ALTER TABLE platform_users ADD COLUMN role TEXT NOT NULL DEFAULT 'member';

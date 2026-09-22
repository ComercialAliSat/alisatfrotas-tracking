# D1 schema reference

Seven tables, no foreign keys except `purchase_items → purchase_log`.
Every `id` is an auto-increment integer except `sessions.session_id`
(UUID) and `checkout_sessions.trk` (UUID). Every timestamp is Unix seconds
(integer), except `ad_spend.date` which is `'YYYY-MM-DD'` because Meta's
API returns dates that way.

Applied in order via `wrangler d1 migrations apply`. Migration 0005 was
skipped in prod history and is intentionally absent here.

## `sessions`

One row per visitor. Keyed by `session_id` (the `_krob_sid` cookie).
Written by `functions/_middleware.js` via UPSERT on every HTML page load.
Read by `functions/tracker.js` and `functions/checkout-session.js` to
enrich outgoing events with server-captured attribution.

| Column | Type | Purpose |
|---|---|---|
| `session_id` | TEXT PK | UUID, matches `_krob_sid` cookie |
| `external_id` | TEXT | UUID, matches `_krob_eid` cookie — used as Meta Advanced Matching `external_id` |
| `fbclid` | TEXT | Raw value from URL, undecoded |
| `gclid` | TEXT | Google Ads click id |
| `msclkid` | TEXT | Microsoft Ads click id |
| `oppref` | TEXT | ChatGPT Ads click id (added in migration 0026) — OpenAI's `gclid`/`fbclid` equivalent, appended to the destination URL on ad clicks |
| `fbc` | TEXT | Meta spec: `fb.{subdomainIndex}.{ts}.{fbclid}` |
| `fbp` | TEXT | Meta spec: `fb.{subdomainIndex}.{ts}.{10-digit random}` |
| `ip_address` | TEXT | From `cf-connecting-ip` |
| `user_agent` | TEXT | From `user-agent` header |
| `referrer` | TEXT | From `referer` header |
| `landing_url` | TEXT | Full URL of the first page the visitor landed on |
| `utm_source` | TEXT | UTM parameter (added in migration 0011) |
| `utm_medium` | TEXT | |
| `utm_campaign` | TEXT | |
| `utm_content` | TEXT | |
| `utm_term` | TEXT | |
| `created_at` | INTEGER | Unix seconds, first visit |
| `updated_at` | INTEGER | Unix seconds, last visit |

**Index**: `idx_sessions_created` on `created_at`.

**UPSERT behavior**: `fbclid` / `gclid` / `msclkid` / `fbc` / `utm_*` use
CASE-WHEN-empty — a return visit without the parameter keeps the original
value; a return visit WITH a different parameter overwrites.

## `event_log`

One row per non-PageView event. Written by `functions/tracker.js` in
`waitUntil`. Read by `functions/api/events.js` (tracking health) and
`functions/api/leads.js` (lead list with UTMs via JOIN on `sessions`).

| Column | Type | Purpose |
|---|---|---|
| `id` | INTEGER PK | Auto |
| `session_id` | TEXT | JOIN key back to `sessions` |
| `event_name` | TEXT | `Lead`, `InitiateCheckout`, `CompleteRegistration`, etc. — NEVER `PageView` |
| `event_id` | TEXT | UUID, dedup key with Meta browser pixel |
| `timestamp` | INTEGER | Unix seconds |
| `browser` / `browser_version` / `os` / `is_mobile` | TEXT / INTEGER | Parsed from UA |
| `pixel_was_blocked` | INTEGER | 1 if client sent no `fbp` and no `fbc` |
| `fbp_source` | TEXT | `pixel_js` / `middleware_http` / `tracker_http` / `none` |
| `fbc_source` | TEXT | Same domain |
| `fbclid_source` | TEXT | `server_middleware` / `client_url` / `none` |
| `ga_cookie_present` | INTEGER | 1 if `_ga` cookie existed |
| `ga_client_id_fallback` | INTEGER | 1 if we synthesized the client_id instead of parsing it |
| `itp_cookie_extended` | INTEGER | 1 if we recovered `fbp` from the middleware HTTP cookie (i.e. ITP truncated the JS cookie) |
| `is_bot` / `bot_reason` | INTEGER / TEXT | From `detectBot()` |
| `consent_status` | TEXT | Recipient-defined; defaults to `unknown` |
| `sent_to_meta` / `meta_response_ok` | INTEGER | Fire + ack |
| `sent_to_ga4` / `ga4_response_ok` | INTEGER | Same |
| `has_email` / `has_phone` / `has_name` | INTEGER | Coverage flags for dashboard |
| `meta_response_body` | TEXT | Raw Meta response, for debugging (added 0010) |
| `raw_email` | TEXT | Unhashed, for dashboard display of lead list (added 0010) |

**Indexes**: `idx_event_log_timestamp`, `idx_event_log_event_name`,
`idx_event_log_browser`, `idx_event_log_event_id_unique` (unique, added
0024 — makes ingestion idempotent against a client retry that resends the
same event_id; mirrors the protection `purchase_log.transaction_id` already
had via 0012).

## `checkout_sessions`

One row per sales-page visit (technically per `trk`). Written by
`functions/checkout-session.js` with `INSERT OR REPLACE`. Read by
`functions/webhook/_core.js` when a webhook arrives — this is the
enrichment join that makes purchase-time attribution work.

| Column | Type | Purpose |
|---|---|---|
| `trk` | TEXT PK | UUID from the sales page |
| `session_id` | TEXT | Join key back to `sessions` |
| `ip_address` / `user_agent` | TEXT | Captured at checkout intent time |
| `external_id` | TEXT | From cookie / sessions row |
| `fbp` / `fbc` | TEXT | Resolved with fallback chain |
| `gclid` / `gbraid` / `wbraid` | TEXT | Google Ads click ids |
| `oppref` | TEXT | ChatGPT Ads click id (added in migration 0026) |
| `ga_client_id` | TEXT | Parsed from `_ga` cookie (added 0009); fallback to synthetic |
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_content` / `utm_term` | TEXT | UTMs at checkout-intent time |
| `event_source_url` | TEXT | Full URL of the sales page |
| `created_at` | INTEGER | Unix seconds |

**Index**: `idx_checkout_sessions_created` on `created_at`.

## `purchase_log`

One row per successful webhook-processed purchase. Written by
`functions/webhook/_core.js` in `waitUntil`. Read by the dashboard
(`api/revenue.js`, `api/products.js`, `api/attribution.js`,
`api/utm-breakdown.js`, `api/purchases.js`).

The table is wide on purpose — it persists the full request/response for
every fan-out, so the dashboard can show which specific Meta error
rejected a specific sale without needing to re-run anything.

| Column group | Columns | Purpose |
|---|---|---|
| **Identity** | `id`, `trk`, `event_id`, `event_time`, `transaction_id` | `transaction_id` has a unique index (0012) to dedupe webhook retries |
| **PII (raw)** | `raw_email`, `raw_name`, `raw_phone` | For display in dashboard only; never leaves the recipient's infrastructure |
| **PII (hashed)** | `hashed_em`, `hashed_fn`, `hashed_ln`, `hashed_ph`, `hashed_external_id` | Exactly what went to Meta |
| **Navigation** | `client_ip_address`, `client_user_agent`, `fbp`, `fbc` | Copied from `checkout_sessions` at enrichment time |
| **Purchase data** | `value`, `currency`, `product_id`, `product_name` | `value` is REAL |
| **Event metadata** | `event_source_url`, `action_source` (default `website`) | |
| **Meta response** | `meta_status_code`, `meta_response_ok`, `meta_response_body`, `meta_payload_sent` | Full request + response |
| **GA4 response** | `ga4_status_code`, `ga4_response_ok`, `ga4_response_body`, `ga4_payload_sent` | Same |
| **Google Ads response** | `google_ads_status_code`, `google_ads_response_ok`, `google_ads_response_body`, `google_ads_payload_sent` | `response_ok = 0` if Google Ads returned 200 but the body had a `partialFailureError` |
| **Click IDs** | `gclid`, `gbraid`, `wbraid`, `oppref` | Copied from `checkout_sessions`; `gclid`/`gbraid`/`wbraid` used by Google Ads fan-out, `oppref` (added 0026) is the ChatGPT Ads click id |
| **UTMs (from webhook)** | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | The webhook payload's UTMs (may differ from `sessions`/`checkout_sessions` if the platform appends its own) |
| **Encharge response** | `encharge_status_code`, `encharge_response_ok`, `encharge_response_body` | |
| **ManyChat response** | `manychat_status_code`, `manychat_response_ok`, `manychat_response_body` | |
| **Timestamp** | `created_at` | Unix seconds |

**Indexes**: `idx_purchase_log_trk`, `idx_purchase_log_created`,
`idx_purchase_log_event_id`, `idx_purchase_log_product_id`,
`idx_purchase_log_transaction_id` (unique — dedup guard).

**Migration history**: 0003 created it, 0004 added product + Encharge +
ManyChat columns, 0006 added Google Ads columns, 0007 added
`*_payload_sent` columns plus `ga4_response_body`, 0012 added the unique
transaction index.

## `purchase_items`

One row per line-item inside a purchase. Written by `_core.js` as a
`db.batch()` right after the `purchase_log` insert. Read by
`api/products.js` for per-product revenue breakdowns.

| Column | Type | Purpose |
|---|---|---|
| `id` | INTEGER PK | Auto |
| `purchase_id` | INTEGER | FK → `purchase_log.id` |
| `transaction_id` | TEXT | Denormalized for direct lookup |
| `product_id` | TEXT NOT NULL | Platform's product ID |
| `product_name` | TEXT | |
| `value` | REAL NOT NULL | Line total |
| `currency` | TEXT NOT NULL | Defaults to parent or 'BRL' |
| `utm_source` / `utm_campaign` / `utm_medium` / `utm_content` / `utm_term` | TEXT | Denormalized from parent for cheap GROUP BY queries |
| `created_at` | INTEGER NOT NULL | Unix seconds |

**Indexes**: `idx_purchase_items_purchase` (on `purchase_id`),
`idx_purchase_items_product` (on `(product_id, created_at)`).

**Invariant**: `SUM(purchase_items.value) WHERE purchase_id = X` equals
`purchase_log.value` where `id = X`. Enforced by the rollback in
`handlePurchaseLog` — if any item insert fails, the parent row is
deleted so the invariant always holds.

## `ad_spend`

One row per `(platform, date, campaign_id, ad_id)` tuple. Written by
`functions/api/sync/meta-ads.js` and `functions/api/sync/chatgpt-ads.js` on
each cron run via UPSERT. Read by `functions/api/attribution.js` for
CPA/ROAS calculations.

| Column | Type | Purpose |
|---|---|---|
| `id` | INTEGER PK | Auto |
| `platform` | TEXT | `meta`, `chatgpt` today; `google` is the slot for future Google Ads sync |
| `date` | TEXT | `'YYYY-MM-DD'` in the ad account's timezone |
| `campaign_id` | TEXT NOT NULL | Meta campaign ID |
| `campaign_name` | TEXT | |
| `ad_id` | TEXT | Nullable — Meta returns campaign-level first, ad-level later |
| `ad_name` | TEXT | |
| `spend_cents` | INTEGER NOT NULL | Integer cents to avoid float drift across sync runs |
| `currency` | TEXT DEFAULT 'BRL' | |
| `impressions` / `clicks` | INTEGER | |
| `synced_at` | INTEGER NOT NULL | Unix seconds |

**Indexes**: unique on `(platform, date, campaign_id, COALESCE(ad_id, ''))`
for UPSERT; `idx_ad_spend_date` and `idx_ad_spend_platform_date` for
dashboard range queries.

**Why integer cents**: Meta's API returns strings like `"19.47"`. Stored as
REAL, repeated sync runs would accumulate float drift. Stored as
`Math.round(parseFloat(x) * 100)`, totals are exact forever.

## `sync_log`

One row per `/api/sync/*` invocation. Written by the sync endpoint, read
by the dashboard's "last synced at" indicator.

| Column | Type | Purpose |
|---|---|---|
| `id` | INTEGER PK | Auto |
| `platform` | TEXT NOT NULL | `meta` / `chatgpt` / `google` |
| `status` | TEXT NOT NULL | `ok` / `error` |
| `rows_upserted` | INTEGER | 0 on failure |
| `date_from` / `date_to` | TEXT | `'YYYY-MM-DD'` range pulled |
| `error_message` | TEXT | Null on success |
| `duration_ms` | INTEGER | For performance monitoring |
| `run_at` | INTEGER NOT NULL | Unix seconds |

**Index**: `idx_sync_log_platform_run_at` on `(platform, run_at DESC)`.

## `lead_score`

One row per `external_id` (not per session — a lead spans many sessions/
devices over time; `external_id` is the identity that survives across them,
recovered via the `leadid` loop in `functions/_middleware.js` when a lead
opens/clicks an email on a device with no existing cookie — see "Hop 7" in
`docs/data-flow.md`). Written by `functions/webhook/brevo/[slug].js` on
`opened` / `click` / `unsubscribed` / `hard_bounce` / `soft_bounce` events
from the Brevo webhook.

| Column | Type | Purpose |
|---|---|---|
| `external_id` | TEXT PK | Matches `sessions.external_id` / the Brevo `EXTERNAL_ID` contact attribute |
| `score` | INTEGER | Clamped at 0 minimum — see `POINTS_BY_EVENT` in the webhook adapter for point values |
| `funnel_stage` | TEXT | `''` \| `'topo'` \| `'meio'` \| `'fundo'` — populated starting in the content-weighting phase; empty until then |
| `last_event_type` | TEXT | Most recent scored event: `opened` / `click` / `unsubscribed` / `hard_bounce` / `soft_bounce` |
| `last_event_at` | INTEGER | Unix seconds of `last_event_type` |
| `hot_alert_sent_at` | INTEGER | Nullable — set when a reincidência alert fires, to avoid re-alerting on the same lead (later phase) |
| `created_at` | INTEGER | Unix seconds, first scored event |
| `updated_at` | INTEGER | Unix seconds, most recent scored event |

**Index**: `idx_lead_score_updated_at` on `updated_at`.

**Identity resolution**: the webhook prefers `EXTERNAL_ID` if the recipient
configured Brevo to include that contact attribute in the webhook payload;
otherwise it falls back to `email → event_log.raw_email → sessions` — the
same lookup `functions/webhook/pipedrive/[slug].js` uses for won-deal
enrichment, taking the earliest session on record for that address. An
event for an unresolvable identity is acknowledged and skipped, not an
error — Brevo may report engagement for contacts that predate this
integration.

## `crm_deals`

Added in migration 0023 (see `ARCHITECTURE_V2_PLAN.md` Fase 1). Bridges our
identity (`external_id`) to the Pipedrive CRM (`person_id` / `deal_id`) so a
contact who resubmits a Lead form never generates a duplicate Deal. One row
per Deal **we** created or backfilled — never more than one open/won/lost
Deal per person in this phase. Written by both
`functions/outputs/pipedrive.js` (Lead-time creation/reuse/reopen) and
`functions/webhook/pipedrive/[slug].js` (status-transition bookkeeping).

| Column | Type | Purpose |
|---|---|---|
| `deal_id` | INTEGER PK | Pipedrive deal id — doubles as our `opportunity_id` |
| `person_id` | INTEGER | Pipedrive person id |
| `org_id` | INTEGER | Pipedrive organization id, when applicable |
| `external_id` | TEXT | Our contact_id (`sessions.external_id`), stamped at Deal-creation time when known |
| `status` | TEXT | `open` \| `won` \| `lost` |
| `pipeline_id` / `stage_id` | INTEGER | Kept in sync on every webhook delivery, even non-lifecycle ones |
| `value` / `currency` | REAL / TEXT | Internal bookkeeping only — **never** sent to Meta/Google Ads (see Pipedrive lifecycle note below) |
| `lost_reason` | TEXT | From Pipedrive's `current.lost_reason`, when present |
| `created_at` / `updated_at` | INTEGER | Unix seconds |
| `won_at` / `lost_at` / `reopened_at` | INTEGER | Nullable, set on the matching transition. `won_at` is never cleared, even if the Deal is later reopened. |
| `pipedrive_updated_at` | INTEGER | Added in migration 0025. Microseconds, from the webhook's `meta.timestamp_micro` (fallback: `meta.timestamp * 1_000_000`). Used to reject an out-of-order webhook delivery that describes an older change than one already applied — see "Pipedrive lifecycle" below and Hop 8 in `docs/data-flow.md`. NULL for rows never touched by a webhook (created via the Lead flow or backfilled from a plain API read). |

**Indexes**: `idx_crm_deals_external_id`, `idx_crm_deals_person_id`,
`idx_crm_deals_status` (`deal_id` is already indexed as the PK).

**Deliberately not stored here**: email/phone (Pipedrive's own Person
record is already the source of truth for those — `crm_deals` only needs to
know *which* person/deal, not re-store contact fields).

**Pipedrive lifecycle (Fase 1)**:
- No Deal yet → create, insert `crm_deals` (`status='open'`).
- Deal `open` → reuse it, add a note, no new Deal.
- Deal `lost` → reopen the *same* Deal (moved to the first stage of
  "Pré Vendas"), add a note, `status` back to `open`, `reopened_at` set.
- Deal `won` → never reopened or duplicated; only a note is added. A Won
  customer converting again may want a different product — creating a
  *new* opportunity for existing customers is deliberately deferred to a
  future phase with its own rule.
- `updated.deal` webhook: only an `open → won` transition fires ad-platform
  conversions (Meta CAPI + Google Ads `uploadClickConversions`), and only
  the *occurrence* of a sale — `value`/`currency` are never included in
  those payloads, even though the real value is stored in `crm_deals.value`
  and `purchase_log.value` for internal reporting. `lost`, `lost → open`,
  and `won → open` (a rep manually reopening a Won deal directly in
  Pipedrive — `won_at` stays intact) update `crm_deals` only; nothing is
  sent to ad platforms for those.
- Every status transition is claimed with a conditional
  `INSERT ... ON CONFLICT DO UPDATE ... WHERE status != 'X' AND (incoming
  meta.timestamp_micro > crm_deals.pipedrive_updated_at OR the latter is
  NULL)`. The status check alone protects against a *redelivered* webhook;
  the timestamp check additionally protects against an *out-of-order*
  delivery (an older change arriving after a newer one already moved the
  status elsewhere) — see Hop 8 in `docs/data-flow.md`.

## Things NOT in the schema (deliberate)

- **No `leads` table.** Lead events live in `event_log` and are joined to
  `sessions` at query time for UTM display. Avoids duplicating
  attribution data.
- **No `customers` table.** Email is the de facto customer key; resolving
  "same email across purchases" is a reporting concern, not a schema
  concern.
- **No soft-delete columns.** Retention is handled out-of-band if the
  recipient needs it.
- **No `migration_history` table beyond what `wrangler d1 migrations
  apply` manages internally.** Don't add one.

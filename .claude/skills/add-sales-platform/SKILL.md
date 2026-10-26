---
name: add-sales-platform
description: Add support for a sales platform's webhook. Use when the recipient says "I use [sales platform]", "add support for X", "my checkout runs on Y", or asks how to wire a new sales platform into the webhook pipeline. Creates a new functions/webhook/<platform>/[slug].js adapter and a matching docs/platforms/<platform>.md doc, generates a fresh URL slug, and walks the recipient through capturing the platform's payload shape.
---

# Skill: add-sales-platform

No sales platform ships pre-wired in this stack — every recipient adds the
one they actually use. This skill adds it as a new webhook adapter. The
architecture is deliberately built to make this safe: `_core.js` never
branches per platform, so all the new logic lives in exactly two new
files — one adapter under `functions/webhook/<platform>/[slug].js` and one
doc under `docs/platforms/<platform>.md` — plus one new env var holding the
URL slug.

If the recipient isn't sure whether they need this skill, ask them what
sales platform they use, then check whether `functions/webhook/<that
platform>/[slug].js` already exists — if it does, they just need the
webhook URL from `deploy-stack`, not this skill.

## Step 1 — Gather the platform info

You need five pieces of information from the recipient. Ask for them in
this order, one or two at a time — don't dump the whole list at once.

1. **Platform name** — used as the filename (lowercase, no spaces).
   e.g. `"PayPal Checkout"` → `paypal`.
2. **A real (sanitized) webhook body**. The single most important input.
   Ask the recipient to:
   - Log into the platform's dashboard.
   - Trigger a test webhook (many platforms have a "send test" button;
     if not, run a real purchase with a 100%-off coupon). Note that
     test payloads often differ from real-purchase payloads — if the
     platform offers both, grab a REAL purchase body.
   - Paste the full JSON body here. They can redact real email/phone
     values with `example@example.com` / `+5511999999999` but must
     keep the JSON structure and field names exact.
3. **Which field carries the `trk` / custom tracking value** (JSON path
   inside the body). If the platform doesn't have a custom-tracking
   field at all, this skill cannot make attribution work — flag it
   clearly and ask if they have any other URL parameter that
   round-trips to the webhook.
4. **Which URL parameter name the sales page should use** to send `trk`
   into the checkout. Usually documented under "UTM tracking", "partner
   ID", or "custom source code" in the platform's checkout settings.
5. **Which field signals a successful paid purchase** (e.g.
   `event === 'paid'`, `status === 'APPROVED'`). There may be multiple
   statuses — we only process the "money received, delivery triggered"
   one.

Signature verification is **out of scope** for this skill. All adapters
in v1 use the obscure-URL pattern (UUID slug in the path). If the
recipient wants platform-native signature verification, direct them to
the future `harden-tracking` skill.

If items 2-5 are missing and they can't get them, stop here — the
parser can't be written accurately without a real payload.

## Step 2 — Generate the URL slug

Generate a fresh UUID v4 for this platform's webhook endpoint:

```bash
NEW_SLUG=$(uuidgen | tr '[:upper:]' '[:lower:]')
PLATFORM_UPPER=$(echo "<platform>" | tr '[:lower:]' '[:upper:]')
echo "$NEW_SLUG"
```

Then tell the recipient to add it as an environment variable in the
Cloudflare dashboard — **Pages project → Settings → Environment
variables → Add variable** — with:

- **Name**: `${PLATFORM_UPPER}_WEBHOOK_SLUG`
- **Value**: `<NEW_SLUG value you printed above>`
- **Encrypt**: yes 🔒

Wait for them to confirm it's saved before moving on. Capture the slug
so you can print the full webhook URL back to the recipient in Step 8.

## Step 3 — Read the contract

Read the top-of-file comment in `functions/webhook/_core.js` — it documents
the exact normalized purchase object every adapter must produce
(`platform`, `trk`, `email`, `name`, `phone`, `value`, `currency`,
`transactionId`, `productId`, `productName`, `items[]`, `platformUtm`).
No reference adapter exists in this repo yet (no sales platform ships
pre-wired) — this one you write is the first, built directly from the
contract rather than copied from an example.

For the slug-guard wiring pattern specifically (gate on `params.slug`,
return 404/500, delegate), `functions/webhook/brevo/[slug].js` is a working
example of that shape, even though it isn't a purchase adapter.

## Step 4 — Create the platform doc

Create `docs/platforms/<platform>.md` (create the `docs/platforms/`
directory if this is the first one). Populate it using the info gathered
in Step 1. Writing the doc before the adapter forces the adapter's parser
to match reality instead of drifting into assumptions. Cover:

- Identity (name, endpoint `/webhook/<platform>/<slug>`, adapter file path,
  sandbox availability, dashboard URL)
- Endpoint security — the obscure-URL pattern (UUID slug in the path, no
  signature verification in v1); note any platform-native signature scheme
  for future `harden-tracking` work but don't implement it
- The `trk` field (URL parameter name + webhook payload path)
- **Payload shape** — paste the real sanitized JSON from Step 1, item 2
- Normalized-field mapping table
- Paid-sale filter
- Known gotchas (can be empty initially; fill in after first real test)
- Verification test commands

## Step 5 — Create the adapter

```bash
mkdir -p functions/webhook/<platform>
```

Write `functions/webhook/<platform>/[slug].js` from scratch, following the
`_core.js` contract from Step 3:

1. **File-top comment** describing this platform's specifics (URL shape,
   platform-specific payload notes).
2. **Imports**:
   ```js
   import { processPurchase } from '../_core.js';
   import { guardSlug } from '../_utils.js';
   ```
3. **Guard the slug**:
   ```js
   const slugFailure = guardSlug(params.slug, env.<PLATFORM_UPPER>_WEBHOOK_SLUG);
   if (slugFailure) return slugFailure;
   ```
4. **Unwrap and parse the payload** into the normalized purchase object
   from the doc's mapping table. Set `platform` to this platform's name.
   Keep the `parsed` object's shape exactly — every key in the normalized
   purchase object is required by `_core.js`. If the platform doesn't
   provide a field, use `''` or `0`, never omit the key.
5. **Filter to paid sales** using the new platform's status check. Return
   `200 { ok: true, skipped: <reason> }` for non-paid events so the
   platform stops retrying.
6. **Delegate**: `return processPurchase({ parsed, env, context });`

Do NOT touch `_core.js` — if you feel the urge to add a platform
branch there, push the logic back into the adapter instead.

## Step 6 — Update the sales page routing

If the recipient already has sales pages using
`examples/sales-page/index.html`, the `TRK_FIELD_BY_PLATFORM` lookup
table in each page needs the new entry. Tell the recipient:

> Any existing sales page that wants to send traffic to this new
> platform needs `CHECKOUT_PLATFORM = '<platform>'` and the
> `TRK_FIELD_BY_PLATFORM` object updated with the new param name.

New sales pages created via the `add-page` skill will automatically
pick it up if you also update the starter — for v1, instruct the
recipient to edit their existing pages.

## Step 7 — Deploy and verify

Commit the adapter + doc and push — Cloudflare Pages auto-deploys on
every push to `main`:

```bash
git add functions/webhook/<platform>/ docs/platforms/<platform>.md
git commit -m "Add <platform> webhook adapter"
git push
```

Give the build ~1-2 minutes to go green (Cloudflare dashboard → Pages
project → **Deployments**). Print the full webhook URL back to the
recipient:
```
<Platform> webhook URL: https://<project>.pages.dev/webhook/<platform>/<slug>
```

Tell them to paste this into the platform's webhook configuration.

Then run the verification test from
`docs/platforms/<platform>.md`. The test should:

1. Fire a test webhook from the platform dashboard if available, OR
   complete a real zero-cost purchase end to end.
2. Check Cloudflare Workers logs for the adapter invocation.
3. Query `purchase_log` for the new row and confirm normalized fields
   landed correctly.
4. Hit `/webhook/<platform>/wrong-slug` directly — expect 404.
5. If Meta creds are set, confirm `meta_response_ok = 1` in the
   purchase row.

If the first real webhook reveals the payload shape is different from
what the recipient pasted in Step 1 (missing fields, different casing,
different status string), go back to Step 4, update the doc, then
Step 5 update the adapter, then redeploy. The doc is the source of
truth; keep it synced with the adapter.

## Step 8 — Update CLAUDE.md's file map (optional, recommended)

If the new platform is going to be the recipient's primary checkout,
add a one-line entry to the edge-runtime table in `CLAUDE.md`:

```
| `webhook/<platform>/[slug].js` | <Platform> adapter. Gates on `<PLATFORM_UPPER>_WEBHOOK_SLUG`, parses <platform> shape. |
```

This makes the file discoverable in future conversations without
grepping.

## When to stop and ask

Stop and ask the recipient if:

- The platform has no custom-tracking field at all — without one,
  webhook attribution is impossible in this architecture.
- The platform's webhook body structure differs between event types
  in ways that make a single parser brittle. Consider whether the
  recipient really needs all event types or only the paid one.
- The recipient wants to support multiple new platforms at once. Do
  them one at a time — each verification test needs its own focus.
- The recipient insists on platform-native signature verification for
  this new platform at v1 time (not v2). That's a departure from the
  current v1 norm across all platforms — confirm why before building
  it, and if you do, document the verification scheme clearly in
  `docs/platforms/<platform>.md` so `harden-tracking` knows what to
  expect later.

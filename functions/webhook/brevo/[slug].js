// -----------------------------------------------------------------------------
// Brevo webhook adapter — turns email engagement into lead_score points.
//
// URL shape: /webhook/brevo/<BREVO_WEBHOOK_SLUG>
// The per-recipient UUID stored in env.BREVO_WEBHOOK_SLUG gates the endpoint.
// Configure this URL under Brevo → Automation/Campaigns → Settings → Webhooks,
// subscribed to at least: opened, click, unsubscribed, hardBounce, softBounce.
//
// Platform specifics:
//   - Brevo's `event` field values are camelCase for bounces (hardBounce,
//     softBounce) but lowercase for the rest (opened, click, unsubscribed).
//     normalizeEventType() below maps every casing Claude has seen documented
//     to the same canonical set used by POINTS_BY_EVENT.
//   - Identity is resolved EXTERNAL_ID-first: if the recipient has configured
//     the Brevo webhook to include the EXTERNAL_ID contact attribute in the
//     payload (Brevo → Webhook settings → "contact attributes to include"),
//     it arrives as a top-level `EXTERNAL_ID` (or `external_id`) field — this
//     is the attribute functions/outputs/brevo.js stamps on every Lead event.
//   - If EXTERNAL_ID isn't in the payload, falls back to the same email →
//     event_log.raw_email → sessions lookup the Pipedrive webhook already
//     uses, taking the earliest session on record for that address.
//   - Unknown external_id (never seen a Lead event, or lookup failed) is not
//     an error — the event is acknowledged and skipped, since Brevo may send
//     engagement for contacts that predate this integration.
//
// Required env vars:
//   BREVO_WEBHOOK_SLUG   — UUID generated during deploy-stack
//
// Point values are intentionally NOT env vars (same treatment as PIPELINE_NAME/
// STAGE_NAME in outputs/pipedrive.js) — they're tuning constants, not secrets
// or per-recipient config. Edit POINTS_BY_EVENT below to change them.
// -----------------------------------------------------------------------------

import { guardSlug } from '../_utils.js';

const POINTS_BY_EVENT = {
  opened: 5,
  click: 15,
  soft_bounce: 0,       // transient (mailbox full, etc.) — logged, not scored
  unsubscribed: -50,
  hard_bounce: -50,
};

export async function onRequestPost(context) {
  const { request, env, params } = context;

  const slugFailure = guardSlug(params.slug, env.BREVO_WEBHOOK_SLUG);
  if (slugFailure) return slugFailure;

  try {
    const body = await request.json();

    const eventType = normalizeEventType(body.event);
    if (!(eventType in POINTS_BY_EVENT)) {
      return jsonResponse({ ok: true, skipped: 'event type not scored', event: body.event });
    }

    const externalId = await resolveExternalId(body, env);
    if (!externalId) {
      return jsonResponse({ ok: true, skipped: 'could not resolve lead identity', email: body.email || '' });
    }

    const delta = POINTS_BY_EVENT[eventType];
    const now = Math.floor(Date.now() / 1000);

    context.waitUntil(
      upsertLeadScore({ externalId, delta, eventType, now, env })
    );

    return jsonResponse({ ok: true, external_id: externalId, event: eventType, delta });

  } catch (err) {
    console.error('Brevo webhook error:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// -----------------------------------------------------------------------------
// Brevo's bounce events are camelCase; the rest are lowercase. Normalize to
// the snake_case keys POINTS_BY_EVENT uses so both casings (and the
// underscored variants some Brevo docs/examples show) resolve the same way.
// -----------------------------------------------------------------------------
function normalizeEventType(raw) {
  const e = (raw || '').toLowerCase().replace(/[_\s]+/g, '');
  if (e === 'opened') return 'opened';
  if (e === 'click' || e === 'clicked') return 'click';
  if (e === 'unsubscribed' || e === 'unsubscribe') return 'unsubscribed';
  if (e === 'hardbounce') return 'hard_bounce';
  if (e === 'softbounce') return 'soft_bounce';
  return e;
}

// -----------------------------------------------------------------------------
// Resolve the lead's external_id, EXTERNAL_ID-first, e-mail fallback second
// (mirrors the email → event_log → sessions lookup in
// functions/webhook/pipedrive/[slug].js).
// -----------------------------------------------------------------------------
async function resolveExternalId(body, env) {
  const fromPayload = body.EXTERNAL_ID || body.external_id || '';
  if (fromPayload) return fromPayload;

  const email = (body.email || '').toLowerCase().trim();
  if (!email || !env.DB) return '';

  try {
    const row = await env.DB.prepare(`
      SELECT s.external_id
      FROM event_log e
      JOIN sessions s ON e.session_id = s.session_id
      WHERE e.raw_email = ? AND e.session_id IS NOT NULL
      ORDER BY e.timestamp ASC
      LIMIT 1
    `).bind(email).first();
    return row?.external_id || '';
  } catch (e) {
    console.error('Brevo webhook D1 session lookup error:', e.message);
    return '';
  }
}

// -----------------------------------------------------------------------------
// UPSERT lead_score. Score is clamped at 0 on both the insert and the update
// path — a lead whose very first known event is a bounce/unsubscribe should
// not go negative, and a strong penalty on an existing score should not be
// silently lost to the same clamp (hence delta is bound twice: once
// pre-clamped for the INSERT VALUES, once raw for the UPDATE arithmetic).
// -----------------------------------------------------------------------------
async function upsertLeadScore({ externalId, delta, eventType, now, env }) {
  if (!env.DB) return;

  try {
    await env.DB.prepare(`
      INSERT INTO lead_score (external_id, score, last_event_type, last_event_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(external_id) DO UPDATE SET
        score = MAX(0, lead_score.score + ?),
        last_event_type = excluded.last_event_type,
        last_event_at = excluded.last_event_at,
        updated_at = excluded.updated_at
    `).bind(
      externalId, Math.max(0, delta), eventType, now, now, now,
      delta
    ).run();
  } catch (e) {
    console.error('Brevo webhook lead_score upsert error:', e.message);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

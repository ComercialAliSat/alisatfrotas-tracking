// -----------------------------------------------------------------------------
// Brevo (Sendinblue) contact sync — mirrors functions/outputs/pipedrive.js and
// functions/outputs/linkedin.js.
//
// Called from functions/tracker.js's Lead event fan-out. Creates or updates
// the Brevo contact by email and stamps sessions.external_id as the
// EXTERNAL_ID custom attribute, so Brevo email templates can grab it with
// {{ contact.EXTERNAL_ID }} and append it to every link as ?leadid=... —
// functions/_middleware.js reads that param back to recover identity when a
// lead clicks an email link on a device/app with no existing cookie (see
// "Hop 7" in docs/data-flow.md).
//
// Usage:
//   import { sendToBrevo } from '../outputs/brevo.js';
//   const result = await sendToBrevo({ eventName, email, externalId, env });
//   // result: { payload: string|null, response: Response|null, skipped?: string }
//
// Required env vars:
//   BREVO_API_KEY   — Brevo API v3 key (Settings → SMTP & API → API Keys)
//
// Brevo Contacts API specifics:
//   - POST /v3/contacts with updateEnabled: true creates-or-updates by email
//     in a single call (no separate find-then-update round trip needed).
//   - The custom attribute EXTERNAL_ID must exist in Brevo (Contacts →
//     Settings → Contact Attributes → add a Text attribute named
//     EXTERNAL_ID) before this call — Brevo silently ignores attributes it
//     doesn't recognize.
//   - Scope is deliberately minimal for now (email + EXTERNAL_ID only) —
//     name/phone/list assignment are deferred to a later phase.
// -----------------------------------------------------------------------------

export async function sendToBrevo({ eventName, email, externalId, env }) {
  if ((eventName || '').toLowerCase() !== 'lead') {
    return { skipped: 'not a Lead event', payload: null, response: null };
  }
  if (!env.BREVO_API_KEY) {
    return { skipped: 'missing BREVO_API_KEY', payload: null, response: null };
  }
  if (!email) {
    return { skipped: 'no email', payload: null, response: null };
  }

  const contactPayload = {
    email,
    updateEnabled: true,
  };
  if (externalId) {
    contactPayload.attributes = { EXTERNAL_ID: externalId };
  }

  const payloadJson = JSON.stringify(contactPayload);
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: payloadJson,
  });
  return { payload: payloadJson, response };
}

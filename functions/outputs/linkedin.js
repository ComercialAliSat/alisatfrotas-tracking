// -----------------------------------------------------------------------------
// LinkedIn Conversions API output handler.
//
// Exports sendToLinkedIn() so any adapter (_core.js, the Pipedrive adapter,
// or future adapters) can fan out to LinkedIn without duplicating logic.
//
// Usage:
//   import { sendToLinkedIn } from '../../outputs/linkedin.js';
//   const result = await sendToLinkedIn({ email, li_fat_id, event_type,
//                                         value, currency, eventId, eventTime, env });
//   // result: { payload: string|null, response: Response|null, skipped?: string }
//
// Return shape is identical to sendToMeta / sendToGA4 / sendToGoogleAds so
// callers can handle and log results with the same code path.
//
// Required env vars:
//   LINKEDIN_ACCESS_TOKEN          — OAuth 2.0 Bearer token.
//                                    Campaign Manager → Advertiser Settings →
//                                    Conversions API → Generate Access Token.
//   LINKEDIN_CONVERSION_ID         — Numeric ID of the default conversion rule.
//                                    Found in the conversion rule URL in Campaign Manager.
//
// Optional per-event-type conversion IDs:
//   LINKEDIN_CONVERSION_ID_PURCHASE   — overrides the default for Purchase events
//   LINKEDIN_CONVERSION_ID_LEAD       — overrides the default for Lead events
//   Pattern: LINKEDIN_CONVERSION_ID_{EVENT_TYPE_UPPERCASE}
//
// LinkedIn CAPI specifics:
//   - Email is SHA-256 hashed after lowercase + trim (same spec as Meta CAPI).
//   - li_fat_id is the raw value of the `li_fat_id` first-party cookie set by
//     the LinkedIn Insight Tag — passed as-is, not hashed.
//   - conversionHappenedAt is epoch MILLISECONDS (multiply eventTime by 1000).
//   - conversionValue.amount must be a string decimal ("99.90", not 99.9).
//   - eventId deduplicates across Pipedrive/webhook retries.
//   - Both user identifiers are optional individually; at least one is required.
// -----------------------------------------------------------------------------

export async function sendToLinkedIn({ email, li_fat_id, event_type, value, currency, eventId, eventTime, env }) {
  if (!env.LINKEDIN_ACCESS_TOKEN) {
    return { skipped: 'missing LINKEDIN_ACCESS_TOKEN', payload: null, response: null };
  }

  // Resolve conversion ID: check for event-type-specific override first.
  const typeKey = event_type
    ? `LINKEDIN_CONVERSION_ID_${event_type.toUpperCase().replace(/[\s-]+/g, '_')}`
    : null;
  const conversionId = (typeKey && env[typeKey]) || env.LINKEDIN_CONVERSION_ID;

  if (!conversionId) {
    return { skipped: 'missing LINKEDIN_CONVERSION_ID', payload: null, response: null };
  }

  // Build user identifiers — include whichever signals are available.
  const userIds = [];

  if (email) {
    userIds.push({
      idType: 'SHA256_EMAIL',
      idValue: await sha256(email),
    });
  }

  if (li_fat_id) {
    userIds.push({
      idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID',
      idValue: li_fat_id,
    });
  }

  if (userIds.length === 0) {
    return { skipped: 'no user identifiers (email and li_fat_id both empty)', payload: null, response: null };
  }

  const element = {
    conversion: `urn:lla:llaPartnerConversion:${conversionId}`,
    // LinkedIn expects milliseconds; eventTime from other handlers is in seconds.
    conversionHappenedAt: (eventTime || Math.floor(Date.now() / 1000)) * 1000,
    user: { userIds },
    eventId: eventId || crypto.randomUUID(),
  };

  // conversionValue is optional for non-revenue events (e.g. Lead).
  if (value && parseFloat(value) > 0) {
    element.conversionValue = {
      currencyCode: currency || 'BRL',
      // LinkedIn requires a string decimal, not a number.
      amount: parseFloat(value).toFixed(2),
    };
  }

  const linkedInPayload = { elements: [element] };
  const payloadJson = JSON.stringify(linkedInPayload);

  const response = await fetch('https://api.linkedin.com/rest/conversionEvents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.LINKEDIN_ACCESS_TOKEN}`,
      'LinkedIn-Version': '202501',
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json',
    },
    body: payloadJson,
  });

  return { payload: payloadJson, response };
}

// SHA-256 hash after lowercase + trim normalization.
// LinkedIn spec mirrors Meta CAPI: lowercase, no surrounding whitespace, hex string.
async function sha256(value) {
  if (!value) return '';
  const normalized = value.toLowerCase().trim();
  const encoded = new TextEncoder().encode(normalized);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

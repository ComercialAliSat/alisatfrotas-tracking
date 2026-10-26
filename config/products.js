// -----------------------------------------------------------------------------
// Per-product configuration for sales webhooks.
//
// Add your products under the sales platform you use. Each product is keyed by
// the platform's own product ID (the number that appears in the webhook payload)
// and holds the optional integration targets for that specific purchase.
//
// A product that IS NOT listed here still gets logged to `purchase_log` and
// still fires Meta CAPI + GA4 — those run off attribution data and don't need
// a per-product config. The entries here only control the OPTIONAL integrations
// that fan out on each purchase: Encharge tag, ManyChat tag ID, and the
// per-product Google Ads conversion action.
//
// Example (key the top level by whatever string your webhook adapter sets as
// `platform` — see docs/platforms/_template.md when you add one):
//
//   myplatform: {
//     '123456': {
//       name: 'Your product name — for your own reference',
//       enchargeTag: 'your-encharge-tag-slug',
//       manychatTagId: 12345678,
//       googleAdsConversionActionId: '9876543210',
//     },
//   },
//
// Leave any integration field empty string / 0 / null to skip that fan-out for
// that product. No platform needs to be listed here until you've wired up its
// webhook adapter (see the add-sales-platform skill).
//
// This file is committed to git. Product IDs and tag IDs are not secrets.
// Secrets (API keys) live in Cloudflare environment variables.
// -----------------------------------------------------------------------------

export default {};

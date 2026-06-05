// Rastreamento: embeds the existing /dash dashboard in a full-height iframe.
// The iframe src is built server-side from env vars so the DASH_KEY is
// never shipped in JS bundles — it comes from the rendered HTML only.

export default function RastreamentoPage() {
  const trackingUrl = (process.env.TRACKING_API_URL ?? '').replace(/\/$/, '')
  const dashKey     = process.env.DASH_KEY ?? ''

  // If deployed on the same domain, use a relative URL so this works without config.
  const src = trackingUrl
    ? `${trackingUrl}/dash${dashKey ? `?key=${encodeURIComponent(dashKey)}` : ''}`
    : `/dash${dashKey ? `?key=${encodeURIComponent(dashKey)}` : ''}`

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        className="px-6 py-3 flex items-center gap-2 border-b border-gray-100 bg-white flex-shrink-0"
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: '#033566' }}
        />
        <span className="text-sm font-medium text-gray-600">
          Tracking Dashboard — rastreamento em tempo real
        </span>
      </div>
      <iframe
        src={src}
        title="Rastreamento"
        style={{ flex: 1, width: '100%', border: 'none' }}
      />
    </div>
  )
}

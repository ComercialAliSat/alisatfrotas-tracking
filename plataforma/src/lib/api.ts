// Server-side helpers that talk to the tracking stack APIs.
// All calls use process.env variables — never exposed to the client.

const BASE = (process.env.TRACKING_API_URL ?? '').replace(/\/$/, '')
const KEY  = process.env.DASH_KEY ?? ''

export interface PageStat {
  url: string
  visits: number
  leads: number
  conversion_rate: number
  last_visit: number
}

export interface Lead {
  event_id: string
  timestamp: number
  raw_email: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  is_mobile: number
  meta_response_ok: number
  landing_url: string
}

export interface VisitData {
  days: number
  totals: { sessions: number; leads: number; conversion_rate: number }
  daily: { day: string; visits: number; leads: number }[]
  by_source: { source: string; visits: number }[]
  by_page: { landing_url: string; visits: number }[]
}

// ── Mock data shown when env vars are not configured (local dev) ─────────────
const MOCK_PAGES: PageStat[] = [
  {
    url: 'https://comercial.alisat.com.br/lps/videotelemetria',
    visits: 1247,
    leads: 48,
    conversion_rate: 3.8,
    last_visit: Math.floor(Date.now() / 1000),
  },
  {
    url: 'https://comercial.alisat.com.br/lps/videotelemetria_topo',
    visits: 534,
    leads: 21,
    conversion_rate: 3.9,
    last_visit: Math.floor(Date.now() / 1000) - 86400,
  },
]

// ── Internal helper ──────────────────────────────────────────────────────────
function buildUrl(path: string, params: Record<string, string | number> = {}): string {
  const p = new URLSearchParams({ key: KEY })
  for (const [k, v] of Object.entries(params)) p.set(k, String(v))
  return `${BASE}${path}?${p}`
}

// ── Public API ───────────────────────────────────────────────────────────────
export async function fetchPages(days = 30): Promise<PageStat[]> {
  if (!BASE || !KEY) return MOCK_PAGES
  try {
    const res = await fetch(buildUrl('/api/pages', { days }), { next: { revalidate: 60 } })
    if (!res.ok) return MOCK_PAGES
    const data = await res.json()
    return (data.pages as PageStat[]) ?? MOCK_PAGES
  } catch {
    return MOCK_PAGES
  }
}

export async function fetchLeads(days = 30, limit = 100): Promise<Lead[]> {
  if (!BASE || !KEY) return []
  try {
    const res = await fetch(buildUrl('/api/leads', { days, limit }), { next: { revalidate: 30 } })
    if (!res.ok) return []
    const data = await res.json()
    return (data.leads as Lead[]) ?? []
  } catch {
    return []
  }
}

export async function fetchVisits(days = 30): Promise<VisitData | null> {
  if (!BASE || !KEY) return null
  try {
    const res = await fetch(buildUrl('/api/visits', { days }), { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json() as Promise<VisitData>
  } catch {
    return null
  }
}

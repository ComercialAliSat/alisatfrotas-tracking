'use client'

import { useState } from 'react'
import { Search, ExternalLink, Settings, TrendingUp, Users, Eye, FileText } from 'lucide-react'
import type { PageStat } from '@/lib/api'

// ── Thumbnail color palette keyed by URL hash ───────────────────────────────
const PALETTE = [
  { bg: '#dbeafe', text: '#1d4ed8' },
  { bg: '#ede9fe', text: '#6d28d9' },
  { bg: '#dcfce7', text: '#15803d' },
  { bg: '#fce7f3', text: '#be185d' },
  { bg: '#fef3c7', text: '#b45309' },
  { bg: '#e0f2fe', text: '#0369a1' },
  { bg: '#dbeafe', text: '#033566' },
]

function hashUrl(url: string): number {
  let h = 0
  for (const c of url) h = (h << 5) - h + c.charCodeAt(0)
  return Math.abs(h)
}

function getPageName(url: string): string {
  try {
    const path = new URL(url).pathname
    const last = path.split('/').filter(Boolean).pop() ?? path
    return last
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  } catch {
    return url
  }
}

function getShortUrl(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname + u.pathname.replace(/\/$/, '')
  } catch {
    return url
  }
}

function fmtNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

function timeAgo(ts: number): string {
  const diff = Math.floor(Date.now() / 1000) - ts
  if (diff < 3600)  return `${Math.floor(diff / 60)}min atrás`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`
  return `${Math.floor(diff / 86400)}d atrás`
}

// ── Component ────────────────────────────────────────────────────────────────
interface Props {
  pages: PageStat[]
}

export default function PaginasList({ pages }: Props) {
  const [query, setQuery] = useState('')

  const filtered = pages.filter(p =>
    p.url.toLowerCase().includes(query.toLowerCase()) ||
    getPageName(p.url).toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      {/* Search + count */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Buscar páginas…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-colors"
            style={{}}
            onFocus={e => ((e.target as HTMLElement).style.borderColor = '#033566')}
            onBlur={e  => ((e.target as HTMLElement).style.borderColor = '#e5e7eb')}
          />
        </div>
        <span className="text-sm text-gray-400 flex-shrink-0">
          {filtered.length} página{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="flex justify-center mb-4">
            <FileText size={48} className="text-gray-200" />
          </div>
          <p className="font-medium text-gray-500">Nenhuma página encontrada</p>
          <p className="text-sm mt-1">
            {query ? 'Tente uma busca diferente.' : 'Adicione sua primeira página para começar.'}
          </p>
        </div>
      )}

      {/* Page items */}
      <div className="space-y-3">
        {filtered.map(page => {
          const color = PALETTE[hashUrl(page.url) % PALETTE.length]
          const name  = getPageName(page.url)
          const short = getShortUrl(page.url)

          return (
            <div
              key={page.url}
              className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-5 transition-all"
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#d1d5db'
                ;(e.currentTarget as HTMLElement).style.boxShadow   = '0 1px 4px rgba(0,0,0,.06)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#f3f4f6'
                ;(e.currentTarget as HTMLElement).style.boxShadow   = 'none'
              }}
            >
              {/* Thumbnail */}
              <div
                className="rounded-lg flex-shrink-0 flex items-center justify-center text-xl font-bold select-none"
                style={{
                  width: 72, height: 54,
                  background: color.bg,
                  color: color.text,
                }}
              >
                {name.charAt(0).toUpperCase()}
              </div>

              {/* Name + URL */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-[15px] leading-tight truncate">
                    {name}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: '#f0fdf4',
                      color: '#15803d',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    <span
                      className="rounded-full"
                      style={{ width: 5, height: 5, background: '#22c55e', display: 'inline-block' }}
                    />
                    Ativo
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-mono truncate">{short}</div>
                <div className="text-xs text-gray-300 mt-0.5">{timeAgo(page.last_visit)}</div>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-7 flex-shrink-0">
                <Metric
                  icon={<Eye size={12} />}
                  label="Visitas"
                  value={fmtNum(page.visits)}
                  color="#033566"
                />
                <Metric
                  icon={<Users size={12} />}
                  label="Leads"
                  value={fmtNum(page.leads)}
                  color="#15803d"
                />
                <Metric
                  icon={<TrendingUp size={12} />}
                  label="Conv."
                  value={`${page.conversion_rate.toFixed(1)}%`}
                  color="#d97706"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  title="Ver página"
                >
                  <ExternalLink size={15} />
                </a>
                <button
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  title="Configurar"
                >
                  <Settings size={15} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Small metric block ────────────────────────────────────────────────────────
function Metric({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="text-center min-w-[52px]">
      <div className="flex items-center justify-center gap-1 text-gray-400 text-[11px] mb-1">
        {icon}
        {label}
      </div>
      <div className="font-bold text-[16px] leading-tight" style={{ color }}>
        {value}
      </div>
    </div>
  )
}

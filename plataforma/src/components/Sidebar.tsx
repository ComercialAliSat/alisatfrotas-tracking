'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Users, Activity, Settings } from 'lucide-react'

const NAV = [
  { href: '/paginas',       label: 'Minhas Páginas', icon: LayoutGrid },
  { href: '/leads',         label: 'Leads',          icon: Users      },
  { href: '/rastreamento',  label: 'Rastreamento',   icon: Activity   },
  { href: '/configuracoes', label: 'Configurações',  icon: Settings   },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside
      className="flex flex-col h-full flex-shrink-0"
      style={{ width: '240px', minWidth: '240px', background: '#033566' }}
    >
      {/* Logo / header */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,.10)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: 34, height: 34, background: 'rgba(255,255,255,.12)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4">
              <path d="M3 3v18h18"/>
              <path d="m19 9-5 5-4-4-4 4"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Ali Sat</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,.40)' }}>Plataforma</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = path.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg text-sm font-medium transition-colors"
              style={{
                padding: '10px 12px',
                background: active ? 'rgba(255,255,255,.15)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,.60)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                if (!active) {
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.08)'
                  ;(e.currentTarget as HTMLElement).style.color = '#fff'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.60)'
                }
              }}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.5 : 2}
                className="flex-shrink-0"
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,.22)' }}>Ali Sat Frotas — v0.1</p>
      </div>
    </aside>
  )
}

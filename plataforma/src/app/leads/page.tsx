import { Monitor, Smartphone } from 'lucide-react'
import { fetchLeads, fetchVisits } from '@/lib/api'

export const revalidate = 30

export default async function LeadsPage() {
  const [leads, visits] = await Promise.all([
    fetchLeads(30, 100),
    fetchVisits(30),
  ])

  const totals = visits?.totals ?? { sessions: 0, leads: 0, conversion_rate: 0 }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Leads</h1>
        <p className="text-gray-500 mt-1.5 text-sm">Formulários capturados nos últimos 30 dias</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Leads</div>
          <div className="text-3xl font-bold text-green-600">
            {totals.leads.toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-gray-400 mt-1">Formulários enviados</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Visitas</div>
          <div className="text-3xl font-bold" style={{ color: '#033566' }}>
            {totals.sessions.toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-gray-400 mt-1">Sessões únicas</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Conversão</div>
          <div className="text-3xl font-bold text-amber-600">
            {totals.conversion_rate.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Visita → Lead</div>
        </div>
      </div>

      {/* Leads table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Leads Recentes</h2>
          <span className="text-sm text-gray-400">{leads.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Data / Hora', 'E-mail', 'Fonte', 'Campanha', 'Dispositivo', 'Meta'].map(h => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide ${h === 'Meta' ? 'text-center' : 'text-left'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-gray-400 text-sm">
                    Nenhum lead registrado no período.
                  </td>
                </tr>
              ) : (
                leads.map(lead => {
                  const dt     = new Date(lead.timestamp * 1000)
                  const date   = dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                  const time   = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                  const source = lead.utm_source
                    ? `${lead.utm_source}${lead.utm_medium ? ' / ' + lead.utm_medium : ''}`
                    : '(direto)'

                  return (
                    <tr key={lead.event_id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                        {date} {time}
                      </td>
                      <td className="px-6 py-3 text-gray-700 max-w-[180px] truncate">
                        {lead.raw_email || '—'}
                      </td>
                      <td className="px-6 py-3 text-gray-600 whitespace-nowrap">{source}</td>
                      <td className="px-6 py-3 text-gray-500 max-w-[140px] truncate">
                        {lead.utm_campaign || '—'}
                      </td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {lead.is_mobile ? (
                          <span className="flex items-center gap-1.5">
                            <Smartphone size={12} /> Mobile
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Monitor size={12} /> Desktop
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {lead.meta_response_ok ? (
                          <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-100">
                            OK
                          </span>
                        ) : (
                          <span className="bg-red-50 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-100">
                            Falhou
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

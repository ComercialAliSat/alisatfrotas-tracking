import { Plus } from 'lucide-react'
import { fetchPages } from '@/lib/api'
import PaginasList from '@/components/PaginasList'

export const revalidate = 60

export default async function PaginasPage() {
  const pages = await fetchPages(30)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Minhas Páginas</h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Gerencie seus funis de vendas e acompanhe o desempenho
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: '#033566' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0a4a8c')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#033566')}
        >
          <Plus size={16} strokeWidth={2.5} />
          Adicionar página
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Páginas</div>
          <div className="text-2xl font-bold" style={{ color: '#033566' }}>{pages.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Total de Visitas</div>
          <div className="text-2xl font-bold text-gray-800">
            {pages.reduce((s, p) => s + p.visits, 0).toLocaleString('pt-BR')}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Total de Leads</div>
          <div className="text-2xl font-bold text-green-600">
            {pages.reduce((s, p) => s + p.leads, 0).toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Pages list (client component handles search/filter) */}
      <PaginasList pages={pages} />
    </div>
  )
}

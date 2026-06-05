import { CheckCircle, XCircle, Globe, Key, Info } from 'lucide-react'

export default function ConfiguracoesPage() {
  const trackingUrl = process.env.TRACKING_API_URL
  const dashKey     = process.env.DASH_KEY
  const configured  = !!(trackingUrl && dashKey)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Configurações</h1>
        <p className="text-gray-500 mt-1.5 text-sm">Ajustes de conexão e informações da plataforma</p>
      </div>

      <div className="max-w-2xl space-y-5">

        {/* Connection card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-5 flex items-center gap-2 text-base">
            <Globe size={16} className="text-gray-400" />
            Conexão com Tracking Stack
          </h2>

          <div className="space-y-0">
            {/* TRACKING_API_URL */}
            <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
              <div>
                <div className="text-sm font-medium text-gray-700">URL do Tracking</div>
                <code className="text-xs text-gray-400 font-mono">TRACKING_API_URL</code>
              </div>
              {trackingUrl ? (
                <span className="text-sm font-mono text-gray-500 max-w-[260px] truncate">
                  {trackingUrl}
                </span>
              ) : (
                <span className="text-sm text-red-500">Não configurado</span>
              )}
            </div>

            {/* DASH_KEY */}
            <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
              <div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Key size={13} className="text-gray-400" />
                  Chave de Acesso
                </div>
                <code className="text-xs text-gray-400 font-mono">DASH_KEY</code>
              </div>
              {dashKey ? (
                <div className="flex items-center gap-1.5 text-green-600 text-sm">
                  <CheckCircle size={14} />
                  <span>Configurada</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500 text-sm">
                  <XCircle size={14} />
                  <span>Não configurada</span>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-3.5">
              <div className="text-sm font-medium text-gray-700">Status da conexão</div>
              {configured ? (
                <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                  <CheckCircle size={14} />
                  Conectado
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500 text-sm font-semibold">
                  <XCircle size={14} />
                  Desconectado
                </div>
              )}
            </div>
          </div>

          {!configured && (
            <div className="mt-4 p-3.5 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-xs text-amber-700 leading-relaxed">
                Configure as variáveis{' '}
                <code className="font-mono bg-amber-100 px-1 rounded">TRACKING_API_URL</code> e{' '}
                <code className="font-mono bg-amber-100 px-1 rounded">DASH_KEY</code>{' '}
                no arquivo <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code>{' '}
                (copie de <code className="font-mono bg-amber-100 px-1 rounded">.env.example</code>).
              </p>
            </div>
          )}
        </div>

        {/* About card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-base">
            <Info size={16} className="text-gray-400" />
            Sobre
          </h2>
          <div className="text-sm text-gray-500 space-y-1.5">
            <p className="font-medium text-gray-700">Ali Sat Plataforma — v0.1</p>
            <p>Dashboard de gestão de funis de vendas e rastreamento server-side de leads.</p>
            <p className="text-xs text-gray-400 pt-1">
              Next.js 15 · Tailwind CSS · Cloudflare Pages + D1
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

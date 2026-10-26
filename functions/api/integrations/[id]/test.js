// POST /api/integrations/:id/test?key=...
//   Sends one real HTTP delivery to the integration's target_url right now,
//   using a canned sample payload (covers Lead + Purchase field names so
//   whatever the operator mapped resolves to something visible), through the
//   exact same delivery/signing/logging path as a real event. Returns the
//   result synchronously so the UI can show it immediately.

import { requireAuth, json } from '../_shared.js';
import { testIntegration } from '../../../lib/integrations-dispatch.js';

const SAMPLE_DATA = {
  event_name: 'Lead',
  event_time: Math.floor(Date.now() / 1000),
  event_source_url: 'https://comercial.alisat.com.br/lps/exemplo',
  product: 'exemplo',
  segmento: 'carga',
  empresa: 'Transportes Exemplo LTDA',
  cargo: 'Gerente de frota ou logística',
  cnpj: '11222333000181',
  em: 'teste@exemplo.com.br',
  fn: 'Maria',
  ln: 'Exemplo',
  nome: 'Maria Exemplo',
  ph: '5551999998888',
  quantidade_veiculos: '12',
  consent_status: 'all',
  referrer: 'https://www.google.com/',
  localizacao: 'Sapucaia do Sul, RS, BR',
  tipo_veiculo: 'pesado',
  custo_estimado: 123456,
  value: 1990,
  currency: 'BRL',
  transaction_id: 'TESTE-0001',
  product_name: 'Produto de exemplo',
  platform: 'teste',
  utm_source: 'teste',
  utm_medium: 'integracoes',
  utm_campaign: 'teste-envio',
  utm_content: '',
  utm_term: '',
  fbclid: '',
  gclid: '',
  country: 'BR',
  city: 'Sapucaia do Sul',
  region: 'RS',
};

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  if (!requireAuth(url, env)) return json({ error: 'Unauthorized' }, 401);

  try {
    const integration = await env.DB.prepare('SELECT * FROM integrations WHERE id = ?').bind(params.id).first();
    if (!integration) return json({ error: 'Integração não encontrada' }, 404);

    const result = await testIntegration({ env, integration, data: SAMPLE_DATA });
    return json(result);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

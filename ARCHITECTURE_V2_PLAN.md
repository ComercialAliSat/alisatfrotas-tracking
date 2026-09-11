# Plano de Evolução — Ali Sat Tracking Stack (V2)

> Documento de análise e planejamento. Todas as referências a arquivos são
> caminhos reais deste repositório, lidos diretamente do código-fonte (não
> de suposições).
>
> **STATUS — Fase 1: CONCLUÍDA.** O núcleo CRM/Pipedrive (dedup de Deal,
> reabertura de Lost, nota em Won, lifecycle Won/Lost, idempotência) foi
> implementado, testado (11/11 cenários) e está descrito em detalhe em
> "Fase 1 — Registro de Conclusão" no final deste documento. As decisões
> definitivas usadas na implementação estão na seção "Perguntas abertas"
> (substituídas pelas respostas recebidas). Fases 2/3 (Brevo, Wix, Score,
> novos dashboards) permanecem não iniciadas.

---

## 1. Resumo de como a stack funciona atualmente

É um worker único no Cloudflare Pages Functions + banco D1 (SQLite na
edge), sem build step, sem serviços externos além das APIs de terceiros
(Meta, Google, GA4, LinkedIn, Pipedrive, Brevo). Não há fila, não há CDP,
não há data warehouse — é literalmente o que o `docs/architecture.md`
already descreve: "server-side conversions + first-party attribution
persistence + dashboard de leitura", tudo no mesmo worker.

Existem **dois fluxos independentes** que só compartilham a tabela
`sessions` e o middleware de identidade:

- **Fluxo A — eventos do navegador** (`Lead`, `PageView`,
  `InitiateCheckout`): LP → `/tracker` → hash de PII → fan-out paralelo
  para Meta/GA4/LinkedIn/Google Ads/Pipedrive/Brevo → grava em `event_log`
  (exceto PageView, que vai para `page_views`).
- **Fluxo B — webhooks de plataforma de venda** (Eduzz/Hotmart/Kiwify via
  `trk`, e Pipedrive via `person_id`/`deal_id`): o comprador paga na
  plataforma → webhook chega → `_core.js` (ou o adapter do Pipedrive)
  enriquece com a sessão original → dispara conversão de venda → grava em
  `purchase_log`.

**Achado importante**: a stack já é mais madura do que o `CLAUDE.md` (que
está desatualizado) descreve. Já existem, funcionando hoje, features que o
briefing trata como "futuras":

| Pedido no briefing | Situação real |
|---|---|
| Jornada individual do lead | `functions/api/journey.js` já retorna `page_views` + `event_log` por e-mail. Usado por `/dash` (aba "Jornada do Lead"). |
| Saber de qual campanha o lead veio | `sessions.utm_*` + `event_log.utm_*` (snapshot imutável por evento, migration 0019) já cobrem isso. |
| Lead score | Tabela `lead_score` (migration 0022) já existe e já é escrita pelo webhook do Brevo. |
| Integração de comportamento de e-mail (Brevo) | `functions/webhook/brevo/[slug].js` já transforma `opened`/`click`/`unsubscribed`/`hard_bounce`/`soft_bounce` em pontos de `lead_score`. |
| Funis/páginas | `marketing_funnels` (0017) + `functions/api/funnels.js`/`pages.js` já existem, usados pelo dashboard `/plataforma`. |
| Recuperação de identidade cross-device | O loop `?leadid=` no middleware (Hop 7 de `docs/data-flow.md`) já resolve isso para clique em e-mail do Brevo. |

O que **não existe** e é o núcleo real do pedido do usuário:

- Nenhuma lógica de **dedup/reuso/reabertura de Deal** no Pipedrive — hoje
  cada submissão de formulário cria um Deal novo (bug confirmado, ver §11).
- Nenhum tratamento de **Lost, reabertura, mudança de estágio, motivo de
  perda** no webhook do Pipedrive — ele só reage a `updated.deal` com
  transição para `won`.
- Nenhuma tabela que ligue nosso `external_id` ao `person_id`/`deal_id` do
  Pipedrive — hoje essa ponte é refeita a cada Won via API do Pipedrive +
  JOIN por e-mail, o que é frágil.
- O webhook de Won **envia o valor real do negócio** para Meta e Google
  Ads — o briefing pede o oposto (ocorrência da venda, sem valor).
- Nenhuma ingestão de Wix (blog) ou perfil de interesse por tópico.
- `lead_score` é uma única coluna (`score`), não os três scores
  (fit/engagement/intent) pedidos.

---

## 2. Diagrama textual do fluxo atual

```
                         ┌──────────────────────────────┐
                         │   functions/_middleware.js    │
                         │  (toda página HTML, exceto     │
  visitante  ──────────▶ │  /tracker /webhook /api /dash) │
                         │  → cookies _krob_sid/_krob_eid │
                         │  → upsert sessions             │
                         └───────────────┬────────────────┘
                                         │
              ┌──────────────────────────┼───────────────────────────┐
              │                          │                           │
              ▼                          ▼                           ▼
   LP de lead (form)          Sales page (Eduzz/Hotmart/Kiwify)   /webhook/pipedrive/<slug>
              │                          │                           ▲
              ▼                          ▼                           │
   POST /tracker              POST /checkout-session (trk)           │ updated.deal (won hoje;
              │                          │                           │ lost/reabertura: NENHUM)
              ▼                          ▼                           │
   functions/tracker.js        checkout_sessions (D1)                │
     • hash PII                          │                           │
     • fan-out paralelo:         comprador paga na plataforma        │
       Meta/GA4/LinkedIn/                │                           │
       GoogleAds/Pipedrive/              ▼                           │
       Brevo                    /webhook/<platform>/<slug>           │
     • grava event_log          → functions/webhook/_core.js         │
       (Lead) ou page_views       • lookup checkout_sessions by trk   │
       (PageView)                 • fan-out Meta/GA4/GoogleAds        │
              │                   • purchase_log + purchase_items     │
              │                                                      │
              ▼                                                      │
   functions/outputs/pipedrive.js ─── cria Deal SEMPRE (bug) ─────────┘
   functions/outputs/brevo.js     ─── upsert contato + EXTERNAL_ID
              │
              ▼
   Dashboards de leitura: /dash (revenue/products/attribution/leads/
   purchases/events/journey) e /plataforma (funnels/pages/visits/leads,
   com login próprio que devolve o mesmo DASH_KEY compartilhado)
```

---

## 3. Banco e tabelas existentes

22 migrations aplicadas (`0005` propositalmente ausente). Nenhuma foreign
key real exceto `purchase_items.purchase_id → purchase_log.id`.

| Tabela | Chave | Escrita por | Lida por |
|---|---|---|---|
| `sessions` | `session_id` (UUID) | `_middleware.js` (UPSERT a cada page load) | `tracker.js`, `checkout-session.js`, quase todo `api/*.js` |
| `event_log` | `id` auto | `tracker.js` (exceto PageView) | `api/leads.js`, `api/events.js`, `api/journey.js` |
| `page_views` | `id` auto | `tracker.js` (só PageView) | `api/journey.js` |
| `checkout_sessions` | `trk` (UUID) | `checkout-session.js` | `webhook/_core.js` |
| `purchase_log` | `id` auto, `transaction_id` UNIQUE | `webhook/_core.js`, `webhook/pipedrive/[slug].js` | `api/revenue.js`, `products.js`, `attribution.js`, `utm-breakdown.js`, `purchases.js` |
| `purchase_items` | `id` auto | `webhook/_core.js` | `api/products.js` |
| `ad_spend` | `(platform,date,campaign_id,ad_id)` UNIQUE | `api/sync/meta-ads.js` | `api/attribution.js` |
| `sync_log` | `id` auto | `api/sync/meta-ads.js` | dashboard ("last synced") |
| `marketing_funnels` | `id` (UUID), `slug` UNIQUE | `api/funnels.js` POST | `api/funnels.js` GET |
| `platform_users` | `id` auto, `email` UNIQUE | `api/auth/register.js` | `api/auth/login.js` |
| `lead_score` | `external_id` PK | `webhook/brevo/[slug].js` | (ainda não lido por nenhum endpoint de dashboard) |

Nenhuma tabela liga nosso mundo (`sessions`/`event_log`) ao mundo do
Pipedrive (`person_id`/`deal_id`). Essa é a lacuna central do pedido.

---

## 4. Como funciona a identidade hoje

| Conceito do briefing | Nome real no código | Observações |
|---|---|---|
| `visitor_id` / `external_id` | `sessions.external_id`, cookie `_krob_eid` (400 dias) | Sobrevive a múltiplas sessões/dispositivos via o loop `?leadid=` (Hop 7, `docs/data-flow.md`) — mas **só** quando o lead clica num link de e-mail do Brevo com esse parâmetro. Não há reconciliação para outros canais (ex.: Wix). |
| `session_id` | `sessions.session_id`, cookie `_krob_sid` | Um por visita/dispositivo/navegador. Não sobrevive entre dispositivos. |
| `contact_id` | **Não existe um nome próprio.** Na prática, `external_id` já cumpre esse papel para o nosso lado; o Pipedrive tem seu próprio `person_id`, sem tabela de ligação. |
| `opportunity_id` | **Não existe.** O Pipedrive tem `deal_id`; nunca é persistido no D1. |
| `event_id` | `event_log.event_id` / `purchase_log.event_id` | UUID gerado no cliente (ou no `_core.js`/adapter). Usado para dedup Meta CAPI × Pixel. **Sem unique constraint em `event_log`** (ver §12/§14) — só `purchase_log.transaction_id` tem. |

**Recomendação de nomenclatura para V2**: não trocar nada existente.
`external_id` passa a ser chamado de "contact_id" apenas na documentação e
no vocabulário de negócio; no schema continua `external_id` (evita
migração de dados e quebra de cookies já emitidos para leads reais).
`opportunity_id` = `deal_id` do Pipedrive, guardado numa tabela nova
(§15).

---

## 5. Como funciona a criação de Leads/Deals no Pipedrive hoje

`functions/outputs/pipedrive.js`, disparado a cada evento `Lead` em
`/tracker`:

1. Resolve `stage_id` do pipeline "Pré Vendas" / estágio "ASAP" (cache 6h).
2. `findOrCreateOrganization` — busca por CNPJ/nome; reaproveita se achar.
3. `findOrCreatePerson` — busca por e-mail exato; reaproveita se achar.
4. **Cria um Deal novo, sempre**, ligado à Person/Org resolvidas.
5. Adiciona uma Nota no Deal com a origem (LP) e a URL.

O comentário no próprio arquivo já documenta a decisão atual:

> "a new Deal is created every time regardless, since each form submission
> may represent a fresh opportunity."

Isso é exatamente a regra de negócio #1 do briefing sendo violada: Person
e Organization são deduplicados, mas o Deal não.

---

## 6. Como funciona Won/Lost hoje

`functions/webhook/pipedrive/[slug].js` escuta **somente** `updated.deal`
com `current.status === 'won' && previous.status !== 'won'`. Qualquer
outra transição (Lost, reabertura, mudança de estágio) é respondida com
`{ ok: true, skipped: 'not a won transition' }` e descartada.

No caminho de Won:

1. Busca o e-mail da Person via API do Pipedrive (`GET /persons/:id`).
2. Recupera a sessão mais antiga em D1 que tenha esse e-mail em
   `event_log.raw_email` (join com `sessions`).
3. Dispara Meta CAPI `Purchase` **com o valor real do negócio**
   (`custom_data.value = current.value`) e Google Ads
   `uploadClickConversions` **com o valor real** (`conversionValue`).
4. Grava em `purchase_log` com `trk = 'pipedrive_<deal_id>'`.

**Isso contradiz diretamente a nova regra de negócio #2** ("Meta e Google
devem apenas saber que ocorreu uma venda... NÃO enviar o valor financeiro
do contrato"). É uma mudança de comportamento necessária, não só uma
adição.

---

## 7. Como são enviados eventos Meta/Google/LinkedIn/GA4 hoje

Dois pontos de fan-out, com código **duplicado** entre eles (mesmas
funções `sendToMeta`/`sendToGoogleAds`/`normalizePhone`/`sha256` reescritas
três vezes: `tracker.js`, `webhook/_core.js`, `webhook/pipedrive/[slug].js`
— decisão deliberada documentada no topo do adapter do Pipedrive, "kept
local to avoid cross-module state coupling", mas tem custo de manutenção):

- **Lead** (`tracker.js`): Meta CAPI, GA4 MP, LinkedIn CAPI, Google Ads
  (conversão de lead), Pipedrive, Brevo — todos em paralelo via
  `Promise.allSettled`, nenhum bloqueia os outros.
- **Purchase via plataforma de venda** (`webhook/_core.js`): Meta, GA4,
  Google Ads, LinkedIn, Encharge, ManyChat.
- **Purchase via Pipedrive Won** (`webhook/pipedrive/[slug].js`): Meta,
  Google Ads (sem LinkedIn, sem GA4 — GA4 não recebe conversão de venda
  fechada no Pipedrive hoje).

Todos os três pontos hasheiam PII com SHA-256 (lowercase+trim), seguem a
spec do Meta Advanced Matching, e persistem payload+resposta crus para
debug no dashboard. Isso é sólido e deve ser mantido como está.

---

## 8. Como funciona Brevo hoje

Já implementado nos dois sentidos (mais maduro do que o briefing
presumia):

- **Saída** (`functions/outputs/brevo.js`): todo evento `Lead` faz
  upsert do contato por e-mail e grava o atributo customizado
  `EXTERNAL_ID` — usado depois pelo Hop 7 (recuperação de identidade via
  `?leadid=` nos links do e-mail).
- **Entrada** (`functions/webhook/brevo/[slug].js`): eventos
  `opened`/`click`/`unsubscribed`/`hardBounce`/`softBounce` (normalizados
  para snake_case) somam/subtraem pontos fixos em `lead_score`
  (`opened: +5, click: +15, unsubscribed: -50, hard_bounce: -50,
  soft_bounce: 0`), identificando o lead por `EXTERNAL_ID` no payload ou,
  em fallback, por e-mail → `event_log` → `sessions`.

**Faltando** (documentado no próprio código como fase futura): metadados
de clique (`campaign_id`, `campaign_name`, URL clicada) não são
capturados — o webhook só computa o delta de score e descarta o resto do
payload.

---

## 9. Como funciona LGPD hoje

`functions/_middleware.js` injeta um banner de consentimento (cookie
`alisat_lgpd` = `all` | `necessary`) e só injeta os **pixels client-side**
(Meta Pixel, gtag, LinkedIn Insight Tag) quando o valor é `all`.

**Achado que precisa de decisão do usuário, não de correção silenciosa**:
o consentimento é **capturado e registrado** (`event_log.consent_status`)
mas **não é usado para bloquear os envios server-side**. Em
`functions/tracker.js`, o único filtro antes do fan-out para
Meta/GA4/LinkedIn/GoogleAds/Pipedrive/Brevo é `isBot` — não existe um
`if (consentStatus !== 'all') skip`. Ou seja: mesmo um visitante que
escolheu "Só necessários" ainda tem seus dados (hasheados) enviados aos
CAPIs server-side quando envia um formulário.

Isso não é necessariamente um bug — muitas equipes tratam a base legal do
CAPI como "execução de contrato/interesse legítimo" em vez de
"consentimento de cookies de marketing", o que tornaria o gate atual (só
os pixels client-side) correto. Mas é uma decisão jurídica, e o
`CLAUDE.md` pede explicitamente para "não alterar comportamento LGPD sem
documentar claramente". Estou documentando aqui; **não vou mudar isso
sem uma decisão explícita sua**.

---

## 10. Problemas encontrados

1. **Deal duplicado a cada resubmissão de formulário** (§5) — o problema
   central do briefing, confirmado no código.
2. **Nenhum tratamento de Lost/reabertura/mudança de estágio** no webhook
   do Pipedrive (§6).
3. **Valor do negócio enviado para Meta/Google no Won** — contradiz a
   nova regra de negócio (§6).
4. **Sem tabela de ligação `external_id` ↔ `person_id`/`deal_id`** — cada
   Won recalcula a ligação via API do Pipedrive + JOIN por e-mail, que
   falha silenciosamente se a Person não tiver e-mail primário ou se o
   e-mail salvo no Pipedrive divergir do e-mail original do formulário
   (ex.: vendedor corrigiu um typo).
5. **`event_log.event_id` sem unique constraint** — um retry de rede no
   `/tracker` pode inserir a mesma conversão duas vezes (só
   `purchase_log.transaction_id` tem essa proteção, via migration 0012).
6. **Consentimento LGPD registrado mas não aplicado** aos envios
   server-side (§9) — decisão pendente, não bug.
7. **Documentação desatualizada**: `CLAUDE.md` descreve migrations
   "0001-0015" e não menciona `marketing_funnels`, `platform_users`,
   `page_views`, `lead_score`, nem o dashboard `/plataforma`. `docs/schema.md`
   tem a mesma lacuna. Isso não afeta o runtime, mas aumenta o risco de
   decisões futuras (inclusive minhas) serem tomadas com informação
   velha.
8. **Duas dashboards paralelas** (`/dash` e `/plataforma`) com esquemas de
   auth diferentes (`?key=` direto vs. login que devolve o mesmo `?key=`)
   e sobreposição parcial de funcionalidade (`leads`, `journey`/`visits`).
   Não é um bug, mas é uma fragmentação que vale nomear antes de
   adicionar uma terceira superfície (ex.: uma view de "jornada +
   status do Deal").
9. **Login da `/plataforma` não cria sessão por usuário** — devolve o
   mesmo `DASH_KEY` compartilhado para qualquer conta válida. Aceitável
   para uma equipe pequena e interna, mas vale registrar como trade-off
   consciente, não como controle de acesso granular.

---

## 11. Riscos de duplicidade

- **Confirmado, não hipotético**: todo lead que preenche o formulário
  mais de uma vez (comum em campanhas de reengajamento, remarketing, ou
  simplesmente alguém preenchendo de novo por engano) gera um Deal novo
  no Pipedrive. Isso infla o pipeline, quebra relatórios de conversão do
  time comercial, e é a motivação direta do briefing.
- Risco secundário: sem unique constraint em `event_log.event_id`, um
  double-submit de formulário (duplo clique, retry de fetch) pode
  duplicar a linha de `event_log` — sem duplicar o Deal (isso já é
  idempotente-ish porque `findOrCreatePerson` reaproveita a Person), mas
  duplica métricas de "quantos leads entraram" no dashboard.

---

## 12. Riscos de performance

Nenhum risco agudo nos volumes implícitos pela documentação existente
(`docs/architecture.md` cita "~3k visits/day e 150 sales/day" como
referência de projeto confortavelmente dentro do tier gratuito do D1).
Achados pontuais:

- `page_views` grava uma linha por PageView (sem agregação). É leve (sem
  PII, ~10 colunas) e já é a base da aba "Jornada" — não recomendo
  mudar isso agora, só monitorar se o volume crescer uma ordem de
  grandeza.
- O fan-out de `Lead` em `tracker.js` faz **6 chamadas HTTP paralelas**
  (Meta, GA4, LinkedIn, Google Ads, Pipedrive, Brevo), e o Pipedrive por
  si só é 2-5 chamadas em série internamente (pipeline lookup, org
  lookup/create, person lookup/create, deal create, note create). Em pico
  de tráfego isso é o gargalo de latência do endpoint, mas como o
  worker já responde `200` ao navegador antes de tudo terminar
  (`context.waitUntil` para D1 — **não** para o fan-out em si, que é
  aguardado via `Promise.allSettled` antes do `return`), a latência
  percebida pelo lead é a soma dessas chamadas. Não é um problema de V2;
  é um comportamento já existente que a Fase 1 não piora (a nova consulta
  à tabela `crm_deals` é uma leitura D1 rápida, não uma chamada HTTP
  externa).

---

## 13. Riscos de perda de eventos

Conforme já documentado deliberadamente em `docs/architecture.md`: **não
há fila nem retry** hoje. Se o Meta CAPI responder 500, o evento se perde
— aceito conscientemente pelo volume atual. Concordo com essa decisão e
**não vou propor Cloudflare Queues nem DLQ na Fase 1** (ver §22 — o
usuário pediu explicitamente para eu justificar antes de adicionar
infraestrutura, e o volume atual não justifica).

O único ponto onde perda de evento tem consequência de **negócio** (não
só de relatório) é o webhook do Pipedrive: se ele falhar, o Pipedrive
reenvia automaticamente em caso de timeout/erro — mas hoje o handler não é
idempotente para o caso de reenvio duplo de um Won (nada impede disparar
Meta/Google duas vezes para o mesmo Deal se o Pipedrive reentregar o
webhook). A tabela nova da Fase 1 resolve isso de graça: checar o
`status` atual em `crm_deals` antes de disparar a conversão torna o
handler idempotente sem precisar de fila.

---

## 14. Riscos de segurança

- Webhooks (`/webhook/pipedrive/<slug>`, `/webhook/brevo/<slug>`) usam
  apenas slug obscuro (UUID), sem verificação de assinatura HMAC — decisão
  documentada e deliberada (`docs/architecture.md`, "Level 1"). Hoje o
  impacto de uma falsificação é baixo (dispara uma conversão de anúncio
  falsa). **Depois da Fase 1**, o webhook do Pipedrive passa a também
  reabrir/mover Deals — ainda protegido pelo mesmo slug, mas o "raio de
  estrago" de uma falsificação sobe de "polui métrica de anúncio" para
  "mexe no pipeline comercial". Meu code na Fase 1 vai mitigar isso
  naturalmente checando se o `deal_id` recebido já existe em
  `crm_deals` (criado por nós) antes de agir — mas registro aqui que
  assinatura HMAC do Pipedrive é uma melhoria de segurança futura razoável
  a considerar, não bloqueante agora.
- `event_log`/`purchase_log` guardam PII crua (e-mail, nome, telefone)
  indefinidamente — decisão já documentada como responsabilidade do
  operador (`docs/architecture.md`, "No PII retention worker"). A tabela
  nova (`crm_deals`) vai guardar e-mail também, pelo mesmo motivo que já
  existe hoje (join/lookup) — não é uma nova superfície de risco, é o
  mesmo padrão já aceito.
- Login da `/plataforma` devolve o `DASH_KEY` compartilhado — ver §10.9.
- Consentimento LGPD não bloqueia envio server-side — ver §9 (decisão
  pendente, não vou mudar sem confirmação).

---

## 15. Proposta de arquitetura V2

Princípio geral: **nenhuma tabela nova além do estritamente necessário**,
zero infraestrutura nova (sem fila, sem CDP, sem serviço externo), e toda
peça nova segue o padrão que já existe no repositório (mesmo estilo de
adapter, mesmo padrão de resposta `{payload, response, skipped}`, mesmo
padrão de auth `?key=` para leitura de dashboard).

### 15.1 Uma tabela nova: `crm_deals`

Liga nosso `external_id` ao `person_id`/`deal_id` do Pipedrive e guarda o
estado do negócio (aberto/ganho/perdido) para permitir dedup, reabertura,
e disparo idempotente de conversão. É a peça que faltava para as regras
de negócio #1, #2 e parte do #3.

```
crm_deals
  deal_id       INTEGER PK   -- Pipedrive deal id (é o opportunity_id)
  person_id     INTEGER      -- Pipedrive person id
  org_id        INTEGER      -- Pipedrive organization id (nullable)
  external_id   TEXT         -- nosso contact_id (sessions.external_id), quando conhecido
  email         TEXT         -- lowercase, chave de lookup
  status        TEXT         -- 'open' | 'won' | 'lost'
  stage_id      INTEGER
  stage_name    TEXT
  value         REAL         -- SÓ uso interno/dashboard — nunca sai para Meta/Google
  currency      TEXT DEFAULT 'BRL'
  lost_reason   TEXT
  touch_count   INTEGER DEFAULT 1   -- quantas vezes o lead voltou a converter neste Deal
  created_at    INTEGER
  updated_at    INTEGER
  won_at        INTEGER
  lost_at       INTEGER
  reopened_at   INTEGER
```

Índices: `email`, `external_id`, `status` (o `deal_id` já é PK).

### 15.2 Lógica de dedup em `functions/outputs/pipedrive.js`

Antes do passo 4 atual (criar Deal), consultar `crm_deals` por
`email` (fallback: `external_id`, conforme regra #1 do briefing —
"telefone pode ser usado como fallback" fica como uma segunda camada
possível, mas e-mail já resolve a maioria dos casos e evita a
ambiguidade de telefones compartilhados/reaproveitados):

- **Nenhuma linha** → cria Deal normalmente (fluxo atual, inalterado) →
  insere linha em `crm_deals` com `status='open'`.
- **Linha com `status='open'`** → NÃO cria Deal. Adiciona nota no Deal
  existente ("Nova conversão recebida em <data>, origem: <UTMs>"),
  incrementa `touch_count`, atualiza `updated_at`. Registra a
  nova origem/campanha (ver §15.4).
- **Linha com `status='lost'`** → NÃO cria Deal. Chama a API do Pipedrive
  para mover o Deal de volta à primeira etapa do pipeline e trocar seu
  status para `open` (`PUT /deals/:id`), adiciona nota ("Lead retornou
  em <data>"), atualiza `crm_deals` (`status='open'`, `reopened_at`).
  Histórico anterior do Deal (notas, atividades) permanece intacto —
  reabrir não apaga nada.
- **Linha com `status='won'`** → fora do escopo das regras do briefing
  (não menciona esse caso). Recomendo tratar como "não criar Deal novo,
  só registrar a nova conversão como nota" — mas isso é uma decisão de
  negócio que vale confirmar com você antes de implementar (ver §25 —
  pergunta aberta).

### 15.3 Ampliar `functions/webhook/pipedrive/[slug].js`

Hoje só reage a `won`. Passa a reagir a qualquer `updated.deal`
observando o `status`:

- `current.status === 'lost'` → grava `lost_reason` (Pipedrive expõe isso
  como `current.lost_reason` no payload), atualiza `crm_deals`
  (`status='lost'`, `lost_at`). **Não** dispara nada para Meta/Google.
- `current.status === 'won'` (transição, como hoje) → atualiza
  `crm_deals` (`status='won'`, `won_at`, `value` interno). Dispara Meta
  CAPI `Purchase` e Google Ads `uploadClickConversions` **sem o valor
  real** (ver §15.5). Idempotente: só dispara se `crm_deals.status`
  ainda não era `'won'` antes desta chamada — protege contra reentrega
  de webhook pelo Pipedrive.
- Mudança de estágio sem mudança de status → opcionalmente atualiza
  `stage_id`/`stage_name` em `crm_deals` (dado de bookkeeping, sem
  side-effect de disparo).

### 15.4 Registro de nova origem/touchpoint (mínimo necessário na Fase 1)

O briefing pede para "registrar nova origem/campanha/touchpoint" quando
um Deal existente recebe uma nova conversão. Na Fase 1, o mínimo que
cumpre isso **sem** criar a tabela de touchpoints completa (que é Fase 2,
ver §15.7): a nota adicionada no Deal já carrega UTM/origem daquela nova
conversão, e `crm_deals.touch_count`/`updated_at` já registram que houve
uma nova conversão. Isso é suficiente para a Fase 1; a tabela de
touchpoints granular (para alimentar jornada e score depois) fica para a
Fase 2.

### 15.5 Sinal de venda sem valor para Meta/Google

Quando o Deal vira Won, o payload enviado passa a ser um evento de
conversão **sem** `value`/`currency` reais:

- **Meta CAPI**: `event_name: 'Purchase'`, mantém `user_data` (hash de
  e-mail, `external_id`, `fbp`/`fbc` da sessão recuperada), mas
  `custom_data` não leva `value`/`currency` reais — ou usa `value: 0`
  se o Ads Manager exigir o campo presente para otimização. (Meta aceita
  Purchase sem `value` — o campo é recomendado, não obrigatório pela
  spec do CAPI; a implementação vai confirmar isso contra o ambiente de
  teste antes de ir pra produção.)
- **Google Ads**: `uploadClickConversions` com `conversionValue: 0` (ou
  omitido — a API aceita 0 como "ocorreu, sem valor atribuído"),
  mantendo `gclid`/`hashedEmail` para o matching.

O valor real do negócio continua sendo gravado **internamente** em
`crm_deals.value` e em `purchase_log.value` (como já é hoje) — só não sai
para as plataformas de anúncio.

### 15.6 Identidade e atribuição — só nomenclatura na Fase 1

Não vou criar colunas novas de `first_touch`/`last_touch` na Fase 1 — o
briefing já autoriza isso ("não precisamos implementar isso agora"). A
única coisa que a Fase 1 precisa é a ligação `external_id ↔ deal_id`
(que `crm_deals` já resolve) para que, quando o journey/score forem
expandidos (Fase 2+), a "oportunidade" apareça na jornada do contato sem
precisar redesenhar identidade de novo.

### 15.7 O que fica explicitamente para depois (Fase 2/3, não Fase 1)

- Tabela `touchpoints` enxuta (só os eventos comercialmente relevantes
  listados no briefing) — hoje `page_views` já cobre a visão granular de
  jornada; `touchpoints` seria uma camada mais "de negócio" por cima,
  compartilhando `external_id` como chave.
- Colunas `first_touch_*`/`last_touch_*` em `lead_score` (reaproveitando
  a tabela que já é keyed por `external_id`, em vez de criar uma tabela
  nova de atribuição).
- Split de `lead_score.score` em `fit_score`/`engagement_score`/
  `intent_score` + total explicável, com pesos configuráveis (um arquivo
  tipo `config/products.js`, ex. `config/scoring.js`).
- Captura de metadados de clique do Brevo (`campaign_id`,
  `campaign_name`, URL) — o webhook já recebe o evento certo, só precisa
  gravar mais colunas.
- Endpoint Wix (`ArticleViewed`) — precisa de um design de ponte de
  identidade cross-domain (o Wix não compartilha cookie com o domínio
  principal), no mesmo espírito do loop `?leadid=` que já existe para
  Brevo. Estrutura agregada `(visitor/contact, article) →
  first_view_at, last_view_at, view_count` conforme pedido, não uma linha
  por view.
- Perfil de interesse por tópico (depende do Wix estar implementado
  primeiro).

---

## 16. O que pode ser reaproveitado

Praticamente toda a base: `sessions`, `event_log`, `checkout_sessions`,
`purchase_log`, `purchase_items`, `page_views`, `lead_score`, `ad_spend`,
`sync_log`, o padrão de adapter de webhook (`guardSlug`/
`timingSafeEqual` em `webhook/_utils.js`), o padrão de resposta
`{payload, response, skipped}` dos `outputs/*.js`, o padrão de auth
`?key=DASH_KEY` dos endpoints de dashboard, e o estilo de documentação
hop-a-hop de `docs/data-flow.md` (a Fase 1 só adiciona um "Hop 8").
Nenhum desses precisa mudar de formato.

## 17. O que realmente precisa ser criado

Só o que está no §15.1-15.5: a tabela `crm_deals`, a lógica de dedup em
`outputs/pipedrive.js`, e a ampliação do webhook em
`webhook/pipedrive/[slug].js`. Mais o índice único em
`event_log.event_id` (§14 do briefing / §10.5 deste documento).

## 18. Quais tabelas ou colunas precisam mudar

- **Nova tabela**: `crm_deals` (§15.1).
- **Nenhuma coluna existente muda de tipo ou é removida.**
- **Novo índice único**: `event_log(event_id)` — hoje não existe nenhum
  índice único nessa coluna.

## 19. Índices necessários

```sql
-- crm_deals (deal_id já é PK)
CREATE INDEX IF NOT EXISTS idx_crm_deals_email       ON crm_deals(email);
CREATE INDEX IF NOT EXISTS idx_crm_deals_external_id ON crm_deals(external_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_status      ON crm_deals(status);

-- idempotência de event_log
CREATE UNIQUE INDEX IF NOT EXISTS idx_event_log_event_id_unique ON event_log(event_id);
```

## 20. Impacto estimado no número de writes no D1

- **+1 SELECT** por evento `Lead` (lookup em `crm_deals` por e-mail) —
  leitura indexada, custo desprezível.
- **+1 INSERT ou +1 UPDATE** por evento `Lead` em `crm_deals` (hoje esse
  write não existe) — mesma ordem de grandeza de writes que já
  acontecem em `event_log` a cada Lead.
- **+1 UPDATE** por transição de estágio relevante no webhook do
  Pipedrive (hoje só existe write no caso `won`; passa a existir também
  em `lost` e reabertura). Isso é estritamente proporcional ao número de
  negócios reais no funil, não ao tráfego — continua muito abaixo do
  volume de `sessions`/`page_views`.
- Nenhuma mudança nos writes de `sessions`, `event_log` (estrutura),
  `page_views`, `purchase_log`, `checkout_sessions` — esses fluxos não
  são tocados.

Não há necessidade de medir "milhares de writes/dia" — a operação nova é
1:1 com "quantas pessoas preenchem formulário" e "quantos negócios mudam
de estágio", que por definição é uma fração pequena do tráfego total.

## 21. Impacto estimado no volume de dados

`crm_deals` cresce **1 linha por Deal real** (oportunidade), não por
submissão de formulário — na prática esse número é **menor** do que o
que o Pipedrive tem hoje, porque a Fase 1 elimina a criação de Deals
duplicados. É a única tabela nova; todas as outras mantêm seu padrão de
crescimento atual, inalterado.

## 22. Fase 1 recomendada

Exatamente o que você já delimitou, sem adicionar nada além:

1. Migration criando `crm_deals` + índices.
2. Migration criando o índice único em `event_log.event_id`.
3. `functions/outputs/pipedrive.js`: antes de criar Deal, consultar
   `crm_deals` por e-mail; ramificar em criar / reaproveitar (nota) /
   reabrir (nota + API do Pipedrive) conforme §15.2.
4. `functions/webhook/pipedrive/[slug].js`: ampliar de "só won" para
   won/lost/reabertura/mudança de estágio, gravando em `crm_deals`;
   tornar o disparo de conversão idempotente (checar status antes);
   remover `value`/`currency` reais do payload enviado a Meta/Google
   (§15.5).
5. Atualizar `docs/schema.md` (nova tabela), `docs/data-flow.md` (Hop 8:
   Pipedrive won/lost/reabertura), e `CLAUDE.md` (mencionar `crm_deals`
   e corrigir a lista de migrations desatualizada) — documentação, sem
   risco de runtime.

**Explicitamente fora da Fase 1** (conforme sua instrução): Brevo
(metadados de clique), Wix, `touchpoints`, first/last touch, split de
score, qualquer view nova de dashboard.

## 23. Arquivos que seriam alterados na Fase 1

| Arquivo | Tipo de mudança |
|---|---|
| `migrations/0023_crm_deals.sql` | novo |
| `migrations/0024_event_log_event_id_unique.sql` | novo |
| `functions/outputs/pipedrive.js` | lógica de dedup/reabertura |
| `functions/webhook/pipedrive/[slug].js` | won/lost/reabertura + payload sem valor + idempotência |
| `docs/schema.md` | documentar `crm_deals` |
| `docs/data-flow.md` | novo "Hop 8" |
| `CLAUDE.md` | atualizar lista de migrations e file map |

Nenhum outro arquivo (`tracker.js`, `checkout-session.js`,
`webhook/_core.js`, `_middleware.js`, dashboards, LPs) é tocado.

## 24. Migrations necessárias

```sql
-- migrations/0023_crm_deals.sql
CREATE TABLE IF NOT EXISTS crm_deals (
    deal_id      INTEGER PRIMARY KEY,
    person_id    INTEGER NOT NULL,
    org_id       INTEGER,
    external_id  TEXT,
    email        TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'open',
    stage_id     INTEGER,
    stage_name   TEXT,
    value        REAL,
    currency     TEXT DEFAULT 'BRL',
    lost_reason  TEXT,
    touch_count  INTEGER NOT NULL DEFAULT 1,
    created_at   INTEGER NOT NULL,
    updated_at   INTEGER NOT NULL,
    won_at       INTEGER,
    lost_at      INTEGER,
    reopened_at  INTEGER
);

CREATE INDEX IF NOT EXISTS idx_crm_deals_email       ON crm_deals(email);
CREATE INDEX IF NOT EXISTS idx_crm_deals_external_id ON crm_deals(external_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_status      ON crm_deals(status);

-- migrations/0024_event_log_event_id_unique.sql
CREATE UNIQUE INDEX IF NOT EXISTS idx_event_log_event_id_unique ON event_log(event_id);
```

A segunda migration só é segura se hoje não existirem duplicatas reais em
produção — a implementação vai rodar uma consulta de verificação
(`SELECT event_id, COUNT(*) FROM event_log GROUP BY event_id HAVING
COUNT(*) > 1`) antes de aplicar, e decidir caso a caso se algum duplicado
legítimo precisa ser limpo primeiro.

## 25. Plano de testes

Manual, via `curl` contra o ambiente de preview/staging (ou produção fora
de horário de pico, com um Deal de teste dedicado no Pipedrive) — sem
necessidade de framework de teste automatizado novo, consistente com o
resto do projeto (que não tem suíte de testes hoje):

1. **Lead novo, sem Deal existente** → confirma que o comportamento atual
   (criar Deal) continua idêntico, mais a linha nova em `crm_deals`
   (`status='open'`).
2. **Mesmo e-mail resubmete o formulário, Deal ainda aberto** → confirma
   que NENHUM Deal novo é criado no Pipedrive, que uma nota aparece no
   Deal existente, e que `crm_deals.touch_count` incrementa.
3. **Deal marcado Lost manualmente no Pipedrive, depois o mesmo lead
   resubmete o formulário** → confirma reabertura (status volta pra
   etapa 1, nota registrada, `crm_deals.status='open'`,
   `reopened_at` preenchido), e que notas/atividades antigas do Deal não
   foram apagadas.
4. **Webhook simulado de mudança de estágio qualquer (não won/lost)** →
   confirma que `crm_deals.stage_*` atualiza sem disparar nada para
   Meta/Google.
5. **Webhook simulado de Lost com `lost_reason`** → confirma
   `crm_deals.status='lost'`, `lost_reason` gravado, nenhuma chamada a
   Meta/Google.
6. **Webhook simulado de Won** → confirma disparo para Meta e Google Ads
   **sem** `value`/`currency` reais no payload (inspecionar
   `meta_payload_sent`/`google_ads_payload_sent` em `purchase_log`), e
   `crm_deals.status='won'`/`won_at` gravado.
7. **Reenvio do mesmo webhook de Won (simulando retry do Pipedrive)** →
   confirma que a segunda chamada é um no-op (não duplica o disparo para
   Meta/Google, já que `status` já era `'won'`).
8. **Regressão**: fluxo de Eduzz/Hotmart/Kiwify (`webhook/_core.js`)
   continua idêntico — nenhum arquivo desse caminho foi tocado, mas vale
   um smoke test com um payload de exemplo gravado para confirmar.
9. **Regressão**: skill `verify-tracking` (checkpoints 1-6) continua
   passando de ponta a ponta após o deploy.

---

## Decisões definitivas (recebidas do usuário, aplicadas na implementação)

1. **Deal já `won` recebendo nova conversão** — NÃO reabre, NÃO move de
   estágio, NÃO cria novo Deal. Apenas nota registrando a nova conversão
   (origem/campanha/produto quando disponíveis) + histórico preservado.
   Novas oportunidades para clientes Won ficam para uma fase futura com
   regra própria.
2. **Dedup de Person** — e-mail é o identificador principal; telefone é
   fallback (normalizado como `55 + DDD + número`, ignorando espaços/
   parênteses/hífens/"+"), usado principalmente quando não há e-mail ou o
   e-mail não encontrou nada. Nome nunca é critério de match automático.
3. **LGPD server-side** — NÃO alterado nesta Fase 1. Continua documentado
   como pendência em §9 acima; tratamento fica para uma revisão de
   segurança/privacidade separada, após a Fase 1 estabilizar.
4. **Valor de conversão para Meta/Google** — o campo é OMITIDO por
   completo (não é enviado como `0`) sempre que a API permite. Confirmado
   e documentado por API (ver "Fase 1 — Registro de Conclusão" abaixo):
   Meta CAPI aceita `custom_data` sem `value`/`currency` sem erro de
   validação; a API de Google Ads (`uploadClickConversions`) não distingue
   "campo ausente" de "valor 0" para `conversionValue` (é um `double` de
   protobuf/JSON) — por isso a chave simplesmente não é incluída no corpo
   da requisição, o que é logicamente o mais próximo de "omitir" que essa
   API específica permite.

## Fase 1 — Registro de Conclusão

Implementada, testada (11/11 cenários — os 8 obrigatórios + 3 extras
descobertos como necessários durante os testes) e pronta para revisão.
Nenhum código foi enviado ao repositório remoto (`git push`) — aguardando
confirmação, seguindo o mesmo padrão já usado nas mudanças anteriores
desta conversa.

### Migrations criadas

- `migrations/0023_crm_deals.sql` — tabela `crm_deals` (ver §15.1 e
  `docs/schema.md`) + 3 índices (`external_id`, `person_id`, `status`).
- `migrations/0024_event_log_event_id_unique.sql` — índice único em
  `event_log.event_id`. **Não apaga nenhum dado** — se já existirem
  duplicados em produção, a migration simplesmente falha ao aplicar (sem
  alterar nada); a query de verificação está no comentário do arquivo.

### Arquivos alterados

| Arquivo | O que mudou |
|---|---|
| `functions/outputs/pipedrive.js` | Reescrito: dedup por e-mail→telefone, lookup/backfill de `crm_deals`, ramificação sem-Deal/open/lost/won, reabertura via API do Pipedrive, notas padronizadas via `buildConversionNote`. |
| `functions/webhook/pipedrive/[slug].js` | Reescrito: trata won/lost/reabertura/bookkeeping (antes só tratava won), claim idempotente via UPSERT condicional, remove `value`/`currency` do payload Meta/Google. **Corrige um bug pré-existente** (ver abaixo). |
| `functions/tracker.js` | +1 linha: passa `externalId` para `sendToPipedrive` (necessário para popular `crm_deals.external_id` na criação do Deal). Nenhuma outra linha tocada. |
| `migrations/0023_crm_deals.sql`, `migrations/0024_event_log_event_id_unique.sql` | Novas. |
| `docs/schema.md` | Documenta `crm_deals` e o novo índice único em `event_log`. |
| `docs/data-flow.md` | Novo "Hop 8" (lifecycle Pipedrive completo, com exemplos de payload). |
| `CLAUDE.md` | Contagem de migrations corrigida (15→24), nova seção "Pipedrive Deal lifecycle", 2 novas "Hard rules". |

Nenhum outro arquivo foi tocado — `webhook/_core.js`, `_middleware.js`,
dashboards, LPs e os demais adapters (Brevo, LinkedIn) permanecem
idênticos.

### Comportamento anterior vs. novo

| | Antes | Agora |
|---|---|---|
| Lead resubmetido, Deal `open` | Cria um Deal novo no Pipedrive a cada submissão | Reutiliza o Deal existente, adiciona nota |
| Lead resubmetido, Deal `lost` | Cria um Deal novo (o perdido fica esquecido) | Reabre o mesmo Deal, move para a 1ª etapa, nota |
| Lead resubmetido, Deal `won` | Cria um Deal novo | Mantém Won, adiciona nota |
| Webhook Pipedrive | Só reage a `won` — Lost/reabertura/mudança de estágio são descartados | Trata won/lost/reabertura/bookkeeping; `crm_deals` sempre atualizado |
| Envio a Meta/Google no Won | Envia o valor real do negócio | Envia só a ocorrência da venda, sem valor |
| Retry de webhook Won | Reenviaria a conversão para Meta/Google novamente | Claim idempotente — segunda entrega é no-op |
| Enriquecimento de sessão no Won | Sempre falhava silenciosamente (bug — ver abaixo) | Funciona corretamente (gclid recuperado quando disponível) |

### Bug pré-existente encontrado e corrigido

O webhook original do Pipedrive fazia `SELECT s.gbraid, s.wbraid FROM ...
JOIN sessions s ...`, mas a tabela `sessions` **nunca** teve essas colunas
(só `checkout_sessions` e `purchase_log` têm — confirmado em todas as 24
migrations). Isso fazia a query inteira falhar em produção (capturada pelo
try/catch existente), então o enriquecimento de sessão (fbp/fbc/gclid) para
conversões de Won via Pipedrive **nunca funcionou** — e, por consequência,
o envio ao Google Ads também nunca disparava (`gclid` sempre vazio).
Corrigido como parte da reescrita desta mesma função: a query agora só
seleciona colunas que existem em `sessions`; Google Ads passa a usar
apenas `gclid` (gbraid/wbraid nunca eram recuperáveis por esse caminho de
qualquer forma, já que a busca é por e-mail em `event_log`/`sessions`, não
por `trk` em `checkout_sessions`).

### Riscos encontrados

- **Duas Deals pré-existentes para a mesma Person** (ex.: criada
  manualmente por um vendedor, ou remanescente do bug antigo) — o backfill
  escolhe uma deterministicamente (open > won > lost, mais recente dentro
  do mesmo grupo) e a adota; a outra fica intocada no Pipedrive. É uma
  reconciliação pontual, não recorrente.
- **Migration 0024 pode falhar** se já existirem `event_id` duplicados em
  produção — comportamento seguro (não aplica, não altera dados), mas
  requer decisão manual se acontecer (ver comentário no arquivo da
  migration).
- **Dedup por telefone depende de comparação client-side** (busca solta no
  Pipedrive + normalização local dos candidatos) — mais chamadas de API
  que a busca por e-mail, mas só roda no caminho de fallback.

### Decisões tomadas durante a implementação (fora das 4 já confirmadas)

- **`crm_deals` não guarda e-mail/telefone** — são dados já vivos no
  Person do Pipedrive; a tabela só guarda a ligação (`person_id`/
  `deal_id`) e o estado do negócio. Segue literalmente a instrução
  "não duplicar campos já armazenados adequadamente".
- **`touch_count` removido do schema** — não estava na lista de campos
  pedida; `updated_at` já reflete a última conversão, e o histórico de
  quantas vezes o lead reconverteu fica implícito no número de notas no
  Deal (visível no próprio Pipedrive).
- **Backfill de `crm_deals` a partir do Pipedrive só roda para Person
  pré-existente** (nunca para Person recém-criada nesta mesma requisição,
  que por definição não pode ter Deal anterior) — evita uma chamada de
  API desnecessária no caminho mais comum (lead totalmente novo).
- **Testes**: como o projeto não tem framework de testes, os 11 cenários
  foram validados com um harness local (SQLite real via `node:sqlite` +
  mocks de `fetch` para Pipedrive/Meta/Google Ads), mantido fora do
  repositório (`scratchpad`, sessão local) — não foi adicionada nenhuma
  dependência de teste ao projeto.

### Correções finais (rodada de revisão pós-implementação)

Três correções pontuais, aprovadas após a revisão técnica inicial —
nenhuma expande o escopo, todas dentro dos mesmos dois arquivos de lógica
já reescritos:

1. **Normalização de e-mail** (`functions/outputs/pipedrive.js`) —
   `trim()` + `toLowerCase()` antes de buscar OU criar a Person no
   Pipedrive, para que `"JOAO@X.COM"` e `"joao@x.com"` resolvam para a
   mesma Person/Deal. O e-mail original (como digitado) continua intocado
   em todo o resto do arquivo.
2. **`won → open`** (`functions/webhook/pipedrive/[slug].js`) — a mesma
   função que já tratava `lost → open` (`handleReopenedInPipedrive`) passa
   a tratar também a reabertura manual de um Deal Won. `crm_deals.status`
   volta para `open`, `reopened_at` é registrado, `won_at` **nunca é
   apagado**, nenhuma conversão é enviada ou revertida.
3. **Proteção contra webhooks fora de ordem** — confirmado via
   [documentação oficial do Pipedrive](https://pipedrive.readme.io/docs/guide-for-webhooks)
   que o envelope do webhook v1 carrega `meta.timestamp`/
   `meta.timestamp_micro` (campo real, não inventado). Nova coluna
   `crm_deals.pipedrive_updated_at` (migration `0025`) grava o timestamp da
   última entrega aplicada por Deal; toda transição de status só é aceita
   se o timestamp recebido for mais novo que o armazenado — sem precisar de
   nenhuma chamada extra à API do Pipedrive. Documentado como dívida
   técnica separada, sem implementar: **"External conversion delivery
   retry"** — se Meta/Google falharem na única tentativa de um Won, o
   `status` já ficou `'won'`, então um reenvio do mesmo webhook pelo
   Pipedrive é tratado como duplicata e não tenta de novo. Sem fila/retry
   nesta fase, por decisão explícita.

Testes: 14/14 passando (11 da implementação inicial + `TESTE 12`
e-mail case/espaços, `TESTE 13` won→open, `TESTE 14` webhook Won atrasado
chegando após um Lost mais recente).

### Parando aqui

Conforme instruído: não iniciei Brevo, Wix, Score ou novos dashboards.
Aguardando sua revisão antes de qualquer commit/push, e antes de avançar
para a Fase 2.

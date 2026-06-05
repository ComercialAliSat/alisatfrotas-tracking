-- marketing_funnels: registro dos funis/páginas criados pela equipe.
--
-- NOTA DE DESIGN: visits e conversions NÃO são colunas — eles são
-- calculados em tempo real via JOIN com sessions e event_log.
-- Isso garante que os dados do funil sempre cruzam com os dados reais
-- de rastreamento, sem risco de inconsistência.
--
-- Para publicar um rascunho: UPDATE marketing_funnels SET status = 'published' WHERE id = ?

CREATE TABLE IF NOT EXISTS marketing_funnels (
  id           TEXT    PRIMARY KEY,
  name         TEXT    NOT NULL,
  slug         TEXT    NOT NULL,
  status       TEXT    NOT NULL DEFAULT 'draft',  -- 'draft' | 'published'
  content_json TEXT,                               -- reservado para editor de página futuro
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_funnels_slug    ON marketing_funnels(slug);
CREATE        INDEX IF NOT EXISTS idx_funnels_status  ON marketing_funnels(status);
CREATE        INDEX IF NOT EXISTS idx_funnels_created ON marketing_funnels(created_at);

-- Armazena campos brutos do formulário para exibição no dashboard.
-- raw_name e raw_phone são extraídos diretamente de user_data.fn/ph.
-- raw_form_data guarda todos os campos do user_data como JSON,
-- incluindo campos customizados (cnpj, empresa, segmento, veículos, etc.).

ALTER TABLE event_log ADD COLUMN raw_name  TEXT DEFAULT '';
ALTER TABLE event_log ADD COLUMN raw_phone TEXT DEFAULT '';
ALTER TABLE event_log ADD COLUMN raw_form_data TEXT DEFAULT '';

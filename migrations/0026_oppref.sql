-- Capture OpenAI's ChatGPT Ads click identifier (oppref), the ChatGPT Ads
-- equivalent of fbclid/gclid. Appended to the destination URL on ad clicks;
-- see https://developers.openai.com/ads/conversion-tracking. Threaded through
-- the same identifier chain as gclid: sessions -> checkout_sessions ->
-- purchase_log, so attribution and the future Conversions API fan-out can
-- both read it without a JOIN.
ALTER TABLE sessions ADD COLUMN oppref TEXT;
ALTER TABLE checkout_sessions ADD COLUMN oppref TEXT;
ALTER TABLE purchase_log ADD COLUMN oppref TEXT;

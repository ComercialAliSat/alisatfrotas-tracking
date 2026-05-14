-- Prevent duplicate purchase rows from webhook retries across any platform.
-- Also adds an index for fast lookup by transaction_id.
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchase_log_transaction_id
  ON purchase_log(transaction_id);

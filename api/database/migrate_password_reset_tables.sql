-- Migration script to add missing columns to password_reset_tokens table
-- Run this script to fix the "Unknown column 'session_id'" error

-- Add missing columns to existing table
ALTER TABLE password_reset_tokens 
ADD COLUMN IF NOT EXISTS session_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS correlation_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS used_at TIMESTAMP NULL;

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_session_id ON password_reset_tokens (session_id);
CREATE INDEX IF NOT EXISTS idx_correlation_id ON password_reset_tokens (correlation_id);

-- Update the stored procedure to handle the new columns
DROP PROCEDURE IF EXISTS CleanupExpiredTokens;

DELIMITER //
CREATE PROCEDURE CleanupExpiredTokens()
BEGIN
    -- Delete expired tokens
    DELETE FROM password_reset_tokens 
    WHERE expires_at < NOW() OR (used = TRUE AND used_at < DATE_SUB(NOW(), INTERVAL 1 DAY));
    
    -- Clean up old attempts (older than 24 hours)
    DELETE FROM password_reset_attempts 
    WHERE last_attempt < DATE_SUB(NOW(), INTERVAL 24 HOUR);
    
    -- Clean up old logs (older than 30 days)
    DELETE FROM password_reset_logs 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
    
    -- Clean up old password history (keep last 5 passwords per user)
    -- Using a simple approach that's compatible with all MariaDB versions
    DELETE ph1 FROM password_history ph1
    WHERE (
        SELECT COUNT(*) 
        FROM password_history ph2 
        WHERE ph2.user_id = ph1.user_id 
        AND ph2.user_type = ph1.user_type 
        AND ph2.created_at > ph1.created_at
    ) >= 5;
END //
DELIMITER ;

-- Verify the table structure
DESCRIBE password_reset_tokens;

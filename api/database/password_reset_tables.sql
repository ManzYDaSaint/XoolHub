-- Password Reset System Tables
-- This file contains the database schema for the password reset functionality

-- Password Reset Tokens Table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(255),
    correlation_id VARCHAR(255),
    used_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at),
    INDEX idx_used (used),
    INDEX idx_session_id (session_id),
    INDEX idx_correlation_id (correlation_id)
);

-- Password Reset Attempts Table (for rate limiting and security)
CREATE TABLE IF NOT EXISTS password_reset_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    attempt_count INT DEFAULT 1,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    blocked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_ip_address (ip_address),
    INDEX idx_blocked_until (blocked_until)
);

-- Password History Table (to prevent reuse of recent passwords)
CREATE TABLE IF NOT EXISTS password_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_type ENUM('school', 'teacher', 'super_admin') NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id, user_type),
    INDEX idx_created_at (created_at)
);

-- Password Reset Logs Table (for audit trail)
CREATE TABLE IF NOT EXISTS password_reset_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    action ENUM('requested', 'email_sent', 'link_clicked', 'password_reset', 'expired', 'invalid_token') NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    token_used VARCHAR(255),
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_success (success)
);

-- Cleanup procedure for expired tokens (run daily)
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS CleanupExpiredTokens()
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

-- Add missing columns to existing table (if they don't exist)
ALTER TABLE password_reset_tokens 
ADD COLUMN IF NOT EXISTS session_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS correlation_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS used_at TIMESTAMP NULL;

-- Add indexes for new columns (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_session_id ON password_reset_tokens (session_id);
CREATE INDEX IF NOT EXISTS idx_correlation_id ON password_reset_tokens (correlation_id);

-- Create event scheduler for cleanup (if not exists)
SET GLOBAL event_scheduler = ON;
 
CREATE EVENT IF NOT EXISTS cleanup_password_reset_data
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
  CALL CleanupExpiredTokens();

-- Referral System Database Tables
-- This file contains all the necessary tables for the referral system

-- Referral codes table - stores unique referral codes for each school
CREATE TABLE IF NOT EXISTS referral_codes (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    school_id INT NOT NULL,
    referral_code VARCHAR(20) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    INDEX idx_referral_code (referral_code),
    INDEX idx_school_id (school_id)
);

-- Referral tracking table - tracks when referrals are used
CREATE TABLE IF NOT EXISTS referral_tracking (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    referrer_school_id INT NOT NULL,
    referred_school_id INT NOT NULL,
    referral_code_used VARCHAR(20) NOT NULL,
    referral_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    discount_applied DECIMAL(10,2) DEFAULT 0.00,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    reward_amount DECIMAL(10,2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_school_id) REFERENCES schools(id) ON DELETE CASCADE,
    FOREIGN KEY (referred_school_id) REFERENCES schools(id) ON DELETE CASCADE,
    INDEX idx_referrer_school (referrer_school_id),
    INDEX idx_referred_school (referred_school_id),
    INDEX idx_referral_code_used (referral_code_used),
    INDEX idx_status (status)
);

-- Referral analytics table - stores aggregated analytics data
CREATE TABLE IF NOT EXISTS referral_analytics (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    school_id INT NOT NULL,
    total_referrals INT DEFAULT 0,
    successful_referrals INT DEFAULT 0,
    total_rewards_earned DECIMAL(10,2) DEFAULT 0.00,
    total_discounts_given DECIMAL(10,2) DEFAULT 0.00,
    last_referral_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    UNIQUE KEY unique_school_analytics (school_id)
);

-- Referral rewards table - tracks reward transactions
CREATE TABLE IF NOT EXISTS referral_rewards (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    school_id INT NOT NULL,
    referral_tracking_id CHAR(36) NOT NULL,
    reward_type ENUM('discount', 'credit', 'subscription_extension') NOT NULL,
    reward_amount DECIMAL(10,2) NOT NULL,
    reward_status ENUM('pending', 'applied', 'expired') DEFAULT 'pending',
    applied_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    FOREIGN KEY (referral_tracking_id) REFERENCES referral_tracking(id) ON DELETE CASCADE,
    INDEX idx_school_id (school_id),
    INDEX idx_reward_status (reward_status)
);

-- Referral settings table - configurable referral system settings
CREATE TABLE IF NOT EXISTS referral_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default referral settings
INSERT INTO referral_settings (setting_key, setting_value, description) VALUES
('referral_discount_percentage', '10.00', 'Default discount percentage for referred schools'),
('referral_reward_amount', '50.00', 'Default reward amount for referrer schools'),
('referral_code_length', '8', 'Length of generated referral codes'),
('referral_expiry_days', '365', 'Number of days referral codes remain valid'),
('max_referrals_per_school', '100', 'Maximum number of referrals allowed per school'),
('min_subscription_amount', '100.00', 'Minimum subscription amount to qualify for referral rewards')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

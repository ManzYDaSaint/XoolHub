-- Unified Subscription Plans Table
-- This file modifies the subscription_plans table to support both normal and pilot pricing

-- First, let's add the new columns to support pilot program pricing
ALTER TABLE subscription_plans 
ADD COLUMN IF NOT EXISTS pilot_price DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS pilot_discount_percentage DECIMAL(5,2) DEFAULT 50.00,
ADD COLUMN IF NOT EXISTS pilot_initial_payment_percentage DECIMAL(5,2) DEFAULT 33.33,
ADD COLUMN IF NOT EXISTS pilot_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS max_students INT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS duration_months INT DEFAULT 12,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update existing plans to have pilot pricing (50% off)
UPDATE subscription_plans 
SET 
    pilot_price = price * 0.5,
    pilot_discount_percentage = 50.00,
    pilot_initial_payment_percentage = 33.33,
    pilot_enabled = TRUE,
    max_students = CASE 
        WHEN name = 'Starter' THEN 100
        WHEN name = 'Professional' THEN 250
        WHEN name = 'Enterprise' THEN 500
        ELSE 100
    END,
    duration_months = 12,
    is_active = TRUE
WHERE pilot_price IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscription_plans_pilot_enabled ON subscription_plans(pilot_enabled);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_is_active ON subscription_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_price ON subscription_plans(price);

-- Drop the pilot_subscription_plans table since we're unifying everything
DROP TABLE IF EXISTS pilot_subscription_plans;

-- Update pilot_programs table to reference the unified subscription_plans
ALTER TABLE pilot_programs 
DROP FOREIGN KEY IF EXISTS pilot_programs_ibfk_2,
DROP COLUMN IF EXISTS pilot_plan_id,
ADD COLUMN IF NOT EXISTS plan_id VARCHAR(36) NOT NULL AFTER original_plan_id,
ADD FOREIGN KEY (plan_id) REFERENCES subscription_plans(id);

-- Update pilot_applications table to reference the unified subscription_plans
ALTER TABLE pilot_applications 
ADD FOREIGN KEY (preferred_plan_id) REFERENCES subscription_plans(id);

-- Create a view for easy pilot plan access
CREATE OR REPLACE VIEW pilot_plans AS
SELECT 
    id,
    name,
    price as original_price,
    pilot_price,
    pilot_discount_percentage,
    pilot_initial_payment_percentage,
    features,
    max_students,
    duration_months,
    is_active,
    created_at
FROM subscription_plans 
WHERE pilot_enabled = TRUE AND is_active = TRUE
ORDER BY price ASC;

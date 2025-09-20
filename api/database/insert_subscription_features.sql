-- Insert comprehensive features into subscription_plans table
-- This script updates the features field with all the features displayed on the pricing pages

-- Update Starter plan features
UPDATE subscription_plans 
SET features = 'Complete student information management, Comprehensive grade & assessment management, Parent & student communication portal, Staff management, Timetable & class scheduling, Fee management & invoicing, Transport & hostel management, Exam management & downloadable report cards, Custom reports & analytics dashboard, Mobile app for all users (In development), SMS & email notifications, Multi-campus support, 24/7 priority support, Data backup & security, Advanced Analytics, White-label Branding, API Access & Integrations, WhatsApp Integrations, Dedicated Accounts Managements, Bulk Data Import/Export'
WHERE name = 'Starter';

-- Update Professional plan features  
UPDATE subscription_plans 
SET features = 'Complete student information management, Comprehensive grade & assessment management, Parent & student communication portal, Staff management, Timetable & class scheduling, Fee management & invoicing, Transport & hostel management, Exam management & downloadable report cards, Custom reports & analytics dashboard, Mobile app for all users (In development), SMS & email notifications, Multi-campus support, 24/7 priority support, Data backup & security, Advanced Analytics, White-label Branding, API Access & Integrations, WhatsApp Integrations, Dedicated Accounts Managements, Bulk Data Import/Export'
WHERE name = 'Professional';

-- Update Enterprise plan features
UPDATE subscription_plans 
SET features = 'Complete student information management, Comprehensive grade & assessment management, Parent & student communication portal, Staff management, Timetable & class scheduling, Fee management & invoicing, Transport & hostel management, Exam management & downloadable report cards, Custom reports & analytics dashboard, Mobile app for all users (In development), SMS & email notifications, Multi-campus support, 24/7 priority support, Data backup & security, Advanced Analytics, White-label Branding, API Access & Integrations, WhatsApp Integrations, Dedicated Accounts Managements, Bulk Data Import/Export'
WHERE name = 'Enterprise';

-- Also update pilot program settings for all plans
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
WHERE name IN ('Starter', 'Professional', 'Enterprise');

-- Verify the updates
SELECT 
    name,
    price,
    pilot_price,
    pilot_enabled,
    max_students,
    SUBSTRING(features, 1, 100) as features_preview
FROM subscription_plans 
WHERE name IN ('Starter', 'Professional', 'Enterprise')
ORDER BY price ASC;

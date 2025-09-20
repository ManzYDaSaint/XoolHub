-- Pilot Program Database Tables
-- This file contains the database schema for the XoolHub Pilot Program

-- Table to store pilot program participants
CREATE TABLE IF NOT EXISTS pilot_programs (
    id VARCHAR(36) PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    preferred_plan_id VARCHAR(36) NOT NULL,
    school_size ENUM('small', 'medium', 'large') NOT NULL,
    current_system VARCHAR(255) NOT NULL,
    expected_students INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    pilot_active BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'approved', 'rejected', 'active', 'expired', 'cancelled') DEFAULT 'pending',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    FOREIGN KEY (preferred_plan_id) REFERENCES subscription_plans(id)
);
-- Disciplinary Management Database Schema
-- This schema supports multi-school disciplinary record management

-- Main Disciplinary Records Table
CREATE TABLE IF NOT EXISTS disciplinary_records (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    student_id CHAR(36) NOT NULL,
    category VARCHAR(100) NOT NULL,
    severity_level ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Low',
    incident_date DATE NOT NULL,
    status ENUM('Pending', 'Under Investigation', 'Resolved', 'Closed') NOT NULL DEFAULT 'Pending',
    action_taken VARCHAR(100) NOT NULL,
    evidence TEXT,
    witnesses TEXT,
    remarks TEXT,
    parent_notified BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    follow_up_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_student (student_id),
    INDEX idx_status (status),
    INDEX idx_severity (severity_level),
    INDEX idx_created_at (created_at)
);

CREATE TABLE attendance (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    studentid CHAR(36) NOT NULL,
    date DATE NOT NULL, 
    status ENUM('Present', 'Absent', 'Late') NOT NULL,
    note TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (studentid) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,

    UNIQUE KEY unique_student_date (studentid, date), -- prevents duplicates
    INDEX idx_date (date),                            -- if you query by date
    INDEX idx_created (created_at)                    -- if you query/sort by created_at
);
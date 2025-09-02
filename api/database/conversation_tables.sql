CREATE TABLE IF NOT EXISTS conversation_requests (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    parent_id VARCHAR(255) NOT NULL, -- Telegram chat ID of parent
    recipient_id INT NOT NULL, -- ID of teacher or administrator
    recipient_type ENUM('teacher', 'administrator') NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'closed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store active conversations
CREATE TABLE IF NOT EXISTS conversations (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    request_id CHAR(36) NOT NULL,
    parent_id VARCHAR(255) NOT NULL, -- Telegram chat ID of parent
    recipient_id INT NOT NULL, -- ID of teacher or administrator
    recipient_type ENUM('teacher', 'administrator') NOT NULL,
    status ENUM('active', 'closed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,
    FOREIGN KEY (request_id) REFERENCES conversation_requests(id) ON DELETE CASCADE
);

-- Table to store conversation messages
CREATE TABLE IF NOT EXISTS conversation_messages (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    conversation_id CHAR(36) NOT NULL,
    sender_id VARCHAR(255) NOT NULL, -- Telegram chat ID or user ID
    sender_type ENUM('parent', 'teacher', 'administrator') NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

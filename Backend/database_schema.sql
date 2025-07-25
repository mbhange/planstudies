-- Database schema for PlanStudies Application
-- Run this script to create the required database structure

CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('student', 'admin', 'agent', 'sub-admin') NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    otp VARCHAR(6),
    otp_verified BOOLEAN DEFAULT FALSE,
    reset_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User profiles table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20),
    profileImage VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP verification table for payments
CREATE TABLE otp_verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (email)
);

-- OTP verification for mobile
CREATE TABLE otp_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)
);

-- Payments table
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending'
);

-- Messages table for chat system
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_email VARCHAR(255) NOT NULL,
    receiver_email VARCHAR(255) NOT NULL,
    message TEXT,
    file_url VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_messages_sender ON messages(sender_email);
CREATE INDEX idx_messages_receiver ON messages(receiver_email);
CREATE INDEX idx_payments_date ON payments(date);
CREATE INDEX idx_otp_phone ON otp_verifications(phone);

-- Insert sample data for testing
INSERT INTO users (role, fullname, phone_number, email, password, otp_verified) VALUES
('admin', 'Admin User', '+1234567890', 'admin@planstudies.com', '$2b$10$example.hash.here', TRUE),
('student', 'John Doe', '+1234567891', 'john@example.com', '$2b$10$example.hash.here', TRUE),
('agent', 'Jane Smith', '+1234567892', 'jane@example.com', '$2b$10$example.hash.here', TRUE);

/**
 * schema.sql
 * 
 * Database schema for NatureKids application. Defines the structure
 * of all database tables and their relationships.
 * 
 * Key Tables:
 * - users: User account information
 * - activities: Nature-based activities
 * - bookings: Activity reservations
 * - reviews: User reviews and ratings
 * - user_activities: Activity tracking
 * - rewards: User achievements
 * 
 * Features:
 * - Foreign key constraints
 * - Indexes for performance
 * - Enum types for status fields
 * - Timestamp tracking
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

-- Create the database
DROP DATABASE IF EXISTS NN;
CREATE DATABASE NN;
USE NN;

-- Drop existing tables if they exist (in correct order to respect foreign key constraints)
-- DROP TABLE IF EXISTS comments;           -- Drop first as it references community_posts
-- DROP TABLE IF EXISTS reviews;            -- Drop as it references activities and users
-- DROP TABLE IF EXISTS bookings;           -- Drop as it references activities and users
-- DROP TABLE IF EXISTS user_activities;    -- Drop as it references activities and users
-- DROP TABLE IF EXISTS rewards;            -- Drop as it references users
-- DROP TABLE IF EXISTS community_posts;    -- Drop as it references users
-- DROP TABLE IF EXISTS activities;         -- Drop as it's referenced by other tables
-- DROP TABLE IF EXISTS users;              -- Drop last as it's referenced by all other tables

-- Users table with extended profile information
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    location VARCHAR(100),
    profile_picture VARCHAR(255),
    bio TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Activities table with detailed information
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    location_type ENUM('indoor', 'outdoor') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(50),
    age_range VARCHAR(50) NOT NULL,
    max_participants INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    participants INT NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    parent_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled') DEFAULT 'upcoming',
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Community Posts table
CREATE TABLE community_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    post TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    parent_comment_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- User Activities (Journey) table
CREATE TABLE user_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    status ENUM('in_progress', 'completed') DEFAULT 'in_progress',
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Rewards table
CREATE TABLE rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reward_type VARCHAR(50) NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_activity_location ON activities(location);
CREATE INDEX idx_booking_date ON bookings(booking_date);
CREATE INDEX idx_review_activity ON reviews(activity_id);
CREATE INDEX idx_comment_post ON comments(post_id);
CREATE INDEX idx_user_activity_status ON user_activities(status);
CREATE INDEX idx_reward_user ON rewards(user_id); 
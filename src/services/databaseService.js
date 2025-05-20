/**
 * databaseService.js
 * 
 * Service layer for database operations in NatureKids application.
 * Handles all database interactions and data management.
 * 
 * Key Features:
 * - User management operations
 * - Activity CRUD operations
 * - Booking management
 * - Review handling
 * - User activity tracking
 * - Database connection management
 * 
 * Dependencies:
 * - MySQL
 * - Connection Pool
 * - Bcrypt for password hashing
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

const pool = require('../config/database');
const bcrypt = require('bcrypt');

class DatabaseService {
  // User related operations
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [result] = await pool.execute(
      `INSERT INTO users (
        username, email, password, phone_number, location, 
        profile_picture, bio, date_of_birth
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.username,
        userData.email,
        hashedPassword,
        userData.phone_number,
        userData.location,
        userData.profile_picture,
        userData.bio,
        userData.date_of_birth
      ]
    );
    return result.insertId;
  }

  async getUserByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  async updateUserProfile(userId, userData) {
    const [result] = await pool.execute(
      `UPDATE users SET 
        username = ?,
        phone_number = ?,
        location = ?,
        profile_picture = ?,
        bio = ?,
        date_of_birth = ?
      WHERE id = ?`,
      [
        userData.username,
        userData.phone_number,
        userData.location,
        userData.profile_picture,
        userData.bio,
        userData.date_of_birth,
        userId
      ]
    );
    return result.affectedRows > 0;
  }

  // Activity related operations
  async createActivity(activityData) {
    const [result] = await pool.execute(
      `INSERT INTO activities (
        title, description, location, price, duration,
        age_range, max_participants, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        activityData.title,
        activityData.description,
        activityData.location,
        activityData.price,
        activityData.duration,
        activityData.ageRange,
        activityData.maxParticipants,
        activityData.imageUrl
      ]
    );
    return result.insertId;
  }

  async getActivitiesByFilters(filters) {
    const [rows] = await pool.execute(
      'SELECT * FROM activities WHERE age_range = ? AND location = ?',
      [filters.ageRange, filters.location]
    );
    return rows;
  }

  // Booking related operations
  async createBooking(bookingData) {
    const [result] = await pool.execute(
      `INSERT INTO bookings (
        user_id, activity_id, booking_date, booking_time,
        participants, child_name, parent_name, email,
        phone, total_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingData.userId,
        bookingData.activityId,
        bookingData.date,
        bookingData.time,
        bookingData.participants,
        bookingData.childName,
        bookingData.parentName,
        bookingData.email,
        bookingData.phone,
        bookingData.totalPrice
      ]
    );
    return result.insertId;
  }

  async getUserBookings(userId) {
    const [rows] = await pool.execute(
      `SELECT b.*, a.title, a.location, a.image_url 
       FROM bookings b 
       JOIN activities a ON b.activity_id = a.id 
       WHERE b.user_id = ? 
       ORDER BY b.booking_date DESC`,
      [userId]
    );
    return rows;
  }

  // Review related operations
  async createReview(reviewData) {
    const [result] = await pool.execute(
      `INSERT INTO reviews (
        user_id, activity_id, rating, comment
      ) VALUES (?, ?, ?, ?)`,
      [
        reviewData.userId,
        reviewData.activityId,
        reviewData.rating,
        reviewData.comment
      ]
    );
    return result.insertId;
  }

  async getActivityReviews(activityId) {
    const [rows] = await pool.execute(
      `SELECT r.*, u.username, u.profile_picture 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.activity_id = ? 
       ORDER BY r.created_at DESC`,
      [activityId]
    );
    return rows;
  }

  // Community post related operations
  async createPost(postData) {
    const [result] = await pool.execute(
      `INSERT INTO community_posts (
        user_id, content, image_url
      ) VALUES (?, ?, ?)`,
      [
        postData.userId,
        postData.content,
        postData.imageUrl
      ]
    );
    return result.insertId;
  }

  async getCommunityPosts() {
    const [rows] = await pool.execute(
      `SELECT p.*, u.username, u.profile_picture,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM community_posts p 
       JOIN users u ON p.user_id = u.id 
       ORDER BY p.created_at DESC`
    );
    return rows;
  }

  // Comment related operations
  async createComment(commentData) {
    const [result] = await pool.execute(
      `INSERT INTO comments (
        user_id, post_id, parent_comment_id, content
      ) VALUES (?, ?, ?, ?)`,
      [
        commentData.userId,
        commentData.postId,
        commentData.parentCommentId,
        commentData.content
      ]
    );
    return result.insertId;
  }

  async getPostComments(postId) {
    const [rows] = await pool.execute(
      `SELECT c.*, u.username, u.profile_picture 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.post_id = ? 
       ORDER BY c.created_at ASC`,
      [postId]
    );
    return rows;
  }

  // User activity tracking
  async logUserActivity(userId, activityId) {
    const [result] = await pool.execute(
      `INSERT INTO user_activities (
        user_id, activity_id, status
      ) VALUES (?, ?, 'in_progress')`,
      [userId, activityId]
    );
    return result.insertId;
  }

  async completeUserActivity(userId, activityId) {
    const [result] = await pool.execute(
      `UPDATE user_activities 
       SET status = 'completed', completed_at = NOW() 
       WHERE user_id = ? AND activity_id = ?`,
      [userId, activityId]
    );
    return result.affectedRows > 0;
  }

  async getUserJourney(userId) {
    const [rows] = await pool.execute(
      `SELECT a.*, ua.status, ua.completed_at 
       FROM activities a 
       JOIN user_activities ua ON a.id = ua.activity_id 
       WHERE ua.user_id = ? 
       ORDER BY ua.created_at DESC`,
      [userId]
    );
    return rows;
  }

  // Rewards related operations
  async getUserRewards(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM rewards WHERE user_id = ?',
      [userId]
    );
    return rows;
  }

  async awardReward(userId, rewardType) {
    const [result] = await pool.execute(
      'INSERT INTO rewards (user_id, reward_type, earned_at) VALUES (?, ?, NOW())',
      [userId, rewardType]
    );
    return result.insertId;
  }
}

module.exports = new DatabaseService(); 
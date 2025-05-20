/**
 * apiService.js
 * 
 * Central service for handling all API communications in the NatureKids application.
 * Manages authentication, data fetching, and state management for various features.
 * 
 * Key Features:
 * - Authentication endpoints (login, register)
 * - User profile management
 * - Activity management
 * - Booking system
 * - Review system
 * - Community features
 * - User activity tracking
 * 
 * Dependencies:
 * - Axios
 * - React Query
 * - JWT Authentication
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  // User profile endpoints
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response;
  },

  // Activity endpoints
  getActivities: async (filters = {}) => {
    const response = await api.get('/activities', { params: filters });
    return response;
  },

  getActivityById: async (id) => {
    const response = await api.get(`/activities/${id}`);
    return response;
  },

  // Booking endpoints
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response;
  },

  // Review endpoints
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response;
  },

  getActivityReviews: async (activityId) => {
    const response = await api.get(`/reviews/activity/${activityId}`);
    return response;
  },

  // Community endpoints
  createPost: async (postData) => {
    const response = await api.post('/community/posts', postData);
    return response;
  },

  getCommunityPosts: async (filters = {}) => {
    const response = await api.get('/community/posts', { params: filters });
    return response;
  },

  createComment: async (commentData) => {
    const response = await api.post('/community/comments', commentData);
    return response;
  },

  getPostComments: async (postId) => {
    const response = await api.get(`/community/posts/${postId}/comments`);
    return response;
  },

  // User activity tracking
  logUserActivity: async (activityData) => {
    const response = await api.post('/user-activities', activityData);
    return response;
  },

  getUserJourney: async () => {
    const response = await api.get('/user-activities/journey');
    return response;
  }
}; 
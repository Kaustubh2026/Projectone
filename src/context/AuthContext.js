import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      const userData = response.data.user;
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      // Update context state
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      const newUser = response.data.user;
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      // Update context state
      setUser(newUser);
      setIsAuthenticated(true);
      return newUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const response = await apiService.updateProfile(updatedData);
      const updatedUser = response.data;
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update context state
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
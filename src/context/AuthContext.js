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
    // Hardcoded user check
    const hardcodedUsername = 'testuser';
    const hardcodedPassword = 'password';

    if (credentials.username === hardcodedUsername && credentials.password === hardcodedPassword) {
      console.log('Simulating login with hardcoded user');
      // Simulate a user object structure similar to what your API might return
      const dummyUser = {
        id: 1,
        username: hardcodedUsername,
        email: 'test@example.com',
        phone_number: '1234567890',
        location: 'Test Location',
        date_of_birth: '2000-01-01',
        bio: 'Test Bio'
      };
      localStorage.setItem('user', JSON.stringify(dummyUser));
      setUser(dummyUser);
      setIsAuthenticated(true);
      return dummyUser;
    }

    // Original login logic
    try {
      const response = await apiService.login(credentials);
      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    // For hardcoded registration, just simulate a successful registration
    console.log('Simulating registration with hardcoded user');
    const dummyUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      phone_number: '1234567890',
      location: 'Test Location',
      date_of_birth: '2000-01-01',
      bio: 'Test Bio'
    };
    localStorage.setItem('user', JSON.stringify(dummyUser));
    setUser(dummyUser);
    setIsAuthenticated(true);
    return dummyUser;
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
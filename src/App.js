import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BookingsProvider } from './context/BookingsContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import ActivityPlanner from './pages/ActivityPlanner';
import Rewards from './pages/Rewards';
import Reviews from './pages/Reviews';
import UserProfile from './pages/UserProfile';
import ActivityDetails from './components/ActivityDetails';
import Community from './pages/Community';
import Journey from './pages/Journey';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LittleEcoExplorers from './pages/LittleEcoExplorers';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <BookingsProvider>
            <ReviewsProvider>
              <Router>
                <div className="App">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/discover" element={<Discover />} />
                      <Route path="/activity/:id" element={<ActivityDetails />} />
                      <Route path="/planner" element={
                        <ProtectedRoute>
                          <ActivityPlanner />
                        </ProtectedRoute>
                      } />
                      <Route path="/rewards" element={
                        <ProtectedRoute>
                          <Rewards />
                        </ProtectedRoute>
                      } />
                      <Route path="/reviews" element={<Reviews />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      
                      {/* Protected Routes */}
                      <Route path="/journey" element={
                        <ProtectedRoute>
                          <Journey />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <UserProfile />
                        </ProtectedRoute>
                      } />
                      <Route path="/community" element={
                        <ProtectedRoute>
                          <Community />
                        </ProtectedRoute>
                      } />
                      <Route path="/eco-explorers" element={
                        <ProtectedRoute>
                          <LittleEcoExplorers />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </ReviewsProvider>
          </BookingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

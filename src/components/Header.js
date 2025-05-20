/**
 * Header.js
 * 
 * Main navigation component for NatureKids that provides access to all
 * major features and user authentication controls.
 * 
 * Key Features:
 * - Responsive navigation menu
 * - User authentication controls
 * - Mobile-friendly design
 * - Map access integration
 * - Dynamic navigation based on auth state
 * 
 * Dependencies:
 * - React Router
 * - Styled Components
 * - React Icons
 * - Auth Context
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser, FaRoute, FaSignInAlt, FaUserPlus, FaMapMarkedAlt, FaHome, FaCompass, FaCalendarAlt, FaUsers, FaLeaf } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import NatureMap from './Map/NatureMap';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 0.8rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.shadows.medium};
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-left: 0.5rem;
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const MapButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  transition: all 0.3s ease;
  background: none;
  cursor: pointer;
  font-size: 0.95rem;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0 0.2rem;
  opacity: 0.4;
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Logo to="/">
            <FaLeaf /> NatureKids
          </Logo>
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
          <NavLinks isOpen={isMenuOpen}>
            <NavGroup>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
              <NavLink to="/discover">
                <FaCompass /> Discover
              </NavLink>
            </NavGroup>

            {isAuthenticated && (
              <>
                <Divider />
                <NavGroup>
                  <NavLink to="/planner">
                    <FaCalendarAlt /> Planner
                  </NavLink>
                  <NavLink to="/community">
                    <FaUsers /> Community
                  </NavLink>
                  <NavLink to="/eco-explorers">
                    <FaLeaf /> Eco Explorers
                  </NavLink>
                  <NavLink to="/profile">
                    <FaUser /> Profile
                  </NavLink>
                </NavGroup>
              </>
            )}

            <Divider />
            <NavGroup>
              <MapButton onClick={() => setShowMap(true)}>
                <FaMapMarkedAlt /> Find Places
              </MapButton>
              {!isAuthenticated ? (
                <AuthLinks>
                  <AuthButton to="/login">
                    <FaSignInAlt /> Login
                  </AuthButton>
                  <AuthButton to="/register">
                    <FaUserPlus /> Register
                  </AuthButton>
                </AuthLinks>
              ) : (
                <AuthButton as="button" onClick={handleLogout}>
                  <FaSignInAlt /> Logout
                </AuthButton>
              )}
            </NavGroup>
          </NavLinks>
        </Nav>
      </HeaderContainer>
      
      {showMap && <NatureMap onClose={() => setShowMap(false)} />}
    </>
  );
}

export default Header; 
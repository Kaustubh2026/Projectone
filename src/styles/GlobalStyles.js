import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#4CAF50', // Nature green
    secondary: '#FF9800', // Playful orange
    accent: '#2196F3', // Sky blue
    background: '#F5F5F5',
    text: '#333333',
    lightText: '#666666',
    white: '#FFFFFF',
    error: '#F44336',
    success: '#4CAF50',
  },
  fonts: {
    primary: "'Comic Sans MS', 'Comic Sans', cursive",
    secondary: "'Nunito', sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.secondary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: ${theme.borderRadius.medium};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-family: ${theme.fonts.secondary};
    transition: all 0.3s ease;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium};
    }
  }

  input, textarea {
    border: 2px solid ${theme.colors.lightText};
    border-radius: ${theme.borderRadius.small};
    padding: ${theme.spacing.sm};
    font-family: ${theme.fonts.secondary};
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }
`; 
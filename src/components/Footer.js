import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  a {
    font-size: 1.5rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About NatureKids</h3>
          <p>Helping children aged 2-8 discover the joy of outdoor play and nature-based exploration.</p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="mailto:info@naturekids.com">
              <FaEnvelope />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/discover">Discover Activities</a></li>
            <li><a href="/planner">Activity Planner</a></li>
            <li><a href="/rewards">Rewards & Badges</a></li>
            <li><a href="/reviews">Reviews</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@naturekids.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Nature Way, Green City</li>
          </ul>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} NatureKids. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer; 
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaLeaf, FaTree, FaSun, FaStar, FaUsers, FaMapMarkedAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import NatureMap from '../components/Map/NatureMap';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heroZoom = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
`;

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.7s ease;
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background: none;
  border-radius: 32px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  min-height: 340px;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover no-repeat;
  z-index: 1;
  animation: ${heroZoom} 30s ease-in-out infinite alternate;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(120deg, rgba(249,249,246,0.92) 0%, rgba(249,249,246,0.7) 60%, rgba(249,249,246,0.2) 100%);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  padding: 3.5rem 1.5rem 2.5rem 1.5rem;
`;

const HeroTitle = styled.h1`
  font-family: 'Quicksand', 'Baloo', sans-serif;
  font-size: 2.7rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  letter-spacing: 0.01em;
`;

const HeroSubtitle = styled.p`
  font-family: 'Inter', 'Nunito', 'Open Sans', sans-serif;
  font-size: 1.3rem;
  color: #222;
  margin-bottom: 1.7rem;
  text-align: center;
  font-weight: 500;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1.1rem 2.2rem;
  border-radius: 14px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  }
`;

const MapButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: 0.7rem 1.3rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  background: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin: 1.5rem auto 0 auto;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

const MissionSection = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 32px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  animation: ${fadeIn} 0.7s ease;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px) scale(1.01);
  }
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.2rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.2rem;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.7s ease;
  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const BenefitsList = styled.ul`
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: ${({ theme }) => theme.shadows.small};
  }

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.md};
    flex-shrink: 0;
    margin-top: 3px;
  }

  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const HeroSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto 0 auto;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 0.7rem 1.2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 2.5rem 0 1.2rem 0;
  letter-spacing: 0.01em;
  text-align: left;
`;

const CarouselRow = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 2.2rem;
  padding-bottom: 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary} #eee;
  &::-webkit-scrollbar {
    height: 10px;
    background: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }
`;

const CarouselCard = styled.div`
  min-width: 340px;
  max-width: 360px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 22px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  overflow: hidden;
  scroll-snap-align: start;
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 16px 48px rgba(0,0,0,0.16);
    transform: translateY(-6px) scale(1.03);
  }
`;

const CarouselImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: transform 0.4s cubic-bezier(.4,0,.2,1);
  ${CarouselCard}:hover & {
    transform: scale(1.05);
  }
`;

const CarouselContent = styled.div`
  padding: 1.2rem 1.1rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CarouselTitleText = styled.h3`
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
`;

const CarouselInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
  svg { color: ${({ theme }) => theme.colors.primary}; font-size: 1.1rem; }
`;

const CarouselPrice = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
`;

const CarouselRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.05rem;
`;

const TestimonialRow = styled(CarouselRow)`
  margin-bottom: 2rem;
`;

const TestimonialCard = styled(CarouselCard)`
  min-width: 320px;
  max-width: 340px;
  text-align: left;
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeroActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StyledMapButton = styled(MapButton)`
  width: 210px;
  height: 54px;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  background: #fff;
  border: 2px solid #4CAF50;
  color: #4CAF50;
  font-weight: 700;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(76,175,80,0.08);
  transition: box-shadow 0.2s, transform 0.2s, color 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(76,175,80,0.18);
    transform: scale(1.05) translateY(-2px);
    color: #388e3c;
  }
  svg {
    transition: transform 0.2s;
  }
  &:hover svg {
    transform: translateX(4px);
  }
`;

const StyledCTAButton = styled(CTAButton)`
  width: 210px;
  height: 54px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  background: #FFA726;
  color: #fff;
  font-weight: 700;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(255,167,38,0.08);
  border: none;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(255,167,38,0.18);
    transform: scale(1.05) translateY(-2px);
    background: #ff9800;
  }
`;

function Home() {
  const [showMap, setShowMap] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const activities = [
    {
      id: 1,
      title: 'Nature Scavenger Hunt',
      location: 'Central Park',
      date: '2024-04-15',
      price: 350,
      rating: 4.8,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Garden Explorers',
      location: 'Botanical Gardens',
      date: '2024-04-20',
      price: 400,
      rating: 4.9,
      reviews: 38,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: 'Forest Adventure',
      location: 'Greenwood Forest',
      date: '2024-04-25',
      price: 950,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];
  const testimonials = [
    {
      text: '"My kids absolutely love the nature scavenger hunts! It\'s amazing to see them so excited about exploring."',
      author: 'Sarah M.'
    },
    {
      text: '"The guided nature walks have helped my children develop a real appreciation for the environment."',
      author: 'Michael T.'
    },
    {
      text: '"NatureKids has made outdoor activities so much more engaging and educational for our family."',
      author: 'Lisa K.'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroBg />
        <HeroOverlay />
        <HeroContent>
        <HeroTitle>Discover the Joy of Outdoor Play</HeroTitle>
        <HeroSubtitle>
          Helping children aged 2-8 explore nature and develop through play
        </HeroSubtitle>
          <HeroActions>
            <StyledMapButton onClick={() => setShowMap(true)}>
              <FaMapMarkedAlt /> Find Places
            </StyledMapButton>
            <StyledCTAButton to="/discover">Search Activities</StyledCTAButton>
          </HeroActions>
        </HeroContent>
      </HeroSection>
      {showMap && <NatureMap onClose={() => setShowMap(false)} />}

      <SectionTitle>Suggested Activities</SectionTitle>
      <CarouselRow>
        {activities.map(activity => (
          <CarouselCard key={activity.id}>
            <CarouselImage image={activity.image} />
            <CarouselContent>
              <CarouselTitleText>{activity.title}</CarouselTitleText>
              <CarouselInfo>
                <span><FaMapMarkerAlt /> {activity.location}</span>
                <span><FaCalendarAlt /> {activity.date}</span>
              </CarouselInfo>
              <CarouselPrice>₹{activity.price}</CarouselPrice>
              <CarouselRating>
                <FaStar /> {activity.rating} <span>({activity.reviews})</span>
              </CarouselRating>
            </CarouselContent>
          </CarouselCard>
        ))}
      </CarouselRow>

      <MissionSection>
        <h2>Our Mission</h2>
        <p>
          At NatureKids, we believe in the power of outdoor play and nature-based exploration
          for children's development. We're on a mission to help parents find engaging,
          educational, and fun outdoor activities for their children.
        </p>
      </MissionSection>

      <FeaturesGrid>
        <FeatureCard>
          <FaLeaf />
          <h3>Nature-Based Activities</h3>
          <p>
            Discover a wide range of outdoor activities designed to spark curiosity
            and love for nature in young children.
          </p>
        </FeatureCard>
        <FeatureCard>
          <FaTree />
          <h3>Expert-Led Programs</h3>
          <p>
            Our activities are led by experienced educators and nature enthusiasts
            who specialize in child development.
          </p>
        </FeatureCard>
        <FeatureCard>
          <FaSun />
          <h3>Safe & Engaging</h3>
          <p>
            All our activities are carefully designed to be safe, age-appropriate,
            and engaging for young children.
          </p>
        </FeatureCard>
      </FeaturesGrid>

      <SectionTitle>What Parents Say</SectionTitle>
      <TestimonialRow>
        {testimonials.map((t, i) => (
          <TestimonialCard key={i}>
            <p>{t.text}</p>
            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>- {t.author}</p>
          </TestimonialCard>
        ))}
      </TestimonialRow>

      <MissionSection>
        <h2>Why Choose NatureKids?</h2>
        <p>
          We understand that every child is unique, and that's why we offer a diverse range of activities
          that cater to different interests and learning styles. Our programs are designed to:
        </p>
        <BenefitsList>
          <BenefitItem>
            <FaLeaf />
            <span>Foster a deep connection with nature through hands-on exploration and discovery</span>
          </BenefitItem>
          <BenefitItem>
            <FaTree />
            <span>Develop physical and cognitive skills through engaging outdoor activities</span>
          </BenefitItem>
          <BenefitItem>
            <FaSun />
            <span>Encourage creativity and imagination with nature-inspired play</span>
          </BenefitItem>
          <BenefitItem>
            <FaStar />
            <span>Build confidence and independence through guided outdoor experiences</span>
          </BenefitItem>
          <BenefitItem>
            <FaUsers />
            <span>Create lasting memories with family through shared nature adventures</span>
          </BenefitItem>
        </BenefitsList>
      </MissionSection>

      <MissionSection>
        <h2>Join Our Community</h2>
        <p>
          Become part of a growing community of nature-loving families. Share your experiences,
          get inspired by others, and create unforgettable memories with your children.
        </p>
        <CTAButton to="/register" style={{ marginTop: '20px' }}>
          Join Now
        </CTAButton>
      </MissionSection>
    </HomeContainer>
  );
}

export default Home; 
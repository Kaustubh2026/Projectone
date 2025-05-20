/**
 * Discover.js
 * 
 * Main discovery page for NatureKids that displays available activities
 * and allows users to search, filter, and explore nature-based activities.
 * 
 * Key Features:
 * - Activity search functionality
 * - Filtering by price range, location, and rating
 * - Activity carousel display
 * - Responsive grid layout
 * - Rating system with stars
 * - Activity booking integration
 * 
 * Dependencies:
 * - React Router
 * - Styled Components
 * - React Icons
 * - React Query
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DiscoverContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SearchBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }

  svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 0.7rem 1.3rem;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CarouselContainer = styled.div`
  position: relative;
  margin: 2.5rem 0 2rem 0;
`;

const CarouselTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  letter-spacing: 0.01em;
`;

const ActivitiesCarousel = styled.div`
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

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CarouselButtonLeft = styled(CarouselButton)`
  left: -22px;
`;
const CarouselButtonRight = styled(CarouselButton)`
  right: -22px;
`;

const FilterPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${fadeIn} 0.7s ease;
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FilterTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 700;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterOption = styled.button`
  padding: 0.6rem 1.1rem;
  border: 2px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.lightText};
  border-radius: 10px;
  background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, active }) => active ? theme.colors.white : theme.colors.text};
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.background};
    color: ${({ theme, active }) => active ? theme.colors.white : theme.colors.primary};
  }
`;

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    title: 'Nature Scavenger Hunt',
    location: 'Central Park',
    date: '2024-04-15',
    price: 350,
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Join us for an exciting scavenger hunt through nature! Perfect for children aged 4-8.',
    duration: '2 hours',
    ageRange: '4-8 years',
    maxParticipants: 15,
    availableTimes: ['09:00 AM', '11:00 AM', '02:00 PM'],
    requirements: ['Comfortable shoes', 'Water bottle', 'Sun hat']
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
    description: 'Learn about plants and insects while exploring our beautiful gardens.',
    duration: '1.5 hours',
    ageRange: '3-7 years',
    maxParticipants: 12,
    availableTimes: ['10:00 AM', '01:00 PM', '03:00 PM'],
    requirements: ['Comfortable clothes', 'Water bottle', 'Insect repellent']
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
    description: 'Explore the forest, learn about wildlife, and build a shelter!',
    duration: '3 hours',
    ageRange: '5-8 years',
    maxParticipants: 10,
    availableTimes: ['09:30 AM', '01:30 PM'],
    requirements: ['Hiking shoes', 'Rain jacket', 'Lunch box']
  },
  {
    id: 4,
    title: 'Beach Discovery',
    location: 'Sunny Beach',
    date: '2024-04-28',
    price: 600,
    rating: 4.9,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Discover marine life and build sandcastles at the beach!',
    duration: '2.5 hours',
    ageRange: '3-6 years',
    maxParticipants: 15,
    availableTimes: ['10:00 AM', '02:00 PM'],
    requirements: ['Swimsuit', 'Towel', 'Sunscreen']
  },
  {
    id: 5,
    title: 'Nature Art Workshop',
    location: 'Art Center',
    date: '2024-05-02',
    price: 250,
    rating: 4.6,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Create beautiful art using natural materials found in nature.',
    duration: '1.5 hours',
    ageRange: '4-7 years',
    maxParticipants: 12,
    availableTimes: ['09:00 AM', '11:00 AM', '02:00 PM'],
    requirements: ['Apron', 'Water bottle', 'Art supplies']
  },
  {
    id: 6,
    title: 'Mini Gardeners',
    location: 'Community Garden',
    date: '2024-05-05',
    price: 300,
    rating: 4.8,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Learn to plant and care for your own mini garden!',
    duration: '1.5 hours',
    ageRange: '3-5 years',
    maxParticipants: 8,
    availableTimes: ['10:00 AM', '02:00 PM'],
    requirements: ['Gardening gloves', 'Water bottle', 'Small pot']
  },
  {
    id: 7,
    title: 'Animal Trackers',
    location: 'Wildlife Reserve',
    date: '2024-05-08',
    price: 800,
    rating: 4.9,
    reviews: 41,
    image: 'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Learn to identify animal tracks and signs in the wild!',
    duration: '2 hours',
    ageRange: '5-8 years',
    maxParticipants: 10,
    availableTimes: ['09:00 AM', '11:00 AM'],
    requirements: ['Binoculars', 'Notebook', 'Pencil']
  },
  {
    id: 8,
    title: 'Rainy Day Explorers',
    location: 'Nature Center',
    date: '2024-05-10',
    price: 220,
    rating: 4.7,
    reviews: 35,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Discover the magic of nature on a rainy day!',
    duration: '1.5 hours',
    ageRange: '3-6 years',
    maxParticipants: 12,
    availableTimes: ['10:00 AM', '02:00 PM'],
    requirements: ['Rain boots', 'Rain jacket', 'Umbrella']
  },
  {
    id: 9,
    title: 'Stargazing Adventure',
    location: 'Observatory Park',
    date: '2024-05-12',
    price: 700,
    rating: 4.9,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1532978379173-523e16f371f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Explore the night sky and learn about constellations!',
    duration: '2 hours',
    ageRange: '6-8 years',
    maxParticipants: 15,
    availableTimes: ['07:00 PM', '08:00 PM'],
    requirements: ['Warm clothes', 'Blanket', 'Flashlight']
  },
  {
    id: 10,
    title: 'Nature Storytellers',
    location: 'Story Garden',
    date: '2024-05-15',
    price: 210,
    rating: 4.8,
    reviews: 33,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Create and share stories inspired by nature!',
    duration: '1 hour',
    ageRange: '4-7 years',
    maxParticipants: 12,
    availableTimes: ['10:00 AM', '11:00 AM', '02:00 PM'],
    requirements: ['Imagination', 'Drawing materials', 'Water bottle']
  }
];

function Discover() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [],
    location: [],
    rating: null
  });
  const carouselRef = useRef(null);

  const priceRanges = ['₹200-₹400', '₹401-₹700', '₹701-₹1000'];
  const locations = ['Central Park', 'Botanical Gardens', 'Greenwood Forest', 'Sunny Beach', 'Art Center'];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleRatingFilter = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const handleActivityClick = (activity) => {
    navigate(`/activity/${activity.id}`, { state: { activity } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  const filteredActivities = mockActivities.filter(activity => {
    // Search filter
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Price range filter
    const matchesPrice = filters.priceRange.length === 0 ||
      filters.priceRange.some(range => {
        // Remove currency symbol and spaces, then split
        const [minStr, maxStr] = range.replace(/₹/g, '').replace(/\s/g, '').split('-');
        const min = parseInt(minStr, 10);
        const max = parseInt(maxStr, 10);
        if (!isNaN(min) && !isNaN(max)) {
          return activity.price >= min && activity.price <= max;
        }
        return false;
      });

    // Location filter
    const matchesLocation = filters.location.length === 0 ||
      filters.location.includes(activity.location);

    // Rating filter
    const matchesRating = !filters.rating || 
      Math.floor(activity.rating) === filters.rating;

    return matchesSearch && matchesPrice && matchesLocation && matchesRating;
  });

  return (
    <DiscoverContainer>
      <h1>Discover Activities</h1>
      
      <SearchBar>
        <SearchInput>
          <FaSearch />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInput>
        <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FaFilter />
          Filters
        </FilterButton>
      </SearchBar>

      <FilterPanel isOpen={isFilterOpen}>
        <FilterGroup>
          <FilterTitle>Price Range</FilterTitle>
          <FilterOptions>
            {priceRanges.map(range => (
              <FilterOption
                key={range}
                active={filters.priceRange.includes(range)}
                onClick={() => handleFilterChange('priceRange', range)}
              >
                {range}
              </FilterOption>
            ))}
          </FilterOptions>
        </FilterGroup>

        <FilterGroup>
          <FilterTitle>Location</FilterTitle>
          <FilterOptions>
            {locations.map(location => (
              <FilterOption
                key={location}
                active={filters.location.includes(location)}
                onClick={() => handleFilterChange('location', location)}
              >
                {location}
              </FilterOption>
            ))}
          </FilterOptions>
        </FilterGroup>

        <FilterGroup>
          <FilterTitle>Rating</FilterTitle>
          <FilterOptions>
            {[5, 4, 3].map(rating => (
              <FilterOption
                key={rating}
                active={filters.rating === rating}
                onClick={() => handleRatingFilter(rating)}
              >
                {rating}+ Stars
              </FilterOption>
            ))}
          </FilterOptions>
        </FilterGroup>
      </FilterPanel>

      <CarouselContainer>
        <CarouselTitle>Suggested Activities</CarouselTitle>
        <CarouselButtonLeft onClick={() => carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' })}>
          <FaChevronLeft />
        </CarouselButtonLeft>
        <ActivitiesCarousel ref={carouselRef}>
          {filteredActivities.map(activity => (
            <CarouselCard key={activity.id} onClick={() => handleActivityClick(activity)}>
              <CarouselImage image={activity.image} />
              <CarouselContent>
                <CarouselTitleText>{activity.title}</CarouselTitleText>
                <CarouselInfo>
                  <span><FaMapMarkerAlt /> {activity.location}</span>
                  <span><FaCalendarAlt /> {activity.date}</span>
                </CarouselInfo>
                <CarouselPrice>₹{activity.price}</CarouselPrice>
                <CarouselRating>
                  {renderStars(activity.rating)}
                  <span>({activity.reviews})</span>
                </CarouselRating>
              </CarouselContent>
            </CarouselCard>
          ))}
        </ActivitiesCarousel>
        <CarouselButtonRight onClick={() => carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' })}>
          <FaChevronRight />
        </CarouselButtonRight>
      </CarouselContainer>
    </DiscoverContainer>
  );
}

export default Discover; 
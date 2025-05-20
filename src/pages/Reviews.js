import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUser, FaFilter, FaArrowRight } from 'react-icons/fa';
import { useReviews } from '../context/ReviewsContext';
import { Link } from 'react-router-dom';

const ReviewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.active ? '#fff' : props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const ReviewDate = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
`;

const Rating = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  gap: 0.25rem;
`;

const ReviewText = styled.p`
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ActivityName = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 20px;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    transform: translateX(5px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;

  h2 {
    margin: 0 0 1rem 0;
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textLight};
  }
`;

function Reviews() {
  const { reviews } = useReviews();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filterOptions = [
    { id: 'all', label: 'All Reviews' },
    { id: '5', label: '5 Stars' },
    { id: '4', label: '4 Stars' },
    { id: '3', label: '3 Stars' },
    { id: '2', label: '2 Stars' },
    { id: '1', label: '1 Star' }
  ];

  const sortOptions = [
    { id: 'date', label: 'Most Recent' },
    { id: 'rating', label: 'Highest Rated' }
  ];

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

  const filteredReviews = reviews
    .filter(review => {
      if (activeFilter === 'all') return true;
      return Math.floor(review.rating) === parseInt(activeFilter);
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.rating - a.rating;
      }
    });

  return (
    <ReviewsContainer>
      <h1>Reviews & Testimonials</h1>

      <FilterSection>
        <FilterButton active={true}>
          <FaFilter />
          Filter by:
        </FilterButton>
        {filterOptions.map(option => (
          <FilterButton
            key={option.id}
            active={activeFilter === option.id}
            onClick={() => setActiveFilter(option.id)}
          >
            {option.label}
          </FilterButton>
        ))}
      </FilterSection>

      <FilterSection>
        <FilterButton active={true}>
          <FaFilter />
          Sort by:
        </FilterButton>
        {sortOptions.map(option => (
          <FilterButton
            key={option.id}
            active={sortBy === option.id}
            onClick={() => setSortBy(option.id)}
          >
            {option.label}
          </FilterButton>
        ))}
      </FilterSection>

      {filteredReviews.length === 0 ? (
        <EmptyState>
          <h2>No reviews found</h2>
          <p>Be the first to leave a review for an activity!</p>
        </EmptyState>
      ) : (
        <ReviewsGrid>
          {filteredReviews.map(review => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <UserAvatar>
                  <FaUser />
                </UserAvatar>
                <UserInfo>
                  <UserName>{review.name}</UserName>
                  <ReviewDate>{new Date(review.date).toLocaleDateString()}</ReviewDate>
                </UserInfo>
              </ReviewHeader>
              <Rating>{renderStars(review.rating)}</Rating>
              <ReviewText>{review.comment}</ReviewText>
              <ActivityName to={`/activity/${review.activityId}`}>
                {review.activityName}
                <FaArrowRight />
              </ActivityName>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      )}
    </ReviewsContainer>
  );
}

export default Reviews; 
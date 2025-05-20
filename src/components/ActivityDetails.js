/**
 * ActivityDetails.js
 * 
 * Detailed view component for individual activities in NatureKids.
 * Displays comprehensive information about activities and handles
 * booking, reviews, and user interactions.
 * 
 * Key Features:
 * - Activity information display
 * - Booking system integration
 * - Review submission and display
 * - Rating system with stars
 * - Image gallery
 * - Location information
 * - Age and participant requirements
 * 
 * Dependencies:
 * - React Router
 * - Styled Components
 * - React Icons
 * - Auth Context
 * - API Service
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaStar, FaRegStar, FaStarHalfAlt, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBookings } from '../context/BookingsContext';
import { useReviews } from '../context/ReviewsContext';
import { useAuth } from '../context/AuthContext';
import Payment from './Payment';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.7s ease;
`;

const ActivityHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-radius: 24px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem 1.5rem;
  animation: ${fadeIn} 0.7s ease;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityImage = styled.div`
  height: 340px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  transition: transform 0.4s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  ${ActivityHeader}:hover & {
    transform: scale(1.04);
  }
`;

const ActivityInfo = styled.div`
  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.01em;
  }
`;

const ActivityMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 1.1rem;
  div {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    svg {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.2rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.2rem;
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.div`
  margin-bottom: 2rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.08rem;
`;

const BookingSection = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.7s ease;
`;

const BookingForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.05rem;
`;

const Input = styled.input`
  padding: 0.7rem;
  border: 2px solid ${({ theme }) => theme.colors.lightText};
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.7rem;
  border: 2px solid ${({ theme }) => theme.colors.lightText};
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.1rem;
  grid-column: 1 / -1;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: none;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightText};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ReviewsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ReviewForm = styled.form`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ReviewInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.lightText};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  resize: vertical;
`;

const RatingInput = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StarButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, active }) => active ? theme.colors.secondary : theme.colors.lightText};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
`;

const ReviewsList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ReviewCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewText = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const ReviewDate = styled.small`
  color: ${({ theme }) => theme.colors.lightText};
`;

function ActivityDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addBooking } = useBookings();
  const { addReview, getActivityReviews } = useReviews();
  const { user } = useAuth();
  const activity = location.state?.activity;
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    participants: 1,
    childName: '',
    parentName: '',
    email: '',
    phone: ''
  });
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  if (!activity) {
    return (
      <DetailsContainer>
        <h2>Activity not found</h2>
        <BackButton onClick={() => navigate('/discover')}>← Back to Activities</BackButton>
      </DetailsContainer>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentResult) => {
    if (paymentResult.success) {
      // Create a new booking
      const newBooking = {
        id: Date.now(),
        activity: activity.title,
        date: bookingData.date,
        time: bookingData.time,
        location: activity.location,
        participants: parseInt(bookingData.participants),
        price: activity.price * parseInt(bookingData.participants),
        status: 'upcoming',
        childName: bookingData.childName,
        parentName: bookingData.parentName,
        email: bookingData.email,
        phone: bookingData.phone,
        transactionId: paymentResult.transactionId
      };

      // Add to bookings
      addBooking(newBooking);
      setBookingComplete(true);
      
      // Show success message
      alert('Booking and payment successful!');
      
      // Navigate to profile to see the booking
      navigate('/profile');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to submit a review');
      navigate('/login');
      return;
    }
    
    const newReview = {
      id: Date.now(),
      activityId: activity.id,
      rating: reviewData.rating,
      comment: reviewData.comment,
      username: user.username,
      date: new Date().toISOString()
    };

    addReview(newReview);
    setReviewData({ rating: 0, comment: '' });
  };

  const handleRatingChange = (rating) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  const activityReviews = getActivityReviews(activity.id);

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

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate('/discover')}>← Back to Activities</BackButton>
      
      <ActivityHeader>
        <ActivityImage image={activity.image} />
        <ActivityInfo>
          <h1>{activity.title}</h1>
          <Rating>
            {renderStars(activity.rating)}
            <span>({activity.reviews} reviews)</span>
          </Rating>
          <Price>₹{activity.price} per child</Price>
          <ActivityMeta>
            <div>
              <FaMapMarkerAlt />
              <span>{activity.location}</span>
            </div>
            <div>
              <FaClock />
              <span>{activity.duration}</span>
            </div>
            <div>
              <FaUsers />
              <span>Ages {activity.ageRange}</span>
            </div>
          </ActivityMeta>
          <Description>
            <h3>About this Activity</h3>
            <p>{activity.description}</p>
            <h3>What to Bring</h3>
            <ul>
              {activity.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Description>
        </ActivityInfo>
      </ActivityHeader>

      {!showPayment && !bookingComplete && (
        <BookingSection>
          <h2>Book this Activity</h2>
          <BookingForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={bookingData.date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="time">Time</Label>
              <Select
                id="time"
                name="time"
                value={bookingData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a time</option>
                {activity.availableTimes.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="participants">Number of Children</Label>
              <Input
                type="number"
                id="participants"
                name="participants"
                value={bookingData.participants}
                onChange={handleInputChange}
                min="1"
                max={activity.maxParticipants}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="childName">Child's Name</Label>
              <Input
                type="text"
                id="childName"
                name="childName"
                value={bookingData.childName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="parentName">Parent's Name</Label>
              <Input
                type="text"
                id="parentName"
                name="parentName"
                value={bookingData.parentName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit">Proceed to Payment</SubmitButton>
          </BookingForm>
        </BookingSection>
      )}

      {showPayment && !bookingComplete && (
        <Payment 
          amount={activity.price * parseInt(bookingData.participants)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      <ReviewsSection>
        <h2>Reviews</h2>
        
        <ReviewForm onSubmit={handleReviewSubmit}>
          <FormGroup>
            <Label>Rating</Label>
            <RatingInput>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  type="button"
                  active={star <= (hoverRating || reviewData.rating)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingChange(star)}
                >
                  <FaStar />
                </StarButton>
              ))}
            </RatingInput>
          </FormGroup>

          <FormGroup>
            <Label>Your Review</Label>
            <ReviewInput
              value={reviewData.comment}
              onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Submit Review</SubmitButton>
        </ReviewForm>

        <ReviewsList>
          {activityReviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this activity!</p>
          ) : (
            activityReviews.map(review => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <UserAvatar>
                    <FaUser />
                  </UserAvatar>
                  <ReviewContent>
                    <div>
                      {renderStars(review.rating)}
                      <ReviewDate>
                        {new Date(review.date).toLocaleDateString()} by {review.username}
                      </ReviewDate>
                    </div>
                    <ReviewText>{review.comment}</ReviewText>
                  </ReviewContent>
                </ReviewHeader>
              </ReviewCard>
            ))
          )}
        </ReviewsList>
      </ReviewsSection>
    </DetailsContainer>
  );
}

export default ActivityDetails; 
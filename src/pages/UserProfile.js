import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaEdit, 
  FaHistory,
  FaPhone,
  FaUsers,
  FaTimes
} from 'react-icons/fa';
import { useBookings } from '../context/BookingsContext';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ProfileHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UserInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.white};
  font-size: 4rem;
`;

const UserName = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UserDetails = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const BookingHistory = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const BookingCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightText};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const BookingTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
`;

const BookingDate = styled.div`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 0.9rem;
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const BookingStatus = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme, status }) => 
    status === 'completed' ? theme.colors.success :
    status === 'upcoming' ? theme.colors.primary :
    theme.colors.warning
  };
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  display: inline-block;
`;

const CancelButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:hover {
    opacity: 0.9;
  }
`;

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { bookings, cancelBooking } = useBookings();
  const { user } = useAuth();

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <h1>My Profile</h1>

      <ProfileHeader>
        <UserInfo>
          <Avatar>
            <FaUser />
          </Avatar>
          <UserName>{user.username || user.name}</UserName>
          <UserDetails>
            <DetailItem>
              <FaUser />
              <span>{user.email}</span>
            </DetailItem>
            <DetailItem>
              <FaPhone />
              <span>{user.phone_number || user.phone}</span>
            </DetailItem>
            <DetailItem>
              <FaMapMarkerAlt />
              <span>{user.location || user.address}</span>
            </DetailItem>
          </UserDetails>
          <EditButton onClick={handleEdit}>
            <FaEdit />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </EditButton>
        </UserInfo>

        <BookingHistory>
          <h2>Booking History</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet. Discover and book activities to see them here!</p>
          ) : (
            bookings.map(booking => (
              <BookingCard key={booking.id}>
                <BookingHeader>
                  <BookingTitle>{booking.activity}</BookingTitle>
                  <BookingStatus status={booking.status}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </BookingStatus>
                </BookingHeader>
                <BookingDate>
                  <FaCalendarAlt /> {booking.date} at {booking.time}
                </BookingDate>
                <BookingDetails>
                  <DetailItem>
                    <FaMapMarkerAlt />
                    <span>{booking.location}</span>
                  </DetailItem>
                  <DetailItem>
                    <FaUsers />
                    <span>{booking.participants} participants</span>
                  </DetailItem>
                  <DetailItem>
                    <FaClock />
                    <span>₹{booking.price}</span>
                  </DetailItem>
                </BookingDetails>
                {booking.status === 'upcoming' && (
                  <CancelButton onClick={() => handleCancelBooking(booking.id)}>
                    <FaTimes /> Cancel Booking
                  </CancelButton>
                )}
              </BookingCard>
            ))
          )}
        </BookingHistory>
      </ProfileHeader>
    </ProfileContainer>
  );
}

export default UserProfile; 
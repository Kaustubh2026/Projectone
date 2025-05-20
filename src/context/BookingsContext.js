import React, { createContext, useState, useContext } from 'react';

const BookingsContext = createContext();

export const useBookings = () => useContext(BookingsContext);

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings(prevBookings => [...prevBookings, booking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}; 
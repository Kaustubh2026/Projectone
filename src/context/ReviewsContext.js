import React, { createContext, useState, useContext } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews(prevReviews => [...prevReviews, review]);
  };

  const getActivityReviews = (activityId) => {
    return reviews.filter(review => review.activityId === activityId);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getActivityReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
}; 
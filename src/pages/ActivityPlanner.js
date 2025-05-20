/**
 * ActivityPlanner.js
 * 
 * This component implements the AI-powered activity recommendation system for NatureKids.
 * It allows parents to get personalized activity suggestions based on their child's age,
 * interests, and preferred location (indoor/outdoor).
 * 
 * Key Features:
 * - Age-based filtering (3-12 years)
 * - Location preference selection
 * - Interest-based recommendations
 * - AI-powered suggestions using Groq API
 * - Responsive UI with loading states
 * 
 * Dependencies:
 * - React Hooks (useState)
 * - Styled Components
 * - React Icons
 * - Groq API Integration
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getActivityRecommendations } from '../services/llmService';
import { FaChild, FaTree, FaStar, FaMagic } from 'react-icons/fa';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PlannerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  animation: ${fadeIn} 1s ease-out;
`;

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease-out;
  border: 3px solid #4CAF50;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #45a049;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  font-size: 16px;
  background-color: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #45a049;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  }
`;

const Button = styled.button`
  background: #4CAF50;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const RecommendationsContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out;
  border: 3px solid #4CAF50;
`;

const ActivityCard = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  border-left: 5px solid #4CAF50;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: translateX(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActivityDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Loading = styled.div`
  text-align: center;
  padding: 30px;
  color: #2c3e50;
  font-size: 1.2rem;
  animation: ${bounce} 1s infinite;
`;

const Error = styled.div`
  color: #ff6b6b;
  padding: 20px;
  text-align: center;
  background: #fff5f5;
  border-radius: 10px;
  border: 2px solid #ff6b6b;
  font-size: 1.1rem;
`;

const IconWrapper = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
  color: #4CAF50;
`;

const ActivityPlanner = () => {
  const [childAge, setChildAge] = useState('');
  const [location, setLocation] = useState('indoor');
  const [interest, setInterest] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await getActivityRecommendations(childAge, location, interest);
      setRecommendations(response);
    } catch (err) {
      setError('Failed to get activity recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlannerContainer>
      <Title>🌱 Nature Kids Activity Planner 🌱</Title>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
            <FormGroup>
            <Label>
              <IconWrapper><FaChild /></IconWrapper>
              Child's Age
            </Label>
              <Input
                type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              min="3"
              max="12"
                required
              placeholder="Enter age (3-12)"
              />
            </FormGroup>

            <FormGroup>
            <Label>
              <IconWrapper><FaTree /></IconWrapper>
              Preferred Location
            </Label>
              <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="indoor">🏠 Indoor</option>
              <option value="outdoor">🌳 Outdoor</option>
              </Select>
            </FormGroup>

            <FormGroup>
            <Label>
              <IconWrapper><FaStar /></IconWrapper>
              Interest
            </Label>
              <Input
                type="text"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="Enter any interest (e.g., dinosaurs, space, gardening)"
              required
              />
            </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <FaMagic /> Getting Recommendations...
              </>
            ) : (
              <>
                <FaMagic /> Get Recommendations
              </>
            )}
          </Button>
        </form>
      </FormContainer>

      {loading && (
        <Loading>
          <FaMagic /> Finding the perfect activities for you...
        </Loading>
      )}
      
      {error && <Error>{error}</Error>}
      
      {recommendations && (
        <RecommendationsContainer>
          <h2>🌟 Recommended Activities 🌟</h2>
          {recommendations.split('\n').map((activity, index) => {
            if (!activity.trim()) return null;
            const [title, ...descriptionParts] = activity.split(':');
            const description = descriptionParts.join(':').trim();
            return (
              <ActivityCard key={index}>
                <ActivityTitle>
                  {index === 0 ? '🌱' : index === 1 ? '🌿' : '🌳'} {title.trim()}
                </ActivityTitle>
                <ActivityDescription>{description}</ActivityDescription>
            </ActivityCard>
            );
          })}
        </RecommendationsContainer>
      )}
    </PlannerContainer>
  );
};

export default ActivityPlanner; 
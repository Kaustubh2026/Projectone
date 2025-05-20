import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const GameArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 800px;
`;

const AnimalCard = styled.div`
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  cursor: grab;
  user-select: none;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.medium};

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
  }

  &.matched {
    background-color: #4CAF50;
    color: white;
    cursor: default;
  }
`;

const HabitatCard = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${props => props.matched ? '#4CAF50' : '#f5f5f5'};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;

  &.shake {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;

const HabitatTitle = styled.span`
  font-size: 1rem;
  color: ${props => props.matched ? 'white' : 'black'};
`;

const FeedbackMessage = styled.div`
  font-size: 1.5rem;
  color: ${props => props.correct ? '#4CAF50' : '#f44336'};
  margin: 10px 0;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const animals = [
  { id: 1, emoji: '🐻', habitat: 'cave', name: 'Bear Cub' },
  { id: 2, emoji: '🦢', habitat: 'pond', name: 'Baby Swan' },
  { id: 3, emoji: '🦊', habitat: 'den', name: 'Fox Kit' }
];

const habitats = [
  { id: 'cave', emoji: '🕳️', name: 'Cave' },
  { id: 'pond', emoji: '💧', name: 'Pond' },
  { id: 'den', emoji: '🏠', name: 'Den' }
];

const AnimalMatchGame = ({ onComplete }) => {
  const [matchedPairs, setMatchedPairs] = useState({});
  const [draggedAnimal, setDraggedAnimal] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [shakingHabitat, setShakingHabitat] = useState(null);

  const handleDragStart = (e, animal) => {
    if (!matchedPairs[animal.id]) {
      setDraggedAnimal(animal);
      e.dataTransfer.setData('text/plain', animal.id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, habitat) => {
    e.preventDefault();
    if (draggedAnimal && !matchedPairs[draggedAnimal.id]) {
      if (draggedAnimal.habitat === habitat.id) {
        setMatchedPairs(prev => ({
          ...prev,
          [draggedAnimal.id]: habitat.id
        }));
        setFeedback({ message: 'Correct! 🎉', correct: true });
        
        if (Object.keys(matchedPairs).length === 2) {
          setTimeout(onComplete, 1000);
        }
      } else {
        setShakingHabitat(habitat.id);
        setFeedback({ message: 'Try again! 💭', correct: false });
        setTimeout(() => setShakingHabitat(null), 500);
      }
    }
  };

  return (
    <GameContainer>
      <h2>Help the animals find their homes!</h2>
      {feedback && (
        <FeedbackMessage correct={feedback.correct}>
          {feedback.message}
        </FeedbackMessage>
      )}
      <GameArea>
        <div>
          <h3>Animals</h3>
          {animals.map(animal => (
            <AnimalCard
              key={animal.id}
              draggable={!matchedPairs[animal.id]}
              onDragStart={(e) => handleDragStart(e, animal)}
              className={matchedPairs[animal.id] ? 'matched' : ''}
            >
              {animal.emoji}
            </AnimalCard>
          ))}
        </div>
        <div>
          <h3>Habitats</h3>
          {habitats.map(habitat => (
            <HabitatCard
              key={habitat.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, habitat)}
              className={shakingHabitat === habitat.id ? 'shake' : ''}
              matched={Object.values(matchedPairs).includes(habitat.id)}
            >
              {habitat.emoji}
              <HabitatTitle matched={Object.values(matchedPairs).includes(habitat.id)}>
                {habitat.name}
              </HabitatTitle>
            </HabitatCard>
          ))}
        </div>
      </GameArea>
    </GameContainer>
  );
};

export default AnimalMatchGame; 
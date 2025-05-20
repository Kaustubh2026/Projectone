import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaRecycle } from 'react-icons/fa';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const GameArea = styled.div`
  width: 600px;
  height: 400px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const TrashItem = styled.div`
  position: absolute;
  font-size: 2rem;
  cursor: grab;
  user-select: none;
  transition: transform 0.2s ease;

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
  }
`;

const BinContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Bin = styled.div`
  width: 100px;
  height: 120px;
  background-color: ${props => props.type === 'recycle' ? '#4CAF50' : '#f44336'};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  font-size: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const trashItems = [
  { id: 1, emoji: '🍌', type: 'trash' },
  { id: 2, emoji: '🧴', type: 'recycle' },
  { id: 3, emoji: '🍬', type: 'trash' },
  { id: 4, emoji: '📰', type: 'recycle' },
  { id: 5, emoji: '🥤', type: 'recycle' },
  { id: 6, emoji: '🍎', type: 'trash' }
];

const CleanupGame = ({ onComplete }) => {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    // Randomly position items
    const positionedItems = trashItems.map(item => ({
      ...item,
      x: Math.random() * 500,
      y: Math.random() * 300
    }));
    setItems(positionedItems);
  }, []);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, binType) => {
    e.preventDefault();
    if (draggedItem && draggedItem.type === binType) {
      setItems(prev => prev.filter(item => item.id !== draggedItem.id));
      setScore(prev => prev + 10);
      
      if (items.length === 1) {
        setTimeout(onComplete, 500);
      }
    }
  };

  return (
    <GameContainer>
      <ScoreDisplay>Score: {score}</ScoreDisplay>
      <GameArea>
        {items.map(item => (
          <TrashItem
            key={item.id}
            style={{ left: item.x, top: item.y }}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item.emoji}
          </TrashItem>
        ))}
      </GameArea>
      <BinContainer>
        <Bin
          type="recycle"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'recycle')}
        >
          <FaRecycle />
          <span>Recycle</span>
        </Bin>
        <Bin
          type="trash"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'trash')}
        >
          <FaTrash />
          <span>Trash</span>
        </Bin>
      </BinContainer>
    </GameContainer>
  );
};

export default CleanupGame; 
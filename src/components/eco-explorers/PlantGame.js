import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTint, FaSun, FaLeaf, FaInfoCircle } from 'react-icons/fa';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PlantArea = styled.div`
  width: 300px;
  height: 400px;
  background: linear-gradient(to bottom, #8B4513 0%, #654321 100%);
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
`;

const Plant = styled.div`
  font-size: ${props => props.stage * 1.5}rem;
  transition: all 1s ease;
  transform: translateY(${props => -props.stage * 15}px);
  position: relative;
  z-index: 2;
`;

const Soil = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #5C4033;
  border-radius: 0 0 20px 20px;
`;

const WaterLevel = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.level}%;
  background: rgba(0, 123, 255, 0.3);
  transition: height 0.5s ease;
`;

const Controls = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoPanel = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const StageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background: #4CAF50;
  transition: width 0.5s ease;
`;

const WaterDrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  animation: fall 1s ease-in forwards;
  opacity: 0;

  @keyframes fall {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
  }
`;

const PlantGame = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [watering, setWatering] = useState(false);
  const [waterDrops, setWaterDrops] = useState([]);
  const [waterLevel, setWaterLevel] = useState(0);
  const [sunlight, setSunlight] = useState(0);
  const [lastWatered, setLastWatered] = useState(null);
  const [lastSunlight, setLastSunlight] = useState(null);

  const plantStages = [
    { emoji: '🌱', name: 'Seed', description: 'A tiny seed waiting to sprout' },
    { emoji: '🌱', name: 'Sprout', description: 'The seed has sprouted and is growing its first leaves' },
    { emoji: '🌿', name: 'Seedling', description: 'The plant is growing its first true leaves' },
    { emoji: '🌿', name: 'Young Plant', description: 'The plant is growing taller and developing more leaves' },
    { emoji: '🌳', name: 'Mature Plant', description: 'The plant has grown into a beautiful mature specimen' }
  ];

  const stageInfo = [
    'Your seed needs water and sunlight to grow!',
    'The sprout is delicate - be careful not to overwater!',
    'Your seedling is growing strong - keep up the good care!',
    'Your plant is thriving - it needs regular care to stay healthy',
    'Congratulations! Your plant has reached maturity!'
  ];

  useEffect(() => {
    // Simulate water level decrease over time
    const waterInterval = setInterval(() => {
      if (waterLevel > 0) {
        setWaterLevel(prev => Math.max(0, prev - 0.5));
      }
    }, 5000);

    // Simulate sunlight decrease over time
    const sunlightInterval = setInterval(() => {
      if (sunlight > 0) {
        setSunlight(prev => Math.max(0, prev - 0.5));
      }
    }, 5000);

    return () => {
      clearInterval(waterInterval);
      clearInterval(sunlightInterval);
    };
  }, [waterLevel, sunlight]);

  const handleWater = () => {
    if (stage < plantStages.length - 1) {
      setWatering(true);
      setWaterDrops(prev => [...prev, Date.now()]);
      setWaterLevel(prev => Math.min(100, prev + 20));
      setLastWatered(new Date());
      
      setTimeout(() => {
        setWatering(false);
      }, 1000);
    }
  };

  const handleSunlight = () => {
    if (stage < plantStages.length - 1) {
      setSunlight(prev => Math.min(100, prev + 20));
      setLastSunlight(new Date());
    }
  };

  useEffect(() => {
    // Check if conditions are right for growth
    if (waterLevel >= 50 && sunlight >= 50 && stage < plantStages.length - 1) {
      const growthTimeout = setTimeout(() => {
        setStage(prev => prev + 1);
        setWaterLevel(0);
        setSunlight(0);
        
        if (stage === plantStages.length - 2) {
          setTimeout(onComplete, 1000);
        }
      }, 2000);
      
      return () => clearTimeout(growthTimeout);
    }
  }, [waterLevel, sunlight, stage]);

  return (
    <GameContainer>
      <PlantArea>
        <Soil />
        <WaterLevel level={waterLevel} />
        <Plant stage={stage}>{plantStages[stage].emoji}</Plant>
        {waterDrops.map(id => (
          <WaterDrop key={id}>💧</WaterDrop>
        ))}
      </PlantArea>

      <Controls>
        <Button 
          onClick={handleWater} 
          disabled={watering || stage >= plantStages.length - 1}
        >
          <FaTint /> Water Plant
        </Button>
        <Button 
          onClick={handleSunlight} 
          disabled={stage >= plantStages.length - 1}
        >
          <FaSun /> Give Sunlight
        </Button>
      </Controls>

      <InfoPanel>
        <StageInfo>
          <FaLeaf />
          <h3>{plantStages[stage].name}</h3>
        </StageInfo>
        <p>{plantStages[stage].description}</p>
        <p>{stageInfo[stage]}</p>
        
        <ProgressBar>
          <Progress value={waterLevel} />
        </ProgressBar>
        <p>Water Level: {Math.round(waterLevel)}%</p>
        
        <ProgressBar>
          <Progress value={sunlight} />
        </ProgressBar>
        <p>Sunlight Level: {Math.round(sunlight)}%</p>

        {lastWatered && (
          <p>Last watered: {lastWatered.toLocaleTimeString()}</p>
        )}
        {lastSunlight && (
          <p>Last sunlight: {lastSunlight.toLocaleTimeString()}</p>
        )}
      </InfoPanel>
    </GameContainer>
  );
};

export default PlantGame; 
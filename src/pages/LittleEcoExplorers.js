import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaLeaf, FaRecycle, FaHome } from 'react-icons/fa';
import PlantGame from '../components/eco-explorers/PlantGame';
import CleanupGame from '../components/eco-explorers/CleanupGame';
import AnimalMatchGame from '../components/eco-explorers/AnimalMatchGame';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const SceneSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const SceneCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const SceneTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin: 10px 0;
`;

const SceneEmoji = styled.div`
  font-size: 4rem;
  margin: 10px 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

const GameArea = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 20px;
  margin-top: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const scenes = [
  {
    id: 'forest',
    title: 'Forest Adventure',
    emoji: '🌲',
    description: 'Help the forest grow and protect its animals!',
    games: ['plant', 'cleanup', 'animals']
  },
  {
    id: 'beach',
    title: 'Beach Explorer',
    emoji: '🏖️',
    description: 'Keep the beach clean and help sea creatures!',
    games: ['plant', 'cleanup', 'animals']
  },
  {
    id: 'mountains',
    title: 'Mountain Quest',
    emoji: '🏔️',
    description: 'Explore the mountains and help mountain animals!',
    games: ['plant', 'cleanup', 'animals']
  }
];

const LittleEcoExplorers = () => {
  const [selectedScene, setSelectedScene] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('ecoExplorersProgress');
    return saved ? JSON.parse(saved) : {
      forest: { plant: false, cleanup: false, animals: false },
      beach: { plant: false, cleanup: false, animals: false },
      mountains: { plant: false, cleanup: false, animals: false }
    };
  });

  useEffect(() => {
    localStorage.setItem('ecoExplorersProgress', JSON.stringify(progress));
  }, [progress]);

  const handleSceneSelect = (scene) => {
    setSelectedScene(scene);
    setCurrentGame(null);
  };

  const handleGameComplete = (gameType) => {
    setProgress(prev => ({
      ...prev,
      [selectedScene.id]: {
        ...prev[selectedScene.id],
        [gameType]: true
      }
    }));
  };

  const calculateSceneProgress = (sceneId) => {
    const sceneProgress = progress[sceneId];
    const completedGames = Object.values(sceneProgress).filter(Boolean).length;
    return (completedGames / 3) * 100;
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'plant':
        return <PlantGame onComplete={() => handleGameComplete('plant')} />;
      case 'cleanup':
        return <CleanupGame onComplete={() => handleGameComplete('cleanup')} />;
      case 'animals':
        return <AnimalMatchGame onComplete={() => handleGameComplete('animals')} />;
      default:
        return null;
    }
  };

  if (!selectedScene) {
    return (
      <GameContainer>
        <Title>Little Eco Explorers</Title>
        <SceneSelector>
          {scenes.map(scene => (
            <SceneCard key={scene.id} onClick={() => handleSceneSelect(scene)}>
              <SceneEmoji>{scene.emoji}</SceneEmoji>
              <SceneTitle>{scene.title}</SceneTitle>
              <p>{scene.description}</p>
              <ProgressBar>
                <Progress progress={calculateSceneProgress(scene.id)} />
              </ProgressBar>
            </SceneCard>
          ))}
        </SceneSelector>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Title>Little Eco Explorers - {selectedScene.title}</Title>
      <BackButton onClick={() => setSelectedScene(null)}>
        ← Back to Scenes
      </BackButton>
      <ProgressBar>
        <Progress progress={calculateSceneProgress(selectedScene.id)} />
      </ProgressBar>
      {!currentGame ? (
        <SceneSelector>
          <SceneCard onClick={() => setCurrentGame('plant')}>
            <FaLeaf size={40} />
            <SceneTitle>Plant a Seed</SceneTitle>
            <p>Help plants grow in {selectedScene.title.toLowerCase()}</p>
          </SceneCard>
          <SceneCard onClick={() => setCurrentGame('cleanup')}>
            <FaRecycle size={40} />
            <SceneTitle>Clean Up</SceneTitle>
            <p>Keep the {selectedScene.title.toLowerCase()} clean</p>
          </SceneCard>
          <SceneCard onClick={() => setCurrentGame('animals')}>
            <FaHome size={40} />
            <SceneTitle>Help Animals</SceneTitle>
            <p>Find homes for animals in {selectedScene.title.toLowerCase()}</p>
          </SceneCard>
        </SceneSelector>
      ) : (
        <GameArea>
          {renderGame()}
        </GameArea>
      )}
    </GameContainer>
  );
};

export default LittleEcoExplorers; 
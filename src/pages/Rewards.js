import React from 'react';
import styled from 'styled-components';
import { FaTrophy, FaLeaf, FaTree, FaStar, FaSeedling } from 'react-icons/fa';

const RewardsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const BadgeCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 3rem;
    color: ${({ theme, earned }) => earned ? theme.colors.secondary : theme.colors.lightText};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const BadgeTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const BadgeDescription = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 0.9rem;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AchievementItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.5rem;
  }
`;

// Mock data for badges and achievements
const mockBadges = [
  {
    id: 1,
    title: 'Nature Explorer',
    description: 'Complete 5 outdoor activities',
    icon: FaLeaf,
    earned: true,
  },
  {
    id: 2,
    title: 'Tree Hugger',
    description: 'Plant and care for a tree',
    icon: FaTree,
    earned: false,
  },
  {
    id: 3,
    title: 'Star Gazer',
    description: 'Complete 3 night-time nature activities',
    icon: FaStar,
    earned: true,
  },
  {
    id: 4,
    title: 'Green Thumb',
    description: 'Grow a plant from seed',
    icon: FaSeedling,
    earned: false,
  },
];

const mockAchievements = [
  {
    id: 1,
    title: 'First Outdoor Adventure',
    description: 'Completed your first nature activity',
    date: '2024-03-15',
  },
  {
    id: 2,
    title: 'Weekend Explorer',
    description: 'Completed activities on 3 consecutive weekends',
    date: '2024-03-30',
  },
  {
    id: 3,
    title: 'Nature Collector',
    description: 'Collected 10 different types of leaves',
    date: '2024-04-05',
  },
];

function Rewards() {
  const totalPoints = 750;
  const maxPoints = 1000;
  const progress = (totalPoints / maxPoints) * 100;

  return (
    <RewardsContainer>
      <h1>Your Rewards</h1>

      <Section>
        <SectionTitle>Progress</SectionTitle>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <ProgressText>
          <span>{totalPoints} points</span>
          <span>{maxPoints} points</span>
        </ProgressText>
      </Section>

      <Section>
        <SectionTitle>Badges</SectionTitle>
        <BadgesGrid>
          {mockBadges.map(badge => (
            <BadgeCard key={badge.id} earned={badge.earned}>
              <badge.icon />
              <BadgeTitle>{badge.title}</BadgeTitle>
              <BadgeDescription>{badge.description}</BadgeDescription>
            </BadgeCard>
          ))}
        </BadgesGrid>
      </Section>

      <Section>
        <SectionTitle>Achievements</SectionTitle>
        <AchievementList>
          {mockAchievements.map(achievement => (
            <AchievementItem key={achievement.id}>
              <FaTrophy />
              <div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <small>{achievement.date}</small>
              </div>
            </AchievementItem>
          ))}
        </AchievementList>
      </Section>
    </RewardsContainer>
  );
}

export default Rewards; 
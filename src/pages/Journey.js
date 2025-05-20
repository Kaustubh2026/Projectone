import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTree, FaPaintBrush, FaFire, FaCamera, FaCheck, FaLeaf, FaSeedling, FaPalette, FaStar } from 'react-icons/fa';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50; }
  50% { box-shadow: 0 0 20px #4CAF50, 0 0 30px #4CAF50; }
  100% { box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const JourneyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  animation: ${fadeIn} 0.7s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const StreakDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
  color: #ff6b6b;
  margin-bottom: 20px;
  animation: ${glow} 2s infinite;
`;

const ActivitySelection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
  perspective: 1000px;
`;

const ActivityCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(.4,0,.2,1);
  transform-style: preserve-3d;
  position: relative;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  animation: ${fadeIn} 0.7s ease;
  &:hover {
    transform: translateY(-10px) scale(1.03) rotateX(5deg);
    box-shadow: 0 20px 40px rgba(0,0,0,0.18);
  }
  ${props => props.selected && `
    border: 4px solid #4CAF50;
    box-shadow: 0 0 20px #4CAF5033;
    animation: ${fadeIn} 0.7s ease;
  `}
`;

const ActivityIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: #4CAF50;
  animation: ${float} 3s infinite;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const TaskCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.completed && `
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
  `}
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const TaskIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.completed ? 'white' : '#4CAF50'};
`;

const TaskTitle = styled.h3`
  margin: 0;
  color: ${props => props.completed ? 'white' : '#333'};
`;

const TaskDescription = styled.p`
  margin: 10px 0;
  color: ${props => props.completed ? 'rgba(255, 255, 255, 0.9)' : '#666'};
`;

const CompleteButton = styled.button`
  background: ${props => props.completed ? 'white' : '#4CAF50'};
  color: ${props => props.completed ? '#4CAF50' : 'white'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 10px;
  top: 10px;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PhotoUpload = styled.div`
  margin-top: 30px;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 15px 30px;
  background: #4CAF50;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const PhotoItem = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    transition: all 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const Journey = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [streak, setStreak] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const savedActivity = localStorage.getItem('selectedActivity');
    const savedStreak = localStorage.getItem('streak');
    const savedTasks = localStorage.getItem('tasks');
    const savedPhotos = localStorage.getItem('uploadedPhotos');
    const savedLevel = localStorage.getItem('level');

    if (savedActivity) setSelectedActivity(savedActivity);
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedPhotos) setUploadedPhotos(JSON.parse(savedPhotos));
    if (savedLevel) setLevel(parseInt(savedLevel));
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedActivity', selectedActivity);
    localStorage.setItem('streak', streak);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('uploadedPhotos', JSON.stringify(uploadedPhotos));
    localStorage.setItem('level', level);
  }, [selectedActivity, streak, tasks, uploadedPhotos, level]);

  const activities = [
    {
      id: 'plant-tree',
      title: 'Plant a Tree',
      icon: <FaTree />,
      description: 'Grow your own tree and track its progress',
      tasks: [
        {
          id: 'daily-water',
          title: 'Daily Watering',
          description: 'Water your plant every day',
          frequency: 'daily',
          completed: false,
          icon: <FaSeedling />
        },
        {
          id: 'weekly-photo',
          title: 'Weekly Progress Photo',
          description: 'Take a photo of your plant to track its growth',
          frequency: 'weekly',
          completed: false,
          icon: <FaCamera />
        },
        {
          id: 'monthly-care',
          title: 'Monthly Care Check',
          description: 'Check soil quality and prune if needed',
          frequency: 'monthly',
          completed: false,
          icon: <FaLeaf />
        }
      ]
    },
    {
      id: 'natural-art',
      title: 'Create Natural Art',
      icon: <FaPaintBrush />,
      description: 'Create art using natural materials',
      tasks: [
        {
          id: 'weekly-project',
          title: 'Weekly Art Project',
          description: 'Complete a new nature-themed art project',
          frequency: 'weekly',
          completed: false,
          icon: <FaPalette />
        },
        {
          id: 'photo-document',
          title: 'Document Your Art',
          description: 'Take photos of your completed artwork',
          frequency: 'weekly',
          completed: false,
          icon: <FaCamera />
        },
        {
          id: 'share-art',
          title: 'Share Your Art',
          description: 'Share your artwork with the community',
          frequency: 'monthly',
          completed: false,
          icon: <FaPaintBrush />
        }
      ]
    }
  ];

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activityId);
    const activity = activities.find(a => a.id === activityId);
    setTasks(activity.tasks);
  };

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task && task.frequency === 'daily' && !task.completed) {
      setStreak(streak + 1);
      if (streak % 7 === 0) {
        setLevel(level + 1);
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotos([...uploadedPhotos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  return (
    <JourneyContainer>
      <Header>
        <h1>Your Nature Journey</h1>
        <StreakDisplay>
          <FaFire /> {streak} Day Streak
          <FaStar style={{ marginLeft: '20px' }} /> Level {level}
        </StreakDisplay>
      </Header>

      {!selectedActivity ? (
        <ActivitySelection>
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              onClick={() => handleActivitySelect(activity.id)}
              selected={selectedActivity === activity.id}
            >
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
            </ActivityCard>
          ))}
        </ActivitySelection>
      ) : (
        <>
          <TaskGrid>
            {tasks.map(task => (
              <TaskCard key={task.id} completed={task.completed}>
                <TaskHeader>
                  <TaskIcon completed={task.completed}>{task.icon}</TaskIcon>
                  <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
                </TaskHeader>
                <TaskDescription completed={task.completed}>
                  {task.description}
                </TaskDescription>
                <ProgressBar>
                  <ProgressFill progress={task.completed ? 100 : 0} />
                </ProgressBar>
                <CompleteButton
                  completed={task.completed}
                  onClick={() => handleTaskComplete(task.id)}
                >
                  <FaCheck />
                </CompleteButton>
              </TaskCard>
            ))}
          </TaskGrid>

          <PhotoUpload>
            <h3>Upload Progress Photos</h3>
            <UploadButton>
              Choose Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </UploadButton>
            {uploadedPhotos.length > 0 && (
              <PhotoGrid>
                {uploadedPhotos.map((photo, index) => (
                  <PhotoItem key={index}>
                    <img src={photo} alt={`Progress ${index + 1}`} />
                  </PhotoItem>
                ))}
              </PhotoGrid>
            )}
          </PhotoUpload>
        </>
      )}
    </JourneyContainer>
  );
};

export default Journey; 
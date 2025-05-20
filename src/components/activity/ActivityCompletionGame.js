import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheck, FaTimes, FaTrophy, FaArrowRight } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const GameTitle = styled.h2`
  color: #4CAF50;
  font-size: 28px;
  margin-bottom: 10px;
`;

const QuestionContainer = styled.div`
  margin-bottom: 30px;
`;

const QuestionText = styled.h3`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const OptionButton = styled.button`
  padding: 15px 20px;
  background: ${({ selected, correct }) => 
    selected ? (correct ? '#4CAF50' : '#ff4444') : '#f0f0f0'};
  color: ${({ selected }) => selected ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  animation: ${({ selected }) => selected ? bounce : 'none'} 0.5s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const DrawingContainer = styled.div`
  margin-bottom: 30px;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 300px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const DrawingTools = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const ColorButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => selected ? '#4CAF50' : '#ddd'};
  background: ${({ color }) => color};
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const EmojiButton = styled.button`
  font-size: 32px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  animation: ${({ selected }) => selected ? pulse : 'none'} 1s infinite;

  &:hover {
    transform: scale(1.2);
  }
`;

const BadgeContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  animation: ${pulse} 2s infinite;
`;

const BadgeIcon = styled.div`
  font-size: 64px;
  color: #FFD700;
  margin-bottom: 15px;
`;

const BadgeText = styled.h3`
  color: #4CAF50;
  font-size: 24px;
  margin-bottom: 10px;
`;

const TransitionMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  animation: ${pulse} 2s infinite;
`;

function ActivityCompletionGame({ activity, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const questions = [
    {
      type: 'multiple-choice',
      question: 'What did you learn about trees today?',
      options: [
        'Trees help clean the air',
        'Trees are homes for animals',
        'Trees give us shade',
        'All of the above'
      ],
      correctAnswer: 3
    },
    {
      type: 'drawing',
      question: 'Draw your favorite part of the activity!'
    },
    {
      type: 'emoji',
      question: 'How did you feel about the activity?'
    }
  ];

  useEffect(() => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = selectedColor;
    }
  }, [canvas, selectedColor]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowBadge(true);
        setShowTransition(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
      }
    }, 1000);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedEmoji(null);
      } else {
        setShowBadge(true);
        setShowTransition(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
      }
    }, 1000);
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (showTransition) {
      const timer = setTimeout(() => {
        setShowTransition(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTransition]);

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case 'multiple-choice':
        return (
          <>
            <QuestionText>{question.question}</QuestionText>
            <OptionsContainer>
              {question.options.map((option, index) => (
                <OptionButton
                  key={index}
                  onClick={() => handleAnswer(index)}
                  selected={selectedAnswer === index}
                  correct={index === question.correctAnswer}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </OptionButton>
              ))}
            </OptionsContainer>
          </>
        );

      case 'drawing':
        return (
          <>
            <QuestionText>{question.question}</QuestionText>
            <DrawingContainer>
              <Canvas
                ref={setCanvas}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
              />
              <DrawingTools>
                <ColorButton
                  color="#000000"
                  selected={selectedColor === '#000000'}
                  onClick={() => setSelectedColor('#000000')}
                />
                <ColorButton
                  color="#FF0000"
                  selected={selectedColor === '#FF0000'}
                  onClick={() => setSelectedColor('#FF0000')}
                />
                <ColorButton
                  color="#00FF00"
                  selected={selectedColor === '#00FF00'}
                  onClick={() => setSelectedColor('#00FF00')}
                />
                <ColorButton
                  color="#0000FF"
                  selected={selectedColor === '#0000FF'}
                  onClick={() => setSelectedColor('#0000FF')}
                />
                <button onClick={clearCanvas}>Clear</button>
              </DrawingTools>
            </DrawingContainer>
          </>
        );

      case 'emoji':
        return (
          <>
            <QuestionText>{question.question}</QuestionText>
            <EmojiContainer>
              <EmojiButton
                onClick={() => handleEmojiSelect('😊')}
                selected={selectedEmoji === '😊'}
              >
                😊
              </EmojiButton>
              <EmojiButton
                onClick={() => handleEmojiSelect('😄')}
                selected={selectedEmoji === '😄'}
              >
                😄
              </EmojiButton>
              <EmojiButton
                onClick={() => handleEmojiSelect('🤩')}
                selected={selectedEmoji === '🤩'}
              >
                🤩
              </EmojiButton>
              <EmojiButton
                onClick={() => handleEmojiSelect('😍')}
                selected={selectedEmoji === '😍'}
              >
                😍
              </EmojiButton>
            </EmojiContainer>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <GameContainer>
      <GameHeader>
        <GameTitle>Activity Completion Game</GameTitle>
      </GameHeader>

      {!showBadge ? (
        renderQuestion()
      ) : (
        <>
          <BadgeContainer>
            <BadgeIcon>
              <FaTrophy />
            </BadgeIcon>
            <BadgeText>Congratulations!</BadgeText>
            <p>You've completed the activity and earned a badge!</p>
          </BadgeContainer>
          {showTransition && (
            <TransitionMessage>
              <span>Redirecting to profile page...</span>
              <FaArrowRight />
            </TransitionMessage>
          )}
        </>
      )}
    </GameContainer>
  );
}

export default ActivityCompletionGame; 
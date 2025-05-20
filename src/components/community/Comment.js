/**
 * Comment.js
 * 
 * Reusable comment component for the NatureKids community feature.
 * Handles individual comment display, interactions, and nested replies.
 * 
 * Key Features:
 * - Comment display with user avatar and timestamp
 * - Like/unlike functionality
 * - Reply system with nested comments
 * - Authentication-aware interactions
 * - Responsive design
 * 
 * Dependencies:
 * - React Hooks (useState)
 * - Styled Components
 * - React Icons
 * - React Router
 * - Auth Context
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaReply } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CommentContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: bold;
  color: #333;
`;

const CommentTime = styled.span`
  color: #666;
  font-size: 0.9em;
`;

const CommentContent = styled.p`
  color: #333;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }

  &.liked {
    color: #ff4444;
  }
`;

const ReplyForm = styled.form`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const ReplyInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const ReplyButton = styled.button`
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }
`;

function Comment({ comment, onLike, onReply }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    if (!user) {
      alert('Please log in to like comments');
      navigate('/login');
      return;
    }
    setIsLiked(!isLiked);
    onLike(comment.id);
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to reply to comments');
      navigate('/login');
      return;
    }
    if (replyText.trim()) {
      onReply(comment.id, {
        content: replyText,
        user: {
          name: user.username,
          avatar: user.avatar || null
        },
        time: new Date().toISOString()
      });
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <UserAvatar src={comment.user.avatar || 'https://via.placeholder.com/40'} alt={comment.user.name} />
        <div>
          <UserName>{comment.user.name}</UserName>
          <CommentTime>{comment.time}</CommentTime>
        </div>
      </CommentHeader>
      <CommentContent>{comment.content}</CommentContent>
      <CommentActions>
        <ActionButton
          onClick={handleLike}
          className={isLiked ? 'liked' : ''}
        >
          <FaHeart />
          {comment.likes}
        </ActionButton>
        <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
          <FaReply />
          Reply
        </ActionButton>
      </CommentActions>
      {showReplyForm && (
        <ReplyForm onSubmit={handleReply}>
          <ReplyInput
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <ReplyButton type="submit">Reply</ReplyButton>
        </ReplyForm>
      )}
    </CommentContainer>
  );
}

export default Comment; 
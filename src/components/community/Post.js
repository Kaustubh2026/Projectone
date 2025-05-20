/**
 * Post.js
 * 
 * Community post component for NatureKids that displays user posts
 * and handles post interactions including likes, comments, and sharing.
 * 
 * Key Features:
 * - Post display with author information
 * - Like/unlike functionality
 * - Comment system integration
 * - Image support
 * - Share functionality
 * - Responsive design
 * 
 * Dependencies:
 * - React Hooks (useState)
 * - Styled Components
 * - React Icons
 * - Comment Component
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import Comment from './Comment';

const PostContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const Timestamp = styled.span`
  color: #666;
  font-size: 14px;
`;

const PostContent = styled.div`
  margin-bottom: 15px;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    color: #333;
  }
`;

const CommentsSection = styled.div`
  margin-top: 15px;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const CommentInput = styled.input`
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

const CommentButton = styled.button`
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

const Post = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <PostContainer>
      <PostHeader>
        <AuthorAvatar src={post.authorAvatar || 'https://via.placeholder.com/40'} alt={post.author} />
        <AuthorInfo>
          <AuthorName>{post.author}</AuthorName>
          <Timestamp>{post.timestamp}</Timestamp>
        </AuthorInfo>
      </PostHeader>

      <PostContent>
        <p>{post.content}</p>
        {post.image && <PostImage src={post.image} alt="Post content" />}
      </PostContent>

      <PostActions>
        <ActionButton onClick={() => onLike(post.id)}>
          <FaHeart /> {post.likes}
        </ActionButton>
        <ActionButton onClick={() => setShowComments(!showComments)}>
          <FaComment /> {post.comments.length}
        </ActionButton>
        <ActionButton>
          <FaShare /> Share
        </ActionButton>
      </PostActions>

      {showComments && (
        <CommentsSection>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <CommentButton type="submit">Post</CommentButton>
          </CommentForm>
          {post.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onLike={() => onComment(post.id, comment.id)}
              onReply={(replyText) => onComment(post.id, replyText)}
            />
          ))}
        </CommentsSection>
      )}
    </PostContainer>
  );
};

export default Post; 
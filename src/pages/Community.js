/**
 * Community.js
 * 
 * Main community page for NatureKids that enables users to interact,
 * share experiences, and engage with other parents and children.
 * 
 * Key Features:
 * - Post creation and display
 * - Comment system
 * - Like/unlike functionality
 * - User interactions
 * - Real-time updates
 * - Responsive feed layout
 * 
 * Dependencies:
 * - React Hooks (useState, useEffect)
 * - Styled Components
 * - React Icons
 * - Auth Context
 * - Post Component
 * - Comment Component
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import CreatePost from '../components/community/CreatePost';
import Post from '../components/community/Post';
import Comment from '../components/community/Comment';
import { useAuth } from '../context/AuthContext';

const CommunityContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const CommunityHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h1 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 24px;
  }
  
  p {
    color: #7f8c8d;
    font-size: 14px;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 15px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  
  h3 {
    margin: 0;
    font-size: 16px;
    color: #2c3e50;
  }
  
  span {
    font-size: 12px;
    color: #7f8c8d;
  }
`;

const PostContent = styled.div`
  margin-bottom: 15px;
  
  p {
    margin: 0 0 10px 0;
    color: #2c3e50;
    line-height: 1.5;
  }
  
  img {
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f2f5;
    color: #2c3e50;
  }
  
  &.liked {
    color: #e74c3c;
  }
`;

const CommentsSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  
  input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    
    &:focus {
      border-color: #3498db;
    }
  }
  
  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #2980b9;
    }
  }
`;

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'Just had an amazing time exploring the forest with my kids! 🌳',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      likes: 12,
      comments: [
        {
          id: 1,
          user: {
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
          },
          content: 'That sounds wonderful! Where did you go?',
          time: '1 hour ago',
          likes: 2
        }
      ],
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      content: 'Beach cleanup day with the kids! Teaching them about environmental responsibility while having fun. 🌊 #SaveOurPlanet',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      likes: 45,
      comments: [],
      timestamp: '3 hours ago'
    },
    {
      id: 3,
      author: 'Mike Brown',
      content: 'Our backyard garden is blooming! The kids are so excited to see their vegetables growing. 🥕🌱 Started with tomatoes and carrots, any suggestions for what to plant next?',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800',
      likes: 28,
      comments: [
        {
          id: 3,
          user: {
            name: 'Emily Green',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
          },
          content: 'Try strawberries! Kids love picking them fresh.',
          time: '30 minutes ago',
          likes: 5
        }
      ],
      timestamp: '5 hours ago'
    },
    {
      id: 4,
      author: 'Lisa Chen',
      content: 'First time camping with the little ones! They loved stargazing and making smores. 🏕️✨ Nature is the best classroom!',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
      likes: 67,
      comments: [],
      timestamp: '1 day ago'
    },
    {
      id: 5,
      author: 'David Thompson',
      content: "Bird watching success! Spotted 5 different species with the kids today. They're becoming little naturalists! 🦅🔭",
      image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800',
      likes: 34,
      comments: [
        {
          id: 4,
          user: {
            name: 'Maria Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
          },
          content: "What species did you see? We'd love to try this!",
          time: '2 hours ago',
          likes: 3
        }
      ],
      timestamp: '1 day ago'
    },
    {
      id: 6,
      author: 'Emma Parker',
      content: 'Made nature art with leaves and flowers we collected on our morning walk. 🎨🍁 Amazing how creative kids can be with natural materials!',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
      likes: 52,
      comments: [],
      timestamp: '2 days ago'
    }
  ]);

  const { user } = useAuth();

  const handleCreatePost = (newPost) => {
    const post = {
      id: Date.now(),
      author: user ? user.username : 'Anonymous',
      content: newPost.content,
      image: newPost.image,
      likes: 0,
      comments: [],
      timestamp: 'Just now'
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          user: {
            name: user ? user.username : 'Anonymous',
            avatar: user && user.avatar ? user.avatar : 'https://example.com/current-user.jpg'
          },
          content: commentText,
          time: 'Just now',
          likes: 0
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const handleCommentLike = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => 
            comment.id === commentId 
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          )
        };
      }
      return post;
    }));
  };

  return (
    <CommunityContainer>
      <CommunityHeader>
        <h1>Nature Kids Community</h1>
        <p>Share your experiences and connect with other nature-loving families</p>
      </CommunityHeader>

      <CreatePost onSubmit={handleCreatePost} />
      
      <FeedContainer>
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              <img src={post.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt={post.author} />
              <UserInfo>
                <h3>{post.author}</h3>
                <span>{post.timestamp}</span>
              </UserInfo>
              <FaEllipsisH style={{ color: '#7f8c8d', cursor: 'pointer' }} />
            </PostHeader>
            
            <PostContent>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post content" />}
            </PostContent>
            
            <PostActions>
              <ActionButton 
                onClick={() => handleLike(post.id)}
                className={post.liked ? 'liked' : ''}
              >
                <FaHeart /> {post.likes}
              </ActionButton>
              <ActionButton>
                <FaComment /> {post.comments.length}
              </ActionButton>
              <ActionButton>
                <FaShare />
              </ActionButton>
            </PostActions>
            
            <CommentsSection>
              {post.comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))}
              <CommentInput>
                <input 
                  type="text" 
                  placeholder="Write a comment..." 
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button onClick={(e) => {
                  const input = e.target.previousSibling;
                  if (input.value.trim()) {
                    handleComment(post.id, input.value);
                    input.value = '';
                  }
                }}>
                  Post
                </button>
              </CommentInput>
            </CommentsSection>
          </PostCard>
        ))}
      </FeedContainer>
    </CommunityContainer>
  );
};

export default Community; 
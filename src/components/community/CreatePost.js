import React, { useState } from 'react';
import styled from 'styled-components';
import { FaImage, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePostContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-size: 16px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImage = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e0e0e0;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
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

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

function CreatePost({ onSubmit }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to create a post');
      navigate('/login');
      return;
    }
    
    if (content.trim() || image) {
      onSubmit({
        content,
        image,
        author: user.username,
        authorAvatar: user.avatar || null
      });
      setContent('');
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <CreatePostContainer>
      <PostForm onSubmit={handleSubmit}>
        <TextArea
          placeholder="Share your nature experience..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImageUpload>
          <UploadButton>
            <FaImage />
            Add Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </UploadButton>
          {imagePreview && (
            <ImagePreview>
              <PreviewImage src={imagePreview} alt="Preview" />
              <RemoveImage onClick={handleRemoveImage}>
                <FaTimes />
              </RemoveImage>
            </ImagePreview>
          )}
        </ImageUpload>
        <SubmitButton type="submit" disabled={!content.trim() && !image}>
          Post
        </SubmitButton>
      </PostForm>
    </CreatePostContainer>
  );
}

export default CreatePost; 
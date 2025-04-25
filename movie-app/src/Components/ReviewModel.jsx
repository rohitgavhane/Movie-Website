import React, { useState } from 'react';
import styled from 'styled-components';

function ReviewModal({ isOpen, onClose, movieId, onReviewAdded }) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // 0 means no rating selected
  const [hover, setHover] = useState(0); // For hover effect

  const handleSubmit = async () => {
    if (!review.trim()) return;

    try {
      await fetch('https://moviewebsite2.onrender.com/reviews/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, text: review, rating }), // Include rating in the request
      });

      setReview('');
      setRating(0);
      onClose();
      if (onReviewAdded) onReviewAdded(); // Refresh reviews
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={onClose}>❌</CloseIcon>
        <h2>Add Your Review</h2>
        
        {/* Star Rating Component */}
        <StarRating>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <StarButton
                key={index}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}
              >
                {index <= (hover || rating) ? '★' : '☆'}
              </StarButton>
            );
          })}
          <RatingText>{rating > 0 ? `You rated: ${rating} star${rating !== 1 ? 's' : ''}` : 'Rate this movie'}</RatingText>
        </StarRating>
        
        <TextArea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your thoughts here..."
        />
        <Button onClick={handleSubmit}>Submit Review</Button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ReviewModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #0d0d0d;
  padding: 30px;
  border-radius: 12px;
  position: relative;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 15px rgba(31, 128, 224, 0.3);
  color: white;
  font-family: 'Segoe UI', sans-serif;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 22px;
  cursor: pointer;
  color: #ccc;

  &:hover {
    color: #f00;
    transform: scale(1.1);
  }
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

const StarButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 30px;
  color: ${props => props.theme === 'filled' ? '#ffc107' : '#ccc'};
  transition: color 0.2s;
  padding: 0 5px;

  &:hover {
    color: #ffc107;
  }
`;

const RatingText = styled.span`
  margin-left: 15px;
  font-size: 16px;
  color: #aaa;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  margin-top: 15px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  resize: none;
  background-color: #1a1a1a;
  color: #fff;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #1f80e0;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0d4d8b;
  }
`;
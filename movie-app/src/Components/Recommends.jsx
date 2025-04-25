import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ReviewModal from '../Components/ReviewModel'; // Import your modal

function Recommends() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://moviewebsite2.onrender.com/recommendation/getrecommendedMovies/')
      .then((res) => setMovies(res.data))
      .catch((error) => console.error('Error fetching recommended movies:', error));
  }, []);

  const fetchReviews = async (movieId) => {
    try {
      const res = await axios.get(`https://moviewebsite2.onrender.com/reviews/${movieId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const openReviewModal = (movieId) => {
    setSelectedMovieId(movieId);
    setShowReviewBox(true);
    fetchReviews(movieId);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`https://moviewebsite2.onrender.com/reviews/delete/${reviewId}`);
      fetchReviews(selectedMovieId); // Refresh reviews
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  return (
    <>
      <h3 style={{ paddingLeft: '120px', paddingRight: '120px', marginTop: '50px', textAlign: 'center' }}>
        Recommended Movies
      </h3>
      <Container>
        {movies.map((movie, index) => (
          <Wrap key={index}>
            <img src={movie.poster_url} alt={movie.title} />
            <Info className="info">
              <h3>{movie.title}</h3>
              <p>{movie.overview.slice(0, 100)}...</p>
              <button onClick={() => navigate(`/movie/${movie._id}`)}>Watch Now</button>
              <button onClick={() => openReviewModal(movie._id)}>Reviews</button>
            </Info>
          </Wrap>
        ))}
      </Container>

      {showReviewBox && (
        <ReviewBox>
          <CloseReview onClick={() => setShowReviewBox(false)}>❌ Close</CloseReview>
          <h2 style={{ marginBottom: '10px' }}>Reviews</h2>
          {reviews.length === 0 ? (
            <p style={{ color: '#aaa' }}>No reviews yet. Be the first!</p>
          ) : (
            reviews.map((r) => (
              <Review key={r._id}>
                <strong>{r.rating} ⭐</strong>
                <p>{r.text}</p>
                <DeleteButton onClick={() => handleDeleteReview(r._id)}>Delete</DeleteButton>
              </Review>
            ))
          )}

          <ReviewModal
            isOpen={true}
            onClose={() => setShowReviewBox(false)}
            movieId={selectedMovieId}
            onReviewAdded={() => fetchReviews(selectedMovieId)}
          />
        </ReviewBox>
      )}
    </>
  );
}

export default Recommends;

// --- Styled Components Below ---

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 120px 26px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Wrap = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: 0.3s;
  }

  .info {
    opacity: 0;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    width: 100%;
    padding: 20px;
    color: white;
    transition: opacity 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 2;

    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    p {
      font-size: 13px;
      margin-bottom: 10px;
    }

    button {
      margin-top: 5px;
      padding: 8px 12px;
      background: #1f80e0;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0f6bc7;
      }
    }
  }

  &:hover {
    transform: scale(1.1);
    z-index: 3;

    img {
      filter: blur(0.5px);
      opacity: 2;
    }

    .info {
      opacity: 1;
    }
  }
`;

const Info = styled.div``;

const ReviewBox = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background: #121212;
  padding: 25px;
  border-radius: 12px;
  color: white;
  z-index: 999;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
`;

const CloseReview = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 22px;
  color: #ccc;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const Review = styled.div`
  margin-top: 10px;
  background: #1f1f1f;
  padding: 12px;
  border-radius: 8px;

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #ddd;
  }
`;

const DeleteButton = styled.button`
  margin-top: 8px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background-color: #cc0000;
  }
`;

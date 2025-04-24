import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewBtn from '../Components/ReviewBtn';
import ReviewModal from '../Components/ReviewModel';




function ClickedMovie() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Fetch movie
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getmovie/${id}`);
        setMovie(res.data);
      } catch (err1) {
        try {
          const res = await axios.get(`http://localhost:3000/recommendation/getmovie/${id}`);
          setMovie(res.data);
        } catch (err2) {
          try {
            const res = await axios.get(`http://localhost:3000/thriller/getmoviethirller/${id}`);
            setMovie(res.data);
          } catch (err3) {
            console.error('Movie not found in any collection.');
          }
        }
      }
    };
  
    if (id) fetchMovie();
  }, [id]);
  

  // Fetch reviews
  const fetchReviews = () => {
    axios
      .get(`http://localhost:3000/reviews/get/${id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);


  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/reviews/delete/${reviewId}`);
      fetchReviews(); // Refresh reviews after deletion
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };
  

  return (
    <Container>
      {movie && movie.poster_url ? (
        <Content>
          <ImageWrapper>
            <img src={movie.poster_url} alt={movie.title} />
          </ImageWrapper>
          <MovieDetails>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Action | Sci-Fi | Romance</p>
            <button className="movie-button">Watch Now</button>

            <ReviewBtn onClick={() => setIsModalOpen(true)} />
            <ReviewModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              movieId={id}
              onReviewAdded={fetchReviews} // Refresh reviews after modal submit
            />

            <h4 style={{ marginTop: '30px' }}>User Reviews:</h4>
            <ReviewList>
              {reviews.length > 0 ? (
                reviews.map((r) => (
                  <ReviewItem key={r._id}>
                    <p>{r.text}</p>
                    <DeleteButton onClick={() => handleDeleteReview(r._id)}>
          🗑️ Delete
        </DeleteButton>
                  </ReviewItem>
                ))
              ) : (
                <p style={{ color: '#aaa' }}>No reviews yet.</p>
              )}
            </ReviewList>
          </MovieDetails>
        </Content>
      ) : (
        <LoadingMessage>Loading movie...</LoadingMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 50px 80px;
  background-color: #0d0d0d;
  color: white;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;

  img {
    width: 100%;
    max-width: 350px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const MovieDetails = styled.div`
  flex: 2;
  padding-top: 100px;
  padding-right: 300px;

  h3 {
    font-size: 48px;
    color: #1f80e0;
    margin-bottom: 15px;
    text-align: left;
    font-family: Roboto, sans-serif;
  }

  p {
    font-size: 16.5px;
    line-height: 1.6;
    color: #ccd5ae;
    text-align: justify;
    font-family: "Bungee Spice", sans-serif;
    padding-right: 120px;
  }
`;

const ReviewList = styled.div`
  margin-top: 20px;
  padding-right: 250px;
`;

const ReviewItem = styled.div`
  background-color: #1f1f1f;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  border-left: 4px solid #1f80e0;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
  color: #1f80e0;
  animation: fadeIn 1s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DeleteButton = styled.button`
  margin-top: 8px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;


export default ClickedMovie;
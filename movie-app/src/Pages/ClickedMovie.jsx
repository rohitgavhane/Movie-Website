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
        const res = await axios.get(`https://moviewebsite2.onrender.com/getmovie/${id}`);
        setMovie(res.data);
      } catch (err1) {
        try {
          const res = await axios.get(`https://moviewebsite2.onrender.com/recommendation/getmovie/${id}`);
          setMovie(res.data);
        } catch (err2) {
          try {
            const res = await axios.get(`https://moviewebsite2.onrender.com/thriller/getmoviethirller/${id}`);
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
      .get(`https://moviewebsite2.onrender.com/reviews/get/${id}`)
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
      await axios.delete(`https://moviewebsite2.onrender.com/reviews/delete/${reviewId}`);
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
            <Genre>Action | Sci-Fi | Romance</Genre>

            <ButtonGroup>
              <WatchButton>Watch Now</WatchButton>
              <ReviewBtn onClick={() => setIsModalOpen(true)} />
            </ButtonGroup>

            <ReviewModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              movieId={id}
              onReviewAdded={fetchReviews}
            />

            <h4 style={{ marginTop: '30px' }}>User Reviews:</h4>
            <ReviewList>
              {reviews.length > 0 ? (
                reviews.map((r) => (
                  <ReviewItem key={r._id}>
                    <p>{r.text}</p>
                    <DeleteButton onClick={() => handleDeleteReview(r._id)}>🗑️ Delete</DeleteButton>
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

// Styled Components (Responsive)

const Container = styled.div`
  padding: 40px 20px;
  background-color: #0d0d0d;
  color: white;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

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
  padding-top: 20px;
  padding-right: 30px;

  h3 {
    font-size: 40px;
    color: #AD49E1 ;
    
    margin-bottom: 20px;
    text-align: left;
    font-family: Roboto, sans-serif;
    font-weight: 650;
  }

  p {
    font-size: 17px;
    line-height: 1.6;
    color: #ccd5ae;
    text-align: justify;
    font-family: "Bungee Spice", sans-serif;
    margin-bottom: 20px;
  }

  @media (max-width: 900px) {
    padding-right: 0;
    text-align: center;

    h3 {
      font-size: 32px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const Genre = styled.p`
  font-size: 15px;
  color: #aaa;
  font-family: Roboto, sans-serif;
  margin-top: -10px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const WatchButton = styled.button`

    padding: 12px 65px;
    background: linear-gradient(135deg, #1f80e0, #764ba2);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #0f6bc7, #5e35b1);
    }
    
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  background-color: #1f1f1f;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #1f80e0;

  p {
    margin-bottom: 8px;
    word-break: break-word;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 22px;
  margin-top: 80px;
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

export default ClickedMovie;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // ✅ Step 1

function ClickedMovie() {
  const [movie, setMovie] = useState({});
  const { id } = useParams(); // ✅ Step 2

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getmovie/${id}`) // ✅ Step 3
      .then((res) => {
        setMovie(res.data);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
      });
  }, [id]);

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
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const MovieDetails = styled.div`
  flex: 2;
  padding-top: 280px;
  padding-right:300px;

  h3 {
    font-size: 48px;
    color: #1f80e0;
    margin-bottom: 15px;
    text-align: left;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    color: #ccd5ae;
    text-align: justify;
  }
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


export default ClickedMovie;

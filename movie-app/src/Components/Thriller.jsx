import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Thriller() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://moviewebsite2.onrender.com/recommendation/thrillerMovies')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <>
 <h3 style={{ padding: '20px', marginTop: '2px', textAlign: 'center', fontSize: '32px' }}>
  Thriller Movies
</h3>
      <Container>
        {movies.map((movie, index) => (
          <Wrap key={index}>
            <img src={movie.poster_url} alt={movie.title} />
            <Info>
              <h3>{movie.title}</h3>
              <p>{movie.overview?.slice(0, 100)}...</p>
              <button onClick={() => navigate(`/movie/${movie._id}`)}>Watch Now</button>
            </Info>
          </Wrap>
        ))}
      </Container>
    </>
  );
}

// Styled Components
const Container = styled.div`
  margin-top: 30px;
  padding: 2px 120px 180px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 30px 50px 100px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 15px;
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

  &:hover {
    transform: scale(1.05);
    z-index: 3;

    img {
      filter: blur(0.5px);
    }

    div {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }

    img {
      filter: none;
    }

    div {
      opacity: 1;
    }
  }
`;

const Info = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  width: 100%;
  height: 100%;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.3s ease;
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
    padding: 8px 14px;
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

export default Thriller;

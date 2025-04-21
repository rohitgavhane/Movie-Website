import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();


  // ✅ Define fetchMovies outside useEffect
  const fetchMovies = async (page) => {
    try {
      const res = await axios.get(`http://localhost:3000/getallMovies?page=${page}`);
      setMovies(res.data.movies);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log('Error in fetching movies:', err);
    }
  };

  // ✅ Initial & on page change
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);



  return (
    <>
      <h3 style={{ marginTop: '50px', textAlign: 'center' }}>Movies</h3>
      <Container>
        {movies.map((movie, index) => (
          <Wrap key={index}>
            <img src={movie.poster_url} alt={movie.title} />
            <Info className="info">
              <h3>{movie.title}</h3>
              <p>{movie.overview.slice(0, 100)}...</p>
              <button onClick={() => navigate(`/movie/${movie._id}`)}>Watch Now</button>
              </Info>
          </Wrap>
        ))}
      </Container>

      <Pagination>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </Pagination>
    </>
  );
}

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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;

  button {
    padding: 8px 16px;
    border: none;
    background: #1f80e0;
    color: white;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  }
`;

const Info = styled.div``;

export default Movies;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchMovies = async (page, search = '') => {
    try {
      const res = await axios.get(`https://moviewebsite2.onrender.com/getallMovies?page=${page}&search=${search}`);
      setMovies(res.data.movies);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log('Error in fetching movies:', err);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <h2 style={{ marginTop: '50px', textAlign: 'center' }}>Movies</h2>

      <SearchBarWrapper>
        <SearchInput
          type="text"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchBarWrapper>

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

      <Pagination>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </Pagination>
    </>
  );
}

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const SearchInput = styled.input`
  width: 40%;
  padding: 12px 20px;
  border-radius: 25px;
  border: 3px solid #2C2C2C;
  background-color: black;
  color: white;
  outline: none;
  font-size: 16px;
  transition: 0.3s all ease;

  &:focus {
    border-color: #0f6bc7;
    box-shadow: 0 0 8px rgba(31, 128, 224, 0.8);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 120px 180px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 30px 20px 100px;
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
    transition: 0.4s;
  }

  &:hover {
    transform: scale(1.08);
    z-index: 3;

    img {
      filter: brightness(0.7);
      transform: scale(1.05);
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
  transition: opacity 0.4s ease;
  z-index: 2;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 13px;
    margin-bottom: 15px;
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
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 60px;
  gap: 20px;

  button {
    padding: 10px 25px;
    border: none;
    background: linear-gradient(135deg, #aa60c8, #3a8dff);
    color: white;
    cursor: pointer;
    border-radius: 25px;
    font-weight: bold;
    font-size: 16px;
    transition: background 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #8a44b3, #2c74e8);
    }

    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 18px;
    font-weight: 500;
    color: #ddd;
  }
`;

export default Movies;

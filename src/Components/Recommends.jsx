import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recommends() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/recommendation/getrecommendedMovies')
    .then((res) => {
        setMovies(res.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const ClickHandler = () => {
    navigate('/profile'); // ✅ working redirect
  };

  return (
    <>
<h2 style={{ paddingLeft: "60px", paddingRight: "60px" , marginTop:'20px'}}>Recommended Movies</h2>
    <Container>
        
      {movies.map((movie, index) => (
        <Wrap key={index} onClick={ClickHandler}>

          <img src={movie.poster_url} alt={movie.title} />
          <Info>
            <h5>{movie.title}</h5>
            
          </Info>
        </Wrap>
      ))}
    </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 60px 26px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(5, 1fr); // ✅ 5 movies in a row
`;

const Wrap = styled.div`
  position: relative;
  padding-top: 150%;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.2);
  cursor: pointer;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 10px;
  color: white;
  text-align: center;

  h5 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }

  span {
    display: block;
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
  }
`;

export default Recommends;

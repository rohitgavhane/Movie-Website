// components/MovieSlider.jsx
import React from "react";
import Slider from "react-slick";
import '../css/MovieSlider.css';
import { Navigate } from "react-router-dom";
import Profile from "../Pages/Profile";

const MovieSlider = ({ movies }) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        arrows: true, // ✅ ensure this is true
      };
      function clickHandle(){
        Navigate(<Profile></Profile>)
      }
      

  return (
    <>
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="slide">
            <img
              src={movie.imageUrl}
              alt={movie.title}


              className="slider-image"
            />
            {/* Optional overlay */}
            <div className="overlay">
             <button className="movie-button" onClick={clickHandle}>{movie.title}</button>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    
    <div className="section">

    </div>
    </>
  );
};

export default MovieSlider;

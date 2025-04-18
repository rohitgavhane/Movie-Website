import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// pages/Home.jsx
import React, { useEffect, useState } from "react";
import MovieSlider from "../components/MovieSlider";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Dummy data for now, you can fetch from API later
    const demoMovies = [
      { title: "Watch Now",description: "Action, Sci-Fi, Fantasy", imageUrl: "/poster1.jpg" },
      { title: "Watch Now", description: "Action, Sci-Fi, Fantasy",imageUrl: "/poster2.jpg" },
      { title: "Watch Now",description: "Action, Sci-Fi, Fantasy", imageUrl: "/poster3.jpg" },
    ];
    setMovies(demoMovies);
  }, []);

  return (
    <div>
      <MovieSlider movies={movies} />
    </div>
  );
};


export default Home;

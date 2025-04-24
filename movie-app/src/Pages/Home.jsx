import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// pages/Home.jsx
import React, { useEffect, useState } from "react";
import MovieSlider from "../components/MovieSlider";
import Viewvers from "../Components/Viewvers";
import Recommends from "../Components/Recommends";
import Thriller from "../Components/Thriller";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Dummy data for now, you can fetch from API later
    const demoMovies = [
      { title: "Watch Now",description: "Action | Sci-Fi | Fantasy", imageUrl: "/images/P1.jpg" },
      { title: "Watch Now", description: "Action | Sci-Fi | Fantasy",imageUrl: "/images/p2.jpg" },
      { title: "Watch Now",description: "Action | Sci-Fi | Fantasy", imageUrl: "/images/p2.jpg" },

    ];
    setMovies(demoMovies);
  }, []);


  return (
    <>
    <div>
      <MovieSlider movies={movies} />
      <Viewvers></Viewvers>
      <Recommends></Recommends>
      <Thriller></Thriller>
    </div>

    


</>
  );
};


export default Home;

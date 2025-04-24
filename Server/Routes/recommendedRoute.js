const express = require("express");
const route3 = express.Router();
const RecommendedMovies = require("../Models/recommended");  // Make sure this is correct
const ThrillerMovies = require("../Models/thirller");  // Correct model name here

route3.get('/getrecommendedMovies', async (req, res) => {
  try {
    const allrecommendedMovies = await RecommendedMovies.find();
    res.status(200).json(allrecommendedMovies);
  } catch (error) {
    res.status(500).json({ message: "Failed to get recommended movies", error: error.message });
  }
});

route3.get('/thrillerMovies', async (req, res) => {
  try {
    const allthirllers = await ThrillerMovies.find();  // Correct model here
    res.status(200).json(allthirllers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get thriller movies", error: error.message });
  }
});


route3.get('/getmovie/:id', async (req, res) => {
  try {
    console.log("Fetching movie with ID:", req.params.id);
    const GetMovie = await RecommendedMovies.findById(req.params.id);

    if (!GetMovie) {
      console.log("Movie not found for ID:", req.params.id); // log this
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(GetMovie);
  } catch (error) {
    res.status(500).json({ message: "Failed to get movie", error: error.message });
  }
});


route3.get('/getmoviethirller/:id', async (req, res) => {
  try {
    console.log("Fetching movie with ID:", req.params.id);
    const GetMovie = await ThrillerMovies.findById(req.params.id);

    if (!GetMovie) {
      console.log("Movie not found for ID:", req.params.id); // log this
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(GetMovie);
  } catch (error) {
    res.status(500).json({ message: "Failed to get movie", error: error.message });
  }
});

module.exports = route3;

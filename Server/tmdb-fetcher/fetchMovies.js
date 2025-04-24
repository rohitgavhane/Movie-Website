const axios = require('axios');
const fs = require('fs');

const API_KEY = '6a8065978c69d8f228065a02001c70b1'; // your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
async function fetchMovies() {
  let movies = [];

  for (let page = 1; page <= 15; page++) {  // 15 pages = 300 movies
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        vote_count_gte: 100,
        page: page,
      },
    });

    const pageMovies = response.data.results.map(movie => ({
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      poster_url: movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : null,
    }));

    movies.push(...pageMovies);
  }

  fs.writeFileSync('tmdb_movies.json', JSON.stringify(movies, null, 2));
  console.log('✅ 300 Movie data saved to tmdb_movies.json');
}

fetchMovies();

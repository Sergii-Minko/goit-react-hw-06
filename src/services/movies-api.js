import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzI4ODk4NDU5ODZkNTZhOGY0ZTE1ZGQwZTYwZTMwMSIsInN1YiI6IjY2NDM4ZDA5OTMwM2M4NjE3YzVhMDlhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S_yU8WptuVtGNt0iM_bz9D0NDI-jg_ipo34WQOcnu8w ",
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}trending/movie/day?language=en-US`,
    options
  );
  return data.results;
};

export const fetchMoviesByQuery = async (filmName) => {
  const { data } = await axios.get(
    `${BASE_URL}search/movie?query=${filmName}&include_adult=false&language=en-US&page=1`,
    options
  );

  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(
    `${BASE_URL}movie/${movieId}?language=en-US`,
    options
  );

  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await axios.get(
    `${BASE_URL}movie/${movieId}/credits?language=en-US`,
    options
  );
  return data.cast;
};

export const fetchReviews = async (movieId) => {
  const { data } = await axios.get(
    `${BASE_URL}movie/${movieId}/reviews?language=en-US`,
    options
  );
  return data.results;
};

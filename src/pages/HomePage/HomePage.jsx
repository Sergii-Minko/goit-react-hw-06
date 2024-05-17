import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { AiFillWarning } from "react-icons/ai";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoader(true);
      try {
        const moviesData = await fetchTrendingMovies();
        setMovies(moviesData);
      } catch (error) {
        toast(`Error fetching movie data: ${error.message}`, {
          duration: 3000,
          icon: <AiFillWarning color="red" size={28} />,
        });
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, []);

  return (
    movies && (
      <>
        <Toaster position="top-right" />
        {loader && <Loader />}
        <h1>Trending today</h1>
        <MovieList movies={movies} />
      </>
    )
  );
};

export default HomePage;

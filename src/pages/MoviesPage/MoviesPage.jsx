import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputQuery, setInputQuery] = useState("");
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    setInputQuery(query);
    setLoader(true);

    fetchMoviesByQuery(query)
      .then((data) => {
        if (data.length === 0) {
          setShowNotFoundMessage(true);
        } else {
          setMovies(data);
        }
      })
      .catch((error) => {
        toast(`Error fetching movie data: ${error.message}`, {
          duration: 3000,
          icon: <AiFillWarning color="red" size={28} />,
        });
        setShowNotFoundMessage(true);
      })
      .finally(() => setLoader(false));
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.currentTarget.elements.search.value.trim().toLowerCase();
    setShowNotFoundMessage(value === "");
    setSearchParams({ query: value });
  };

  const handleInputChange = (e) => {
    setInputQuery(e.target.value);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="search"
            value={inputQuery}
            onChange={handleInputChange}
            placeholder="Enter a search query"
          />

          <button className={css.button} type="submit">
            Search
          </button>
        </form>
        {showNotFoundMessage && <p>We apologize, the movies were not found.</p>}
        {loader ? (
          <Loader />
        ) : (
          movies && movies.length > 0 && <MovieList movies={movies} />
        )}
      </div>
    </>
  );
};

export default MoviesPage;

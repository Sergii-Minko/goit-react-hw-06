import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import css from "./MovieDetailsPage.module.css";
import { fetchMovieDetails } from "../../services/movies-api";
import Loader from "../../components/Loader/Loader";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/movies");

  useEffect(() => {
    setLoader(true);
    fetchMovieDetails(movieId)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        toast(`Error fetching movie details: ${error.message}`, {
          duration: 3000,
          icon: <AiFillWarning color="red" size={28} />,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [movieId]);

  if (!movie) return null;

  const { poster_path, title, vote_average, overview, genres } = movie;

  return (
    <main className={css.wrapper}>
      <Toaster position="top-right" />
      {loader && <Loader />}
      <div>
        <Link to={backLinkHref.current} className={css.button}>
          <FaArrowLeftLong /> Go back
        </Link>
      </div>
      <div className={css.wrapperInfo}>
        <img
          className={css.poster}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
          }
        />
        <div className={css.wrapperInfo}>
          <h2>{title}</h2>
          <p>Rating: {vote_average * 10}%</p>
          <p>
            <span>Description: </span>
            {overview}
          </p>
          <p>
            <span>Genre: </span>
            {genres?.map(({ name }) => name).join(", ")}
          </p>
        </div>
      </div>
      <div className={css.wrapperLink}>
        <RouterLink className={css.styledLink} to={`/movies/${movieId}/cast`}>
          Cast
        </RouterLink>
        <RouterLink
          className={css.styledLink}
          to={`/movies/${movieId}/reviews`}
        >
          Reviews
        </RouterLink>
      </div>
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;

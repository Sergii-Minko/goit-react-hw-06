import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MoviesList = ({ movies }) => {
  const filteredMovies = movies?.filter((movie) => movie.poster_path);
  const location = useLocation();

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {filteredMovies?.map((movie) => (
          <li className={css.item} key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} key={movie.id} state={location}>
              <img
                className={css.poster}
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;

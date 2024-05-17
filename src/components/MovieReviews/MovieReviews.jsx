import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../services/movies-api";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetchReviews(movieId)
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        toast(`Error fetching movie reviews: ${error.message}`, {
          duration: 3000,
          icon: <AiFillWarning color="red" size={28} />,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [movieId]);

  return (
    <>
      <Toaster position="top-right" />
      {loader && <Loader />}
      <div className={css.container}>
        {reviews && reviews.length > 0 ? (
          <ul className={css.list}>
            {reviews.map(({ id, author, content }) => (
              <li className={css.item} key={id}>
                <h3 className={css.title}>{author}</h3>
                <p className={css.description}>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We do not have any reviews for this movie</p>
        )}
      </div>
    </>
  );
};

export default MovieReviews;

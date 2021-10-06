import { useEffect, useState } from 'react';
import * as moviesApi from '../../services/movieApi';
import s from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    moviesApi.fetchMovieReviews(movieId).then(data => {
      setReviews(data.results);
      window.scrollTo({ top: 690, behavior: 'smooth' });
    });
  }, [movieId]);

  return (
    <>
      <ul className={s.ul}>
        {reviews && reviews.length > 0
          ? reviews.map(reviews => (
              <li key={reviews.id} className={s.li}>
                <h3 className={s.h3}>{reviews.author}</h3>
                <p className={s.p}>{reviews.content}</p>
              </li>
            ))
          : 'No reviews'}
      </ul>
    </>
  );
}

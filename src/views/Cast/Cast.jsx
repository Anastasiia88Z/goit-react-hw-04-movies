import { useEffect, useState } from 'react';
import * as moviesApi from '../../services/movieApi';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    moviesApi.fetchCastMovie(movieId).then(data => {
      setCast(data.cast);
      window.scrollTo({ top: 690, behavior: 'smooth' });
    });
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={s.ul}>
          {cast.map(castItem => (
            <li className={s.li} key={castItem.id}>
              <img
                className={s.img}
                alt={castItem.name}
                src={`https://image.tmdb.org/t/p/w300/${castItem.profile_path}`}
              />
              <p className={s.p}>{castItem.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

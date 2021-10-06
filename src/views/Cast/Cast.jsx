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
      <ul className={s.ul}>
        {cast.map(cast => (
          <li className={s.li} key={cast.id}>
            <img
              className={s.img}
              alt={cast.name}
              src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
            />
            <p className={s.p}>{cast.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

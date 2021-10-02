import { useEffect, useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import s from './HomePage.module.css';

import * as movieApi from '../../services/movieApi';

export default function HomePage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    movieApi
      .fetchPopularMovie()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={s.div}>
      <h1 className={s.h1}> Popular Movies </h1>
      {movies && (
        <ul className={s.ul}>
          {movies.map(movie => (
            <li key={movie.id} className={s.li}>
              <Link
                className={s.link}
                to={{
                  pathname: `${url}movies/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.original_title ?? movie.name}
                  className={s.img}
                />
              </Link>
              <p className={s.p}>
                {movie.name && movie.name}
                {movie.original_title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

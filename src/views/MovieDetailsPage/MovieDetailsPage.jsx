import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as movieApi from '../../services/movieApi';
import Loader from '../../components/Loader/Loader';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));

const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const locationFrom = location?.state?.from?.location;

  useEffect(() => {
    movieApi
      .fetchMovieById(movieId)
      .then(data => {
        setMovie(data);
      })
      .catch(error => {
        console.log(error);
        history.push(locationFrom ?? '/movies');
        toast.error('Sorry this movie not found');
      });
  }, [movieId, history, locationFrom]);

  const goBack = () => {
    history.push(locationFrom ?? '/');
  };

  return (
    <div>
      {movie && (
        <div className={s.div}>
          <button type="button" onClick={goBack} className={s.button}>
            Go back
          </button>

          <div className={s.movie_card}>
            <img
              className={s.img}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />

            <div className={s.movie_info}>
              <h1 className={s.h1}>{movie.title}</h1>
              <p className={s.p}>{movie.vote_average}</p>

              <h2 className={s.h2}>Overview:</h2>
              <p className={s.p}>{movie.overview}</p>

              <h2 className={s.h2}>Genres: </h2>
              <p className={s.p}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </p>

              <h2 className={s.h2}>Additional information: </h2>

              <NavLink
                className={s.link}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from ?? '/' },
                }}
              >
                Cast
              </NavLink>

              <NavLink
                className={s.link}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from ?? '/' },
                }}
              >
                Reviews
              </NavLink>
            </div>
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <Loader
            type="Puff"
            color="#00BFFF"
            height={160}
            width={160}
            timeout={5000}
            className={s.loader}
          />
        }
      >
        <Route path={`${path}/cast`}>
          <Cast movieId={movieId} />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </div>
  );
}

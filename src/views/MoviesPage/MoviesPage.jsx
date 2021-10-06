import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import * as movieApi from '../../services/movieApi';
import {
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadMoreBtnClick from '../../components/LoadMoreBtn/LoadMoreBtn';
import s from '../HomePage/HomePage.module.css';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (!searchQuery) return;

    movieApi.fetchMovieByName(searchQuery, page).then(data => {
      if (data.results.length === 0) {
        return toast.error(
          `Sorry, but there are no movie with ${searchQuery}`,
          setMovies([]),
        );
      }
      if (data.results) {
        return setMovies(data.results);
      }

      setMovies(prevMovies => [...prevMovies, ...data.results]);
      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    });
  }, [page, searchQuery]);

  const handleSubmit = searchName => {
    setSearchName(searchName);
    history.push({ ...location, search: `query=${searchName}` });
  };

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = movies.length > 20;

  return (
    <div className={s.div}>
      <SearchBar onSearch={handleSubmit} />
      {movies && (
        <ul className={s.ul}>
          {movies.map(movie => (
            <li key={movie.id} className={s.li}>
              <NavLink
                className={s.link}
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                <img
                  className={s.img}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.original_title ?? movie.name}
                />
              </NavLink>
              <p className={s.p}>{movie.title}</p>
            </li>
          ))}
        </ul>
      )}
      {showButton && <LoadMoreBtnClick onClick={loadMoreBtnClick} />}
    </div>
  );
}

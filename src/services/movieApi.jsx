const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '153b5019f15656e7942787ff6808d390';

async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularMovie() {
  return fetchMovies(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
}

export function fetchMovieById(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchCastMovie(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}

export function fetchMovieByName(searchName, page) {
  return fetchMovies(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${page}&query=${searchName}&language=en-US&page=1&include_adult=false`,
  );
}

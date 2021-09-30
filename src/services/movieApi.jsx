const Base_URL = 'https://api.themoviedb.org/3';
const Api_key = '153b5019f15656e7942787ff6808d390';

async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularMovie() {
  return fetchMovies(`${Base_URL}/trending/all/day?api_key=${Api_key}`);
}

export function fetchMovieById(movieId) {
  return fetchMovies(`${Base_URL}/movie/${movieId}?api_key=${Api_key}`);
}

export function fetchCastMovie(movieId) {
  return fetchMovies(
    `${Base_URL}/movie/${movieId}/credits?api_key=${Api_key}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchMovies(
    `${Base_URL}/movie/${movieId}/reviews?api_key=${Api_key}&language=en-US&page=1`,
  );
}

export function fetchMovieByName(searchName, page) {
  return fetchMovies(
    `${Base_URL}/search/movie?api_key=${Api_key}&page=${page}&query=${searchName}&language=en-US&page=1&include_adult=false`,
  );
}

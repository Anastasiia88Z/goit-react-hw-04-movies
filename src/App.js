import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './components/Container/Container.jsx';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader.jsx';

const AsyncHomePage = lazy(() => import('../src/views/HomePage/HomePage.jsx'));

const AsyncMoviesPage = lazy(() =>
  import('../src/views/MoviesPage/MoviesPage.jsx'),
);

const AsyncMovieDetailsPage = lazy(() =>
  import('../src/views/MovieDetailsPage/MovieDetailsPage.jsx'),
);

function App() {
  return (
    <Container>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={AsyncHomePage} />
          <Route path="/movies" exact component={AsyncMoviesPage} />
          <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />
          <Route component={AsyncHomePage} />
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;

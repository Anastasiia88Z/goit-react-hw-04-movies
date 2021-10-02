import { Switch, Route } from 'react-router-dom';
import Container from './components/Container/Container.jsx';
import Navigation from './components/Navigation/Navigation';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.jsx';

const AsyncHomePage = lazy(() => import('../src/views/HomePage/HomePage.jsx'));

function App() {
  return (
    <Container>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={AsyncHomePage} />
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;

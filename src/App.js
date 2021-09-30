import { Switch, Route } from 'react-router';
import Container from './components/Container/Container.jsx';
import Navigation from './components/Navigation/Navigation';

export default function App() {
  return (
    <Container>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          {/* <HomePage /> */}
        </Route>
      </Switch>
    </Container>
  );
}

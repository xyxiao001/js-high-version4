import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import List from './List';

function App() {
  return (
    <section className="we-code">
      <Router>
        <Switch>
          <Route path="/" >
            <Home />
          </Route>
          <Route path="/" >
            <List />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default App;

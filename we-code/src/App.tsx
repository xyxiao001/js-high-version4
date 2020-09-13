import React from 'react';
import {
  HashRouter as Router,
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
          <Route path="/list" >
            <List />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default App;

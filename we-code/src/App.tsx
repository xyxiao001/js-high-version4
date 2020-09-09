import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <section className="we-code">
      <Router>
        <Switch>
          <Route path="/" >
            <Home />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default App;

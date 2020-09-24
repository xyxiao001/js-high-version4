import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './Home';
import List from './List';
import common from './mobx/common'

function PrivateRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      common.timeDate.isBegin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


function App() {
  return (
    <section className="we-code">
      <Router>
        <Switch>
          <PrivateRoute path="/list">
            <List />
          </PrivateRoute>
          <Route path="*" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default App;

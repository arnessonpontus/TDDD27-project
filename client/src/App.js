import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import GameView from "./components/GameView";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container has-text-centered	">
            <Switch>
              <Route path="/" exact>
                <LandingPage />
              </Route>
              <PrivateRoute path="/game">
                <GameView />
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

const { token } = store.getState().auth;

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? ( // Why is token available but not isAuthenticated?
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;

import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import GameView from "./components/game/GameView";
import Navbar from "./components/Navbar";
import HowToPlay from "./components/HowToPlay";
import "./App.css";
import Analytics from "react-router-ga";

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
        <Analytics id="UA-151646007-2" debug>
          <div className="App">
            <Navbar />
            <div>
              <Switch>
                <Route path="/" exact>
                  <LandingPage />
                </Route>
                <Route path="/howtoplay">
                  <HowToPlay />
                </Route>
                <PrivateRoute path="/:id">
                  <GameView />
                </PrivateRoute>
              </Switch>
            </div>
          </div>
        </Analytics>
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

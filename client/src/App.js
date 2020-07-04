import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import GameView from "./components/game/GameView";
import Navbar from "./components/Navbar";
import HowToPlay from "./components/HowToPlay";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { loadUser } from "./actions/authActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>LOADING</div>} persistor={persistor}>
        <Router>
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
        </Router>
      </PersistGate>
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

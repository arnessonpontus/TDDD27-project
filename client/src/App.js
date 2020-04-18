import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className="container has-text-centered	">
          <LandingPage />
        </div>
      </div>
    </Provider>
  );
}

export default App;

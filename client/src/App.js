import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import ItemList from "./components/ItemList";
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
          <h1 className="title is-1">Hello TDDD27</h1>
          <ItemList />
        </div>
      </div>
    </Provider>
  );
}

export default App;

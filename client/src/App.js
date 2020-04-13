import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="container has-text-centered	">
        <h1 className="title is-1">Hello TDDD27</h1>
        <button className="button">Press me</button>
      </div>
    </div>
  );
}

export default App;

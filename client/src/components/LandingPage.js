import React from "react";
import WordList from "./WordList";

const LandingPage = (props) => {
  return (
    <div>
      <h1 className="title is-1">Welcome to Doodla</h1>
      <WordList />
    </div>
  );
};

export default LandingPage;

import React from "react";
import ItemList from "./ItemList";

const LandingPage = (props) => {
  return (
    <div>
      <h1 className="title is-1">Welcome to Doodla</h1>
      <ItemList />
    </div>
  );
};

export default LandingPage;

import React, { Fragment } from "react";
import StartGameBtns from "./StartGameBtns";

const GuestView = () => {
  return (
    <Fragment>
      <h1 className="title is-1">Welcome to Doodla</h1>
      <div className="section columns is-vcentered is-medium">
        <StartGameBtns />
      </div>
    </Fragment>
  );
};

export default GuestView;

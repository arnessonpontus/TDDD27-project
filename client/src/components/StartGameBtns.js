import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const StartGameBtns = () => {
  return (
    <Fragment>
      <div className="column buttons are-large are-primary is-half is-offset-one-quarter">
        <Link className="button is-primary " to="/game">
          Join game
        </Link>
        <a className="button">Create Game</a>
      </div>
    </Fragment>
  );
};

export default StartGameBtns;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const StartGameBtns = () => {
  return (
    <Fragment>
      <div className="column buttons are-large are-primary is-half is-offset-one-quarter">
        <Link className="button is-primary " to="/game1">
          Join game 1
        </Link>
        <Link className="button is-primary " to="/game2">
          Join game 2
        </Link>
        <a href="/" className="button">
          Create Game
        </a>
      </div>
    </Fragment>
  );
};

export default StartGameBtns;

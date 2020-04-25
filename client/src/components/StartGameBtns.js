import React, { Fragment } from "react";

const StartGameBtns = () => {
  return (
    <Fragment>
      <div className="column buttons are-large are-primary is-half is-offset-one-quarter">
        <a className="button is-primary ">Join game</a>
        <a className="button">Create Game</a>
      </div>
    </Fragment>
  );
};

export default StartGameBtns;

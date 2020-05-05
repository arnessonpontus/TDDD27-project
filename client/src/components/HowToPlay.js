import React from "react";
import StartGameBtns from "./StartGameBtns";

const HowToPlay = () => {
  return (
    <div className="has-text-centered">
      <h1 className="title is-2">How to play Doodla</h1>
      <div className="section columns is-medium">
        <div className="column is-two-fifths is-offset-1">
          <p>
            The user who clicks the "Start Game" button is the one to draw the
            word that is shown.
          </p>
          <figure className="image ">
            <img
              style={{ margin: "auto", width: 384, height: 270 }}
              className="is-rounded"
              src="./images/boat.png"
              alt="boat"
            />
          </figure>
        </div>
        <div className="column is-two-fifths">
          <p>
            Every other person in the room should then guess what word it is by
            typing the word in the chat window.
          </p>
          <figure className="image">
            <img
              style={{ margin: "auto", width: 256, height: 256 }}
              className="is-rounded"
              src="./images/guess.png"
              alt="guess"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;

import React from "react";
import UserWordList from "./UserWordList";
import StartGameBtns from "./StartGameBtns";

const UserView = () => {
  return (
    <div className="has-text-centered">
      <h1 className="title welcome-title has-text-primary">
        Welcome to Doodla
      </h1>

      <div className="section columns is-vcentered has-text-centered	">
        <StartGameBtns />
        <UserWordList />
      </div>
    </div>
  );
};

export default UserView;

import React from "react";
import UserWordList from "./UserWordList";
import StartGameBtns from "./StartGameBtns";

const UserView = () => {
  return (
    <div className="section columns is-vcentered is-medium  has-text-centered	">
      <StartGameBtns />
      <UserWordList />
    </div>
  );
};

export default UserView;

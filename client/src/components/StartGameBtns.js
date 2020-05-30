import React, { useState, Fragment } from "react";

import { Link } from "react-router-dom";
import EnterRoomModal from "./EnterRoomModal";

const StartGameBtns = () => {
  const [isEnterRoomModalOpen, setIsEnterRoomModalOpen] = useState(false);
  const [actionType, setActionType] = useState("joinRoom");

  const toggleModal = (type) => {
    setIsEnterRoomModalOpen(!isEnterRoomModalOpen);
    setActionType(type)
  };

  return (
    <Fragment>
      <div className="column buttons are-large are-primary is-half is-offset-one-quarter">
        <Link to="#/" className="button is-primary " onClick={() => toggleModal("joinRoom")}>
          Join game
        </Link>
      
        <Link to="#/" className="button " onClick={() => toggleModal("createRoom")}>
          Create game
        </Link>
      </div>
      <EnterRoomModal
        isEnterRoomModalOpen={isEnterRoomModalOpen}
        toggleModal={toggleModal}
        actionType={actionType}
      />
    </Fragment>
  );
};

export default StartGameBtns;

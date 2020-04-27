import React from "react";
import ChatWindow from "./ChatWindow";
import PlayGround from "./DrawingArea";

const GameView = () => {
  return (
    <div className="section columns ">
      <PlayGround />
      <ChatWindow />
    </div>
  );
};

export default GameView;

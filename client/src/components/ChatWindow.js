import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("message", (message) => {
  console.log(message);
});

const ChatWindow = () => {
  return (
    <div className="section ">
      <div className="box is-light">
        <h1> Chat</h1>
      </div>
    </div>
  );
};

export default ChatWindow;

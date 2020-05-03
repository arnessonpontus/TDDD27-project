import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameInfo = (props) => {
  const [room, setRoom] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    props.socket.on("roomUsers", ({ room, users }) => {
      setRoom(room);
      setRoomUsers(users);
    });
  }, []);

  return (
    <div className="section column">
      <div className="box">
        <Link to="/" className="button is-light is-small">
          <span className="icon">
            <i className="fas fa-sign-out-alt fa-flip-horizontal "></i>
          </span>
          {"  "}
          <span>
            <p> Leave room</p>
          </span>
        </Link>
        <br></br>
        <br></br>
        <h1 className="is-size-7">Room ID: </h1>
        <p>{room}</p>

        <br></br>
        <p className="is-size-7">Current players:</p>
        {roomUsers.map((roomUser, i) => {
          return <p key={i}>{roomUser.name}</p>;
        })}
      </div>
    </div>
  );
};

export default GameInfo;

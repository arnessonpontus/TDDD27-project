import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameInfo = (props) => {
  const [room, setRoom] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [countDownTime, setCountDowntime] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    props.socket.on("roomUsers", ({ room, users }) => {
      setRoom(room);
      setRoomUsers(users);
    });

    props.socket.on("secondChange", ({ countDownTime }) => {
      console.log(countDownTime);
      setCountDowntime(countDownTime);

      // Temporary, before correct game mechanics
      if (countDownTime < 10) {
        setGameStarted(true);
      }

      // Reset visual timer after some time
      if (countDownTime < 1) {
        setTimeout(() => {
          setGameStarted(false);
          setCountDowntime(10);
        }, 2000);
      }
    });
  }, []);

  const onGameStart = () => {
    props.socket.emit("gameStart");
    setGameStarted(true);
  };

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

      {console.log(gameStarted)}
      <button
        disabled={gameStarted}
        className="button is-primary"
        onClick={onGameStart}
      >
        {" "}
        Start game
      </button>
      <div>
        <span>Time:</span>
        {"  "}
        <span className="is-size-4">{countDownTime}</span>
      </div>
    </div>
  );
};

export default GameInfo;

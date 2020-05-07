import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllWords } from "../../actions/wordActions";
import PropTypes from "prop-types";

const GameInfo = (props) => {
  const gameTime = 30;
  const [room, setRoom] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [countDownTime, setCountDowntime] = useState(gameTime);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentDrawer, setCurrentDrawer] = useState("");
  const [drawingWord, setDrawingWord] = useState("");

  useEffect(() => {
    props.getAllWords();
    props.socket.on("roomUsers", ({ room, users }) => {
      setRoom(room);
      setRoomUsers(users);
    });

    props.socket.on("gameInfo", ({ currentDrawer }) => {
      setCurrentDrawer(currentDrawer);
    });

    props.socket.on("currentWord", ({ currentWord }) => {
      setDrawingWord(currentWord);
    });

    props.socket.on("secondChange", ({ countDownTime }) => {
      setCountDowntime(countDownTime);

      // Temporary, before correct game mechanics
      if (countDownTime < gameTime) {
        setGameStarted(true);
      }

      // Reset visual timer after some time
      if (countDownTime < 1) {
        setTimeout(() => {
          setGameStarted(false);
          setCountDowntime(gameTime);
        }, 2000);
      }
    });
  }, []);

  const onGameStart = () => {
    const { allWords } = props.word;

    // Get random word from all words in database
    const currentWord = allWords[Math.floor(Math.random() * allWords.length)];

    props.socket.emit("gameStart", {
      currentWord: currentWord.name,
    });
    setGameStarted(true);
  };

  return (
    <div className="section column">
      <p>Room info</p>
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
      <p>Game info</p>
      <div className="box">
        <h1 className="is-size-7">Current drawer: </h1>
        <p>{currentDrawer}</p>
        <h1 className="is-size-7">Draw the word: </h1>
        <p>{drawingWord}</p>
      </div>

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

GameInfo.propTypes = {
  getAllWords: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  word: state.word, // Get the word reducer from combine reducers
});

export default connect(mapStateToProps, { getAllWords })(GameInfo);

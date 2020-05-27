import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllWords } from "../../actions/wordActions";
import PropTypes from "prop-types";

const GameInfo = (props) => {
  const gameTime = 60;
  const [room, setRoom] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [countDownTime, setCountDowntime] = useState(gameTime);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentDrawer, setCurrentDrawer] = useState("");
  const [drawingWord, setDrawingWord] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");

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

    props.socket.on("changeCategory", ({ category }) => {
      setCurrentCategory(category);
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

  props.socket.on("gameEnd", () => {
    setGameStarted(false);
    setCountDowntime(gameTime);
    setCurrentDrawer("");
    setDrawingWord("");
  });

  const onGameStart = () => {
    const { allWords } = props.word;

    // Check which category it is
    let wordList = [];
    if (currentCategory !== "All") {
      wordList = allWords.filter(
        (word) => word.category === currentCategory.toLowerCase()
      );
    } else {
      wordList = allWords;
    }

    //Get random word from the list of words
    const currentWord = wordList[Math.floor(Math.random() * wordList.length)];

    props.socket.emit("gameStart", {
      currentWord: currentWord.name,
    });
    setGameStarted(true);
  };

  const onChangeCategory = (e) => {
    props.socket.emit("changeCategory", {
      category: e.target.value,
    });
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

        <p className="is-size-7">Current players:</p>
        {roomUsers.map((roomUser, i) => {
          return <p key={i}>{roomUser.name}</p>;
        })}
      </div>
      <p>Game info</p>
      <div className="box">
        <h1 className="is-size-7">Current drawer: </h1>
        <p className="is-size-6">
          {currentDrawer ? currentDrawer : "Not assigned"}
        </p>
        <h1 className="is-size-7">Current category: </h1>
        <p className="is-size-6">
          {currentCategory ? currentCategory : "Not assigned"}
        </p>
        {drawingWord ? (
          <Fragment>
            <h1 className="is-size-7">Draw the word: </h1>
            <p className="is-size-6">{drawingWord}</p>{" "}
          </Fragment>
        ) : null}
      </div>
      <div className="container">
        <h1 className="is-size-7">Category: </h1>
        <div class="select is-small">
          <select onChange={onChangeCategory}>
            <option value="All">All</option>
            <option value="Object">Object</option>
            <option value="Action">Action</option>
            <option value="Person">Person/character</option>
            <option value="Animal">Animal</option>
            <option value="Other">Other</option>
          </select>
        </div>
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

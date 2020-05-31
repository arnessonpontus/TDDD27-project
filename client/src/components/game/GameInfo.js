import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllWords } from "../../actions/wordActions";
import {
  setCategory,
  setDrawingWord,
  setCurrentDrawer,
  setGameStarted,
  setCurrentTime,
  setRoomUsers,
  setRoom,
  setGameTime,
  addGamePoints,
} from "../../actions/gameActions";
import PropTypes from "prop-types";

const GameInfo = (props) => {
  const {
    category,
    drawingWord,
    currentDrawer,
    gameStarted,
    currentTime,
    roomUsers,
    room,
    gameTime,
  } = props.game;

  const { user } = props.auth;

  useEffect(() => {
    props.getAllWords();
    props.socket.on("roomUsers", ({ room, users }) => {
      props.setRoom(room);
      props.setRoomUsers(users);
    });

    props.socket.on("changeCategory", ({ category }) => {
      props.setCategory(category); // Forgot to put props. // This called funtion but did not dispatch to reducer
    });

    props.socket.on("secondChange", ({ countDownTime }) => {
      props.setCurrentTime(countDownTime);

      // Reset visual timer after some time
      if (countDownTime < 1) {
        setTimeout(() => {
          props.setGameStarted(false);
          props.setCurrentTime(gameTime);
        }, 2000);
      }
    });

    props.socket.on("gameEnd", () => {
      props.setGameStarted(false);
      props.setCurrentTime(gameTime);
      props.setCurrentDrawer(null);
      props.setDrawingWord("");
    });
  }, []);

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
          {currentDrawer ? currentDrawer.name : "Not assigned"}
        </p>
        <h1 className="is-size-7">Current category: </h1>
        <p className="is-size-6">{category ? category : "Not assigned"}</p>
        {drawingWord ? (
          <Fragment>
            <h1 className="is-size-7">Draw the word: </h1>
            <p className="is-size-6">{drawingWord}</p>{" "}
          </Fragment>
        ) : null}
      </div>
      <div className="container">
        <h1 className="is-size-7">Category: </h1>
        <div className="select is-small">
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
    </div>
  );
};

GameInfo.propTypes = {
  getAllWords: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  setDrawingWord: PropTypes.func.isRequired,
  setCurrentDrawer: PropTypes.func.isRequired,
  setGameStarted: PropTypes.func.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  setRoomUsers: PropTypes.func.isRequired,
  setRoom: PropTypes.func.isRequired,
  setGameTime: PropTypes.func.isRequired,
  addGamePoints: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  word: state.word, // Get the word reducer from combine reducers
  game: state.game,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllWords,
  setCategory,
  setDrawingWord,
  setCurrentDrawer,
  setGameStarted,
  setCurrentTime,
  setRoomUsers,
  setRoom,
  setGameTime,
})(GameInfo);

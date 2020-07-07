import React, { useEffect, useRef, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";
import DrawingArea from "./DrawingArea";
import GameInfo from "./GameInfo";
import io from "socket.io-client";

const GameView = (props) => {
  const [dropDownInfoState, setDropDownInfoState] = useState("");
  // Why does using url instead of io() makes it less laggy when drawing?
  // Should default to window.location
  const { current: socket } = useRef(
    io(process.env.NODE_ENV === "production" ? "" : "http://localhost:5000")
  ); /*
  const { current: socket } = useRef(
    io("https://doodla-staging.herokuapp.com")
  );*/

  // Get room id from url
  const { id } = useParams();
  const roomId = id;

  const { user } = props.auth;

  useEffect(() => {
    socket.open();
    if (user) {
      socket.emit("joinRoom", {
        name: user.name,
        id: user.id,
        room: roomId,
      });
    }

    return () => socket.close();
  }, []);

  const toggleGameInfo = () => {
    if (dropDownInfoState === "is-active") {
      setDropDownInfoState("");
    } else {
      setDropDownInfoState("is-active");
    }
  };

  const isMobile = () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // style={{ margin: "0px 5px 0px 5px" }}

  return (
    <div className="columns">
      {isMobile() ? (
        <div className="container is-fluid">
          <div className={" column dropdown " + dropDownInfoState}>
            <div className="dropdown-trigger ">
              <button
                onClick={toggleGameInfo}
                className="button is-small is-fullwidth"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>Game info</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <GameInfo socket={socket} io={io} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <GameInfo socket={socket} io={io} />
      )}
      {!isMobile() ? (
        <Fragment>
          {" "}
          <DrawingArea isMobile={isMobile} socket={socket} io={io} />
          <ChatWindow isMobile={isMobile} socket={socket} io={io} />
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <ChatWindow isMobile={isMobile} socket={socket} io={io} />
          <div className="box">
            <DrawingArea isMobile={isMobile} socket={socket} io={io} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

GameView.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(GameView);

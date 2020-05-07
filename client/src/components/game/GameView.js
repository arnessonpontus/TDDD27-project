import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";
import DrawingArea from "./DrawingArea";
import GameInfo from "./GameInfo";
import io from "socket.io-client";

const GameView = (props) => {
  // Why does using url instead of io() makes it less laggy when drawing?
  // Should default to window.location
  const { current: socket } = useRef(io()); // "http://localhost:5000"
  /*
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
        room: roomId,
      });
    }

    return () => socket.close();
  }, []);

  return (
    <div className="columns">
      <GameInfo socket={socket} io={io} />
      <DrawingArea socket={socket} io={io} />
      <ChatWindow socket={socket} io={io} />
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

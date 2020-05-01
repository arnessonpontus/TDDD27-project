import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";
import PlayGround from "./DrawingArea";
import UserWindow from "./UserWindow";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const GameView = (props) => {
  const { id } = useParams();
  const roomId = id;

  const { user } = props.auth;

  useEffect(() => {
    if (user) {
      socket.emit("joinRoom", {
        name: user.name,
        room: roomId,
      });
    }
  }, []);

  return (
    <div className="section columns ">
      <PlayGround socket={socket} io={io} />
      <ChatWindow socket={socket} io={io} />
      <UserWindow socket={socket} io={io} />
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

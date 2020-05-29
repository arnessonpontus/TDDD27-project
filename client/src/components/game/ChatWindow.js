import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatWindow = (props) => {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    props.socket.on("message", (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });
  }, []);

  const { user } = props.auth;
  const { currentTime } = props.game;

  const onSubmit = (e) => {
    e.preventDefault();

    // Prevent form sending empty messages
    if (text === "") return;

    const name = user.name;
    const now = new Date();
    const time =
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    const msg = { name, text, time };

    // Emit message
    props.socket.emit("chatMessage", msg);
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="section column is-one-quarter">
      <div className="box ">
        <h1> Chat</h1>
        <ScrollToBottom className="game-height">
          {chatMessages.map((msg, i) => {
            return (
              <Message
                key={i}
                name={msg.name}
                text={msg.text}
                time={msg.time}
              />
            );
          })}
        </ScrollToBottom>
        <br></br>
        <form onSubmit={onSubmit}>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Write answer or chat message"
                onChange={onChange}
                value={text}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-comment"></i>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="has-text-centered">
        <span>Time left:</span>
        {"  "}
        <span className="is-size-1">{currentTime}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  game: state.game,
});

ChatWindow.propTypes = {
  auth: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(ChatWindow);

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

  const onSubmit = (e) => {
    e.preventDefault();

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
    <div className="section column">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

ChatWindow.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(ChatWindow);

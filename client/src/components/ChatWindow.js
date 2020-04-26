import React, { useState, Fragment, useEffect } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const socket = io("http://localhost:5000");

const ChatWindow = (props) => {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });
  }, []);

  const { user } = props.auth;

  const onSubmit = (e) => {
    e.preventDefault();

    const name = user.name;

    const msg = { name, text };

    // Emit message
    socket.emit("chatMessage", msg);
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="section ">
      <div className="box is-light ">
        <h1> Chat</h1>
        <div>
          {chatMessages.map((msg, i) => {
            return (
              <div key={i}>
                <b>{msg.name}: </b>
                {msg.text}
              </div>
            );
          })}
        </div>
        <form onSubmit={onSubmit}>
          <div className="field">
            <p className="control has-icons-left">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Write answer or chat message"
                onChange={onChange}
                value={text}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
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

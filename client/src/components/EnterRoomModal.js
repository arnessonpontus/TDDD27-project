import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const EnterRoomModal = (props) => {
  const history = useHistory();
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState(null);

  const { user } = props.auth;

  if (!props.isEnterRoomModalOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();

    if (user) {
      axios
        .get("/api/game/enterRoom/" + room)
        .then((res) => {
          if (
            props.actionType === "joinRoom" &&
            res.data === "ROOM_NOT_FOUND"
          ) {
            setMsg("No such room exist!");
            return;
          } else if (
            props.actionType === "createRoom" &&
            res.data === "ROOM_FOUND"
          ) {
            setMsg("Room already exist!");
            return;
          } else {
            history.push("/" + room.replace(/\s+/g, "-").toLowerCase());
          }
        })
        .catch((err) => {
          console.log("Error, ", err);
        });
    } else {
      setMsg(
        `You need to log in to ${
          props.actionType === "joinRoom" ? "join a room" : "create a room"
        }!`
      );
    }
  };

  const toggle = () => {
    setMsg(null);
    props.toggleModal();
  };

  const onChange = (e) => {
    setRoom(e.target.value);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={toggle}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">
            {props.actionType === "joinRoom" ? "Join room" : "Create room"}
          </p>
          <button className="delete" onClick={toggle} />
        </header>
        <div className="modal-card-body">
          {msg ? <div className="notification is-danger">{msg}</div> : null}
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Enter room name</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  autoFocus
                  name="room"
                  className="input"
                  type="text"
                  placeholder="my-awesome-room"
                  onChange={onChange}
                  value={room}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-door-open"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  {props.actionType === "joinRoom"
                    ? "Join room"
                    : "Create room"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

EnterRoomModal.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(EnterRoomModal);

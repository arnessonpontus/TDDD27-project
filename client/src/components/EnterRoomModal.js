import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EnterRoomModal = (props) => {
const history = useHistory();
const [room, setRoom] = useState("");
  
  if (!props.isEnterRoomModalOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();

    history.push("/" + room.replace(/\s+/g, '-'));
  };

  const onChange = (e) => {
        setRoom(e.target.value);
    }
  
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.toggleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
  <p className="modal-card-title">{props.actionType === "joinRoom" ? "Join room" : "Create room" }</p>
          <button className="delete" onClick={props.toggleModal} />
        </header>
        <div className="modal-card-body">
          
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Enter room name</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  autoFocus
                  name="room"
                  className="input"
                  type="text"
                  placeholder="MyAwesomeRoom"
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
                <button className="button is-success">Login</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};


export default EnterRoomModal;

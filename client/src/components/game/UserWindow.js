import React, { useState, useEffect } from "react";

const UserWindow = (props) => {
  const [room, setRoom] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    props.socket.on("roomUsers", ({ room, users }) => {
      setRoom(room);
      setRoomUsers(users);
    });
  }, []);

  return (
    <div className="">
      <h1>{room}</h1>
      <br></br>
      {roomUsers.map((roomUser) => {
        return <p>{roomUser.name}</p>;
      })}
    </div>
  );
};

export default UserWindow;

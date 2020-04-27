import React from "react";

const Message = (props) => {
  return (
    <div className=" less-padding notification is-primary ">
      <span className="is-size-6 ">{props.name} </span>
      <span className="is-size-7 has-text-grey-lighter">{props.time}</span>
      <p className="is-size-6">{props.text}</p>
    </div>
  );
};

export default Message;

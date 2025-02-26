import React from "react";

const Message = ({ message }) => {
  return (
    <div>
      <p>{message.senderId}</p>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;

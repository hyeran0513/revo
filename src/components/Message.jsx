import React from "react";
import styled from "styled-components";

const Message = ({ message, userId }) => {
  return (
    <MessageBox $isUser={message.senderId === userId}>
      <p>{message.senderId}</p>
      <p>{message.text}</p>
    </MessageBox>
  );
};

const MessageBox = styled.div`
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  line-height: 1.3;
  background-color: ${({ $isUser }) => ($isUser ? "#2979ff" : "#f6f5f7")};
  color: ${({ $isUser }) => ($isUser ? "#fff" : "#333")};
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: ${({ $isUser }) =>
    $isUser ? "50px 50px 0 50px" : "50px 50px 50px 0px"};
`;

export default Message;

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ChatBox = ({ messages, otherUsername }) => {
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <MessageHead>{otherUsername}</MessageHead>

      <MessageBody>
        {messages.map((msg) => (
          <MessageBox key={msg.id} $isUser={msg.senderId === user.uid}>
            {msg.text}
          </MessageBox>
        ))}

        <div ref={messagesEndRef} />
      </MessageBody>
    </>
  );
};

const MessageHead = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const MessageBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 50vh;
  overflow: hidden;
  overflow-y: auto;
`;

const MessageBox = styled.div`
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  line-height: 1.3;
  background-color: ${({ $isUser, theme }) =>
    $isUser ? theme.chats.sendbubble : theme.chats.receivebubble};
  color: ${({ $isUser, theme }) =>
    $isUser ? theme.chats.sendtext : theme.chats.receivetext};

  padding: 12px;
  margin: 8px 0;
  border-radius: ${({ $isUser }) =>
    $isUser ? "12px 12px 0 12px" : "12px 12px 12px 0px"};
`;

export default ChatBox;

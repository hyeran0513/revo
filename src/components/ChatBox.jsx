import { useSelector } from "react-redux";
import styled from "styled-components";

const ChatBox = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {messages.map((msg) => (
        <MessageBox key={msg.id} $isUser={msg.senderId === user.uid}>
          {msg.text}
        </MessageBox>
      ))}
    </>
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

export default ChatBox;

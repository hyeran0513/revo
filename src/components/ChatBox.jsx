import { useSelector } from "react-redux";
import styled from "styled-components";

const ChatBox = ({ messages, otherUsername }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <MessageHead>{otherUsername}</MessageHead>

      <MessageBody>
        {messages.map((msg) => (
          <MessageBox key={msg.id} $isUser={msg.senderId === user.uid}>
            {msg.text}
          </MessageBox>
        ))}
      </MessageBody>
    </>
  );
};

const MessageHead = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const MessageBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MessageBox = styled.div`
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  line-height: 1.3;
  background-color: ${({ $isUser }) => ($isUser ? "#2979ff" : "#f6f5f7")};
  color: ${({ $isUser }) => ($isUser ? "#fff" : "#333")};
  padding: 12px;
  margin: 8px 0;
  border-radius: ${({ $isUser }) =>
    $isUser ? "12px 12px 0 12px" : "12px 12px 12px 0px"};
`;

export default ChatBox;

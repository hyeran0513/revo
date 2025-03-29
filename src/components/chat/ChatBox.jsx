import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatTimestamp, formatToDate } from "../../utils/format";
import { BiSolidUserCircle } from "react-icons/bi";

const ChatBox = ({ messages, otherUsername }) => {
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  let lastDate = null;

  return (
    <>
      <MessageHead>
        <UserInfo>
          <BiSolidUserCircle />
          {otherUsername}
        </UserInfo>
      </MessageHead>

      <MessageBody>
        {messages.map((msg, index) => {
          const currentDate = formatToDate(msg.createdAt);
          const showDate = currentDate !== lastDate;

          if (showDate) lastDate = currentDate;

          return (
            <MessageBoxWrapper key={msg.id}>
              {showDate && (
                <MessageDateWrapper>
                  <MessageDate>{currentDate}</MessageDate>
                </MessageDateWrapper>
              )}

              <MessageBox $isUser={msg.senderId === user.uid}>
                <MessageText $isUser={msg.senderId === user.uid}>
                  {msg.text}
                </MessageText>
                <MessageTime>{formatTimestamp(msg.createdAt)}</MessageTime>
              </MessageBox>
            </MessageBoxWrapper>
          );
        })}

        <div ref={messagesEndRef} />
      </MessageBody>
    </>
  );
};

const MessageHead = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    font-size: 34px;
    fill: ${(props) => props.theme.colors.secondary};
  }
`;

const MessageBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 50vh;
  overflow-y: auto;
`;

const MessageBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "row")};
`;

const MessageText = styled.div`
  background-color: ${({ $isUser, theme }) =>
    $isUser ? theme.chats.sendbubble : theme.chats.receivebubble};
  color: ${({ $isUser, theme }) =>
    $isUser ? theme.chats.sendtext : theme.chats.receivetext};
  padding: 12px;
  margin: 8px 0;
  border-radius: ${({ $isUser }) =>
    $isUser ? "12px 12px 0 12px" : "12px 12px 12px 0px"};
`;

const MessageDateWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MessageDate = styled.div`
  display: inline-block;
  font-size: 13px;
  margin: 10px 0;
  padding: 4px 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: gray;
`;

export default ChatBox;

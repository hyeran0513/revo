import styled from "styled-components";
import { BiSolidUserCircle } from "react-icons/bi";

const ChatList = ({ setChatId, chats }) => {
  return (
    <ChatListWrapper>
      <ChatContainer>
        {chats?.map((chat) => (
          <ChatItem key={chat.id} onClick={() => setChatId(chat.id)}>
            <BiSolidUserCircle />
            {chat.otherUserInfo
              ? chat.otherUserInfo.username
              : "알 수 없는 사용자"}
          </ChatItem>
        ))}
      </ChatContainer>
    </ChatListWrapper>
  );
};

const ChatListWrapper = styled.div`
  max-width: 30%;
  width: 100%;
  border-right: 1px solid ${(props) => props.theme.colors.border};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color ease 0.3s;

  svg {
    font-size: 34px;
    fill: ${(props) => props.theme.colors.secondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
`;

export default ChatList;

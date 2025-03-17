import { useSelector } from "react-redux";
import styled from "styled-components";
import { useChatList } from "../../hooks/useChatData";
import Loading from "../common/Loading";

const ChatList = ({ setChatId }) => {
  const { user } = useSelector((state) => state.auth);

  // 채팅 목록 조회
  const { chats, loading } = useChatList(user);

  // 로딩
  if (loading) return <Loading />;

  return (
    <ChatListWrapper>
      <ChatContainer>
        {chats?.map((chat) => (
          <ChatItem key={chat.id} onClick={() => setChatId(chat.id)}>
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
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color ease 0.3s;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
`;

export default ChatList;

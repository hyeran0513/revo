import React, { useEffect, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import ChatForm from "../../components/chat/ChatForm";
import ChatBox from "../../components/chat/ChatBox";
import { useSearchParams } from "react-router-dom";
import NoData from "../../components/common/NoData";
import SubBanner from "../../components/base/SubBanner";
import { useOtherUserData } from "../../hooks/useUserData";
import { useChatData, useChatList } from "../../hooks/useChatData";
import Loading from "../../components/common/Loading";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  // URL에서 chatId 조회
  const searchChatId = searchParams.get("chatId");
  const [chatId, setChatId] = useState(searchChatId || "");

  // 상대방 데이터 조회
  const {
    data: otherUsername,
    isLoading: isUsernameLoading,
    error,
  } = useOtherUserData(chatId);

  // 채팅 목록 조회
  const { chats, loading } = useChatList(user);

  const breadcrumb = [
    { link: "/", text: "홈" },
    { link: "/chatroom", text: "채팅" },
  ];

  // 메시지 내용 조회
  const { messages, isLoading } = useChatData(chatId);

  // URL의 쿼리 파라미터(searchChatId)가 변경되면 chatId 업데이트
  useEffect(() => {
    if (searchChatId) {
      setChatId(searchChatId);
    }
  }, [searchChatId]);

  if (isLoading && isUsernameLoading && loading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <>
      {/* 서브 배너 */}
      <SubBanner bannerText="채팅" breadcrumb={breadcrumb} />

      {/* 채팅 영역 */}
      <ChatWrapper>
        {/* 채팅 목록 */}
        <ChatList setChatId={setChatId} chats={chats} />

        {/* 메시지 영역 */}
        <ChatContainer>
          {chatId ? (
            <>
              <ChatBox messages={messages} otherUsername={otherUsername} />
              <ChatForm chatId={chatId} />
            </>
          ) : (
            <NoData text="메시지를 선택해 주세요." icon="mail" />
          )}
        </ChatContainer>
      </ChatWrapper>
    </>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default ChatRoom;

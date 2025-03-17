import React, { useEffect, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import ChatForm from "../../components/chat/ChatForm";
import ChatBox from "../../components/chat/ChatBox";
import { useSearchParams } from "react-router-dom";
import NoData from "../../components/common/NoData";
import SubBanner from "../../components/base/SubBanner";
import { useOtherUserData } from "../../hooks/useUserData";
import { useChatData } from "../../hooks/useChatData";

const ChatRoom = () => {
  const [searchParams] = useSearchParams();
  const searchChatId = searchParams.get("chatId"); // URL에서 chatId 조회
  const [chatId, setChatId] = useState(searchChatId || "");
  const { data: otherUsername, isLoading, error } = useOtherUserData(chatId);

  // URL의 쿼리 파라미터(searchChatId)가 변경되면 chatId 업데이트
  useEffect(() => {
    if (searchChatId) {
      setChatId(searchChatId);
    }
  }, [searchChatId]);

  const messages = useChatData(chatId);

  return (
    <>
      <SubBanner text="채팅" />

      <ChatWrapper>
        <ChatList setChatId={setChatId} />

        {chatId ? (
          <ChatContainer>
            <ChatBox messages={messages} otherUsername={otherUsername} />
            <ChatForm chatId={chatId} />
          </ChatContainer>
        ) : (
          <NoData text="메시지를 선택해 주세요." icon="mail" />
        )}
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

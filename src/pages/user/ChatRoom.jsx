import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import ChatList from "../../components/chat/ChatList";
import styled from "styled-components";
import ChatForm from "../../components/chat/ChatForm";
import ChatBox from "../../components/chat/ChatBox";
import { useSearchParams } from "react-router-dom";
import NoData from "../../components/common/NoData";
import SubBanner from "../../components/base/SubBanner";
import { useOtherUserData } from "../../hooks/useUserData";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
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

  // chatId가 존재하면 해당 채팅의 메시지를 실시간으로 조회
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, "messages");

    const q = query(
      messagesRef,
      where("chatId", "==", chatId),
      orderBy("createdAt", "asc")
    );

    // 실시간으로 쿼리 결과의 변경사항을 수신
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // 컴포넌트가 언마운트 될 때 구독 해제
    return () => unsubscribe();
  }, [chatId]);

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

import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import ChatList from "../../components/ChatList";
import styled from "styled-components";
import ChatForm from "../../components/ChatForm";
import ChatBox from "../../components/ChatBox";
import { useSearchParams } from "react-router-dom";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const [searchParams] = useSearchParams();
  const searchChatId = searchParams.get("chatId");

  const [chatId, setChatId] = useState(searchChatId || "");

  useEffect(() => {
    if (searchChatId) {
      setChatId(searchChatId);
    }
  }, [searchChatId]);

  useEffect(() => {
    if (!chatId) return;
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("chatId", "==", chatId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <ChatWrapper>
      <ChatList setChatId={setChatId} />

      {chatId ? (
        <ChatContainer>
          <ChatBox messages={messages} />
          <ChatForm chatId={chatId} />
        </ChatContainer>
      ) : (
        <>메시지를 선택해 주세요.</>
      )}
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin: 0 auto;
  max-width: 1200px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default ChatRoom;

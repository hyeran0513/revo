import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import ChatList from "../../components/ChatList";
import styled from "styled-components";
import ChatForm from "../../components/ChatForm";
import ChatBox from "../../components/ChatBox";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NoData from "../../components/NoData";

const fetchUser = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const [searchParams] = useSearchParams();
  const searchChatId = searchParams.get("chatId");

  const [chatId, setChatId] = useState(searchChatId || "");
  const { user } = useSelector((state) => state.auth);
  const [otherUsername, setOtherUsername] = useState(null);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
          const chatData = chatSnap.data();
          const otherParticipant = chatData.participants.find(
            (uid) => uid !== user.uid
          );

          if (otherParticipant) {
            const otherUserInfo = await fetchUser(otherParticipant);
            setOtherUsername(otherUserInfo.username);
          }
        }
      } catch (error) {
        console.error("Error fetching other user:", error);
      }
    };

    fetchOtherUser();
  }, [user.uid, chatId]);

  useEffect(() => {
    if (searchChatId) {
      setChatId(searchChatId);
    }
  }, [searchChatId]);

  useEffect(() => {
    if (!chatId) return;
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("chatId", "==", chatId),
      orderBy("createdAt", "asc")
    );

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
          <ChatBox messages={messages} otherUsername={otherUsername} />
          <ChatForm chatId={chatId} />
        </ChatContainer>
      ) : (
        <NoData text="메시지를 선택해 주세요." icon="mail" />
      )}
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default ChatRoom;

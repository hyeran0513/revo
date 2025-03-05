import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import styled from "styled-components";

const fetchUser = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

const ChatList = ({ setChatId }) => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.uid) return;

    const chatRef = collection(db, "chats");

    const unsubscribe = onSnapshot(chatRef, async (snapshot) => {
      const chatData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const chat = { id: doc.id, ...doc.data() };
          const otherParticipant = chat.participants.find(
            (participant) => participant !== user.uid
          );

          const otherUserInfo = otherParticipant
            ? await fetchUser(otherParticipant)
            : null;

          return { ...chat, otherUserInfo };
        })
      );

      setChats(chatData);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <ChatListWrapper>
      {chats.map((chat) => (
        <ChatItem key={chat.id} onClick={() => setChatId(chat.id)}>
          {chat.otherUserInfo
            ? chat.otherUserInfo.username
            : "알 수 없는 사용자"}
          님과의 채팅
        </ChatItem>
      ))}
    </ChatListWrapper>
  );
};

const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30%;
  width: 100%;
`;

const ChatItem = styled.div`
  cursor: pointer;
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? "#e0e0e0" : "#f5f5f5")};
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dcdcdc;
  }
`;

export default ChatList;

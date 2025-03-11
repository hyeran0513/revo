import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
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
    const q = query(chatRef, where("participants", "array-contains", user.uid));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
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
      <ChatContainer>
        {chats.map((chat) => (
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

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { fetchUserData } from "./userService";

// 채팅 메시지 실시간 조회
export const fetchMessages = (chatId, setMessages) => {
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("chatId", "==", chatId),
    orderBy("createdAt", "asc")
  );

  // 실시간으로 쿼리 결과의 변경사항을 수신
  return onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};

// 사용자를 포함하는 채팅 조회
export const fetchChatList = (user, setChats) => {
  const chatRef = collection(db, "chats");
  const q = query(chatRef, where("participants", "array-contains", user.uid));

  return onSnapshot(q, async (snapshot) => {
    // 모든 채팅 문서를 비동기적으로 처리
    const chatData = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const chat = { id: doc.id, ...doc.data() };

        // 다른 참가자의 ID를 찾음
        const otherParticipant = chat.participants.find(
          (participant) => participant !== user.uid
        );

        // 다른 참가자의 정보 조회
        const otherUserInfo = otherParticipant
          ? await fetchUserData(otherParticipant)
          : null;

        return { ...chat, otherUserInfo };
      })
    );

    setChats(chatData);
  });
};

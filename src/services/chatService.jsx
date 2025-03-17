import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

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

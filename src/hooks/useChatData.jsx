import { useState, useEffect } from "react";
import { fetchMessages } from "../services/chatService";

// 채팅 메시지 실시간 조회
export const useChatData = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = fetchMessages(chatId, setMessages);

    // 컴포넌트가 언마운트 될 때 구독 해제
    return () => unsubscribe();
  }, [chatId]);

  return messages;
};

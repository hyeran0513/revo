import { useState, useEffect } from "react";
import { fetchChatList, fetchMessages } from "../services/chatService";

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

// 사용자를 포함하는 채팅 조회
export const useChatList = (user) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchChatList(user, (chatData) => {
      setChats(chatData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { chats, loading };
};

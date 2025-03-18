import { useState, useEffect } from "react";
import {
  fetchChatForm,
  fetchChatList,
  fetchMessages,
} from "../services/chatService";
import { useMutation } from "@tanstack/react-query";

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

// 채팅 폼 제출
export const useChatForm = (userId, chatId, newMessage, setNewMessage) => {
  return useMutation({
    mutationFn: async () => fetchChatForm(userId, chatId, newMessage),
    onSuccess: () => {
      // 메시지 입력 필드 초기화
      setNewMessage("");
    },
    onError: (error) => {
      console.error("메시지 전송 실패:", error.message);

      // 메시지 입력 필드 초기화
      setNewMessage("");
    },
  });
};

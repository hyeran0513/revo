import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BiSend } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";

const ChatForm = ({ chatId }) => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  // 메시지를 Firestore에 추가
  const sendMessage = useMutation({
    mutationFn: async () => {
      if (newMessage.trim() === "") return;

      const messagesRef = collection(db, "messages");

      // 메시지를 Firestore에 추가
      await addDoc(messagesRef, {
        chatId,
        senderId: user.uid,
        text: newMessage,
        createdAt: new Date(),
      });

      // 메시지 입력 필드 초기화
      setNewMessage("");
    },
    onSuccess: () => {
      console.log("메시지 전송 성공");
    },
    onError: (error) => {
      console.error("메시지 전송 실패:", error);
    },
  });

  // 키보드에서 Enter 키를 누르면 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      sendMessage.mutate();
    }
  };

  return (
    <FormContainer>
      <FormField>
        <InputField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지 입력..."
          onKeyDown={handleKeyDown}
        />
      </FormField>
      <FormButton type="button" onClick={() => sendMessage.mutate()}>
        <BiSend /> 전송
      </FormButton>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const FormField = styled.div`
  flex: 1;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px 0 0 4px;
  overflow: hidden;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 14px;
  background-color: ${(props) => props.theme.inputs.background};
`;

const FormButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0 20px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export default ChatForm;

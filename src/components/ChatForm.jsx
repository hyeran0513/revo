import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ChatForm = ({ chatId }) => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    const messagesRef = collection(db, "messages");

    await addDoc(messagesRef, {
      chatId,
      senderId: user.uid,
      text: newMessage,
      createdAt: new Date(),
    });

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
      <FormButton type="button" onClick={sendMessage}>
        전송
      </FormButton>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #d7d7d7;
`;

const FormField = styled.div`
  flex: 1;
  height: 40px;
  border: 1px solid #d7d7d7;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 14px;
`;

const FormButton = styled.button`
  padding: 0 20px;
  height: 40px;
  background-color: #13c2c2;
  color: white;
  border: none;

  &:hover {
    background-color: #36cfc9;
  }
`;

export default ChatForm;

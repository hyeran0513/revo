import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import styled from "styled-components";

const MessageForm = ({ scroll, receivedId, productId }) => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  const chatId =
    user.uid < receivedId
      ? `${user.uid}_${receivedId}`
      : `${receivedId}_${user.uid}`;

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("메세지가 유효하지 않습니다.");
      return;
    }

    await addDoc(collection(db, "messages"), {
      chatId,
      text: message,
      createdAt: serverTimestamp(),
      productId,
      receivedId,
      senderId: user.uid,
    });

    setMessage("");

    scroll.current.scrollIntoView({ behavior: "smooth" }); // 채팅 창 스크롤
  };
  return (
    <FormContainer onSubmit={(event) => sendMessage(event)}>
      <FormField>
        <InputField
          id="messageInput"
          name="messageInput"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormField>

      <FormButton type="submit">
        <BiSend />
        <span>전송</span>
      </FormButton>
    </FormContainer>
  );
};

const FormContainer = styled.form`
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

export default MessageForm;

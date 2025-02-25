import React, { useEffect, useRef, useState } from "react";
import Message from "../../components/Message";
import MessageForm from "../../components/MessageForm";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import styled from "styled-components";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, []);

  return (
    <ChatContainer>
      <div>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <MessageForm scroll={scroll} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export default Chat;

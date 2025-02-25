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
    <main>
      <div>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <MessageForm scroll={scroll} />
    </main>
  );
};

export default Chat;

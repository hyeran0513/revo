import React, { useEffect, useRef, useState } from "react";
import Message from "../../components/Message";
import MessageForm from "../../components/MessageForm";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [sellerId, setSellerId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigator = useNavigate();

  const scroll = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, "products", id));

      if (productDoc.exists()) {
        setSellerId(productDoc.data().sellerId);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!sellerId) return;

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];

      QuerySnapshot.forEach((doc) => {
        const message = doc.data();

        if (
          (message.senderId === user.uid || message.receivedId === sellerId) &&
          message.productId === id
        ) {
          messages.push({ ...message, id: doc.id });
        }
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [user.uid, sellerId]);

  return (
    <ChatContainer>
      <MessageContainer>
        {messages?.map((message) => (
          <Message key={message.id} message={message} userId={user.uid} />
        ))}
      </MessageContainer>
      <span ref={scroll}></span>
      <MessageForm scroll={scroll} receivedId={sellerId} productId={id} />

      <button type="button" onClick={() => navigator(`/product/${id}`)}>
        뒤로가기
      </button>
    </ChatContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChatContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export default Chat;

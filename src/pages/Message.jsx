import React, { useState } from "react";
import MessageBox from "../components/MessageBox";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import MessageList from "../components/MessageList";

const fetchMessages = async () => {
  const messageRef = await getDocs(collection(db, "messages"));
  const messages = messageRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const productIds = [...new Set(messages.map((message) => message.productId))];

  return productIds;
};

const Message = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const {
    data: productIds = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading messages!</div>;

  return (
    <MessageWrapper>
      <MessageList
        productIds={productIds}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
      />

      {selectedProductId && <MessageBox productId={selectedProductId} />}
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin: 0 auto;
  max-width: 1200px;
`;

export default Message;

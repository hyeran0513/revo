import React, { useState } from "react";
import MessageBox from "../components/MessageBox";
import styled from "styled-components";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import MessageList from "../components/MessageList";

const fetchUser = async (uid) => {
  if (!uid) return "알 수 없는 사용자";
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data().username : "알 수 없는 사용자";
};

const fetchMessages = async () => {
  const messageRef = await getDocs(collection(db, "messages"));
  const messages = messageRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return messages;
};

const fetchProductTitle = async (productId) => {
  if (!productId) return "알 수 없는 상품";
  const productDoc = await getDoc(doc(db, "products", productId));
  return productDoc.exists() ? productDoc.data().title : "알 수 없는 상품";
};

const Message = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const {
    data: messages = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  const { data: users = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const uniqueUserIds = new Set();
      messages.forEach(({ senderId, receivedId }) => {
        uniqueUserIds.add(senderId);
        uniqueUserIds.add(receivedId);
      });

      const usersData = {};
      await Promise.all(
        Array.from(uniqueUserIds).map(async (uid) => {
          usersData[uid] = await fetchUser(uid);
        })
      );

      return usersData;
    },
    enabled: messages.length > 0,
  });

  const { data: productTitles = {} } = useQuery({
    queryKey: ["productTitles"],
    queryFn: async () => {
      const uniqueProductIds = new Set(
        messages.map(({ productId }) => productId)
      );
      const productData = {};
      await Promise.all(
        Array.from(uniqueProductIds).map(async (productId) => {
          productData[productId] = await fetchProductTitle(productId);
        })
      );
      return productData;
    },
    enabled: messages.length > 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const productDataMap = new Map();
  messages.forEach(({ productId, receivedId, senderId }) => {
    const key = `${receivedId}-${senderId}`;
    if (!productDataMap.has(key)) {
      productDataMap.set(key, {
        productId,
        productTitle: productTitles[productId] || "알 수 없는 상품",
        receivedUsername: users[receivedId] || "알 수 없는 사용자",
        senderUsername: users[senderId] || "알 수 없는 사용자",
        receivedId,
        senderId,
      });
    }
  });

  const productData = Array.from(productDataMap.values());

  // 선택된 메시지의 관련 데이터를 찾기
  const selectedProductData = productData.find(
    (data) => data.productId === selectedProductId
  );

  return (
    <MessageWrapper>
      <MessageList
        productData={productData}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
      />
      {selectedProductData ? (
        <MessageBox
          productId={selectedProductId}
          receiveName={selectedProductData.receivedUsername}
          sendName={selectedProductData.senderUsername}
          receivedId={selectedProductData.receivedId}
          senderId={selectedProductData.senderId}
        />
      ) : (
        <>메시지를 선택해 주세요.</>
      )}
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

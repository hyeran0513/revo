import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import LikeButton from "../../components/LikeButton";
import styled from "styled-components";
import Button from "../../components/Button";

const fetchProduct = async (id) => {
  const productDoc = await getDoc(doc(db, "products", id));
  return productDoc.exists()
    ? { id: productDoc.id, ...productDoc.data() }
    : null;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [chatId, setChatId] = useState(null);

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!product || !user) return;

    const fetchChat = async () => {
      const chatRef = collection(db, "chats");
      const q = query(
        chatRef,
        where("participants", "array-contains", user.uid)
      );
      const querySnapshot = await getDocs(q);

      let existingChat = null;
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.participants.includes(product.sellerId)) {
          existingChat = doc.id;
        }
      });

      if (!existingChat) {
        // 새로운 채팅방 생성
        const newChat = {
          participants: [user.uid, product.sellerId],
          createdAt: new Date(),
        };

        const docRef = await addDoc(chatRef, newChat);
        setChatId(docRef.id);
      } else {
        setChatId(existingChat);
      }
    };

    fetchChat();
  }, [product, user]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <ProductContainer>
      <h1>{product?.title}</h1>
      <p>상품 ID: {product?.id}</p>
      <p>제목: {product?.title}</p>
      <p>설명: {product?.description}</p>
      <p>sellerId: {product?.sellerId}</p>

      {user && <LikeButton productId={id} userId={user.uid} />}

      {user.uid === product.sellerId ? (
        <Button
          type="button"
          onClick={() => navigate(`/product/${id}/edit?type=${type}`)}
        >
          수정하기
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => navigate(`/chatroom?chatId=${chatId}`)}
        >
          채팅하기
        </Button>
      )}

      {type === "undefined" ? (
        <Button type="button" onClick={() => navigate(-1)}>
          뒤로 가기
        </Button>
      ) : (
        <Button type="button" onClick={() => navigate(`/product?type=${type}`)}>
          목록으로
        </Button>
      )}
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export default ProductDetail;

import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
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

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <ProductContainer>
      <h1>{product?.title}</h1>
      <p>상품 ID: {product?.id}</p>
      <p>제목: {product?.title}</p>
      <p>설명: {product?.description}</p>

      {user && <LikeButton productId={id} userId={user.uid} />}

      <Button
        type="button"
        onClick={() => navigate(`/product/${id}/edit?type=${type}`)}
      >
        수정하기
      </Button>

      <Button type="button" onClick={() => navigate(`/product?type=${type}`)}>
        목록으로
      </Button>

      <Button
        type="button"
        onClick={() => navigate(`/product/${id}/chat?type=${type}`)}
      >
        채팅하기
      </Button>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export default ProductDetail;

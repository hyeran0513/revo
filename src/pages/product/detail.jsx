import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import LikeButton from "../../components/LikeButton";

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
    <div>
      <h1>{product?.title}</h1>
      <p>상품 ID: {product?.id}</p>
      <p>제목: {product?.title}</p>

      {user && <LikeButton productId={id} userId={user.uid} />}

      <button type="button" onClick={() => navigate(`/product/${id}/edit`)}>
        수정하기
      </button>

      <button type="button" onClick={() => navigate("/product")}>
        목록보기
      </button>

      <button type="button" onClick={() => navigate(`/product/${id}/chat`)}>
        채팅하기
      </button>
    </div>
  );
};

export default ProductDetail;

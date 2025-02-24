import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const fetchProduct = async (id) => {
  const productDoc = await getDoc(doc(db, "products", id));

  if (productDoc.exists()) {
    return productDoc.data();
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div>
      <h1>{product?.title}</h1>
      <p>상품 ID: {product?.productId}</p>
      <p>제목: {product?.title}</p>

      <button type="button" onClick={() => navigate("/product")}>
        목록보기
      </button>
    </div>
  );
};

export default ProductDetail;

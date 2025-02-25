import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LikeButton from "../../components/LikeButton";

const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Product = () => {
  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <button type="button" onClick={() => navigate("/product/add")}>
        상품 추가하기
      </button>

      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h1>{product?.title}</h1>
              <p>상품 ID: {product?.id}</p>
              <p>제목: {product?.title}</p>
            </Link>
            {user && <LikeButton productId={product.id} userId={user.uid} />}
          </div>
        ))
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </div>
  );
};

export default Product;

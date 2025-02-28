import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";

const fetchProducts = async (type) => {
  const q = query(collection(db, "products"), where("category", "==", type));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Product = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", type],
    queryFn: () => fetchProducts(type),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <ProductContainer>
      <ProductList>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} type={type} />
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </ProductList>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export default Product;

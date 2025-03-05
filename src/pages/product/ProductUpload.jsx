import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import styled from "styled-components";

const fetchProducts = async (uid) => {
  const q = query(collection(db, "products"), where("sellerId", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const ProductUpload = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", user.uid],
    queryFn: () => fetchProducts(user.uid),
  });

  return (
    <ProductUploadWrapper>
      <ProductList>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductList>
    </ProductUploadWrapper>
  );
};

const ProductUploadWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

export default ProductUpload;

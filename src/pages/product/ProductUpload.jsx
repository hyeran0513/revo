import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product/ProductCard";
import styled from "styled-components";
import SubBanner from "../../components/base/SubBanner";
import { useSellerProductsData } from "../../hooks/useProductData";

const ProductUpload = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: products = [], error, isLoading } = useSellerProductsData(user);

  return (
    <>
      <SubBanner text="업로드한 상품 조회" />

      <ProductUploadWrapper>
        <ProductList>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ProductList>
      </ProductUploadWrapper>
    </>
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

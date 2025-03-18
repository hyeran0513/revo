import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product/ProductCard";
import styled from "styled-components";
import SubBanner from "../../components/base/SubBanner";
import { useSellerProductsData } from "../../hooks/useProductData";
import Loading from "../../components/common/Loading";

const ProductUpload = () => {
  const { user } = useSelector((state) => state.auth);

  // 업로드한 상품 조회
  const { data: products = [], isLoading, error } = useSellerProductsData(user);

  const breadcrumb = [
    { link: "/", text: "홈" },
    { link: "/product/upload", text: "업로드한 상품 조회" },
  ];

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <>
      {/* 서브 배너 */}
      <SubBanner bannerText="업로드한 상품 조회" breadcrumb={breadcrumb} />

      {/* 업로드한 상품 목록 */}
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

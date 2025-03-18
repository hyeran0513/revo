import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/product/ProductCard";
import NoData from "../../components/common/NoData";
import SubBanner from "../../components/base/SubBanner";
import SideFilter from "../../components/product/SideFilter";
import { useFilteredProductsData } from "../../hooks/useProductData";
import Loading from "../../components/common/Loading";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [filter, setFilter] = useState({
    condition: "",
    minPrice: "",
    maxPrice: "",
  });

  const {
    data: products,
    error,
    isLoading,
  } = useFilteredProductsData(type, filter);

  const handleSetFilter = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  const typeText = {
    mobile: "모바일",
    tablet: "태블릿",
    pc: "PC",
    monitor: "모니터",
    audio: "스피커",
    camera: "카메라",
    other: "기타",
  };

  const breadcrumb = [
    { link: "/", text: "홈" },
    { link: `/products?type=${type}`, text: `${typeText[type]}` },
  ];

  if (isLoading) return <Loading />;
  if (error) return <>{error.message}</>;

  return (
    <ProductWrapper>
      {/* 서브 배너 */}
      <SubBanner bannerText={typeText[type]} breadcrumb={breadcrumb} />

      <ProductContainer>
        {/* 필터 영역 */}
        <SideFilter setFilter={handleSetFilter} />

        {/* 상품 목록 영역 */}
        <ProductListWrapper>
          {products.length > 0 ? (
            <ProductListContainer>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} type={type} />
              ))}
            </ProductListContainer>
          ) : (
            <NoData text="상품이 없습니다." icon="shoppingbag" />
          )}
        </ProductListWrapper>
      </ProductContainer>
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div``;

const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 1200px;
`;

const ProductListWrapper = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
`;

const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export default ProductList;

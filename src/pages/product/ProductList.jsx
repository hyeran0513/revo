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
    price: "",
  });

  const {
    data: products = [],
    isLoading,
    error,
  } = useFilteredProductsData(type, filter);

  const typeText = {
    mobile: "모바일",
    tablet: "태블릿",
    pc: "PC",
    monitor: "모니터",
    audio: "스피커",
    camera: "카메라",
    other: "기타",
  };

  if (isLoading) return <Loading />;

  return (
    <ProductWrapper>
      <SubBanner text={typeText[type]} />

      <ProductContainer>
        <SideFilter setFilter={setFilter} filter={filter} />

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
  min-height: 1200px;
`;

const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export default ProductList;

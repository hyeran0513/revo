import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";
import NoData from "../../components/NoData";
import SubBanner from "../../components/SubBanner";
import SideFilter from "../../components/SideFilter";

const fetchProducts = async (type) => {
  const q = query(collection(db, "products"), where("category", "==", type));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Product = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const condition = searchParams.get("condition");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", type, condition, minPrice, maxPrice],
    queryFn: () => fetchProducts(type, condition, minPrice, maxPrice),
  });

  const typeText = {
    mobile: "모바일",
    tablet: "태블릿",
    pc: "PC",
    monitor: "모니터",
    audio: "스피커",
    camera: "카메라",
    other: "기타",
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <ProductWrapper>
      <SubBanner text={typeText[type]} />

      <ProductContainer>
        <SideFilter />

        <ProductListWrapper>
          {products.length > 0 ? (
            <ProductList>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} type={type} />
              ))}
            </ProductList>
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
  height: 1000px;
  width: 100%;
  min-width: 0;
  flex: 1;
  min-height: 1200px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export default Product;

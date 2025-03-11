import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/product/ProductCard";
import NoData from "../../components/common/NoData";
import SubBanner from "../../components/base/SubBanner";
import SideFilter from "../../components/product/SideFilter";

const fetchProducts = async (type, filter) => {
  // 조건 저장 배열
  const conditions = [];

  // 필터에 condition 값이 있을 경우 조건에 추가
  if (filter.condition) {
    conditions.push(where("condition", "==", filter.condition));
  }

  // 가격으로 정렬할지 여부를 결정하는 변수
  let useOrderByPrice = false;

  // 가격 필터가 있을 경우
  if (filter.price) {
    if (filter.price === "other") {
      conditions.push(where("price", ">=", 100000));

      // 가격으로 정렬
      useOrderByPrice = true;
    } else {
      // 필터로 전달된 가격 값를 정수 값으로 설정
      const priceValue = parseInt(filter.price);

      if (!isNaN(priceValue)) {
        conditions.push(where("price", "<=", priceValue));

        // 가격으로 정렬
        useOrderByPrice = true;
      }
    }
  }

  // 쿼리
  let q = query(
    collection(db, "products"),
    where("category", "==", type),
    ...conditions
  );

  // 가격으로 정렬할 경우, 가격 기준으로 정렬하는 쿼리 추가
  if (useOrderByPrice) {
    q = query(q, orderBy("price"));
  }

  // Firestore에서 쿼리 실행 후 결과 반환
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Product = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [filter, setFilter] = useState({
    condition: "",
    price: "",
  });

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", type, filter],
    queryFn: () => fetchProducts(type, filter),
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

  // if (isLoading) return <div>로딩 중...</div>;
  // if (error) return <div>{error.message}</div>;

  return (
    <ProductWrapper>
      <SubBanner text={typeText[type]} />

      <ProductContainer>
        <SideFilter setFilter={setFilter} filter={filter} />

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

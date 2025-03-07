import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";
import NoData from "../../components/NoData";
import SubBanner from "../../components/SubBanner";
import SideFilter from "../../components/SideFilter";

const fetchProducts = async (type, filter) => {
  const conditions = [];

  if (filter.condition) {
    conditions.push(where("condition", "==", filter.condition));
  }

  let useOrderByPrice = false;

  if (filter.price) {
    if (filter.price === "other") {
      conditions.push(where("price", ">=", 100000));
      useOrderByPrice = true;
    } else {
      const priceValue = parseInt(filter.price);
      if (!isNaN(priceValue)) {
        conditions.push(where("price", "<=", priceValue));
        useOrderByPrice = true;
      }
    }
  }

  let q = query(
    collection(db, "products"),
    where("category", "==", type),
    ...conditions
  );

  if (useOrderByPrice) {
    q = query(q, orderBy("price"));
  }

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

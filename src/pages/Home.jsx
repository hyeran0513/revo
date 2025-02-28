import React from "react";
import UserProfile from "../components/UserProfile";
import styled from "styled-components";
import SwiperComponent from "../components/SwiperComponent";
import useProductData from "../hooks/useProductData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: products = [], error, isLoading } = useProductData("mobile");
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <UserProfile />

      <Section>
        <SectionTop>
          <SectionTitle>모바일</SectionTitle>
          <MoreBtn onClick={() => navigate("/product?type=mobile")}>
            더 보기
          </MoreBtn>
        </SectionTop>

        <SwiperComponent products={products} />
      </Section>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const Section = styled.section``;

const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 18px;
`;

const MoreBtn = styled.button``;

export default Home;

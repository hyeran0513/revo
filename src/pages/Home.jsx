import React from "react";
import styled from "styled-components";
import SwiperComponent from "../components/SwiperComponent";
import useProductData from "../hooks/useProductData";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";

const Home = () => {
  const { data: products = [], error, isLoading } = useProductData("mobile");
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <Banner />

      <Section>
        <SectionTop>
          <SectionTitle>모바일</SectionTitle>
          <MoreBtn onClick={() => navigate("/products?type=mobile")}>
            더 보기
          </MoreBtn>
        </SectionTop>

        <SwiperComponent products={products} />
      </Section>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div``;

const Section = styled.section`
  margin: 0 auto 20px;
  padding: 30px 0;
  max-width: 1200px;
`;

const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h1`
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const MoreBtn = styled.button`
  background-color: inherit;
  color: ${(props) => props.theme.colors.primary};
`;

export default Home;

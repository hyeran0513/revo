import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerText>
        <BannerTitle>REVO</BannerTitle>
        <BannerSubTitle>
          합리적인 가격의 중고 상품을 만나보세요
          <br />
          <strong>REVO</strong>에서 지금 바로 확인해 보세요
        </BannerSubTitle>
      </BannerText>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  position: relative;
  height: 500px;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("/banner.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

const BannerText = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
`;

const BannerTitle = styled.div`
  font-size: 70px;
  font-weight: bold;
`;

const BannerSubTitle = styled.div`
  font-size: 20px;
`;

export default Banner;

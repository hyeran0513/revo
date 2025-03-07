import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerContainer>
        <BannerText>
          <BannerTitle>
            가치 있는 소비
            <br /> REVO에서
          </BannerTitle>
          <BannerSubTitle>
            합리적인 가격의 중고 상품을 만나보세요
            <br />
            <strong>REVO</strong>에서 지금 바로 확인해 보세요
          </BannerSubTitle>
        </BannerText>
      </BannerContainer>
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
    background-image: url("/banner_bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

const BannerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;

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

const BannerText = styled.div``;

const BannerTitle = styled.div`
  margin-bottom: 20px;
  line-height: 1.2;
  font-size: 60px;
  font-weight: bold;
  color: #fff;
`;

const BannerSubTitle = styled.div`
  font-size: 20px;
  color: #fff;
`;

export default Banner;

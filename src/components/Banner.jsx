import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerWrapper>
      <SiteIntro>
        <SiteName>
          <SiteTitle>REVO</SiteTitle>
        </SiteName>
        <SiteDescription>
          합리적인 가격의 중고 상품을 만나보세요
        </SiteDescription>
      </SiteIntro>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  height: 300px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.primary};
    opacity: 0.2;
  }
`;

const SiteIntro = styled.div`
  text-align: center;
`;

const SiteName = styled.div`
  position: relative;
  font-size: 60px;
  font-weight: bold;

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    width: 100%;
    height: 20px;
    background-color: ${(props) => props.theme.colors.primary};
    z-index: 0;
  }
`;

const SiteTitle = styled.div`
  position: relative;
  z-index: 10;
`;

const SiteDescription = styled.div``;

export default Banner;

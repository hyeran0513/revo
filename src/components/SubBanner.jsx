import React from "react";
import styled from "styled-components";

const SubBanner = ({ text }) => {
  return (
    <SubBannerWrapper>
      <SubBannerText>{text}</SubBannerText>
    </SubBannerWrapper>
  );
};

const SubBannerWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
  height: 200px;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("/subbanner.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

const SubBannerText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 50px;
  font-weight: bold;
`;

export default SubBanner;

import React from "react";
import styled from "styled-components";
import Breadcrumb from "./Breadcrumb";

const SubBanner = ({ text }) => {
  return (
    <SubBannerWrapper>
      <SubBannerText>{text}</SubBannerText>
      <Breadcrumb />
    </SubBannerWrapper>
  );
};

const SubBannerWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`;

const SubBannerText = styled.div`
  margin: 0 auto 20px;
  max-width: 1200px;
  font-size: 40px;
  font-weight: bold;
`;

export default SubBanner;

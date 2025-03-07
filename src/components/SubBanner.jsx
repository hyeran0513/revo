import React from "react";
import styled from "styled-components";
import Breadcrumb from "./Breadcrumb";

const SubBanner = ({ text }) => {
  return (
    <SubBannerWrapper>
      <SubBannerContainer>
        <SubBannerText>{text}</SubBannerText>
      </SubBannerContainer>
      <Breadcrumb text={text} />
    </SubBannerWrapper>
  );
};

const SubBannerWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`;

const SubBannerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 150px;
  background-color: ${(props) => props.theme.colors.light};
  color: #333;
`;

const SubBannerText = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

export default SubBanner;

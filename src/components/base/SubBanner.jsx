import React from "react";
import styled from "styled-components";
import Breadcrumb from "../common/Breadcrumb";

const SubBanner = ({ bannerText, breadcrumb }) => {
  return (
    <SubBannerWrapper>
      <SubBannerContainer>
        <SubBannerText>{bannerText}</SubBannerText>
      </SubBannerContainer>

      <Breadcrumb breadcrumb={breadcrumb} />
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

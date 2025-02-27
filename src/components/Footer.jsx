import React from "react";
import styled from "styled-components";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <CopyRight>© {currentYear} All rights reserved. Kim Hyeran</CopyRight>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  border-top: 1px solid #d7d7d7;
`;

const CopyRight = styled.p`
  color: #999;
  font-size: 12px;
`;

export default Footer;

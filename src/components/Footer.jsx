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
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const CopyRight = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
`;

export default Footer;

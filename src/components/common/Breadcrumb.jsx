import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Breadcrumb = ({ breadcrumb }) => {
  return (
    <BreadcrumbWrapper>
      <BreadContainer>
        {breadcrumb.map((item) => (
          <BreadcrumbLink to={item.link}>
            {item.text === "홈" ? <BiHomeAlt /> : `${item.text}`}
          </BreadcrumbLink>
        ))}
      </BreadContainer>
    </BreadcrumbWrapper>
  );
};

const BreadcrumbWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const BreadContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: 40px;
  border-left: 1px solid ${(props) => props.theme.colors.border};
`;

const BreadcrumbLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.text : props.theme.colors.secondary};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  padding: 0 20px;
  height: 100%;
`;

export default Breadcrumb;

import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";

const Breadcrumb = ({ text }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <BreadcrumbWrapper>
      <BreadContainer>
        <BreadcrumbLink to="/">
          <BiHomeAlt />
        </BreadcrumbLink>

        <BreadcrumbLink to={`/products?type=${type}`} $isActive>
          {text}
        </BreadcrumbLink>
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
  color: ${(props) => (props.$isActive ? "#333" : "#999")};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  padding: 0 20px;
  height: 100%;

  &.active {
    font-weight: bold;
    color: #333;
  }
`;

export default Breadcrumb;

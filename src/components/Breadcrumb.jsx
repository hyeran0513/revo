import React from "react";
import { BiChevronRight } from "react-icons/bi";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";

const typeText = {
  mobile: "모바일",
  tablet: "태블릿",
  pc: "PC",
  monitor: "모니터",
  audio: "스피커",
  camera: "카메라",
  other: "기타",
};

const Breadcrumb = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <BreadcrumbWrapper>
      <BreadcrumbLink to="/">홈</BreadcrumbLink>

      <BiChevronRight />

      <BreadcrumbLink to={`/products?type=${type}`} isActive>
        {typeText[type]}
      </BreadcrumbLink>
    </BreadcrumbWrapper>
  );
};

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const BreadcrumbLink = styled(Link)`
  color: ${(props) => (props.isActive ? "#333" : "#999")};

  &.active {
    font-weight: bold;
    color: #333;
  }
`;

export default Breadcrumb;

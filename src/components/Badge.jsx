import React from "react";
import styled from "styled-components";

const Badge = ({ text }) => {
  return <BadgeItem>{text}</BadgeItem>;
};

const BadgeItem = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 30px;
  font-size: 12px;
`;

export default Badge;

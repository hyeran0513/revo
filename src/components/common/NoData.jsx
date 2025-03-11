import React from "react";
import { BiMailSend, BiShoppingBag, BiHeart } from "react-icons/bi"; // Add more icons here
import styled from "styled-components";

const iconMap = {
  mail: <BiMailSend />,
  shoppingbag: <BiShoppingBag />,
  heart: <BiHeart />,
};

const NoData = ({ text, icon }) => {
  return (
    <NoDataWrapper>
      {iconMap[icon]}
      <Text>{text}</Text>
    </NoDataWrapper>
  );
};

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding: 40px;
  width: 100%;
  height: 100%;

  svg {
    font-size: 40px;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const Text = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.secondary};
`;

export default NoData;

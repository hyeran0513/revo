import React from "react";
import styled from "styled-components";

const MessageList = ({
  productIds,
  selectedProductId,
  setSelectedProductId,
}) => {
  return (
    <MessageListWrapper>
      {productIds.map((productId, index) => (
        <ProductItem
          key={index}
          onClick={() => setSelectedProductId(productId)}
          $isSelected={productId === selectedProductId}
        >
          {productId}
        </ProductItem>
      ))}
    </MessageListWrapper>
  );
};

const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30%;
  width: 100%;
`;

const ProductItem = styled.div`
  cursor: pointer;
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? "#e0e0e0" : "#f5f5f5")};
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dcdcdc;
  }
`;

export default MessageList;

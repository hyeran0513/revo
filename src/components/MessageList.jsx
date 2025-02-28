import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MessageList = ({
  productData,
  selectedProductId,
  setSelectedProductId,
}) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <MessageListWrapper>
      {productData.map((product, index) => (
        <ProductItem
          key={index}
          onClick={() => setSelectedProductId(product.productId)}
          $isSelected={product.productId === selectedProductId}
        >
          {product.senderId === user.uid && (
            <>{product.receivedUsername}님과의 채팅</>
          )}
          {product.receivedId === user.uid && (
            <>{product.senderUsername}님과의 채팅</>
          )}
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

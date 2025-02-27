import React from "react";
import { BiSolidImageAlt } from "react-icons/bi";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatNumber } from "../utils/format";

const ProductCard = ({ product, type }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ProductItem key={product.id}>
      <Link to={`/product/${product.id}?type=${type}`}>
        <ProductTop>
          <LikeButtonWrapper>
            {user && <LikeButton productId={product.id} userId={user.uid} />}
          </LikeButtonWrapper>

          {product.image ? (
            <ProductThumb>
              <img src="" />
            </ProductThumb>
          ) : (
            <ProductThumbDefault>
              <BiSolidImageAlt />
            </ProductThumbDefault>
          )}
        </ProductTop>

        <ProductInfo>
          <ProductTitle>{product?.title}</ProductTitle>
          <ProductPrice>{formatNumber(product?.price)}원</ProductPrice>
        </ProductInfo>
      </Link>
    </ProductItem>
  );
};

const ProductItem = styled.div``;

const ProductTop = styled.div`
  position: relative;
`;

const LikeButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const ProductThumb = styled.div`
  border: 1px solid #333;
  border-radius: 10px;
  aspect-ratio: 1 / 1;
`;

const ProductThumbDefault = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  aspect-ratio: 1 / 1;
  background-color: #eee;

  svg {
    font-size: 60px;
    fill: #dcdcdc;
  }
`;

const ProductInfo = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const ProductTitle = styled.h1``;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #e02020;
`;

export default ProductCard;

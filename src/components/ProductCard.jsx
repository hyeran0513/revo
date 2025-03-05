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
              <img src={product.image} />
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
  border-radius: 10px;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductThumbDefault = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  aspect-ratio: 1 / 1;
  background-color: ${(props) => props.theme.thumb.background};

  svg {
    font-size: 60px;
    fill: ${(props) => props.theme.thumb.icon};
  }
`;

const ProductInfo = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const ProductTitle = styled.h1``;

const ProductPrice = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.accent};
`;

export default ProductCard;

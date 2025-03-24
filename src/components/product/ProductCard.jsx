import React from "react";
import { BiSolidImageAlt } from "react-icons/bi";
import LikeButton from "../common/LikeButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatNumber } from "../../utils/format";
import Badge from "../common/Badge";

const ProductCard = ({ product, type }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ProductItem key={product.id}>
      <Link to={`/product/${product.id}?type=${type}`}>
        <ProductTop>
          <LikeButtonWrapper>
            {user && <LikeButton productId={product.id} userId={user.uid} />}
          </LikeButtonWrapper>

          {product.images.length > 0 ? (
            <ProductThumb>
              <img src={product.images[0]} alt={product.name} />
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
          <Badge
            text={product?.condition === "new" ? "새 상품" : "중고 상품"}
          />
        </ProductInfo>
      </Link>
    </ProductItem>
  );
};

const ProductTop = styled.div`
  position: relative;
`;

const LikeButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`;

const ProductThumb = styled.div`
  border-radius: 10px;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-in-out;
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
`;

const ProductTitle = styled.h1``;

const ProductPrice = styled.div`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
`;

const ProductItem = styled.div`
  &:hover {
    ${ProductThumb} img {
      transform: scale(1.2);
    }
  }
`;

export default ProductCard;

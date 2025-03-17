import styled from "styled-components";
import ProductCard from "../../components/product/ProductCard";
import SubBanner from "../../components/base/SubBanner";
import Loading from "../../components/common/Loading";
import { useProductsData } from "../../hooks/useProductData";
import { useFavoriteData } from "../../hooks/useFavoriteData";

const Favorite = () => {
  const {
    data: productIds,
    isLoading: loadingFavorites,
    error: errorFavorites,
  } = useFavoriteData();

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useProductsData(productIds);

  if (loadingFavorites || loadingProducts) {
    return <Loading />;
  }

  if (errorFavorites || errorProducts) {
    return <p>{errorFavorites?.message || errorProducts?.message}</p>;
  }

  return (
    <>
      <SubBanner text="찜 목록" />
      <ProductContainer>
        <ProductList>
          {products?.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>좋아하는 항목이 없습니다.</p>
          )}
        </ProductList>
      </ProductContainer>
    </>
  );
};

const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export default Favorite;

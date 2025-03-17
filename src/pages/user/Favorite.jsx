import styled from "styled-components";
import ProductCard from "../../components/product/ProductCard";
import SubBanner from "../../components/base/SubBanner";
import Loading from "../../components/common/Loading";
import { useProductsData } from "../../hooks/useProductData";
import { useFavoriteData } from "../../hooks/useFavoriteData";

const Favorite = () => {
  // 찜한 상품 아이디 조회
  const {
    data: productIds,
    isLoading: loadingFavorites,
    error: errorFavorites,
  } = useFavoriteData();

  // 상품 아이디로 상품 데이터 조회
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useProductsData(productIds);

  // 로딩
  if (loadingFavorites || loadingProducts) {
    return <Loading />;
  }

  // 에러
  if (errorFavorites || errorProducts) {
    return <p>{errorFavorites?.message || errorProducts?.message}</p>;
  }

  return (
    <>
      {/* 서브 배너 */}
      <SubBanner text="찜 목록" />

      {/* 상품 목록 */}
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

import styled from "styled-components";
import ProductCard from "../../components/product/ProductCard";
import SubBanner from "../../components/base/SubBanner";
import Loading from "../../components/common/Loading";
import { useFavoriteProduct } from "../../hooks/useFavoriteData";
import { useSelector } from "react-redux";
import NoData from "../../components/common/NoData";

const Favorite = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: products, isLoading } = useFavoriteProduct(user?.uid);

  const breadcrumb = [
    { link: "/", text: "홈" },
    { link: "/favorite", text: "찜 목록" },
  ];

  if (isLoading) return <Loading />;

  return (
    <>
      {/* 서브 배너 */}
      <SubBanner bannerText="찜 목록" breadcrumb={breadcrumb} />
      {/* 상품 목록 */}
      <ProductContainer>
        {products?.length > 0 ? (
          <ProductList>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductList>
        ) : (
          <NoData text="좋아하는 항목이 없습니다." icon="shoppingbag" />
        )}
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

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, getDoc, doc, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";
import SubBanner from "../../components/SubBanner";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

// 찜 데이터 조회
const fetchFavorites = async (uid) => {
  const favoritesRef = await getDocs(
    collection(db, "likes"),
    where("userId", "==", uid)
  );
  const productIds = favoritesRef.docs.map((doc) => doc.data().productId);
  return productIds;
};

// 상품 데이터 조회
const fetchProducts = async (productIds) => {
  const productPromises = productIds.map((productId) =>
    getDoc(doc(db, "products", productId))
  );
  const productDocs = await Promise.all(productPromises);
  return productDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Favorite = () => {
  const { user } = useSelector((state) => state.auth);

  // 찜 목록을 가져오는 쿼리
  const {
    data: productIds,
    isLoading: loadingFavorites,
    error: errorFavorites,
  } = useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: () => fetchFavorites(user?.uid),
    enabled: !!user?.uid,
  });

  // 상품 데이터를 가져오는 쿼리
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products", productIds],
    queryFn: () => fetchProducts(productIds),
    enabled: productIds?.length > 0,
  });

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

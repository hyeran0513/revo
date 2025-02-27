import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";

const fetchFavorites = async () => {
  const favoritesRef = await getDocs(collection(db, "likes"));
  const productIds = favoritesRef.docs.map((doc) => doc.data().productId);

  return productIds;
};

const fetchProducts = async (productIds) => {
  const productPromises = productIds.map((productId) =>
    getDoc(doc(db, "products", productId))
  );

  const productDocs = await Promise.all(productPromises);

  return productDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Favorite = () => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const fetchedFavorites = await fetchFavorites();
        setProductIds(fetchedFavorites);
      } catch (error) {
        setError(error.message);
      }
    };

    getFavorites();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      if (productIds.length > 0) {
        try {
          const fetchedProducts = await fetchProducts(productIds);
          setProducts(fetchedProducts);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    getProducts();
  }, [productIds]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ProductContainer>
      <ProductList>
        {products.length > 0 ? (
          products.map((product) => <ProductCard product={product} />)
        ) : (
          <p>좋아하는 항목이 없습니다.</p>
        )}
      </ProductList>
    </ProductContainer>
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

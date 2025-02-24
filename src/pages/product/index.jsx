import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
};

const Product = () => {
  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <h1>{product?.title}</h1>
            <p>상품 ID: {product?.id}</p>
            <p>제목: {product?.title}</p>
          </Link>
        ))
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </div>
  );
};

export default Product;

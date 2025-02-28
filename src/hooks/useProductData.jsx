import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const fetchProducts = async (type) => {
  const q = query(collection(db, "products"), where("category", "==", type));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const useProductData = (type) => {
  return useQuery({
    queryKey: ["products", type],
    queryFn: () => fetchProducts(type),
    enabled: !!type,
  });
};

export default useProductData;

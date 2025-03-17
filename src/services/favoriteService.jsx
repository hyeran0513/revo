import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 찜 데이터 조회
export const fetchFavorites = async (uid) => {
  const favoritesRef = await getDocs(
    collection(db, "likes"),
    where("userId", "==", uid)
  );

  const productIds = favoritesRef.docs.map((doc) => doc.data().productId);

  return productIds;
};

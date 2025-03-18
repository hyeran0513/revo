import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { fetchProducts } from "./productService";

// 찜한 상품의 모든 ID 조회
const getWishlistProductIds = async (userId) => {
  if (!userId) {
    return;
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() ? userSnap.data().wishlist : null;
};

// 찜한 상품들 정보 조회
export const getWishlist = async (userId) => {
  const productIds = await getWishlistProductIds(userId);

  return fetchProducts(productIds);
};

// 찜 버튼 제어
export const controlFavorite = async (userId, productId) => {
  const productIds = await getWishlistProductIds(userId);
  const userRef = doc(db, "users", userId);

  try {
    if (productIds.includes(productId)) {
      await updateDoc(userRef, { wishlist: arrayRemove(productId) });
      return "remove";
    } else {
      await updateDoc(userRef, { wishlist: arrayUnion(productId) });
      return "add";
    }
  } catch (error) {
    console.log("찜 버튼 선택 오류: " + error.message);
  }
};

// 찜 목록에 항목 포함 여부
export const checkFavorite = async (userId, productId) => {
  const productIds = await getWishlistProductIds(userId);

  return productIds.includes(productId);
};

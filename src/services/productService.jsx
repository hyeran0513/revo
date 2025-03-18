import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 유형에 따른 상품 데이터 조회
export const fetchTypeForProducts = async (type) => {
  const q = query(collection(db, "products"), where("category", "==", type));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 필터 조건을 기반으로 상품 조회
export const fetchFilteredProducts = async ({ queryKey }) => {
  const [_, type, condition, minPrice, maxPrice] = queryKey;

  const conditions = [];

  // 상품 상태
  if (condition) {
    conditions.push(where("condition", "==", condition));
  }

  // 최소 가격
  if (minPrice) {
    console.log("???minPrice" + minPrice);
    conditions.push(where("price", ">=", Number(minPrice)));
  }

  // 최대 가격
  if (maxPrice) {
    console.log("???maxPrice" + maxPrice);
    conditions.push(where("price", "<=", Number(maxPrice)));
  }

  const q = query(
    collection(db, "products"),
    where("category", "==", type),
    ...conditions
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 판매자에 따른 상품 데이터 조회
export const fetchSellerProducts = async (uid) => {
  const q = query(collection(db, "products"), where("sellerId", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 다수 상품 데이터 조회
export const fetchProducts = async (productIds) => {
  const productPromises = productIds.map((productId) =>
    getDoc(doc(db, "products", productId))
  );

  const productDocs = await Promise.all(productPromises);
  return productDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 상품 추가
export const fetchAddProduct = async (data) => {
  const productRef = doc(collection(db, "products"));
  await setDoc(productRef, { ...data, createdAt: serverTimestamp() });
  return true;
};

// 상품 정보 조회
export const fetchProduct = async (id) => {
  const productDoc = await getDoc(doc(db, "products", id));

  return productDoc.exists()
    ? { id: productDoc.id, ...productDoc.data() }
    : null;
};

// 상품 내용 편집
export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, updatedData);
};

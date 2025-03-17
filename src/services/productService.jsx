import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
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

// 필터링된 상품 데이터 조회
export const fetchFilteredProducts = async (type, filter) => {
  // 조건 저장 배열
  const conditions = [];

  // 필터에 condition 값이 있을 경우 조건에 추가
  if (filter.condition) {
    conditions.push(where("condition", "==", filter.condition));
  }

  // 가격으로 정렬할지 여부를 결정하는 변수
  let useOrderByPrice = false;

  // 가격 필터가 있을 경우
  if (filter.price) {
    if (filter.price === "other") {
      conditions.push(where("price", ">=", 100000));

      // 가격으로 정렬
      useOrderByPrice = true;
    } else {
      // 필터로 전달된 가격 값을 정수 값으로 설정
      const priceValue = parseInt(filter.price);

      if (!isNaN(priceValue)) {
        conditions.push(where("price", "<=", priceValue));

        // 가격으로 정렬
        useOrderByPrice = true;
      }
    }
  }

  // 쿼리
  let q = query(
    collection(db, "products"),
    where("category", "==", type),
    ...conditions
  );

  // 가격으로 정렬할 경우, 가격 기준으로 정렬하는 쿼리 추가
  if (useOrderByPrice) {
    q = query(q, orderBy("price"));
  }

  // Firestore에서 쿼리 실행 후 결과 반환
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

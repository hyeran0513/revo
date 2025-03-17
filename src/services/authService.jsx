import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { validateForm } from "../utils/validation";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// 로그인
export const signInUser = async ({ email, password, dispatch }) => {
  // 폼 유효성 검사
  const errors = validateForm({ email, password }, "signin");

  if (Object.keys(errors).length > 0) {
    dispatch({ type: "SET_ERRORS", payload: errors });
    return;
  }

  // Firebase 로그인 요청
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

// 회원가입
export const signupUser = async ({ email, password, username, nickname }) => {
  // Firebase에 새 사용자 생성
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // 사용자 프로필 업데이트
  await updateProfile(userCredential.user, {
    displayName: username,
  });

  // Firestore users 테이블에 사용자 데이터 저장
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    createAt: serverTimestamp(),
    username,
    nickname,
  });

  return userCredential.user;
};

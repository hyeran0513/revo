import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { validateForm } from "../utils/validation";

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

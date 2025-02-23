import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../hooks/useAuthForm";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const signupUser = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Firestore에 사용자 정보 저장
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    createdAt: serverTimestamp(),
  });

  return userCredential.user;
};

const Signup = () => {
  const [state, dispatch] = useAuthForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      console.log("회원가입 성공:", user);
      navigate("/");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email: state.email, password: state.password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={state.email}
        placeholder={state.emailPlaceholder}
        onChange={(e) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
      />
      <input
        type="password"
        value={state.password}
        placeholder={state.passwordPlaceholder}
        onChange={(e) =>
          dispatch({ type: "SET_PASSWORD", payload: e.target.value })
        }
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
};

export default Signup;

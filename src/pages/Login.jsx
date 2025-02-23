import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../hooks/useAuthForm";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const loginUser = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

const Login = () => {
  const [state, dispatch] = useAuthForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      console.log("로그인 성공:", user);
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
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
        {mutation.isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};

export default Login;

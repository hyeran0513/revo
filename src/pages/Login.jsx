import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../hooks/useAuthForm";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

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
    <LoginWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Logo to="/">로그인</Logo>

        <FormField>
          <InputField
            type="email"
            value={state.email}
            placeholder={state.emailPlaceholder}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
        </FormField>
        <FormField>
          <InputField
            type="password"
            value={state.password}
            placeholder={state.passwordPlaceholder}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
          />
        </FormField>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "로그인 중..." : "로그인"}
        </Button>
      </FormContainer>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Logo = styled(Link)`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`;

const FormField = styled.div`
  height: 40px;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  overflow: hidden;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
`;

export default Login;

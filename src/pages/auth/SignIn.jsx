import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../../hooks/useAuthForm";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

const loginUser = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  localStorage.setItem("authToken", token);
  return userCredential.user;
};

const SignIn = () => {
  const [state, dispatch] = useAuthForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      if (auth.currentUser) {
        auth.currentUser
          .getIdTokenResult(true)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error("토큰 인증 실패", error.message);
            localStorage.removeItem("authToken");
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
        <Button type="submit" disabled={mutation.isPending} size="large">
          {mutation.isPending ? "로그인 중..." : "로그인"}
        </Button>

        <AskAccount>
          <p>아직 회원이 아니신가요?</p>
          <SignUpLink to="/signup" as={Link}>
            회원가입
          </SignUpLink>
        </AskAccount>
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
  max-width: 400px;
  width: 100%;
`;

const FormField = styled.div`
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${(props) => props.theme.inputs.background};
`;

const AskAccount = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondary};
`;

const SignUpLink = styled.div`
  color: ${(props) => props.theme.colors.primary};
`;

export default SignIn;

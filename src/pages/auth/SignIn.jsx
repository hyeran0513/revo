import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../../hooks/useAuthForm";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import InputField from "../../components/InputField";
import { validateForm } from "../../utils/validation";
import Modal from "../../components/Modal";
import { BiX } from "react-icons/bi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({
    title: "",
    description: "",
  });
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
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);

      let errorMessage = "로그인에 실패했습니다. 다시 시도해주세요.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "일치하는 회원정보가 없습니다.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "비밀번호가 일치하지 않습니다.";
      }

      setModalText({
        title: "로그인 실패",
        description: errorMessage,
      });
      setModalOpen(true);

      dispatch({ type: "SET_ERRORS", payload: { general: errorMessage } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, "signin");

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    mutation.mutate({ email: state.email, password: state.password });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <LoginWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Logo to="/">로그인</Logo>

        {/* 이메일 */}
        <InputField
          type="email"
          value={state.email}
          placeholder={state.placeholder.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          error={state.errors.email}
        />

        {/* 비밀번호 */}
        <InputField
          type="password"
          value={state.password}
          placeholder={state.placeholder.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          error={state.errors.password}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

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

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
      >
        <ModalContent>
          <ModalIcon>
            <BiX />
          </ModalIcon>

          <ModalText>
            <ModalTextTitle>{modalText.title}</ModalTextTitle>
            <ModalTextDescription>{modalText.description}</ModalTextDescription>
          </ModalText>
        </ModalContent>
      </Modal>
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

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

const ModalIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 50%;

  svg {
    font-size: 24px;
    fill: #fff;
  }
`;

const ModalText = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ModalTextTitle = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
`;

const ModalTextDescription = styled.div``;

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

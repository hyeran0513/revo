import { useAuthForm } from "../../hooks/useAuthForm";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import InputField from "../../components/common/InputField";
import Modal from "../../components/common/Modal";
import { BiX } from "react-icons/bi";
import { useSignInMutation } from "../../hooks/useAuthData";

const SignIn = () => {
  const [state, dispatch] = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({ title: "", description: "" });
  const [modalType, setModalType] = useState("error");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 모달 노출 처리
  const showModal = (type, title, description) => {
    setModalType(type);
    setModalText({ title, description });
    setModalOpen(true);
  };

  const loginMutation = useSignInMutation(state, dispatch, showModal, navigate);

  // 로그인 폼 제출
  const handleLogin = (e) => {
    e.preventDefault();

    loginMutation.mutate();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <LoginWrapper>
      <FormContainer onSubmit={handleLogin}>
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

        <Button type="submit" disabled={loginMutation.isPending} size="large">
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
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
        isOpen={modalOpen}
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

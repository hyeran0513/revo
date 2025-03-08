import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../../hooks/useAuthForm";
import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { validateForm } from "../../utils/validation";
import { useState } from "react";
import Modal from "../../components/Modal";
import { BiCheck, BiX } from "react-icons/bi";

const signupUser = async ({ email, password, username, nickname }) => {
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

const SignUp = () => {
  const [state, dispatch] = useAuthForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({
    title: "",
    description: "",
  });
  const [isSuccess, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      setModalText({
        title: "회원가입이 완료되었습니다.",
        description: `${user.displayName}님, 환영합니다!`,
      });
      setSuccess(true);
      setModalOpen(true);
    },
    onError: (error) => {
      setModalText({
        title: "회원가입이 실패했습니다.",
        description: `다시 시도해 주세요.`,
      });
      setSuccess(false);
      setModalOpen(true);
    },
  });

  // 회원가입 버튼 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, "signup");

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    // 회원가입 요청
    mutation.mutate({
      email: state.email,
      password: state.password,
      username: state.username,
      nickname: state.nickname,
    });
  };

  return (
    <SignupWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Logo to="/">회원가입</Logo>

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

        {/* 비밀번호 확인 */}
        <InputField
          type="password"
          value={state.passwordConfirm}
          placeholder={state.placeholder.passwordConfirm}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORDCONFIRM", payload: e.target.value })
          }
          error={state.errors.passwordConfirm}
          showPassword={showPasswordConfirm}
          onTogglePassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
        />

        {/* 이름 */}
        <InputField
          type="username"
          value={state.username}
          placeholder={state.placeholder.username}
          onChange={(e) =>
            dispatch({ type: "SET_USERNAME", payload: e.target.value })
          }
          error={state.errors.username}
        />

        <InputField
          type="nickname"
          value={state.nickname}
          placeholder={state.placeholder.nickname}
          onChange={(e) =>
            dispatch({ type: "SET_NICKNAME", payload: e.target.value })
          }
          error={state.errors.nickname}
        />

        <Button type="submit" disabled={mutation.isPending} size="large">
          {mutation.isPending ? "가입 중..." : "회원가입"}
        </Button>
      </FormContainer>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => navigate("/")}
      >
        <ModalContent>
          <ModalIcon $isSuccess={isSuccess}>
            {isSuccess ? <BiCheck /> : <BiX />}
          </ModalIcon>

          <ModalText>
            <ModalTextTitle>{modalText.title}</ModalTextTitle>
            <ModalTextDescription>{modalText.description}</ModalTextDescription>
          </ModalText>
        </ModalContent>
      </Modal>
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
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
  background-color: ${(props) =>
    props.$isSuccess ? props.theme.colors.primary : props.theme.colors.accent};
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

export default SignUp;

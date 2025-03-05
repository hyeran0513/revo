import { useMutation } from "@tanstack/react-query";
import { useAuthForm } from "../../hooks/useAuthForm";
import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";

const signupUser = async ({ email, password, username }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(
    doc(db, "users", userCredential.user.uid),
    {
      email: userCredential.user.email,
      createdAt: serverTimestamp(),
      username,
    },
    { merge: true }
  );

  return userCredential.user;
};

const SignUp = () => {
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
    mutation.mutate({
      email: state.email,
      password: state.password,
      username: state.username,
    });
  };

  return (
    <SignupWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Logo to="/">회원가입</Logo>

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

        <FormField>
          <InputField
            type="text"
            value={state.username}
            placeholder={state.usernamePlaceholder}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
          />
        </FormField>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "가입 중..." : "회원가입"}
        </Button>
      </FormContainer>
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

export default SignUp;

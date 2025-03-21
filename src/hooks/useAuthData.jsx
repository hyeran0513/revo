import { useMutation } from "@tanstack/react-query";
import { signInUser, signupUser } from "../services/authService";

// 로그인
export const useSignInMutation = (state, dispatch, showModal, navigate) => {
  return useMutation({
    mutationFn: () =>
      signInUser({ email: state.email, password: state.password, dispatch }),
    onSuccess: async (user) => {
      const userData = {
        email: user.email,
        uid: user.uid,
        token: await user.getIdToken(),
      };

      localStorage.setItem("user", JSON.stringify(userData));

      showModal("success", "", "로그인 성공");
      navigate("/");
    },
    onError: (error) => {
      let errorMessage = "로그인에 실패했습니다. 다시 시도해주세요.";

      if (error.message === "유효성 검사 실패") return;
      if (error.code === "auth/user-not-found")
        errorMessage = "일치하는 회원정보가 없습니다.";
      if (error.code === "auth/wrong-password")
        errorMessage = "비밀번호가 일치하지 않습니다.";

      showModal("error", "로그인 실패", errorMessage);
    },
  });
};

// 회원가입
export const useSignUpMutation = (showModal) => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      showModal(
        "success",
        "회원가입이 완료되었습니다.",
        `${user.displayName}님, 환영합니다!`
      );
    },
    onError: (error) => {
      showModal(
        "error",
        "회원가입이 실패했습니다.",
        "회원가입을 다시 시도해 주세요."
      );
    },
  });
};

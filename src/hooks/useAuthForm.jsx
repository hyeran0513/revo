import { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
  username: "",
  emailPlaceholder: "이메일을 입력해 주세요.",
  passwordPlaceholder: "비밀번호를 입력해 주세요.",
  usernamePlaceholder: "이름을 입력해 주세요.",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export const useAuthForm = () => {
  return useReducer(formReducer, initialState);
};

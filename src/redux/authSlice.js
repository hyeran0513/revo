import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  const savedUser = localStorage.getItem("user");
  const isAuthenticated = savedUser ? true : false;

  return {
    isAuthenticated,
    user: savedUser ? JSON.parse(savedUser) : null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;

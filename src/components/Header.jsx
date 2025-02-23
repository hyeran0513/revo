import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Header = () => {
  const { state, dispatch } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatchRedux = useDispatch();

  return (
    <HeaderContainer>
      <Link to="/">
        <h1>Logo</h1>
      </Link>

      <Utility>
        {isAuthenticated ? (
          <button onClick={() => dispatchRedux(logout())}>Logout</button>
        ) : (
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        <button type="button" onClick={() => navigate("/signup")}>
          Sign up
        </button>

        <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          {state.isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </Utility>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Utility = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export default Header;

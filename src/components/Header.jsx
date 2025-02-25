import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { BiSun, BiMoon } from "react-icons/bi";

const Header = () => {
  const { state, dispatch } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatchRedux = useDispatch();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to="/">
          <h1>REVO</h1>
        </Link>

        <Gnb>
          <GnbItem to="/product">상품목록</GnbItem>
        </Gnb>

        <Utility>
          {isAuthenticated ? (
            <UtilityButton onClick={() => dispatchRedux(logout())}>
              로그아웃
            </UtilityButton>
          ) : (
            <UtilityButton type="button" onClick={() => navigate("/login")}>
              로그인
            </UtilityButton>
          )}

          <UtilityButton type="button" onClick={() => navigate("/signup")}>
            회원가입
          </UtilityButton>

          <UtilityButton onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
            {state.isDarkMode ? <BiSun /> : <BiMoon />}
          </UtilityButton>
        </Utility>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Gnb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GnbItem = styled(Link)``;

const Utility = styled.div`
  display: flex;
  gap: 1rem;
  justify-self: flex-end;
`;

const UtilityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: inherit;
`;

export default Header;

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiSun, BiMoon, BiHeart, BiMessage } from "react-icons/bi";

const Header = () => {
  const { state, dispatch } = useTheme();
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to="/">
          <h1>REVO</h1>
        </Link>

        <Gnb>
          <GnbItem to="/product?type=mobile">모바일</GnbItem>
          <GnbItem to="/product?type=tablet">태블릿</GnbItem>
          <GnbItem to="/product?type=pc">PC</GnbItem>
          <GnbItem to="/product?type=monitor">모니터</GnbItem>
          <GnbItem to="/product?type=audio">스피커</GnbItem>
          <GnbItem to="/product?type=camera">카메라</GnbItem>
          <GnbItem to="/product?type=other">기타</GnbItem>
        </Gnb>

        <Utility>
          <UtilityButton onClick={() => navigate("/message")}>
            <BiMessage />
          </UtilityButton>

          <UtilityButton onClick={() => navigate("/favorite")}>
            <BiHeart />
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
  height: 90px;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`;

const Gnb = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
  width: 34px;
  height: 34px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: inherit;

  svg {
    font-size: 16px;
  }
`;

export default Header;

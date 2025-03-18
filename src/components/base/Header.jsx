import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiSun, BiMoon, BiHeart, BiMessage } from "react-icons/bi";

const Header = () => {
  const { state, dispatch } = useTheme();
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">REVO</Logo>

        <Gnb>
          <GnbItem to="/products?type=mobile">모바일</GnbItem>
          <GnbItem to="/products?type=tablet">태블릿</GnbItem>
          <GnbItem to="/products?type=pc">PC</GnbItem>
          <GnbItem to="/products?type=monitor">모니터</GnbItem>
          <GnbItem to="/products?type=audio">스피커</GnbItem>
          <GnbItem to="/products?type=camera">카메라</GnbItem>
          <GnbItem to="/products?type=other">기타</GnbItem>
        </Gnb>

        <Utility>
          <UtilityButton onClick={() => navigate("/chatroom")}>
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

const Logo = styled(Link)`
  font-weight: bold;
  font-family: "Tektur", sans-serif;
  font-size: 40px;
  color: ${(props) => props.theme.colors.primary};
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
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 4px;
  background-color: inherit;

  svg {
    font-size: 16px;
    color: ${(props) => props.theme.colors.text};
  }
`;

export default Header;

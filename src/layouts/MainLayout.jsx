import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const MainLayout = () => {
  const { state } = useTheme();

  return (
    <LayoutWrapper $isDarkMode={state.isDarkMode}>
      <Header />

      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const LayoutMain = styled.main`
  flex: 1;
  margin-top: 20px;
`;

export default MainLayout;

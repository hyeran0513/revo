import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <Header />

      <LayoutMain>
        <Outlet />
      </LayoutMain>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
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

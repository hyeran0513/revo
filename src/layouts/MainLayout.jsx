import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <SubHeader />
        <Header />
      </HeaderWrapper>

      <LayoutMain>
        <Outlet />
      </LayoutMain>

      <Footer />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LayoutMain = styled.main`
  flex: 1;
  padding: 120px 0 30px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

export default MainLayout;

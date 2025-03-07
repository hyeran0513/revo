import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";

const SubLayout = () => {
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
  padding: 150px 0 30px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 50;
  background-color: ${(props) => props.theme.colors.background};
`;

export default SubLayout;

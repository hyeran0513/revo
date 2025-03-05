import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";

const SubLayout = () => {
  return (
    <LayoutWrapper>
      <SubHeader />
      <Header />

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
  margin-top: 20px;
  padding: 0 20px;
`;

export default SubLayout;

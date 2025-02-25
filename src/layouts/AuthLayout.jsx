import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = () => {
  return (
    <LayoutWrapper>
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
  display: flex;
  flex-direction: column;
`;

const LayoutMain = styled.main`
  flex: 1;
`;

export default AuthLayout;

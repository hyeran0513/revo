import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { auth } from "../firebase/firebaseConfig";

const SubHeader = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatchRedux = useDispatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatchRedux(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <SubHeaderWrapper>
      <SubHeaderContainer>
        <Utility>
          {isAuthenticated ? (
            <UtilityButton onClick={handleLogout}>로그아웃</UtilityButton>
          ) : (
            <UtilityButton type="button" onClick={() => navigate("/login")}>
              로그인
            </UtilityButton>
          )}

          <UtilityButton type="button" onClick={() => navigate("/signup")}>
            회원가입
          </UtilityButton>

          <UtilityButton type="mypage" onClick={() => navigate("/mypage")}>
            마이페이지
          </UtilityButton>
        </Utility>
      </SubHeaderContainer>
    </SubHeaderWrapper>
  );
};

const SubHeaderWrapper = styled.div`
  height: 30px;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
`;

const Utility = styled.div`
  display: flex;
  justify-self: flex-end;
`;

const UtilityButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: inherit;
  cursor: pointer;
  font-size: 12px;

  &:not(:last-child) {
    margin-right: 0.5rem;

    &::after {
      content: "";
      display: inline-block;
      width: 1px;
      height: 12px;
      background-color: #999;
    }
  }
`;

export default SubHeader;

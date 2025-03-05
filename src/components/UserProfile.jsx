import { useSelector } from "react-redux";
import useUserAuth from "../hooks/useUserAuth";
import styled from "styled-components";

const UserProfile = () => {
  const { isAuthenticated, userInfo, error, isLoading } = useUserAuth();
  const { user } = useSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {isAuthenticated ? (
        <UserInfo>
          <h1>{userInfo?.username}님 환영합니다</h1>
          <UserEmail>{userInfo.email}</UserEmail>
        </UserInfo>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
};

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const UserEmail = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondary};
`;

export default UserProfile;

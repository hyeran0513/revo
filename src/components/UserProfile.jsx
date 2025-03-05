import { useSelector } from "react-redux";
import useUserAuth from "../hooks/useUserAuth";

const UserProfile = () => {
  const { isAuthenticated, userInfo, error, isLoading } = useUserAuth();
  const { user } = useSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>{userInfo?.username}님 환영합니다</h1>
          {userInfo.email}
          {user.uid}
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
};

export default UserProfile;

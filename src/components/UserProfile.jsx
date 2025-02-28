import useUserAuth from "../hooks/useUserAuth";

const UserProfile = () => {
  const { isAuthenticated, userInfo, error, isLoading } = useUserAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>{userInfo?.username}님 환영합니다</h1>
          {userInfo.email}
        </div>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}
    </>
  );
};

export default UserProfile;

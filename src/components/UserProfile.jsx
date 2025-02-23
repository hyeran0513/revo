import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인한 사용자 정보를 Redux에 저장
        dispatch(login({ uid: user.uid, email: user.email }));
      } else {
        // 로그아웃 시 Redux 상태 초기화
        dispatch(logout());
      }
    });

    // 컴포넌트가 unmount 될 때 unsubscribe 호출
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <p>User ID: {user.uid}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;

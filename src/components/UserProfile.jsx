import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const fetchUser = async (uid) => {
    if (!uid) return null;
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
  };

  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: ({ queryKey }) => fetchUser(queryKey[1]),
    enabled: !!user?.uid,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "",
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <div>
      {isAuthenticated && userInfo ? (
        <div>
          <h1>Welcome, {userInfo.email}</h1>
          <p>User name: {userInfo.username}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;

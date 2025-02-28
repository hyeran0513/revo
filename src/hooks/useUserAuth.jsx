import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";
import { login, logout } from "../redux/authSlice";

const useUserAuth = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  return { isAuthenticated, user, userInfo, error, isLoading };
};

export default useUserAuth;

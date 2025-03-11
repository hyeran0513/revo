import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const fetchUserData = async (uid) => {
  if (!uid) return;

  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

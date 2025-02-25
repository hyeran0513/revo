import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { BiLike, BiSolidLike } from "react-icons/bi";

const LikeButton = ({ productId, userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const likesRef = collection(db, "likes");
    const q = query(
      likesRef,
      where("productId", "==", productId),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setIsLiked(true);
        setLikeId(snapshot.docs[0].id);
      } else {
        setIsLiked(false);
        setLikeId(null);
      }
    });

    return () => unsubscribe();
  }, [productId, userId]);

  const handleLike = async () => {
    if (isLiked && likeId) {
      await deleteDoc(doc(db, "likes", likeId));
    } else {
      const likeRef = doc(collection(db, "likes"));
      await setDoc(likeRef, {
        favoriteId: likeRef.id,
        userId,
        productId,
        createdAt: serverTimestamp(),
      });
    }
  };

  return (
    <button type="button" onClick={handleLike}>
      {isLiked ? <BiSolidLike /> : <BiLike />} 좋아요
    </button>
  );
};

export default LikeButton;

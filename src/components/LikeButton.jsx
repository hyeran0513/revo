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
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import styled from "styled-components";

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

  const handleLike = async (e) => {
    e.preventDefault();

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
    <LikeButtonItem type="button" onClick={handleLike}>
      {isLiked ? <BiSolidHeart /> : <BiHeart />}
    </LikeButtonItem>
  );
};

const LikeButtonItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);

  svg {
    font-size: 24px;
    color: #fff;
  }
`;

export default LikeButton;

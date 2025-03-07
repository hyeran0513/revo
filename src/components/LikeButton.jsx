import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import styled from "styled-components";
import { useSelector } from "react-redux";

const fetchLikeStatus = async ({ queryKey }) => {
  const [, userId, productId] = queryKey;
  if (!userId) return null;

  const likesRef = collection(db, "likes");
  const q = query(
    likesRef,
    where("userId", "==", userId),
    where("productId", "==", productId)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    return { isLiked: true, likeId: docSnapshot.id };
  }

  return { isLiked: false, likeId: null };
};

const LikeButton = ({ productId }) => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.uid;
  const queryClient = useQueryClient();

  // Firestore에서 좋아요 상태 조회
  const { data } = useQuery({
    queryKey: ["likeStatus", userId, productId],
    queryFn: fetchLikeStatus,
    enabled: !!userId,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (data?.isLiked && data?.likeId) {
        // Firestore에서 좋아요 삭제
        await deleteDoc(doc(db, "likes", data.likeId));
        return { isLiked: false, likeId: null };
      } else {
        // Firestore에서 productId 존재 여부 확인
        const likesRef = collection(db, "likes");
        const q = query(
          likesRef,
          where("userId", "==", userId),
          where("productId", "==", productId)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          return { isLiked: true, likeId: querySnapshot.docs[0].id };
        }

        // Firestore에 좋아요 추가
        const likeRef = doc(collection(db, "likes"));

        await setDoc(likeRef, {
          favoriteId: likeRef.id,
          userId,
          productId,
          createdAt: serverTimestamp(),
        });

        return { isLiked: true, likeId: likeRef.id };
      }
    },
    onMutate: async () => {
      // UI를 즉시 업데이트 (Optimistic UI)
      await queryClient.cancelQueries(["likeStatus", userId, productId]);

      const previousData = queryClient.getQueryData([
        "likeStatus",
        userId,
        productId,
      ]);

      queryClient.setQueryData(["likeStatus", userId, productId], (old) => ({
        isLiked: !old?.isLiked,
        likeId: old?.isLiked ? null : "temp-id",
      }));

      return { previousData };
    },
    onError: (err, _, context) => {
      // 오류 발생 시 이전 상태로 롤백
      queryClient.setQueryData(
        ["likeStatus", userId, productId],
        context.previousData
      );
    },
    onSettled: () => {
      // Firestore 데이터 동기화
      queryClient.invalidateQueries(["likeStatus", userId, productId]);
    },
  });

  const handleLike = (e) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    likeMutation.mutate();
  };

  return (
    <LikeButtonItem type="button" onClick={handleLike}>
      {data?.isLiked ? <BiSolidHeart /> : <BiHeart />}
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

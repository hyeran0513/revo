import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 사용자 정보 조회
export const fetchUserData = async (uid) => {
  if (!uid) return;

  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

// 상대방 사용자 이름 조회
export const fetchOtherUser = async (chatId, userUid) => {
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (chatSnap.exists()) {
    const chatData = chatSnap.data();

    // 채팅 참여자 중 현재 사용자를 제외한 값(상대방 사용자 찾기)
    const otherParticipant = chatData.participants.find(
      (uid) => uid !== userUid
    );

    // 상대방이 존재하면 해당 사용자 정보를 조회
    if (otherParticipant) {
      const userDoc = await getDoc(doc(db, "users", otherParticipant));
      return userDoc.exists() ? userDoc.data().username : null;
    }
  }

  return null;
};

// 찜 데이터 조회
export const fetchFavorites = async (uid) => {
  const favoritesRef = await getDocs(
    collection(db, "likes"),
    where("userId", "==", uid)
  );
  const productIds = favoritesRef.docs.map((doc) => doc.data().productId);
  return productIds;
};

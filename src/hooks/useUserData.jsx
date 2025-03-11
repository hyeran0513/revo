import { useQuery } from "@tanstack/react-query";
import {
  fetchFavorites,
  fetchOtherUser,
  fetchProducts,
  fetchUserData,
} from "../services/userService";
import { useSelector } from "react-redux";

// 사용자 정보 조회
export const useUserData = () => {
  const { user } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["user", user?.uid],
    queryFn: () => fetchUserData(user.uid),
    enabled: !!user?.uid,
  });
};

// 상대방 사용자 이름 조회
export const useOtherUserData = (chatId) => {
  const { user } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["otherUser", chatId, user.uid],
    queryFn: () => fetchOtherUser(chatId, user.uid),
    enabled: !!chatId,
  });
};

// 찜 데이터 조회
export const useFavoriteData = () => {
  const { user } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: () => fetchFavorites(user?.uid),
    enabled: !!user?.uid,
  });
};

// 다수 상품 데이터 조회
export const useProductsData = (productIds) => {
  return useQuery({
    queryKey: ["products", productIds],
    queryFn: () => fetchProducts(productIds),
    enabled: productIds?.length > 0,
  });
};

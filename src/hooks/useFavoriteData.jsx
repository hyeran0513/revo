import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkFavorite,
  controlFavorite,
  getWishlist,
} from "../services/favoriteService";

// 찜한 상품들 정보 조회
export const useFavoriteProduct = (userId) => {
  return useQuery({
    queryKey: ["favorite", userId],
    queryFn: () => getWishlist(userId),
    enabled: !!userId,
  });
};

// 찜 버튼 제어
export const useControlFavorite = (userId, productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => controlFavorite(userId, productId),
    onSuccess: (data, variables) => {
      if (data === "add") {
        console.log("찜 목록에 추가");
      }

      if (data === "remove") {
        console.log("찜 목록에서 제거");
      }

      queryClient.invalidateQueries(["favorite", variables]);
    },
    onError: (error) => {
      console.error("찜 목록에 항목 추가 오류:", error.message);
    },
  });
};

// 찜 선택 여부
export const useCheckFavorite = (userId, productId) => {
  return useQuery({
    queryKey: ["favorite", productId],
    queryFn: () => checkFavorite(userId, productId),
    enabled: !!productId,
  });
};

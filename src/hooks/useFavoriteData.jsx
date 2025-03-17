import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchFavorites } from "../services/favoriteService";

// 찜 데이터 조회
export const useFavoriteData = () => {
  const { user } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: () => fetchFavorites(user?.uid),
    enabled: !!user?.uid,
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../services/userService";
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

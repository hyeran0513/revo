import { BiHeart, BiSolidHeart } from "react-icons/bi";
import styled from "styled-components";
import {
  useCheckFavorite,
  useControlFavorite,
} from "../../hooks/useFavoriteData";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const LikeButton = ({ productId }) => {
  const { user } = useSelector((state) => state.auth);
  const { mutate: favoriteMutation, isLoading: isFavoriteLoading } =
    useControlFavorite(user?.uid, productId);
  const { data: isFavorite, isLoading: isCheckLoading } = useCheckFavorite(
    user?.uid,
    productId
  );

  // 찜 버튼 핸들러
  const handleFavorite = (e) => {
    if (e) e.preventDefault();
    favoriteMutation(productId);
  };

  if (isFavoriteLoading && isCheckLoading) return <Loading />;

  return (
    <LikeButtonItem type="button" onClick={handleFavorite}>
      {isFavorite ? <BiSolidHeart /> : <BiHeart />}
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

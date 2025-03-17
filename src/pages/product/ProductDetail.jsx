import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import LikeButton from "../../components/common/LikeButton";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { BiSolidImageAlt } from "react-icons/bi";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import SubBanner from "../../components/base/SubBanner";
import Loading from "../../components/common/Loading";
import NoData from "../../components/common/NoData";
import { useSellerData } from "../../hooks/useUserData";
import { useProductData } from "../../hooks/useProductData";

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 상품 ID 조회
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // 상품 카테고리 파라미터 값 가져오기
  const [chatId, setChatId] = useState(null);

  // 상품 데이터 fetch
  const { data: product, error, isLoading } = useProductData(id);

  // 판매자 정보 fetch
  const { data: userInfo, isLoading: userInfoLoading } = useSellerData(product);

  // 기존 채팅이 있는지 확인하고, 없으면 새 채팅 생성
  const fetchChat = async () => {
    const chatRef = collection(db, "chats");
    const q = query(chatRef, where("participants", "array-contains", user.uid));
    const querySnapshot = await getDocs(q);

    let existingChat = null;

    // 기존 채팅이 있는지 확인
    querySnapshot.forEach((doc) => {
      const chatData = doc.data();

      // 판매자와 이미 채팅이 있다면, 해당 채팅 ID를 existingChat에 저장
      if (chatData.participants.includes(product.sellerId)) {
        existingChat = doc.id;
      }
    });

    // 기존 채팅이 없다면 새 채팅 생성
    if (!existingChat) {
      const newChat = {
        participants: [user.uid, product.sellerId],
        createdAt: new Date(),
      };

      // 새로운 채팅 추가
      const docRef = await addDoc(chatRef, newChat);

      // 생성된 채팅 ID 저장
      setChatId(docRef.id);
    } else {
      // 기존 채팅이 있다면 그 채팅 ID 저장
      setChatId(existingChat);
    }
  };

  // 채팅방으로 이동하는 useEffect
  useEffect(() => {
    if (chatId) {
      navigate(`/chatroom?chatId=${chatId}`);
    }
  }, [chatId, navigate]);

  // 채팅하기 버튼 클릭 시
  const handleChat = () => {
    fetchChat();
  };

  if (isLoading || userInfoLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  if (!product) return <NoData text="상품을 찾을 수 없습니다." />;

  return (
    <>
      <SubBanner text="상품 상세 정보" />

      <ProductContainer>
        <ProductTop>
          {/* 상품 썸네일 */}
          {product?.image ? (
            <ProductThumb>
              <img src={product.image} />
            </ProductThumb>
          ) : (
            <ProductThumbDefault>
              <BiSolidImageAlt />
            </ProductThumbDefault>
          )}

          {/* 좋아요 버튼 */}
          <LikeButtonWrapper>
            {user && <LikeButton productId={id} userId={user.uid} />}
          </LikeButtonWrapper>
        </ProductTop>

        <ProductInfo>
          {/* 판매자 */}
          <ProductSeller>
            {userInfo && <p>{userInfo.username}</p>}
          </ProductSeller>

          {/* 상품명 */}
          <ProductTitle>{product?.title}</ProductTitle>

          {/* 상품 설명 */}
          <ProductContent>
            <Viewer initialValue={product?.description} />
          </ProductContent>
        </ProductInfo>

        <ButtonWrap>
          {type === "undefined" ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              뒤로 가기
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              목록으로
            </Button>
          )}

          {user.uid === product.sellerId ? (
            <Button
              type="button"
              onClick={() => navigate(`/product/${id}/edit?type=${type}`)}
            >
              수정하기
            </Button>
          ) : (
            <Button type="button" onClick={handleChat}>
              채팅하기
            </Button>
          )}
        </ButtonWrap>
      </ProductContainer>
    </>
  );
};

const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const ProductInfo = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bgopacity};
`;

const ProductSeller = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ProductTitle = styled.p`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ProductContent = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 40px;
`;

const ProductTop = styled.div`
  position: relative;
`;

const LikeButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const ProductThumb = styled.div`
  margin-bottom: 40px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductThumbDefault = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  border-radius: 10px;
  height: 400px;
  background-color: ${(props) => props.theme.thumb.background};

  svg {
    font-size: 60px;
    fill: ${(props) => props.theme.thumb.icon};
  }
`;

export default ProductDetail;

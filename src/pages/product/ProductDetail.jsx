import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import LikeButton from "../../components/LikeButton";
import styled from "styled-components";
import Button from "../../components/Button";
import { BiSolidImageAlt } from "react-icons/bi";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import SubBanner from "../../components/SubBanner";

const fetchProduct = async (id) => {
  const productDoc = await getDoc(doc(db, "products", id));
  return productDoc.exists()
    ? { id: productDoc.id, ...productDoc.data() }
    : null;
};

const fetchUser = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [chatId, setChatId] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["user", product?.sellerId],
    queryFn: () => (product ? fetchUser(product.sellerId) : null),
    enabled: !!product?.sellerId,
  });

  useEffect(() => {
    if (!product || !user) return;

    const fetchChat = async () => {
      const chatRef = collection(db, "chats");
      const q = query(
        chatRef,
        where("participants", "array-contains", user.uid)
      );
      const querySnapshot = await getDocs(q);

      let existingChat = null;
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.participants.includes(product.sellerId)) {
          existingChat = doc.id;
        }
      });

      if (!existingChat) {
        const newChat = {
          participants: [user.uid, product.sellerId],
          createdAt: new Date(),
        };

        const docRef = await addDoc(chatRef, newChat);
        setChatId(docRef.id);
      } else {
        setChatId(existingChat);
      }
    };

    fetchChat();
  }, [product, user]);

  if (isLoading || userInfoLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

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
            <Button
              type="button"
              onClick={() => navigate(`/chatroom?chatId=${chatId}`)}
            >
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
`;

const ProductSeller = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ProductTitle = styled.p`
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ProductContent = styled.p`
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

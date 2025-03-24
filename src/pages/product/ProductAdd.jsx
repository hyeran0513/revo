import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { useProductForm } from "../../hooks/useProductForm";
import styled from "styled-components";
import Button from "../../components/common/Button";
import ToastUIEditor from "../../components/common/ToastUIEditor";
import { useSelector } from "react-redux";
import SubBanner from "../../components/base/SubBanner";
import { useAddProductsData } from "../../hooks/useProductData";
import Loading from "../../components/common/Loading";
import Modal from "../../components/common/Modal";
import Postcode from "../../components/common/Postcode";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useProductForm();
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  const breadcrumb = [
    { link: "/", text: "홈" },
    { link: "/product/add", text: "상품 추가" },
  ];

  // 위치
  const handleLocation = () => {
    setModalOpen(true);
  };

  // 주소 선택
  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    dispatch({ type: "SET_LOCATION", payload: fullAddress });
    setModalOpen(false);
  };

  // 상품 데이터 추가
  const { mutate, isLoading, error } = useAddProductsData();

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: state.title,
      description: state.description,
      price: Number(state.price),
      category: state.category,
      condition: state.condition,
      location: state.location,
      createdAt: serverTimestamp(),
      sellerId: state.sellerId,
      images: state.images,
    };

    mutate(data);
  };

  const handleImageChange = (index, event) => {
    dispatch({
      type: "SET_IMAGE_URL",
      index,
      payload: event.target.value,
    });
  };

  // 상품 설명 저장
  const handleSaveDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  // user.uid가 변경될 때, SET_SELLERID 설정
  useEffect(() => {
    dispatch({ type: "SET_SELLERID", payload: user.uid });
  }, [user.uid]);

  useEffect(() => {
    if (state.image === undefined) {
      dispatch({ type: "SET_IMAGE", payload: "" });
    }
  }, [state.image]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <ProductAddWrapper>
      {/* 서브 배너 */}
      <SubBanner bannerText="상품 추가" breadcrumb={breadcrumb} />

      {/* 폼 영역 */}
      <FormContainer onSubmit={handleSubmit}>
        {/* 판매자 ID */}
        <input
          type="hidden"
          value={state.sellerId}
          onChange={(e) =>
            dispatch({ type: "SET_SELLERID", payload: user.uid })
          }
        />

        {/* 상품명 */}
        <FormBox>
          <FormLabel>상품명</FormLabel>
          <FormField>
            <InputField
              type="text"
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "SET_TITLE", payload: e.target.value })
              }
              placeholder={state.placeholder.title}
              required
            />
          </FormField>
        </FormBox>

        {/* 상품 설명 */}
        <FormBox>
          <FormLabel>상품 설명</FormLabel>
          <ToastUIEditor
            initialValue={state.description}
            onSaveDescription={handleSaveDescription}
          />
        </FormBox>

        {/* 가격 */}
        <FormBox>
          <FormLabel>가격</FormLabel>
          <FormField>
            <InputField
              type="number"
              value={state.price}
              onChange={(e) =>
                dispatch({ type: "SET_PRICE", payload: e.target.value })
              }
              placeholder={state.placeholder.price}
              required
            />
          </FormField>
        </FormBox>

        {/* 카테고리 */}
        <FormBox>
          <FormLabel>카테고리</FormLabel>
          <FormField>
            <SelectField
              value={state.category}
              onChange={(e) =>
                dispatch({ type: "SET_CATEGORY", payload: e.target.value })
              }
              required
            >
              <option value="">카테고리 선택</option>
              <option value="mobile">모바일</option>
              <option value="tablet">태블릿</option>
              <option value="pc">PC</option>
              <option value="monitor">모니터</option>
              <option value="audio">스피커</option>
              <option value="camera">카메라</option>
              <option value="other">기타</option>
            </SelectField>
          </FormField>
        </FormBox>

        {/* 상태 */}
        <FormBox>
          <FormLabel>상태</FormLabel>
          <FormField>
            <SelectField
              value={state.condition}
              onChange={(e) =>
                dispatch({ type: "SET_CONDITION", payload: e.target.value })
              }
              required
            >
              <option value="">상태 선택</option>
              <option value="new">새 상품</option>
              <option value="used">중고 상품</option>
            </SelectField>
          </FormField>
        </FormBox>

        {/* 위치 */}
        <FormBox>
          <FormLabel>위치</FormLabel>
          <FormField>
            <InputField
              type="text"
              value={state.location}
              onClick={handleLocation}
              placeholder={state.placeholder.location}
              required
            />
          </FormField>
        </FormBox>

        {/* 상품 이미지 */}
        <FormBox>
          <FormLabel>상품 이미지</FormLabel>
          {state.images.map((image, index) => (
            <FormField>
              <InputField
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e)}
                placeholder="대표 이미지 URL를 넣어주세요."
                required
              />
            </FormField>
          ))}
        </FormBox>

        {/* 버튼 영역 */}
        <ButtonWrap>
          {/* 마이페이지로 이동 */}
          <Button
            type="button"
            variant="outline"
            size="large"
            onClick={() => navigate("/mypage")}
          >
            마이페이지로 이동
          </Button>

          {/* 상품 추가 */}
          <Button type="submit" size="large">
            상품 추가
          </Button>
        </ButtonWrap>
      </FormContainer>

      {/* 모달 */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="주소 찾기"
      >
        <ModalContent>
          <Postcode onComplete={handleAddressSelect} />
        </ModalContent>
      </Modal>
    </ProductAddWrapper>
  );
};

const ProductAddWrapper = styled.div``;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 500px;
`;

const FormBox = styled.div``;

const FormField = styled.div`
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${(props) => props.theme.inputs.background};
  color: ${(props) => props.theme.colors.text};
`;

const SelectField = styled.select`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${(props) => props.theme.inputs.background};
  color: ${(props) => props.theme.colors.text};
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 20px;

  button {
    flex: 1;
  }
`;

const FormLabel = styled.label`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 14px;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

export default ProductAdd;

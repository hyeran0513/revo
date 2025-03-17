import React, { useEffect } from "react";
import { useProductForm } from "../../hooks/useProductForm";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/Button";
import ToastUIEditor from "../../components/common/ToastUIEditor";
import { fetchProduct } from "../../services/productService";
import { useEditProductData } from "../../hooks/useProductData";
import Loading from "../../components/common/Loading";

const ProductEdit = () => {
  const [state, dispatch] = useProductForm();
  // url에서 상품 id 조회
  const { id } = useParams();
  const navigate = useNavigate();

  // 마운트 시, 상품 데이터 로드
  useEffect(() => {
    if (id) {
      const loadProductData = async () => {
        const productData = await fetchProduct(id);

        if (productData) {
          dispatch({ type: "SET_TITLE", payload: productData.title });
          dispatch({
            type: "SET_DESCRIPTION",
            payload: productData.description,
          });
          dispatch({ type: "SET_PRICE", payload: productData.price });
          dispatch({ type: "SET_CATEGORY", payload: productData.category });
          dispatch({ type: "SET_CONDITION", payload: productData.condition });
          dispatch({ type: "SET_IMAGES", payload: productData.images || [] });
          dispatch({ type: "SET_LOCATION", payload: productData.location });
        }
      };

      loadProductData();
    }
  }, [id]);

  // 상품 수정 요청
  const { mutate, isLoading, error } = useEditProductData(id, navigate);

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: state.title,
      description: state.description,
      price: state.price,
      category: state.category,
      condition: state.condition,
      images: state.images,
      location: state.location,
    };

    mutate(updatedData);
  };

  const handleSaveDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <ProductEditWrapper>
      {/* 페이지 제목 */}
      <PageTitle>상품 수정</PageTitle>

      <FormContainer onSubmit={handleSubmit}>
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
              <option value="New">새 상품</option>
              <option value="Used">중고 상품</option>
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
              onChange={(e) =>
                dispatch({ type: "SET_LOCATION", payload: e.target.value })
              }
              required
            />
          </FormField>
        </FormBox>

        {/* 버튼 영역 */}
        <ButtonWrap>
          {/* 뒤로가기 버튼 */}
          <Button
            type="button"
            variant="outline"
            size="large"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </Button>

          {/* 수정하기 버튼 */}
          <Button type="submit" size="large">
            {mutate.isPending ? "수정 중..." : " 수정하기"}
          </Button>
        </ButtonWrap>
      </FormContainer>
    </ProductEditWrapper>
  );
};

const ProductEditWrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`;

const SelectField = styled.select`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
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

export default ProductEdit;

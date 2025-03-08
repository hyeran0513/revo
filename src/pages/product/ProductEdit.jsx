import React, { useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useProductForm } from "../../hooks/useProductForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import ToastUIEditor from "../../components/ToastUIEditor";

const ProductEdit = () => {
  const [state, dispatch] = useProductForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const fetchProduct = async (id) => {
    const productDoc = await getDoc(doc(db, "products", id));

    if (productDoc.exists()) {
      return productDoc.data();
    } else {
      console.error("상품을 찾을 수 없습니다.");
    }
  };

  const updateProduct = async (id, updatedData) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
  };

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

    try {
      await updateProduct(id, updatedData);
      console.log("상품이 성공적으로 수정되었습니다.");
      navigate(`/product/${id}`);
    } catch (error) {
      console.error("상품 수정 실패:", error);
    }
  };

  const handleSaveDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  return (
    <ProductEditWrapper>
      <PageTitle>상품 수정</PageTitle>

      <FormContainer onSubmit={handleSubmit}>
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

        <FormBox>
          <FormLabel>상품 설명</FormLabel>
          <ToastUIEditor
            initialValue={state.description}
            onSaveDescription={handleSaveDescription}
          />
        </FormBox>

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

        {/* <FormBox>
          <FormLabel>상품 이미지</FormLabel>
          <FormField>
            <InputField
              type="file"
              multiple
              onChange={(e) =>
                dispatch({ type: "SET_IMAGES", payload: e.target.files })
              }
            />
          </FormField>
        </FormBox> */}

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

        <ButtonWrap>
          <Button
            type="button"
            variant="outline"
            size="large"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </Button>

          <Button type="submit" size="large">
            수정하기
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

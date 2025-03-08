import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useProductForm } from "../../hooks/useProductForm";
import styled from "styled-components";
import Button from "../../components/Button";
import ToastUIEditor from "../../components/ToastUIEditor";
import { useSelector } from "react-redux";
import SubBanner from "../../components/SubBanner";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useProductForm();
  const { user } = useSelector((state) => state.auth);

  const addProduct = async (data) => {
    const productRef = doc(collection(db, "products"));
    await setDoc(productRef, { ...data, createdAt: serverTimestamp() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: state.title,
      description: state.description,
      price: state.price,
      category: state.category,
      condition: state.condition,
      location: state.location,
      createdAt: serverTimestamp(),
      sellerId: state.sellerId,
    };

    try {
      await addProduct(data);
      console.log("상품이 성공적으로 추가되었습니다.");
      navigate(`/mypage`);
    } catch (error) {
      console.error("상품 추가 실패:", error);
    }
  };

  const handleSaveDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  useEffect(() => {
    dispatch({ type: "SET_SELLERID", payload: user.uid });
  }, []);

  return (
    <ProductAddWrapper>
      <SubBanner text="상품 추가" />

      <FormContainer onSubmit={handleSubmit}>
        <input
          type="hidden"
          value={state.sellerId}
          onChange={(e) =>
            dispatch({ type: "SET_SELLERID", payload: user.uid })
          }
        />

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
            onClick={() => navigate("/mypage")}
          >
            마이페이지로 이동
          </Button>

          <Button type="submit" size="large">
            상품 추가
          </Button>
        </ButtonWrap>
      </FormContainer>
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
`;

const SelectField = styled.select`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${(props) => props.theme.inputs.background};
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

export default ProductAdd;

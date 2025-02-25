import React from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useProductForm } from "../../hooks/useProductForm";
import styled from "styled-components";
import Button from "../../components/Button";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useProductForm();

  // 상품 추가
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
    };

    try {
      await addProduct(data);
      console.log("상품이 성공적으로 추가되었습니다.");
      navigate("/product");
    } catch (error) {
      console.error("상품 추가 실패:", error);
    }
  };

  return (
    <ProductAddWrapper>
      <PageTitle>상품 추가</PageTitle>

      <FormContainer onSubmit={handleSubmit}>
        <FormBox>
          <label>상품명</label>
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
          <label>상품 설명</label>
          <FormField>
            <TextareaField
              value={state.description}
              onChange={(e) =>
                dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
              }
              required
            />
          </FormField>
        </FormBox>

        <FormBox>
          <label>가격</label>
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
          <label>카테고리</label>
          <FormField>
            <SelectField
              value={state.category}
              onChange={(e) =>
                dispatch({ type: "SET_CATEGORY", payload: e.target.value })
              }
              required
            >
              <option value="">카테고리 선택</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Furniture">Furniture</option>
              <option value="Toys">Toys</option>
            </SelectField>
          </FormField>
        </FormBox>

        <FormBox>
          <label>상태</label>
          <FormField>
            <SelectField
              value={state.condition}
              onChange={(e) =>
                dispatch({ type: "SET_CONDITION", payload: e.target.value })
              }
              required
            >
              <option value="">상태 선택</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </SelectField>
          </FormField>
        </FormBox>

        <FormBox>
          <label>상품 이미지</label>
          <FormField>
            <InputField
              type="file"
              multiple
              onChange={(e) =>
                dispatch({ type: "SET_IMAGES", payload: e.target.files })
              }
            />
          </FormField>
        </FormBox>

        <FormBox>
          <label>위치</label>
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

        <Button type="submit">상품 추가</Button>
      </FormContainer>

      <Button type="button" onClick={() => navigate("/product")}>
        목록 보기
      </Button>
    </ProductAddWrapper>
  );
};

const ProductAddWrapper = styled.div`
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
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  overflow: hidden;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
`;

const TextareaField = styled.textarea`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
`;

const SelectField = styled.select`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
`;

export default ProductAdd;

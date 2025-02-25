import React, { useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useProductForm } from "../../hooks/useProductForm";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";

const ProductEdit = () => {
  const [state, dispatch] = useProductForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // 상품 조회
  const fetchProduct = async (id) => {
    const productDoc = await getDoc(doc(db, "products", id));

    if (productDoc.exists()) {
      return productDoc.data();
    } else {
      console.error("상품을 찾을 수 없습니다.");
    }
  };

  // 상품 업데이트
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

  return (
    <ProductEditWrapper>
      <PageTitle>상품 수정</PageTitle>

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

        <Button type="submit">수정하기</Button>
      </FormContainer>

      <Button type="button" onClick={() => navigate("/product")}>
        목록으로
      </Button>
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
  margin: 0 auto;
  max-width: 500px;
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

export default ProductEdit;

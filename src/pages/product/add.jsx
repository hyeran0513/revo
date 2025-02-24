import React from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useProductForm } from "../../hooks/useProductForm";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>상품명</label>
          <input
            type="text"
            value={state.title}
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>상품 설명</label>
          <textarea
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>가격</label>
          <input
            type="number"
            value={state.price}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>카테고리</label>
          <select
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
          </select>
        </div>

        <div>
          <label>상태</label>
          <select
            value={state.condition}
            onChange={(e) =>
              dispatch({ type: "SET_CONDITION", payload: e.target.value })
            }
            required
          >
            <option value="">상태 선택</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div>
          <label>상품 이미지</label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              dispatch({ type: "SET_IMAGES", payload: e.target.files })
            }
          />
        </div>

        <div>
          <label>위치</label>
          <input
            type="text"
            value={state.location}
            onChange={(e) =>
              dispatch({ type: "SET_LOCATION", payload: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">상품 추가</button>
      </form>

      <button type="button" onClick={() => navigate("/product")}>
        목록 보기
      </button>
    </div>
  );
};

export default ProductAdd;

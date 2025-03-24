import { useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  condition: "",
  images: [""],
  location: "",
  sellerId: "",
  placeholder: {
    title: "제목을 입력해 주세요.",
    description: "설명을 작성해 주세요.",
    price: "가격을 입력해 주세요.",
    location: "위치를 입력해 주세요.",
  },
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_CONDITION":
      return { ...state, condition: action.payload };
    case "SET_IMAGE_URL":
      const updatedImages = Array.isArray(action.payload) ? action.payload : [];
      return { ...state, images: updatedImages };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_SELLERID":
      return { ...state, sellerId: action.payload };
    default:
      return state;
  }
};

export const useProductForm = () => {
  return useReducer(productReducer, initialState);
};

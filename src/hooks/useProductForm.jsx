import { useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  condition: "",
  images: [],
  location: "",
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
    case "SET_IMAGES":
      return { ...state, images: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

export const useProductForm = () => {
  return useReducer(productReducer, initialState);
};

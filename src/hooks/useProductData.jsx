import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAddProduct,
  fetchFilteredProducts,
  fetchProduct,
  fetchProducts,
  fetchTypeForProducts,
} from "../services/productService";
import { useNavigate } from "react-router-dom";

// 유형에 따른 상품 데이터 조회
export const useTypeForProductsData = (type) => {
  return useQuery({
    queryKey: ["products", type],
    queryFn: () => fetchTypeForProducts(type),
    enabled: !!type,
  });
};

// 다수 상품 데이터 조회
export const useProductsData = (productIds) => {
  return useQuery({
    queryKey: ["products", productIds],
    queryFn: () => fetchProducts(productIds),
    enabled: productIds?.length > 0,
  });
};

// 필터링된 상품 데이터 조회
export const useFilteredProductsData = (type, filter) => {
  return useQuery({
    queryKey: ["filterdProducts", type, filter],
    queryFn: () => fetchFilteredProducts(type, filter),
  });
};

// 상품 데이터 추가
export const useAddProductsData = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchAddProduct,
    onSuccess: () => {
      console.log("상품이 성공적으로 추가되었습니다.");
      navigate(`/mypage`);
    },
    onError: (error) => {
      console.error("상품 추가 실패:", error);
    },
  });
};

export const useProductData = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

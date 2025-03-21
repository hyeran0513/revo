import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAddProduct,
  fetchFilteredProducts,
  fetchProduct,
  fetchProducts,
  fetchSellerProducts,
  fetchTypeForProducts,
  updateProduct,
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

// 필터링한 상품 데이터 조회
export const useFilteredProductsData = (type, filter) => {
  const { condition, minPrice, maxPrice } = filter;

  const { data, error, isLoading } = useQuery({
    queryKey: ["filteredProducts", type, condition, minPrice, maxPrice],
    queryFn: fetchFilteredProducts,
    enabled: !!type,
  });

  return { data, error, isLoading };
};

// 판매자에 따른 상품 데이터 조회
export const useSellerProductsData = (user) => {
  return useQuery({
    queryKey: ["products", user.uid],
    queryFn: () => fetchSellerProducts(user.uid),
    enabled: !!user.uid,
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

// 단일 상품 조회
export const useProductData = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

// 상품 내용 편집
export const useEditProductData = (id, navigate) => {
  return useMutation({
    mutationFn: (updatedData) => updateProduct(id, updatedData),
    onSuccess: () => {
      console.log("상품이 성공적으로 수정되었습니다.");
      navigate(`/product/${id}`); // 수정된 상품 페이지로 이동
    },
    onError: (error) => {
      console.error("상품 수정 실패:", error);
    },
  });
};

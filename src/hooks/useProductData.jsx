import { useQuery } from "@tanstack/react-query";
import {
  fetchFilteredProducts,
  fetchProducts,
  fetchTypeForProducts,
} from "../services/productService";

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

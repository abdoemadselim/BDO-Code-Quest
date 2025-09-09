// Libs
import { apiClient } from "@/lib/api-client";

// Features
import { ProductType } from "@/features/products/types/types";
import { ProductFormType } from "@/features/products/schema/products.schema";

export async function createProduct(data: ProductFormType) {
  return apiClient.post("/products", data, {
    includeCredentials: true,
    throwOnError: true,
  });
}

export async function getProducts({
  page = 1,
  page_size = 10,
  search = ""
}: {
  page: number;
  page_size: number;
  search: string
}) {
  const realPage = page > 0 ? page : 1;
  const endpoint = `/products?page=${realPage - 1}&pageSize=${page_size}&search=${search}`;

  return apiClient.get(endpoint, {
    throwOnError: true,
    includeCredentials: true
  });
}

export async function deleteProduct(product_id: number) {
  return apiClient.delete(`/products/${product_id}`, {
    throwOnError: true,
    includeCredentials: true
  });
}

export async function getProductsCategories() {
  return apiClient.get(`/categories`, {
    throwOnError: true,
    includeCredentials: true
  })
}

export async function getAllProductsStatus() {
  return apiClient.get(`/products/status`, {
    throwOnError: true,
    includeCredentials: true
  })
}

export async function updateProduct(product: Partial<ProductType>) {
  return apiClient.patch(`/products/${product.id}`, product, {
    throwOnError: true,
    includeCredentials: true
  });
}
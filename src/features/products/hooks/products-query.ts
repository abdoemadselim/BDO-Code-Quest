// Libs
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"

// Features
import { CategoryType, ProductType } from "@/features/products/types/types"
import { createProduct, deleteProduct, getAllProductsStatus, getProducts, getProductsCategories, updateProduct } from "@/features/products/service/products-service"
import { ProductFormType } from "@/features/products/schema/products.schema";

export function useGetProducts({ page, page_size, search }: { page: number, page_size: number, search: string }) {
    return useSuspenseQuery<{ products: ProductType[], total: number }>({
        queryKey: ["products", { page, page_size, search }],
        queryFn: () => getProducts({ page, page_size, search }),
        staleTime: 5 * 60 * 1000, // 5 minutes,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    })
}

export function useDeleteProduct(product_id: number) {
    const queryClient = useQueryClient();
    const { mutateAsync, isError, isPending, isSuccess } = useMutation<ProductType>({
        mutationFn: () => deleteProduct(product_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })

    return { mutateAsync, isError, isPending, isSuccess }
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const { mutateAsync, isError, isPending, error, isSuccess } = useMutation({
        mutationFn: (product: ProductType ) => updateProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })

    return { mutateAsync, isError, isPending, error, isSuccess }
}

export function useCreateProduct() {
    const queryClient = useQueryClient();
    const { mutateAsync, isError, isPending, error, data, isSuccess } = useMutation({
        mutationFn: (product: ProductFormType) => createProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })

    return { mutateAsync, isError, isPending, error, data, isSuccess }
}

export function useGetCategories() {
    return useQuery<{ categories: CategoryType[] }>({
        queryKey: ["products-categories"],
        queryFn: () => getProductsCategories(),
        staleTime: 5 * 60 * 1000, // 5 minutes,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    })
}

export function useGetAllProductsStatus() {
    return useQuery({
        queryKey: ["products-status"],
        queryFn: () => getAllProductsStatus(),
        staleTime: 5 * 60 * 1000, // 5 minutes,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    })
}
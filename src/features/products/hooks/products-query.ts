import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ProductType } from "@/features/products/types/types"
import { getProducts } from "@/features/products/service/products-service"

export function useGetProducts({ page, page_size }: { page: number, page_size: number }) {
    return useQuery<{ products: ProductType[], total: number }>({
        queryKey: ["products", { page, page_size }],
        queryFn: () => getProducts({ page, page_size }),
        staleTime: 5 * 60 * 1000, // 5 minutes,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    })
}

// export function useDeleteToken(token_id: number) {
//     const queryClient = useQueryClient();
//     const { mutateAsync, isError, isPending, isSuccess } = useMutation<TokenType>({
//         mutationFn: () => deleteToken(token_id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["tokens"] })
//         }
//     })

//     return { mutateAsync, isError, isPending, isSuccess }
// }

// export function useUpdateToken() {
//     const queryClient = useQueryClient();
//     const { mutateAsync, isError, isPending, error, isSuccess } = useMutation({
//         mutationFn: (toUpdateToken: TokenType & { id: number }) => updateToken(toUpdateToken),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["tokens"] })
//         }
//     })

//     return { mutateAsync, isError, isPending, error, isSuccess }
// }

// export function useCreateToken() {
//     const queryClient = useQueryClient();
//     const { mutateAsync, isError, isPending, error, data, isSuccess } = useMutation({
//         mutationFn: (token: TokenType) => createToken(token),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["tokens"] })
//         }
//     })

//     return { mutateAsync, isError, isPending, error, data, isSuccess }
// }
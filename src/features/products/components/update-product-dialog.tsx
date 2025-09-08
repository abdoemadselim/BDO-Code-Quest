import { ProductType } from "@/features/products/types/types"

function UpdateProductDialog({ children, currentProduct }: { children: React.ReactNode, currentProduct: ProductType }) {
    return (
        <>
            {children}
        </>
    )
}

export default UpdateProductDialog
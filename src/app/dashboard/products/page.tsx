import ProductsContent from "@/features/products/components/products-content"
import { ProtectedAuthRoute } from "@/features/auth/context/auth-context"

function ProductsPage() {
    // ProtectedAuthRoute --> (directs back to login if user isn't authenticated)
    return (
        <ProtectedAuthRoute>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <ProductsContent />
        </ProtectedAuthRoute>
    )
}

export default ProductsPage
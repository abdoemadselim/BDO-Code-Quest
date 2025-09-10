import { redirect } from "next/navigation"

import ProductsContent from "@/features/products/components/products-content"
import { getSession } from "@/features/auth/service/auth-session"

async function ProductsPage() {
    const session = await getSession()

    if (!session) {
        redirect("/auth/login")
    }

    return (
        <>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <ProductsContent />
        </>
    )
}

export default ProductsPage
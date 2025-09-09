import { Suspense } from "react"

import DataTableSkeleton from "@/components/data-table/data-table-skeleton"

import ProductsContent from "@/features/products/components/products-content"
import SearchInputSkeleton from "@/features/products/components/search-input-skeleton"
import { ProtectedAuthRoute } from "@/features/auth/context/auth-context"

function ProductsPage() {
    return (
        <>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <Suspense fallback={(
                <>
                    <SearchInputSkeleton />
                    <DataTableSkeleton />
                </>
            )}>
                <ProductsContent />
            </Suspense>
        </>
    )
}

export default ProductsPage
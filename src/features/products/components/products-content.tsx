'use client'

// Libs
import dynamic from "next/dynamic";
import { Suspense } from "react"
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

// Features
import SearchInput from "@/features/products/components/search-input";
const ProductsTable = dynamic(() => import("@/features/products/components/products-table"), {
    loading: DataTableSkeleton,
    ssr: false
});
import CreateProductDialog from "@/features/products/components/create-product-dialog";

function ProductsContent() {
    // Get the page, pageSize, search params from the url (appended to url to offer bookmarking)
    const searchParams = useSearchParams()

    // Prepare the params for the query
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search");

    return (
        <>
            <div className="flex justify-between flex-row-reverse px-6 items-center">
                <CreateProductDialog>
                    <Button className="cursor-pointer">
                        <Plus />
                        إضافة مُنتج
                    </Button>
                </CreateProductDialog>

                <SearchInput />
            </div>

            {/* Data table - Suspense to show loading skeleton while the data is loading*/}
            <Suspense
                fallback={<DataTableSkeleton />}
                key={`${currentPage}-${pageSize}-${search}`}
            >
                <ProductsTable
                    page={currentPage}
                    pageSize={pageSize}
                    search={search}
                />
            </Suspense>
        </>
    )
}

export default ProductsContent;
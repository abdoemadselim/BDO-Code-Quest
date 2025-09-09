'use client'

// Libs
import { useEffect } from "react";
import { Suspense } from "react"
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

// Components
import { Button } from "@/components/ui/button";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

// Features
import SearchInput from "@/features/products/components/search-input";
import ProductsTable from "@/features/products/components/products-table";
import CreateProductDialog from "@/features/products/components/create-product-dialog";
import { getProductsCategories } from "@/features/products/service/products-service";

function ProductsContent() {
    // Get the page, pageSize, search params from the url (appended to url to offer bookmarking)
    const searchParams = useSearchParams()

    // Prepare the params for the query
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    // Prefetch all categories for product create/update forms (the category select options)
    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ["products-categories"],
            queryFn: getProductsCategories
        })
    }, [queryClient])

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
            <Suspense fallback={<DataTableSkeleton />}>
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
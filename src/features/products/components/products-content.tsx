'use client'

import { useSearchParams } from "next/navigation";
import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

import { columns } from "@/features/products/components/data-table-cols-defs"
import { useGetProducts } from "@/features/products/hooks/products-query";
import SearchInput from "@/features/products/components/search-input";
import ProductsTable from "@/features/products/components/products-table";

function ProductsContent() {
    // Get the page, pageSize params from the url
    const searchParams = useSearchParams()

    // Prepare the params for the query
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";
    const { data, isError, error } = useGetProducts({ page: currentPage, page_size: pageSize, search: search })

    // Prepare the pagination state for tanstack table to work properly
    const paginationState = {
        pageIndex: currentPage - 1, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
        pageSize
    }

    return (
        <>
            {isError &&
                <Alert variant="destructive" className="w-fit px-6 mr-6">
                    <AlertCircleIcon />
                    <AlertTitle>{error.message}</AlertTitle>
                </Alert>
            }
            <div className="flex justify-between pr-6">
                <SearchInput />
            </div>
            <ProductsTable
                data={{ products: data?.products || [], total: data?.total || 0 }}
                columns={columns}
                paginationState={paginationState}
            />
        </>
    )
}

export default ProductsContent;
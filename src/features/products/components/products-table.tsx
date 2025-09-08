'use client'

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/features/products/components/data-table-cols-defs"
import { ProductType } from "@/features/products/types/types";
import { useGetProducts } from "../hooks/products-query";
import { useSearchParams } from "next/navigation";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

function ProductsTable() {
    // Get the page, pageSize params from the url
    const searchParams = useSearchParams()

    // Prepare the params for the query
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const { data, isError, isPending, error } = useGetProducts({ page: currentPage, page_size: pageSize })

    // Prepare the pagination state for tanstack table to work properly
    const paginationState = {
        pageIndex: currentPage - 1, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
        pageSize
    }

    // Handle loading state
    if (isPending) {
        return <DataTableSkeleton />
    }
    return (
        <DataTable<ProductType>
            data={data?.products || []}
            total={data?.total || 0}
            columns={columns}
            pagination={paginationState}
        />
    )
}

export default ProductsTable;
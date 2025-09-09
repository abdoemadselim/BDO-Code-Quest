import { AlertCircleIcon } from "lucide-react";

// Components
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/data-table/data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

// Features
import { ProductType } from "@/features/products/types/types";
import { columns } from "@/features/products/components/data-table-cols-defs"
import { useGetProducts } from "@/features/products/hooks/products-query";

type Props = {
    page: number, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
    pageSize: number,
    search: string
}

function ProductsTable({ page, pageSize, search }: Props) {
    const { data, isError, error, isPending } = useGetProducts({ page: page, page_size: pageSize, search: search })

    // Prepare the pagination state for tanstack table pagination
    const paginationState = {
        pageIndex: page - 1, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
        pageSize
    }

    if (isPending) {
        return (
            <DataTableSkeleton />
        )
    }

    return (
        <>
            {/* Display errors happen while fetching products */}
            {isError &&
                <Alert variant="destructive" className="w-fit px-6 mr-6">
                    <AlertCircleIcon />
                    <AlertTitle>{error.message}</AlertTitle>
                </Alert>
            }

            <DataTable<ProductType>
                data={data?.products || []}
                total={data?.total || 0}
                columns={columns}
                pagination={paginationState}
            />
        </>
    )
}

export default ProductsTable;
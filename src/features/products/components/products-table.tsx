import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { ProductType } from "@/features/products/types/types";

type Props = {
    data: { products: ProductType[], total: number },
    columns: ColumnDef<ProductType>[],
    paginationState: {
        pageIndex: number, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
        pageSize: number
    }
}

function ProductsTable({ data, columns, paginationState }: Props) {
    return (
        <DataTable<ProductType>
            data={data?.products}
            total={data?.total}
            columns={columns}
            pagination={paginationState}
        />
    )
}

export default ProductsTable;
import { DataTable } from "@/components/data-table/data-table";

import data from "@/features/products/service/data.json"
import { columns } from "@/features/products/components/data-table-cols-defs"
import { ProductType } from "@/features/products/types/types";

function ProductsTable() {
    return (
        <DataTable<ProductType>
            data={data}
            columns={columns}
            total={5}
            pagination={{ pageIndex: 0, pageSize: 10 }}
        />
    )
}

export default ProductsTable;
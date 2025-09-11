import { Plus } from "lucide-react";

import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import SearchInputSkeleton from "@/components/data-table/search-input-skeleton";
import { Button } from "@/components/ui/button";

function DashboardProductsLoading() {
    return (
        <>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <div className="flex justify-between flex-row-reverse px-6 items-center">
                <Button className="cursor-pointer" disabled>
                    <Plus />
                    إضافة مُنتج
                </Button>
                <SearchInputSkeleton />
            </div>

            <DataTableSkeleton />
        </>
    )
}

export default DashboardProductsLoading;
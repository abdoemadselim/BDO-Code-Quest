import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import SearchInput from "@/features/products/components/search-input";

function DashboardProductsLoading() {
    return (
        <>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <div className="flex justify-between flex-row-reverse px-6 items-center">
                <SearchInput />
            </div>

            <DataTableSkeleton />
        </>
    )
}

export default DashboardProductsLoading;
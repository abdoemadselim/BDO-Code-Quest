import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import SearchInputSkeleton from "@/components/data-table/search-input-skeleton";


function DashboardProductsLoading() {
    return (
        <>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <div className="flex justify-between flex-row-reverse px-6 items-center">
                <SearchInputSkeleton />
            </div>

            <DataTableSkeleton />
        </>
    )
}

export default DashboardProductsLoading;
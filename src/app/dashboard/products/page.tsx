import ProductsTable from "@/features/products/components/products-table"

function DashboardPage() {
    return (
        <>
            <h1 className="text-3xl pr-6 py-4">المنتجات</h1>
            <ProductsTable />
        </>
    )
}

export default DashboardPage
'use client'

// Libs
import {
    Delete,
    MoreVertical,
    Settings,
} from "lucide-react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { memo, useMemo } from "react"
import dynamic from "next/dynamic"

// Components
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Lazy load heavy components
const UpdateProductDialog = dynamic(() => import("@/features/products/components/update-product-dialog"), {
    loading: () => <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />,
    ssr: false
});

const DeleteProductDialog = dynamic(() => import("@/features/products/components/delete-product-confirmation-dialog").then(mod => ({ default: mod.DeleteProductDialog })), {
    loading: () => <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />,
    ssr: false
});

// Features
import { ProductType } from "@/features/products/types/types"
import ProductStatusBadge from "@/features/products/components/product-status-badge"

// Memoized components for better performance
const ProductName = memo(({ name }: { name: string }) => (
    <p className="lg:text-lg pr-2">{name}</p>
));
ProductName.displayName = 'ProductName';

const ProductCategory = memo(({ category }: { category: string }) => (
    <div className="lg:text-lg pr-8">
        <p className="lg:text-lg pr-2">{category}</p>
    </div>
));
ProductCategory.displayName = 'ProductCategory';

const ProductStock = memo(({ stock }: { stock: number }) => (
    <div className="lg:text-lg pr-8">
        <p className="lg:text-lg pr-2">{stock}</p>
    </div>
));
ProductStock.displayName = 'ProductStock';

const ProductPrice = memo(({ price }: { price: number }) => (
    <div className="lg:text-lg pr-8">
        <p className="lg:text-lg pr-2">{price} ر.س</p>
    </div>
));
ProductPrice.displayName = 'ProductPrice';

const ProductCreatedAt = memo(({ created_at }: { created_at: string }) => (
    <div className="lg:text-lg text-gray-600">
        {new Date(created_at).toLocaleDateString('ar-SA')}
    </div>
));
ProductCreatedAt.displayName = 'ProductCreatedAt';

const ProductDescription = memo(({ description }: { description: string }) => (
    <div className="lg:text-md">{description}</div>
));
ProductDescription.displayName = 'ProductDescription';

const ActionsDropdown = memo(({ product }: { product: ProductType }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
            >
                <MoreVertical />
                <span className="sr-only">افتح القائمة</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <UpdateProductDialog currentProduct={product}>
                    <Button variant="ghost" className="w-full text-end flex h-fit py-1 justify-end px-2 items-center text-sm">
                        تعديل المُنتج
                        <Settings size={16} />
                    </Button>
                </UpdateProductDialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <DeleteProductDialog id={product.id} description="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج نهائياً من المتجر.">
                    <Button
                        variant="ghost"
                        className="w-full text-end h-fit py-1 flex gap-2 text-red-600 justify-end px-2 items-center text-sm hover:text-red-600"
                    >
                        حذف المُنتج
                        <Delete size={16} />
                    </Button>
                </DeleteProductDialog>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
));
ActionsDropdown.displayName = 'ActionsDropdown';

// Memoized column definitions to prevent recreation
export const useOptimizedColumns = (): ColumnDef<ProductType>[] => {
    return useMemo(() => [
        {
            accessorKey: "name",
            header: () => <p className="lg:text-lg pr-2">اسم المُنتج</p>,
            enableHiding: false,
            cell: ({ row }) => <ProductName name={row.original.name} />
        },
        {
            accessorKey: "category",
            header: () => <p className="lg:text-lg pr-8">الصنف</p>,
            cell: ({ row }) => <ProductCategory category={row.original.category} />
        },
        {
            accessorKey: "status",
            header: () => <p className="lg:text-lg pr-8">الحالة</p>,
            cell: ({ row }) => <ProductStatusBadge status={row.original.status} />
        },
        {
            accessorKey: "stock",
            header: () => <p className="lg:text-lg pr-8">المخزون</p>,
            cell: ({ row }) => <ProductStock stock={row.original.stock} />
        },
        {
            accessorKey: "price",
            header: () => <p className="lg:text-lg pr-8">السعر</p>,
            cell: ({ row }) => <ProductPrice price={row.original.price} />
        },
        {
            accessorKey: "created_at",
            header: () => <p className="lg:text-lg">تاريخ الإضافة</p>,
            cell: ({ row }) => <ProductCreatedAt created_at={row.original.created_at} />
        },
        {
            accessorKey: "description",
            header: () => <p className="lg:text-lg">الوصف</p>,
            cell: ({ row }) => <ProductDescription description={row.original.description} />
        },
        {
            id: "actions",
            header: () => <p className="lg:text-lg">إجراءات</p>,
            cell: ({ row }) => <ActionsDropdown product={row.original} />
        }
    ], []);
};
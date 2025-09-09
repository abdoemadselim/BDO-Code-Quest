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
import clsx from "clsx"

// Components
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Features
import { ProductType } from "@/features/products/types/types"
import UpdateProductDialog from "@/features/products/components/update-product-dialog"
import { DeleteProductDialog } from "@/features/products/components/delete-product-confirmation-dialog"
import ProductStatusBadge from "@/features/products/components/product-status-badge"

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "name",
        header: () => <p className="lg:text-lg pr-2">اسم المُنتج</p>,
        enableHiding: false,
        cell: (({ row }) => (
            <p className="lg:text-lg pr-2">{row.original.name}</p>
        ))
    },
    {
        accessorKey: "category",
        header: () => <p className="lg:text-lg pr-8">الصنف</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg pr-8">
                <p className="lg:text-lg pr-2">
                    {row.original.category}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <p className="lg:text-lg pr-8">الحالة</p>,
        cell: ({ row }) => (
            <ProductStatusBadge status={row.original.status} />
        ),
    },
    {
        accessorKey: "stock",
        header: () => <p className="lg:text-lg pr-8">المخزون</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg pr-8">
                <p className="lg:text-lg pr-2">
                    {row.original.stock}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <p className="lg:text-lg pr-8">السعر</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg pr-8">
                <p className="lg:text-lg pr-2">
                    {row.original.price} ر.س
                </p>
            </div>
        ),
    },
    {
        accessorKey: "created_at",
        header: () => <p className="lg:text-lg">تاريخ الإضافة</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg text-gray-600">
                {new Date(row.original.created_at).toLocaleDateString('ar-SA')}
            </div>
        ),
    },
    {
        accessorKey: "description",
        header: () => <p className="lg:text-lg">الوصف</p>,
        cell: ({ row }) => (
            <div className="lg:text-md">
                {row.original.description}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <p className="lg:text-lg">إجراءات</p>,
        cell: ({ row }) => {
            return (
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
                    <DropdownMenuContent align="end" >
                        <DropdownMenuItem asChild>
                            <UpdateProductDialog currentProduct={row.original}>
                                <Button variant="ghost" className="w-full text-end flex h-fit py-1 justify-end px-2 items-center text-sm">
                                    تعديل المُنتج
                                    <Settings size={16} />
                                </Button>
                            </UpdateProductDialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <DeleteProductDialog id={row.original.id} description="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج نهائياً من المتجر.">
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
                </DropdownMenu >
            )
        },
    }
]
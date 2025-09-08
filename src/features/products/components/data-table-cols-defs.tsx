'use client'

import Link from "next/link"
import { toast } from "sonner"

import {
    Badge,
    ChartArea,
    Copy,
    Delete,
    MoreVertical,
    Settings,
} from "lucide-react"
import {
    ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { openToaster } from "@/components/ui/sonner"
import { ProductType } from "../types/types"
import clsx from "clsx"
import UpdateProductDialog from "./update-product-dialog"


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
            <div className="lg:text-md pr-8">
                <div className={clsx("flex items-center px-2 gap-4 py-[1px] w-fit rounded-xl", row.original.status === "غير متوفر" ? "bg-red-200" : "bg-green-200")}>
                    <div className={clsx("w-[10px] h-[10px] rounded-full", row.original.status === "غير متوفر" ? "bg-red-500" : "bg-green-500")}></div>
                    <p className={clsx(row.original.status === "غير متوفر" ? "text-red-800" : "text-green-800")}>{row.original.status}</p>
                </div>
            </div>
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
                    ${row.original.price}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "created_at",
        header: () => <p className="lg:text-lg">تاريخ الإضافة</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg text-gray-600">
                {new Date(row.original.added_at).toLocaleDateString('ar-SA')}
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
                            <Button variant="ghost" className="w-full text-end h-fit py-1 flex gap-2 text-red-600 justify-end px-2 items-center text-sm hover:text-red-600">
                                حذف المُنتج
                                <Delete size={16} />
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    }
]
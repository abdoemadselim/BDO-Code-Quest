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
        accessorKey: "created_at",
        header: () => <p className="lg:text-lg">تاريخ الإنشاء</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg text-gray-600">
                {new Date(row.original.createdAt).toLocaleDateString('ar-EG')}
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
    // {
    //     id: "actions",
    //     header: () => <p className="lg:text-lg">إجراءات</p>,
    //     cell: ({ row }) => {
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button
    //                         variant="ghost"
    //                         className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
    //                         size="icon"
    //                     >
    //                         <MoreVertical />
    //                         <span className="sr-only">Open menu</span>
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end" >
    //                     <DropdownMenuItem
    //                         className="flex gap-2 pr-3 justify-end items-center text-right cursor-pointer"
    //                     >
    //                         <Link href={`/dashboard/urls/${row.original.alias}`} className="text-sm font-semibold">
    //                             عرض التحليلات
    //                         </Link>
    //                         <ChartArea size={16} />
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem asChild>
    //                         <UpdateUrlDialog currentUrl={row.original}>
    //                             <Button variant="ghost" className="w-full text-end flex h-fit py-1 justify-end px-2 items-center text-sm">
    //                                 تعديل الرابط
    //                                 <Settings size={16} />
    //                             </Button>
    //                         </UpdateUrlDialog>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem asChild>
    //                         <DeleteUrlDialog
    //                             resource={row.original}
    //                             title="حذف الرابط"
    //                             description="هذا الإجراء سيحذف الرابط نهائياً وسيتوقف عن العمل فوراً."
    //                             confirmationText={row.original.short_url}
    //                             confirmationLabel="اكتب الرابط المختصر لتأكيد الحذف:"
    //                         >
    //                             <Button variant="ghost" className="w-full text-end h-fit py-1 flex gap-2 text-red-600 justify-end px-2 items-center text-sm hover:text-red-600">
    //                                 حذف الرابط
    //                                 <Delete size={16} />
    //                             </Button>
    //                         </DeleteUrlDialog>
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu >
    //         )
    //     },
    // }
]
'use client'

import { useEffect } from "react"

import { openToaster } from "@/components/ui/sonner"
import DeleteItemConfirmationDialog from "@/components/ui/delete-item-confirmation-dialog"

import { useDeleteProduct } from "@/features/products/hooks/products-query"

type DeleteConfirmationDialogProps = {
    children: React.ReactNode
    title?: string
    description: string,
    id: number,
}

export function DeleteProductDialog({
    children,
    description,
    id,
}: DeleteConfirmationDialogProps) {

    const { mutateAsync, isError, isSuccess } = useDeleteProduct(id)

    useEffect(() => {
        if (isError) {
            openToaster("حدث خطأ غير متوقع في الخادم. يرجى المحاولة لاحقًا.", "error")
        }

        if (isSuccess) {
            openToaster("تم حذف المنتج بنجاح.", "success")
        }
    }, [isError, isSuccess])


    return (
        <DeleteItemConfirmationDialog description={description} handleAction={mutateAsync}>
            {children}
        </DeleteItemConfirmationDialog>
    )
}
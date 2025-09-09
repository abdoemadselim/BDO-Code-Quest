'use client'

// Libs
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { openToaster } from "@/components/ui/sonner"
import { Form } from "@/components/ui/form"

// Features
import { useCreateProduct, useGetAllProductsStatus, useGetCategories } from "@/features/products/hooks/products-query"
import { ProductFormType, ProductSchema } from "@/features/products/schema/products.schema"
import ProductForm from "@/features/products/components/product-form"

export default function CreateProductDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    // Define the form state and validation schema with React Hook Form
    const form = useForm<ProductFormType>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            category: "",
            price: 0,
            stock: 0,
            status: "متاح",
            description: "",
        },
    })

    // Fetch all available categories, products status for form selects
    const { data: categoriesData, isError: categories_error } = useGetCategories();
    const { data:  productsStatusData, isError: products_status_errors } = useGetAllProductsStatus();

    const { mutateAsync, isError, isPending, isSuccess } = useCreateProduct()

    // Form submit handler
    const onSubmit = async (data: ProductFormType) => {
        await mutateAsync(data)

        setIsOpen(false)
        form.reset()
    }

    useEffect(() => {
        if (isError || categories_error || products_status_errors) {
            openToaster("حدث خطأ غير متوقع في الخادم. يرجى المحاولة لاحقًا.", "error")
        }

        if (isSuccess) {
            openToaster("تم إنشاء المنتج بنجاح.", "success")
        }
    }, [isError, isSuccess, products_status_errors, categories_error])

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] w-[100%]">
                    <Form {...form}>
                        <ProductForm
                            categories={categoriesData?.categories || []}
                            form={form}
                            onSubmit={onSubmit}
                            productsStatus={productsStatusData?.productsStatus || []}
                            isPending={isPending}
                            create
                        />
                    </Form>
                </DialogContent>

            </Dialog >
        </>
    )
}

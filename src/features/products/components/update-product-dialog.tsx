'use client'

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { openToaster } from "@/components/ui/sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { CategoryType, ProductType } from "@/features/products/types/types"
import { ProductFormType, ProductSchema } from "@/features/products/schema/products.schema"

import { useGetAllProductsStatus, useGetCategories, useUpdateProduct } from '@/features/products/hooks/products-query';

type UpdateTokenDialogProps = {
    children: React.ReactNode
    currentProduct: ProductType
}

export default function UpdateProductDialog({ children, currentProduct }: UpdateTokenDialogProps) {
    const form = useForm<ProductFormType>({
        resolver: zodResolver(ProductSchema),
        defaultValues: currentProduct
    });

    const [isOpen, setIsOpen] = useState(false)
    const { mutateAsync, isError, isPending, isSuccess } = useUpdateProduct()

    const onSubmit = async (data: ProductType) => {
        await mutateAsync({
            ...data,
            id: currentProduct.id
        });
        setIsOpen(false);
        form.reset();
    };

    const { data: categoriesData, isError: categories_error, error } = useGetCategories();
    const { data: { productsStatus } = {} } = useGetAllProductsStatus();

    useEffect(() => {
        if (isError) {
            openToaster("حدث خطأ غير متوقع في الخادم. يرجى المحاولة لاحقًا.", "error")
        }

        if (isSuccess) {
            openToaster("تم تعديل المُنتج بنجاح.", 'success');
        }
    }, [isError, isSuccess])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[100%]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader className="flex flex-col items-start pt-4 pb-2">
                            <DialogTitle>إنشاء منتج جديد</DialogTitle>
                            <DialogDescription>
                                أدخل تفاصيل المنتج من فضلك
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            {/* Label */}
                            <div className="grid gap-3 mt-4">
                                <div className="grid max-w-[100%] items-center gap-3 mt-4">

                                    <div className="grid w-full gap-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>اسم المُنتج</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="name" placeholder="شاشة كمبيوتر" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid w-full gap-2">
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>الصنف</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="sm:w-[200px] w-full">
                                                                <SelectValue placeholder="اختر صنف" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categoriesData?.categories.map((category: CategoryType) => (
                                                                <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid w-full gap-2">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>الحالة</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="sm:w-[200px] w-full">
                                                                <SelectValue placeholder="الحالة" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {productsStatus?.map(({ status }: { status: string }) => (
                                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid max-w-sm items-center gap-3 mt-4">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>السعر (ريال سعودي)</FormLabel>
                                                    <div className="relative  w-[250px]">
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                id="price"
                                                                placeholder="0.00"
                                                                min="0"
                                                                step="0.01"
                                                                className="pr-12"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                            <span className="text-gray-500 text-sm">ر.س</span>
                                                        </div>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid w-[250px] max-w-sm items-center gap-3 mt-4">
                                        <FormField
                                            control={form.control}
                                            name="stock"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>الكمية المتوفرة</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            id="stock"
                                                            placeholder="0"
                                                            min="0"
                                                            step="1"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid w-full gap-3 mt-4">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>وصف المُنتج</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="اكتب وصفك للمنتج هنا..." id="description" className="sm:w-[350px] max-w-[100%]"  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Field */}
                        </div>
                        <DialogFooter className="sm:justify-start mt-6">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    إلغاء
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="cursor-pointer"
                                disabled={form.formState.isSubmitting || isPending}
                            >
                                {(form.formState.isSubmitting) ? "جاري التعديل..." : "تعديل المنتج"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}
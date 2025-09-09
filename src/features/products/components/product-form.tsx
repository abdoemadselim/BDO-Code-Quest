'use client'

// Components
import { Button } from "@/components/ui/button"
import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Features
import { CategoryType } from "@/features/products/types/types"

type PropsType = {
    form: any,
    categories: CategoryType[],
    productsStatus: { status: string }[],
    onSubmit: Function,
    isPending: boolean,
    create?: boolean
}

function ProductForm({ form, categories, productsStatus, onSubmit, isPending, create = false }: PropsType) {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="flex flex-col items-start pt-4 pb-2">
                <DialogTitle>
                    {create  ? "إنشاء مُنتج جديد": "تعديل المُنتج"}
                </DialogTitle>
                <DialogDescription>
                    أدخل تفاصيل المنتج من فضلك
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 ">
                {/* Fields */}
                <div className="grid gap-3 mt-4 ">
                    <div className="grid max-w-[100%] items-center gap-3 mt-4">

                        {/* Name */}
                        <div className="grid w-full gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>اسم المُنتج</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="name" placeholder="شاشة كمبيوتر" {...field} className="border-gray-300" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Category */}
                        <div className="grid w-full gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الصنف</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="sm:w-[200px] w-full border-gray-300">
                                                    <SelectValue placeholder="اختر صنف" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category: CategoryType) => (
                                                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Status */}
                        <div className="grid w-full gap-2">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الحالة</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="sm:w-[200px] w-full border-gray-300">
                                                    <SelectValue placeholder="الحالة" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {productsStatus?.map(({ status }) => (
                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Price */}
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
                                                    className="pr-12 border-gray-300"
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

                        {/* Stock */}
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
                                                className="border-gray-300"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <div className="grid w-full gap-3 mt-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>وصف المُنتج</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="اكتب وصفك للمنتج هنا..." id="description" className="sm:w-[350px] max-w-[100%] border-gray-300"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
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
                    {
                        create ? (form.formState.isSubmitting) ? "جاري الإنشاء..." : "إنشاء المنتج"
                            : (form.formState.isSubmitting) ? "جاري التعديل..." : "تعديل المنتج"
                    }


                </Button>
            </DialogFooter>
        </form>
    )
}

export default ProductForm
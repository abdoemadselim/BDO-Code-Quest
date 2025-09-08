'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginType } from '@/features/auth/schema/auth.schema'
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { login } from '@/features/auth/service/auth'
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema)
    })

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        const errors = await login(data);

        // Displaying the server errors
        for (let error in errors) {
            return setError(error as keyof LoginType, { message: errors[error].message })
        }

        // If everything is ok, update auth context and redirect
        router.replace("/") // or wherever you want to redirect after login
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card m-auto h-fit rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
            <div className="p-8 pt-2 pb-6 md:w-[500px] w-[350px] sm:w-[450px]">
                <div>
                    <h1 className="mb-1 mt-4 text-xl text-center text-primary font-semibold">تسجيل الدخول</h1>
                </div>
                <div id="root-error" aria-live="polite" aria-atomic="true" className='text-center'>
                    {errors?.root &&
                        <Alert variant="destructive" className="my-4">
                            <AlertCircleIcon />
                            <AlertTitle> {errors.root?.message}</AlertTitle>
                        </Alert>
                    }
                </div>
                <hr className="my-4 border-dashed" />

                <div className="space-y-6 ">
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="block text-md">
                            البريد الإلكتروني
                        </Label>
                        <Input
                            {...register("email")}
                            type="text"
                            name="email"
                            id="email"
                            aria-invalid={errors.email ? "true" : "false"}
                        />

                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {errors?.email &&
                                <p className="mt-2 text-sm text-red-500" role="alert">
                                    {errors.email.message}
                                </p>
                            }
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-md">
                                كلمة السر
                            </Label>
                        </div>
                        <Input
                            {...register("password")}
                            type="password"
                            name="password"
                            id="password"
                            className="input sz-md variant-mixed"
                            aria-invalid={errors.password ? "true" : "false"}
                        />

                        <div id="password-error" aria-live="polite" aria-atomic="true">
                            {errors?.password &&
                                <p className="mt-2 text-sm text-red-500" role="alert">
                                    {errors.password.message}
                                </p>
                            }
                        </div>
                    </div>

                    <Button className="w-full cursor-pointer mt-4 text-md" type="submit" disabled={isSubmitting}>
                        تسجيل الدخول
                    </Button>
                </div>
            </div>

            <div className="bg-muted rounded-(--radius) border p-3">
                <p className="text-accent-foreground text-center text-sm">
                    ليس لديك حساب؟
                    <Button
                        asChild
                        variant="link"
                        className="px-2">
                        <Link href="/auth/signup">أنشئ حسابك المجاني</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}
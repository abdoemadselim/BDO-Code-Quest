'use client'

import { useAuth } from "@/features/auth/context/auth-context";
import { redirect } from "next/navigation";

function HomePage() {
    const { user } = useAuth()
    if (user) {
        redirect("/dashboard/products")
    } else {
        redirect("/auth/login")
    }
}

export default HomePage;
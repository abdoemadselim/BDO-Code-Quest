import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/service/auth-session"

async function HomePage() {
    const session = await getSession()

    if (session) {
        redirect("/dashboard/products")
    } else {
        redirect("/auth/login")
    }
}

export default HomePage;
'use client'

import { Book, Package, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/sidebar/sidebar"

// Menu items.
const items = [
    {
        title: "المُنتجات",
        url: "/dashboard/products",
        icon: <Book />,
    },
    {
        title: "العملاء",
        url: "/dashboard/customers",
        icon: <User />,
    },
    {
        title: "الطلبات",
        url: "/dashboard/orders",
        icon: <Package />,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent"
                        >
                            <Link href="/" className="h-[80px]">
                                <Image
                                    src="/logo.webp"
                                    alt="شعار أداء"
                                    width="80"
                                    height="80"
                                    fetchPriority="high"
                                    priority
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent className="pt-6">
                <SidebarGroup >
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="pb-2">
                                    <SidebarMenuButton asChild className={`${pathname === item.url && "bg-amber-600 text-white"} hover:bg-amber-600/70 transition-colors duration-60 ease-in-out hover:text-white`}>
                                        <Link href={item.url} className="flex items-center gap-4" >
                                            {item.icon}
                                            <span className="text-xl">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
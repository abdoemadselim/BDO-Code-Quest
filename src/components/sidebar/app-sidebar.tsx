'use client'

// Libs
import { Book, ChevronUp, LogOut,  User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"

// Components
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Features
import { useAuth } from "@/features/auth/context/auth-context"

// Menu items.
const items = [
    {
        title: "المُنتجات",
        url: "/dashboard/products",
        icon: <Book />,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const { user, logout } = useAuth()
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
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="text-lg">
                                    <User2 /> {user?.name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                side="top"
                            >
                                <DropdownMenuItem className="flex items-center gap-6 cursor-pointer" onClick={() => {
                                    logout()
                                    redirect("/auth/login")
                                }}>
                                    <LogOut color="red" />
                                    <span className="text-red-500 hover:text-red-500">تسجيل الخروج</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
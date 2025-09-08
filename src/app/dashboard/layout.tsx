import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/sidebar/sidebar";
import { SiteHeader } from "@/components/sidebar/sidebar-trigger";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            } >
            <AppSidebar variant="inset" side="right" className="pt-4" />
            <SidebarInset className="border-r-1">
                <SiteHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}

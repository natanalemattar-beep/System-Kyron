
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing";
import { usePathname } from "next/navigation";

const user = { name: "Administrador", email: "admin@kyron.com", fallback: "AD" };
const dashboardHref = "/dashboard-empresa";

export default function MainLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // The root page is the landing page
    if (pathname === '/') {
        return (
             <div className="flex flex-col min-h-dvh bg-background text-foreground">
                <LandingHeader />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
                <ChatDialog />
            </div>
        )
    }

    // All other pages in this layout are part of the authenticated app
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <AppHeader user={user} navGroups={adminNavGroups} dashboardHref={dashboardHref} />
            <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
                {children}
            </main>
            <Toaster />
            <ChatDialog />
        </div>
    );
}

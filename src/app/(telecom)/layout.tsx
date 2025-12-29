
'use client';

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { telecomNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { SplashScreen } from "@/components/splash-screen";

const user = { name: "Telecom", email: "telecom@kyron.com", fallback: "TE" };
const dashboardHref = "/dashboard-telecom";

export default function TelecomLayout({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Simulate data fetching
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

  return (
    <div className="flex flex-col min-h-screen bg-card text-foreground">
      <AppHeader user={user} navGroups={telecomNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}

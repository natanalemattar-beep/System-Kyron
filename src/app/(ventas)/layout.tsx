
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { ventasNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { SplashScreen } from "@/components/splash-screen";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { useUser } from "@/firebase";

const user = { name: "Vendedor", email: "ventas@kyron.com", fallback: "VE" };
const dashboardHref = "/analisis-ventas";


export default function VentasLayout({ children }: { children: ReactNode }) {
  const { isUserLoading } = useUser();

  if (isUserLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DynamicBackground />
      <AppHeader user={user} navGroups={ventasNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}

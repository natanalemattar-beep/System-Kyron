
'use client';

import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { rrhhNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "RR.HH.", email: "rrhh@kyron.com", fallback: "RH" };

    return (
      <div className="flex flex-col min-h-screen">
          <AppHeader user={user} navGroups={rrhhNavGroups} dashboardHref="/dashboard-rrhh" />
          <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
              {children}
          </main>
          <ChatDialog />
      </div>
    );
}

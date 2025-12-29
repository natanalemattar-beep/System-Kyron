
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { legalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { DynamicBackground } from "@/components/ui/dynamic-background";

const user = { name: "Abogado", email: "legal@kyron.com", fallback: "AB" };
const dashboardHref = "/legal/escritorio-juridico";

export default function LegalLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DynamicBackground />
      <AppHeader user={user} navGroups={legalNavGroups} dashboardHref={dashboardHref} />
      <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
        {children}
      </main>
      <Toaster />
      <ChatDialog />
    </div>
  );
}

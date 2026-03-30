'use client';

import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { telecomNavGroups } from "@/components/app-sidebar-nav-items";
import { PageTracker } from "@/components/page-tracker";

export default function TelecomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Área Técnica", email: "telecom@kyron.com", fallback: "TE" };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-amber-500/[0.04] rounded-full blur-[200px] opacity-40" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-amber-600 shadow-glow-secondary"}} 
                dashboardHref="/dashboard-telecom" 
                navGroups={telecomNavGroups}
              />
              <main className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              <footer className="p-10 border-t border-border bg-card/10 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron • Telecom Central • 2026
                </p>
              </footer>
          </div>
          <LazyChatDialog />
      </div>
    );
}
'use client';

import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { telecomNavGroups } from "@/components/app-sidebar-nav-items";
import { PageTracker } from "@/components/page-tracker";
import { FinancialToolkit } from "@/components/financial-toolkit";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function TelecomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Área Técnica", email: "telecom@kyron.com", fallback: "TE" };

    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(170,15%,93%)] via-background to-[hsl(200,16%,92%)] dark:from-[hsl(170,10%,10%)] dark:via-background dark:to-[hsl(200,10%,8%)] text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-[-5%] right-[-10%] w-[800px] h-[800px] bg-amber-400/[0.05] rounded-full blur-[250px]" />
            <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-teal-300/[0.04] rounded-full blur-[220px]" />
            <div className="absolute top-[30%] right-[20%] w-[500px] h-[500px] bg-emerald-300/[0.03] rounded-full blur-[200px]" />
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
          <ScrollToTop />
          <FinancialToolkit />
          <LazyChatDialog />
      </div>
    );
}
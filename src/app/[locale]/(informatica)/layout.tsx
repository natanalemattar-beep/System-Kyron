'use client';

import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { informaticaNavGroups } from "@/components/app-sidebar-nav-items";
import { PageTracker } from "@/components/page-tracker";

export default function InformaticaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Dpto. IT", email: "it@kyron.com", fallback: "IT" };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/[0.04] rounded-full blur-[200px] opacity-40" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-blue-500/[0.02] rounded-full blur-[180px] opacity-30" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.01] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-cyan-600 shadow-glow-secondary"}} 
                dashboardHref="/dashboard-it" 
                navGroups={informaticaNavGroups}
              />
              <main className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              <footer className="p-10 border-t border-border bg-card/10 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron • Informática & Tecnología • 2026
                </p>
              </footer>
          </div>
          <LazyChatDialog />
      </div>
    );
}

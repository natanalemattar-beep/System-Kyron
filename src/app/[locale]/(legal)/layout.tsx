'use client';

import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { legalNavGroups } from "@/components/app-sidebar-nav-items";
import { PageTracker } from "@/components/page-tracker";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Abogado", email: "legal@kyron.com", fallback: "AB" };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative overflow-x-hidden hud-grid">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(30deg,hsl(var(--primary))_12%,transparent_12.5%,transparent_87%,hsl(var(--primary))_87.5%,hsl(var(--primary)))] [background-size:80px_140px]" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.05] rounded-full blur-[250px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-slate-800 shadow-glow"}} 
                dashboardHref="/escritorio-juridico" 
                navGroups={legalNavGroups}
              />
              <main className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              <footer className="p-10 border-t border-border bg-card/10 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron v2.8.5 • Legal Guard • 2026
                </p>
              </footer>
          </div>
          <LazyChatDialog />
      </div>
    );
}
'use client';

import dynamic from "next/dynamic";
import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { PageTracker } from "@/components/page-tracker";
import { FinancialToolkit } from "@/components/financial-toolkit";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { useAuth } from "@/lib/auth/context";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user: authUser } = useAuth();
    const displayName = authUser?.tipo === 'juridico'
      ? (authUser?.razon_social || authUser?.nombre || "Empresa")
      : `${authUser?.nombre || ""}${authUser?.apellido ? ' ' + authUser.apellido : ''}`.trim() || "Usuario";
    const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "US";
    const user = { name: displayName, email: authUser?.email || "", fallback: initials };

    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(170,18%,94%)] via-background to-[hsl(208,20%,92%)] dark:from-[hsl(170,10%,10%)] dark:via-background dark:to-[hsl(208,12%,8%)] text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-0 right-[-5%] w-[900px] h-[900px] bg-emerald-400/[0.06] rounded-full blur-[280px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-cyan-400/[0.05] rounded-full blur-[250px]" />
            <div className="absolute top-[30%] left-[40%] w-[600px] h-[600px] bg-teal-300/[0.04] rounded-full blur-[200px]" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader user={{...user, color: "bg-primary"}} dashboardHref="/resumen-negocio" navGroups={adminNavGroups} />
              
              <main className="flex-1 w-full pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              
              <footer className="p-8 border-t border-border bg-card/80 text-center backdrop-blur-3xl relative z-20">
                <p className="text-[11px] font-semibold uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron • 2026
                </p>
              </footer>
          </div>
          <ScrollToTop />
          <FinancialToolkit />
          <WelcomeTutorial />
          <LazyChatDialog />
      </div>
    );
}
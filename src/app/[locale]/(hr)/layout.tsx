'use client';

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { rrhhNavGroups, asesoriaContableNavGroups } from "@/components/app-sidebar-nav-items";
import { PageTracker } from "@/components/page-tracker";
import { FinancialToolkit } from "@/components/financial-toolkit";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { useAuth } from "@/lib/auth/context";
import { getModuleContext, useSetModuleContext } from "@/lib/module-context";

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user: authUser } = useAuth();
    const [fromAdmin, setFromAdmin] = useState(false);

    useEffect(() => {
        const prevCtx = getModuleContext();
        if (prevCtx === "admin") {
            setFromAdmin(true);
        }
    }, []);

    useSetModuleContext("hr");

    const displayName = authUser?.tipo === 'juridico'
      ? (authUser?.razon_social || authUser?.nombre || "Empresa")
      : `${authUser?.nombre || ""}${authUser?.apellido ? ' ' + authUser.apellido : ''}`.trim() || "Usuario";
    const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "US";
    const userColor = fromAdmin ? "bg-primary shadow-glow" : "bg-secondary shadow-glow-secondary";
    const user = { name: displayName, email: authUser?.email || "", fallback: initials, color: userColor };

    const navGroups = fromAdmin ? asesoriaContableNavGroups : rrhhNavGroups;
    const dashHref = fromAdmin ? "/dashboard-empresa" : "/dashboard-rrhh";
    const footerLabel = fromAdmin ? "Portal Empresarial" : "RRHH";

    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(160,16%,93%)] via-background to-[hsl(195,18%,92%)] dark:from-[hsl(160,10%,10%)] dark:via-background dark:to-[hsl(195,12%,8%)] text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-400/[0.06] rounded-full blur-[250px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-teal-300/[0.05] rounded-full blur-[220px]" />
            <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-cyan-300/[0.04] rounded-full blur-[200px]" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={user} 
                dashboardHref={dashHref}
                navGroups={navGroups}
              />
              <main className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              <footer className="p-10 border-t border-border bg-card/10 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron • {footerLabel} • 2026
                </p>
              </footer>
          </div>
          <ScrollToTop />
          <FinancialToolkit />
          <LazyChatDialog />
      </div>
    );
}

'use client';

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/app-header";

import { PageTransition } from "@/components/ui/motion";
import { rrhhNavGroups, asesoriaContableNavGroups } from "@/components/app-sidebar-nav-items";
import { PageTracker } from "@/components/page-tracker";
import { FinancialToolkit } from "@/components/financial-toolkit";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AIChatButton } from "@/components/ui/ai-chat-button";
import { useAuth } from "@/lib/auth/context";
import { getModuleContext, useSetModuleContext } from "@/lib/module-context";
import { ModuleGuard } from "@/components/module-guard";

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user: authUser } = useAuth();
    const [fromAdmin, setFromAdmin] = useState(false);

    useEffect(() => {
        const prevCtx = getModuleContext();
        if (prevCtx === "asesoria-contable") {
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
    const dashHref = fromAdmin ? "/dashboard-empresas" : "/dashboard-rrhh";
    const footerLabel = fromAdmin ? "Portal Empresarial" : "RRHH";

    return (
      <ModuleGuard layoutKey="hr">
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(160,16%,93%)] via-background to-[hsl(195,18%,92%)] dark:from-[hsl(160,10%,10%)] dark:via-background dark:to-[hsl(195,12%,8%)] text-foreground relative">
          <PageTracker />
          <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-emerald-400/[0.02] via-transparent to-cyan-400/[0.02]" />

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
                <footer className="p-10 border-t border-border bg-card text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron • {footerLabel} • 2026
                </p>
              </footer>
          </div>
          <ScrollToTop />
          <FinancialToolkit />
          <AIChatButton contextKey="kyron-empresas" />
          </div>
       </ModuleGuard>
     );
 }

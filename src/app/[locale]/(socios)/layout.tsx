'use client';

import { AppHeader } from "@/components/app-header";

import { FinancialToolkit } from "@/components/financial-toolkit";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AIChatButton } from "@/components/ui/ai-chat-button";
import { PageTransition } from "@/components/ui/motion";
import { sociosNavGroups } from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { useSetModuleContext } from "@/lib/module-context";
import { ModuleGuard } from "@/components/module-guard";

export default function SociosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user: authUser } = useAuth();
    useSetModuleContext("socios");
    const displayName = authUser?.tipo === 'juridico'
      ? (authUser?.razon_social || authUser?.nombre || "Empresa")
      : `${authUser?.nombre || ""}${authUser?.apellido ? ' ' + authUser.apellido : ''}`.trim() || "Usuario";
    const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "US";
    const user = { name: displayName, email: authUser?.email || "", fallback: initials };

    return (
      <ModuleGuard layoutKey="socios">
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(172,14%,93%)] via-background to-[hsl(215,18%,92%)] dark:from-[hsl(172,10%,10%)] dark:via-background dark:to-[hsl(215,12%,8%)] text-foreground relative">
          <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-indigo-400/[0.02] via-transparent to-emerald-400/[0.02]" />

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={{...user, color: "bg-indigo-900 shadow-glow"}} 
                dashboardHref="/dashboard-socios" 
                navGroups={sociosNavGroups}
              />
              <main className="flex-1 w-full p-4 md:p-8 pt-20 relative z-10">
                  <PageTransition>
                    {children}
                  </PageTransition>
              </main>
              <footer className="p-10 border-t border-border bg-card text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron • 2026
                </p>
              </footer>
          </div>
          <ScrollToTop />
          <FinancialToolkit />
          <AIChatButton contextKey="socios" />
 
          </div>
       </ModuleGuard>
     );
 }


'use client';

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { 
    naturalNavGroups, 
    asesoriaContableNavGroups, 
    ventasNavGroups, 
    legalNavGroups, 
    sociosNavGroups, 
    telecomNavGroups,
    sostenibilidadNavGroups,
    informaticaNavGroups,
    rrhhNavGroups
} from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { usePathname } from "@/navigation";
import { getModuleContext, isSharedPage, useSetModuleContext, type ModuleContext } from "@/lib/module-context";
import { PageTracker } from "@/components/page-tracker";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FinancialToolkit } from "@/components/financial-toolkit";

const MODULE_CONFIG: Record<ModuleContext, { dashboardHref: string; navGroups: typeof naturalNavGroups; footerLabel: string; userColor: string }> = {
    natural: { dashboardHref: "/dashboard", navGroups: naturalNavGroups, footerLabel: "Portal Ciudadano", userColor: "bg-primary" },
    admin: { dashboardHref: "/dashboard-empresa", navGroups: asesoriaContableNavGroups, footerLabel: "Portal Empresarial", userColor: "bg-primary shadow-glow" },
    ventas: { dashboardHref: "/estrategias-ventas", navGroups: ventasNavGroups, footerLabel: "Portal de Ventas", userColor: "bg-emerald-600 shadow-glow-secondary" },
    legal: { dashboardHref: "/escritorio-juridico", navGroups: legalNavGroups, footerLabel: "Asesoría Legal", userColor: "bg-slate-800 shadow-glow" },
    socios: { dashboardHref: "/dashboard-socios", navGroups: sociosNavGroups, footerLabel: "Portal de Socios", userColor: "bg-indigo-900 shadow-glow" },
    informatica: { dashboardHref: "/dashboard-it", navGroups: naturalNavGroups, footerLabel: "Informática", userColor: "bg-cyan-600 shadow-glow-secondary" },
    telecom: { dashboardHref: "/dashboard-telecom", navGroups: telecomNavGroups, footerLabel: "Telecom", userColor: "bg-amber-600 shadow-glow-secondary" },
    hr: { dashboardHref: "/dashboard-rrhh", navGroups: naturalNavGroups, footerLabel: "Talento Humano", userColor: "bg-secondary shadow-glow-secondary" },
    sostenibilidad: { dashboardHref: "/sostenibilidad", navGroups: sostenibilidadNavGroups, footerLabel: "Sostenibilidad", userColor: "bg-primary" },
};

export default function NaturalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user: authUser } = useAuth();
    const pathname = usePathname();
    const onSharedPage = isSharedPage(pathname);
    const [storedContext, setStoredContext] = useState<ModuleContext>("natural");

    useEffect(() => {
      if (onSharedPage) {
        setStoredContext(getModuleContext());
      }
    }, [onSharedPage, pathname]);

    useSetModuleContext(onSharedPage ? storedContext : "natural");

    const activeCtx = onSharedPage ? storedContext : "natural";
    const config = MODULE_CONFIG[activeCtx] || MODULE_CONFIG.natural;

    const fullName = authUser ? `${authUser.nombre}${authUser.apellido ? ' ' + authUser.apellido : ''}` : "Usuario";
    const initials = fullName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "US";
    const user = { 
        name: fullName,
        email: authUser?.email || "",
        fallback: initials,
        color: config.userColor
    };

    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(165,16%,94%)] via-background to-[hsl(200,18%,93%)] dark:from-[hsl(165,10%,10%)] dark:via-background dark:to-[hsl(200,12%,8%)] text-foreground relative">
          <PageTracker userId={authUser?.id} />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-teal-300/[0.06] rounded-full blur-[280px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[700px] h-[700px] bg-sky-300/[0.05] rounded-full blur-[250px]" />
            <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-emerald-300/[0.04] rounded-full blur-[200px]" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={user} 
                dashboardHref={config.dashboardHref} 
                navGroups={config.navGroups}
              />
              
              <main className="flex-1 w-full p-4 md:p-10 pt-24 md:pt-32 relative z-10">
                  <PageTransition className="max-w-7xl mx-auto w-full">
                    {children}
                  </PageTransition>
              </main>
              
              <footer className="p-8 md:p-12 border-t border-border/20 bg-card/60 text-center mt-20 relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron • {config.footerLabel} • 2026
                </p>
              </footer>
          </div>
          <ScrollToTop />
          <FinancialToolkit />
          <LazyChatDialog />
      </div>
    );
}

'use client';

import dynamic from "next/dynamic";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { PageTransition } from "@/components/ui/motion";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { PreferencesProvider, usePreferences } from "@/lib/preferences-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { PageTracker } from "@/components/page-tracker";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FinancialToolkit } from "@/components/financial-toolkit";

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false });

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const { prefs } = usePreferences();
    const displayName = user?.nombre || "Empresa";
    const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "AD";
    const headerUser = { 
        name: displayName,
        email: user?.email || "",
        fallback: initials,
        color: "bg-primary shadow-glow"
    };

    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[hsl(170,20%,94%)] via-background to-[hsl(210,22%,92%)] dark:from-[hsl(170,10%,10%)] dark:via-background dark:to-[hsl(210,12%,8%)] text-foreground relative">
          <PageTracker userId={user?.id} />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.03] hud-grid" />
            <div className="absolute top-0 right-[-10%] w-[900px] h-[900px] bg-emerald-400/[0.06] rounded-full blur-[250px]" />
            <div className="absolute top-[30%] left-[-5%] w-[700px] h-[700px] bg-cyan-400/[0.05] rounded-full blur-[280px]" />
            <div className="absolute -bottom-[10%] right-[20%] w-[600px] h-[600px] bg-blue-400/[0.04] rounded-full blur-[200px]" />
          </div>

          {prefs.nav_lateral && (
            <div className="hidden lg:flex w-[280px] shrink-0 border-r border-border/20 bg-card/30 backdrop-blur-xl fixed inset-y-0 left-0 z-40 flex-col">
              <AppSidebar />
            </div>
          )}

          <div className={`flex-1 flex flex-col min-h-screen relative w-full ${prefs.nav_lateral ? 'lg:ml-[280px]' : ''}`}>
              <AppHeader 
                user={headerUser} 
                dashboardHref="/dashboard-empresa" 
                navGroups={adminNavGroups}
                compact={prefs.nav_lateral}
              />
              
              <main className="flex-1 w-full p-4 md:p-10 pt-24 md:pt-32 relative z-10">
                  <PageTransition className="max-w-[1400px] mx-auto w-full">
                    {children}
                  </PageTransition>
              </main>
              
              <footer className="p-8 md:p-12 border-t border-white/5 bg-card/40 text-center backdrop-blur-3xl mt-20 relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron • Portal Empresarial • 2026
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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <PreferencesProvider>
        <CurrencyProvider>
          <AdminLayoutInner>{children}</AdminLayoutInner>
        </CurrencyProvider>
      </PreferencesProvider>
    );
}

'use client';

import dynamic from "next/dynamic";
import { AppHeader } from "@/components/app-header";
import { asesoriaContableNavGroups } from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { useSetModuleContext } from "@/lib/module-context";
import { PreferencesProvider } from "@/lib/preferences-context";
import { CurrencyProvider } from "@/lib/currency-context";

import { ModuleGuard } from "@/components/module-guard";

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false, loading: () => null });
const FinancialToolkit = dynamic(() => import('@/components/financial-toolkit').then(m => ({ default: m.FinancialToolkit })), { ssr: false, loading: () => null });
const AIChatButton = dynamic(() => import('@/components/ui/ai-chat-button').then(m => ({ default: m.AIChatButton })), { ssr: false, loading: () => null });
const ScrollToTop = dynamic(() => import('@/components/ui/scroll-to-top').then(m => ({ default: m.ScrollToTop })), { ssr: false, loading: () => null });
const PageTracker = dynamic(() => import('@/components/page-tracker').then(m => ({ default: m.PageTracker })), { ssr: false, loading: () => null });

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    useSetModuleContext("admin");
    const displayName = user?.tipo === 'juridico'
      ? (user?.razon_social || user?.nombre || "Empresa")
      : `${user?.nombre || ""}${user?.apellido ? ' ' + user.apellido : ''}`.trim() || "Usuario";
    const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "US";
    const userObj = { name: displayName, email: user?.email || "", fallback: initials, color: "bg-primary shadow-glow" };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(170,20%,94%)] via-background to-[hsl(210,22%,92%)] dark:from-[hsl(170,10%,10%)] dark:via-background dark:to-[hsl(210,12%,8%)] text-foreground relative">
          <PageTracker userId={user?.id} />
          <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-emerald-400/[0.02] via-transparent to-cyan-400/[0.02]" />

          <AppHeader user={userObj} dashboardHref="/dashboard-empresas" navGroups={asesoriaContableNavGroups} />
          
          <main className="w-full p-4 md:p-10 pt-24 md:pt-28 relative z-10">
              <div                className="max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
                {children}
              </div>
          </main>
          
          <footer className="p-8 md:p-12 border-t border-border bg-card text-center mt-20 relative z-20">
            <p className="text-[10px] font-semibold uppercase tracking-[1.2em] text-foreground/10 italic">
              System Kyron • Portal Empresarial • 2026
            </p>
          </footer>
          <ScrollToTop />
          <FinancialToolkit />
          <WelcomeTutorial />
          <AIChatButton contextKey="kyron-empresas" />
          </div>
     );
 }

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <ModuleGuard layoutKey="admin">
        <PreferencesProvider>
          <CurrencyProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
          </CurrencyProvider>
        </PreferencesProvider>
      </ModuleGuard>
    );
}

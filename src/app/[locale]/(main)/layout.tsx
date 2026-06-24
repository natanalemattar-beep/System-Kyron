'use client';

import dynamic from "next/dynamic";
import { AppHeader } from "@/components/app-header";

import { useAuth } from "@/lib/auth/context";
import { asesoriaContableNavGroups } from "@/components/app-sidebar-nav-items";

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false, loading: () => null });
const FinancialToolkit = dynamic(() => import('@/components/financial-toolkit').then(m => ({ default: m.FinancialToolkit })), { ssr: false, loading: () => null });
const AIChatButton = dynamic(() => import('@/components/ui/ai-chat-button').then(m => ({ default: m.AIChatButton })), { ssr: false, loading: () => null });
const ScrollToTop = dynamic(() => import('@/components/ui/scroll-to-top').then(m => ({ default: m.ScrollToTop })), { ssr: false, loading: () => null });
const PageTracker = dynamic(() => import('@/components/page-tracker').then(m => ({ default: m.PageTracker })), { ssr: false, loading: () => null });

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
          <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-emerald-400/[0.02] via-transparent to-cyan-400/[0.02]" />

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader user={{...user, color: "bg-primary"}} dashboardHref="/dashboard-empresas" navGroups={asesoriaContableNavGroups} />
              
              <main className="flex-1 w-full pt-20 relative z-10">
                  <div className="animate-in fade-in duration-300" style={{ willChange: 'opacity' }}>
                    {children}
                  </div>
              </main>
              
              <footer className="p-8 border-t border-border bg-card text-center relative z-20">
                <p className="text-[11px] font-semibold uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron • 2026
                </p>
              </footer>
          </div>
          <ScrollToTop />
          <FinancialToolkit />
          <WelcomeTutorial />
          <AIChatButton contextKey="kyron-chat" />
 
       </div>
     );
 }

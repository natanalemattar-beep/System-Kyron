'use client';

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { PageTransition } from "@/components/ui/motion";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { PreferencesProvider, usePreferences } from "@/lib/preferences-context";
import { PageTracker } from "@/components/page-tracker";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";

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
      <div className="flex min-h-screen bg-background text-foreground relative overflow-x-hidden">
          <PageTracker userId={user?.id} />
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.04] hud-grid" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.02] rounded-full blur-[300px]" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[200px]" />
          </div>

          {prefs.nav_lateral && (
            <div className="hidden lg:flex w-[280px] shrink-0 border-r border-border/20 bg-card/30 backdrop-blur-xl fixed inset-y-0 left-0 z-40 flex-col">
              <AppSidebar />
            </div>
          )}

          <div className={`flex-1 flex flex-col min-h-screen relative w-full overflow-x-hidden ${prefs.nav_lateral ? 'lg:ml-[280px]' : ''}`}>
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
                  System Kyron v2.8.5 Demo • Portal Empresarial • 2026
                </p>
              </footer>
          </div>
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
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </PreferencesProvider>
    );
}

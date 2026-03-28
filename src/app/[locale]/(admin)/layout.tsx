
'use client';

import { AppHeader } from "@/components/app-header";
import { ChatDialog } from "@/components/chat-dialog";
import { PageTransition } from "@/components/ui/motion";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { PageTracker } from "@/components/page-tracker";

/**
 * @fileOverview Layout Administrativo Consolidado.
 * En v2.6.5 se elimina la sidebar permanente de escritorio para maximizar el área de trabajo.
 * La navegación móvil se gestiona dinámicamente desde el AppHeader.
 */

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user } = useAuth();
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
          {/* Fondo HUD Dinámico */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.04] hud-grid" />
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.02] rounded-full blur-[300px]" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[200px]" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full overflow-x-hidden">
              <AppHeader 
                user={headerUser} 
                dashboardHref="/dashboard-empresa" 
                navGroups={adminNavGroups}
              />
              
              <main className="flex-1 w-full p-4 md:p-10 pt-24 md:pt-32 relative z-10">
                  <PageTransition className="max-w-[1400px] mx-auto w-full">
                    {children}
                  </PageTransition>
              </main>
              
              <footer className="p-8 md:p-12 border-t border-white/5 bg-card/40 text-center backdrop-blur-3xl mt-20 relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron v2.7.0 Demo • Portal Empresarial • 2026
                </p>
              </footer>
          </div>
          <ChatDialog />
      </div>
    );
}

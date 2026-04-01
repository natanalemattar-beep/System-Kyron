
'use client';

import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { naturalNavGroups } from "@/components/app-sidebar-nav-items";
import { useAuth } from "@/lib/auth/context";
import { PageTracker } from "@/components/page-tracker";

/**
 * @fileOverview Layout del Portal Natural (Ciudadano).
 * Proporciona un entorno UHD refinado para la gestión de identidad personal.
 */

export default function NaturalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user: authUser } = useAuth();
    const fullName = authUser ? `${authUser.nombre}${authUser.apellido ? ' ' + authUser.apellido : ''}` : "Usuario";
    const initials = fullName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase() || "US";
    const user = { 
        name: fullName,
        email: authUser?.email || "",
        fallback: initials,
        color: "bg-primary"
    };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative">
          <PageTracker userId={authUser?.id} />
          {/* Fondo HUD Ciudadano - Menos agresivo, más elegante */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.02] hud-grid" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/[0.03] rounded-full blur-[250px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.01] mix-blend-overlay" />
          </div>

          <div className="flex-1 flex flex-col min-h-screen relative w-full">
              <AppHeader 
                user={user} 
                dashboardHref="/dashboard" 
                navGroups={naturalNavGroups}
              />
              
              <main className="flex-1 w-full p-4 md:p-10 pt-24 md:pt-32 relative z-10">
                  <PageTransition className="max-w-7xl mx-auto w-full">
                    {children}
                  </PageTransition>
              </main>
              
              <footer className="p-8 md:p-12 border-t border-white/5 bg-card/40 text-center backdrop-blur-3xl mt-20 relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-foreground/10 italic">
                  System Kyron • Portal Ciudadano • 2026
                </p>
              </footer>
          </div>
          <LazyChatDialog />
      </div>
    );
}

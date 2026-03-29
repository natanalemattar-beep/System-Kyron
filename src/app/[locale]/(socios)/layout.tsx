'use client';

import { AppHeader } from "@/components/app-header";
import { LazyChatDialog } from "@/components/chat-dialog-lazy";
import { PageTransition } from "@/components/ui/motion";
import { sociosNavGroups } from "@/components/app-sidebar-nav-items";

export default function SociosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = { name: "Socio", email: "socio@kyron.com", fallback: "SO" };

    return (
      <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden">
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.05] rounded-full blur-[200px] opacity-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-800/[0.05] rounded-full blur-[180px] opacity-30" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          </div>

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
              <footer className="p-10 border-t border-border bg-card/10 text-center backdrop-blur-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-foreground/10 italic">
                  System Kyron v2.8.5 • Strategy Node • 2026
                </p>
              </footer>
          </div>
          <LazyChatDialog />
      </div>
    );
}
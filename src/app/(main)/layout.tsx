
'use client';

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import dynamic from "next/dynamic";
import { usePathname } from 'next/navigation';

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(mod => mod.WelcomeTutorial), { ssr: false });

export default function MainAppLayout({ children }: { children: ReactNode }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const pathname = usePathname();

  // Determine user based on path
  let user;
  if (pathname.startsWith('/dashboard-empresa') || pathname.startsWith('/analisis-ventas')) {
    user = { name: "Admin", email: "admin@kyron.com", fallback: "A" };
  } else if (pathname.startsWith('/dashboard-rrhh')) {
    user = { name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" };
  } else if (pathname.startsWith('/dashboard-socios')) {
    user = { name: "Socio Director", email: "socio@kyron.com", fallback: "S" };
  } else if (pathname.startsWith('/dashboard-informatica')) {
    user = { name: "Ingeniería", email: "it@kyron.com", fallback: "IT" };
  } else if (pathname.startsWith('/asesoria-publicidad')) {
    user = { name: "Marketing", email: "mkt@kyron.com", fallback: "M" };
  } else if (pathname.startsWith('/escritorio-juridico')) {
    user = { name: "Legal", email: "legal@kyron.com", fallback: "L" };
  } else {
    user = { name: "Usuario", email: "usuario@email.com", fallback: "UN" };
  }
  
  useEffect(() => {
    // Only show tutorial on main dashboard pages after login
    if (pathname === '/dashboard-empresa' || pathname === '/dashboard') {
        const hasSeenKyronTutorial = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeenKyronTutorial) {
            setTimeout(() => {
                setShowTutorial(true);
                localStorage.setItem("hasSeenKyronTutorial", "true");
            }, 500);
        }
    }
  }, [pathname]);
  
  return (
     <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AppHeader user={user} />
        <main className="flex-1 container mx-auto p-4 md:p-8">
            {children}
        </main>
        <Toaster />
        {showTutorial && <WelcomeTutorial open={showTutorial} onOpenChange={setShowTutorial} />}
    </div>
  );
}

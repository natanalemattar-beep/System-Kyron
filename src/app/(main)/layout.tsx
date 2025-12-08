
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import dynamic from "next/dynamic";
import { usePathname } from 'next/navigation';
import { AlertTriangle } from "lucide-react";

// Dynamically import WelcomeTutorial with SSR turned off
const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial'), { ssr: false });

export default function MainAppLayout({ children }: { children: ReactNode }) {
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
  } else if (pathname.startsWith('/dashboard-telecom')) {
    user = { name: "Telecom", email: "telecom@kyron.com", fallback: "T" };
  } else {
    user = { name: "Usuario", email: "usuario@email.com", fallback: "UN" };
  }
  
  return (
     <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AppHeader user={user} />
        <div className="flex-1 flex flex-col">
          <div className="bg-yellow-400/10 border-y border-yellow-400/20 py-2 sticky top-16 z-40">
              <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <p>
                      <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
                  </p>
              </div>
          </div>
          <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center">
              <div className="w-full max-w-7xl">
                {children}
              </div>
          </main>
        </div>
        <Toaster />
        <WelcomeTutorial />
    </div>
  );
}


'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import dynamic from "next/dynamic";
import { usePathname } from 'next/navigation';
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import WelcomeTutorial with SSR turned off
const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial'), { ssr: false });

const getUserForPath = (pathname: string) => {
    if (pathname.startsWith('/dashboard-empresa') || pathname.startsWith('/analisis') || pathname.startsWith('/cuentas-por') || pathname.startsWith('/facturacion') || pathname.startsWith('/contabilidad') || pathname.startsWith('/tramites-fiscales') || pathname.startsWith('/reports') || pathname.startsWith('/inventario')) {
        return { name: "Admin", email: "admin@kyron.com", fallback: "A" };
    }
    if (pathname.startsWith('/dashboard-rrhh') || pathname.startsWith('/nominas') || pathname.startsWith('/libro-')) {
        return { name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" };
    }
    if (pathname.startsWith('/dashboard-socios')) {
        return { name: "Socio Director", email: "socio@kyron.com", fallback: "S" };
    }
    if (pathname.startsWith('/dashboard-informatica') || pathname.startsWith('/seguridad') || pathname.startsWith('/arquitectura-software-contable') || pathname.startsWith('/facturacion-futurista') || pathname.startsWith('/ingenieria-ia')) {
        return { name: "Ingeniería", email: "it@kyron.com", fallback: "IT" };
    }
    if (pathname.startsWith('/asesoria')) {
        return { name: "Marketing", email: "mkt@kyron.com", fallback: "M" };
    }
     if (pathname.startsWith('/escritorio-juridico') || pathname.startsWith('/contratos') || pathname.startsWith('/permisos')) {
        return { name: "Legal", email: "legal@kyron.com", fallback: "L" };
    }
    if (pathname.startsWith('/dashboard-telecom')) {
        return { name: "Telecom", email: "telecom@kyron.com", fallback: "T" };
    }
    // Default case for personal user
    return { name: "Usuario", email: "usuario@email.com", fallback: "UN" };
  }


export default function MainAppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const user = getUserForPath(pathname);
  
  return (
     <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AppHeader user={user} />
        <div className="flex-1 flex flex-col pt-16 md:pt-[calc(4rem+1rem)]">
           <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                delay: 0.5,
                type: 'spring',
                stiffness: 80,
                damping: 15,
                mass: 1,
            }}
            className="bg-yellow-400/10 border-y border-yellow-400/20 py-2 sticky top-16 md:top-[calc(4rem+1rem)] z-40"
          >
              <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <p>
                      <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
                  </p>
              </div>
          </motion.div>
          <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center">
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

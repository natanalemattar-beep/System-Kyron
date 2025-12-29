
'use client';

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { LandingHeader } from "@/components/landing/landing-header";
import { adminNavGroups, legalNavGroups, rrhhNavGroups, sociosNavGroups, telecomNavGroups, ventasNavGroups, naturalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { Providers } from "@/components/providers";

// User and dashboard configurations for different portals
const portalConfig = {
  admin: { user: { name: "Administrador", email: "admin@kyron.com", fallback: "AD" }, dashboardHref: "/dashboard-empresa", navGroups: adminNavGroups },
  legal: { user: { name: "Abogado", email: "legal@kyron.com", fallback: "AB" }, dashboardHref: "/escritorio-juridico", navGroups: legalNavGroups },
  hr: { user: { name: "RR.HH.", email: "rrhh@kyron.com", fallback: "RH" }, dashboardHref: "/dashboard-rrhh", navGroups: rrhhNavGroups },
  socios: { user: { name: "Socio", email: "socio@kyron.com", fallback: "SO" }, dashboardHref: "/dashboard-socios", navGroups: sociosNavGroups },
  telecom: { user: { name: "Telecom", email: "telecom@kyron.com", fallback: "TE" }, dashboardHref: "/dashboard-telecom", navGroups: telecomNavGroups },
  ventas: { user: { name: "Vendedor", email: "ventas@kyron.com", fallback: "VE" }, dashboardHref: "/analisis-ventas", navGroups: ventasNavGroups },
  natural: { user: { name: "Usuario Natural", email: "usuario@kyron.com", fallback: "UN" }, dashboardHref: "/dashboard", navGroups: naturalNavGroups },
  auth: { user: { name: "Usuario", email: "auth@kyron.com", fallback: "U" }, dashboardHref: "/login", navGroups: [] },
};

type PortalKey = keyof typeof portalConfig;

// Function to determine which portal config to use based on the pathname
const getPortalKey = (pathname: string): PortalKey | 'public' => {
  const firstSegment = pathname.split('/')[1];

  const publicRoutes = ['login', 'register', 'terms', 'politica-privacidad', '[locale]'];

  if (pathname === '/' || publicRoutes.includes(firstSegment)) {
      return 'public';
  }

  if (firstSegment.startsWith('(')) {
    const portal = firstSegment.replace(/[()]/g, '');
    if (Object.keys(portalConfig).includes(portal)) {
      return portal as PortalKey;
    }
  }

  // Fallback for top-level admin routes
  if (['dashboard-empresa', 'contabilidad', 'cuentas-por-cobrar'].includes(firstSegment)) {
      return 'admin';
  }

  return 'admin'; // Default authenticated portal
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const portalKey = getPortalKey(pathname);
  
  const renderContent = () => {
    if (portalKey === 'public') {
      return (
        <>
          <LandingHeader />
          <main>{children}</main>
        </>
      );
    }
    
    const config = portalConfig[portalKey as Exclude<PortalKey, 'auth'>];

    return (
      <div className="flex flex-col min-h-screen">
          <AppHeader user={config.user} navGroups={config.navGroups} dashboardHref={config.dashboardHref} />
          <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
              {children}
          </main>
          <ChatDialog />
      </div>
    );
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
            <DynamicBackground />
            {renderContent()}
        </Providers>
      </body>
    </html>
  );
}

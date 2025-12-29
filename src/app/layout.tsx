
'use client';

import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { adminNavGroups, legalNavGroups, rrhhNavGroups, sociosNavGroups, telecomNavGroups, ventasNavGroups, naturalMenuItems as naturalNavGroups } from "@/components/app-sidebar-nav-items";
import { ChatDialog } from "@/components/chat-dialog";
import { usePathname } from "next/navigation";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Determine the current portal based on the URL structure
  const getPortalKey = (): PortalKey | null => {
    const segment = pathname.split('/')[1]; // e.g., 'legal', 'hr', 'login'
    if (pathname.startsWith('/(legal)')) return 'legal';
    if (pathname.startsWith('/(hr)')) return 'hr';
    if (pathname.startsWith('/(socios)')) return 'socios';
    if (pathname.startsWith('/(telecom)')) return 'telecom';
    if (pathname.startsWith('/(ventas)')) return 'ventas';
    if (pathname.startsWith('/(natural)')) return 'natural';
    if (pathname.startsWith('/(auth)')) return 'auth';
    
    // Default to admin for most top-level authenticated routes
    const publicRoutes = ['/', '/login', '/register', '/terms', '/politica-privacidad'];
    if (publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/[locale]')) {
        return null;
    }
    
    return 'admin';
  }

  const portalKey = getPortalKey();
  const config = portalKey ? portalConfig[portalKey] : null;

  // This layout is now ONLY for authenticated app pages.
  // The root page (landing) has its own complete layout structure.
  if (!config) {
    // This should ideally only render for the public pages, which now handle their own layout.
    // We return children directly to let those pages control their structure.
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                 <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
  }

  // Authenticated App Layout
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <DynamicBackground />
            <AppHeader user={config.user} navGroups={config.navGroups} dashboardHref={config.dashboardHref} />
            <main className="flex-1 container mx-auto p-4 md:p-8 pt-20 md:pt-24">
              {children}
            </main>
            <ChatDialog />
          </div>
        </Providers>
      </body>
    </html>
  );
}



'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gavel,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  const pathname = usePathname();
  
  const checkPathPrefix = (prefixes: string[]) => prefixes.some(prefix => pathname.startsWith(prefix));

  const isVentasPath = checkPathPrefix(['/login-ventas', '/analisis-ventas', '/punto-de-venta', '/arqueo-caja', '/analisis-caja', '/estrategias-ventas']);
  const isSociosPath = checkPathPrefix(['/login-socios', '/dashboard-socios']);
  const isHrPath = checkPathPrefix(['/login-rrhh', '/dashboard-rrhh', '/nominas', '/contratos', '/prestaciones-sociales']);
  const isInformaticaPath = checkPathPrefix(['/login-informatica', '/dashboard-informatica', '/seguridad', '/soluciones-ia', '/arquitectura-software-contable', '/ingenieria-ia']);
  const isMarketingPath = checkPathPrefix(['/login-marketing', '/asesoria-publicidad', '/marketing-innovador', '/app-aliada-recompensa', '/marketing-productos-vs-estrategias', '/marketing-ventas']);
  const isLegalPath = checkPathPrefix(['/escritorio-juridico', '/departamento-juridico', '/legalizacion-empresa']);
  const isNaturalPath = checkPathPrefix(['/login-natural', '/dashboard', '/tarjeta-digital', '/directorio-medico']);


  if (isVentasPath) return null;
  if (isSociosPath) return null;
  if (isHrPath) return null;
  if (isInformaticaPath) return null;
  if (isMarketingPath) return null;
  if (isLegalPath) return null;
  if (isNaturalPath) return null;

  // Default sidebar for main corporate management
  return null;
}

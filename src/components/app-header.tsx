
'use client';

import {
  adminNavGroups,
  legalNavGroups,
  ventasNavGroups,
  rrhhNavGroups,
  sociosNavGroups,
  informaticaNavGroups,
  marketingNavGroups,
  telecomNavGroups,
  naturalMenuItems,
  advisoryNavGroups,
  seguridadNavGroups
} from "@/components/app-sidebar-nav-items";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { loginOptions } from "@/lib/login-options";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

type User = {
  name: string;
  email: string;
  fallback: string;
};

const getNavInfoForPath = (pathname: string) => {
    // Admin & Finanzas
    const adminPaths = [
        '/dashboard-empresa', '/analisis-caja', '/analisis-riesgo', '/analisis-ventas',
        '/cuentas-bancarias', '/cuentas-por-cobrar', '/cuentas-por-pagar',
        '/facturacion', '/facturacion-credito', '/modelo-factura', '/nota-credito', '/nota-debito', '/proformas',
        '/contabilidad', '/libros-contables', '/reports', '/inventario', '/presupuesto',
        '/tramites-fiscales', '/declaracion-iva', '/islr-arc', '/proteccion-pensiones', '/igtf',
        '/libro-compra-venta', '/timbres-fiscales', '/recursos-fiscales',
        '/punto-de-venta', '/arqueo-caja'
    ];
    if (adminPaths.some(p => pathname.startsWith(p))) {
        return { user: { name: "Admin", email: "admin@kyron.com", fallback: "A" }, navGroups: adminNavGroups, dashboardHref: "/dashboard-empresa" };
    }

    // RR.HH.
    const rrhhPaths = [
        '/dashboard-rrhh', '/nominas', '/libro-', '/prestaciones-sociales',
        '/resumen-anual-empleados', '/beneficios-empleados', '/modelos-cartas',
        '/desarrollo-profesional', '/gestion-notificaciones', '/carnet-personal',
        '/material-apoyo', '/reclutamiento', '/clasificacion-empleados', '/ivss'
    ];
    if (rrhhPaths.some(p => pathname.startsWith(p))) {
        return { user: { name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" }, navGroups: rrhhNavGroups, dashboardHref: "/dashboard-rrhh" };
    }

    // Socios
    const sociosPaths = ['/dashboard-socios', '/planes-crecimiento', '/organigrama'];
    if (sociosPaths.some(p => pathname.startsWith(p))) {
        return { user: { name: "Socio Director", email: "socio@kyron.com", fallback: "S" }, navGroups: sociosNavGroups, dashboardHref: "/dashboard-socios" };
    }

    // IT & Seguridad
    const informaticaPaths = [
        '/seguridad', '/dashboard-informatica', '/arquitectura-software-contable',
        '/facturacion-futurista', '/ingenieria-ia', '/soluciones-ia', '/analisis-suelo-foto'
    ];
    if (informaticaPaths.some(p => pathname.startsWith(p))) {
        return { user: { name: "Ingeniería", email: "it@kyron.com", fallback: "IT" }, navGroups: informaticaNavGroups, dashboardHref: "/dashboard-informatica" };
    }
    
    // Marketing & Asesoría
    const marketingPaths = [
        '/asesoria', '/estudio-factibilidad-economica', '/asesoria-importaciones',
        '/asesoria-publicidad', '/asesoria-bolsa-valores', '/propuesta-proyecto',
        '/carta-exposicion-motivos', '/analisis-estrategico', '/analisis-mercado',
        '/nivel-competencia', '/analisis-competitivo', '/visualizacion-datos', '/demografia',
        '/analisis-empresa-hibrida', '/analisis-empresas-no-digitales', '/contabilidad-escuelas',
        '/manual-usuario', '/marketing-productos-vs-estrategias', '/marketing-innovador',
        '/marketing-ventas', '/presentacion-startup', '/planes-y-precios', '/estrategias-ventas'
    ];
    if (marketingPaths.some(p => pathname.startsWith(p))) {
         return { user: { name: "Marketing", email: "mkt@kyron.com", fallback: "M" }, navGroups: [advisoryNavGroups], dashboardHref: "/asesoria" };
    }

    // Legal
    const legalPaths = [
        '/escritorio-juridico', '/contratos', '/permisos', '/memoria-anual', '/legalizacion-empresa',
        '/poderes-representacion', '/tramites-corporativos', '/tipos-empresa', '/modelo-contrato',
        '/licencia-software', '/sistema-legal-contable', '/carta-aval-ingenieria',
        '/cumplimiento-fiscal', '/homologacion-seniat', '/software-contable',
        '/cartas-autorizacion', '/cartas-seniat', '/cartas-conatel'
    ];
    if (legalPaths.some(p => pathname.startsWith(p))) {
        return { user: { name: "Legal", email: "legal@kyron.com", fallback: "L" }, navGroups: legalNavGroups, dashboardHref: "/escritorio-juridico" };
    }
    
    // Telecom
    if (pathname.startsWith('/dashboard-telecom')) {
        return { user: { name: "Telecom", email: "telecom@kyron.com", fallback: "T" }, navGroups: telecomNavGroups, dashboardHref: "/dashboard-telecom" };
    }
    
    // Ventas
    if (pathname.startsWith('/analisis-ventas')) {
        return { user: { name: "Ventas", email: "ventas@kyron.com", fallback: "V" }, navGroups: ventasNavGroups, dashboardHref: "/analisis-ventas" };
    }

    // Default case for personal user
    return { user: { name: "Usuario", email: "usuario@email.com", fallback: "UN" }, navGroups: naturalMenuItems, dashboardHref: "/dashboard" };
}


export function AppHeader({ user }: { user: User }) {
  const pathname = usePathname();
  const { navGroups, dashboardHref } = getNavInfoForPath(pathname);

  return (
    <motion.header 
      className="sticky top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 20,
        mass: 1,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 rounded-none md:rounded-full mt-0 md:mt-4 border-b md:border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-6">
            <Link href={dashboardHref} className="flex items-center gap-3">
                <Logo />
                <span className="text-xl font-bold hidden sm:inline-block">System Kyron</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
                 {navGroups.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1">
                                {group.title}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {group.subGroups && group.subGroups.length > 0 ? (
                            group.subGroups.map((subGroup) => (
                              <DropdownMenuSub key={subGroup.title}>
                                <DropdownMenuSubTrigger>
                                  <subGroup.icon className="mr-2 h-4 w-4" />
                                  <span>{subGroup.title}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  {subGroup.items.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                      <Link href={item.href} className={cn("flex items-center", pathname === item.href && "font-bold text-primary")}>
                                          <item.icon className="mr-2 h-4 w-4" />
                                          {item.label}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                            ))
                          ) : (
                            group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link href={item.href} className={cn("flex items-center", pathname === item.href && "font-bold text-primary")}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                          )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
        </div>
        <div className="flex items-center gap-4">
           {/* Mobile Menu */}
           <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Abrir Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                    <Link href={dashboardHref} className="flex items-center gap-3">
                        <Logo />
                        <span className="text-xl font-bold">System Kyron</span>
                    </Link>
                </SheetHeader>
                 <ScrollArea className="h-[calc(100%-80px)]">
                    <Accordion type="multiple" className="w-full px-4 py-2">
                      {navGroups.map((group) => (
                        <AccordionItem value={group.title} key={group.title}>
                           <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline">
                              <div className="flex items-center gap-2">
                                <group.icon className="h-4 w-4" />
                                {group.title}
                              </div>
                           </AccordionTrigger>
                           <AccordionContent className="pb-2">
                                {(group.subGroups && group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items) : group.items).map((item) => (
                                <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full">
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                                ))}
                           </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                 </ScrollArea>
                  <div className="p-4 border-t">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" className="w-full justify-start">
                                Portales de Acceso
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start" className="w-64">
                             {loginOptions.map((opt) => (
                                <DropdownMenuItem key={opt.href} asChild>
                                  <Link href={opt.href} className="flex items-center justify-start">
                                      <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                      <p>{opt.label}</p>
                                    </Link>
                                </DropdownMenuItem>
                              ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                 <p className="font-semibold">{user.name}</p>
                 <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Portales de Acceso</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {loginOptions.map((opt) => (
                        <DropdownMenuItem key={opt.href} asChild>
                           <Link href={opt.href} className="flex items-center justify-start">
                              <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <p>{opt.label}</p>
                            </Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/general">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">Cerrar Sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
      </div>
    </motion.header>
  );
}

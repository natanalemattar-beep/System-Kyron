
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Bell,
  LayoutDashboard,
  Gavel,
  User,
  Heart,
  Shield,
  File,
  Landmark,
  AlertTriangle,
  FileEdit,
  BookOpen,
  Receipt,
  FileSignature,
  Archive,
  Percent,
  CreditCard,
  Cog,
  UserCheck,
  Wine,
  Users,
  Briefcase,
  UserCog,
  TabletSmartphone,
  ClipboardCheck,
  PieChart,
  TrendingUp,
  ShieldQuestion,
  Lightbulb,
  Calendar,
  Building as BuildingIcon,
  BookUser,
  Timer,
  Moon,
  Sun,
  ShoppingCart,
  UserX,
  Plane,
  Banknote,
  HandCoins,
  Wallet,
  HeartHandshake,
  Megaphone,
  Puzzle,
  Layers,
  BarChart,
  Ship,
  BrainCircuit,
  ShieldCheck,
  RefreshCw,
  ShieldAlert,
  Bot,
  Scale,
  Stamp,
  Gift,
  FileScan,
  AreaChart,
  Sparkles,
  FilePlus,
  FileMinus,
  HelpCircle,
  Building,
  Send,
  Loader2,
  Contact,
  Calculator,
  Paintbrush,
  Sitemap,
  Rocket,
  Mail,
  Award,
  Presentation
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Logo } from "@/components/logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { chat } from "@/ai/flows/chat";
import { Button } from "@/components/ui/button";

const juridicoMainMenuItems = [
  { href: "/dashboard-juridico", label: "Dashboard", icon: LayoutDashboard },
  { href: "/departamento-juridico", label: "Departamento Jurídico", icon: Gavel },
  { href: "/legalizacion-empresa", label: "Legalización Empresa", icon: Stamp },
  { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
  { href: "/permisos", label: "Trámites y Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: ShieldCheck },
  { href: "/multas", label: "Multas", icon: AlertTriangle },
  { href: "/recursos-fiscales", label: "Recursos Fiscales y Gacetas", icon: Scale },
];

const finanzasContabilidadMenuItems = [
  { href: "/reports", label: "Reportes Contables", icon: BarChart },
  { href: "/memoria-anual", label: "Memoria Anual", icon: BookOpen },
  { href: "/libros-contables", label: "Libros Contables", icon: BookOpen },
  { href: "/clasificacion-cuentas-contables", label: "Clasificación de Cuentas", icon: BookOpen },
  { href: "/tramites-fiscales", label: "Trámites Fiscales", icon: FileText },
  { href: "/libro-compra-venta", label: "Libro Compra/Venta SENIAT", icon: Landmark },
  { href: "/declaracion-iva", label: "Declaración IVA", icon: FileText },
  { href: "/cumplimiento", label: "Cumplimiento Normativo", icon: ShieldAlert },
  { href: "/cumplimiento-fiscal", label: "Cumplimiento Fiscal", icon: ShieldCheck },
  { href: "/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
  { href: "/inventario", label: "Inventario", icon: Archive },
  { href: "/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: Wallet },
  { href: "/cuentas-por-pagar", label: "Cuentas por Pagar", icon: HandCoins },
  { href: "/seguros", label: "Seguros", icon: ShieldCheck },
  { href: "/libro-licores", label: "Libro de Licores", icon: Wine },
  { href: "/presupuesto", label: "Presupuesto", icon: PieChart },
  { href: "/timbres-fiscales", label: "Timbres Fiscales", icon: Stamp },
  { href: "/clasificacion-facturacion", label: "Clasificación de Facturación", icon: Layers },
  { href: "/certificado-ingresos", label: "Certificado de Ingresos", icon: Banknote },
];

const analisisCrecimientoMenuItems = [
    { href: "/analisis-ventas", label: "Análisis de Ventas", icon: TrendingUp },
    { href: "/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
    { href: "/empresas-con-mismos-productos", label: "Análisis de Competencia", icon: Users },
    { href: "/estrategias-ventas", label: "Estrategias de Ventas", icon: Lightbulb },
    { href: "/marketing-ventas", label: "Marketing y Ventas", icon: Megaphone },
    { href: "/analisis-estrategico", label: "Análisis Estratégico", icon: Briefcase },
    { href: "/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
    { href: "/asesoria-publicidad", label: "Asesoría y Ventas", icon: Megaphone },
    { href: "/ferias-eventos", label: "Ferias y Eventos", icon: Calendar },
    { href: "/estructura-costos", label: "Análisis de Costos", icon: PieChart },
    { href: "/solicitud-credito", label: "Análisis para Crédito", icon: CreditCard },
    { href: "/software-contable", label: "Software Contable y ERP", icon: Puzzle },
    { href: "/estudio-factibilidad-economica", label: "Estudio de Factibilidad", icon: Bot },
    { href: "/app-aliada-recompensa", label: "App de Recompensas", icon: Award },
    { href: "/analisis-empresa-hibrida", label: "Análisis de Empresa Híbrida", icon: Rocket },
    { href: "/arquitectura-software-contable", label: "Arquitectura de Software", icon: Puzzle },
    { href: "/visualizacion-datos", label: "Visualización de Datos", icon: AreaChart },
    { href: "/planes-y-precios", label: "Planes y Precios", icon: BarChart },
    { href: "/modelo-contrato", label: "Modelo de Contrato", icon: FileSignature },
    { href: "/licencia-software", label: "Modelo de Licencia de Software", icon: FileSignature },
    { href: "/propuesta-proyecto", label: "Carta de Propuesta", icon: FileText },
    { href: "/presentacion-startup", label: "Presentación de Startup", icon: Presentation },
];

const facturacionGeneralMenuItems = [
    { href: "/proformas", label: "Proformas", icon: Receipt },
    { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
    { href: "/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
    { href: "/modelo-factura", label: "Modelo de Factura", icon: FileText },
    { href: "/modelo-presupuesto", label: "Factura de Presupuesto", icon: FileText },
    { href: "/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/factura-nota-debito-credito", label: "Factura, Débito y Crédito", icon: HelpCircle },
    { href: "/data-entry", label: "Entrada de Datos por IA", icon: FileScan },
    { href: "/importaciones", label: "Importaciones", icon: Ship },
    { href: "/igtf", label: "IGTF y Exoneraciones", icon: Percent },
    { href: "/creditos", label: "Líneas de Crédito", icon: CreditCard },
    { href: "/archivo-digital", label: "Archivo Digital", icon: Archive },
    { href: "/registro-comprador", label: "Registro de Comprador", icon: UserCheck },
];

const ventasMenuItems = [
    { href: "/estrategias-ventas", label: "Descuentos y Promociones", icon: Lightbulb },
    { href: "/punto-de-venta", label: "Facturación y Devoluciones", icon: TabletSmartphone },
    { href: "/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    { href: "/analisis-caja", label: "Análisis de Caja", icon: BarChart },
];

const recursosHumanosGestionItems = [
    { href: "/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard },
    { href: "/nominas", label: "Nóminas", icon: Users },
    { href: "/contratos", label: "Contratos", icon: FileSignature },
    { href: "/modelo-contrato-trabajo", label: "Modelo Contrato de Trabajo", icon: FileSignature },
    { href: "/prestaciones-sociales", label: "Prestaciones Sociales", icon: Calculator },
    { href: "/resumen-anual-empleados", label: "Resumen Anual de Empleados", icon: BookOpen },
    { href: "/proteccion-pensiones", label: "Protección de Pensiones", icon: Shield },
    { href: "/islr-arc", label: "ISLR / AR-C", icon: Banknote },
    { href: "/poderes-representacion", label: "Gestión de Empresas del Holding", icon: Building },
    { href: "/clasificacion-empleados", label: "Clasificación de Empleados", icon: Users },
    { href: "/beneficios-empleados", label: "Beneficios para Empleados", icon: Gift },
    { href: "/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
    { href: "/desarrollo-profesional", label: "Desarrollo Profesional", icon: Sparkles },
    { href: "/gestion-notificaciones", label: "Gestión de Notificaciones", icon: Bell },
    { href: "/carnet-personal", label: "Carnet del Personal", icon: Contact },
    { href: "/material-apoyo", label: "Material de Apoyo", icon: Paintbrush },
];

const librosRegistroMenuItems = [
    { href: "/libro-nomina", label: "Libro de Nómina", icon: Users },
    { href: "/libro-horas-extras", label: "Libro de Horas Extras", icon: Timer },
    { href: "/libro-horas-diurnas", label: "Libro de Horas Diurnas", icon: Sun },
    { href: "/libro-horario-nocturno", label: "Libro de Horario Nocturno", icon: Moon },
    { href: "/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
    { href: "/libro-cesta-ticket", label: "Libro de Cesta Ticket", icon: ShoppingCart },
    { href: "/libro-personal-retirado", label: "Libro de Personal Retirado", icon: UserX },
];

const corporativoMenuItems = [
    { href: "/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
    { href: "/poderes-representacion", label: "Poderes y Representación", icon: Gavel },
];

const generalMenuItems = [
  { href: "/integraciones", label: "Integraciones", icon: RefreshCw },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
  { href: "/tipos-empresa", label: "Tipos de Empresa", icon: BuildingIcon },
  { href: "/sistema-legal-contable", label: "Sistema Legal y Contable", icon: Scale },
];

const iaMenuItems = [
  { href: "/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
];

const naturalMenuItems = {
    principal: [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/tarjeta-digital", label: "Tarjeta Digital", icon: Contact },
        { href: "/seguridad", label: "Seguridad", icon: Shield },
        { href: "/notificaciones", label: "Notificaciones", icon: Bell },
    ],
    tramites: [
        { href: "/documentos", label: "Mis Documentos", icon: File },
        { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
        { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
        { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
        { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
    ],
    crs: [
        { href: "/manutencion", label: "Obligación de Manutención", icon: Gavel },
    ],
    parental: [
        { href: "/registro-rif", label: "Registro RIF (Hijos)", icon: FileEdit },
    ]
};

const sociosNavGroups = [
    { title: "Socios y Holding", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Dashboard de Socios", icon: LayoutDashboard },
        { href: "/empresas-relacionadas", label: "Empresas Relacionadas", icon: Sitemap },
        { href: "/poderes-representacion", label: "Poderes y Representación", icon: Gavel },
    ] },
];


const juridicoNavGroups = [
    { title: "Jurídico", icon: Gavel, items: juridicoMainMenuItems },
    { title: "Finanzas y Contabilidad", icon: BookOpen, items: finanzasContabilidadMenuItems },
    { title: "Análisis y Crecimiento", icon: TrendingUp, items: analisisCrecimientoMenuItems },
    { title: "Facturación General", icon: FileText, items: facturacionGeneralMenuItems },
    { title: "Soluciones con IA", icon: BrainCircuit, items: iaMenuItems },
    { title: "General", icon: Cog, items: generalMenuItems },
];

const ventasNavGroups = [
    { title: "Ventas y Facturación", icon: ShoppingCart, items: ventasMenuItems },
];

type Message = {
  role: 'user' | 'bot';
  text: string;
};

function ChatDialog() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
       const pageContext = document.title || "Página General";
      const botResponse = await chat({ message: input, context: pageContext });
      const botMessage: Message = { role: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'bot', text: "Lo siento, tuve un problema para conectarme. Inténtalo de nuevo." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="ghost" className="w-full justify-start h-10 text-base">
                <Bot className="mr-3 h-5 w-5"/>
                Chat IA
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg flex flex-col h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" /> Asistente IA
          </DialogTitle>
          <DialogDescription>
            Hazme una pregunta sobre la página actual o cualquier otra duda.
          </DialogDescription>
        </DialogHeader>
        <div ref={chatContainerRef} className="flex-grow flex flex-col p-4 bg-secondary/50 rounded-lg min-h-0 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-center text-muted-foreground">
              <p>Hola, ¿cómo puedo ayudarte hoy?</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'bot' && <Avatar className="h-8 w-8"><AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback></Avatar>}
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.role === 'user' && <Avatar className="h-8 w-8"><AvatarFallback>TÚ</AvatarFallback></Avatar>}
              </div>
            ))
          )}
           {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8"><AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback></Avatar>
                <div className="bg-background max-w-xs md:max-w-md rounded-lg px-4 py-2 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                </div>
              </div>
            )}
        </div>
        <form onSubmit={handleSendMessage}>
            <div className="relative">
                <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4"/>
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  
  const isHrPath = (path: string) => path.startsWith('/login-rrhh') || path.startsWith('/dashboard-rrhh') || librosRegistroMenuItems.some(item => path.startsWith(item.href)) || recursosHumanosGestionItems.some(item => path.startsWith(item.href)) || corporativoMenuItems.some(item => path.startsWith(item.href)) || path.startsWith('/gestion-notificaciones') || path.startsWith('/prestaciones-sociales') || path.startsWith('/material-apoyo') || path.startsWith('/desarrollo-profesional') || path.startsWith('/modelo-contrato-trabajo') || path.startsWith('/resumen-anual-empleados');
  const isVentasPath = (path: string) => path.startsWith('/login-ventas') || ventasNavGroups.flatMap(g => g.items).some(item => path.startsWith(item.href));
  const isSociosPath = (path: string) => path.startsWith('/login-socios') || sociosNavGroups.flatMap(g => g.items).some(item => path.startsWith(item.href));
  const isNaturalPath = (path: string) => Object.values(naturalMenuItems).flat().some(item => path.startsWith(item.href)) && !juridicoMainMenuItems.some(item => path.startsWith(item.href)) && !isHrPath(path) && !isVentasPath(path) && !isSociosPath(path);
  
  if (isHrPath(pathname)) {
    return <AppSidebarHr />;
  }

  if (isVentasPath(pathname)) {
    return <AppSidebarVentas />;
  }

  if (isSociosPath(pathname)) {
    return <AppSidebarSocios />;
  }
  
  if (isNaturalPath(pathname)) {
    return <AppSidebarNatural />;
  }

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <Logo />
           {state === 'expanded' && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">System</span>
              <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
          <Accordion type="multiple" className="w-full">
            {juridicoNavGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {state === 'expanded' && <span>{group.title}</span>}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start h-8"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <ChatDialog />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
          {state === 'expanded' && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Empresa S.A.</span>
              <span className="text-xs text-muted-foreground">
                J-12345678-9
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}


function AppSidebarNatural() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");
  const { state } = useSidebar();

  const naturalNavGroups = [
      { title: "Principal", icon: User, items: naturalMenuItems.principal },
      { title: "Trámites Civiles", icon: Gavel, items: naturalMenuItems.tramites },
      { title: "Gestión CRS", icon: HeartHandshake, items: naturalMenuItems.crs },
      { title: "Gestión Parental", icon: Users, items: naturalMenuItems.parental },
  ];
  
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <Logo />
           {state === 'expanded' && (
            <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">System</span>
                <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
            </div>
           )}
        </div>
      </SidebarHeader>
       <SidebarContent className="p-2">
          <Accordion type="multiple" className="w-full">
            {naturalNavGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {state === 'expanded' && <span>{group.title}</span>}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.href)}
                          tooltip={item.label}
                          className="justify-start h-8"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <ChatDialog />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
           {state === 'expanded' && (
            <div className="flex flex-col">
                <span className="text-sm font-medium">Usuario Natural</span>
                <span className="text-xs text-muted-foreground">
                V-12345678
                </span>
            </div>
           )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function AppSidebarHr() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const navGroups = [
    { title: "Gestión", icon: Briefcase, items: recursosHumanosGestionItems },
    { title: "Trámites Corporativos y Holding", icon: BuildingIcon, items: corporativoMenuItems },
    { title: "Libros de Registro", icon: BookOpen, items: librosRegistroMenuItems },
  ]

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <Logo />
           {state === 'expanded' && (
            <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">System</span>
                <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
            </div>
           )}
        </div>
      </SidebarHeader>
       <SidebarContent className="p-2">
        <Accordion type="multiple" className="w-full" defaultValue={['Gestión']}>
            {navGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                       <group.icon className="h-4 w-4" />
                      {state === 'expanded' && <span>{group.title}</span>}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start h-8"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <ChatDialog />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
          {state === 'expanded' && (
            <div className="flex flex-col">
                <span className="text-sm font-medium">Usuario RR.HH.</span>
                <span className="text-xs text-muted-foreground">
                Empresa S.A.
                </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}


function AppSidebarVentas() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const navGroups = [
    { title: "Ventas y Facturación", icon: ShoppingCart, items: ventasMenuItems },
  ]

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <Logo />
            {state === 'expanded' && (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">System</span>
                    <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
                </div>
            )}
        </div>
      </SidebarHeader>
       <SidebarContent className="p-2">
        <Accordion type="multiple" className="w-full" defaultValue={['Ventas y Facturación']}>
            {navGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                       <group.icon className="h-4 w-4" />
                       {state === 'expanded' && <span>{group.title}</span>}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start h-8"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <ChatDialog />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
           {state === 'expanded' && (
            <div className="flex flex-col">
                <span className="text-sm font-medium">Usuario Ventas</span>
                <span className="text-xs text-muted-foreground">
                Empresa S.A.
                </span>
            </div>
           )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function AppSidebarSocios() {
  const pathname = usePathname();
  const { state } = useSidebar();
  
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <Logo />
            {state === 'expanded' && (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">System</span>
                    <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
                </div>
            )}
        </div>
      </SidebarHeader>
       <SidebarContent className="p-2">
        <Accordion type="multiple" className="w-full" defaultValue={['Socios y Holding']}>
            {sociosNavGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {state === 'expanded' && <span>{group.title}</span>}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start h-8"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <ChatDialog />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
           {state === 'expanded' && (
            <div className="flex flex-col">
                <span className="text-sm font-medium">Socio Principal</span>
                <span className="text-xs text-muted-foreground">
                Empresa S.A.
                </span>
            </div>
           )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

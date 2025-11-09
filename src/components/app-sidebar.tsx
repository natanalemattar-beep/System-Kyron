
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
  Presentation,
  Cpu,
  Recycle,
  Wand2,
  Link as LinkIcon,
  Globe,
  Activity,
  DollarSign as DollarSignIcon,
  CandlestickChart,
  Swords,
  Search,
  HardHat,
  Network
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
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Logo } from "@/components/logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { chat } from "@/ai/flows/chat";
import { Button } from "@/components/ui/button";
import {
  juridicoMainMenuItems,
  finanzasContabilidadMenuItems,
  facturacionGeneralMenuItems,
  internationalOperationsMenuItems,
  ingenieriaMenuItems,
  iaMenuItems,
  generalMenuItems,
  corporativoMenuItems,
  ventasMenuItems,
  recursosHumanosGestionItems,
  librosRegistroMenuItems,
  naturalMenuItems,
  sociosNavGroups,
  informaticaNavGroups,
} from "./app-sidebar-nav-items";


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
  const isVentasPath = (path: string) => path.startsWith('/login-ventas') || ventasMenuItems.some(item => path.startsWith(item.href));
  const isSociosPath = (path: string) => path.startsWith('/login-socios') || sociosNavGroups.flatMap(g => g.items).some(item => path.startsWith(item.href));
  const isNaturalPath = (path: string) => Object.values(naturalMenuItems).flat().some(item => path.startsWith(item.href)) && !juridicoMainMenuItems.some(item => path.startsWith(item.href)) && !isHrPath(path) && !isVentasPath(path) && !isSociosPath(path);
  const isInformaticaPath = (path: string) => path.startsWith('/login-informatica') || path.startsWith('/dashboard-informatica') || informaticaNavGroups.flatMap(g => g.items).some(item => path.startsWith(item.href));


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

  if (isInformaticaPath(pathname)) {
    return <AppSidebarInformatica />;
  }

  const allJuridicoGroups = [
    { title: "Jurídico y Corporativo", icon: Gavel, items: juridicoMainMenuItems.concat(corporativoMenuItems) },
    { title: "Finanzas y Contabilidad", icon: BookOpen, items: finanzasContabilidadMenuItems },
    { title: "Facturación General", icon: ShoppingCart, items: facturacionGeneralMenuItems },
    { title: "Operaciones Internacionales", icon: Globe, items: internationalOperationsMenuItems },
    { title: "Ingeniería y Proyectos", icon: HardHat, items: ingenieriaMenuItems },
    { title: "Inteligencia Artificial", icon: BrainCircuit, items: iaMenuItems },
    { title: "General", icon: Cog, items: generalMenuItems },
  ]


  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2 justify-center">
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
          <Accordion type="multiple" className="w-full" defaultValue={['Jurídico y Corporativo', 'Finanzas y Contabilidad', 'Facturación General', 'Ingeniería y Proyectos']}>
            {allJuridicoGroups.map((group) => (
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
        <div className="flex items-center gap-3 p-2 justify-center">
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
         {naturalNavGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="flex items-center gap-2">
                <group.icon className="h-4 w-4" />
                {group.title}
              </SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                      className="justify-start h-9"
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
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
    { title: "Gestión de RR.HH.", icon: Briefcase, items: recursosHumanosGestionItems },
    { title: "Libros de Registro", icon: BookOpen, items: librosRegistroMenuItems },
    { title: "Trámites Corporativos", icon: BuildingIcon, items: corporativoMenuItems },
  ]

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2 justify-center">
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
        <Accordion type="multiple" className="w-full" defaultValue={['Gestión de RR.HH.']}>
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
    { title: "Ventas y Caja", icon: ShoppingCart, items: ventasMenuItems },
  ]

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2 justify-center">
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
        <Accordion type="multiple" className="w-full" defaultValue={['Ventas y Caja']}>
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
        <div className="flex items-center gap-3 p-2 justify-center">
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

function AppSidebarInformatica() {
    const pathname = usePathname();
    const { state } = useSidebar();
    
    return (
        <Sidebar variant="floating">
        <SidebarHeader>
            <div className="flex items-center gap-3 p-2 justify-center">
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
            <Accordion type="multiple" className="w-full" defaultValue={['Dashboard','Seguridad', 'Soluciones IA', 'Arquitectura', 'Ingeniería y Proyectos']}>
                {informaticaNavGroups.map((group) => (
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
                <AvatarFallback>TI</AvatarFallback>
            </Avatar>
            {state === 'expanded' && (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">Usuario TI</span>
                    <span className="text-xs text-muted-foreground">
                    Admin de Sistema
                    </span>
                </div>
            )}
            </div>
        </SidebarFooter>
        </Sidebar>
    );
}

    

    

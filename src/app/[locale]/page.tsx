
"use client";

import { useState, useEffect, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, Shield, ArrowRight, Bot, Mail, Phone, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Send, Loader2, Building, Megaphone, Briefcase, Gavel, Smile, Clock, CheckCircle as CheckCircleIcon, Banknote, Signal, ChevronDown, HelpCircle, Target, Book, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { FC, AnchorHTMLAttributes } from 'react';
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { loginOptions } from "@/lib/login-options";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { iaSolutions, faqItems } from '@/lib/page-data';

const Orb = dynamic(() => import('@/components/orb').then(mod => mod.Orb), { ssr: false });
const ChatDialog = dynamic(() => import('@/components/chat-dialog').then(mod => mod.ChatDialog), { ssr: false });

const SmoothScrollLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href!.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        // This is a bit of a hack to close the mobile sheet menu
        const sheetCloseButton = document.querySelector('[data-radix-dialog-close]');
        if (sheetCloseButton instanceof HTMLElement) {
            sheetCloseButton.click();
        }
    };

    return <a href={href} onClick={handleClick} {...props} />;
};

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

const services = [
    { title: "Gestión Fiscal y Contable", description: "Automatiza tu contabilidad, desde libros oficiales hasta la declaración de impuestos, todo homologado por el SENIAT.", icon: Layers },
    { title: "Administración de Nómina", description: "Calcula y gestiona la nómina, beneficios y obligaciones parafiscales de tus empleados sin complicaciones.", icon: Users },
    { title: "Permisología y Cumplimiento", description: "Centraliza y mantén al día todas las licencias y permisos necesarios para operar en Venezuela.", icon: ShieldCheck },
     { title: "Asesoría Legal y Estratégica", description: "Accede a herramientas de análisis, modelos de contratos y guías para una toma de decisiones informada.", icon: Gavel },
];

const features = [
    { title: "Inteligencia Artificial", description: "Conciliación bancaria, análisis predictivo y auditoría en tiempo real para decisiones más inteligentes.", icon: Cpu},
    { title: "Seguridad de Nivel Superior", description: "Tus datos están protegidos con cifrado de extremo a extremo y autenticación de dos factores.", icon: Shield },
    { title: "Análisis y Reportes", description: "Visualiza la salud de tu negocio con dashboards intuitivos y reportes personalizables.", icon: BarChart },
];

const teamMembers = [
  {
    name: "Carlos Rodríguez",
    role: "CEO & Fundador",
    avatarId: "testimonial-avatar-1",
    description: "Experto en finanzas y tecnología, con la misión de simplificar la vida del empresario venezolano."
  },
  {
    name: "Ana Pérez",
    role: "CTO & Co-Fundadora",
    avatarId: "testimonial-avatar-2",
    description: "Líder de desarrollo, apasionada por crear soluciones robustas, seguras y fáciles de usar."
  },
];

const testimonials = [
  {
    name: "Carlos Rodríguez",
    company: "Constructora XYZ",
    text: "System Kyron ha transformado nuestra gestión. Lo que antes nos tomaba días, ahora lo resolvemos en horas. La tranquilidad de saber que cumplimos con el SENIAT no tiene precio.",
  },
  {
    name: "Ana Pérez",
    company: "Inversiones ABC",
    text: "La plataforma es increíblemente intuitiva. El soporte técnico siempre está dispuesto a ayudar. Finalmente tenemos una solución que entiende las complejidades del mercado venezolano.",
  },
];

const navModules = [
  { name: "¿Qué es Kyron?", angle: 30, href: "#nosotros", type: 'scroll' },
  { name: "Nuestros Servicios", angle: 75, href: "#servicios", type: 'scroll' },
  { name: "Funciones Clave", angle: 120, href: "#caracteristicas", type: 'scroll' },
  { name: "Tecnología IA", angle: 165, href: "/soluciones-ia", type: 'dialog' },
  { name: "Seguridad Garantizada", angle: 210, href: "/seguridad", type: 'dialog' },
  { name: "Planes y Precios", angle: 255, href: "/planes-y-precios", type: 'link' },
  { name: "Contacto Directo", angle: 300, href: "#contacto", type: 'scroll' },
  { name: "¿Quiénes Somos?", angle: 345, href: "#nosotros", type: 'scroll' },
];

const getModuleDescription = (name: string) => {
    switch (name) {
        case '¿Qué es Kyron?': return "Descubre nuestra misión, visión y el equipo detrás de la plataforma.";
        case 'Nuestros Servicios': return "Explora las soluciones que ofrecemos para tu empresa.";
        case 'Funciones Clave': return "Conoce las características principales que hacen a Kyron único.";
        case 'Tecnología IA': return "Ve cómo la IA puede automatizar y potenciar tu negocio.";
        case 'Seguridad Garantizada': return "Aprende sobre nuestras capas de seguridad para proteger tus datos.";
        case 'Planes y Precios': return "Encuentra el plan perfecto que se ajusta a tus necesidades.";
        case 'Contacto Directo': return "Comunícate con nuestro equipo para más información.";
        case '¿Quiénes Somos?': return "Nuestra historia y los valores que nos impulsan.";
        default: return "Accede al módulo especializado.";
    }
};

const IaContent = () => (
     <>
        <DialogHeader>
          <DialogTitle>Soluciones con Inteligencia Artificial</DialogTitle>
          <DialogDescription>Automatiza tareas, obtén análisis y toma decisiones más rápidas.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            {iaSolutions.map(solution => (
                <Card key={solution.title} className="bg-secondary">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-base">
                            <solution.icon className="h-5 w-5 text-primary"/>
                            {solution.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{solution.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <DialogFooter>
            <Button asChild>
                <Link href="/soluciones-ia">Explorar todas las soluciones de IA <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
        </DialogFooter>
    </>
);


const ModuleOrb = memo(({ module, radius, onMouseEnter, onMouseLeave }: { module: typeof navModules[0], radius: number, onMouseEnter: () => void, onMouseLeave: () => void }) => {
    const x = radius * Math.cos((module.angle - 90) * (Math.PI / 180));
    const y = radius * Math.sin((module.angle - 90) * (Math.PI / 180));
    
    const content = (
        <motion.div
            className="w-24 h-24 aspect-square bg-card/80 backdrop-blur-sm border rounded-2xl flex items-center justify-center p-2 cursor-pointer"
            style={{
                boxShadow: '0 0 20px rgba(var(--primary-rgb), 0)'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(var(--primary-rgb), 0.7)' }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="text-center">
            <p className="text-xs font-bold text-primary leading-tight">{module.name}</p>
            </div>
        </motion.div>
    );

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        if (module.type === 'scroll') {
            return <SmoothScrollLink href={module.href}>{children}</SmoothScrollLink>;
        }
        if (module.type === 'link') {
            return <Link href={module.href}>{children}</Link>
        }
        // for dialog
        return <>{children}</>
    }

    const OrbContent = () => (
        <Wrapper>
            {module.type === 'dialog' ? (
                <Dialog>
                    <DialogTrigger asChild>{content}</DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                       {module.name === 'Tecnología IA' && <IaContent />}
                       {/* Add other dialog contents here */}
                    </DialogContent>
                </Dialog>
            ) : (
                content
            )}
        </Wrapper>
    )

    return (
        <motion.div
            className="absolute"
            style={{
                top: '50%',
                left: '50%',
                x: -48,
                y: -48
            }}
            animate={{
                x: x - 48,
                y: y - 48,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
            <OrbContent />
        </motion.div>
    );
});
ModuleOrb.displayName = 'ModuleOrb';


export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredModule, setHoveredModule] = useState<{name: string, description: string} | null>(null);
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");
    const isMobile = useIsMobile();
    const radius = isMobile ? 130 : 260;

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 70,
                damping: 20,
                mass: 1,
                delay: 0.5
            }}
          >
            <div className={cn(
                "flex h-16 items-center justify-between px-4 md:px-6 transition-all duration-300",
                isScrolled ? "bg-background/80 backdrop-blur-lg border rounded-full mt-4" : "bg-transparent mt-0 md:mt-4"
            )}>
              <Link href="/" className="flex items-center gap-3">
                  <Logo />
                  <span className="text-xl font-bold">System Kyron</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                  {navLinks.map((link) => (
                  <SmoothScrollLink key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                  </SmoothScrollLink>
                  ))}
              </nav>
              <div className="hidden md:flex items-center gap-2">
                 <LanguageSwitcher/>
                 <ThemeToggle />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                        Acceder
                        <User className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel>Selecciona un Portal</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {loginOptions.map((opt) => (
                        <DropdownMenuItem key={opt.href} asChild>
                           <Link href={opt.href} className="flex items-center justify-start">
                              <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <div>
                                <p>{opt.label}</p>
                                <p className="text-xs text-muted-foreground">{opt.description}</p>
                              </div>
                            </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button asChild>
                    <Link href="/register">Registrarse</Link>
                </Button>
              </div>
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                          <Menu />
                          <span className="sr-only">Abrir menú</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                      <SheetHeader>
                          <SheetTitle className="flex items-center gap-3">
                            <Logo />
                            <span className="text-xl font-bold">System Kyron</span>
                          </SheetTitle>
                      </SheetHeader>
                      <nav className="grid gap-4 text-lg font-medium mt-8">
                          {navLinks.map((link) => (
                              <SmoothScrollLink key={link.href} href={link.href}>{link.label}</SmoothScrollLink>
                          ))}
                      </nav>
                       <div className="mt-auto space-y-4">
                          <LanguageSwitcher/>
                          <ThemeToggle />
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start">
                                  <User className="mr-2 h-4 w-4" />
                                  Acceder
                                  </Button>
                              </DropdownMenuTrigger>
                               <DropdownMenuContent align="end" side="top" className="w-64 mb-2">
                                <DropdownMenuLabel>Selecciona un Portal</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {loginOptions.map((opt) => (
                                    <DropdownMenuItem key={opt.href} asChild>
                                      <Link href={opt.href} className="flex items-center justify-start">
                                          <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                           <div>
                                            <p>{opt.label}</p>
                                            <p className="text-xs text-muted-foreground">{opt.description}</p>
                                          </div>
                                        </Link>
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                          </DropdownMenu>
                          <Button asChild className="w-full">
                              <Link href="/register">Registrarse</Link>
                          </Button>
                      </div>
                  </SheetContent>
              </Sheet>
            </div>
        </motion.div>
    </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={targetRef} className="relative overflow-hidden">
             <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12">
            
            {/* Fondo animado */}
            <motion.div 
                className="absolute inset-0 -z-10"
                style={{ opacity }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent dark:from-blue-900/40"></div>
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-400/20 via-transparent to-transparent dark:from-green-900/40"></div>
            </motion.div>

            {/* Contenido Central */}
            <motion.div 
              className="relative grid place-items-center w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] aspect-square"
              style={{ opacity }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
              initial="hidden"
              animate="visible"
            >
                {/* Central Text/Orb */}
                <div className="absolute z-10 grid place-items-center w-full h-full">
                     <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center"
                    >
                         {hoveredModule ? (
                            <>
                                <h2 className="text-2xl font-bold text-primary">{hoveredModule.name}</h2>
                                <p className="text-muted-foreground max-w-xs">{hoveredModule.description}</p>
                            </>
                            ) : (
                            <div className="flex flex-col items-center gap-4">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Logo className="h-24 w-24 mb-4"/>
                                </motion.div>
                                <h1 className="text-4xl md:text-5xl font-bold text-balance">Kyron Core</h1>
                                <p className="text-base md:text-lg text-muted-foreground max-w-sm">Inteligencia en Cada Transacción</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Orb */}
                <div className="absolute inset-0">
                    <Orb />
                </div>

                {/* Orbiting Modules */}
                 {navModules.map((module) => (
                    <ModuleOrb
                        key={module.name}
                        module={module}
                        radius={radius}
                        onMouseEnter={() => setHoveredModule({ name: module.name, description: getModuleDescription(module.name) })}
                        onMouseLeave={() => setHoveredModule(null)}
                    />
                ))}

                <motion.div 
                  className="absolute bottom-[-40px] md:bottom-[-60px]"
                  animate={{ y: [0, 10, 0]}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                 <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                 >
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {services.map((item, index) => (
                        <motion.div 
                            key={item.title} 
                            className="p-8 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-6">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold ">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold">Inteligencia que Impulsa tu Negocio</h2>
                <p className="text-lg text-muted-foreground">
                  Nuestra plataforma integra tecnologías de vanguardia para darte una ventaja competitiva.
                </p>
                <div className="space-y-6">
                    {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
                          <feature.icon className="h-6 w-6 shrink-0" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{feature.title}</h4>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </motion.div>
             <motion.div 
                className="p-4 md:p-8 rounded-xl flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
            >
                 {aboutImage && <Image 
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    data-ai-hint={aboutImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-xl object-cover shadow-2xl"
                 />}
            </motion.div>
          </div>
        </section>
        
        {/* About Us Section */}
        <section id="nosotros" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Conoce a Kyron</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Nacimos de la necesidad de crear orden en el caos administrativo venezolano, fusionando tecnología, cumplimiento y visión de futuro.</p>
                </motion.div>
                 <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Target className="text-primary"/>Nuestra Misión</h3>
                            <p className="text-muted-foreground">Empoderar a las empresas venezolanas con herramientas inteligentes que garanticen su tranquilidad fiscal y potencien su crecimiento sostenible.</p>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Eye className="text-primary"/>Nuestra Visión</h3>
                            <p className="text-muted-foreground">Ser el ecosistema de gestión empresarial líder en Latinoamérica, reconocido por nuestra innovación, seguridad y compromiso con el éxito de nuestros clientes.</p>
                        </div>
                         <div className="pt-4">
                            <h3 className="text-xl font-semibold mb-4">Testimonios</h3>
                             <div className="space-y-6">
                                {testimonials.map((testimonial, index) => {
                                const avatar = index === 0 ? testimonialAvatar1 : testimonialAvatar2;
                                return (
                                    <blockquote key={index} className="p-4 border-l-4">
                                        <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                                        <footer className="flex items-center gap-3 mt-4">
                                            {avatar && (
                                                <Avatar className="h-10 w-10">
                                                <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div>
                                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                                            </div>
                                        </footer>
                                    </blockquote>
                                );
                                })}
                            </div>
                        </div>
                    </div>
                     <div className="lg:col-span-3">
                         <h3 className="text-xl font-semibold mb-4 text-center">Equipo Fundador</h3>
                         <p className="text-xs text-muted-foreground text-center mb-6">(Nota: Las imágenes y nombres son representativos para la demostración)</p>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {teamMembers.map((member) => {
                                const avatar = PlaceHolderImages.find(img => img.id === member.avatarId);
                                return (
                                    <div key={member.name} className="flex flex-col items-center text-center p-6 border rounded-lg bg-card/50">
                                        {avatar && <Avatar className="w-24 h-24 mb-4">
                                            <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>}
                                        <h4 className="font-semibold text-lg">{member.name}</h4>
                                        <p className="text-primary font-medium text-sm">{member.role}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{member.description}</p>
                                    </div>
                                );
                            })}
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Resolvemos tus dudas más comunes para que tomes la mejor decisión.</p>
                </motion.div>
                <motion.div 
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border rounded-lg mb-2 px-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 text-left">
                                        <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                                        <span>{item.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-10 text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <motion.div 
                    className="max-w-2xl mx-auto p-8 rounded-2xl bg-card border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                 >
                    <h2 className="text-3xl md:text-4xl font-bold text-balance">Comienza a Optimizar tu Empresa Hoy</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Únete a cientos de empresas que ya están transformando su gestión con Kyron.</p>
                    <Button size="lg" asChild className="mt-8 btn-3d-primary">
                      <Link href="/register">¡Regístrate Ya! <ArrowRight className="ml-2"/></Link>
                    </Button>
                </motion.div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="py-16 bg-card border-t">
        <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-xl font-bold">System Kyron</span>
            </div>
            <p className="text-sm text-muted-foreground">La solución definitiva para la gestión empresarial en Venezuela.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5"/>
                <a href="mailto:contacto@kyron.com" className="hover:text-primary">contacto@kyron.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5"/>
                <a href="tel:+584141234567" className="hover:text-primary">+58 414-1234567</a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm">
                <Link href="/terms" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link>
                <Link href="/politica-privacidad" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link>
            </nav>
          </div>
        </div>
        <div className="container px-4 md:px-6 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System Kyron. Todos los derechos reservados.
        </div>
      </footer>
      
      <ChatDialog />
    </div>
  );
}

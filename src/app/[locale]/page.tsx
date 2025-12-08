
"use client";

import { useState, useEffect, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, Shield, ArrowRight, Bot, Mail, Phone, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Send, Loader2, Building, Megaphone, Briefcase, Gavel, Smile, Clock, CheckCircle as CheckCircleIcon, Banknote, Signal, ChevronDown } from "lucide-react";
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
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

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
  { name: "¿Qué es Kyron?", angle: 30, href: "#nosotros" },
  { name: "Nuestros Servicios", angle: 75, href: "#servicios" },
  { name: "Funciones Clave", angle: 120, href: "#caracteristicas" },
  { name: "Tecnología IA", angle: 165, href: "/soluciones-ia" },
  { name: "Seguridad Garantizada", angle: 210, href: "/seguridad" },
  { name: "Planes y Precios", angle: 255, href: "/planes-y-precios" },
  { name: "Contacto Directo", angle: 300, href: "#contacto" },
  { name: "¿Quiénes Somos?", angle: 345, href: "#nosotros" },
];


const ModuleOrb = memo(({ module, radius }: { module: typeof navModules[0], radius: number }) => {
    const Icon = loginOptions.find(opt => opt.label.includes(module.name))?.icon || User;
    
    const x = radius * Math.cos((module.angle - 90) * (Math.PI / 180));
    const y = radius * Math.sin((module.angle - 90) * (Math.PI / 180));
    
    return (
        <motion.div
            className="absolute"
            style={{
                top: '50%',
                left: '50%',
            }}
            initial={{ x: 0, y: 0}}
            animate={{
                x: [0, x],
                y: [0, y],
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
            <Link href={module.href}>
                <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 bg-card/80 backdrop-blur-sm border rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                        boxShadow: '0 0 20px rgba(var(--primary-rgb), 0)'
                    }}
                    whileHover={{ scale: 1.2, boxShadow: '0 0 25px rgba(var(--primary-rgb), 0.7)' }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                     <div className="text-center">
                        <p className="text-xs font-bold text-primary px-2 leading-tight">{module.name}</p>
                     </div>
                </motion.div>
            </Link>
        </motion.div>
    );
});
ModuleOrb.displayName = 'ModuleOrb';


export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");
    const [radius, setRadius] = useState(130);

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setRadius(130);
            else if (window.innerWidth < 768) setRadius(220);
            else setRadius(260);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
             backgroundColor: isScrolled ? 'hsl(var(--background) / 0.8)' : 'transparent',
             backdropFilter: isScrolled ? 'blur(10px)' : 'none',
             borderBottom: isScrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
        }}
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
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
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
    </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={targetRef} className="h-screen flex items-center justify-center relative overflow-hidden pt-16">
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
              className="relative flex flex-col items-center justify-center w-full h-full"
              style={{ opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute z-10 text-center"
                >
                    <h1 className="text-5xl font-bold">System Kyron</h1>
                    <p className="text-lg text-muted-foreground">Inteligencia en Cada Transacción</p>
                </motion.div>

                <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px]">
                    <Orb />
                     {navModules.map(module => (
                        <ModuleOrb
                            key={module.name}
                            module={module}
                            radius={radius}
                        />
                    ))}
                </div>
                <motion.div 
                  className="absolute bottom-10"
                  animate={{ y: [0, 10, 0]}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </motion.div>
            </motion.div>
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
        
        {/* Testimonials Section */}
        <section id="nosotros" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Confían en Nosotros</h2>
                    <p className="mt-4 text-lg text-muted-foreground">La tranquilidad de nuestros clientes es nuestro mayor activo.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => {
                      const avatar = index === 0 ? testimonialAvatar1 : testimonialAvatar2;
                      return (
                        <motion.div 
                            key={index} 
                            className="p-6 md:p-8 border bg-card/50 backdrop-blur-sm rounded-xl shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <p className="text-muted-foreground italic md:text-lg mb-6">"{testimonial.text}"</p>
                            <div className="flex items-center gap-4">
                              {avatar && (
                                <Avatar>
                                    <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                      )
                    })}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-muted/30">
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
                      <Link href="/register">¡Regístrate Gratis! <ArrowRight className="ml-2"/></Link>
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

    
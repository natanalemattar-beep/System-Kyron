
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, Shield, ArrowRight, Bot, Mail, Phone, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Send, Loader2, Building, Megaphone, Briefcase, Gavel, Smile, Clock, CheckCircle as CheckCircleIcon, Banknote } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { FC, AnchorHTMLAttributes } from 'react';
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chat } from "@/ai/flows/chat";
import { LanguageSwitcher } from "@/components/language-switcher";
import dynamic from "next/dynamic";

const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(mod => mod.WelcomeTutorial), { ssr: false });
const ChatDialog = dynamic(() => import('@/components/chat-dialog').then(mod => mod.ChatDialog), { ssr: false });


const SmoothScrollLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href!.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
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
    text: "Kyron ha transformado nuestra gestión. Lo que antes nos tomaba días, ahora lo resolvemos en horas. La tranquilidad de saber que cumplimos con el SENIAT no tiene precio.",
  },
  {
    name: "Ana Pérez",
    company: "Inversiones ABC",
    text: "La plataforma es increíblemente intuitiva. El soporte técnico siempre está dispuesto a ayudar. Finalmente tenemos una solución que entiende las complejidades del mercado venezolano.",
  },
];

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        const hasSeenTutorial = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeenTutorial) {
            // Use a timeout to prevent hydration issues and give the page a moment to settle
            setTimeout(() => {
                setShowTutorial(true);
                localStorage.setItem("hasSeenKyronTutorial", "true");
            }, 500);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
     
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "top-4" : "top-0"
      )}>
          <div className={cn(
              "container mx-auto flex h-16 items-center justify-between px-4 md:px-6 transition-all duration-300",
              isScrolled && "rounded-2xl border bg-background/80 backdrop-blur-lg shadow-lg"
          )}>
              <Link href="/" className="flex items-center gap-3">
                  <Logo />
                  <span className="text-xl font-bold">Kyron</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                  {navLinks.map((link) => (
                  <SmoothScrollLink key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                      {link.label}
                  </SmoothScrollLink>
                  ))}
              </nav>
              <div className="hidden md:flex items-center gap-2">
                 <LanguageSwitcher/>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                        Acceder
                        <User className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild><Link href="/login-natural">Acceso Personal</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-fintech">FinTech y Banca Digital</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-juridico">Escritorio Jurídico</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-ventas">Ventas y Facturación</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-rrhh">Acceso RR.HH.</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-socios">Acceso Socios</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-marketing">Productos, Asesoría y Marketing</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-informatica">Ingeniería e Informática</Link></DropdownMenuItem>
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
                            <span className="text-xl font-bold">Kyron</span>
                          </SheetTitle>
                      </SheetHeader>
                      <nav className="grid gap-4 text-lg font-medium mt-8">
                          {navLinks.map((link) => (
                              <SmoothScrollLink key={link.href} href={link.href}>{link.label}</SmoothScrollLink>
                          ))}
                      </nav>
                       <div className="mt-auto space-y-4">
                          <LanguageSwitcher/>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start">
                                  <User className="mr-2 h-4 w-4" />
                                  Acceder
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
                                  <DropdownMenuItem asChild><Link href="/login-natural">Acceso Personal</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-fintech">FinTech y Banca Digital</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-juridico">Escritorio Jurídico</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-ventas">Ventas y Facturación</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-rrhh">Acceso RR.HH.</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-socios">Acceso Socios</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-marketing">Productos, Asesoría y Marketing</Link></DropdownMenuItem>
                                  <DropdownMenuItem asChild><Link href="/login-informatica">Ingeniería e Informática</Link></DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                          <Button asChild className="w-full">
                              <Link href="/register">Registrarse</Link>
                          </Button>
                      </div>
                  </SheetContent>
              </Sheet>
          </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
            <div className="absolute -z-10 inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_50%)] dark:bg-grid-slate-700/30"></div>
            <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>
            
            <div className="container px-4 md:px-6 relative z-10 text-center">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance">
                        La Gestión Empresarial, Reinventada para Venezuela
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
                       Con Kyron, simplificamos la burocracia para que puedas enfocarte en crecer. Automatiza tu contabilidad, gestiona permisos y cumple con el SENIAT sin esfuerzo.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/register">
                            Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <SmoothScrollLink href="#servicios">
                            Explorar Servicios
                            </SmoothScrollLink>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
             <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Impacto y Confianza</h2>
                <p className="mt-4 text-lg text-muted-foreground">Cientos de empresas confían en nosotros para optimizar su gestión y garantizar su tranquilidad.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-2 p-6 rounded-xl border bg-card/50">
                    <Smile className="h-10 w-10 text-primary"/>
                    <p className="text-3xl font-bold">98%</p>
                    <p className="text-muted-foreground">Clientes Satisfechos</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-6 rounded-xl border bg-card/50">
                    <Clock className="h-10 w-10 text-primary"/>
                    <p className="text-3xl font-bold">10k+</p>
                    <p className="text-muted-foreground">Horas Ahorradas en Gestión</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-6 rounded-xl border bg-card/50 col-span-2 md:col-span-1">
                    <CheckCircleIcon className="h-10 w-10 text-primary"/>
                    <p className="text-3xl font-bold">100%</p>
                    <p className="text-muted-foreground">Cumplimiento Garantizado</p>
                </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {services.map((item, index) => (
                        <div key={item.title} className="relative p-8 overflow-hidden rounded-xl border bg-card shadow-sm">
                            <div className="relative">
                                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-6">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold ">{item.title}</h3>
                                <p className="text-muted-foreground mt-2 flex-grow">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Features Section */}
        <section id="caracteristicas" className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Inteligencia que Impulsa tu Negocio</h2>
                <p className="text-lg text-muted-foreground">
                  Nuestra plataforma integra tecnologías de vanguardia para darte una ventaja competitiva.
                </p>
                <div className="space-y-6">
                    {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
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
            </div>
             <div className="p-4 md:p-8 rounded-xl flex items-center justify-center">
                 {aboutImage && <Image 
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    data-ai-hint={aboutImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-xl object-cover shadow-2xl"
                 />}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="nosotros" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Lo que Dicen Nuestros Clientes</h2>
                    <p className="mt-4 text-lg text-muted-foreground">La confianza de nuestros clientes es nuestro mayor activo.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => {
                      const avatar = index === 0 ? testimonialAvatar1 : testimonialAvatar2;
                      return (
                        <div key={index} className="p-6 md:p-8 shadow-sm border bg-card rounded-xl">
                            <div className="p-0">
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
                            </div>
                        </div>
                      )
                    })}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border">
                    <h2 className="text-3xl md:text-4xl font-bold text-balance">Comienza a Optimizar tu Empresa Hoy</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Únete a cientos de empresas que ya están transformando su gestión con Kyron.</p>
                    <Button size="lg" asChild className="mt-8">
                    <Link href="/register">¡Regístrate Gratis! <ArrowRight className="ml-2"/></Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="py-16 bg-background border-t">
        <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-xl font-bold">Kyron</span>
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
          &copy; {new Date().getFullYear()} Kyron. Todos los derechos reservados.
        </div>
      </footer>
      {showTutorial && <WelcomeTutorial open={showTutorial} onOpenChange={setShowTutorial} />}
      <ChatDialog />
    </div>
  );
}

    
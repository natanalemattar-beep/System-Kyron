
"use client";

import { useState, useEffect, type FC, type AnchorHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, Shield, ArrowRight, Bot, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Briefcase, Gavel, Megaphone, Banknote, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { LanguageSwitcher } from "@/components/language-switcher";

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

const loginOptions = [
    { href: "/login-natural", label: "Acceso Personal", icon: User, description: "Para clientes individuales." },
    { href: "/login-fintech", label: "FinTech y Banca Digital", icon: Banknote, description: "Panel de control principal de la empresa." },
    { href: "/login-juridico", label: "Escritorio Jurídico", icon: Gavel, description: "Acceso para el departamento legal." },
    { href: "/login-ventas", label: "Ventas y Facturación", icon: ShoppingCart, description: "Acceso para cajeros y vendedores." },
    { href: "/login-rrhh", label: "Acceso RR.HH.", icon: Briefcase, description: "Portal para gestión de personal." },
    { href: "/login-socios", label: "Acceso Socios", icon: Users, description: "Dashboard para socios y directivos." },
    { href: "/login-marketing", label: "Productos y Marketing", icon: Megaphone, description: "Portal de marketing y asesoría." },
    { href: "/login-informatica", label: "Ingeniería e Informática", icon: Cpu, description: "Acceso para el equipo de IT." },
];

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

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
     
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}>
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
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden">
             {heroImage && <Image 
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 -z-20"
                priority
             />}
            <div className="absolute inset-0 bg-background/80 -z-10"></div>
            
            <div className="container px-4 md:px-6 relative z-10">
                <div className="animate-fade-up space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance text-foreground">
                        Gestión Empresarial Inteligente, <br />
                        <span className="text-primary">Tranquilidad Fiscal Garantizada.</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
                       System Kyron es el ecosistema todo-en-uno que automatiza tu contabilidad, asegura tu cumplimiento con el SENIAT y te da las herramientas para crecer con confianza en Venezuela.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/register">
                            Empezar ahora <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <SmoothScrollLink href="#servicios">
                            Explorar servicios
                            </SmoothScrollLink>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-28 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {services.map((item) => (
                        <div key={item.title} className="p-8 rounded-xl border bg-background shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-6">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold ">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
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
        <section id="nosotros" className="py-20 md:py-28 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Confían en Nosotros</h2>
                    <p className="mt-4 text-lg text-muted-foreground">La tranquilidad de nuestros clientes es nuestro mayor activo.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => {
                      const avatar = index === 0 ? testimonialAvatar1 : testimonialAvatar2;
                      return (
                        <div key={index} className="p-6 md:p-8 border bg-background rounded-xl shadow-sm">
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
                      )
                    })}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-card border">
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
       <footer id="contacto" className="py-16 bg-card border-t border-border">
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
               <a href="mailto:contacto@kyron.com" className="flex items-start gap-3 hover:text-primary">
                 <Mail className="h-5 w-5 text-muted-foreground mt-0.5"/>
                 <span>contacto@kyron.com</span>
              </a>
               <a href="tel:+584141234567" className="flex items-start gap-3 hover:text-primary">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5"/>
                <span>+58 414-1234567</span>
              </a>
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
        <div className="container px-4 md:px-6 mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System Kyron. Todos los derechos reservados.
        </div>
      </footer>
      
      <ChatDialog />
    </div>
  );
}

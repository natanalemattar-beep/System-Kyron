
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Menu, Shield, ArrowRight, Bot, Mail, Phone, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Send, Loader2, Building, Megaphone, Briefcase } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
    text: "System C.M.S ha transformado nuestra gestión. Lo que antes nos tomaba días, ahora lo resolvemos en horas. La tranquilidad de saber que cumplimos con el SENIAT no tiene precio.",
  },
  {
    name: "Ana Pérez",
    company: "Inversiones ABC",
    text: "La plataforma es increíblemente intuitiva. El soporte técnico siempre está dispuesto a ayudar. Finalmente tenemos una solución que entiende las complejidades del mercado venezolano.",
  },
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
      const pageContext = `El usuario está en la página de inicio de System C.M.S. 
      La página describe una plataforma de gestión empresarial para el mercado venezolano.
      - Servicios ofrecidos: Gestión Fiscal y Contable (automatización, libros, impuestos, homologado por SENIAT), Administración de Nómina (cálculo, beneficios, parafiscales), y Permisología y Cumplimiento (gestión de licencias).
      - Características destacadas: Inteligencia Artificial (conciliación, análisis predictivo), Seguridad de Nivel Superior (cifrado, 2FA), y Análisis y Reportes (dashboards).
      - La página también tiene testimonios de clientes y explica cómo funciona el sistema en 3 pasos: 1. Regístrate, 2. Automatiza, 3. Analiza y Crece.`;
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
        <Button size="icon" className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg">
          <Bot className="h-8 w-8"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg flex flex-col h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" /> Asistente IA
          </DialogTitle>
          <DialogDescription>
            Hazme una pregunta sobre nuestros servicios, características o cualquier otra duda.
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
                className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'bot' && <Avatar className="h-8 w-8"><AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback></Avatar>}
                <div
                  className={cn('max-w-xs md:max-w-md rounded-lg px-4 py-2', msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background'
                  )}
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

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");
    const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* Header */}
       <header className={cn(
        "fixed top-0 z-50 w-full p-2 transition-all duration-500 ease-in-out",
        isScrolled ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-lg rounded-xl shadow-lg border">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <SmoothScrollLink key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </SmoothScrollLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link href="/register">Registrarse</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button>
                      <User className="mr-2 h-4 w-4"/>
                      Acceder
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild><Link href="/login-natural"><User className="mr-2"/>Acceso Natural</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-juridico"><Building className="mr-2"/>Admin y Finanzas</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-ventas"><ShoppingCart className="mr-2"/>Ventas y Facturación</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-rrhh"><Briefcase className="mr-2"/>Acceso RR.HH.</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-socios"><Users className="mr-2"/>Acceso Socios</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-marketing"><Megaphone className="mr-2"/>Productos, Asesoría y Marketing</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden" data-radix-dialog-close>
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menú</span>
                    </Button>
                </SheetTrigger>
              <SheetContent side="right" className="bg-background">
                <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-4 text-lg font-medium mt-8">
                        {navLinks.map((link) => (
                         <SmoothScrollLink key={link.label} href={link.href} className="text-foreground hover:text-primary">
                            {link.label}
                        </SmoothScrollLink>
                        ))}
                    </nav>
                    <div className="mt-auto flex w-full gap-2">
                       <Button asChild className="w-full">
                         <Link href="/register">Registrarse</Link>
                       </Button>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-48">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent animate-gradient-animation" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/30 via-transparent to-transparent animate-gradient-animation" style={{ animationDuration: '25s', animationDelay: '5s' }}></div>
          </div>
          <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance">
                La Gestión Empresarial, Reinventada para Venezuela
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-balance">
                Simplificamos la burocracia para que puedas enfocarte en crecer. Automatiza tu contabilidad, gestiona permisos y cumple con el SENIAT sin esfuerzo.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                      <Link href="/register">
                      Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4"/>
                      </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                      <SmoothScrollLink href="#servicios">
                      Explorar Servicios
                      </SmoothScrollLink>
                  </Button>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto lg:aspect-square">
              {heroImage && 
                <Image 
                  src={heroImage.imageUrl} 
                  alt={heroImage.description} 
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="object-cover rounded-3xl shadow-2xl" 
                />
              }
            </div>
          </div>
        </section>

        {/* Featured Logos */}
        <section className="py-12 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
              CON LA CONFIANZA DE EMPRESAS LÍDERES EN VENEZUELA
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-8 text-muted-foreground" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="60" y="20" fontFamily="Arial, sans-serif" fontSize="14" fill="currentColor" textAnchor="middle" fontWeight="bold">EMPRESA {i+1}</text>
                </svg>
              ))}
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {services.map((item) => (
                        <Card key={item.title} className="text-center p-8 bg-card shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border">
                            <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-6">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold ">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Features Section */}
        <section id="caracteristicas" className="py-20 md:py-28 bg-secondary/30 border-y">
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
                        <Card key={index} className="p-6 md:p-8 shadow-lg border bg-card">
                            <CardContent className="p-0">
                                <p className="text-muted-foreground italic md:text-lg mb-6">{testimonial.text}</p>
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
                            </CardContent>
                        </Card>
                      )
                    })}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-primary/10">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">Comienza a Optimizar tu Empresa Hoy</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Únete a cientos de empresas que ya están transformando su gestión con System C.M.S.</p>
                <Button size="lg" asChild className="mt-8">
                   <Link href="/register">¡Regístrate Gratis! <ArrowRight className="ml-2"/></Link>
                </Button>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="py-16 bg-secondary/30 border-t">
        <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-xl font-bold">System C.M.S</span>
            </div>
            <p className="text-sm text-muted-foreground">La solución definitiva para la gestión empresarial en Venezuela.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5"/>
                <a href="mailto:contacto@systemcms.com" className="hover:text-primary">contacto@systemcms.com</a>
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
          &copy; {new Date().getFullYear()} System C.M.S. Todos los derechos reservados.
        </div>
      </footer>
      <ChatDialog />
    </div>
  );
}


"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Menu, BookOpen, Shield, Briefcase, ArrowRight, CheckCircle, Bot, Mail, Phone, Building, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AnchorHTMLAttributes, FC } from 'react';
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
        // Close sheet on mobile after clicking a link
        const closeButton = document.querySelector('[data-radix-dialog-close]');
        if (closeButton instanceof HTMLElement) {
            closeButton.click();
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
    text: "“System C.M.S ha transformado nuestra gestión. Lo que antes nos tomaba días, ahora lo resolvemos en horas. La tranquilidad de saber que cumplimos con el SENIAT no tiene precio.”",
  },
  {
    name: "Ana Pérez",
    company: "Inversiones ABC",
    text: "“La plataforma es increíblemente intuitiva. El soporte técnico siempre está dispuesto a ayudar. Finalmente tenemos una solución que entiende las complejidades del mercado venezolano.”",
  },
];

const howItWorksSteps = [
    {
        step: 1,
        title: "Regístrate y Configura",
        description: "Crea tu cuenta en minutos y configura los datos de tu empresa o perfil personal. Nuestro sistema te guiará en cada paso.",
    },
    {
        step: 2,
        title: "Automatiza y Gestiona",
        description: "Desde la facturación hasta la nómina, deja que nuestra IA se encargue de las tareas repetitivas mientras tú te enfocas en tu negocio.",
    },
    {
        step: 3,
        title: "Analiza y Crece",
        description: "Utiliza nuestros reportes y dashboards para obtener una visión clara de tus finanzas y tomar decisiones estratégicas para el crecimiento.",
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

export default function LandingPage() {
    const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");
    const satelliteImage = PlaceHolderImages.find((img) => img.id === "satellite-image");
    const [isHeaderVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            setHeaderVisible(false);
        } else {
            setHeaderVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);
    
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background overflow-x-hidden">
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 via-transparent to-transparent animate-gradient-animation dark:from-blue-900" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-300 via-transparent to-transparent animate-gradient-animation dark:from-cyan-900" style={{ animationDuration: '25s', animationDelay: '5s' }}></div>
        </div>
      <header className={cn("sticky top-0 z-50 w-full p-2 transition-transform duration-300", {
            "translate-y-0": isHeaderVisible,
            "-translate-y-full": !isHeaderVisible,
      })}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-lg rounded-lg shadow-lg border">
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
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menú</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-4 text-lg font-medium mt-8">
                        {navLinks.map((link) => (
                        <SheetClose asChild key={link.label}>
                            <SmoothScrollLink href={link.href} className="text-foreground hover:text-primary">
                            {link.label}
                            </SmoothScrollLink>
                        </SheetClose>
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-52 md:pb-40 flex items-center text-center">
            <div className="container mx-auto px-4 md:px-6 z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance bg-gradient-to-br from-slate-900 to-primary bg-clip-text text-transparent dark:from-white dark:to-blue-400 animate-in fade-in duration-1000">
                        La Gestión Empresarial, Reinventada
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-balance text-muted-foreground max-w-3xl mx-auto animate-in fade-in-20 slide-in-from-bottom-4 duration-1000 delay-200">
                       Nuestra misión es simplificar la burocracia, centralizando todos tus documentos y procesos en un solo lugar. Con nuestra plataforma, puedes registrar tu empresa, gestionar permisos, cumplir con tus obligaciones fiscales, administrar a tu personal y mucho más.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-20 slide-in-from-bottom-6 duration-1000 delay-400">
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
            </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-28 bg-primary/5 dark:bg-primary/10">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {services.map((item, i) => (
                        <Card key={item.title} className="text-center flex flex-col items-center p-8 bg-card shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border animate-in fade-in-50 slide-in-from-bottom-8" style={{animationDelay: `${i * 150}ms`}}>
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-6">
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
        <section id="caracteristicas" className="py-20 md:py-28 bg-background/50 border-y">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold">Inteligencia que Impulsa tu Negocio</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Nuestra plataforma integra tecnologías de vanguardia para darte una ventaja competitiva.
                </p>
              </div>
              <div className="grid sm:grid-cols-1 gap-6">
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
                 {satelliteImage && <Image 
                    src={satelliteImage.imageUrl}
                    alt={satelliteImage.description}
                    data-ai-hint={satelliteImage.imageHint}
                    width={600}
                    height={600}
                    className="rounded-xl aspect-square object-cover shadow-2xl"
                 />}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 md:py-28 bg-card/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Empezar es muy Sencillo</h2>
                    <p className="mt-4 text-lg text-muted-foreground">En solo tres pasos, estarás en camino a una gestión más inteligente y eficiente.</p>
                </div>
                <div className="relative grid md:grid-cols-3 gap-8">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
                     {howItWorksSteps.map((step) => (
                        <div key={step.step} className="relative flex flex-col items-center text-center p-8 bg-card rounded-lg shadow-sm border">
                           <div className="absolute -top-6 bg-background p-1 rounded-full">
                             <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">{step.step}</div>
                           </div>
                           <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
                           <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 bg-secondary/20 border-y">
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

        {/* About Us Section */}
        <section id="nosotros" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                 <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold">Hecho en Venezuela, para Venezolanos</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Nacimos de la necesidad de una herramienta que realmente entienda los desafíos de hacer negocios en nuestro país. Somos un equipo de contadores, abogados y desarrolladores comprometidos con tu éxito.
                    </p>
                </div>
                {aboutImage && (
                    <Image 
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        data-ai-hint={aboutImage.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-lg w-full h-auto"
                    />
                )}
            </div>
        </section>

         {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-balance" style={{textShadow: '0 1px 4px rgba(0,0,0,0.2)'}}>Únete a cientos de empresas que ya están optimizando sus procesos.</h2>
                <Button size="lg" variant="secondary" asChild className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                   <Link href="/register">¡Comienza Hoy! <ArrowRight className="ml-2"/></Link>
                </Button>
            </div>
        </section>
        
        {/* Contact Section */}
        <section id="contacto" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Ponte en Contacto</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Nuestro equipo de especialistas está listo para ayudarte.</p>
                </div>
                <Card className="max-w-4xl mx-auto shadow-lg border">
                     <CardContent className="p-6 md:p-8 grid sm:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Mail className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Correo Electrónico</h3>
                                <p className="text-muted-foreground text-sm mb-1">Para consultas y demos.</p>
                                <a href="mailto:contacto@systemcms.com" className="font-medium text-primary hover:underline">contacto@systemcms.com</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                             <div className="p-3 bg-primary/10 rounded-lg">
                                <Phone className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Teléfono</h3>
                                <p className="text-muted-foreground text-sm mb-1">Habla con un asesor.</p>
                                <a href="tel:+584141234567" className="font-medium text-primary hover:underline">+58 414-1234567</a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} System C.M.S. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Términos de Servicio
            </Link>
            <Link href="/politica-privacidad" className="text-sm text-muted-foreground hover:text-primary">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </footer>
      <ChatDialog />
    </div>
  );
}

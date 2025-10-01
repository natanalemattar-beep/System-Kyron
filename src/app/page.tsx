
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Building, User, ArrowRight, BookOpen, ShieldCheck, Handshake, Mail, Phone, MapPin, Send, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/#quienes-somos", label: "Quiénes Somos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#seguro", label: "Seguro Contable y Jurídico" },
  { href: "/#contacto", label: "Contáctanos" },
  { href: "/producto", label: "Producto" },
];

const services = [
    {
        title: "Registro y Legalización Empresarial",
        description: "Constituimos, legalizamos y actualizamos tu empresa ante todos los entes gubernamentales.",
        icon: Building,
        href: "/legalizacion-empresa",
    },
    {
        title: "Gestión Contable y Fiscal",
        description: "Lleva tu contabilidad al día, declara impuestos y cumple con el SENIAT sin estrés.",
        icon: BookOpen,
        href: "/reports",
    },
    {
        title: "Cumplimiento y Permisología",
        description: "Gestionamos todos los permisos, licencias y solvencias que tu negocio necesita para operar.",
        icon: ShieldCheck,
        href: "/permisos",
    },
    {
        title: "Trámites para Personas Naturales",
        description: "Solicita documentos civiles, antecedentes penales y gestiona trámites personales con facilidad.",
        icon: User,
        href: "/dashboard",
    },
    {
        title: "Asesoría Estratégica",
        description: "Te guiamos en la toma de decisiones para el crecimiento y la sostenibilidad de tu negocio.",
        icon: Handshake,
        href: "/asesoria-publicidad",
    }
]

export default function LandingPage() {
    const { toast } = useToast();

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Mensaje Enviado",
            description: "Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.",
        });
    };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">System C.S.M</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground p-2 rounded-md">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="text-lg font-bold">System C.S.M</span>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">X</Button>
                    </SheetClose>
                 </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="border-t pt-6 mt-6 space-y-4">
                    <SheetClose asChild>
                       <Button variant="outline" className="w-full" asChild>
                          <Link href="/login?tab=juridica">
                            Iniciar Sesión (Jurídico)
                          </Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                       <Button variant="outline" className="w-full" asChild>
                          <Link href="/login?tab=natural">
                            Iniciar Sesión (Natural)
                          </Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button className="w-full" asChild>
                          <Link href="/register">
                            Registrarse
                          </Link>
                        </Button>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 text-center flex flex-col items-center">
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Simplificamos la burocracia para que puedas enfocarte en el crecimiento de tu negocio. Registra tu empresa, gestiona permisos y cumple con tus obligaciones fiscales en un solo lugar.
            </p>
            <div className="mt-8 flex gap-4">
                <Button size="lg" asChild>
                    <Link href="/register">Comenzar Ahora</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="#servicios">Saber Más</Link>
                </Button>
            </div>
        </section>

        {/* Quienes Somos */}
        <section id="quienes-somos" className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <Image src="https://picsum.photos/seed/office-team/800/600" alt="Equipo de System C.S.M" data-ai-hint="office team" width={800} height={600} className="rounded-lg shadow-md"/>
                </div>
                <div className="text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Misión</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        En System C.S.M, nuestra misión es ser la plataforma digital oficial para la gestión integral de trámites de personas jurídicas y naturales en Venezuela. Nacimos de la necesidad de simplificar procesos complejos y centralizar la información, ofreciendo una herramienta confiable y segura que le devuelve el tiempo a los empresarios y ciudadanos.
                    </p>
                     <Button variant="outline" asChild>
                        <Link href="/manual-usuario">Conoce más sobre nosotros</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema de Soluciones para Ti</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Desde la creación de tu empresa hasta la gestión diaria, te acompañamos en cada paso.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(item => (
                        <Card key={item.title} className="text-center flex flex-col">
                             <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4 w-max">
                                    <item.icon className="h-8 w-8 text-primary"/>
                                </div>
                                <div className="h-20">
                                    <CardTitle>{item.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow h-24">
                                <CardDescription>{item.description}</CardDescription>
                            </CardContent>
                            <CardContent>
                                <Button variant="secondary" className="w-full" asChild>
                                    <Link href={item.href}>
                                        Explorar <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Seguro Contable y Jurídico */}
        <section id="seguro" className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Seguro Contable y Jurídico</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Tu tranquilidad es nuestra prioridad. Ofrecemos un respaldo integral para que operes con la certeza de que tu negocio está protegido ante cualquier eventualidad fiscal o legal.
                    </p>
                </div>
                <Card className="mt-12 max-w-4xl mx-auto">
                    <CardContent className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-4">
                                <ShieldCheck className="h-8 w-8 text-primary"/>
                            </div>
                            <h4 className="font-semibold">Cumplimiento Garantizado</h4>
                            <p className="text-sm text-muted-foreground">Nos aseguramos de que tus declaraciones y libros contables cumplan con toda la normativa vigente del SENIAT.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-4">
                                <BookOpen className="h-8 w-8 text-primary"/>
                            </div>
                            <h4 className="font-semibold">Gestión de Nómina</h4>
                            <p className="text-sm text-muted-foreground">Calculamos y procesamos tu nómina, garantizando el cumplimiento de las obligaciones laborales y parafiscales.</p>
                        </div>
                        <div className="flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
                            <div className="p-3 bg-primary/10 rounded-full mb-4">
                                <Handshake className="h-8 w-8 text-primary"/>
                            </div>
                            <h4 className="font-semibold">Asistencia Legal</h4>
                            <p className="text-sm text-muted-foreground">Te respaldamos en la redacción de contratos, gestión de poderes y prevención de multas.</p>
                        </div>
                    </CardContent>
                    <CardContent>
                        <Button asChild>
                            <Link href="#contacto">Solicitar Asesoría</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>

         {/* Contacto */}
        <section id="contacto" className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Contáctanos</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        ¿Tienes alguna duda o necesitas asesoría? Contáctanos.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-md mt-1"><Mail className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-semibold">Correo Electrónico</h3>
                                <p className="text-muted-foreground">Envíanos tus preguntas a nuestro correo de soporte.</p>
                                <a href="mailto:soporte@systemcs.com" className="text-primary font-medium">soporte@systemcs.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-md mt-1"><Phone className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-semibold">Teléfono</h3>
                                <p className="text-muted-foreground">Llámanos para una atención más directa.</p>
                                <a href="tel:+582121234567" className="text-primary font-medium">+58 (212) 123-4567</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-md mt-1"><MapPin className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-semibold">Oficina</h3>
                                <p className="text-muted-foreground">Av. Principal, Edificio Central, Piso 5, Caracas, Venezuela.</p>
                            </div>
                        </div>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Envíanos un Mensaje</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <form onSubmit={handleContactSubmit} className="space-y-4">
                                <Input placeholder="Tu Nombre Completo" required />
                                <Input type="email" placeholder="Tu Correo Electrónico" required />
                                <Textarea placeholder="Escribe tu mensaje aquí..." required />
                                <Button type="submit" className="w-full">
                                    <Send className="mr-2 h-4 w-4"/> Enviar Mensaje
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System C.S.M. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

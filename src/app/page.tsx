
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Menu, Flag, BookOpen, Shield, Users, ArrowRight, CheckCircle, Bot, Mail, Phone, Briefcase, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#ia", label: "Inteligencia Artificial" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

const services = [
    { title: "Gestión Fiscal y Contable", description: "Automatiza tu contabilidad, desde libros oficiales hasta la declaración de impuestos, todo homologado por el SENIAT.", icon: BookOpen },
    { title: "Administración de Nómina", description: "Calcula y gestiona la nómina, beneficios y obligaciones parafiscales de tus empleados sin complicaciones.", icon: Users },
    { title: "Permisología y Cumplimiento", description: "Centraliza y mantén al día todas las licencias y permisos necesarios para operar en Venezuela.", icon: Shield },
];

const features = [
    { title: "Conciliación Bancaria Automática", description: "Nuestra IA analiza tus movimientos y realiza la conciliación en segundos, no horas." },
    { title: "Análisis Predictivo de Flujo de Caja", description: "Anticípate a las necesidades de liquidez con proyecciones inteligentes." },
    { title: "Auditoría Inteligente en Tiempo Real", description: "Detecta inconsistencias o posibles fraudes antes de que se conviertan en un problema." },
];

export default function LandingPageV3() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <Flag className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex">
                      <User className="mr-2 h-4 w-4"/>
                      Acceder
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-sm border-white/10">
                  <DropdownMenuItem asChild><Link href="/login-natural"><User className="mr-2"/>Acceso Natural</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-juridico"><Building className="mr-2"/>Acceso Jurídico</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-rrhh"><Briefcase className="mr-2"/>Acceso RR.HH.</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="hidden md:flex group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-primary px-6 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90">
              <Link href="/register">
                 <span className="relative z-10">Registrarse</span>
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/90 backdrop-blur-lg border-l-white/10">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menú</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-6 text-lg font-medium mt-8">
                        {navLinks.map((link) => (
                        <SheetClose asChild key={link.label}>
                            <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                            {link.label}
                            </Link>
                        </SheetClose>
                        ))}
                    </nav>
                    <div className="mt-auto space-y-4">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full h-12 text-base" variant="outline">
                                <User className="mr-2"/>
                                Acceder
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-sm border-white/10 w-56">
                            <DropdownMenuItem asChild><Link href="/login-natural"><User className="mr-2"/>Acceso Natural</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login-juridico"><Building className="mr-2"/>Acceso Jurídico</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login-rrhh"><Briefcase className="mr-2"/>Acceso RR.HH.</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                        <Button asChild className="w-full h-12 text-base">
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
        <section className="relative container mx-auto px-6 md:px-8 py-24 md:py-40 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
              La Gestión Empresarial, Reinventada
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
              Transforma la complejidad fiscal y administrativa en una ventaja competitiva con la plataforma inteligente diseñada para Venezuela.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Button size="lg" asChild className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                <Link href="/register">
                  <span className="relative z-10">Comenzar Ahora</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/5 hover:text-white">
                 <Link href="#servicios">Explorar Servicios</Link>
              </Button>
            </div>
        </section>

        <section id="servicios" className="py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-8">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     {services.map(item => (
                        <Card key={item.title} className="bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 group">
                            <CardHeader>
                                <div className="p-3 bg-primary/10 text-primary rounded-lg w-max mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="ia" className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Inteligencia Artificial que Trabaja para Ti</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Deja que nuestra IA se encargue de las tareas tediosas y te ofrezca insights valiosos para que tú te dediques a crecer tu negocio.
              </p>
              <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
               <Button asChild className="mt-8">
                  <Link href="/soluciones-ia">Descubre el Poder de la IA <ArrowRight className="ml-2"/></Link>
              </Button>
            </div>
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                 <Card className="bg-background/80">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-md"><Bot className="h-5 w-5 text-primary"/></div>
                            <CardTitle>Asistente IA</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="font-mono text-sm p-4 bg-secondary rounded-md">"He detectado una inconsistencia entre tu declaración de IVA y el libro de ventas del mes pasado. ¿Quieres que genere un reporte detallado?"</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        <section id="nosotros" className="py-20 md:py-28 bg-card/20 border-y border-white/10">
            <div className="container mx-auto px-6 md:px-8">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Hecho en Venezuela, para Venezolanos</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Nacimos de la necesidad de una herramienta que realmente entienda los desafíos de hacer negocios en nuestro país. Somos un equipo de contadores, abogados y desarrolladores comprometidos con tu éxito.
                    </p>
                </div>
            </div>
        </section>
        
        <section id="contacto" className="py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-8">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">¿Listo para Transformar tu Gestión?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Ponte en contacto con nuestro equipo de especialistas. Estamos listos para ayudarte.</p>
                </div>
                <Card className="max-w-4xl mx-auto border-white/10 bg-card/50 backdrop-blur-sm shadow-lg">
                     <CardContent className="p-8 grid sm:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Mail className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Correo Electrónico</h3>
                                <p className="text-muted-foreground text-sm mb-1">Para consultas y demos.</p>
                                <a href="mailto:contacto@systemcms.com" className="font-medium text-primary hover:underline">contacto@systemcms.com</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                             <div className="p-3 bg-primary/10 rounded-full">
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

      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System C.M.S. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

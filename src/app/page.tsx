
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Menu, Flag, ChevronDown, BookOpen, Shield, BarChart, Mail, ArrowRight, CheckCircle, ShieldCheck, GanttChartSquare, Bot, Phone, HeartHandshake, Building, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const navLinks = [
  { href: "/#productos", label: "Productos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#fundacion", label: "Fundación" },
  { href: "/#contabilidad", label: "Contabilidad" },
  { href: "/#seguro", label: "Seguro Contable y Jurídico" },
  { href: "/#contacto", label: "Contacto" },
];

const products = [
    {
        title: "Software Administrativo",
        description: "Una solución de escritorio robusta para la gestión completa de tu negocio.",
        imageUrl: "https://picsum.photos/seed/productA/600/400",
        imageHint: "desk setup"
    },
    {
        title: "Máquinas Fiscales Homologadas",
        description: "Equipos de facturación que cumplen con todas las normativas del SENIAT.",
        imageUrl: "https://picsum.photos/seed/productB/600/400",
        imageHint: "receipt printer"
    },
    {
        title: "Plataforma en la Nube",
        description: "Accede a tu información y gestiona tu empresa desde cualquier lugar del mundo.",
        imageUrl: "https://picsum.photos/seed/productC/600/400",
        imageHint: "cloud server"
    }
]

const services = [
    { title: "Asesoría Contable Personalizada", description: "Expertos a tu disposición para optimizar tus finanzas y planificar tus impuestos.", icon: BookOpen },
    { title: "Gestión Fiscal y Tributaria", description: "Nos encargamos de tus declaraciones y te mantenemos al día con el SENIAT.", icon: Shield },
    { title: "Auditoría y Análisis de Datos", description: "Evaluamos la salud de tu negocio para la toma de decisiones estratégicas.", icon: BarChart },
];

const features = [
    { title: "Cumplimiento SENIAT Garantizado", description: "Duerme tranquilo. Nuestro software está siempre actualizado con las últimas providencias fiscales.", icon: ShieldCheck },
    { title: "Gestión Integral en un Solo Lugar", description: "Desde facturación y contabilidad hasta nómina y permisos. Todo en una sola plataforma.", icon: GanttChartSquare },
    { title: "Asistente con Inteligencia Artificial", description: "Nuestra IA te ayuda a detectar errores, optimizar procesos y obtener análisis predictivos.", icon: Bot },
];

const testimonials = [
    { quote: "System C.M.S transformó nuestra gestión. Pasamos de tener hojas de cálculo desordenadas a un control total. La tranquilidad que nos da el cumplimiento con el SENIAT no tiene precio.", name: "Ana Rodríguez", company: "CEO de Innovate C.A." },
    { quote: "La implementación fue rápida y el soporte técnico es excepcional. El módulo de contabilidad nos ahorra incontables horas cada mes.", name: "Carlos Mendoza", company: "Gerente de Administración" },
];


export default function LandingPage() {
  const [activeLink, setActiveLink] = useState('');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-white dark:bg-background">
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-md">
              <Flag className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          
          <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            Productos y Servicios
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild><Link href="/#productos">Productos</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/#servicios">Servicios</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            Soluciones Contables
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                       <DropdownMenuItem asChild><Link href="/#contabilidad">Contabilidad</Link></DropdownMenuItem>
                       <DropdownMenuItem asChild><Link href="/#seguro">Seguro Contable y Jurídico</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            Fundación y Contacto
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild><Link href="/#fundacion">Fundación</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/#contacto">Contacto</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </nav>
              <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <Briefcase className="mr-2 h-4 w-4"/>
                            Acceder
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/login-natural"><User className="mr-2"/>Iniciar Sesión Natural</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/login-juridico"><Building className="mr-2"/>Iniciar Sesión Jurídico</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/login-rrhh"><Briefcase className="mr-2"/>Recursos Humanos</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/register">Registrarse</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                   <SheetHeader>
                    <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                  </SheetHeader>
                  <div className="flex justify-between items-center mb-8">
                      <Link href="/" className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground p-2 rounded-md">
                          <Flag className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-bold">System C.M.S</span>
                      </Link>
                      <SheetClose asChild>
                          <Button variant="ghost" size="icon">X</Button>
                      </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <div className="border-t pt-6 mt-4 space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground">Acceso</h3>
                       <SheetClose asChild>
                         <Button asChild className="w-full justify-start">
                            <Link href="/login-natural"><User className="mr-2"/>Iniciar Sesión Natural</Link>
                          </Button>
                      </SheetClose>
                       <SheetClose asChild>
                         <Button asChild className="w-full justify-start">
                            <Link href="/login-juridico"><Building className="mr-2"/>Iniciar Sesión Jurídico</Link>
                          </Button>
                      </SheetClose>
                       <SheetClose asChild>
                         <Button asChild className="w-full justify-start">
                            <Link href="/login-rrhh"><Briefcase className="mr-2"/>Recursos Humanos</Link>
                          </Button>
                      </SheetClose>
                       <SheetClose asChild>
                         <Button asChild variant="outline" className="w-full justify-start">
                            <Link href="/register">Registrarse</Link>
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
        <section className="relative py-20 md:py-32 flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 -z-10">
                {heroImage && (
                    <Image 
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                        System C.M.S
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-balance text-white/80 max-w-3xl mx-auto"  style={{textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>
                        Simplifica tu contabilidad, asegura el cumplimiento fiscal y toma el control total de tu negocio con nuestra plataforma todo-en-uno.
                    </p>
                    <div className="mt-10">
                        <Button size="lg" asChild>
                            <Link href="/#features">Conoce la Plataforma <ArrowRight className="ml-2"/></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-slate-50 dark:bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Todo lo que tu Empresa Necesita</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Desde el cumplimiento fiscal hasta la gestión inteligente, nuestra plataforma lo cubre todo.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     {features.map(item => (
                        <Card key={item.title} className="text-center flex flex-col items-center p-8 bg-white dark:bg-background border shadow-lg">
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-6">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Productos */}
        <section id="productos" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Nuestros Productos</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Soluciones tecnológicas diseñadas para cumplir con la normativa venezolana y potenciar tu gestión.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(item => (
                        <Card key={item.title} className="overflow-hidden group bg-white dark:bg-card border shadow-lg hover:shadow-2xl transition-shadow duration-300">
                             <div className="relative aspect-video">
                                <Image src={item.imageUrl} alt={item.title} data-ai-hint={item.imageHint} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                            </div>
                             <CardContent className="p-6">
                                <h3 className="font-semibold text-xl">{item.title}</h3>
                                <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
                                <Button variant="link" className="p-0 mt-4">Conocer más <ArrowRight className="ml-2 h-4 w-4"/></Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-20 md:py-32 bg-slate-50 dark:bg-card">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Servicios Profesionales</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más allá del software, te acompañamos con un equipo de expertos para garantizar tu éxito.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map(service => (
                        <Card key={service.title} className="text-center bg-white dark:bg-background border shadow-lg">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-max mb-4">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
             </div>
        </section>

        {/* Fundación Section */}
        <section id="fundacion" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Fundación CRS: Reciclaje con Impacto Social</h2>
                        <p className="text-muted-foreground text-lg mt-4">
                            Creemos en un modelo de negocio que va más allá de lo económico. Nuestra fundación se dedica a la recolección de desechos como papel y vidrio, transformando lo que para muchos es basura en oportunidades para los más necesitados.
                        </p>
                         <ul className="space-y-3 pt-6">
                            <li className="flex items-start gap-3 text-md"><HeartHandshake className="h-6 w-6 text-red-500" /> Los ingresos del reciclaje se destinan a programas de ayuda social.</li>
                            <li className="flex items-start gap-3 text-md"><HeartHandshake className="h-6 w-6 text-red-500" /> Colaboramos con fundaciones para llevar alimentos y medicinas.</li>
                        </ul>
                        <Button size="lg" asChild className="mt-8">
                            <Link href="/manutencion">Conoce Más Sobre la Causa <ArrowRight className="ml-2"/></Link>
                        </Button>
                    </div>
                    <div>
                        <Image src="https://picsum.photos/seed/foundation/800/600" alt="Fundación CRS" data-ai-hint="community support recycling" width={800} height={600} className="rounded-xl shadow-2xl h-full w-full object-cover"/>
                    </div>
                </div>
            </div>
        </section>

        {/* Contabilidad */}
        <section id="contabilidad" className="py-20 md:py-32 bg-slate-50 dark:bg-card">
             <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div>
                        <Image src="https://picsum.photos/seed/accounting/800/600" alt="Contabilidad" data-ai-hint="accounting charts" width={800} height={600} className="rounded-xl shadow-2xl h-full w-full object-cover"/>
                    </div>
                    <div className="p-8 md:p-12">
                         <h2 className="text-3xl md:text-4xl font-bold">Contabilidad Sin Complicaciones</h2>
                        <p className="text-muted-foreground text-lg mt-4">
                            Nuestra plataforma integra todas tus operaciones para generar automáticamente los libros contables y reportes financieros que necesitas, manteniéndote siempre al día con tus obligaciones.
                        </p>
                        <ul className="space-y-4 pt-6">
                            <li className="flex items-start gap-3 text-md"><CheckCircle className="h-6 w-6 text-green-500 mt-1" /> Libros de Compra y Venta</li>
                            <li className="flex items-start gap-3 text-md"><CheckCircle className="h-6 w-6 text-green-500 mt-1" /> Estados Financieros en Tiempo Real</li>
                            <li className="flex items-start gap-3 text-md"><CheckCircle className="h-6 w-6 text-green-500 mt-1" /> Cumplimiento SENIAT garantizado</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

         {/* Seguro */}
        <section id="seguro" className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-4">
                        <Badge variant="outline">Exclusivo de System C.M.S</Badge>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-balance">Póliza de Tranquilidad: Tu Seguro Contable y Jurídico</h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        Entendemos los riesgos de operar en Venezuela. Por eso, creamos un seguro único que protege tu patrimonio ante errores contables, multas inesperadas o contingencias fiscales. Es más que un servicio, es tu paz mental.
                    </p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/seguros">Conoce más sobre tu Póliza <ArrowRight className="ml-2"/></Link>
                    </Button>
                </div>
             </div>
        </section>
        
         {/* Testimonials */}
        <section className="py-20 md:py-32 bg-slate-50 dark:bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold">Lo que Dicen Nuestros Clientes</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    {testimonials.map(testimonial => (
                        <blockquote key={testimonial.name} className="p-8 bg-white dark:bg-background border rounded-lg shadow-lg">
                            <p className="italic text-lg">"{testimonial.quote}"</p>
                            <footer className="mt-6 font-semibold text-md">{testimonial.name}, <span className="text-muted-foreground font-normal">{testimonial.company}</span></footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Contáctanos</h2>
                    <p className="mt-4 text-lg text-muted-foreground">¿Listo para tomar el control de tu negocio? Ponte en contacto con nosotros.</p>
                </div>
                <Card className="max-w-4xl mx-auto bg-white dark:bg-card border shadow-lg">
                    <CardContent className="p-8 grid sm:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="p-3 bg-primary/10 rounded-full mb-3">
                                <Mail className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="font-semibold text-xl">Correo Electrónico</h3>
                            <p className="text-muted-foreground text-sm mb-2">Para consultas generales y soporte.</p>
                            <a href="mailto:contacto@systemcms.com" className="text-lg font-semibold text-primary hover:underline">contacto@systemcms.com</a>
                        </div>
                         <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                             <div className="p-3 bg-primary/10 rounded-full mb-3">
                                <Phone className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="font-semibold text-xl">Teléfono</h3>
                            <p className="text-muted-foreground text-sm mb-2">Habla directamente con nuestro equipo.</p>
                            <a href="tel:+584141234567" className="text-lg font-semibold text-primary hover:underline">+58 414-1234567</a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-slate-50 dark:bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System C.M.S. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

    
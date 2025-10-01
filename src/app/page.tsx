
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Menu, Flag, ChevronDown, BookOpen, Shield, BarChart, Mail, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const navLinks = [
  { href: "/#productos", label: "Productos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#contabilidad", label: "Contabilidad" },
  { href: "/#seguro", label: "Seguro Contable y Jurídico" },
  { href: "/#contacto", label: "Contacto" },
];

const products = [
    {
        title: "Software Administrativo",
        imageUrl: "https://picsum.photos/seed/productA/600/400",
        imageHint: "desk setup"
    },
    {
        title: "Máquinas Fiscales",
        imageUrl: "https://picsum.photos/seed/productB/600/400",
        imageHint: "receipt printer"
    },
    {
        title: "Plataforma en la Nube",
        imageUrl: "https://picsum.photos/seed/productC/600/400",
        imageHint: "cloud server"
    }
]

const services = [
    { title: "Asesoría Contable", description: "Expertos a tu disposición para optimizar tus finanzas.", icon: BookOpen },
    { title: "Gestión Fiscal", description: "Nos encargamos de tus declaraciones y cumplimiento tributario.", icon: Shield },
    { title: "Auditoría y Análisis", description: "Evaluamos la salud de tu negocio para la toma de decisiones.", icon: BarChart },
];

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-md">
              <Flag className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
                <Button key={link.label} variant="ghost" asChild>
                    <Link href={link.href} className={`text-sm font-medium ${link.label === "Seguro Contable y Jurídico" ? 'bg-secondary' : ''}`}>
                        {link.label}
                    </Link>
                </Button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            Acceder
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/login-natural">Iniciar Sesión Natural</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/login-juridico">Iniciar Sesión Jurídico</Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                            <Link href="/recursos-humanos">Recursos Humanos</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" asChild>
                    <Link href="/register">
                      Registrarse
                    </Link>
                </Button>
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
                            <Link href="/login-juridico"><User className="mr-2"/>Iniciar Sesión Jurídico</Link>
                          </Button>
                      </SheetClose>
                       <SheetClose asChild>
                         <Button asChild className="w-full justify-start">
                            <Link href="/recursos-humanos"><User className="mr-2"/>Recursos Humanos</Link>
                          </Button>
                      </SheetClose>
                      <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
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
        <section className="container mx-auto px-4 py-24 md:py-32 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">System C.M.S</h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Soluciones Comerciales y Contables para su Negocio
            </p>
        </section>
        
        {/* Productos */}
        <section id="productos" className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Nuestros Productos</h2>
                    <p className="mt-4 text-muted-foreground">Soluciones tecnológicas diseñadas para cumplir con la normativa venezolana y potenciar tu gestión.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(item => (
                        <Card key={item.title} className="overflow-hidden">
                             <CardContent className="p-0">
                                <Image src={item.imageUrl} alt={item.title} data-ai-hint={item.imageHint} width={600} height={400} className="aspect-video object-cover"/>
                                <div className="p-6">
                                  <h3 className="font-semibold text-xl">{item.title}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Servicios Profesionales</h2>
                    <p className="mt-4 text-muted-foreground">Más allá del software, te acompañamos con un equipo de expertos para garantizar tu éxito.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map(service => (
                        <Card key={service.title} className="text-center">
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

        {/* Contabilidad */}
        <section id="contabilidad" className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Contabilidad Sin Complicaciones</h2>
                    <p className="text-muted-foreground">
                        Nuestra plataforma integra todas tus operaciones para generar automáticamente los libros contables y reportes financieros que necesitas, manteniéndote siempre al día con tus obligaciones.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Libros de Compra y Venta</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Estados Financieros en Tiempo Real</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Cumplimiento SENIAT garantizado</li>
                    </ul>
                </div>
                <div>
                     <Image src="https://picsum.photos/seed/accounting/600/500" alt="Contabilidad" data-ai-hint="accounting charts" width={600} height={500} className="rounded-lg shadow-lg"/>
                </div>
            </div>
        </section>

         {/* Seguro */}
        <section id="seguro" className="py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Póliza de Tranquilidad: Tu Seguro Contable y Jurídico</h2>
                    <p className="mt-4 text-muted-foreground">
                        Entendemos los riesgos de operar en Venezuela. Por eso, creamos un seguro único que protege tu patrimonio ante errores contables, multas inesperadas o contingencias fiscales. Es más que un servicio, es tu paz mental.
                    </p>
                    <Button size="lg" className="mt-8">
                        Conoce más sobre tu Póliza <ArrowRight className="ml-2"/>
                    </Button>
                </div>
             </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Contáctanos</h2>
                    <p className="mt-4 text-muted-foreground">¿Listo para tomar el control de tu negocio? Déjanos tus datos y un especialista te contactará.</p>
                </div>
                <Card className="max-w-xl mx-auto">
                    <CardContent className="p-6">
                        <form className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" placeholder="Tu nombre completo" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" type="email" placeholder="tu@correo.com" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Mensaje</Label>
                                <Textarea id="message" placeholder="Cuéntanos sobre tu negocio..." />
                            </div>
                            <Button className="w-full">
                                <Mail className="mr-2"/>
                                Enviar Solicitud
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System C.M.S. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

    
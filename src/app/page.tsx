
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Menu, Flag, BookOpen, Shield, Briefcase, ArrowRight, CheckCircle, Bot, Mail, Phone, Building, Layers, Cpu, Users, BarChart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

export default function LandingPage() {
    const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");
    const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image");

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
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
             <Button asChild variant="outline">
              <Link href="/register">Registrarse</Link>
            </Button>
          </nav>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button>
                      <User className="mr-2 h-4 w-4"/>
                      Acceder
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild><Link href="/login-natural"><User className="mr-2"/>Acceso Natural</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-juridico"><Building className="mr-2"/>Acceso Jurídico</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/login-rrhh"><Briefcase className="mr-2"/>Acceso RR.HH.</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/80 backdrop-blur-sm">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menú</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-4 text-lg font-medium mt-8">
                        {navLinks.map((link) => (
                        <SheetClose asChild key={link.label}>
                            <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                            {link.label}
                            </Link>
                        </SheetClose>
                        ))}
                    </nav>
                    <div className="mt-auto space-y-2">
                       <Button asChild className="w-full">
                         <Link href="/register">Registrarse</Link>
                       </Button>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full" variant="outline">
                                <User className="mr-2"/>
                                Acceder
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem asChild><Link href="/login-natural"><User className="mr-2"/>Acceso Natural</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login-juridico"><Building className="mr-2"/>Acceso Jurídico</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login-rrhh"><Briefcase className="mr-2"/>Acceso RR.HH.</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 flex items-center text-center">
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
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance text-primary" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                        La Gestión Empresarial, Reinventada
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-balance text-white/90 max-w-3xl mx-auto" style={{textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>
                        Simplifica la contabilidad, la nómina y el cumplimiento normativo con una solución inteligente diseñada para el mercado venezolano.
                    </p>
                    <div className="mt-10 flex gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/register">
                            Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-background/20 text-white border-white/50 hover:bg-background/30">
                            <Link href="#servicios">
                            Explorar Servicios
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Un Ecosistema para tu Tranquilidad</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más que un software, somos tu aliado estratégico para navegar el entorno empresarial venezolano.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {services.map((item, i) => (
                        <Card key={item.title} className="bg-card text-center flex flex-col items-center p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
        
        {/* Features Section */}
        <section id="caracteristicas" className="py-20 md:py-28 bg-secondary/50 border-y">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="text-left">
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
            <div className="p-8 rounded-xl flex items-center justify-center">
                 <Image 
                    src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=1920&auto=format&fit=crop"
                    alt="Puente sobre el lago de Maracaibo"
                    data-ai-hint="Maracaibo bridge"
                    width={600}
                    height={600}
                    className="rounded-xl aspect-square object-cover shadow-2xl"
                 />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="nosotros" className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
                 <div className="text-left">
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
                        className="rounded-xl shadow-lg"
                    />
                )}
            </div>
        </section>
        
        {/* Contact Section */}
        <section id="contacto" className="py-20 md:py-28 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">¡Contactanos!</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Ponte en contacto con nuestro equipo de especialistas. Estamos listos para ayudarte.</p>
                </div>
                <Card className="max-w-4xl mx-auto shadow-lg">
                     <CardContent className="p-8 grid sm:grid-cols-2 gap-8">
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

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System C.M.S. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

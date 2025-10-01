
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Menu, Flag, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/#productos", label: "Productos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#contabilidad", label: "Contabilidad" },
  { href: "/#seguro", label: "Seguro Contable y Jurídico" },
  { href: "/#contacto", label: "Contacto" },
];

const services = [
    {
        title: "Producto A",
        imageUrl: "https://picsum.photos/seed/productA/600/400",
        imageHint: "architecture building"
    },
    {
        title: "Producto B",
        imageUrl: "https://picsum.photos/seed/productB/600/400",
        imageHint: "desk setup"
    },
    {
        title: "Producto C",
        imageUrl: "https://picsum.photos/seed/productC/600/400",
        imageHint: "waterfall nature"
    }
]

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
        
        {/* Servicios */}
        <section id="servicios" className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Nuestros Productos y Servicios</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(item => (
                        <Card key={item.title} className="overflow-hidden">
                             <CardContent className="p-0">
                                <Image src={item.imageUrl} alt={item.title} data-ai-hint={item.imageHint} width={600} height={400} className="aspect-video object-cover"/>
                                <div className="p-4">
                                  <h3 className="font-semibold text-lg">{item.title}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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

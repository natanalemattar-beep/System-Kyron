
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Building, User, ArrowRight, BookOpen, ShieldCheck, Handshake, Mail, Phone, MapPin, Send, Menu, Flag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
            <div className="bg-primary/10 text-primary p-2 rounded-md">
              <Flag className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">System CRS</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
                <Button key={link.label} variant={link.label === "Seguro Contable y Jurídico" ? "secondary" : "ghost"} asChild>
                    <Link href={link.href} className="text-sm font-medium">
                        {link.label}
                    </Link>
                </Button>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="hidden md:flex items-center gap-2">
                 <Link href="/login">
                    <User className="h-4 w-4"/>
                    Iniciar Sesión
                 </Link>
              </Button>
              <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground p-2 rounded-md">
                        <Flag className="h-6 w-6" />
                      </div>
                      <span className="text-lg font-bold">System CRS</span>
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
                          <Link href="/login">
                            Iniciar Sesión
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">System CRS</h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Soluciones Comerciales y Contables para su Negocio
            </p>
        </section>
        
        {/* Servicios */}
        <section id="servicios" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Nuestros Productos y Servicios</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(item => (
                        <Card key={item.title} className="text-center flex flex-col overflow-hidden">
                             <CardContent className="p-0">
                                <Image src={item.imageUrl} alt={item.title} data-ai-hint={item.imageHint} width={600} height={400} className="aspect-video object-cover"/>
                            </CardContent>
                        </Card>
                    ))}
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


"use client";

import { Building, User, Briefcase, ArrowRight, ShoppingCart, Gavel, Users, Megaphone, Cpu } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const accountTypes = [
  {
    type: "natural",
    title: "Persona Natural",
    description: "Para clientes individuales que gestionan sus trámites personales.",
    icon: User,
    href: "/register/natural",
  },
  {
    type: "juridica",
    title: "Admin y Finanzas",
    description: "Para registrar la empresa principal y acceder a los módulos de gestión.",
    icon: Building,
    href: "/register/juridica",
  },
  {
    type: "ventas",
    title: "Ventas y Facturación",
    description: "Para personal de ventas y cajeros que operan el punto de venta.",
    icon: ShoppingCart,
    href: "/register/ventas",
  },
  {
    type: "rrhh",
    title: "Recursos Humanos",
    description: "Para el personal encargado de la gestión de nóminas y empleados.",
    icon: Briefcase,
    href: "/register/rrhh",
  },
  {
    type: "socios",
    title: "Socios y Directivos",
    description: "Acceso al dashboard consolidado del holding empresarial.",
    icon: Users,
    href: "/register/socios",
  },
   {
    type: "marketing",
    title: "Productos y Marketing",
    description: "Para el equipo de productos, consultoría y marketing.",
    icon: Megaphone,
    href: "/register/marketing",
  },
  {
    type: "informatica",
    title: "Ingeniería e Informática",
    description: "Acceso para el equipo de desarrollo, seguridad y tecnología.",
    icon: Cpu,
    href: "/register/informatica",
  },
  {
    type: "juridico",
    title: "Escritorio Jurídico",
    description: "Para el equipo legal y de cumplimiento normativo.",
    icon: Gavel,
    href: "/register/juridico",
  },
];

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">Kyron</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/login-natural">
              Acceder
              <User className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Elige tu Tipo de Cuenta</h1>
            <p className="text-muted-foreground text-lg">
              Selecciona el perfil que mejor se adapte a tus necesidades para comenzar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accountTypes.map((account) => (
              <Card
                key={account.type}
                className="flex flex-col text-center bg-card border hover:border-primary hover:shadow-lg transition-all backdrop-blur-sm"
              >
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <account.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{account.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{account.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={account.href}>
                      Seleccionar <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <p className="mt-10 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login-natural" className="font-semibold text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
        </div>
      </main>
    </div>
  );
}

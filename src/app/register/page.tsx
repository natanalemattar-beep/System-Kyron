
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { loginOptions } from "@/lib/login-options";

export default function RegisterPage() {
    
  // Map login hrefs to registration hrefs, filtering out any undefined ones
  const registrationOptions = loginOptions
    .map(option => ({
        ...option,
        href: option.href.replace('/login', '/register'),
    }))
    // Special case for 'fintech' which should go to 'juridica'
    .map(option => {
        if (option.href.includes('/register-fintech')) {
            return { ...option, href: '/register/juridica' };
        }
        return option;
    });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">System Kyron</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/login">
              Acceder
              <User className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Elige tu Tipo de Cuenta para Registrarte</h1>
            <p className="text-muted-foreground text-lg">
              Selecciona el perfil que mejor se adapte a tus necesidades para comenzar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrationOptions.map((account) => (
              <Card
                key={account.href}
                className="flex flex-col text-center bg-card border hover:border-primary hover:shadow-lg transition-all"
              >
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-xl mb-4">
                    <account.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{account.label}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{account.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={account.href}>
                      Registrarse <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <p className="mt-10 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/" className="font-semibold text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
        </div>
      </main>
    </div>
  );
}

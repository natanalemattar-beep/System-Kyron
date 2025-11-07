
"use client";

import { useState } from "react";
import { Megaphone, Eye, EyeOff, User, Briefcase, Building, ShoppingCart, Users, Gavel } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";

export default function LoginMarketingPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
     <div className="flex flex-col min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>
        </div>
        
      <header className="sticky top-0 z-50 w-full bg-background/50 backdrop-blur-md border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        Acceder
                        <User className="ml-2 h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/login-natural">Acceso Natural</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-juridico">Admin y Finanzas</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/escritorio-juridico">Escritorio Jurídico</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-ventas">Ventas y Facturación</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-rrhh">Acceso RR.HH.</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-socios">Acceso Socios</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/login-marketing">Productos, Asesoría y Marketing</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-primary/10">
              <Megaphone className="h-8 w-8 text-primary"/>
            </div>
            <CardTitle className="text-2xl tracking-wider">Productos y Marketing</CardTitle>
            <CardDescription>Accede al portal de gestión de marketing y asesoría.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Usuario</Label>
              <Input type="text" placeholder="usuario.marketing"/>
            </div>
            <div className="space-y-2 relative">
              <Label>Contraseña</Label>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
              />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Button asChild className="w-full h-11 text-base font-bold tracking-widest">
              <Link href="/analisis-ventas">Acceder</Link>
            </Button>
          </CardContent>
           <CardFooter className="flex-col gap-2 p-6 border-t text-sm">
                <p className="text-muted-foreground">¿No eres del área de marketing?</p>
                <div className="flex justify-center gap-4">
                     <Button asChild variant="link" className="p-0">
                        <Link href="/login-juridico" className="flex items-center gap-1"><Building className="h-4 w-4"/>Admin</Link>
                    </Button>
                     <Button asChild variant="link" className="p-0">
                        <Link href="/login-ventas" className="flex items-center gap-1"><ShoppingCart className="h-4 w-4"/>Ventas</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}

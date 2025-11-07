
"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Building, Briefcase, ShoppingCart, Users, Megaphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

export default function LoginNaturalPage() {
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
              <User className="h-8 w-8 text-primary"/>
            </div>
            <CardTitle className="text-2xl tracking-wider">Acceso Personal</CardTitle>
            <CardDescription>Inicia sesión con tu Cédula de Identidad.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Cédula de Identidad</Label>
              <Input type="text" placeholder="V-12345678"/>
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
              <Link href="/dashboard">Acceder</Link>
            </Button>
          </CardContent>
           <CardFooter className="flex flex-col gap-4 text-center text-sm p-6 border-t">
              <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
              <div className="flex justify-center gap-4">
                <Link href="/login-juridico" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <Building className="h-4 w-4"/> Admin
                </Link>
                 <Link href="/login-ventas" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4"/> Ventas
                </Link>
                 <Link href="/login-rrhh" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <Briefcase className="h-4 w-4"/> RR.HH.
                </Link>
              </div>
               <Separator className="my-2"/>
               <Link href="/register" className="font-medium text-primary hover:underline">
                    Crear una cuenta nueva
                </Link>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}

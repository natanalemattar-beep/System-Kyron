
"use client";

import { useState } from "react";
import { Briefcase, Eye, EyeOff, User, Building, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";

export default function LoginRrhhPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
     <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-transparent to-transparent animate-gradient-animation" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900 via-transparent to-transparent animate-gradient-animation" style={{ animationDuration: '25s', animationDelay: '5s' }}></div>
        </div>
        
      <header className="sticky top-0 z-50 w-full bg-slate-900/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hover:bg-primary/20">
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
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-border/50">
          <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
              <Briefcase className="h-8 w-8"/>
            </div>
            <CardTitle className="text-2xl">Acceso RR.HH.</CardTitle>
            <CardDescription>Inicia sesión con tu usuario de Recursos Humanos.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Usuario</Label>
              <Input type="text" placeholder="usuario.rrhh"/>
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
            <Button asChild className="w-full h-11 text-base">
              <Link href="/dashboard-rrhh">Acceder</Link>
            </Button>
          </CardContent>
           <CardFooter className="flex-col gap-2 p-6 border-t border-border/50 text-sm">
                <p className="text-muted-foreground">¿No perteneces a RR.HH.?</p>
                <div className="flex gap-4">
                    <Button asChild variant="link" className="p-0">
                        <Link href="/login-natural" className="flex items-center gap-1"><User className="h-4 w-4"/>Acceso Personal</Link>
                    </Button>
                     <Button asChild variant="link" className="p-0">
                        <Link href="/login-juridico" className="flex items-center gap-1"><Building className="h-4 w-4"/>Acceso Admin</Link>
                    </Button>
                     <Button asChild variant="link" className="p-0">
                        <Link href="/login-ventas" className="flex items-center gap-1"><ShoppingCart className="h-4 w-4"/>Acceso Ventas</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}

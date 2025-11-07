
"use client";

import { useState } from "react";
import { Users, Eye, EyeOff, User, Building, ShoppingCart, Briefcase, Megaphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";

export default function LoginSociosPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
     <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.3),rgba(255,255,255,0))]"></div>
        </div>
        <div id="stars" className="absolute inset-0 z-[-1]"></div>
        
      <header className="sticky top-0 z-50 w-full bg-background/50 backdrop-blur-md border-b border-border/20">
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
                    <DropdownMenuItem asChild>
                        <Link href="/login-marketing">Productos, Asesoría y Marketing</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <Card className="w-full max-w-md mx-auto bg-card/60 backdrop-blur-xl border-primary/20 shadow-lg shadow-primary/10 animate-border-glow">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20 ring-inset shadow-inner shadow-primary/10">
              <Users className="h-8 w-8 text-primary"/>
            </div>
            <CardTitle className="text-2xl tracking-wider">Portal de Socios</CardTitle>
            <CardDescription>Acceso exclusivo para socios y directivos.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Usuario</Label>
              <Input type="text" placeholder="usuario.socio" className="bg-background/50"/>
            </div>
            <div className="space-y-2 relative">
              <Label>Contraseña</Label>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10 bg-background/50"
              />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Button asChild className="w-full h-11 text-base font-bold tracking-widest hover:shadow-primary/40 hover:shadow-lg transition-shadow duration-300">
              <Link href="/dashboard-socios">Acceder</Link>
            </Button>
          </CardContent>
           <CardFooter className="flex-col gap-2 p-6 border-t border-border/20 text-sm">
                <p className="text-muted-foreground">¿No eres socio?</p>
                <div className="flex gap-4">
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

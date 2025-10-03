
"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Flag, Building, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function LoginNaturalPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/.2),rgba(255,255,255,0))]"></div>
      <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <Flag className="h-6 w-6" />
            </div>
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
                        <Link href="/login-juridico">Acceso Jurídico</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-rrhh">Acceso RR.HH.</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
              <User className="h-8 w-8"/>
            </div>
            <CardTitle className="text-2xl">Acceso Personal</CardTitle>
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
            <Button asChild className="w-full h-11 text-base">
              <Link href="/dashboard">Acceder</Link>
            </Button>
          </CardContent>
           <CardFooter className="flex flex-col gap-4 p-6 border-t text-sm">
                <div className="flex justify-between w-full">
                    <p className="text-muted-foreground">¿No tienes cuenta?</p>
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Regístrate aquí
                    </Link>
                </div>
                 <div className="flex justify-between w-full">
                    <p className="text-muted-foreground">¿Eres una empresa?</p>
                     <Link href="/login-juridico" className="font-semibold text-primary hover:underline flex items-center gap-1">
                        Acceso Jurídico <Building className="h-4 w-4"/>
                    </Link>
                </div>
                 <div className="flex justify-between w-full">
                    <p className="text-muted-foreground">¿Eres de RR.HH.?</p>
                    <Link href="/login-rrhh" className="font-semibold text-primary hover:underline flex items-center gap-1">
                        Acceso RR.HH. <Briefcase className="h-4 w-4"/>
                    </Link>
                </div>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}

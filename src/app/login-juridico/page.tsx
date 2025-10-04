
"use client";

import { useState } from "react";
import { Building, Eye, EyeOff, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

export default function LoginJuridicoPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rif, setRif] = useState("");

  const handleRifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    if (value && !["J", "G", "V", "E"].includes(value[0])) {
      value = "J-" + value;
    }
    setRif(value);
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-gradient-to-br from-sky-100 to-blue-200 bg-[length:200%_200%] animate-gradient-animation">
      {/* Background Gradient */}
      

      <header className="sticky top-0 z-50 w-full bg-blue-200/30 backdrop-blur-md border-b">
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
                        <Link href="/login-juridico">Acceso Juridico</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-rrhh">Acceso RR.HH.</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-border/50">
          <CardHeader className="text-center">
             <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
              <Building className="h-8 w-8"/>
            </div>
            <CardTitle className="text-2xl">Acceso Juridico</CardTitle>
            <CardDescription>Inicia sesión con tu RIF empresarial.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>RIF Empresarial</Label>
              <Input type="text" placeholder="J-12345678-9" value={rif} onChange={handleRifChange} />
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
              <Link href="/dashboard-juridico">Acceder</Link>
            </Button>
          </CardContent>
           <CardFooter className="flex flex-col gap-4 text-center text-sm p-6 border-t border-border/50">
              <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
              <div className="flex justify-center gap-4">
                <Link href="/login-natural" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <User className="h-4 w-4"/> Personal
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

    
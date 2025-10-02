
"use client";

import { useState } from "react";
import { Building, Eye, EyeOff, Flag, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-md">
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
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
             <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4">
              <Building className="h-8 w-8"/>
            </div>
            <CardTitle className="text-2xl">Acceso Jurídico</CardTitle>
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
            <Button asChild className="w-full">
              <Link href="/dashboard-juridico">Acceder</Link>
            </Button>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿No eres una empresa?{" "}
              <Link href="/login-natural" className="font-semibold text-primary hover:underline">
                Accede como Persona Natural
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

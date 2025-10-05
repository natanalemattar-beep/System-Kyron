
"use client";

import { useState } from "react";
import { ShoppingCart, Eye, EyeOff, User, Briefcase, Building } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function LoginVentasPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md">
        <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
            <ShoppingCart className="h-8 w-8"/>
            </div>
            <CardTitle className="text-2xl">Acceso a Ventas</CardTitle>
            <CardDescription>Inicia sesión con tu usuario de cajero o vendedor.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
            <Label>Usuario</Label>
            <Input type="text" placeholder="cajero.1"/>
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
            <Link href="/punto-de-venta">Acceder al Punto de Venta</Link>
            </Button>
        </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm p-6 border-t">
            <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
            <div className="flex justify-center gap-4">
                <Button variant="link" size="sm" asChild><Link href="/login-juridico" className="flex items-center gap-1"><Building className="h-4 w-4"/> Admin</Link></Button>
                <Button variant="link" size="sm" asChild><Link href="/login-natural" className="flex items-center gap-1"><User className="h-4 w-4"/> Personal</Link></Button>
                <Button variant="link" size="sm" asChild><Link href="/login-rrhh" className="flex items-center gap-1"><Briefcase className="h-4 w-4"/> RR.HH.</Link></Button>
            </div>
          </CardFooter>
      </Card>
    </div>
  );
}

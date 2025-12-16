
"use client";

import { useState } from "react";
import { Banknote, Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";


export default function LoginFintechPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
         <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <Banknote className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Portal FinTech</CardTitle>
        <CardDescription>Acceso seguro al sistema financiero.</CardDescription>
         <Alert className="text-left mt-4 bg-secondary/50">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle className="font-semibold">Conexión Segura</AlertTitle>
            <AlertDescription className="text-xs">
                Su seguridad es nuestra prioridad. Este acceso está cifrado con TLS 1.3.
            </AlertDescription>
        </Alert>
      </CardHeader>
      <form>
        <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
                <Label htmlFor="identifier">Cédula, RIF o Correo Corporativo</Label>
                <Input id="identifier" placeholder="Ej: V-12345678 o admin@kyron.com" required />
            </div>
            <div className="space-y-2 relative">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                />
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            </div>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="font-normal">Recordar este dispositivo</Label>
                </div>
                 <Button asChild variant="link" className="p-0 h-auto">
                    <Link href="/recover-fintech">
                        ¿Olvidó su contraseña?
                    </Link>
                </Button>
            </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex-col">
          <Button asChild type="submit" className="w-full h-11 text-base">
            <Link href="/contabilidad">Continuar</Link>
          </Button>
        </CardFooter>
      </form>
       <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
            <p className="text-xs text-muted-foreground text-center">Al acceder, acepta nuestras <Link href="/terms" className="underline">Condiciones del Servicio Financiero</Link>.</p>
             <Button asChild variant="link" className="p-0 h-auto text-muted-foreground">
                <Link href="mailto:soporte@kyron.com?subject=Bloqueo%20FinTech">
                    <Mail className="mr-2 h-4 w-4"/>
                    ¿Problemas para acceder? Contactar soporte
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );
}

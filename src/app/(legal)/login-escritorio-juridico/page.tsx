"use client";

import { useState } from "react";
import { Gavel, Building, ShoppingCart, Briefcase, Users, Megaphone, Cpu, User, Banknote, Eye, EyeOff } from "lucide-react";
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

export default function LoginJuridicoPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <Gavel className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Escritorio Jurídico</CardTitle>
        <CardDescription>Acceso seguro al portal de gestión legal y cumplimiento normativo.</CardDescription>
      </CardHeader>
      <form>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario Legal</Label>
            <Input id="username" placeholder="legal.user@kyron.com" required />
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
                  <Checkbox id="trusted-device" />
                  <Label htmlFor="trusted-device" className="font-normal">Este es un dispositivo de confianza</Label>
              </div>
              <Button asChild variant="link" className="p-0 h-auto">
                  <Link href="/recover-legal">
                      ¿Olvidó su credencial?
                  </Link>
              </Button>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex-col">
          <Button asChild type="submit" className="w-full h-11 text-base">
            <Link href="/legal/dashboard-juridico">Verificar Credenciales</Link>
          </Button>
        </CardFooter>
      </form>
       <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
            <p className="text-xs text-muted-foreground text-center">Al acceder, confirma que está autorizado y acepta las políticas de confidencialidad de información sensible.</p>
            <Button asChild variant="link" className="p-0 h-auto text-muted-foreground">
                <Link href="/solicitud-acceso-legal">
                    ¿Necesita solicitar acceso al portal legal?
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );
}

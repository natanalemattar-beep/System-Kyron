
"use client";

import { useState } from "react";
import { Users, Eye, EyeOff, Building, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function LoginSociosPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
          <Users className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl">Portal de Socios</CardTitle>
        <CardDescription>Acceso exclusivo para socios y directivos.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label>Usuario</Label>
          <Input type="text" placeholder="usuario.socio" />
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
          <Link href="/dashboard-socios">Acceder</Link>
        </Button>
      </CardContent>
      <CardFooter className="flex-col gap-2 p-6 border-t text-sm">
        <p className="text-muted-foreground">¿No eres socio?</p>
        <div className="flex gap-4">
          <Button asChild variant="link" className="p-0">
            <Link href="/login-juridico" className="flex items-center gap-1"><Building className="h-4 w-4" />Acceso Admin</Link>
          </Button>
          <Button asChild variant="link" className="p-0">
            <Link href="/login-ventas" className="flex items-center gap-1"><ShoppingCart className="h-4 w-4" />Acceso Ventas</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

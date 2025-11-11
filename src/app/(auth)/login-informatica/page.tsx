
"use client";

import { useState } from "react";
import { Cpu, Eye, EyeOff, Building, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LoginInformaticaPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard-informatica');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
          <Cpu className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Ingeniería e Informática</CardTitle>
        <CardDescription>Acceso para el personal de tecnología y seguridad.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Usuario</Label>
            <Input type="text" placeholder="dev.user" required />
          </div>
          <div className="space-y-2 relative">
            <Label>Contraseña</Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              required
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
              {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <Button type="submit" className="w-full h-11 text-base">
            Acceder
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col gap-4 text-center text-sm p-6 border-t">
        <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
        <div className="flex justify-center gap-4">
          <Link href="/login-juridico" className="font-medium text-primary hover:underline flex items-center gap-1">
            <Building className="h-4 w-4" /> Admin
          </Link>
          <Link href="/login-ventas" className="font-medium text-primary hover:underline flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" /> Ventas
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

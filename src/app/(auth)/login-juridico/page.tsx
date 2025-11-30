
"use client";

import { useState } from "react";
import { Gavel, Eye, EyeOff, Building, ShoppingCart, Briefcase, Users, Megaphone, Cpu, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LoginJuridicoPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/escritorio-juridico');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
          <Gavel className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Escritorio Jurídico</CardTitle>
        <CardDescription>Acceso para el departamento legal y de cumplimiento.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Usuario (Legal)</Label>
            <Input type="text" placeholder="legal.user" required />
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
       <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
        <p className="text-muted-foreground">¿No eres del departamento legal? Accede a otro portal:</p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
            <Button asChild variant="link" className="p-0">
                <Link href="/login-natural" className="flex items-center gap-1"><User className="h-4 w-4" />Personal</Link>
            </Button>
             <Button asChild variant="link" className="p-0">
                <Link href="/login-fintech" className="flex items-center gap-1"><Building className="h-4 w-4" />FinTech</Link>
            </Button>
            <Button asChild variant="link" className="p-0">
                <Link href="/login-ventas" className="flex items-center gap-1"><ShoppingCart className="h-4 w-4" />Ventas</Link>
            </Button>
             <Button asChild variant="link" className="p-0">
                <Link href="/login-rrhh" className="flex items-center gap-1"><Briefcase className="h-4 w-4" />RR.HH.</Link>
            </Button>
            <Button asChild variant="link" className="p-0">
                <Link href="/login-socios" className="flex items-center gap-1"><Users className="h-4 w-4" />Socios</Link>
            </Button>
            <Button asChild variant="link" className="p-0">
                <Link href="/login-marketing" className="flex items-center gap-1"><Megaphone className="h-4 w-4" />Marketing</Link>
            </Button>
            <Button asChild variant="link" className="p-0">
                <Link href="/login-informatica" className="flex items-center gap-1"><Cpu className="h-4 w-4" />IT</Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

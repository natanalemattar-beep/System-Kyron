
"use client";

import { useState } from "react";
import { Cpu, Eye, EyeOff, Building, ShoppingCart, Briefcase, Users, Megaphone, User, Gavel, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Credentials = ({ user, password }: { user: string; password?: string }) => {
    const { toast } = useToast();
    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `${field} copiado`,
            description: `${text} ha sido copiado al portapapeles.`,
        });
    };

    return (
        <div className="mt-6 w-full space-y-3 text-sm">
            <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                <span className="text-muted-foreground">Usuario: <strong className="text-foreground font-mono">{user}</strong></span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(user, 'Usuario')}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </div>
            {password && (
                <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                    <span className="text-muted-foreground">Contraseña: <strong className="text-foreground font-mono">{password}</strong></span>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(password, 'Contraseña')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
        </div>
    );
};

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
            <Input id="username" type="text" placeholder="dev.user" required defaultValue="dev.user"/>
          </div>
          <div className="space-y-2 relative">
            <Label>Contraseña</Label>
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              required
              defaultValue="password123"
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
              {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <Button type="submit" className="w-full h-11 text-base">
            Acceder
          </Button>
          <Credentials user="dev.user" password="password123" />
        </CardContent>
      </form>
      <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
        <p className="text-muted-foreground">¿No eres de IT? Accede a otro portal:</p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
            <Button asChild variant="link" className="p-0">
                <Link href="/login-natural" className="flex items-center gap-1"><User className="h-4 w-4" />Personal</Link>
            </Button>
            <Button asChild variant="link" className="p-0">
                <Link href="/login-admin" className="flex items-center gap-1"><Building className="h-4 w-4" />Admin</Link>
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
                <Link href="/login-juridico" className="flex items-center gap-1"><Gavel className="h-4 w-4" />Jurídico</Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

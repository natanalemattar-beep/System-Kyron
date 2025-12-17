"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, AlertTriangle, User, Building } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      
      setTimeout(() => {
        // Simulate checking credentials and determining role
        if (formData.username === "admin.user" && formData.password === "password123") {
             router.push('/dashboard-empresa');
        } else if (formData.username === "cajero.1" && formData.password === "password123") {
            router.push('/analisis-ventas');
        } else if (formData.username === "legal.user" && formData.password === "password123") {
            router.push('/legal/escritorio-juridico');
        } else if (formData.username === "V-12345678" && formData.password === "password123") {
            router.push('/dashboard');
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
        setIsLoading(false);
      }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <User className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Acceso Unificado</CardTitle>
        <CardDescription>Inicia sesión para acceder a tu portal.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6">
          {error && (
              <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                      {error}
                  </AlertDescription>
              </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Usuario / Cédula / RIF</Label>
            <Input id="username" placeholder="Introduce tu identificador" value={formData.username} onChange={handleInputChange} required/>
          </div>
           <div className="space-y-2 relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleInputChange} className="pr-10" required/>
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">{passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex-col">
          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            Acceder
          </Button>
        </CardFooter>
      </form>
       <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
          <p className="text-muted-foreground">¿No tienes una cuenta?</p>
          <Button asChild variant="link" className="p-0">
              <Link href="/register" className="font-medium">Regístrate aquí</Link>
          </Button>
        </CardFooter>
    </Card>
  );
}
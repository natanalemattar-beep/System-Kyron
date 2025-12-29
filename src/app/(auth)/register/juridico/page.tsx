
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Building, Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react";
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

export default function RegisterJuridicoPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        // Simulate API call
        setTimeout(() => {
            toast({
                title: "¡Registro Exitoso!",
                description: "La cuenta de tu empresa ha sido creada. Ahora puedes iniciar sesión.",
            });
            setIsLoading(false);
            // In a real app, you would redirect here:
            // router.push("/login-fintech");
        }, 1500);
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <Building className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro de Persona Jurídica</CardTitle>
                <CardDescription>Crea la cuenta principal de tu empresa.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                    {error && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="razonSocial">Razón Social</Label>
                        <Input id="razonSocial" placeholder="Tu Empresa, C.A." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rif">RIF de la Empresa</Label>
                        <Input id="rif" placeholder="J-12345678-9" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección Fiscal</Label>
                        <Input id="direccion" placeholder="Av. Principal, Edificio Centro, Piso 1, Caracas" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="legalName">Nombres y Apellidos del Representante Legal</Label>
                        <Input id="legalName" placeholder="Juan Pérez" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="legalCi">Cédula del Representante</Label>
                        <Input id="legalCi" placeholder="V-12.345.678" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico (Admin)</Label>
                        <Input id="email" type="email" placeholder="admin@tuempresa.com" required />
                    </div>
                    <div className="relative space-y-2">
                        <Label htmlFor="password">Contraseña Maestra</Label>
                        <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="••••••••" required />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                            {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-2 flex-col gap-4">
                    <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                        Crear Cuenta Jurídica
                    </Button>
                     <p className="text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login-fintech" className="font-semibold text-primary hover:underline">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}

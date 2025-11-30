"use client";

import { useState } from "react";
import { Building, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function RegisterJuridicaPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Registro Exitoso",
            description: "Tu empresa ha sido registrada. Ahora puedes iniciar sesión.",
        });
        // In a real app, you would redirect to the login page or dashboard.
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
                    <Building className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro de Empresa</CardTitle>
                <CardDescription>Crea la cuenta principal para tu empresa.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="rif">RIF de la Empresa</Label>
                        <Input id="rif" placeholder="J-12345678-9" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="company-name">Razón Social</Label>
                        <Input id="company-name" placeholder="Tu Empresa, C.A." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico del Administrador</Label>
                        <Input id="email" type="email" placeholder="admin@tuempresa.com" required />
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
                    <Button type="submit" className="w-full h-11 text-base">Registrar Empresa</Button>
                </CardContent>
            </form>
            <CardFooter className="flex-col p-6 border-t text-sm">
                <p className="text-muted-foreground">¿Ya registraste tu empresa?</p>
                 <Link href="/login-fintech" className="font-medium text-primary hover:underline">
                    Inicia sesión aquí
                </Link>
            </CardFooter>
        </Card>
    );
}

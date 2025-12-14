
"use client";

import { useState } from "react";
import { Gavel, Eye, EyeOff, Building } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RegisterJuridicaPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <Building className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro de Persona Jurídica</CardTitle>
                <CardDescription>Crea la cuenta principal de tu empresa.</CardDescription>
            </CardHeader>
            <form>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold">Datos de la Empresa</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company-name">Razón Social</Label>
                                <Input id="company-name" placeholder="Tu Empresa, C.A." required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-rif">RIF de la Empresa</Label>
                                <Input id="company-rif" placeholder="J-12345678-9" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company-address">Dirección Fiscal</Label>
                            <Input id="company-address" placeholder="Av. Principal, Edificio Centro, Piso 1, Caracas" required />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h4 className="font-semibold">Datos del Representante Legal</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="legal-name">Nombres y Apellidos</Label>
                                <Input id="legal-name" placeholder="Juan Pérez" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="legal-ci">Cédula de Identidad</Label>
                                <Input id="legal-ci" placeholder="V-12.345.678" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico (Admin)</Label>
                            <Input id="email" type="email" placeholder="admin@tuempresa.com" required />
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="password">Contraseña Maestra</Label>
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
                    </div>
                </CardContent>
                 <CardFooter className="p-6 pt-0">
                    <Button asChild type="submit" className="w-full h-11 text-base">
                        <Link href="/dashboard-empresa">Crear Cuenta Jurídica</Link>
                    </Button>
                </CardFooter>
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


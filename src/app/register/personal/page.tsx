
"use client";

import { useState } from "react";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function RegisterPersonalPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro de Personal</CardTitle>
                <CardDescription>Crea tu cuenta de empleado para unirte a tu empresa.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="invite-code">Código de Invitación de la Empresa</Label>
                    <Input id="invite-code" placeholder="Ej: ABC-123-XYZ" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="employee-id">Cédula de Identidad</Label>
                    <Input id="employee-id" placeholder="Ej: V-12345678" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico Personal</Label>
                    <Input id="email" type="email" placeholder="tu@correo.com" required />
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
                <Button type="submit" className="w-full h-11 text-base">Crear Cuenta de Empleado</Button>
            </CardContent>
            <CardFooter className="flex-col p-6 border-t text-sm">
                 <p className="text-muted-foreground">¿Tu empresa aún no está registrada?</p>
                <Link href="/register/juridica" className="font-medium text-primary hover:underline">
                    Regístrala aquí primero
                </Link>
            </CardFooter>
        </Card>
    );
}

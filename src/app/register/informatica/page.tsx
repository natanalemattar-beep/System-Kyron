
"use client";

import { useState } from "react";
import { Cpu, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function RegisterInformaticaPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
                    <Cpu className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro de Ingeniería e IT</CardTitle>
                <CardDescription>Crea tu cuenta de desarrollador o personal de sistemas.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="employee-id">ID de Empleado / Usuario</Label>
                    <Input id="employee-id" placeholder="dev.user" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="dev@tuempresa.com" required />
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
                <Button type="submit" className="w-full h-11 text-base">Crear Cuenta de IT</Button>
            </CardContent>
            <CardFooter className="flex-col p-6 border-t text-sm">
                 <p className="text-muted-foreground">¿Ya tienes una cuenta?</p>
                <Link href="/login-informatica" className="font-medium text-primary hover:underline">
                    Inicia sesión aquí
                </Link>
            </CardFooter>
        </Card>
    );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, KeyRound, Smartphone, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SeguridadPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    Seguridad de la Cuenta
                </h1>
                <p className="text-muted-foreground mt-2">Gestiona la protección de tu identidad y tus documentos.</p>
            </header>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><KeyRound className="h-5 w-5"/> Autenticación de Dos Factores (2FA)</CardTitle>
                        <CardDescription>Añade una capa extra de seguridad a tu cuenta.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>App de Autenticación</Label>
                            <p className="text-sm text-muted-foreground">Usa Google Authenticator o similares.</p>
                        </div>
                        <Switch />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5"/> Dispositivos Vinculados</CardTitle>
                        <CardDescription>Sesiones activas que tienen acceso a tu información.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                            <div className="text-sm">
                                <p className="font-semibold">iPhone 15 Pro - Caracas</p>
                                <p className="text-xs text-muted-foreground">Sesión actual • Activo ahora</p>
                            </div>
                            <Badge>Este dispositivo</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                            <div className="text-sm">
                                <p className="font-semibold">Windows PC - Valencia</p>
                                <p className="text-xs text-muted-foreground">Última conexión: hace 2 días</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive">Cerrar Sesión</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive"><Lock className="h-5 w-5"/> Bloqueo de Documentos</CardTitle>
                        <CardDescription>Inhabilita el acceso a tus documentos digitalizados en caso de robo o extravío de tu móvil.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="destructive" className="w-full">Activar Bloqueo de Emergencia</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

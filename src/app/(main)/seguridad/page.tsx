
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, KeyRound, QrCode, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SeguridadPage() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const { toast } = useToast();

    const handleToggleTwoFactor = () => {
        const newState = !twoFactorEnabled;
        setTwoFactorEnabled(newState);
        toast({
            title: `Verificación en Dos Pasos ${newState ? "Activada" : "Desactivada"}`,
            description: `La seguridad de tu cuenta ha sido ${newState ? "reforzada" : "modificada"}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Seguridad y Configuración
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona la seguridad de tu cuenta.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Verificación en Dos Pasos (2FA)</CardTitle>
            <CardDescription>
                Añade una capa extra de seguridad a tu cuenta. Una vez activada, se te pedirá un código de una app de autenticación (como Google Authenticator) al iniciar sesión.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <Label htmlFor="two-factor-switch" className="font-medium">
                    {twoFactorEnabled ? "2FA Activado" : "2FA Desactivado"}
                </Label>
                <Switch
                    id="two-factor-switch"
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggleTwoFactor}
                />
            </div>
            {twoFactorEnabled && (
                <div className="p-4 border-t border-dashed">
                    <h3 className="font-semibold mb-4">Configura tu App de Autenticación</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="p-2 bg-white rounded-lg">
                            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/SystemCSM:usuario@email.com?secret=JBSWY3DPEHPK3PXP" alt="QR Code" width={120} height={120}/>
                        </div>
                        <div className="flex-1 space-y-4">
                            <p className="text-sm text-muted-foreground">1. Escanea este código QR con tu app de autenticación.</p>
                            <div className="space-y-2">
                                <Label htmlFor="auth-code">2. Introduce el código de 6 dígitos</Label>
                                <Input id="auth-code" placeholder="123456" maxLength={6} />
                            </div>
                            <Button className="w-full">Verificar y Activar</Button>
                        </div>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>
                    Es recomendable usar una contraseña segura que no utilices en otros sitios.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <Input id="current-password" type="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input id="new-password" type="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                    <Input id="confirm-password" type="password" />
                </div>
            </CardContent>
            <CardContent>
                <Button className="w-full md:w-auto">
                    <KeyRound className="mr-2"/>
                    Actualizar Contraseña
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

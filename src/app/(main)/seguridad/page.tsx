
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, KeyRound, QrCode, Monitor, Smartphone, LogOut, CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const activeSessions = [
    { id: 1, device: "Este dispositivo", browser: "Chrome en Windows", location: "Caracas, VE", lastSeen: "Ahora mismo", icon: Monitor },
    { id: 2, device: "iPhone 15 Pro", browser: "Safari en iOS", location: "Valencia, VE", lastSeen: "Hace 2 horas", icon: Smartphone },
];

const loginHistory = [
    { id: 1, date: "20/07/2024 10:00 AM", ip: "190.72.80.1", location: "Caracas, VE", status: "Exitoso" },
    { id: 2, date: "19/07/2024 08:30 PM", ip: "200.10.20.5", location: "Valencia, VE", status: "Exitoso" },
    { id: 3, date: "18/07/2024 09:15 AM", ip: "190.72.80.1", location: "Caracas, VE", status: "Exitoso" },
];


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
    
    const handleLogoutDevice = (deviceId: number) => {
        toast({
            title: "Sesión Cerrada Exitosamente",
            description: `Se ha cerrado la sesión en el dispositivo seleccionado.`,
            action: <CheckCircle className="text-green-500" />
        })
    }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Seguridad y Configuración
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona las opciones de seguridad y acceso de tu cuenta.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-3">
        
        <div className="lg:col-span-3 grid gap-8">
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Cambiar Contraseña</CardTitle>
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
                <CardFooter>
                    <Button>
                        <KeyRound className="mr-2"/>
                        Actualizar Contraseña
                    </Button>
                </CardFooter>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Verificación en Dos Pasos (2FA)</CardTitle>
                    <CardDescription>
                        Añade una capa extra de seguridad a tu cuenta. Se te pedirá un código de una app de autenticación (como Google Authenticator) al iniciar sesión.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                        <Label htmlFor="two-factor-switch" className="font-medium flex items-center gap-2">
                            <Shield className={`h-5 w-5 ${twoFactorEnabled ? 'text-green-500' : 'text-muted-foreground'}`}/>
                            {twoFactorEnabled ? "Autenticación de dos factores activada" : "Activar autenticación de dos factores"}
                        </Label>
                        <Switch
                            id="two-factor-switch"
                            checked={twoFactorEnabled}
                            onCheckedChange={handleToggleTwoFactor}
                        />
                    </div>
                     {twoFactorEnabled && (
                        <div className="p-4 border-t mt-6">
                            <h3 className="font-semibold mb-4">Configura tu App de Autenticación</h3>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="p-2 bg-white rounded-lg">
                                    <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/SystemCSM:usuario@email.com?secret=JBSWY3DPEHPK3PXP" alt="QR Code" width={120} height={120}/>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <p className="text-sm text-muted-foreground">1. Escanea este código QR con tu app de autenticación.</p>
                                    <div className="space-y-2">
                                        <Label htmlFor="auth-code">2. Introduce el código de 6 dígitos para verificar</Label>
                                        <Input id="auth-code" placeholder="123456" maxLength={6} />
                                    </div>
                                    <Button className="w-full">Verificar y Activar</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Sesiones Activas</CardTitle>
                    <CardDescription>
                        Estas son las sesiones activas en tu cuenta. Puedes cerrar sesión en cualquiera de ellas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {activeSessions.map(session => (
                             <li key={session.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                                <session.icon className="h-8 w-8 text-primary"/>
                                <div className="flex-1">
                                    <p className="font-semibold">{session.device}</p>
                                    <p className="text-sm text-muted-foreground">{session.browser} - {session.location}</p>
                                    <p className="text-xs text-green-500 font-medium">{session.lastSeen}</p>
                                </div>
                                {session.device !== "Este dispositivo" && (
                                     <Button variant="ghost" size="sm" onClick={() => handleLogoutDevice(session.id)}>
                                        <LogOut className="mr-2 h-4 w-4"/>
                                        Cerrar sesión
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                </CardContent>
             </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Inicio de Sesión</CardTitle>
                    <CardDescription>
                        Registro de los últimos accesos a tu cuenta.
                    </CardDescription>
                </CardHeader>
                 <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha y Hora</TableHead>
                                <TableHead>Dirección IP</TableHead>
                                <TableHead>Ubicación</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loginHistory.map(entry => (
                                <TableRow key={entry.id}>
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell className="font-mono">{entry.ip}</TableCell>
                                    <TableCell>{entry.location}</TableCell>
                                    <TableCell className="text-green-500 font-medium">{entry.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>
        </div>

      </div>
    </div>
  );
}

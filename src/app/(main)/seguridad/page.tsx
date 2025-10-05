
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const activeSessions = [
    { id: 1, device: "Este dispositivo", browser: "Chrome en Windows", location: "Caracas, VE", lastSeen: "Ahora mismo", icon: Monitor },
    { id: 2, device: "iPhone 15 Pro", browser: "Safari en iOS", location: "Valencia, VE", lastSeen: "Hace 2 horas", icon: Smartphone },
];

const loginHistory = [
    { id: 1, date: "20/07/2024 10:00 AM", ip: "190.72.80.1", location: "Caracas, VE", status: "Exitoso" },
    { id: 2, date: "19/07/2024 08:30 PM", ip: "200.10.20.5", location: "Valencia, VE", status: "Exitoso" },
    { id: 3, date: "18/07/2024 09:15 AM", ip: "190.72.80.1", location: "Caracas, VE", status: "Exitoso" },
];

const businessFraudStrategies = {
    "Controles Financieros y Contables": [
        "Segregación de Funciones: Dividir tareas para que ninguna persona maneje sola un ciclo financiero completo (autorización, pago, conciliación).",
        "Rotación de Personal: Rotar responsabilidades financieras periódicamente para desalentar esquemas a largo plazo.",
        "Conciliaciones Frecuentes: Realizar conciliaciones bancarias diarias o semanales para detectar transacciones no autorizadas rápidamente.",
        "Doble Firma/Aprobación: Exigir dos aprobaciones para pagos que superen un monto preestablecido.",
        "Auditorías Sorpresa: Realizar auditorías internas o recuentos de caja sin previo aviso."
    ],
    "Prevención de Fraude con Clientes": [
        "Autenticación Fuerte (MFA): Implementar autenticación multifactor para el acceso de clientes a sus cuentas.",
        "Análisis Transaccional con IA: Utilizar herramientas para detectar patrones de compra inusuales, cambios de dirección o uso de múltiples tarjetas desde la misma IP.",
        "Verificación de Identidad (KYC): Exigir y validar documentos de identidad para la aprobación de créditos.",
        "Capacitación en Punto de Venta: Entrenar al personal para reconocer tarjetas alteradas y seguir protocolos de verificación.",
        "Cámaras de Seguridad: Instalar cámaras de alta resolución en cajas y áreas de inventario."
    ],
    "Seguridad de Datos y Tecnología": [
        "Cifrado de Datos: Asegurar que toda la información sensible esté cifrada, tanto en reposo como en tránsito.",
        "Acceso Restringido: Limitar el acceso a información confidencial solo al personal estrictamente necesario.",
        "Actualización de Software: Mantener todos los sistemas y firewalls actualizados.",
        "Backups Seguros: Realizar copias de seguridad de datos críticos y guardarlas en una ubicación separada."
    ],
    "Cultura de Prevención y Ética": [
        "Política Clara de Fraude: Comunicar una política de tolerancia cero hacia el fraude y sus consecuencias.",
        "Línea de Denuncia Anónima: Establecer un canal confidencial para que los empleados reporten actividades sospechosas.",
        "Capacitación Anti-Phishing: Entrenar al personal para reconocer correos, llamadas y mensajes fraudulentos."
    ]
};

const personalFraudStrategies = {
    "Protección de Información y Dispositivos": [
        "Usa contraseñas robustas y únicas para cada cuenta.",
        "Activa siempre el Doble Factor de Autenticación (2FA/MFA).",
        "Opera a través de la aplicación oficial de tu banco en lugar del navegador.",
        "Mantén tu sistema operativo y antivirus actualizados.",
        "Evita hacer transacciones financieras en redes Wi-Fi públicas.",
        "Destruye documentos bancarios físicos que ya no necesites."
    ],
    "Detección de Estafas Digitales (Phishing)": [
        "No hagas clic en enlaces de correos o SMS sospechosos.",
        "Desconfía de llamadas que te presionen. Tu banco nunca te pedirá claves completas.",
        "Nunca compartas códigos de verificación (OTP) que recibas.",
        "Desconfía de ofertas de dinero fácil o premios que requieran tus datos bancarios.",
        "Denuncia inmediatamente cualquier intento de fraude a tu banco."
    ],
    "Estrategias de Uso y Pago": [
        "Monitorea tus cuentas y tarjetas con frecuencia.",
        "Utiliza cuentas con saldo limitado para tus gastos diarios.",
        "Considera usar tarjetas prepagadas o virtuales para compras en línea.",
        "Verifica que los sitios web de compra sean seguros (https:// y candado verde)."
    ]
};


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
            Seguridad y Prevención de Fraude
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona la seguridad de tu cuenta y aprende a proteger tu negocio y tus finanzas.
        </p>
      </header>

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
                <CardTitle>Guía de Prevención de Fraude</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="negocios">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="negocios">Seguridad para Negocios</TabsTrigger>
                        <TabsTrigger value="personal">Seguridad Personal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="negocios" className="pt-6">
                         <Accordion type="single" collapsible className="w-full">
                            {Object.entries(businessFraudStrategies).map(([title, strategies]) => (
                                <AccordionItem value={title} key={title}>
                                    <AccordionTrigger>{title}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-6 list-disc text-muted-foreground">
                                            {strategies.map((strategy, index) => <li key={index}>{strategy}</li>)}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                    <TabsContent value="personal" className="pt-6">
                         <Accordion type="single" collapsible className="w-full">
                            {Object.entries(personalFraudStrategies).map(([title, strategies]) => (
                                <AccordionItem value={title} key={title}>
                                    <AccordionTrigger>{title}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-6 list-disc text-muted-foreground">
                                            {strategies.map((strategy, index) => <li key={index}>{strategy}</li>)}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                </Tabs>
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
  );
}

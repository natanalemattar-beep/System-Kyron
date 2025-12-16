
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, KeyRound, Monitor, Smartphone, LogOut, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { businessFraudStrategies, personalFraudStrategies } from "@/lib/page-data";


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
    const { toast } = useToast();
    
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

       <Card>
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

        <Card>
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

         <Card>
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

         <Card>
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

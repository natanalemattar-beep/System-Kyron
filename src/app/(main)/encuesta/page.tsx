
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, HelpCircle, Send } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

const caracteristicas = [
    { id: "facturacion", label: "Facturación y Cuentas por Cobrar" },
    { id: "nomina", label: "Gestión de Nómina y RR.HH." },
    { id: "cumplimiento", label: "Cumplimiento Fiscal (SENIAT, IVA, ISLR)" },
    { id: "inventario", label: "Control de Inventario" },
    { id: "banco", label: "Conciliación Bancaria" },
    { id: "reportes", label: "Reportes y Análisis con IA" },
];

const emailProviders = [
    { id: "gmail", label: "Gmail" },
    { id: "hotmail", label: "Outlook / Hotmail" },
    { id: "yahoo", label: "Yahoo Mail" },
    { id: "otro", label: "Otro" },
];

export default function EncuestaPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Encuesta Enviada Exitosamente",
            description: "Gracias por tus comentarios. Un asesor se pondrá en contacto contigo a la brevedad.",
            action: <CheckCircle className="text-green-500" />
        });
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <HelpCircle className="h-8 w-8" />
                    Encuesta y Captación de Clientes
                </h1>
                <p className="text-muted-foreground mt-2">
                    Ayúdanos a mejorar. Completa esta breve encuesta y un asesor se pondrá en contacto contigo.
                </p>
            </header>

            <form onSubmit={handleSubmit}>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>1. Información de Contacto</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombres y Apellidos</Label>
                            <Input id="nombre" placeholder="Ej: Juan Pérez" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="empresa">Empresa</Label>
                            <Input id="empresa" placeholder="Ej: Empresa S.A." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" placeholder="juan.perez@empresa.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" type="tel" placeholder="0412-1234567" required />
                        </div>
                    </CardContent>

                    <CardHeader>
                        <CardTitle>2. Tu Interés en un Sistema de Gestión</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <RadioGroup defaultValue="evaluando">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="buscando" id="r1" />
                                <Label htmlFor="r1">Estoy buscando activamente una solución.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="evaluando" id="r2" />
                                <Label htmlFor="r2">Estoy evaluando opciones, pero no es urgente.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="investigando" id="r3" />
                                <Label htmlFor="r3">Solo estoy investigando por ahora.</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                    
                    <CardHeader>
                        <CardTitle>3. Proveedor de Correo Electrónico</CardTitle>
                        <CardDescription>Selecciona los proveedores de correo electrónico que utilizas.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {emailProviders.map((provider) => (
                                <div key={provider.id} className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-md">
                                    <Checkbox id={`provider-${provider.id}`} />
                                    <Label htmlFor={`provider-${provider.id}`} className="font-normal">{provider.label}</Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <CardHeader>
                        <CardTitle>4. Características Más Importantes</CardTitle>
                        <CardDescription>Selecciona las 3 características más valiosas para tu negocio.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {caracteristicas.map((caracteristica) => (
                                <div key={caracteristica.id} className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-md">
                                    <Checkbox id={caracteristica.id} />
                                    <Label htmlFor={caracteristica.id} className="font-normal">{caracteristica.label}</Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <CardHeader>
                        <CardTitle>5. Sugerencias y Comentarios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>En una escala del 1 al 10, ¿qué tan probable es que recomiendes System C.M.S. a un colega?</Label>
                            <Slider defaultValue={[8]} max={10} step={1} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sugerencias">¿Qué funcionalidad te gustaría ver en el futuro? ¿Tienes alguna otra sugerencia?</Label>
                            <Textarea id="sugerencias" placeholder="Ej: Me gustaría una integración con mi plataforma de e-commerce..." />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full text-lg h-12">
                            <Send className="mr-2"/>
                            Enviar Encuesta y Solicitar Contacto
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

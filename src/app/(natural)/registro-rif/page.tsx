
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File as FileEdit, UserPlus, Info, CircleCheck as CheckCircle, ArrowRight, Download, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recaudos = [
    "Copia de la Cédula de Identidad del menor (si posee).",
    "Copia de la Partida de Nacimiento del menor.",
    "Copia de la Cédula de Identidad del representante legal.",
    "Copia del RIF vigente del representante legal.",
    "Comprobante de domicilio (recibo de servicio público).",
];

export default function RegistroRifPage() {
    const { toast } = useToast();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center">
                <div className="inline-block p-3 bg-primary/10 text-primary rounded-full mb-4">
                    <FileEdit className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Registro RIF para Menores de Edad</h1>
                <p className="text-muted-foreground mt-2">Guía y gestión para la inscripción de cargas familiares ante el SENIAT.</p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-primary"/> ¿Por qué es necesario?</CardTitle>
                        <CardDescription>Beneficios y obligaciones del RIF para menores.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-4">
                        <p>Inscribir a tus hijos en el RIF te permite declararlos como carga familiar para la rebaja de impuestos en tu declaración de ISLR.</p>
                        <p>Es un requisito indispensable para trámites bancarios de menores, herencias, o para la adquisición de bienes a su nombre.</p>
                        <div className="p-3 bg-secondary/50 rounded-lg flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-xs">Este trámite es gratuito y debe realizarse ante la unidad de tributos internos de tu jurisdicción.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-primary"/> Recaudos Solicitados</CardTitle>
                        <CardDescription>Documentación necesaria para la inscripción presencial.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {recaudos.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => toast({ title: "Descargando Checklist", description: "Se ha guardado el listado de recaudos en tu dispositivo." })}>
                            <Download className="mr-2 h-4 w-4"/> Descargar Checklist
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-xl">Asistente de Pre-Inscripción</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Podemos ayudarte a completar la planilla digital del SENIAT automáticamente.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="secondary" className="w-full font-bold">
                        Iniciar Llenado Automático <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle, FileText, ArrowRight, Calculator } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const pasosProceso = [
    "Verificación de Documentos del Inmueble y las Partes.",
    "Redacción y firma del Documento de Opción a Compra-Venta.",
    "Declaración de la venta ante el SENIAT.",
    "Cálculo y pago de Impuestos Municipales.",
    "Otorgamiento y Registro del Documento Definitivo de Compra-Venta.",
];

const documentosVendedor = [
    "Copia de la Cédula de Identidad y RIF.",
    "Copia del Documento de Propiedad registrado.",
    "Solvencia de Impuestos sobre Inmuebles Urbanos (Derecho de Frente).",
    "Solvencia de servicios (Agua, Electricidad, Condominio).",
];

const documentosComprador = [
    "Copia de la Cédula de Identidad y RIF.",
    "Justificación de los medios de pago.",
];

export default function CompraVentaInmueblesPage() {
    const [montoVenta, setMontoVenta] = useState<number | "">("");
    const [costosEstimados, setCostosEstimados] = useState<{ registro: number, honorarios: number, total: number } | null>(null);
    const { toast } = useToast();

    const handleCalculate = () => {
        if (!montoVenta || montoVenta <= 0) {
            toast({ variant: 'destructive', title: 'Monto Inválido', description: 'Por favor, introduce un monto de venta válido.' });
            return;
        }
        const registro = Number(montoVenta) * 0.02; // Ejemplo 2%
        const honorarios = Number(montoVenta) * 0.03; // Ejemplo 3%
        setCostosEstimados({ registro, honorarios, total: registro + honorarios });
    };

    return (
        <div className="p-4 md:p-8 space-y-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Home className="h-8 w-8" />
                    Gestión de Compra y Venta de Inmuebles
                </h1>
                <p className="text-muted-foreground mt-2">
                    Guía y herramientas para gestionar transacciones inmobiliarias de forma segura y eficiente.
                </p>
            </header>

            <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Pasos del Proceso de Compra-Venta</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="space-y-4">
                                {pasosProceso.map((paso, index) => (
                                    <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">{index + 1}</div>
                                        <span>{paso}</span>
                                    </li>
                                ))}
                            </ol>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Checklist de Documentos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h4 className="font-semibold mb-2">Vendedor:</h4>
                            <div className="space-y-2 mb-4">
                                {documentosVendedor.map((doc, i) => (
                                    <div key={`ven-${i}`} className="flex items-center space-x-2">
                                        <Checkbox id={`ven-check-${i}`} />
                                        <Label htmlFor={`ven-check-${i}`} className="text-sm">{doc}</Label>
                                    </div>
                                ))}
                            </div>
                            <h4 className="font-semibold mb-2">Comprador:</h4>
                            <div className="space-y-2">
                                 {documentosComprador.map((doc, i) => (
                                    <div key={`com-${i}`} className="flex items-center space-x-2">
                                        <Checkbox id={`com-check-${i}`} />
                                        <Label htmlFor={`com-check-${i}`} className="text-sm">{doc}</Label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Calculator/> Simulador de Costos de Cierre</CardTitle>
                    <CardDescription>Estima los gastos de registro y honorarios asociados a la transacción.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full max-w-sm space-y-2">
                        <Label htmlFor="monto-venta">Monto de la Venta (Bs.)</Label>
                        <Input id="monto-venta" type="number" placeholder="Ej: 2500000" value={montoVenta} onChange={e => setMontoVenta(Number(e.target.value))} />
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                     <Button onClick={handleCalculate}>Calcular Costos Estimados</Button>
                     {costosEstimados && (
                        <div className="w-full max-w-md p-4 bg-secondary/50 rounded-lg space-y-2 animate-in fade-in">
                            <div className="flex justify-between"><span className="text-muted-foreground">Gastos de Registro (2% aprox.):</span> <span>{formatCurrency(costosEstimados.registro, 'Bs.')}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Honorarios Profesionales (3% aprox.):</span> <span>{formatCurrency(costosEstimados.honorarios, 'Bs.')}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span className="text-primary">Total Estimado de Gastos:</span> <span className="text-primary">{formatCurrency(costosEstimados.total, 'Bs.')}</span></div>
                        </div>
                     )}
                </CardFooter>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>Inicia tu Proceso con Asesoría Profesional</CardTitle>
                    <CardDescription>Nuestro equipo legal te guiará en cada paso para una transacción segura y sin contratiempos.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button>Contactar a un Asesor Inmobiliario <ArrowRight className="ml-2"/></Button>
                </CardFooter>
            </Card>
        </div>
    );
}
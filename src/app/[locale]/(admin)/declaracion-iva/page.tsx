
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calculator, CheckCircle, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function DeclaracionIvaPage() {
    const { toast } = useToast();

    const mockData = {
        periodo: "Julio 2024",
        ventasGravadas: 150000,
        ivaDebito: 24000,
        comprasGravadas: 80000,
        ivaCredito: 12800,
        totalAPagar: 11200,
    };

    const handleDeclarar = () => {
        toast({
            title: "Declaración Procesada",
            description: "La declaración de IVA ha sido enviada exitosamente al portal del SENIAT.",
            action: <CheckCircle className="text-green-500" />
        });
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="h-8 w-8 text-primary" />
                    Declaración de IVA
                </h1>
                <p className="text-muted-foreground mt-2">Gestión y liquidación del Impuesto al Valor Agregado.</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Resumen del Periodo: {mockData.periodo}</CardTitle>
                        <CardDescription>Cálculo automático basado en tus libros de compra y venta.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-secondary/20 rounded-xl">
                                <p className="text-xs font-bold uppercase opacity-60">Débito Fiscal (Ventas)</p>
                                <p className="text-2xl font-black">{formatCurrency(mockData.ivaDebito)}</p>
                            </div>
                            <div className="p-4 bg-secondary/20 rounded-xl">
                                <p className="text-xs font-bold uppercase opacity-60">Crédito Fiscal (Compras)</p>
                                <p className="text-2xl font-black">{formatCurrency(mockData.ivaCredito)}</p>
                            </div>
                        </div>
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-primary uppercase">Monto Total a Pagar</p>
                                <p className="text-4xl font-black text-primary">{formatCurrency(mockData.totalAPagar)}</p>
                            </div>
                            <Button size="lg" onClick={handleDeclarar} className="btn-3d-primary h-14 px-8">
                                <Calculator className="mr-2" /> REALIZAR DECLARACIÓN
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-yellow-500/10 border-yellow-500/20">
                        <CardHeader>
                            <CardTitle className="text-sm flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                Recordatorio Próximo Cierre
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-yellow-800">Tienes hasta el día 15 del próximo mes para declarar el periodo actual sin sanciones.</p>
                        </CardContent>
                    </Card>
                    <Button variant="outline" className="w-full h-12 rounded-xl">
                        <Download className="mr-2 h-4 w-4" /> Descargar TXT (SENIAT)
                    </Button>
                </div>
            </div>
        </div>
    );
}

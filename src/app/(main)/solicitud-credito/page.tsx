
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, FileText, CheckCircle, TrendingUp, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const checklist = [
    { id: "doc-constitutiva", label: "Acta Constitutiva y Modificaciones", completado: true },
    { id: "doc-rif", label: "Registro de Información Fiscal (RIF) vigente", completado: true },
    { id: "doc-financieros", label: "Estados Financieros (últimos 3 años)", completado: true },
    { id: "doc-flujo-caja", label: "Proyección de Flujo de Caja (12 meses)", completado: false },
    { id: "doc-referencias", label: "Referencias Bancarias y Comerciales", completado: true },
    { id: "doc-solvencia", label: "Solvencia de IVSS y FAOV", completado: false },
];

const analisisFinanciero = {
    liquidezCorriente: 2.5,
    endeudamiento: 0.4,
    rentabilidadNeta: 0.18,
};

export default function SolicitudCreditoPage() {
  const completado = checklist.filter(item => item.completado).length;
  const total = checklist.length;
  const progreso = (completado / total) * 100;

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Análisis para Solicitud de Crédito
        </h1>
        <p className="text-muted-foreground mt-2">
          Prepara y organiza la información necesaria para tus solicitudes de crédito bancario.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Checklist de Documentos Requeridos</CardTitle>
                    <CardDescription>
                        Asegúrate de tener toda la documentación lista. El sistema marca automáticamente los documentos que ya gestionas en la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {checklist.map(item => (
                            <div key={item.id} className="flex items-center space-x-3 p-3 rounded-md bg-secondary/50">
                                <Checkbox id={item.id} checked={item.completado} />
                                <Label htmlFor={item.id} className={`flex-grow ${item.completado ? 'text-muted-foreground line-through' : ''}`}>
                                    {item.label}
                                </Label>
                                {item.completado && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
                 <CardFooter>
                    <p className="text-sm text-muted-foreground">Progreso: {completado} de {total} documentos listos.</p>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Análisis Financiero Rápido</CardTitle>
                    <CardDescription>Indicadores clave basados en tus estados financieros.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Liquidez Corriente:</span>
                        <span className={`font-bold ${analisisFinanciero.liquidezCorriente > 2 ? 'text-green-500' : 'text-orange-500'}`}>{analisisFinanciero.liquidezCorriente}:1</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Nivel de Endeudamiento:</span>
                        <span className={`font-bold ${analisisFinanciero.endeudamiento < 0.5 ? 'text-green-500' : 'text-orange-500'}`}>{Math.round(analisisFinanciero.endeudamiento * 100)}%</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Rentabilidad Neta:</span>
                        <span className="font-bold text-green-500">{Math.round(analisisFinanciero.rentabilidadNeta * 100)}%</span>
                    </div>
                </CardContent>
            </Card>
             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Generar Carpeta</CardTitle>
                    <CardDescription>Descarga todos los documentos listos en un único archivo ZIP.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <Button className="w-full" disabled={progreso < 100}>
                        <Download className="mr-2"/>
                        Descargar Carpeta de Crédito
                    </Button>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    
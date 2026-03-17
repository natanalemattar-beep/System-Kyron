
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, CircleCheck as CheckCircle, Download, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const completado = checklist.filter(item => item.completado).length;
  const total = checklist.length;
  const progreso = (completado / total) * 100;

  const handleDownloadFolder = () => {
    const content = `CARPETA DE CRÉDITO - SYSTEM KYRON\n` +
                    `FECHA: ${new Date().toLocaleDateString()}\n\n` +
                    `CHECKLIST DE DOCUMENTACIÓN:\n` +
                    checklist.map(item => `[${item.completado ? 'X' : ' '}] ${item.label}`).join('\n') +
                    `\n\nINDICADORES FINANCIEROS:\n` +
                    `- Liquidez Corriente: ${analisisFinanciero.liquidezCorriente}:1\n` +
                    `- Endeudamiento: ${analisisFinanciero.endeudamiento * 100}%\n` +
                    `- Rentabilidad: ${analisisFinanciero.rentabilidadNeta * 100}%`;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Carpeta_Credito_Kyron.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
        title: "Carpeta Generada",
        description: "Se ha descargado el resumen de tu documentación para solicitud de crédito.",
        action: <ShieldCheck className="text-green-500 h-4 w-4" />
    });
  };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-primary" />
            Análisis para Solicitud de Crédito
        </h1>
        <p className="text-muted-foreground mt-2">
          Prepara y organiza la documentación financiera necesaria para tus solicitudes de crédito bancario.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Checklist de Documentos Requeridos</CardTitle>
                    <CardDescription>
                        Asegúrate de tener toda la documentación lista. El sistema marca automáticamente los documentos gestionados en la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {checklist.map(item => (
                            <div key={item.id} className="flex items-center space-x-3 p-4 rounded-xl border bg-background/50">
                                <Checkbox id={item.id} checked={item.completado} readOnly />
                                <Label htmlFor={item.id} className={`flex-grow ${item.completado ? 'text-muted-foreground line-through' : ''}`}>
                                    {item.label}
                                </Label>
                                {item.completado && <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
                 <CardFooter className="bg-secondary/20 p-4">
                    <p className="text-sm font-medium">Progreso de la Carpeta: {completado} de {total} documentos listos ({Math.round(progreso)}%).</p>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Indicadores Clave</CardTitle>
                    <CardDescription>Métricas de salud financiera analizadas por IA.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-background border">
                        <span className="text-sm text-muted-foreground font-medium">Liquidez:</span>
                        <span className="font-bold text-green-500">{analisisFinanciero.liquidezCorriente}:1</span>
                    </div>
                     <div className="flex justify-between items-center p-3 rounded-lg bg-background border">
                        <span className="text-sm text-muted-foreground font-medium">Endeudamiento:</span>
                        <span className="font-bold text-green-500">{Math.round(analisisFinanciero.endeudamiento * 100)}%</span>
                    </div>
                     <div className="flex justify-between items-center p-3 rounded-lg bg-background border">
                        <span className="text-sm text-muted-foreground font-medium">Rentabilidad:</span>
                        <span className="font-bold text-green-500">{Math.round(analisisFinanciero.rentabilidadNeta * 100)}%</span>
                    </div>
                </CardContent>
            </Card>
             <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle>Generar Carpeta Digital</CardTitle>
                    <CardDescription>Compila todos los documentos listos en un único archivo para su envío.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <Button className="w-full h-12 rounded-xl font-bold shadow-lg" onClick={handleDownloadFolder}>
                        <Download className="mr-2 h-5 w-5"/>
                        Descargar Carpeta de Crédito
                    </Button>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

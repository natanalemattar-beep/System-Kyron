
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, CheckCircle, Cpu, SlidersHorizontal, GitBranch, Bell } from "lucide-react";

const ZeroRiskProtection = () => (
    <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-primary"/>Sistema de Protección de Cero Riesgo</CardTitle>
            <CardDescription>Capas de protección redundantes que garantizan un cumplimiento fiscal del 100%.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold">Triple Validación de Declaraciones</h4>
                <p className="text-sm text-muted-foreground">Cada declaración es verificada por tres motores independientes (IA, contable y fiscal) antes de ser enviada, eliminando errores humanos y de sistema.</p>
            </div>
             <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold">Blockchain de Evidencias Fiscales</h4>
                <p className="text-sm text-muted-foreground">Cada factura, retención y libro contable se registra en una cadena de bloques privada, creando un rastro de auditoría inmutable y verificable en tiempo real.</p>
            </div>
        </CardContent>
    </Card>
);

const QuantumVerification = () => (
     <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-green-500"/>Verificación Cuántica y Auditoría Continua</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Nuestro sistema no espera a fin de mes. La auditoría es constante y utiliza tecnologías de vanguardia para garantizar la integridad absoluta de los datos.</p>
             <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>Auditoría en Tiempo Real:</strong> El sistema monitorea cada transacción 24/7, detectando y corrigiendo cualquier anomalía al instante.</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>Simulación Cuántica:</strong> Simulamos millones de escenarios fiscales para asegurar que el sistema esté preparado para cualquier eventualidad, garantizando una confianza del 99.999%.</span>
                </li>
            </ul>
        </CardContent>
    </Card>
);

const AIPredictiveShield = () => (
     <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Cpu className="h-6 w-6 text-primary"/>Escudo Predictivo con IA</CardTitle>
            <CardDescription>Nos anticipamos a los problemas antes de que ocurran.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">Nuestra IA no solo reacciona, sino que predice. Monitorea cambios en gacetas oficiales y jurisprudencia para adaptar el sistema antes de que las nuevas normativas entren en vigor.</p>
             <Button variant="outline" className="w-full">
                <Bell className="mr-2"/>
                Ver Alertas Proactivas
            </Button>
        </CardContent>
    </Card>
);

export default function ZeroRiskPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Shield className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Cero Riesgo Fiscal Absoluto</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Un sistema de defensa integral certificado, con garantías matemáticas y seguros multimillonarios, diseñado para ofrecer una tranquilidad fiscal sin precedentes.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <ZeroRiskProtection />
        <div className="space-y-8">
            <QuantumVerification />
            <AIPredictiveShield />
        </div>
      </div>
    </div>
  );
}

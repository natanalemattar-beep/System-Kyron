
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, FileWarning, ArrowRight, BookLock, Banknote, Laptop } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


const areasCriticas = [
    {
        icon: Banknote,
        titulo: "Legitimación de Capitales y FT",
        descripcion: "Implementar políticas para prevenir el lavado de dinero y el financiamiento al terrorismo.",
    },
    {
        icon: BookLock,
        titulo: "Corrupción y Soborno",
        descripcion: "Establecer canales de denuncia y códigos de ética para prevenir actos de corrupción.",
    },
    {
        icon: Laptop,
        titulo: "Ciberdelincuencia y Protección de Datos",
        descripcion: "Asegurar la protección de los datos de la empresa y de los clientes contra ataques informáticos.",
    },
];

export default function CumplimientoPage() {

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldAlert className="h-8 w-8" />
            Cumplimiento Normativo y Prevención de Sanciones
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre la Ley de Responsabilidad Penal de las Personas Jurídicas.
        </p>
      </header>

       <Alert variant="destructive" className="mb-8">
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Alerta de Incumplimiento Potencial</AlertTitle>
            <AlertDescription>
                <p>Nuestro sistema ha detectado la **Ausencia de un Oficial de Cumplimiento** designado formalmente. Este es un requisito clave para la prevención de sanciones bajo la ley. Le recomendamos tomar acción inmediata.</p>
                 <Button variant="outline" size="sm" className="mt-4 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
                    Designar Oficial Ahora
                </Button>
            </AlertDescription>
        </Alert>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Áreas Críticas de Cumplimiento</CardTitle>
          <CardDescription>
            La ley exige que las empresas implementen modelos de prevención en las siguientes áreas para evitar sanciones penales.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areasCriticas.map(item => (
                 <Card key={item.titulo} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-3">
                           <item.icon className="h-6 w-6 text-primary" />
                           <span>{item.titulo}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.descripcion}</p>
                        <Button variant="outline" className="w-full">
                           Ver Guía de Cumplimiento
                           <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

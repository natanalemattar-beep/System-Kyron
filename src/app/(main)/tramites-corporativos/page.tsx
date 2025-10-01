

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, UserCog, CheckCircle, ArrowRight, TrendingDown } from "lucide-react";

const pasosSucursal = [
    "Registro de sucursal en SAREN (si es nacional).",
    "Estudio de viabilidad y legislación del país destino (si es internacional).",
    "Legalización y apostilla de documentos para uso en el extranjero.",
    "Obtención de identificaciones fiscales locales (nacionales o internacionales).",
    "Cumplimiento de normativas municipales y de inversión extranjera.",
];

const pasosPerdidaCapital = [
    "Convocar una Asamblea de Accionistas para tratar la pérdida.",
    "Decidir sobre la reintegración del capital, la reducción del mismo o la liquidación.",
    "Redactar y visar el Acta de Asamblea correspondiente a la decisión.",
    "Registrar el Acta de Asamblea en el registro mercantil (SAREN).",
];


export default function TramitesCorporativosPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <UserCog className="h-8 w-8" />
            Trámites Corporativos Especiales
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre procedimientos para cambios estructurales en la empresa.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
          {/* Apertura de Sucursal Internacional */}
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-primary"/>
                    <span>Apertura de Sucursal Internacional</span>
                </CardTitle>
                <CardDescription>Pasos clave para la apertura y gestión de sucursales fuera del país.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {pasosSucursal.map((paso, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{paso}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardContent>
                <Button variant="outline" className="w-full">
                    Iniciar Asesoría de Expansión <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>

        {/* Cambio de Residencia del Representante Legal */}
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <UserCog className="h-6 w-6 text-primary"/>
                    <span>Cambio de Residencia del Representante Legal</span>
                </CardTitle>
                <CardDescription>Procedimiento para actualizar la información de residencia fiscal y legal.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Este módulo guiará al usuario a través de la actualización de datos en el RIF, la modificación del Acta Constitutiva y la notificación a los entes correspondientes.
                </p>
            </CardContent>
             <CardContent>
                <Button variant="outline" className="w-full">
                    Iniciar Trámite de Actualización <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>
        
        {/* Aviso de Pérdida de Capital */}
        <Card className="lg:col-span-2 bg-destructive/10 border-destructive/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <TrendingDown className="h-6 w-6 text-destructive"/>
                    <span>Aviso de Pérdida de Capital</span>
                </CardTitle>
                <CardDescription>Procedimiento a seguir cuando las pérdidas acumuladas reducen el capital social por debajo del 50%.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {pasosPerdidaCapital.map((paso, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{paso}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardContent className="flex flex-col sm:flex-row gap-2">
                 <Button variant="outline" className="w-full">Convocar Asamblea</Button>
                 <Button variant="destructive" className="w-full">Iniciar Trámite en SAREN</Button>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}

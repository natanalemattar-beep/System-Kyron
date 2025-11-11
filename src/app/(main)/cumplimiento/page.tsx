
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Target, TrendingUp, Zap, AlertTriangle, Lightbulb, Users, BarChart, ShoppingCart, DollarSign, CheckCircle, Award, ArrowRight, FileWarning, BookLock, Banknote, Laptop, Landmark, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


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

const fiscalizaciones = [
    {
        icon: Landmark,
        titulo: "Fiscalización del SENIAT",
        descripcion: "Revisión del cumplimiento de deberes formales (IVA, ISLR) y sustanciales (pago de impuestos). El sistema te ayuda a tener listos libros de compra/venta, declaraciones y facturas.",
    },
    {
        icon: Building,
        titulo: "Fiscalización Municipal (Alcaldía)",
        descripcion: "Verificación del pago del Impuesto a las Actividades Económicas y el cumplimiento de deberes como la tenencia de la Licencia de Actividades Económicas.",
    }
]

export default function CumplimientoPage() {

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-8 w-8" />
            Cumplimiento Normativo y Prevención de Sanciones
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre la Ley de Responsabilidad Penal de las Personas Jurídicas y procesos de fiscalización.
        </p>
      </header>

      <Alert variant="destructive" className="mb-8">
        <FileWarning className="h-4 w-4" />
        <AlertTitle>Omisión de Pago de Impuestos</AlertTitle>
        <AlertDescription>
          Se ha detectado una omisión en el pago de la declaración de IVA del período anterior.
          <Button size="sm" className="ml-4">Pagar Ahora</Button>
        </AlertDescription>
      </Alert>

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

      <Card className="mb-8 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Áreas Críticas de Cumplimiento (Ley de Responsabilidad Penal)</CardTitle>
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
      
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Procesos de Fiscalización</CardTitle>
          <CardDescription>
            Prepárate para las revisiones de los entes tributarios nacionales y municipales.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            {fiscalizaciones.map(item => (
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
                           Ver Guía de Fiscalización
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

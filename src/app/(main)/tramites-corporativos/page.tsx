
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, UserCog, CheckCircle, ArrowRight, TrendingDown, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


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

        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary"/>
                    <span>Facturación de Sucursales y Franquicias</span>
                </CardTitle>
                <CardDescription>Modelos contables para la gestión de ingresos en empresas con múltiples sedes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="sucursales">
                        <AccordionTrigger>Facturación de Sucursales</AccordionTrigger>
                        <AccordionContent>
                           <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                               <li><strong>Centralización de la Contabilidad:</strong> La forma más común es mantener los registros contables de las sucursales en la sede central.</li>
                               <li><strong>Mecanismo de Integración:</strong> Se utilizan cuentas como "Sucursal, Cuenta Corriente" en la casa matriz y "Casa Matriz, Cuenta Corriente" en la sucursal para controlar las transacciones.</li>
                               <li><strong>Consolidación de Información:</strong> La sucursal envía periódicamente sus cuentas a la oficina central para consolidar la información financiera y formar una visión completa de las operaciones.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="franquicias">
                        <AccordionTrigger>Facturación de Franquicias</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                               <li><strong>Principio de Reconocimiento de Ingresos:</strong> La facturación se rige por normativas (como la ASC 606) que exigen identificar el contrato, las obligaciones de desempeño y el precio de la transacción.</li>
                               <li><strong>Obligaciones de Desempeño:</strong> Se deben reconocer los servicios que el franquiciador proporciona (capacitación, marketing, etc.) como obligaciones de desempeño.</li>
                               <li><strong>Reconocimiento Gradual:</strong> Los ingresos no se reconocen de inmediato, sino que se asignan a medida que se cumplen las obligaciones, lo que requiere un seguimiento cuidadoso.</li>
                               <li><strong>Tarifas y Regalías:</strong> El franquiciado paga tarifas iniciales y regalías continuas, que se reconocen como ingresos a medida que se prestan los servicios asociados.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="moderna">
                        <AccordionTrigger>Gestión Moderna con BI y FP&A</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                               <li><strong>Plataforma Única:</strong> Con sistemas modernos de Business Intelligence (BI) y Financial Planning &amp; Analysis (FP&amp;A), toda la gestión se puede centralizar en una única plataforma, sin importar la ubicación del negocio.</li>
                               <li><strong>Integración de Datos:</strong> La plataforma se integra con ERP, CRM, HRIS y otras fuentes de datos para validar y actualizar automáticamente los asientos contables y centros de costes.</li>
                               <li><strong>Informes Automatizados:</strong> Se pueden crear y automatizar diferentes conjuntos de estados financieros (Estado de Resultados, Balance General, Flujo de Caja) para cada sucursal o de forma consolidada, ahorrando días de trabajo.</li>
                               <li><strong>Gestión de Transacciones Complejas:</strong> Se gestionan automáticamente las transacciones interempresariales, la conversión de divisas para sucursales internacionales y el cumplimiento de diferentes normativas contables (como los PCGA).</li>
                               <li><strong>Soporte a la Toma de Decisiones Locales:</strong> Permite crear presupuestos y pronósticos específicos para cada sucursal, analizar costos fijos y variables, gestionar inventarios y adaptar estrategias de precios a las condiciones del mercado local, fomentando la autonomía y la rentabilidad.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}

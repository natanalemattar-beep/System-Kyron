"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, ArrowRight, BookOpen, CheckCircle, Clock, FileWarning, SlidersHorizontal, XCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const riesgos = [
    {
        riesgo: "Errores Humanos en Facturación",
        descripcion: "Cálculos incorrectos del IVA, errores en el RIF del cliente o en los totales pueden llevar a disputas y notas de crédito/débito.",
        impacto: "Medio"
    },
    {
        riesgo: "Sanciones del SENIAT",
        descripcion: "No cumplir con las providencias sobre facturación (uso de sistemas no homologados, falta de correlativos) puede resultar en multas y cierres.",
        impacto: "Alto"
    },
    {
        riesgo: "Pérdida de Tiempo y Productividad",
        descripcion: "El personal invierte horas en tareas manuales de transcripción y conciliación en lugar de actividades que generan valor.",
        impacto: "Alto"
    },
    {
        riesgo: "Falta de Visibilidad Financiera",
        descripcion: "Es difícil tener una visión en tiempo real del flujo de caja, las cuentas por cobrar o el rendimiento del inventario.",
        impacto: "Medio"
    }
];

const comparativa = [
    {
        aspecto: "Proceso de Facturación",
        antes: "Manual, propenso a errores, consume tiempo.",
        despues: "100% automatizado, con cálculos de impuestos y correlativos garantizados."
    },
    {
        aspecto: "Cumplimiento Fiscal",
        antes: "Depende del conocimiento del contador y es difícil de auditar.",
        despues: "Asegurado por un sistema homologado por el SENIAT."
    },
    {
        aspecto: "Gestión de Inventario",
        antes: "Desconectado de las ventas, requiere ajustes manuales.",
        despues: "Se actualiza en tiempo real con cada venta del TPV."
    },
    {
        aspecto: "Acceso a la Información",
        antes: "Limitado a la oficina y a hojas de cálculo locales.",
        despues: "Acceso 24/7 desde cualquier lugar a través de la nube."
    },
];

export default function AnalisisEmpresasNoDigitalesPage() {

    return (
        <div className="space-y-12">
            <header className="mb-8 text-center">
                 <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <SlidersHorizontal className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Análisis de Empresas No Digitalizadas</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Diagnóstico de los riesgos y costos ocultos de operar con métodos tradicionales y cómo System C.M.S. ofrece la solución.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>El Escenario Común: Operación Manual</CardTitle>
                    <CardDescription>
                        Muchas empresas y cooperativas en Venezuela aún dependen de hojas de cálculo, factureros manuales y procesos desconectados para su gestión.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3">Riesgo Asociado</TableHead>
                                    <TableHead>Descripción del Problema</TableHead>
                                    <TableHead>Impacto en el Negocio</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {riesgos.map(riesgo => (
                                    <TableRow key={riesgo.riesgo}>
                                        <TableCell className="font-semibold flex items-center gap-2"><XCircle className="h-5 w-5 text-destructive"/> {riesgo.riesgo}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{riesgo.descripcion}</TableCell>
                                        <TableCell className="font-medium text-destructive">{riesgo.impacto}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            
            <Alert>
              <FileWarning className="h-4 w-4" />
              <AlertTitle>El Costo Real de "Ahorrar" en Tecnología</AlertTitle>
              <AlertDescription>
                Operar manualmente no es gratis. El costo real se mide en horas de personal perdidas, oportunidades de venta no concretadas por falta de inventario, y el riesgo latente de sanciones fiscales que pueden superar con creces el costo de un sistema moderno.
              </AlertDescription>
            </Alert>


            <Card className="bg-gradient-to-r from-primary/80 to-cyan-500/80 text-primary-foreground">
                <CardHeader>
                    <CardTitle>La Solución: System C.M.S.</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Un ecosistema integrado que reemplaza el caos manual con orden y automatización.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow className="border-b-white/20">
                                <TableHead className="w-1/4 text-white">Aspecto</TableHead>
                                <TableHead className="w-2/5 text-white">Antes (Sin Sistema)</TableHead>
                                <TableHead className="w-2/5 text-white">Después (Con System C.M.S.)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comparativa.map(item => (
                                <TableRow key={item.aspecto} className="border-b-white/20">
                                    <TableCell className="font-semibold">{item.aspecto}</TableCell>
                                    <TableCell className="text-primary-foreground/80">{item.antes}</TableCell>
                                    <TableCell className="font-medium flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 shrink-0"/> 
                                        <span>{item.despues}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                     <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80" asChild>
                        <Link href="/planes-y-precios">
                            Ver Planes y Precios <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}

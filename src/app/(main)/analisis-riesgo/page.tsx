
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldQuestion, TrendingDown, Building, ShieldCheck, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const riesgosIdentificados = [
    { id: "R001", area: "Operacional", descripcion: "Falla en la cadena de suministro por dependencia de un solo proveedor.", impacto: "Alto", probabilidad: "Media", puntuacion: 8, estado: "Mitigación en progreso" },
    { id: "R002", area: "Financiero", descripcion: "Fluctuaciones en la tasa de cambio afectando costos de importación.", impacto: "Alto", probabilidad: "Alta", puntuacion: 9, estado: "Monitoreo activo" },
    { id: "R003", area: "Mercado", descripcion: "Entrada de un nuevo competidor con precios agresivos.", impacto: "Medio", probabilidad: "Media", puntuacion: 6, estado: "Plan de acción definido" },
    { id: "R004", area: "Legal", descripcion: "Cambios en la normativa de importación de materia prima.", impacto: "Alto", probabilidad: "Baja", puntuacion: 5, estado: "Monitoreo activo" },
];

const getImpactVariant = (impacto: string) => {
    switch (impacto) {
        case "Alto": return "destructive";
        case "Medio": return "secondary";
        default: return "outline";
    }
}
const getProbabilidadVariant = (prob: string) => {
    switch (prob) {
        case "Alta": return "destructive";
        case "Media": return "secondary";
        default: return "outline";
    }
}

export default function AnalisisRiesgoPage() {
    const riesgoGeneral = 7.5;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldQuestion className="h-8 w-8" />
            Análisis de Riesgo
        </h1>
        <p className="text-muted-foreground mt-2">
          Identifica, evalúa y mitiga los riesgos potenciales para tu negocio.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-1 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Nivel de Riesgo General</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <div className="relative">
                    <p className="text-6xl font-bold text-orange-400">{riesgoGeneral}</p>
                    <p className="text-muted-foreground">sobre 10</p>
                </div>
                <Progress value={riesgoGeneral * 10} className="mt-4" />
                <p className="text-sm mt-2 font-medium text-orange-400">Riesgo Moderado-Alto</p>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Planes de Mitigación</CardTitle>
                <CardDescription>Resumen de las acciones clave para reducir el riesgo.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                 <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Diversificación de Proveedores</AlertTitle>
                    <AlertDescription>
                       Se ha iniciado la negociación con dos proveedores alternativos para reducir la dependencia. Progreso: 40%.
                       <Button size="sm" variant="link" className="p-0 h-auto ml-2">Ver plan</Button>
                    </AlertDescription>
                </Alert>
                 <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Estrategia de Precios Competitiva</AlertTitle>
                    <AlertDescription>
                        Plan de marketing y ajuste de precios listo para ser implementado ante la entrada de nuevos competidores.
                        <Button size="sm" variant="link" className="p-0 h-auto ml-2">Ver estrategia</Button>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Matriz de Riesgos Identificados</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Área</TableHead>
                        <TableHead>Descripción del Riesgo</TableHead>
                        <TableHead>Impacto</TableHead>
                        <TableHead>Probabilidad</TableHead>
                        <TableHead className="text-center">Puntuación</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {riesgosIdentificados.map((riesgo) => (
                        <TableRow key={riesgo.id}>
                            <TableCell className="font-medium">{riesgo.area}</TableCell>
                            <TableCell>{riesgo.descripcion}</TableCell>
                            <TableCell><Badge variant={getImpactVariant(riesgo.impacto)}>{riesgo.impacto}</Badge></TableCell>
                            <TableCell><Badge variant={getProbabilidadVariant(riesgo.probabilidad) as any}>{riesgo.probabilidad}</Badge></TableCell>
                            <TableCell className="text-center font-bold">{riesgo.puntuacion}</TableCell>
                            <TableCell>{riesgo.estado}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}

    
    
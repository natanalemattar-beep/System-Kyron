
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, DollarSign, Users, BookOpen, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const modulosAplicados = [
    {
        icon: DollarSign,
        modulo: "Cuentas por Cobrar y Facturación",
        aplicacion: "Gestión de matrículas, mensualidades, transporte y otros cobros a estudiantes. Emisión de facturas y control de morosidad por familia o estudiante."
    },
    {
        icon: Users,
        modulo: "Gestión de Nómina (RR.HH.)",
        aplicacion: "Cálculo de sueldos y salarios para personal docente, administrativo y obrero, incluyendo beneficios como cesta ticket, y deducciones (IVSS, FAOV)."
    },
     {
        icon: BookOpen,
        modulo: "Cuentas por Pagar e Inventario",
        aplicacion: "Registro y control de pagos a proveedores de servicios (mantenimiento, seguridad) y material educativo. Gestión de stock de libros y uniformes."
    },
     {
        icon: BarChart3,
        modulo: "Presupuesto y Centros de Costo",
        aplicacion: "Asignación y seguimiento de presupuestos por departamentos (Ej: Primaria, Bachillerato, Deportes, Cultura) para analizar la rentabilidad de cada área."
    }
];

export default function ContabilidadEscuelasPage() {
  return (
    <div className="space-y-12">
       <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <School className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Contabilidad para Instituciones Educativas</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Cómo adaptar System C.M.S. para la gestión financiera integral de colegios, liceos y universidades.
        </p>
      </header>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Adaptando la Contabilidad General al Sector Educativo</CardTitle>
            <CardDescription>
                La contabilidad de una institución educativa tiene particularidades que nuestro sistema puede gestionar eficientemente. A continuación, se detalla cómo aplicar nuestros módulos a las necesidades de una escuela.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            {modulosAplicados.map(item => (
                <div key={item.modulo} className="p-6 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-4 mb-3">
                        <item.icon className="h-8 w-8 text-primary"/>
                        <h3 className="font-semibold text-lg">{item.modulo}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.aplicacion}</p>
                </div>
            ))}
        </CardContent>
       </Card>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Ejemplo de Centro de Costo: "Bachillerato"</CardTitle>
            <CardDescription>
                Analiza la rentabilidad de un departamento específico.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Concepto</TableHead>
                        <TableHead className="text-right">Monto (Bs.)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="bg-green-500/10">
                        <TableCell className="font-semibold">Ingresos por Mensualidades (Bachillerato)</TableCell>
                        <TableCell className="text-right font-semibold">500,000</TableCell>
                    </TableRow>
                     <TableRow className="bg-red-500/10">
                        <TableCell className="pl-8 font-semibold">Gastos Directos (Costos)</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="bg-red-500/10">
                        <TableCell className="pl-12 text-muted-foreground">Nómina Docentes de Bachillerato</TableCell>
                        <TableCell className="text-right">(-250,000)</TableCell>
                    </TableRow>
                     <TableRow className="bg-red-500/10">
                        <TableCell className="pl-12 text-muted-foreground">Material de Laboratorios</TableCell>
                        <TableCell className="text-right">(-50,000)</TableCell>
                    </TableRow>
                     <TableRow className="bg-secondary">
                        <TableCell className="pl-8 font-semibold">Utilidad Bruta del Departamento</TableCell>
                        <TableCell className="text-right font-bold">200,000</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">
                Este tipo de reporte permite a la dirección tomar decisiones informadas, como ajustar mensualidades, optimizar costos o invertir en las áreas más rentables.
            </p>
        </CardFooter>
       </Card>
       
       <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle>¿Listo para Modernizar la Gestión de tu Institución?</CardTitle>
            <CardDescription>
                Descubre cómo System C.M.S. puede aportar transparencia, eficiencia y cumplimiento a tu institución educativa.
            </CardDescription>
        </CardHeader>
        <CardFooter>
             <Button asChild>
                <Link href="/planes-y-precios">
                    Ver Planes y Precios <ArrowRight className="ml-2"/>
                </Link>
            </Button>
        </CardFooter>
       </Card>

    </div>
  );
}


"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, PlusCircle, ArrowRight, Landmark, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const kpiData = [
  { title: "Total Activos", value: formatCurrency(945000, 'Bs.'), icon: Landmark },
  { title: "Total Pasivos", value: formatCurrency(225000, 'Bs.'), icon: Landmark },
  { title: "Patrimonio Neto", value: formatCurrency(720000, 'Bs.'), icon: Landmark },
];

const quickActions = [
    { title: "Registrar Asiento Diario", href: "/libros-contables", icon: PlusCircle },
    { title: "Ver Libro Mayor", href: "/libros-contables", icon: BookOpen },
    { title: "Plan de Cuentas", href: "/clasificacion-cuentas-contables", icon: Scale },
];

const balanceSummary = {
    activos: [
        { cuenta: "Activo Corriente", monto: 345000 },
        { cuenta: "Activo No Corriente", monto: 600000 },
    ],
    pasivosPatrimonio: [
        { cuenta: "Pasivo Corriente", monto: 125000 },
        { cuenta: "Pasivo No Corriente", monto: 100000 },
        { cuenta: "Patrimonio", monto: 720000 },
    ],
    totalActivos: 945000,
    totalPasivosPatrimonio: 945000,
}


export default function ContabilidadPage() {
  return (
    <div className="space-y-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Centro de Contabilidad
        </h1>
        <p className="text-muted-foreground mt-2">
          Dashboard central para la gestión de libros, asientos y reportes contables.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map(kpi => (
            <Card key={kpi.title} className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Resumen del Balance General</CardTitle>
                    <CardDescription>Vista consolidada de la situación financiera de la empresa.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cuenta</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="font-semibold bg-secondary/30"><TableCell>Activos</TableCell><TableCell></TableCell></TableRow>
                            {balanceSummary.activos.map(item => (
                                <TableRow key={item.cuenta}><TableCell className="pl-8">{item.cuenta}</TableCell><TableCell className="text-right">{formatCurrency(item.monto, 'Bs.')}</TableCell></TableRow>
                            ))}
                             <TableRow className="font-bold border-t"><TableCell>Total Activos</TableCell><TableCell className="text-right">{formatCurrency(balanceSummary.totalActivos, 'Bs.')}</TableCell></TableRow>

                            <TableRow className="font-semibold bg-secondary/30"><TableCell>Pasivos y Patrimonio</TableCell><TableCell></TableCell></TableRow>
                             {balanceSummary.pasivosPatrimonio.map(item => (
                                <TableRow key={item.cuenta}><TableCell className="pl-8">{item.cuenta}</TableCell><TableCell className="text-right">{formatCurrency(item.monto, 'Bs.')}</TableCell></TableRow>
                            ))}
                             <TableRow className="font-bold border-t"><TableCell>Total Pasivos y Patrimonio</TableCell><TableCell className="text-right">{formatCurrency(balanceSummary.totalPasivosPatrimonio, 'Bs.')}</TableCell></TableRow>

                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="outline">
                        <Link href="/reports">Ver Estados Financieros Detallados <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardFooter>
            </Card>
         </div>
          <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {quickActions.map(action => (
                         <Button asChild key={action.title} className="w-full justify-start">
                            <Link href={action.href}>
                                <action.icon className="mr-2 h-4 w-4"/>
                                {action.title}
                            </Link>
                        </Button>
                    ))}
                </CardContent>
              </Card>
          </div>
       </div>

    </div>
  );
}

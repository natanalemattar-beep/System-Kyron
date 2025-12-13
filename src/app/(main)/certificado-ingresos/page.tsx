
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, Download, Printer, User } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

const empleados = [
    { id: 1, nombre: "Ana Pérez", cedula: "V-12.345.678" },
    { id: 2, nombre: "Luis Gómez", cedula: "V-18.765.432" },
    { id: 3, nombre: "María Rodriguez", cedula: "V-20.111.222" },
];

const ingresosEmpleado = {
    1: [ // Ana Pérez
        { mes: "Enero 2024", salario: 12000, bonos: 2000, total: 14000 },
        { mes: "Febrero 2024", salario: 12000, bonos: 2100, total: 14100 },
        { mes: "Marzo 2024", salario: 12500, bonos: 1800, total: 14300 },
        { mes: "Abril 2024", salario: 12500, bonos: 2200, total: 14700 },
        { mes: "Mayo 2024", salario: 12500, bonos: 2000, total: 14500 },
        { mes: "Junio 2024", salario: 12500, bonos: 2300, total: 14800 },
    ],
    2: [ // Luis Gómez
        { mes: "Enero 2024", salario: 10500, bonos: 1500, total: 12000 },
        { mes: "Febrero 2024", salario: 10500, bonos: 1600, total: 12100 },
        { mes: "Marzo 2024", salario: 11000, bonos: 1400, total: 12400 },
        // ... more data
    ],
     3: [ // María Rodriguez
        { mes: "Enero 2024", salario: 9000, bonos: 1000, total: 10000 },
        { mes: "Febrero 2024", salario: 9000, bonos: 1200, total: 10200 },
        { mes: "Marzo 2024", salario: 9500, bonos: 1100, total: 10600 },
        // ... more data
    ],
};

const contador = {
    nombre: "Lic. Carlos Martínez",
    cpc: "123.456",
};

export default function CertificadoIngresosPage() {
    const { toast } = useToast();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

    const handleAction = (action: string) => {
        if (!selectedEmployeeId) {
            toast({
                variant: "destructive",
                title: "Seleccione un empleado",
                description: "Debe seleccionar un empleado para generar el certificado.",
            });
            return;
        }
        window.print();
        toast({
            title: `Certificado ${action}`,
            description: `El certificado de ingresos ha sido ${action === 'impreso' ? 'enviado a la impresora' : 'descargado como PDF'}.`,
        });
    };
    
    const selectedEmployee = empleados.find(e => e.id === Number(selectedEmployeeId));
    const ingresos = selectedEmployeeId ? ingresosEmpleado[selectedEmployeeId as keyof typeof ingresosEmpleado] || [] : [];
    const totalIngresos = ingresos.reduce((sum, item) => sum + item.total, 0);
    const promedioMensual = ingresos.length > 0 ? totalIngresos / ingresos.length : 0;

  return (
    <div className="p-4 md:p-8">
       <style>
            {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-content, #printable-content * {
                        visibility: visible;
                    }
                    #printable-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}
        </style>
      <header className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Banknote className="h-8 w-8" />
                Certificación de Ingresos
            </h1>
            <p className="text-muted-foreground mt-2">
              Genera una certificación de ingresos para un empleado, avalada por un contador público.
            </p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <div className="w-full md:w-64">
                 <Select onValueChange={setSelectedEmployeeId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Empleado..." />
                    </SelectTrigger>
                    <SelectContent>
                        {empleados.map(e => <SelectItem key={e.id} value={String(e.id)}>{e.nombre}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <Button variant="outline" onClick={() => handleAction('impreso')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
        </div>
      </header>

      <div id="printable-content">
        <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-xl print:shadow-none print:border-none print:bg-white dark:print:bg-black">
            <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl">CERTIFICACIÓN DE INGRESOS</CardTitle>
                <CardDescription>
                    (Elaborada de acuerdo con la Norma Internacional de Servicios Relacionados 4400, "Trabajos para realizar procedimientos previamente convenidos sobre información financiera")
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify space-y-6">
                <div>
                    <p className="font-semibold">Ciudad de Caracas, {formatDate(new Date())}</p>
                    <p className="font-semibold">A quien pueda interesar,</p>
                </div>
                <p>
                    Yo, <strong>{contador.nombre}</strong>, actuando en mi carácter de Contador Público Colegiado de la República Bolivariana de Venezuela, inscrito en el Colegio de Contadores Públicos del Distrito Capital bajo el N° <strong>{contador.cpc}</strong>, por medio de la presente certifico que he revisado los libros de contabilidad de la empresa <strong>Empresa, C.A.</strong> (RIF: J-12345678-9).
                </p>
                <p>
                    De acuerdo con la revisión de los registros contables y recibos de pago de nómina, se pudo constatar que el(la) ciudadano(a) <strong>{selectedEmployee?.nombre || "[Seleccione un empleado]"}</strong>, titular de la Cédula de Identidad <strong>{selectedEmployee?.cedula || "[N/A]"}</strong>, ha percibido durante los últimos seis (6) meses los ingresos que se detallan a continuación:
                </p>

                {selectedEmployeeId && ingresos.length > 0 ? (
                    <div className="not-prose">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mes</TableHead>
                                    <TableHead className="text-right">Salario Básico</TableHead>
                                    <TableHead className="text-right">Bonificaciones</TableHead>
                                    <TableHead className="text-right">Total Ingreso Mensual</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ingresos.map(item => (
                                    <TableRow key={item.mes}>
                                        <TableCell className="font-medium">{item.mes}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.salario, 'Bs.')}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.bonos, 'Bs.')}</TableCell>
                                        <TableCell className="text-right font-bold">{formatCurrency(item.total, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3} className="text-right font-bold text-lg">PROMEDIO MENSUAL DE INGRESOS:</TableCell>
                                    <TableCell className="text-right font-bold text-lg">{formatCurrency(promedioMensual, 'Bs.')}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                        <p>Seleccione un empleado para ver el detalle de sus ingresos.</p>
                    </div>
                )}
                
                <p>
                    La presente certificación se expide a solicitud de la parte interesada, para fines que estime convenientes.
                </p>

                <div className="pt-24 text-center">
                    <p className="border-t-2 border-foreground inline-block px-12 pt-2">{contador.nombre}</p>
                    <p className="font-semibold mt-1">Contador Público Colegiado</p>
                    <p className="text-xs">C.P.C. {contador.cpc}</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

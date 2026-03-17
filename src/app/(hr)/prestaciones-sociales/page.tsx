
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, CircleCheck as CheckCircle, Download, Printer } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { differenceInYears, differenceInDays } from 'date-fns';

const empleados = [
    { id: 1, nombre: "Pedro Martinez", cedula: "V-15.555.555", fechaIngreso: "2022-01-10", ultimoSalario: 950 },
    { id: 2, nombre: "Laura Fernandez", cedula: "V-17.777.777", fechaIngreso: "2021-03-05", ultimoSalario: 1100 },
];

export default function PrestacionesSocialesPage() {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [fechaEgreso, setFechaEgreso] = useState<string>("");
    const [calculo, setCalculo] = useState<any | null>(null);
    const { toast } = useToast();

    const selectedEmployee = useMemo(() => {
        return empleados.find(e => e.id === Number(selectedEmployeeId));
    }, [selectedEmployeeId]);

    const handleCalculate = () => {
        if (!selectedEmployee || !fechaEgreso) {
            toast({
                variant: "destructive",
                title: "Faltan datos",
                description: "Por favor, selecciona un empleado y la fecha de egreso."
            });
            return;
        }

        const fechaIngresoDate = new Date(selectedEmployee.fechaIngreso);
        const fechaEgresoDate = new Date(fechaEgreso);
        
        if (fechaEgresoDate <= fechaIngresoDate) {
            toast({
                variant: "destructive",
                title: "Error en Fechas",
                description: "La fecha de egreso debe ser posterior a la fecha de ingreso."
            });
            return;
        }

        const salarioDiario = selectedEmployee.ultimoSalario / 30;
        const aniosServicio = differenceInYears(fechaEgresoDate, fechaIngresoDate);
        const diasServicioTotal = differenceInDays(fechaEgresoDate, fechaIngresoDate);

        const diasGarantia = aniosServicio * 15;
        const garantiaAntiguedad = diasGarantia * salarioDiario;
        
        const diasAdicionales = Math.max(0, aniosServicio - 1) * 2;
        const montoDiasAdicionales = diasAdicionales * salarioDiario;

        const diasVacacionesPorAnio = 15 + aniosServicio -1;
        const diasVacacionesFraccionadas = (diasVacacionesPorAnio / 360) * (diasServicioTotal % 360);
        const montoVacacionesFraccionadas = diasVacacionesFraccionadas * salarioDiario;

        const diasBonoVacacionalPorAnio = 15 + aniosServicio - 1;
        const diasBonoFraccionado = (diasBonoVacacionalPorAnio / 360) * (diasServicioTotal % 360);
        const montoBonoFraccionado = diasBonoFraccionado * salarioDiario;
        
        const diasUtilidades = (90 / 360) * diasServicioTotal;
        const montoUtilidades = diasUtilidades * salarioDiario;

        const totalAsignaciones = garantiaAntiguedad + montoDiasAdicionales + montoVacacionesFraccionadas + montoBonoFraccionado + montoUtilidades;
        
        const deducciones = {
            prestamoCajaAhorro: 200,
        };
        const totalDeducciones = Object.values(deducciones).reduce((a,b) => a + b, 0);

        const netoAPagar = totalAsignaciones - totalDeducciones;

        setCalculo({
            salarioDiario,
            aniosServicio,
            diasGarantia,
            garantiaAntiguedad,
            diasAdicionales,
            montoDiasAdicionales,
            diasVacacionesFraccionadas,
            montoVacacionesFraccionadas,
            diasBonoFraccionado,
            montoBonoFraccionado,
            diasUtilidades,
            montoUtilidades,
            totalAsignaciones,
            deducciones,
            totalDeducciones,
            netoAPagar
        });

        toast({
            title: "Cálculo Realizado",
            description: "Se han calculado las prestaciones sociales para el empleado."
        });
    };

    const handlePrint = () => {
        window.print();
        toast({
            title: "Generando Documento",
            description: "Preparando la versión PDF del finiquito."
        });
    }

    return (
        <div className="p-4 md:p-8">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        .print-content, .print-content * { visibility: visible; }
                        .print-content { position: absolute; left: 0; top: 0; width: 100%; }
                    }
                `}
            </style>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calculator className="h-8 w-8 text-primary" />
                        Cálculo de Prestaciones Sociales
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Genera el cálculo de la liquidación de un empleado de forma automática y precisa.
                    </p>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Datos del Empleado</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="empleado">Seleccionar Empleado</Label>
                                <Select onValueChange={setSelectedEmployeeId}>
                                    <SelectTrigger id="empleado">
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {empleados.map(e => <SelectItem key={e.id} value={String(e.id)}>{e.nombre} - {e.cedula}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            {selectedEmployee && (
                                <div className="text-sm space-y-1 p-3 bg-secondary/50 rounded-lg border">
                                    <p><strong>Fecha de Ingreso:</strong> {formatDate(selectedEmployee.fechaIngreso)}</p>
                                    <p><strong>Último Salario Mensual:</strong> {formatCurrency(selectedEmployee.ultimoSalario, 'Bs.')}</p>
                                </div>
                            )}
                             <div className="space-y-2">
                                <Label htmlFor="fecha-egreso">Fecha de Egreso</Label>
                                <Input id="fecha-egreso" type="date" value={fechaEgreso} onChange={e => setFechaEgreso(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handleCalculate} disabled={!selectedEmployee || !fechaEgreso}>
                                <Calculator className="mr-2 h-4 w-4"/>
                                Calcular Liquidación
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm min-h-[400px] flex flex-col">
                         <CardHeader>
                            <CardTitle>Resultados del Cálculo</CardTitle>
                            <CardDescription>Desglose detallado de asignaciones y deducciones laborales.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            {calculo ? (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <Table>
                                        <TableHeader><TableRow className="bg-secondary/30"><TableHead colSpan={3} className="text-sm font-bold uppercase tracking-wider">Asignaciones</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            <TableRow><TableCell>Garantía de Antigüedad ({calculo.diasGarantia.toFixed(2)} días)</TableCell><TableCell className="text-right">{formatCurrency(calculo.garantiaAntiguedad, 'Bs.')}</TableCell></TableRow>
                                            <TableRow><TableCell>Días Adicionales ({calculo.diasAdicionales.toFixed(2)} días)</TableCell><TableCell className="text-right">{formatCurrency(calculo.montoDiasAdicionales, 'Bs.')}</TableCell></TableRow>
                                            <TableRow><TableCell>Vacaciones Fraccionadas ({calculo.diasVacacionesFraccionadas.toFixed(2)} días)</TableCell><TableCell className="text-right">{formatCurrency(calculo.montoVacacionesFraccionadas, 'Bs.')}</TableCell></TableRow>
                                            <TableRow><TableCell>Bono Vacacional Fraccionado ({calculo.diasBonoFraccionado.toFixed(2)} días)</TableCell><TableCell className="text-right">{formatCurrency(calculo.montoBonoFraccionado, 'Bs.')}</TableCell></TableRow>
                                            <TableRow><TableCell>Utilidades Fraccionadas ({calculo.diasUtilidades.toFixed(2)} días)</TableCell><TableCell className="text-right">{formatCurrency(calculo.montoUtilidades, 'Bs.')}</TableCell></TableRow>
                                            <TableRow className="font-bold border-t bg-primary/5"><TableCell>Total Asignaciones</TableCell><TableCell className="text-right">{formatCurrency(calculo.totalAsignaciones, 'Bs.')}</TableCell></TableRow>
                                        </TableBody>
                                    </Table>
                                     <Table>
                                        <TableHeader><TableRow className="bg-secondary/30"><TableHead colSpan={2} className="text-sm font-bold uppercase tracking-wider">Deducciones</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {Object.entries(calculo.deducciones).map(([key, value]) => (
                                                 <TableRow key={key}><TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell><TableCell className="text-right">({formatCurrency(value as number, 'Bs.')})</TableCell></TableRow>
                                            ))}
                                            <TableRow className="font-bold border-t bg-destructive/5"><TableCell>Total Deducciones</TableCell><TableCell className="text-right">({formatCurrency(calculo.totalDeducciones, 'Bs.')})</TableCell></TableRow>
                                        </TableBody>
                                    </Table>
                                    <Separator />
                                     <div className="flex justify-between items-center text-2xl font-bold p-6 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                                        <span className="tracking-tight">NETO A PAGAR:</span>
                                        <span className="text-primary">{formatCurrency(calculo.netoAPagar, 'Bs.')}</span>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full text-lg h-12" size="lg">Generar Recibo de Liquidación (Finiquito)</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                             <div className="print-content p-4">
                                                <DialogHeader className="text-center mb-8">
                                                    <DialogTitle className="text-3xl font-black uppercase tracking-tighter">Recibo de Liquidación</DialogTitle>
                                                    <DialogDescription className="font-bold text-primary">
                                                        Empresa S.A. | RIF: J-12345678-9
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-6 text-sm text-justify leading-relaxed">
                                                    <p>Mediante el presente documento, yo, <strong>{selectedEmployee?.nombre}</strong>, titular de la C.I. <strong>{selectedEmployee?.cedula}</strong>, declaro haber recibido de la empresa <strong>Empresa S.A.</strong> la cantidad de <strong>{formatCurrency(calculo.netoAPagar, 'Bs.')}</strong> por concepto de liquidación de mis prestaciones sociales y demás derechos laborales, con motivo de la terminación de mi relación de trabajo en fecha {formatDate(fechaEgreso)}.</p>
                                                    <p>El monto recibido cubre todos los conceptos que por ley y contrato me corresponden, cuyo desglose se detalla a continuación:</p>
                                                    
                                                    <div className="border rounded-xl overflow-hidden my-6">
                                                        <Table>
                                                            <TableBody>
                                                                <TableRow><TableCell className="font-medium">Total Asignaciones:</TableCell><TableCell className="text-right">{formatCurrency(calculo.totalAsignaciones, 'Bs.')}</TableCell></TableRow>
                                                                <TableRow><TableCell className="font-medium">Total Deducciones:</TableCell><TableCell className="text-right text-red-500">({formatCurrency(calculo.totalDeducciones, 'Bs.')})</TableCell></TableRow>
                                                                <TableRow className="bg-primary/5 font-black text-base border-t-2"><TableCell>Neto Pagado:</TableCell><TableCell className="text-right text-primary">{formatCurrency(calculo.netoAPagar, 'Bs.')}</TableCell></TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>

                                                    <p>Con la firma del presente documento, doy fe de no tener ningún otro reclamo pendiente de ninguna naturaleza contra la empresa.</p>
                                                    
                                                    <div className="flex justify-around pt-24 gap-12">
                                                        <div className="text-center flex-1">
                                                            <div className="border-t border-foreground pt-3 w-full"></div>
                                                            <p className="font-bold">La Empresa</p>
                                                            <p className="text-[10px] uppercase opacity-60">Sello y Firma</p>
                                                        </div>
                                                         <div className="text-center flex-1">
                                                            <div className="border-t border-foreground pt-3 w-full"></div>
                                                            <p className="font-bold">El Trabajador</p>
                                                            <p className="text-[10px] uppercase opacity-60">Firma y Huella</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center pt-12">
                                                          <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=finiquito-empleado-${selectedEmployee?.id}`} alt="QR de Verificación" width={100} height={100} className="border p-1 rounded-lg" />
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter className="mt-8 gap-2 print:hidden sm:justify-center border-t pt-6">
                                                <Button variant="outline" size="lg" onClick={handlePrint} className="h-12 px-8"><Printer className="mr-2 h-5 w-5"/> Imprimir Finiquito</Button>
                                                <Button size="lg" className="h-12 px-8" onClick={handlePrint}><Download className="mr-2 h-5 w-5"/> Descargar PDF</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center text-muted-foreground flex-grow py-12">
                                    <div className="bg-primary/5 p-6 rounded-full mb-6">
                                        <Calculator className="h-16 w-16 text-primary/40" />
                                    </div>
                                    <p className="text-lg font-medium">Cálculo de Liquidación Pendiente</p>
                                    <p className="max-w-xs mt-2">Seleccione un empleado y una fecha de egreso en el panel lateral para iniciar el proceso.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

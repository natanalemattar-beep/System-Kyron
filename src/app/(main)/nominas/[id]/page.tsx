
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Download, Send, QrCode, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";


// Mock data, in a real app this would be fetched based on the [id]
const empleado = { id: 1, nombre: "Ana Pérez", cedula: "V-12.345.678", cargo: "Gerente de Proyectos", fechaIngreso: "01/01/2020", sueldoBase: 12000 };
const empresa = { nombre: "Empresa S.A.", rif: "J-12345678-9" };
const sueldoBaseQuincenal = empleado.sueldoBase / 2;

const nomina = {
    periodo: "1ra Quincena de Julio 2024",
    fechaPago: "15/07/2024",
    asignaciones: [
        { concepto: "Sueldo Base Quincenal", monto: sueldoBaseQuincenal },
        { concepto: "Bono de Alimentación (Cestaticket)", monto: 1460 },
        { concepto: "Bono de Productividad", monto: 1500 },
        { concepto: "Pago de Horas Extras", monto: 800 },
    ],
    deduccionesBase: [ // Deducciones fijas o que no se calculan como % del sueldo base
        { concepto: "Retención ISLR", monto: 450 },
        { concepto: "Aporte Caja de Ahorro", monto: 300 },
    ],
    deduccionesPorcentuales: [ // Deducciones calculadas como % del sueldo base
        { concepto: "Seguro Social Obligatorio (SSO) - 4%", porcentaje: 0.04 },
        { concepto: "Régimen Prestacional de Empleo (RPE) - 0.5%", porcentaje: 0.005 },
        { concepto: "Fondo de Ahorro para la Vivienda (FAOV) - 1%", porcentaje: 0.01 },
    ]
};

// --- Cálculos automáticos ---
const totalAsignaciones = nomina.asignaciones.reduce((acc, item) => acc + item.monto, 0);

const deduccionesCalculadas = nomina.deduccionesPorcentuales.map(item => ({
    ...item,
    monto: sueldoBaseQuincenal * item.porcentaje
}));

const todasLasDeducciones = [
    ...deduccionesCalculadas,
    ...nomina.deduccionesBase
];

const totalDeducciones = todasLasDeducciones.reduce((acc, item) => acc + item.monto, 0);

const netoAPagar = totalAsignaciones - totalDeducciones;
// --- Fin de cálculos automáticos ---

export default function ReciboNominaPage({ params }: { params: { id: string } }) {
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Descarga Iniciada",
            description: "El recibo de pago se está descargando en formato PDF.",
        });
    }

    const handleSend = () => {
        toast({
            title: "Recibo Enviado",
            description: `El recibo ha sido enviado al correo del empleado ${empleado.nombre}.`,
        });
    }


  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
             <Button asChild variant="outline">
                <Link href="/nominas">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Volver a Nóminas
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2"/>
                    Descargar PDF
                </Button>
                 <Button onClick={handleSend}>
                    <Send className="mr-2"/>
                    Enviar Recibo
                </Button>
            </div>
        </header>

        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center bg-secondary/30 p-6">
                <CardTitle className="text-3xl">Recibo de Pago de Nómina</CardTitle>
                <CardDescription>{nomina.periodo}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Datos de la Empresa</h3>
                        <p><strong>Razón Social:</strong> {empresa.nombre}</p>
                        <p><strong>RIF:</strong> {empresa.rif}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Datos del Empleado</h3>
                        <p><strong>Nombre:</strong> {empleado.nombre}</p>
                        <p><strong>C.I.:</strong> {empleado.cedula}</p>
                        <p><strong>Cargo:</strong> {empleado.cargo}</p>
                        <p><strong>Fecha de Ingreso:</strong> {empleado.fechaIngreso}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-md mb-2 border-b pb-1">Asignaciones</h4>
                        <Table>
                            <TableBody>
                                {nomina.asignaciones.map(item => (
                                    <TableRow key={item.concepto}>
                                        <TableCell>{item.concepto}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.monto, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                     <div>
                        <h4 className="font-semibold text-md mb-2 border-b pb-1">Deducciones</h4>
                        <Table>
                            <TableBody>
                                {todasLasDeducciones.map(item => (
                                    <TableRow key={item.concepto}>
                                        <TableCell>{item.concepto}</TableCell>
                                        <TableCell className="text-right">({formatCurrency(item.monto, 'Bs.')})</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                
                <Separator className="my-6"/>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-muted-foreground">Total Asignaciones</p>
                        <p className="font-bold text-lg text-green-500">{formatCurrency(totalAsignaciones, 'Bs.')}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Total Deducciones</p>
                        <p className="font-bold text-lg text-red-500">{formatCurrency(totalDeducciones, 'Bs.')}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Neto a Pagar</p>
                        <p className="font-bold text-2xl text-primary">{formatCurrency(netoAPagar, 'Bs.')}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-secondary/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-green-600">
                    <ShieldCheck className="h-8 w-8"/>
                    <div>
                        <p className="font-bold">Recibo 100% Protegido y Seguro</p>
                        <p className="text-xs text-muted-foreground">Verificado por C.M.S el {nomina.fechaPago}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=RIF:${empresa.rif},Recibo:Nomina-${empleado.id},Fecha:${nomina.fechaPago},Monto:${netoAPagar}`} alt="QR Code" width={80} height={80} />
                    <p className="text-xs text-muted-foreground mt-1">Escanear para verificar</p>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

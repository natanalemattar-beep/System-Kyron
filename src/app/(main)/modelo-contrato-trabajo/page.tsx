
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSignature, Download, Printer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDate } from "@/lib/utils";

const legalProcedure = [
    "Registro en Sistema Tiuna: Inscribir al empleado en el sistema Tiuna del IVSS dentro de los tres (3) primeros días hábiles de inicio de la relación laboral.",
    "Notificación de Riesgos (LOPCYMAT): Entregar al trabajador una notificación por escrito de los principios de la prevención de las condiciones inseguras o insalubres, tanto al inicio de la relación laboral como cuando se produzca un cambio en las condiciones de trabajo.",
    "Apertura de Cuenta Nómina: Gestionar la apertura de una cuenta bancaria para el pago del salario.",
    "Archivo del Contrato: Conservar dos (2) ejemplares originales del contrato, uno para la empresa y otro para el trabajador.",
];


export default function ModeloContratoTrabajoPage() {
    const { toast } = useToast();
    const [employeeData, setEmployeeData] = useState({
        nombre: "[Nombre Completo del Empleado]",
        cedula: "[C.I. del Empleado]",
        cargo: "[Cargo a Desempeñar]",
        salario: 12000,
        fechaIngreso: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setEmployeeData(prev => ({ ...prev, [id]: value }));
    };

    const getContractContent = () => {
        return `
            CONTRATO DE TRABAJO A TIEMPO INDETERMINADO

Entre EMPRESA, C.A., RIF J-12345678-9, (en adelante “EL EMPLEADOR”), y por la otra parte, ${employeeData.nombre}, titular de la Cédula de Identidad N° ${employeeData.cedula}, (en adelante “EL TRABAJADOR”), se ha convenido en celebrar el presente Contrato de Trabajo, de conformidad con la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) y las siguientes cláusulas:

CLÁUSULA PRIMERA: OBJETO
EL TRABAJADOR se compromete a prestar sus servicios personales lícitos y remunerados a EL EMPLEADOR, desempeñando el cargo de ${employeeData.cargo}. Las funciones principales incluyen, pero no se limitan a: [Descripción genérica de las funciones del cargo, ej: planificar y ejecutar proyectos, gestionar equipos, etc.].

CLÁUSULA SEGUNDA: DURACIÓN
La presente relación de trabajo se celebra a tiempo indeterminado, a partir del ${formatDate(employeeData.fechaIngreso)}. Los primeros treinta (30) días se considerarán como período de prueba, de conformidad con el artículo 61 de la LOTTT.

CLÁUSULA TERCERA: JORNADA DE TRABAJO
La jornada de trabajo será de ocho (8) horas diarias, de lunes a viernes, para un total de cuarenta (40) horas semanales, dentro de los límites establecidos por la LOTTT.

CLÁUSULA CUARTA: SALARIO Y BENEFICIOS
EL TRABAJADOR devengará un salario mensual fijo de ${formatCurrency(employeeData.salario, 'Bs.')}. Adicionalmente, recibirá todos los beneficios establecidos en la LOTTT (utilidades, vacaciones, bono vacacional) y los beneficios socioeconómicos otorgados por la empresa, como el Cestaticket Socialista, seguro de salud, entre otros detallados en la política de beneficios de la compañía.

CLÁUSULA QUINTA: LUGAR DE PRESTACIÓN DE SERVICIO
EL TRABAJADOR prestará sus servicios en las oficinas de EL EMPLEADOR, ubicadas en [Dirección de la Empresa], Caracas, Venezuela, pudiendo ser trasladado a otras dependencias si la naturaleza del servicio así lo requiere.

CLÁUSULA SEXTA: LEY APLICABLE
Todo lo no previsto en este contrato se regirá por las disposiciones de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) y su Reglamento.
        `;
    }

    const handleAction = (action: string) => {
        const content = getContractContent();
        
        if (action === 'impreso') {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`<html><head><title>Contrato de Trabajo</title></head><body><pre>${content}</pre></body></html>`);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
        } else if (action === 'descargado') {
             const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement("a");
            document.body.appendChild(link);
            link.href = URL.createObjectURL(blob);
            link.download = `Contrato_Trabajo_${employeeData.nombre.replace(/ /g, '_')}.txt`;
            link.click();
            document.body.removeChild(link);
        }

        toast({
            title: `Contrato ${action}`,
            description: `El modelo de contrato ha sido ${action === 'impreso' ? 'enviado a la impresora' : 'descargado como .txt'}.`,
        });
    }

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
      <header className="mb-8 flex items-center justify-between print:hidden">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileSignature className="h-8 w-8" />
                Modelo de Contrato de Trabajo
            </h1>
            <p className="text-muted-foreground mt-2">
              Genera un contrato de trabajo a tiempo indeterminado ajustado a la LOTTT y a los beneficios de tu empresa.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impreso')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={() => handleAction('descargado')}>
                <Download className="mr-2"/> Descargar (.txt)
            </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 print:hidden">
            <Card className="bg-card/50 backdrop-blur-sm sticky top-24">
                <CardHeader>
                    <CardTitle>Datos del Contrato</CardTitle>
                    <CardDescription>Completa la información del empleado.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre del Empleado</Label>
                        <Input id="nombre" value={employeeData.nombre} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="cedula">Cédula de Identidad</Label>
                        <Input id="cedula" value={employeeData.cedula} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Input id="cargo" value={employeeData.cargo} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="salario">Salario Mensual (Bs.)</Label>
                        <Input id="salario" type="number" value={employeeData.salario} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
                        <Input id="fechaIngreso" type="date" value={employeeData.fechaIngreso} onChange={handleInputChange} />
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2" id="printable-content">
            <Card className="bg-card/90 backdrop-blur-sm shadow-xl print:shadow-none print:border-none print:bg-white dark:print:bg-black">
                <CardHeader className="text-center p-8">
                    <CardTitle className="text-2xl">CONTRATO DE TRABAJO A TIEMPO INDETERMINADO</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
                    <p>
                        Entre <strong>EMPRESA, C.A.</strong>, RIF J-12345678-9, (en adelante “EL EMPLEADOR”), y por la otra parte, <strong>{employeeData.nombre}</strong>, titular de la Cédula de Identidad N° <strong>{employeeData.cedula}</strong>, (en adelante “EL TRABAJADOR”), se ha convenido en celebrar el presente Contrato de Trabajo, de conformidad con la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) y las siguientes cláusulas:
                    </p>

                    <h4>CLÁUSULA PRIMERA: OBJETO</h4>
                    <p>
                        EL TRABAJADOR se compromete a prestar sus servicios personales lícitos y remunerados a EL EMPLEADOR, desempeñando el cargo de <strong>{employeeData.cargo}</strong>. Las funciones principales incluyen, pero no se limitan a: [Descripción genérica de las funciones del cargo, ej: planificar y ejecutar proyectos, gestionar equipos, etc.].
                    </p>

                    <h4>CLÁUSULA SEGUNDA: DURACIÓN</h4>
                    <p>
                        La presente relación de trabajo se celebra a <strong>tiempo indeterminado</strong>, a partir del <strong>{formatDate(employeeData.fechaIngreso)}</strong>. Los primeros treinta (30) días se considerarán como período de prueba, de conformidad con el artículo 61 de la LOTTT.
                    </p>
                    
                    <h4>CLÁUSULA TERCERA: JORNADA DE TRABAJO</h4>
                    <p>
                        La jornada de trabajo será de ocho (8) horas diarias, de lunes a viernes, para un total de cuarenta (40) horas semanales, dentro de los límites establecidos por la LOTTT.
                    </p>

                    <h4>CLÁUSULA CUARTA: SALARIO Y BENEFICIOS</h4>
                    <p>
                        EL TRABAJADOR devengará un salario mensual fijo de <strong>{formatCurrency(employeeData.salario, 'Bs.')}</strong>. Adicionalmente, recibirá todos los beneficios establecidos en la LOTTT (utilidades, vacaciones, bono vacacional) y los beneficios socioeconómicos otorgados por la empresa, como el Cestaticket Socialista, seguro de salud, entre otros detallados en la política de beneficios de la compañía.
                    </p>

                    <h4>CLÁUSULA QUINTA: LUGAR DE PRESTACIÓN DE SERVICIO</h4>
                    <p>
                        EL TRABAJADOR prestará sus servicios en las oficinas de EL EMPLEADOR, ubicadas en [Dirección de la Empresa], Caracas, Venezuela, pudiendo ser trasladado a otras dependencias si la naturaleza del servicio así lo requiere.
                    </p>
                    
                    <h4>CLÁUSULA SEXTA: LEY APLICABLE</h4>
                    <p>
                    Todo lo no previsto en este contrato se regirá por las disposiciones de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) y su Reglamento.
                    </p>

                    <div className="grid grid-cols-2 gap-24 pt-24">
                        <div className="text-center">
                            <p className="border-t-2 border-foreground pt-2">EL EMPLEADOR</p>
                            <p className="text-xs">(Firma y Sello)</p>
                        </div>
                        <div className="text-center">
                            <p className="border-t-2 border-foreground pt-2">EL TRABAJADOR</p>
                            <p className="text-xs">(Firma)</p>
                        </div>
                    </div>

                </CardContent>
            </Card>
             <Card className="mt-8 print:hidden">
                <CardHeader>
                    <CardTitle>Procedimiento Legal Post-Firma</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {legalProcedure.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

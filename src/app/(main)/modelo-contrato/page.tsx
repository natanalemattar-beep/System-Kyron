
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSignature, Download, Printer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const legalConsiderations = [
    "Retenciones de Impuestos: Como proveedor de servicios, eres responsable de declarar y pagar tus propios impuestos (ISLR). El cliente podría estar obligado a actuar como agente de retención.",
    "Naturaleza No Laboral: Este contrato establece una relación mercantil, no laboral. No genera pasivos laborales como vacaciones o prestaciones sociales.",
    "Facturación: Debes emitir una factura fiscal válida por los servicios prestados para que el cliente pueda registrar el gasto y tú declarar el ingreso.",
];

export default function ModeloContratoPage() {
    const { toast } = useToast();

    const getContractContent = () => {
        return `
CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

Entre EMPRESA, C.A., (en adelante “EL CLIENTE”), inscrita en el Registro Mercantil X de la Circunscripción Judicial del Distrito Capital y Estado Miranda, en fecha XX de XXXX de XXXX, bajo el N° XX, Tomo XX, y SYSTEM C.M.S, C.A., (en adelante “EL PROVEEDOR”), RIF J-XXXXXXX, domiciliada en Caracas, se ha convenido en celebrar el presente Contrato de Prestación de Servicios Profesionales, el cual se regirá por las siguientes cláusulas:

CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
EL PROVEEDOR se compromete a prestar a EL CLIENTE los servicios de consultoría, implementación y soporte de su sistema de gestión administrativa y contable, de acuerdo a las especificaciones y alcance definidos en el Anexo "A" que forma parte integrante de este contrato.

CLÁUSULA SEGUNDA: OBLIGACIONES DEL PROVEEDOR
EL PROVEEDOR se obliga a: 1. Prestar los servicios con la mayor diligencia y profesionalismo. 2. Cumplir con los plazos de entrega acordados. 3. Mantener la confidencialidad sobre la información de EL CLIENTE.

CLÁUSULA TERCERA: OBLIGACIONES DEL CLIENTE
EL CLIENTE se obliga a: 1. Suministrar toda la información necesaria para la correcta prestación del servicio. 2. Realizar los pagos en las fechas acordadas. 3. Designar un interlocutor válido para la coordinación con EL PROVEEDOR.

CLÁUSULA CUARTA: HONORARIOS Y FORMA DE PAGO
Por los servicios prestados, EL CLIENTE pagará a EL PROVEEDOR la cantidad de XXXX Bolívares (Bs. XX.XXX,XX), pagaderos de la siguiente forma: 50% al inicio del proyecto y 50% contra entrega final.

CLÁUSULA QUINTA: CONFIDENCIALIDAD
Ambas partes se comprometen a no divulgar la información confidencial a la que tengan acceso con motivo de la ejecución de este contrato. Esta obligación subsistirá aún después de finalizado el mismo.

CLÁUSULA SEXTA: DURACIÓN Y TERMINACIÓN
El presente contrato tendrá una duración de un (1) año, contado a partir de la fecha de su firma, pudiendo ser renovado por mutuo acuerdo. Cualquiera de las partes podrá dar por terminado el contrato mediante notificación escrita con treinta (30) días de antelación.
        `;
    }

    const handlePrint = () => {
        const content = getContractContent();
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<div class="oficio-document">${content}</div>` + footer;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(sourceHTML);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
        toast({
            title: `Contrato impreso`,
            description: `El modelo de contrato ha sido enviado a la impresora.`,
        });
    }

    const handleDownload = () => {
        const content = getContractContent();
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<div class="oficio-document">${content}</div>` + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Contrato_Prestacion_Servicios.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

         toast({
            title: "Descarga Iniciada",
            description: "El modelo de contrato se está descargando como un archivo .doc.",
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
                    .oficio-document {
                        page: oficio;
                    }
                }
            `}
        </style>
      <header className="mb-8 flex items-center justify-between print:hidden">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileSignature className="h-8 w-8" />
                Modelo de Contrato
            </h1>
            <p className="text-muted-foreground mt-2">
              Utiliza este modelo de contrato de prestación de servicios para formalizar tus relaciones comerciales.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={handleDownload}>
                <Download className="mr-2"/> Descargar (.doc)
            </Button>
        </div>
      </header>
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2" id="printable-content">
                <div className="oficio-document">
                    <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-xl print:shadow-none print:border-none print:bg-white dark:print:bg-black">
                        <CardHeader className="text-center p-8">
                            <CardTitle className="text-2xl">CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
                            <p>
                                Entre <strong>EMPRESA, C.A.</strong>, (en adelante “EL CLIENTE”), inscrita en el Registro Mercantil X de la Circunscripción Judicial del Distrito Capital y Estado Miranda, en fecha XX de XXXX de XXXX, bajo el N° XX, Tomo XX, y <strong>SYSTEM C.M.S, C.A.</strong>, (en adelante “EL PROVEEDOR”), RIF J-XXXXXXX, domiciliada en Caracas, se ha convenido en celebrar el presente Contrato de Prestación de Servicios Profesionales, el cual se regirá por las siguientes cláusulas:
                            </p>

                            <h4>CLÁUSULA PRIMERA: OBJETO DEL CONTRATO</h4>
                            <p>
                                EL PROVEEDOR se compromete a prestar a EL CLIENTE los servicios de consultoría, implementación y soporte de su sistema de gestión administrativa y contable, de acuerdo a las especificaciones y alcance definidos en el Anexo "A" que forma parte integrante de este contrato.
                            </p>

                            <h4>CLÁUSULA SEGUNDA: OBLIGACIONES DEL PROVEEDOR</h4>
                            <p>
                                EL PROVEEDOR se obliga a: 1. Prestar los servicios con la mayor diligencia y profesionalismo. 2. Cumplir con los plazos de entrega acordados. 3. Mantener la confidencialidad sobre la información de EL CLIENTE.
                            </p>
                            
                            <h4>CLÁUSULA TERCERA: OBLIGACIONES DEL CLIENTE</h4>
                            <p>
                                EL CLIENTE se obliga a: 1. Suministrar toda la información necesaria para la correcta prestación del servicio. 2. Realizar los pagos en las fechas acordadas. 3. Designar un interlocutor válido para la coordinación con EL PROVEEDOR.
                            </p>

                            <h4>CLÁUSULA CUARTA: HONORARIOS Y FORMA DE PAGO</h4>
                            <p>
                                Por los servicios prestados, EL CLIENTE pagará a EL PROVEEDOR la cantidad de XXXX Bolívares (Bs. XX.XXX,XX), pagaderos de la siguiente forma: 50% al inicio del proyecto y 50% contra entrega final.
                            </p>

                            <h4>CLÁUSULA QUINTA: CONFIDENCIALIDAD</h4>
                            <p>
                                Ambas partes se comprometen a no divulgar la información confidencial a la que tengan acceso con motivo de la ejecución de este contrato. Esta obligación subsistirá aún después de finalizado el mismo.
                            </p>
                            
                            <h4>CLÁUSULA SEXTA: DURACIÓN Y TERMINACIÓN</h4>
                            <p>
                                El presente contrato tendrá una duración de un (1) año, contado a partir de la fecha de su firma, pudiendo ser renovado por mutuo acuerdo. Cualquiera de las partes podrá dar por terminado el contrato mediante notificación escrita con treinta (30) días de antelación.
                            </p>

                            <div className="grid grid-cols-2 gap-24 pt-24">
                                <div className="text-center">
                                    <p className="border-t-2 border-foreground pt-2">EL CLIENTE</p>
                                    <p className="text-xs">(Firma y Sello)</p>
                                </div>
                                <div className="text-center">
                                    <p className="border-t-2 border-foreground pt-2">EL PROVEEDOR</p>
                                    <p className="text-xs">(Firma y Sello)</p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="lg:col-span-1 print:hidden">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Consideraciones Legales y Fiscales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {legalConsiderations.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm">
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

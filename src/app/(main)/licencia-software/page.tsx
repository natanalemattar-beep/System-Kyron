
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSignature, Download, Printer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const legalProcedure = [
    "Firma de las Partes: Ambas partes (Licenciante y Licenciatario) deben firmar dos originales del contrato.",
    "Reconocimiento de Firmas (Opcional): Para mayor seguridad jurídica, las firmas pueden ser reconocidas ante una Notaría Pública.",
    "Archivo: Cada parte debe conservar una copia original del contrato como respaldo legal de los términos y condiciones acordados.",
    "Registro de Propiedad Intelectual: El licenciante debe asegurarse de tener registrado su software y marca ante el SAPI (Servicio Autónomo de la Propiedad Intelectual) para proteger sus derechos."
];

export default function LicenciaSoftwarePage() {
    const { toast } = useToast();

    const getContractContent = () => {
        return `
            <h1>CONTRATO DE LICENCIA DE USO DE SOFTWARE</h1>
            <p>Entre <strong>KYRON, C.A.</strong>, (en adelante “EL LICENCIANTE”), RIF J-XXXXXXX, domiciliada en Caracas, y por la otra parte, <strong>[NOMBRE DEL CLIENTE]</strong>, (en adelante “EL LICENCIATARIO”), RIF [RIF DEL CLIENTE], domiciliada en [DOMICILIO DEL CLIENTE], se ha convenido en celebrar el presente Contrato de Licencia de Uso de Software, el cual se regirá por las siguientes cláusulas:</p>
            <br/>
            <h3>CLÁUSULA PRIMERA: OBJETO DEL CONTRATO</h3>
            <p>EL LICENCIANTE otorga a EL LICENCIATARIO una licencia no exclusiva, intransferible y revocable para utilizar el sistema informático denominado "Kyron" (en adelante, "EL SOFTWARE"), específicamente en sus módulos de Contabilidad, Nómina, y Seguros Jurídicos y Fianzas.</p>
            <br/>
            <h3>CLÁUSULA SEGUNDA: ALCANCE Y DURACIÓN DE LA LICENCIA</h3>
            <p>La presente licencia tendrá una duración de un (1) año, contado a partir de la fecha de firma de este contrato, renovable automáticamente por períodos iguales, salvo notificación por escrito de alguna de las partes con al menos treinta (30) días de antelación a la fecha de vencimiento. La licencia es válida para [NÚMERO] usuarios dentro de la organización de EL LICENCIATARIO.</p>
            <br/>
            <h3>CLÁUSULA TERCERA: HONORARIOS Y FORMA DE PAGO</h3>
            <p>EL LICENCIATARIO se compromete a pagar a EL LICENCIANTE la suma de [MONTO DEL PAGO] por el primer año de licencia. Los pagos subsecuentes por renovación se ajustarán de acuerdo a las tarifas vigentes de EL LICENCIANTE.</p>
            <br/>
            <h3>CLÁUSULA CUARTA: SOPORTE Y MANTENIMIENTO</h3>
            <p>EL LICENCIANTE proveerá a EL LICENCIATARIO soporte técnico y actualizaciones periódicas de EL SOFTWARE durante la vigencia de este contrato. El soporte se limitará a la corrección de errores y la asistencia en el uso de las funcionalidades existentes.</p>
            <br/>
            <h3>CLÁUSULA QUINTA: PROPIEDAD INTELECTUAL</h3>
            <p>EL LICENCIANTE declara ser el único y exclusivo titular de todos los derechos de propiedad intelectual sobre EL SOFTWARE. EL LICENCIATARIO se compromete a no copiar, modificar, descompilar, o realizar ingeniería inversa sobre EL SOFTWARE.</p>
            <br/>
            <h3>CLÁUSULA SEXTA: CONFIDENCIALIDAD</h3>
            <p>Ambas partes se comprometen a mantener estricta confidencialidad sobre la información técnica, comercial y financiera a la que tengan acceso en virtud del presente contrato. Esta obligación subsistirá aún después de finalizado el mismo.</p>
        `;
    };

    const handleAction = (action: string) => {
        const content = getContractContent();
        const filename = 'Contrato_Licencia_Software.doc';
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<div class="oficio-document">${content.replace(/\n/g, '<br/>')}</div>` + footer;

        if (action === 'impreso') {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(sourceHTML);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
        } else if (action === 'descargado') {
            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = filename;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }

        toast({
            title: `Contrato ${action}`,
            description: `El modelo de contrato ha sido ${action === 'impreso' ? 'enviado a la impresora' : 'descargado'}.`,
        });
    };

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
                Contrato de Licencia de Software
            </h1>
            <p className="text-muted-foreground mt-2">
              Modelo de contrato para la venta de licencias de uso de los módulos de Contabilidad, Nómina y Seguros.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impreso')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={() => handleAction('descargado')}>
                <Download className="mr-2"/> Descargar (.doc)
            </Button>
        </div>
      </header>
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2" id="printable-content">
            <div className="oficio-document">
                <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-xl print:shadow-none print:border-none print:bg-white dark:print:bg-black">
                    <CardHeader className="text-center p-8">
                        <CardTitle className="text-2xl">CONTRATO DE LICENCIA DE USO DE SOFTWARE</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
                        <p>
                            Entre <strong>Kyron, C.A.</strong>, (en adelante “EL LICENCIANTE”), RIF J-XXXXXXX, domiciliada en Caracas, y por la otra parte, <strong>[NOMBRE DEL CLIENTE]</strong>, (en adelante “EL LICENCIATARIO”), RIF [RIF DEL CLIENTE], domiciliada en [DOMICILIO DEL CLIENTE], se ha convenido en celebrar el presente Contrato de Licencia de Uso de Software, el cual se regirá por las siguientes cláusulas:
                        </p>

                        <h4>CLÁUSULA PRIMERA: OBJETO DEL CONTRATO</h4>
                        <p>
                            EL LICENCIANTE otorga a EL LICENCIATARIO una licencia no exclusiva, intransferible y revocable para utilizar el sistema informático denominado "Kyron" (en adelante, "EL SOFTWARE"), específicamente en sus módulos de Contabilidad, Nómina, y Seguros Jurídicos y Fianzas.
                        </p>

                        <h4>CLÁUSULA SEGUNDA: ALCANCE Y DURACIÓN DE LA LICENCIA</h4>
                        <p>
                            La presente licencia tendrá una duración de un (1) año, contado a partir de la fecha de firma de este contrato, renovable automáticamente por períodos iguales, salvo notificación por escrito de alguna de las partes con al menos treinta (30) días de antelación a la fecha de vencimiento. La licencia es válida para [NÚMERO] usuarios dentro de la organización de EL LICENCIATARIO.
                        </p>
                        
                        <h4>CLÁUSULA TERCERA: HONORARIOS Y FORMA DE PAGO</h4>
                        <p>
                            EL LICENCIATARIO se compromete a pagar a EL LICENCIANTE la suma de <strong>[MONTO DEL PAGO]</strong> por el primer año de licencia. Los pagos subsecuentes por renovación se ajustarán de acuerdo a las tarifas vigentes de EL LICENCIANTE.
                        </p>

                        <h4>CLÁUSULA CUARTA: SOPORTE Y MANTENIMIENTO</h4>
                        <p>
                            EL LICENCIANTE proveerá a EL LICENCIATARIO soporte técnico y actualizaciones periódicas de EL SOFTWARE durante la vigencia de este contrato. El soporte se limitará a la corrección de errores y la asistencia en el uso de las funcionalidades existentes.
                        </p>

                        <h4>CLÁUSULA QUINTA: PROPIEDAD INTELECTUAL</h4>
                        <p>
                            EL LICENCIANTE declara ser el único y exclusivo titular de todos los derechos de propiedad intelectual sobre EL SOFTWARE. EL LICENCIATARIO se compromete a no copiar, modificar, descompilar, o realizar ingeniería inversa sobre EL SOFTWARE.
                        </p>
                        
                        <h4>CLÁUSULA SEXTA: CONFIDENCIALIDAD</h4>
                        <p>
                            Ambas partes se comprometen a mantener estricta confidencialidad sobre la información técnica, comercial y financiera a la que tengan acceso en virtud del presente contrato. Esta obligación subsistirá aún después de finalizado el mismo.
                        </p>

                        <div className="grid grid-cols-2 gap-24 pt-24">
                            <div className="text-center">
                                <p className="border-t-2 border-foreground pt-2">EL LICENCIANTE</p>
                                <p className="text-xs">(Kyron, C.A.)</p>
                            </div>
                            <div className="text-center">
                                <p className="border-t-2 border-foreground pt-2">EL LICENCIATARIO</p>
                                <p className="text-xs">([NOMBRE DEL CLIENTE])</p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
         <div className="lg:col-span-1 print:hidden">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Procedimiento y Validez Legal</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {legalProcedure.map((item, index) => (
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

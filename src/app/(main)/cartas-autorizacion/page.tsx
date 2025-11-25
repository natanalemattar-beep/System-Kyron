
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

const modelos = {
    conatel: {
        titulo: "Autorización para CONATEL",
        contenido: `
Ciudad y Fecha: ${formatDate(new Date())}

Señores
Comisión Nacional de Telecomunicaciones (CONATEL)
Presente.-

ASUNTO: AUTORIZACIÓN PARA GESTIÓN

Por medio de la presente, yo, [NOMBRE DEL REPRESENTANTE LEGAL], en mi carácter de [CARGO DEL REPRESENTANTE LEGAL] de la empresa [NOMBRE DE LA EMPRESA], C.A., RIF [RIF DE LA EMPRESA], autorizo ampliamente al ciudadano(a) [NOMBRE DEL AUTORIZADO], titular de la Cédula de Identidad N° V-[C.I. DEL AUTORIZADO], para que en nuestro nombre y representación realice cualquier tipo de trámite, solicitud o gestión ante este organismo, utilizando para ello el "Sistema de Gestión Administrativa Kyron".

Esta autorización incluye, pero no se limita a, la solicitud de permisos, la consignación de documentos y el seguimiento de expedientes.

Atentamente,

_________________________
[NOMBRE DEL REPRESENTANTE LEGAL]
[CARGO DEL REPRESENTANTE LEGAL]
`
    },
    sudeban: {
        titulo: "Autorización para SUDEBAN",
        contenido: `
Ciudad y Fecha: ${formatDate(new Date())}

Señores
Superintendencia de las Instituciones del Sector Bancario (SUDEBAN)
Presente.-

ASUNTO: AUTORIZACIÓN PARA CONSULTAS Y GESTIONES

Por medio de la presente, yo, [NOMBRE DEL REPRESENTANTE LEGAL], en mi carácter de [CARGO DEL REPRESENTANTE LEGAL] de la empresa [NOMBRE DE LA EMPRESA], C.A., RIF [RIF DE LA EMPRESA], autorizo ampliamente al ciudadano(a) [NOMBRE DEL AUTORIZADO], titular de la Cédula de Identidad N° V-[C.I. DEL AUTORIZADO], para que, a través del "Sistema de Gestión Administrativa Kyron", pueda realizar consultas, gestionar solicitudes y consignar recaudos relacionados con nuestra entidad ante esta superintendencia.

Dicha autorización se otorga para facilitar la comunicación y el cumplimiento de las normativas bancarias vigentes.

Atentamente,

_________________________
[NOMBRE DEL REPRESENTANTE LEGAL]
[CARGO DEL REPRESENTANTE LEGAL]
`
    },
    seniat: {
        titulo: "Autorización para el SENIAT",
        contenido: `
Ciudad y Fecha: ${formatDate(new Date())}

Señores
Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)
Presente.-

ASUNTO: AUTORIZACIÓN PARA GESTIONES TRIBUTARIAS

Por medio de la presente, yo, [NOMBRE DEL REPRESENTANTE LEGAL], en mi carácter de [CARGO DEL REPRESENTANTE LEGAL] de la empresa [NOMBRE DE LA EMPRESA], C.A., RIF [RIF DE LA EMPRESA], autorizo de manera amplia y suficiente al ciudadano(a) [NOMBRE DEL AUTORIZADO], titular de la Cédula de Identidad N° V-[C.I. DEL AUTORIZADO], para que realice en nuestro nombre cualquier trámite tributario necesario a través del "Sistema de Gestión Administrativa Kyron".

Esta autorización faculta al mencionado ciudadano(a) para presentar declaraciones de impuestos, solicitar y retirar solvencias, y realizar cualquier otra gestión pertinente ante este servicio.

Atentamente,

_________________________
[NOMBRE DEL REPRESENTANTE LEGAL]
[CARGO DEL REPRESENTANTE LEGAL]
`
    }
};

export default function CartasAutorizacionPage() {
    const { toast } = useToast();

    const handleAction = (organismo: keyof typeof modelos, action: 'imprimir' | 'descargar') => {
        const { titulo, contenido } = modelos[organismo];
        if (action === 'imprimir') {
            const printWindow = window.open('', '_blank');
            printWindow?.document.write(`<pre>${contenido}</pre>`);
            printWindow?.document.close();
            printWindow?.print();
            toast({ title: "Impresión Iniciada", description: `El modelo de carta para ${titulo} ha sido enviado a la impresora.` });
        } else {
             const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                "xmlns='http://www.w3.org/TR/REC-html40'>"+
                "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
            const footer = "</body></html>";
            const sourceHTML = header + `<pre>${contenido}</pre>` + footer;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `${titulo.replace(/ /g, '_')}.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
            toast({ title: "Descarga Iniciada", description: `El modelo de carta se está descargando como un archivo de Word.` });
        }
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Mail className="h-8 w-8" />
                    Modelos de Cartas de Autorización
                </h1>
                <p className="text-muted-foreground mt-2">
                    Genera autorizaciones para que un tercero pueda realizar trámites en tu nombre ante diversos organismos.
                </p>
            </header>

            <Tabs defaultValue="seniat" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="seniat">SENIAT</TabsTrigger>
                    <TabsTrigger value="sudeban">SUDEBAN</TabsTrigger>
                    <TabsTrigger value="conatel">CONATEL</TabsTrigger>
                </TabsList>
                {Object.entries(modelos).map(([key, modelo]) => (
                    <TabsContent value={key} key={key} className="mt-6">
                        <Card className="bg-card/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>{modelo.titulo}</CardTitle>
                                <CardDescription>
                                    Utiliza esta plantilla para autorizar a un gestor o empleado a actuar en tu nombre.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <pre className="p-6 bg-secondary/50 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto h-[400px]">
                                    {modelo.contenido}
                                </pre>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => handleAction(key as keyof typeof modelos, 'imprimir')}>
                                    <Printer className="mr-2" /> Imprimir
                                </Button>
                                <Button onClick={() => handleAction(key as keyof typeof modelos, 'descargar')}>
                                    <Download className="mr-2" /> Descargar
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

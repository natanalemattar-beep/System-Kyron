
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal, Download, Printer, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

const socios = [
    { nombre: "Carlos Alberto Natanale Mattar Hernandez", cedula: "V-32.855.496", rif: "V-32855496-4" },
    { nombre: "Maria Teresa Hernandez Bastidas", cedula: "V-13.374.121", rif: "V-13374121-2" },
    { nombre: "Jose Jesus Herrera Bozzo", cedula: "V-12.459.024", rif: "V-12459024-4" },
    { nombre: "Omar Antonio Mattar Fanianos", cedula: "V-9.488.296", rif: "V-09488296-2" },
];

const getModelos = () => {
    const fecha = formatDate(new Date());
    const listaSocios = socios.map(s => `- ${s.nombre}, C.I. ${s.cedula}, RIF ${s.rif}`).join('\n');

    return {
        espectro: {
            titulo: "Solicitud de Concesión de Espectro Radioeléctrico",
            contenido: `Ciudad y Fecha: ${fecha}

Directorio de la Comisión Nacional de Telecomunicaciones (CONATEL)
Presente.-

ASUNTO: SOLICITUD DE CONCESIÓN PARA EL USO Y EXPLOTACIÓN DE UN SEGMENTO DEL ESPECTRO RADIOELÉCTRICO

Nosotros, los abajo firmantes, en nuestra condición de representantes legales de la empresa KYRON, C.A., RIF J-12345678-9, debidamente registrada, nos dirigimos a ustedes con el debido respeto para solicitar formalmente el otorgamiento de una Concesión para el uso y explotación de un segmento del espectro radioeléctrico.

DATOS DE LOS SOCIOS PRINCIPALES:
${listaSocios}

Nuestra solicitud se fundamenta en el proyecto técnico adjunto, el cual detalla la justificación, alcance y viabilidad de nuestra propuesta para la prestación de servicios de [Describir el servicio, ej: telecomunicaciones móviles, radiodifusión, etc.].

Nos comprometemos a cumplir con toda la normativa vigente establecida en la Ley Orgánica de Telecomunicaciones, sus reglamentos y las providencias administrativas dictadas por este organismo.

Agradeciendo de antemano la atención prestada, quedamos a su disposición para cualquier información adicional.

Atentamente,

_________________________
[REPRESENTANTE LEGAL]
C.I: [C.I. DEL REPRESENTANTE]
KYRON, C.A.
`
        },
        isp: {
            titulo: "Solicitud de Licencia de Proveedor de Servicios de Internet (ISP)",
            contenido: `Ciudad y Fecha: ${fecha}

Directorio de la Comisión Nacional de Telecomunicaciones (CONATEL)
Presente.-

ASUNTO: SOLICITUD DE HABILITACIÓN ADMINISTRATIVA PARA ESTABLECER Y EXPLOTAR UNA RED Y PRESTAR SERVICIOS DE INTERNET (ISP)

Nosotros, los abajo firmantes, en nuestra condición de representantes legales de la empresa KYRON, C.A., RIF J-12345678-9, solicitamos formalmente el otorgamiento de una Habilitación Administrativa para establecernos como Proveedores de Servicios de Internet (ISP) en la República Bolivariana de Venezuela.

DATOS DE LOS SOCIOS PRINCIPALES:
${listaSocios}

Nuestro proyecto técnico y modelo de negocio, que se anexa a la presente, demuestra nuestra capacidad técnica, financiera y operativa para ofrecer un servicio de acceso a Internet de alta calidad, contribuyendo así al desarrollo de las telecomunicaciones en el país.

Manifestamos nuestro compromiso de acatar todas las leyes, reglamentos y providencias que regulan la materia.

A la espera de una respuesta favorable, nos suscribimos.

Atentamente,

_________________________
[REPRESENTANTE LEGAL]
C.I: [C.I. DEL REPRESENTANTE]
KYRON, C.A.
`
        },
        postal: {
            titulo: "Solicitud de Habilitación Postal",
            contenido: `Ciudad y Fecha: ${fecha}

Directorio de la Comisión Nacional de Telecomunicaciones (CONATEL)
Presente.-

ASUNTO: SOLICITUD DE OTORGAMIENTO DE HABILITACIÓN POSTAL

Nosotros, los abajo firmantes, en representación de la sociedad mercantil KYRON, C.A., RIF J-12345678-9, nos dirigimos a este honorable directorio con el fin de solicitar el otorgamiento de la Habilitación Administrativa para la prestación de servicios postales en el territorio nacional.

DATOS DE LOS SOCIOS PRINCIPALES:
${listaSocios}

Nuestra empresa cuenta con la capacidad logística y operativa para ofrecer servicios de [Mencionar tipo de servicio: mensajería, encomienda, etc.] con eficiencia y seguridad, cumpliendo con los estándares de calidad que establece la Ley para el sector postal.

Adjuntamos los recaudos correspondientes para la evaluación de nuestra solicitud.

Agradeciendo su atención,

Atentamente,

_________________________
[REPRESENTANTE LEGAL]
C.I: [C.I. DEL REPRESENTANTE]
KYRON, C.A.
`
        }
    };
};

export default function CartasConatelPage() {
    const { toast } = useToast();
    const modelos = getModelos();

    const handleAction = (organismo: keyof typeof modelos, action: 'imprimir' | 'descargar') => {
        const { contenido } = modelos[organismo];
        if (action === 'imprimir') {
            const printWindow = window.open('', '_blank');
            printWindow?.document.write(`<pre>${contenido}</pre>`);
            printWindow?.document.close();
            printWindow?.print();
            toast({ title: "Impresión Iniciada", description: `El modelo de carta ha sido enviado a la impresora.` });
        } else {
            const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${modelos[organismo].titulo.replace(/ /g, '_')}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast({ title: "Descarga Iniciada", description: `El modelo de carta se está descargando como un archivo de texto.` });
        }
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Signal className="h-8 w-8" />
                    Modelos de Cartas para CONATEL
                </h1>
                <p className="text-muted-foreground mt-2">
                    Genera las solicitudes para los principales permisos de telecomunicaciones.
                </p>
            </header>

            <Tabs defaultValue="espectro" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="espectro">Espectro Radioeléctrico</TabsTrigger>
                    <TabsTrigger value="isp">Licencia de ISP</TabsTrigger>
                    <TabsTrigger value="postal">Habilitación Postal</TabsTrigger>
                </TabsList>
                {Object.entries(modelos).map(([key, modelo]) => (
                    <TabsContent value={key} key={key} className="mt-6">
                        <Card className="bg-card/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>{modelo.titulo}</CardTitle>
                                <CardDescription>
                                    Utiliza esta plantilla para tu solicitud formal ante CONATEL. Completa los datos entre corchetes `[]`.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <pre className="p-6 bg-secondary/50 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto h-[500px]">
                                    {modelo.contenido}
                                </pre>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => handleAction(key as keyof typeof modelos, 'imprimir')}>
                                    <Printer className="mr-2" /> Imprimir
                                </Button>
                                <Button onClick={() => handleAction(key as keyof typeof modelos, 'descargar')}>
                                    <Download className="mr-2" /> Descargar (.txt)
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

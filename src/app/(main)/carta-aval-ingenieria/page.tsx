
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSignature, Download, Printer, HardHat, CheckCircle, Store, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Logo } from "@/components/logo";

const permisosPorTipo = [
    {
        tipo: "Obras Civiles y Construcción",
        icon: HardHat,
        permisos: [
            "Permiso de Construcción de Obra Civil",
            "Permiso de Desmantelamiento de Instalaciones",
            "Conformidad de Uso de Bomberos",
            "Estudio de Impacto Ambiental (si aplica)"
        ]
    },
    {
        tipo: "Restaurantes y Locales de Comida",
        icon: Store,
        permisos: [
            "Permiso Sanitario de Funcionamiento",
            "Conformidad de Uso de Bomberos",
            "Certificado de Manipulación de Alimentos para todo el personal",
            "Conformidad Sanitaria de Habitabilidad"
        ]
    },
    {
        tipo: "Oficinas y Locales Comerciales",
        icon: Building,
        permisos: [
            "Conformidad de Uso de Bomberos",
            "Licencia de Actividades Económicas",
            "Certificado de Uso Conforme (Zonificación)",
        ]
    }
]

export default function CartaAvalIngenieriaPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        ingeniero: "Nombre del Ingeniero",
        civ: "123.456",
        proyecto: "Nombre del Proyecto",
        cliente: "Nombre del Cliente/Empresa",
        direccion: "Dirección Completa del Proyecto",
        fecha: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleAction = (action: string) => {
        const content = `
            <h1>CARTA DE AVAL DE PROYECTO DE INGENIERÍA</h1>
            <p><strong>Fecha:</strong> ${formatDate(formData.fecha)}</p>
            <p><strong>A quien pueda interesar,</strong></p>
            <p>Por medio de la presente, yo, <strong>${formData.ingeniero}</strong>, Ingeniero [Especialidad], titular de la Cédula de Identidad N° [C.I. del Ingeniero] e inscrito en el Colegio de Ingenieros de Venezuela (C.I.V.) bajo el N° <strong>${formData.civ}</strong>, en pleno uso de mis facultades profesionales, certifico y doy fe de lo siguiente:</p>
            <h3>1. OBJETO DEL AVAL</h3>
            <p>He supervisado y revisado exhaustivamente el proyecto denominado "<strong>${formData.proyecto}</strong>", a ser ejecutado para nuestro cliente <strong>${formData.cliente}</strong>, ubicado en la siguiente dirección: <strong>${formData.direccion}</strong>.</p>
            <h3>2. CUMPLIMIENTO TÉCNICO Y NORMATIVO</h3>
            <p>El proyecto cumple a cabalidad con todas las normativas técnicas, códigos de construcción, leyes de ordenación urbanística y regulaciones de seguridad vigentes en la República Bolivariana de Venezuela aplicables a su naturaleza. Se han considerado todos los estándares de calidad y buenas prácticas de la ingeniería para garantizar su correcta ejecución, estabilidad y seguridad.</p>
            <h3>3. CONCLUSIÓN</h3>
            <p>En virtud de lo anteriormente expuesto, avalo técnicamente la viabilidad y correcta formulación del proyecto "<strong>${formData.proyecto}</strong>". Esta certificación se expide a solicitud de la parte interesada para los fines que estime convenientes.</p>
            <div style="padding-top: 5rem; text-align: center;">
                <p style="border-top: 1px solid black; display: inline-block; padding: 0.5rem 3rem;">Firma del Ingeniero</p>
                <p>${formData.ingeniero}</p>
                <p>C.I.V. N° ${formData.civ}</p>
            </div>
        `;
        const filename = 'Carta_Aval_Ingenieria.doc';
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<div style="font-family: Arial, sans-serif;">${content.replace(/\n/g, '<br/>')}</div>` + footer;

        if (action === 'impresa') {
            window.print();
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
            title: `Carta de Aval ${action}`,
            description: `El documento ha sido ${action === 'impresa' ? 'enviado a la impresora' : 'descargado como .doc'}.`,
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
                }
            `}
        </style>
      <header className="mb-8 flex items-center justify-between print:hidden">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <HardHat className="h-8 w-8" />
                Carta Aval de Ingeniería y Permisos
            </h1>
            <p className="text-muted-foreground mt-2">
              Genera la carta aval de un proyecto y consulta los permisos necesarios según el tipo de comercio.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impresa')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={() => handleAction('descargado')}>
                <Download className="mr-2"/> Descargar (.doc)
            </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 print:hidden">
             <Card className="bg-card/50 backdrop-blur-sm sticky top-24">
                <CardHeader>
                    <CardTitle>Datos de la Carta Aval</CardTitle>
                    <CardDescription>Completa la información para generar el documento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ingeniero">Nombre del Ingeniero Responsable</Label>
                        <Input id="ingeniero" value={formData.ingeniero} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="civ">N° de Colegiado (C.I.V.)</Label>
                        <Input id="civ" value={formData.civ} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="proyecto">Nombre del Proyecto</Label>
                        <Input id="proyecto" value={formData.proyecto} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="cliente">Cliente / Empresa</Label>
                        <Input id="cliente" value={formData.cliente} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección del Proyecto</Label>
                        <Input id="direccion" value={formData.direccion} onChange={handleInputChange} />
                    </div>
                </CardContent>
            </Card>
        </div>
        <div id="printable-content" className="lg:col-span-2">
            <div className="oficio-document">
                <Card className="bg-card/90 backdrop-blur-sm shadow-xl print:shadow-none print:border-none print:bg-white dark:print:bg-black">
                    <CardHeader className="text-center p-8">
                        <CardTitle className="text-2xl">CARTA DE AVAL DE PROYECTO DE INGENIERÍA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify">
                        <p>
                            <strong>Fecha:</strong> ${formatDate(formData.fecha)}
                        </p>
                        <p>
                            <strong>A quien pueda interesar,</strong>
                        </p>
                        <p>
                            Por medio de la presente, yo, <strong>${formData.ingeniero}</strong>, Ingeniero [Especialidad], titular de la Cédula de Identidad N° [C.I. del Ingeniero] e inscrito en el Colegio de Ingenieros de Venezuela (C.I.V.) bajo el N° <strong>${formData.civ}</strong>, en pleno uso de mis facultades profesionales, certifico y doy fe de lo siguiente:
                        </p>

                        <h4>1. OBJETO DEL AVAL</h4>
                        <p>
                            He supervisado y revisado exhaustivamente el proyecto denominado "<strong>${formData.proyecto}</strong>", a ser ejecutado para nuestro cliente <strong>${formData.cliente}</strong>, ubicado en la siguiente dirección: <strong>${formData.direccion}</strong>.
                        </p>

                        <h4>2. CUMPLIMIENTO TÉCNICO Y NORMATIVO</h4>
                        <p>
                            El proyecto cumple a cabalidad con todas las normativas técnicas, códigos de construcción, leyes de ordenación urbanística y regulaciones de seguridad vigentes en la República Bolivariana de Venezuela aplicables a su naturaleza. Se han considerado todos los estándares de calidad y buenas prácticas de la ingeniería para garantizar su correcta ejecución, estabilidad y seguridad.
                        </p>
                        
                        <h4>3. CONCLUSIÓN</h4>
                        <p>
                           En virtud de lo anteriormente expuesto, avalo técnicamente la viabilidad y correcta formulación del proyecto "<strong>${formData.proyecto}</strong>". Esta certificación se expide a solicitud de la parte interesada para los fines que estime convenientes.
                        </p>

                        <div className="pt-24 text-center">
                            <p className="border-t-2 border-foreground inline-block px-12 pt-2">Firma del Ingeniero</p>
                            <p className="font-semibold mt-1">${formData.ingeniero}</p>
                            <p className="text-xs">C.I.V. N° ${formData.civ}</p>
                        </div>

                    </CardContent>
                    <CardFooter className="p-6 justify-center border-t print:hidden">
                        <p className="text-xs text-muted-foreground">Este documento es un modelo. Debe ser firmado por un profesional colegiado para tener validez.</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
      
       <section className="mt-12 print:hidden">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Guía de Permisos por Tipo de Comercio</CardTitle>
                    <CardDescription>Consulta los permisos de ingeniería y funcionamiento más comunes según tu actividad económica.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        ${permisosPorTipo.map((tipo) => `
                            <AccordionItem value="${tipo.tipo}" key="${tipo.tipo}">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 font-semibold text-lg">
                                        <${tipo.icon.displayName} className="h-5 w-5 text-primary"/>
                                        <span>${tipo.tipo}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="pl-10 space-y-3 text-muted-foreground list-disc">
                                        ${tipo.permisos.map(permiso => `
                                            <li key="${permiso}">${permiso}</li>
                                        `).join('')}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        `).join('')}
                    </Accordion>
                </CardContent>
            </Card>
       </section>

    </div>
  );
}

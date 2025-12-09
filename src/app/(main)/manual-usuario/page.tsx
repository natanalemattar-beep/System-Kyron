
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { BookUser, Download, ChevronsRight, User, Building, FileText, Printer, Ship, Stamp, Gavel } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { formatDate } from "@/lib/utils";

const juridicoFeatures = [
    {
        title: "Legalización de Empresa",
        description: "Guía paso a paso para constituir tu empresa desde cero, incluyendo la reserva de nombre y el registro mercantil.",
        icon: Stamp,
    },
    {
        title: "Gestión de Permisos",
        description: "Controla y renueva todas tus licencias y permisos para operar sin contratiempos.",
        icon: Gavel,
    },
    {
        title: "Contabilidad y Fiscal",
        description: "Genera libros contables, gestiona el IVA, ISLR y cumple con todas las obligaciones del SENIAT.",
        icon: FileText,
    },
     {
        title: "Recursos Humanos",
        description: "Administra nóminas, contratos, beneficios y todo lo relacionado con la gestión de tu personal.",
        icon: UserCog,
    },
];

const naturalFeatures = [
    {
        title: "Trámites Civiles",
        description: "Solicita y gestiona tus documentos personales como partidas de nacimiento, actas de matrimonio y antecedentes penales.",
        icon: User,
    },
    {
        title: "Obligaciones (LOPNNA)",
        description: "Gestiona la obligación de manutención y el registro de RIF para menores de edad, cumpliendo con la ley.",
        icon: Gavel,
    }
];


export default function ManualUsuarioPage() {
    const { toast } = useToast();
    
    const handlePrint = () => {
        window.print();
        toast({
            title: "Impresión Iniciada",
            description: "El manual se está preparando para la impresión.",
        });
    }

    const getManualContent = () => `
        <h1>Manual de Usuario y Procedimientos - Kyron</h1>
        <p><strong>Fecha:</strong> ${formatDate(new Date())}</p>
        <br/>
        <h2>Bienvenido a Kyron</h2>
        <p>La plataforma digital oficial para la gestión integral de trámites para personas jurídicas y naturales en Venezuela. Nuestra misión es simplificar la burocracia, centralizando todos tus documentos y procesos en un solo lugar.</p>
        
        <br/>
        <h2>Primeros Pasos: Registro e Inicio de Sesión</h2>
        <ol>
            <li><strong>Registro:</strong> En la página de inicio, haz clic en "Registrarse". Selecciona si eres Persona Jurídica o Natural y completa los datos. Recibirás un código de verificación en tu correo.</li>
            <li><strong>Inicio de Sesión:</strong> Una vez registrado, ingresa tu RIF (empresas) o Cédula (personas) y tu contraseña.</li>
        </ol>

        <br/>
        <h2>Funcionalidades para Persona Jurídica</h2>
        <ul>
            ${juridicoFeatures.map(f => `<li><strong>${f.title}:</strong> ${f.description}</li>`).join('')}
        </ul>
        
        <br/>
        <h2>Funcionalidades para Persona Natural</h2>
        <ul>
            ${naturalFeatures.map(f => `<li><strong>${f.title}:</strong> ${f.description}</li>`).join('')}
        </ul>

        <br/>
        <h2>Manual de Procedimientos Clave</h2>
        <h3>Gestión de Devoluciones</h3>
        <ol>
            <li>Para anular una factura, navega a 'Nota de Crédito' y referencia la factura afectada.</li>
            <li>El sistema te guiará para registrar el reingreso del producto al inventario.</li>
            <li>Si el cliente ya había pagado, el sistema registrará un saldo a su favor en 'Cuentas por Cobrar'.</li>
        </ol>
        
        <h3>Legalización de Empresas</h3>
        <ol>
            <li><strong>Reserva de Nombre (SAREN):</strong> Verifica la disponibilidad del nombre.</li>
            <li><strong>Acta Constitutiva:</strong> Redacta y visa el documento con un abogado.</li>
            <li><strong>Registro Mercantil:</strong> Inscribe el acta para legalizar la empresa.</li>
            <li><strong>Publicación:</strong> Publica el acta en un periódico mercantil.</li>
            <li><strong>Inscripción Fiscal (RIF):</strong> Registra la empresa en el SENIAT.</li>
        </ol>

        <h3>Proceso de Importación</h3>
        <ol>
            <li><strong>Verificación del Proveedor:</strong> Encuentra y negocia con un proveedor confiable.</li>
            <li><strong>Consolidación de Carga:</strong> Agrupa mercancía de varios proveedores.</li>
            <li><strong>Embarque y Transporte:</strong> La carga se envía y se emite el Bill of Lading (BL).</li>
            <li><strong>Gestión Aduanal:</strong> Nuestros agentes se encargan de la nacionalización.</li>
            <li><strong>Entrega Final:</strong> Se transporta la mercancía liberada a tu negocio.</li>
        </ol>
    `;

    const handleDownload = () => {
        const content = getManualContent();
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Manual_Kyron.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Descarga Iniciada",
            description: "El manual de usuario ha sido descargado.",
        });
    }

  return (
    <div className="space-y-8">
        <style>
            {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-manual, #printable-manual * {
                        visibility: visible;
                    }
                    #printable-manual {
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
                    <BookUser className="h-8 w-8" />
                    Manual de Usuario y Procedimientos
                </h1>
                <p className="text-muted-foreground mt-2">
                    Tu guía completa para aprovechar al máximo la plataforma y estandarizar operaciones.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2" />
                    Descargar (.doc)
                </Button>
                <Button onClick={handlePrint}>
                    <Printer className="mr-2" />
                    Imprimir Manual
                </Button>
            </div>
        </header>

        <div id="printable-manual">
            <Card className="print:shadow-none print:border-none">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Manual de Usuario y Procedimientos del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                     <p className="text-lg text-muted-foreground">Bienvenido a Kyron, la plataforma digital oficial para la gestión integral de trámites para personas jurídicas y naturales en Venezuela. Nuestra misión es simplificar la burocracia, centralizando todos tus documentos y procesos en un solo lugar.</p>
                </CardContent>
            </Card>

             <Card className="mt-8 print:shadow-none print:border">
                <CardHeader>
                    <CardTitle>Primeros Pasos: Registro e Inicio de Sesión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <div>
                            <h3 className="font-semibold">Registro</h3>
                            <p className="text-muted-foreground">En la página de inicio, haz clic en "Registrarse". Selecciona si eres Persona Jurídica o Natural y completa los datos solicitados. Recibirás un código de verificación en tu correo para activar tu cuenta.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <div>
                            <h3 className="font-semibold">Inicio de Sesión</h3>
                            <p className="text-muted-foreground">Una vez registrado, ve a "Iniciar Sesión". Ingresa tu RIF (para empresas) o Cédula (para personas) y tu contraseña para acceder a tu dashboard personalizado.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8">
                 <h2 className="text-2xl font-bold text-center mb-6">Funcionalidades del Sistema</h2>
                <div className="grid md:grid-cols-2 gap-8">
                     <Card className="print:shadow-none print:border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" /> Para Personas Jurídicas (Empresas)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {juridicoFeatures.map(feature => (
                                <div key={feature.title} className="p-4 bg-secondary/50 rounded-lg">
                                    <h4 className="font-semibold flex items-center gap-2"><feature.icon className="h-4 w-4 text-primary"/>{feature.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card className="print:shadow-none print:border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Para Personas Naturales</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            {naturalFeatures.map(feature => (
                                <div key={feature.title} className="p-4 bg-secondary/50 rounded-lg">
                                     <h4 className="font-semibold flex items-center gap-2"><feature.icon className="h-4 w-4 text-primary"/>{feature.title}</h4>
                                     <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="mt-8 print:shadow-none print:border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Manual de Procedimientos Clave</CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="devoluciones">
                            <AccordionTrigger>Gestión de Devoluciones</AccordionTrigger>
                            <AccordionContent>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Para anular una factura original, navega a 'Nota de Crédito', crea un nuevo documento y referencia la factura afectada.</li>
                                    <li>Una vez emitida la nota de crédito, el sistema te guiará para registrar el reingreso del producto al inventario.</li>
                                    <li>Si el cliente ya había pagado, el sistema registrará un saldo a su favor en 'Cuentas por Cobrar'.</li>
                                </ol>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="legalizacion">
                            <AccordionTrigger>Legalización de Empresas</AccordionTrigger>
                            <AccordionContent>
                                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li><span className="font-semibold text-foreground">Reserva de Nombre (SAREN):</span> Verifica la disponibilidad del nombre de la empresa.</li>
                                    <li><span className="font-semibold text-foreground">Acta Constitutiva:</span> Redacta y visa el documento con un abogado.</li>
                                    <li><span className="font-semibold text-foreground">Registro Mercantil:</span> Inscribe el acta para legalizar la empresa.</li>
                                    <li><span className="font-semibold text-foreground">Publicación:</span> Publica el acta en un periódico mercantil.</li>
                                    <li><span className="font-semibold text-foreground">Inscripción Fiscal (RIF):</span> Registra la empresa en el SENIAT.</li>
                                </ol>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="importacion">
                            <AccordionTrigger>Proceso de Importación</AccordionTrigger>
                            <AccordionContent>
                                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li><span className="font-semibold text-foreground">Verificación del Proveedor:</span> Encuentra y negocia con un proveedor confiable.</li>
                                    <li><span className="font-semibold text-foreground">Consolidación de Carga:</span> Agrupa mercancía de varios proveedores en un solo envío.</li>
                                    <li><span className="font-semibold text-foreground">Embarque y Transporte:</span> La carga se envía y se emite el Bill of Lading (BL).</li>
                                    <li><span className="font-semibold text-foreground">Gestión Aduanal:</span> Nuestros agentes se encargan de la nacionalización.</li>
                                    <li><span className="font-semibold text-foreground">Entrega Final:</span> Se transporta la mercancía liberada a tu negocio.</li>
                                </ol>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
             <CardFooter className="mt-8 flex justify-between items-end p-6 border-t print:pt-12">
                <div>
                    <p className="font-semibold">Kyron, C.A.</p>
                    <p className="text-sm text-muted-foreground">RIF: J-12345678-9</p>
                </div>
                <div className="text-center">
                    <Image src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://kyron.com/manual" alt="QR Code para el manual" width={80} height={80} />
                    <p className="text-xs text-muted-foreground mt-1">Escanear para ver en línea</p>
                </div>
            </CardFooter>
        </div>
    </div>
  );
}

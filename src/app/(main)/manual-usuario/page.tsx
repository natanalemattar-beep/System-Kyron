
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookUser, Download, ChevronsRight, User, Building, FileText, Printer, Ship, Stamp, Gavel } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const juridicoFeatures = [
    "Legalización de Empresa: Guía paso a paso para constituir tu empresa.",
    "Gestión de Permisos: Controla y renueva todas tus licencias y permisos.",
    "Contabilidad y Fiscal: Genera libros contables y declara impuestos (IVA, ISLR).",
    "Recursos Humanos: Administra nóminas y contratos.",
];

const naturalFeatures = [
    "Documentos Civiles: Solicita partidas de nacimiento y actas de matrimonio.",
    "Trámites Personales: Gestiona antecedentes penales y documentos judiciales.",
    "Notificaciones: Recibe alertas sobre el estado de tus solicitudes.",
];

const reportFeatures = [
    "Selección del Tipo de Reporte: Elige entre Balance General, Estado de Resultados, Flujo de Caja, etc.",
    "Definición de Período y Filtros: Personaliza los reportes por rango de fechas, categorías o sucursales.",
    "Visualización y Exportación: Visualiza los datos en gráficos interactivos y exporta a PDF o Excel.",
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

  return (
    <div className="p-4 md:p-8">
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
            <Button onClick={handlePrint}>
                <Printer className="mr-2" />
                Imprimir Manual
            </Button>
        </header>

        <div id="printable-manual">
            <Card className="bg-card/50 backdrop-blur-sm print:shadow-none print:border-none">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Manual de Usuario y Procedimientos del Sistema</CardTitle>
                    <CardDescription>Bienvenido a System C.M.S, la plataforma digital oficial para la gestión integral de trámites para personas jurídicas y naturales en Venezuela.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center">Nuestra misión es simplificar la burocracia, centralizando todos tus documentos y procesos en un solo lugar. Con nuestra plataforma, puedes registrar tu empresa, gestionar permisos, cumplir con tus obligaciones fiscales, administrar a tu personal y mucho más.</p>
                </CardContent>
            

                 <Card className="bg-card/50 backdrop-blur-sm mt-8 print:shadow-none print:border">
                    <CardHeader>
                        <CardTitle>Primeros Pasos: Registro e Inicio de Sesión</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <ChevronsRight className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Registro</h3>
                                <p className="text-muted-foreground">En la página de inicio, haz clic en "Registrarse". Selecciona si eres Persona Jurídica o Natural y completa los datos solicitados. Recibirás un código de verificación en tu correo para activar tu cuenta.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <ChevronsRight className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Inicio de Sesión</h3>
                                <p className="text-muted-foreground">Una vez registrado, ve a "Iniciar Sesión". Ingresa tu RIF (para empresas) o Cédula (para personas) y tu contraseña para acceder a tu dashboard personalizado.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                     <Card className="bg-card/50 backdrop-blur-sm print:shadow-none print:border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" /> Módulos Clave (Persona Jurídica)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {juridicoFeatures.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 backdrop-blur-sm print:shadow-none print:border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Módulos Clave (Persona Natural)</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <ul className="space-y-3">
                                {naturalFeatures.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                 <Card className="bg-card/50 backdrop-blur-sm mt-8 print:shadow-none print:border">
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
                        <p className="font-semibold">System C.M.S, C.A.</p>
                        <p className="text-sm text-muted-foreground">RIF: J-12345678-9</p>
                    </div>
                    <div className="text-center">
                        <Image src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://systemcms.com/manual" alt="QR Code para el manual" width={80} height={80} />
                        <p className="text-xs text-muted-foreground mt-1">Escanear para ver en línea</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}

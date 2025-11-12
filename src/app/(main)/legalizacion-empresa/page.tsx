
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Newspaper, Search, Stamp, Users, ArrowRight, ShieldCheck, Upload, DollarSign, Globe, Printer, Download, Gavel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const initialPasos = [
    { 
        paso: 1,
        titulo: "Reserva de Nombre y Denominación Social",
        descripcion: "Se realiza ante el SAREN para verificar que el nombre elegido para la empresa esté disponible.",
        ente: "SAREN",
        estado: "Completado",
        icon: Search,
        arancel: 150
    },
    { 
        paso: 2,
        titulo: "Redacción y Visado del Acta Constitutiva",
        descripcion: "Un abogado debe redactar el documento constitutivo, especificando el capital, los socios y los estatutos de la empresa.",
        ente: "Abogado Colegiado",
        estado: "Completado",
        icon: FileText,
        arancel: 0
    },
    { 
        paso: 3,
        titulo: "Inscripción en el Registro Mercantil",
        descripcion: "Se presenta el acta constitutiva visada ante el Registro Mercantil correspondiente para su inscripción y legalización.",
        ente: "SAREN / Registro Mercantil",
        estado: "Pendiente",
        icon: Stamp,
        arancel: 1250
    },
    { 
        paso: 4,
        titulo: "Publicación en un Periódico Mercantil",
        descripcion: "Una vez inscrita, el acta constitutiva debe publicarse en un periódico mercantil para darle validez pública.",
        ente: "Periódico Mercantil",
        estado: "Pendiente",
        icon: Newspaper,
        arancel: 300
    },
     { 
        paso: 5,
        titulo: "Inscripción en el RIF (SENIAT)",
        descripcion: "Con el acta registrada y publicada, se procede a inscribir la empresa en el Registro de Información Fiscal (RIF).",
        ente: "SENIAT",
        estado: "Pendiente",
        icon: ShieldCheck,
        arancel: 0
    },
    { 
        paso: 6,
        titulo: "Inscripciones Parafiscales Obligatorias",
        descripcion: "Inscribir la empresa en el IVSS, BANAVIH (FAOV), INPSASEL y el Registro Nacional de Entidades de Trabajo (RNET).",
        ente: "IVSS, BANAVIH, INPSASEL, MPPPST",
        estado: "Pendiente",
        icon: Users,
        arancel: 0
    },
     { 
        paso: 7,
        titulo: "Apostilla de Documentos para Uso Internacional",
        descripcion: "Se apostillan el Acta Constitutiva y otros documentos clave para darles validez legal en países firmantes del Convenio de La Haya.",
        ente: "Ministerio de Relaciones Exteriores (MPPRE)",
        estado: "Pendiente",
        icon: Globe,
        arancel: 540
    },
];

type Paso = typeof initialPasos[0];

const statusInfo = {
    Completado: { icon: CheckCircle, color: "text-green-500", label: "Completado" },
    Pendiente: { icon: Clock, color: "text-yellow-500", label: "Pendiente" },
};


export default function LegalizacionEmpresaPage() {
    const { toast } = useToast();
    const [pasos, setPasos] = useState(initialPasos);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleProcessStep = (pasoId: number, titulo: string) => {
        setPasos(prevPasos => prevPasos.map(p => p.paso === pasoId ? { ...p, estado: "Completado" } : p));
        setSelectedFile(null);
        toast({
            title: "Trámite Procesado Exitosamente",
            description: `El paso "${titulo}" ha sido marcado como completado y notificado.`,
            action: <CheckCircle className="text-green-500" />
        });
    };
    
    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        toast({
            title: "Documento Cargado",
            description: `"${file.name}" está listo para ser procesado.`
        });
    }

    const handleActaAction = (action: string) => {
        toast({
            title: `Acta Constitutiva ${action}`,
            description: `El modelo de acta ha sido ${action === 'impresa' ? 'enviado a la impresora' : 'descargado como archivo de texto'}.`,
        });
        if (action === 'impresa') {
            const printableArea = document.getElementById('acta-constitutiva');
            if (printableArea) {
                const printWindow = window.open('', '', 'height=800,width=800');
                printWindow?.document.write('<html><head><title>Acta Constitutiva</title>');
                printWindow?.document.write('<style>body { font-family: serif; line-height: 1.5; margin: 2in; } h4 { text-align: center; } p { text-align: justify; margin-bottom: 1rem; }</style>');
                printWindow?.document.write('</head><body>');
                printWindow?.document.write(printableArea.innerHTML);
                printWindow?.document.write('</body></html>');
                printWindow?.document.close();
                printWindow?.print();
            }
        } else {
             const content = document.getElementById('acta-constitutiva')?.innerText || '';
             const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
             const link = document.createElement('a');
             link.href = URL.createObjectURL(blob);
             link.download = 'Modelo_Acta_Constitutiva.txt';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
        }
    };


  return (
    <div className="space-y-12">
      <header className="mb-8 print:hidden">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Stamp className="h-8 w-8" />
            Legalización de Empresa
        </h1>
        <p className="text-muted-foreground mt-2">
          Sigue y ejecuta los pasos para la constitución y legalización de tu empresa en Venezuela.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm print:hidden">
        <CardHeader>
            <CardTitle>Flujo de Legalización</CardTitle>
            <CardDescription>Sigue este flujo de trabajo para registrar formalmente tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative pl-6">
                <div className="absolute left-9 top-0 h-full w-0.5 bg-border -z-10"></div>
                
                {pasos.map((paso) => {
                     const status = statusInfo[paso.estado as keyof typeof statusInfo];
                     const esTramiteSaren = paso.ente.includes("SAREN") || paso.ente.includes("MPPRE");

                     return (
                        <div key={paso.paso} className="relative flex items-start gap-6 pb-12">
                            <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full shrink-0 ${paso.estado === 'Completado' ? 'bg-green-500' : 'bg-secondary'}`}>
                                <paso.icon className={`h-6 w-6 ${paso.estado === 'Completado' ? 'text-white' : 'text-primary'}`} />
                            </div>

                            <div className="flex-1 pt-2">
                                <h3 className="text-lg font-semibold">{paso.titulo}</h3>
                                <p className="text-sm text-muted-foreground mt-1 mb-3">Ente responsable: <span className="font-medium">{paso.ente}</span></p>
                                <p className="text-sm">{paso.descripcion}</p>
                                
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                     <div className={`flex items-center gap-2 text-sm font-semibold ${status.color}`}>
                                        <status.icon className="h-4 w-4" />
                                        <span>{status.label}</span>
                                    </div>
                                    {paso.estado === 'Pendiente' && esTramiteSaren && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm">
                                                    Iniciar Trámite <ArrowRight className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Procesar: {paso.titulo}</DialogTitle>
                                                    <DialogDescription>Carga el documento requerido y paga el arancel para procesar este trámite.</DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4 space-y-6">
                                                     <div className="space-y-2">
                                                        <Label>1. Cargar Documento Requerido</Label>
                                                        <FileInputTrigger onFileSelect={handleFileSelect}>
                                                            <Button variant="outline" className="w-full">
                                                                <Upload className="mr-2 h-4 w-4" />
                                                                {selectedFile ? selectedFile.name : "Seleccionar Archivo (PDF, DOCX)"}
                                                            </Button>
                                                        </FileInputTrigger>
                                                     </div>
                                                      <div className="space-y-2">
                                                        <Label>2. Pagar Arancel</Label>
                                                        <div className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="h-5 w-5 text-green-500" />
                                                                <span className="font-medium">Monto a Pagar:</span>
                                                            </div>
                                                            <span className="font-bold text-lg">{formatCurrency(paso.arancel, "Bs.")}</span>
                                                        </div>
                                                     </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button 
                                                        onClick={() => handleProcessStep(paso.paso, paso.titulo)} 
                                                        disabled={!selectedFile}
                                                        className="w-full"
                                                    >
                                                        Pagar y Procesar
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        </div>
                     )
                })}

            </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm print:shadow-none print:border-none">
        <CardHeader>
            <CardTitle>Modelo de Acta Constitutiva (Compañía Anónima)</CardTitle>
            <CardDescription>Utiliza esta plantilla como base para redactar el documento de tu empresa. Este formato está diseñado para adaptarse a papel de tamaño legal.</CardDescription>
        </CardHeader>
        <CardContent id="acta-constitutiva" className="prose prose-sm dark:prose-invert max-w-none text-justify p-8 border rounded-lg bg-background">
                <h4>ACTA CONSTITUTIVA Y ESTATUTOS SOCIALES DE LA COMPAÑÍA ANÓNIMA<br/>"[NOMBRE DE LA EMPRESA], C.A."</h4>
                <p>Nosotros, [NOMBRE DEL SOCIO 1], [nacionalidad], mayor de edad, de este domicilio, titular de la Cédula de Identidad N° [CI del Socio 1], y [NOMBRE DEL SOCIO 2], [nacionalidad], mayor de edad, de este domicilio, titular de la Cédula de Identidad N° [CI del Socio 2], por medio del presente documento declaramos que hemos convenido en constituir, como en efecto lo hacemos, una Compañía Anónima que se regirá por las disposiciones contenidas en este documento y por las demás leyes aplicables.</p>
                
                <h4>TÍTULO I: DENOMINACIÓN, DOMICILIO, OBJETO Y DURACIÓN</h4>
                <p><strong>CLÁUSULA PRIMERA:</strong> La compañía se denominará "[NOMBRE DE LA EMPRESA], C.A.".</p>
                <p><strong>CLÁUSULA SEGUNDA:</strong> El domicilio de la compañía estará en la ciudad de [Ciudad], Estado [Estado], República Bolivariana de Venezuela, pudiendo establecer sucursales o agencias en cualquier otro lugar del país o del extranjero.</p>
                <p><strong>CLÁUSULA TERCERA:</strong> El objeto de la compañía es la asesoría contable, sistema de financiamiento, asesoría de publicidad y marketing, con sistema de app digital de cambio de moneda, asesoría de clases de materia contable, app de todas las carrera con asesoria de profesionales de la materia, venta de productos online, una línea de productos fiscales, y papeleras con distribución de su propia marca.</p>
                <p><strong>CLÁUSULA CUARTA:</strong> La duración de la compañía será de cincuenta (50) años, contados a partir de la fecha de su inscripción en el Registro Mercantil.</p>

                <h4>TÍTULO II: DEL CAPITAL SOCIAL Y LAS ACCIONES</h4>
                <p><strong>CLÁUSULA QUINTA:</strong> El Capital Social es de [MONTO DEL CAPITAL EN LETRAS] ([Bs. MONTO EN NÚMEROS]), dividido en [NÚMERO DE ACCIONES] acciones nominativas no convertibles al portador, con un valor nominal de [VALOR NOMINAL] cada una.</p>
                <p><strong>CLÁUSULA SEXTA:</strong> El capital ha sido suscrito y pagado en su totalidad por los socios de la siguiente manera: [NOMBRE DEL SOCIO 1] ha suscrito y pagado [NÚMERO DE ACCIONES SOCIO 1] acciones; y [NOMBRE DEL SOCIO 2] ha suscrito y pagado [NÚMERO DE ACCIONES SOCIO 2] acciones.</p>

                <h4>TÍTULO III: DE LA ADMINISTRACIÓN DE LA COMPAÑÍA</h4>
                <p><strong>CLÁUSULA SÉPTIMA:</strong> La administración de la compañía estará a cargo de una Junta Directiva compuesta por un (1) Presidente y un (1) Vicepresidente, que serán los mismos socios fundadores. [NOMBRE DEL SOCIO 1] ejercerá el cargo de Presidente y [NOMBRE DEL SOCIO 2] el cargo de Vicepresidente.</p>
                
                <h4>TÍTULO IV: DE LAS ASAMBLEAS</h4>
                <p><strong>CLÁUSULA OCTAVA:</strong> Las Asambleas de Accionistas serán Ordinarias o Extraordinarias y sus decisiones, tomadas dentro de los límites de sus facultades, son obligatorias para todos los accionistas.</p>

                <h4>TÍTULO V: DEL EJERCICIO ECONÓMICO Y BALANCES</h4>
                <p><strong>CLÁUSULA NOVENA:</strong> El ejercicio económico de la compañía comenzará el primero (1°) de Enero y terminará el treinta y uno (31) de Diciembre de cada año, con excepción del primer ejercicio que comenzará con la inscripción de la compañía en el Registro Mercantil.</p>

                <h4>TÍTULO VI: DEL COMISARIO</h4>
                <p><strong>CLÁUSULA DÉCIMA:</strong> La compañía tendrá un Comisario, con su respectivo suplente, que será elegido por la Asamblea de Accionistas y durará en sus funciones [período].</p>

                <h4>TÍTULO VII: DE LA DISOLUCIÓN Y LIQUIDACIÓN</h4>
                <p><strong>CLÁUSULA UNDÉCIMA:</strong> La compañía se disolverá por las causas previstas en el Código de Comercio o por decisión de una Asamblea Extraordinaria de Accionistas.</p>

                <p>Se designa como Comisario al Licenciado(a) [Nombre del Comisario], de nacionalidad [nacionalidad], titular de la C.I. N° [CI del Comisario] e inscrito en el Colegio de Contadores Públicos bajo el N° [CPC del Comisario].</p>
                
                <p>En la ciudad de [Ciudad], a la fecha de su presentación.</p>
        </CardContent>
        <CardFooter className="print:hidden p-4">
             <div className="flex w-full gap-2 justify-end">
                <Button variant="outline" onClick={() => handleActaAction('impresa')}>
                    <Printer className="mr-2"/> Imprimir Acta
                </Button>
                <Button onClick={() => handleActaAction('descargado')}>
                    <Download className="mr-2"/> Descargar (.txt)
                </Button>
            </div>
        </CardFooter>
      </Card>

    </div>
  );
}

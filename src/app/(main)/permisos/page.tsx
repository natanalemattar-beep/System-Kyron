
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, PlusCircle, Download, RefreshCw, Eye, CheckCircle, FileUp, Info, Mail, MessageSquare, Gavel, Stamp, FileEdit, BookOpen, Link as LinkIcon, Newspaper, UserCog, Calendar, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Route } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { initialPermisos, companyData } from "@/lib/permisos-data";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
  "Nuevo": "outline",
};

const formatDateString = (dateString: string) => {
    if (!dateString || dateString === "N/A" || dateString === "Indefinido" || dateString === "Vitalicio") return dateString;
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

type Payment = {
    id: number;
    fecha: string;
    monto: number;
    referencia: string;
};

type Permiso = typeof initialPermisos[0];

const getLetterContent = (permiso: Permiso | null): string => {
    if (!permiso) return "";

    const fechaActual = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    const baseContent = `
Ciudad, ${'${fechaActual}'}

Señores
${'${permiso.emisor}'}
Presente.-

Asunto: Solicitud de Permiso - ${'${permiso.tipo}'}

Por medio de la presente, [Nombre del Representante Legal], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF [RIF de la Empresa], me dirijo a ustedes con el debido respeto para solicitar formalmente la tramitación y otorgamiento del permiso de "${'${permiso.tipo}'}".
`;

    let recaudosContent = '';
    switch (permiso.id) {
        case 'PERM-SAPI-001':
            recaudosContent = `
Adjunto a la presente, consignamos los siguientes recaudos:
- Resultados de la búsqueda de antecedentes fonéticos.
- Resultados de la búsqueda de antecedentes gráficos.
- Diseño del logo propuesto en formato digital (JPG/PNG).
- Comprobante de pago de las tasas correspondientes.
`;
            break;
        case 'PERM-SAPI-INV-001':
            recaudosContent = `
Adjunto a la presente, consignamos los siguientes recaudos técnicos y administrativos:
- Formulario de solicitud (FP-01) debidamente cumplimentado.
- Memoria descriptiva detallada del invento.
- Pliego de reivindicaciones que define el alcance de la protección solicitada.
- Dibujos técnicos, si son necesarios para la comprensión del invento.
- Resumen de la invención.
- Comprobante de pago de la tasa de presentación.
`;
            break;
         case 'PERM-SAPI-DA-001':
            recaudosContent = `
Adjunto a la presente, consignamos los siguientes recaudos para el registro de la obra:
- Un (1) ejemplar de la obra a registrar.
- Formulario de solicitud de registro debidamente llenado.
- Comprobante de pago de las tasas administrativas correspondientes.
`;
            break;
        default:
            recaudosContent = `
Adjuntamos todos los recaudos necesarios para procesar dicha solicitud.
`;
            break;
    }


    return baseContent + recaudosContent + `
Sin otro particular al que hacer referencia,

Atentamente,

_________________________
[Nombre del Representante Legal]
C.I: [C.I. del Representante]
`;
};

const getPlanillaResguardoTemporalContent = () => `
----------------------------------------------------------------------
        SOLICITUD DE RESGUARDO TEMPORAL DE LA INVENCIÓN (FP-01)
----------------------------------------------------------------------
Servicio Autónomo de la Propiedad Intelectual (SAPI)

FECHA DE SOLICITUD: ${"$'{"}new Date().toLocaleDateString('es-ES'){"}"}

1. DATOS DEL SOLICITANTE:
   Nombre/Razón Social: Kyron, C.A.
   RIF: J-12345678-9
   Domicilio: Av. Principal, Edif. Centro, Piso 1, Caracas, Venezuela
   Teléfono: +58 212-1234567
   Email: legal@kyron.com

2. DATOS DEL INVENTOR (si es distinto al solicitante):
   Nombre: _________________________
   C.I./Pasaporte: _________________________
   Domicilio: _________________________

3. TÍTULO DE LA INVENCIÓN:
   [Título claro y conciso de la invención, ej: "Sistema de Clasificación Automatizada de Residuos Sólidos mediante Visión por Computadora"]

4. DESCRIPCIÓN SUCINTA DE LA INVENCIÓN:
   [Breve descripción del propósito y funcionamiento de la invención. Este campo debe ser llenado por el solicitante.]
   ______________________________________________________________________
   ______________________________________________________________________
   ______________________________________________________________________

5. RECAUDOS CONSIGNADOS:
   [X] Formulario de solicitud.
   [X] Descripción detallada de la invención.
   [X] Comprobante de pago de la tasa administrativa.

DECLARACIÓN:
Declaro bajo juramento que la información aquí suministrada es cierta y que soy el inventor/representante legal con derecho sobre esta invención.

_________________________
Firma del Solicitante / Representante Legal
`;

export default function PermisosPage() {
  const [permisos, setPermisos] = useState(initialPermisos);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [payments, setPayments] = useState<Record<string, Payment[]>>({
      "PERM-MUN-001": [
          { id: 1, fecha: '2024-03-01', monto: 500, referencia: 'PAGO-TASA-001' }
      ]
  });
  const [selectedPermit, setSelectedPermit] = useState<Permiso | null>(null);
  const [isAlertConfigOpen, setIsAlertConfigOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("maitehdez37@gmail.com");
  const [alertPhone, setAlertPhone] = useState("+584121234567");

  const { toast } = useToast();

  const handleRenew = (permisoId: string) => {
    setPermisos(permisos.map(p => {
        if (p.id === permisoId) {
            if (!p.fechaVencimiento || ["N/A", "Indefinido", "Vitalicio"].includes(p.fechaVencimiento)) {
                 toast({
                    title: "No requiere renovación",
                    description: `El permiso ${'${permisoId}'} no tiene una fecha de vencimiento definida.`,
                });
                return p;
            }
            
            const currentVencimiento = new Date(p.fechaVencimiento);
            const newVencimiento = new Date(currentVencimiento.setFullYear(currentVencimiento.getFullYear() + 1));
            
            toast({
                title: "Renovación Guardada en la Nube",
                description: `Se ha notificado al representante legal sobre la renovación del permiso ${'${permisoId}'}.`,
                action: <CheckCircle className="text-green-500" />,
            });
            
            return { ...p, estado: "En Renovación", fechaVencimiento: newVencimiento.toISOString().split('T')[0] };
        }
        return p;
    }));
  };

  const handleFileSelect = (file: File) => {
      setSelectedFile(file);
      toast({
          title: "Archivo Cargado y Guardado en la Nube",
          description: `"${'${file.name}'}" listo para enviar. El archivo se conservará por 10 años.`,
          action: <CheckCircle className="text-green-500" />,
      });
  };
  
  const handleAddPayment = (permisoId: string, event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const newPayment: Payment = {
          id: Date.now(),
          fecha: formData.get('fecha') as string,
          monto: Number(formData.get('monto')),
          referencia: formData.get('referencia') as string,
      };

      setPayments(prev => ({
          ...prev,
          [permisoId]: [...(prev[permisoId] || []), newPayment]
      }));

      toast({
        title: "Pago Registrado",
        description: `Se ha añadido un nuevo pago al historial del permiso ${'${permisoId}'}.`
      });
      form.reset();
  };

  const handleSendNotification = (permiso: Permiso | null, channel: 'whatsapp' | 'email', isManual: boolean = false) => {
    if (channel === 'whatsapp') {
        const whatsappUrl = `https://wa.me/${'${alertPhone}'}`;
        window.open(whatsappUrl, '_blank');
    } else {
        const mailtoUrl = `mailto:${'${alertEmail}'}`;
        window.location.href = mailtoUrl;
    }
    
    if(selectedPermit) setSelectedPermit(null);
  };
  
  const handleDownloadLetter = (permiso: Permiso | null, tipo: 'solicitud' | 'renovacion' | 'planilla_resguardo') => {
    if (!permiso) return;
    let content = '';
    let filename = '';

    if (tipo === 'solicitud') {
        content = getLetterContent(permiso);
        filename = `Solicitud_${'${permiso.tipo.replace(/ /g, \'_\')}'}.docx`;
    } else if (tipo === 'renovacion') {
        content = `
Ciudad, ${"$'{"}new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }){"}"}

Señores
${'${permiso.emisor}'}
Presente.-

Asunto: Solicitud de Renovación de Permiso - ${'${permiso.tipo}'}

Yo, [Nombre del Representante Legal], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF [RIF de la Empresa], me dirijo a ustedes para solicitar formalmente la renovación del permiso de "${'${permiso.tipo}'}", con referencia N° ${'${permiso.id}'}, próximo a vencer.

Adjuntamos los recaudos correspondientes para la renovación.

Atentamente,

_________________________
[Nombre del Representante Legal]
C.I: [C.I. del Representante]
`;
        filename = `Renovacion_${'${permiso.tipo.replace(/ /g, \'_\')}'}.docx`;
    } else if (tipo === 'planilla_resguardo') {
        content = getPlanillaResguardoTemporalContent();
        filename = `Planilla_Resguardo_Temporal.docx`;
    }
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
        "xmlns='http://www.w3.org/TR/REC-html40'>"+
        "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + `<div style="font-family: Arial, sans-serif;">${'${content.replace(/\\n/g, \'<br/>\')}'}</div>` + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = filename;
    fileDownload.click();
    document.body.removeChild(fileDownload);

    toast({
        title: 'Descarga Iniciada',
        description: `El documento se está descargando como ${'${filename}'}.`
    });
};

  const handleDownloadPDF = (documentId: string) => {
    const sociosList = companyData.socios.map(socio => 
        ` ${'${socio.nombre}'}, venezolano, mayor de edad, soltero, y titular de la cédula de identidad N° ${'${socio.cedula}'} y portador del Rif ${'${socio.rif}'}`
    ).join(',');

    const content = `
        <html>
            <head>
                <title>Registro Mercantil</title>
                <style>
                    @page {
                        size: 8.5in 13in; /* Oficio size */
                        margin: 1in;
                    }
                    body {
                        font-family: 'Times New Roman', Times, serif;
                        line-height: 1.6;
                        font-size: 12pt;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                    .header {
                        text-align: center;
                        font-weight: bold;
                    }
                    .content {
                        text-align: justify;
                    }
                    .signature-section {
                        margin-top: 5rem;
                        display: flex;
                        justify-content: space-around;
                        text-align: center;
                    }
                    .signature {
                        border-top: 1px solid black;
                        padding-top: 5px;
                    }
                </style>
            </head>
            <body>
                <!-- Page 1 -->
                <div class="header">
                    <p>JOSE HERRERA BOZZO<br>IMPRE-ABOGADO<br>N° 55.380</p>
                    <br><br>
                    <p>CIUDADANO<br>REGISTRADOR MERCANTIL DE LA CIRCUNSCRIPCIÓN<br>JUDICIAL DEL ESTADO VARGAS.<br>SU DESPACHO</p>
                </div>
                <br><br>
                <div class="content">
                    <p>Yo MARIA TERESA HERNANDEZ BASTIDAS, mayor de edad, de este domicilio, venezolano, soltera y titular de la Cédula de Identidad N° V-13.374.121, portador del Rif V-13374121-2 actuando en este acto debidamente autorizado en el documento constitutivo, estatutos sociales de la sociedad mercantil SYSTEM KYRON, C.A para la participación, ante usted ocurro y expongo que: presento debidamente firmado por cada uno de los socios el documento constitutivo de los estatutos de la nombrada sociedad.....................................</p>
                    <p>Pido a usted se sirva abrir expediente a la expresada sociedad, acordar su registro y fijación y expedirme una (01) copia certificada del documento constitutivo y de la presente participación con asiento correspondiente a los fines de su publicación.</p>
                    <p>En Catia la Mar, a la fecha de su presentación.</p>
                </div>
                
                <div class="page-break"></div>

                <!-- Page 2 -->
                <div class="header">
                    <p>NILCY M GONZALEZ<br>IMPRE-ABOGADO<br>N° 55.380</p>
                </div>
                <br>
                <div class="content">
                    <p>Nosotros,${'${sociosList}'}, por medio del presente documento declaramos: Que hemos decidido constituir una Compañía Anónima, la cual se regirá por las cláusulas siguientes y que sirvan a su vez de Acta Constitutiva y Estatutos Sociales de la Empresa:</p>
                    
                    <p><strong>PRIMERA:</strong> La denominación comercial de la compañía será: SYSTEM KYRON, C.A.</p>
                    
                    <p><strong>SEGUNDA:</strong> El domicilio de la compañía será: Avenida Principal de la Salina Sector Salina Frente a la Playa Local No21 Municipio Catia La Mar Estado Vargas, pudiendo establecer sucursales, agencias y oficinas en cualquier parte del territorio nacional o establecer sucursal fuera del País.</p>

                    <p><strong>TERCERA:</strong> La duración de la compañía será de Treinta (30) años contados a partir de la fecha de inscripción de este documento en el Registro Mercantil correspondiente, pudiendo prorrogar dicho plazo por períodos iguales, mayores o menores a juicio de la Asamblea General de Accionistas.</p>
                </div>
                
                <div class="page-break"></div>

                <!-- Page 3 -->
                <div class="content">
                    <p><strong>CUARTA:</strong> El objeto principal será: ${'${companyData.objetoSocial}'}</p>

                    <p><strong>QUINTA:</strong> El capital Social de la compañía es de NOVECIENTOS MIL BOLIVARES (Bs. 900.000,00) divididos en Cien (100) acciones de UN MIL BOLIVARES (Bs. 1.000,00) cada una y han sido íntegramente suscritas y pagadas de la siguiente manera: ALBERTO JOSE SALAS PEREZ, ha suscrito y pagado CINCUENTA (50) acciones por un valor de CUATROCIENTO CINCUENTA MIL BOLIVARES (Bs. 450.000,00) y RITA ANABEL QUEVEDO MONTES, ha suscrito y pagado (50) acciones por un valor de CUATROCIENTO CINCUENTA MIL BOLIVARES... (Bs. 450.000,00) habiéndose pagado así el cien por ciento (100%) del capital tal como se evidencia en inventario anexo al documento.</p>
                </div>

                 <div class="page-break"></div>

                <!-- Page 4 -->
                <div class="content">
                    <p>Las acciones son nominativas no convertibles al portador.</p>
                    <p><strong>SEXTA:</strong> La compañía será dirigida y administrada por Un (01) Director General, quien podrá ser o no accionista de la compañía y durará Veinte (20) años en el desempeño de sus funciones y continuaran en su cargo hasta tanto se sustituya.</p>
                    
                    <p><strong>SEPTIMA:</strong> La junta directiva tendrá el más amplio poder en la administración, dirección, representación de la compañía y demás actuaciones que considere conveniente para la mejor defensa de sus intereses como Ejercer la dirección y representación de la sociedad en sus negociaciones con terceros, celebrando toda clase de arreglos, contratos, empleados y personas de otros carácter que realicen actos para la sociedad o en su nombre; Hacer todo cuanto fuere necesario para cumplir con el objeto social de la sociedad, con plenas facultades para actuar en defensa de sus derechos o intereses, tanto judicial como extrajudicialmente, con facultad para darse por citado en juicios; intentar y contestar demandas, celebrar convenimientos, desistimientos, transacciones, hacer posturas en actos de remate y en general, todo cuanto considere necesarios o convenientes para los intereses de la sociedad;</p>
                </div>

                <div class="page-break"></div>

                <!-- Page 5 -->
                 <div class="content">
                    <p>Firmar en nombre de la sociedad su correspondencia; suscribir toda clase de documentos o contratos, pagares, letras de cambio, cheques cartas de crédito, contratos bancarios; otorgar poderes a cualquier personas que la junta directiva considere conveniente y en general, cualquier otro documento o acto que concierna a la sociedad; Abrir y movilizar cuentas corrientes de ahorros y tendrán firmas conjuntas o separadas; podrán hacer depósitos en institutos de créditos, recibir los valores, propiedades y bienes de cualquier especie que deban entregarse a la sociedad; Nombrar garantes, representantes, agentes y apoderados generales o especiales y nombrar abogado o abogados con poderes requeridos para el buen funcionamiento de sus cargos; Convocar las asambleas ordinarias o extraordinarias; Formar el balance, con cuentas de ganancias y pérdidas y la propuesta de distribución de beneficios y presentar una copia de dichos documentos al comisario de la sociedad; Informar a la asamblea sobre los ingresos, gastos y existencias y formular un informe general o memoria de la administración, adjuntándole el balance general de cada ejercicio Económico y deberán desempeñar además, cualesquiera otras funciones que especialmente les...</p>
                </div>
            </body>
        </html>
    `;
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);

            toast({
                title: "Preparando Descarga",
                description: `Se ha abierto el diálogo de impresión para '${'${documentId}'}.pdf'. Por favor, selecciona 'Guardar como PDF' para descargar el documento.`
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error de Navegador",
                description: "No se pudo abrir la ventana de impresión. Por favor, revisa la configuración de tu navegador."
            });
        }
  }


  const groupedPermisos = permisos.reduce((acc, permiso) => {
    const emisor = permiso.emisor;
    if (!acc[emisor]) {
      acc[emisor] = [];
    }
    acc[emisor].push(permiso);
    return acc;
  }, {} as Record<string, typeof initialPermisos>);
  
  const permisosPorVencer = permisos.filter(p => p.estado === 'Por Vencer' || p.estado === 'Vencido');

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <UserCheck className="h-8 w-8" />
                Gestión de Permisos
            </h1>
            <p className="text-muted-foreground mt-2">
                Consulta y gestiona todos los permisos y licencias de tu empresa.
            </p>
        </div>
        <div className="flex items-center gap-2">
             <Dialog open={isAlertConfigOpen} onOpenChange={setIsAlertConfigOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Configurar Alertas</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sistema de Notificación Automatizada</DialogTitle>
                        <DialogDescription>
                            Configura el sistema para recibir alertas automáticas sobre vencimientos de permisos.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="alert-email">Correo para Notificaciones</Label>
                            <Input id="alert-email" type="email" value={alertEmail} onChange={(e) => setAlertEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alert-phone">Nro. WhatsApp para Alertas (+CódigoPaís)</Label>
                            <Input id="alert-phone" type="tel" value={alertPhone} onChange={(e) => setAlertPhone(e.target.value)} placeholder="+584121234567" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="alert-frequency">Frecuencia de Avisos</Label>
                            <Select defaultValue="weekly">
                                <SelectTrigger id="alert-frequency">
                                    <SelectValue placeholder="Seleccionar frecuencia..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Diaria</SelectItem>
                                    <SelectItem value="weekly">Semanal</SelectItem>
                                    <SelectItem value="monthly">Mensual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {toast({title: "Configuración Guardada", description: `Las alertas se enviarán a ${'${alertEmail}'} y ${'${alertPhone}'}.`}); setIsAlertConfigOpen(false);}}>
                            Guardar Configuración
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button>
                <PlusCircle className="mr-2" />
                Solicitar Nuevo Permiso
            </Button>
        </div>
      </header>

       {permisosPorVencer.length > 0 && (
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Alerta de Vencimiento</AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <span>Tienes {permisosPorVencer.length} permiso(s) vencido(s) o por vencer. Revisa la tabla.</span>
              
            </AlertDescription>
          </Alert>
        )}

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Permisos y Licencias por Ente Emisor</CardTitle>
            <CardDescription>Listado de todos los permisos activos, agrupados por la entidad que los regula.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedPermisos).sort(([a], [b]) => a.localeCompare(b)).map(([emisor, listaPermisos]) => (
                <AccordionItem value={emisor} key={emisor}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span className="font-semibold text-lg">{emisor}</span>
                      <Badge variant="secondary">{listaPermisos.length} Permiso(s)</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                     {emisor === 'SAPI' && (
                        <div className="border-l-4 border-blue-500 pl-4 py-4 my-4 bg-blue-500/5">
                           <h3 className="font-semibold mb-2">Guías y Recursos del SAPI</h3>
                           <Accordion type="single" collapsible className="w-full">
                               <AccordionItem value="paso-a-paso-marca">
                                   <AccordionTrigger>Paso a Paso para Solicitar el Registro de una Marca</AccordionTrigger>
                                   <AccordionContent className="text-muted-foreground">
                                       <ol className="list-decimal list-inside space-y-2 text-sm">
                                           <li>Búsqueda de Antecedentes: Verificar en la base de datos del SAPI que la marca no esté ya registrada.</li>
                                           <li>Clasificación de NIZA: Determinar la clase (o clases) a la que pertenecen los productos o servicios.</li>
                                           <li>Pago de Tasas: Realizar el pago de la tasa inicial de solicitud.</li>
                                           <li>Llenado de Planilla: Completar la planilla de solicitud con todos los datos del solicitante y la marca.</li>
                                           <li>Consignación de Recaudos: Presentar la solicitud junto con el logo (si aplica), timbres fiscales y comprobante de pago.</li>
                                           <li>Publicación en Boletín: Una vez admitida, la solicitud se publica en el Boletín de la Propiedad Industrial.</li>
                                           <li>Periodo de Oposición: Se abre un lapso para que terceros puedan oponerse al registro.</li>
                                           <li>Examen de Fondo y Concesión: Si no hay oposiciones, el SAPI realiza un examen final y, si procede, concede el registro.</li>
                                       </ol>
                                   </AccordionContent>
                               </AccordionItem>
                               <AccordionItem value="clasificador-niza">
                                   <AccordionTrigger>Clasificador Internacional NIZA</AccordionTrigger>
                                   <AccordionContent className="text-muted-foreground">
                                       <p className="text-sm">El Clasificador de Niza es un sistema internacional para clasificar productos y servicios para el registro de marcas. Consta de 45 clases (34 para productos y 11 para servicios). Es crucial seleccionar la clase correcta para asegurar la protección adecuada de tu marca. Nuestro sistema puede autocompletar la planilla basándose en la descripción de tu negocio.</p>
                                   </AccordionContent>
                               </AccordionItem>
                               <AccordionItem value="tarifas-cuentas">
                                   <AccordionTrigger>Tarifas y Cuentas Bancarias</AccordionTrigger>
                                   <AccordionContent className="text-muted-foreground">
                                       <p className="text-sm">Las tarifas del SAPI varían según el trámite y se actualizan periódicamente. Deben ser pagadas en Petro (PTR) o su equivalente en Bolívares. Los pagos se realizan en las cuentas bancarias designadas por el SAPI.</p>
                                   </AccordionContent>
                               </AccordionItem>
                           </Accordion>
                        </div>
                     )}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Referencia</TableHead>
                                <TableHead>Tipo de Permiso</TableHead>
                                <TableHead>Vencimiento</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listaPermisos.map((permiso) => (
                                <TableRow key={permiso.id} className={permiso.estado === 'Vencido' ? 'bg-destructive/10' : permiso.estado === 'Por Vencer' ? 'bg-secondary/50' : ''}>
                                    <TableCell className="font-medium">{permiso.id}</TableCell>
                                    <TableCell>{permiso.tipo}</TableCell>
                                    <TableCell>{formatDateString(permiso.fechaVencimiento)}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[permiso.estado]}>{permiso.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        {permiso.id === 'REG-MERC-001' ? (
                                             <Button variant="outline" size="sm" onClick={() => handleDownloadPDF('registro_mercantil_ejemplo')}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Descargar Documento
                                            </Button>
                                        ) : (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" title="Ver Detalles" onClick={() => setSelectedPermit(permiso)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-4xl">
                                                <DialogHeader>
                                                    <DialogTitle>Detalles del Permiso: {permiso.id}</DialogTitle>
                                                    <DialogDescription>{permiso.tipo}</DialogDescription>
                                                </DialogHeader>
                                                <Tabs defaultValue="requisitos" className="py-4">
                                                    <TabsList className="grid w-full grid-cols-4">
                                                        <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                                                        <TabsTrigger value="cartas">Modelos de Carta</TabsTrigger>
                                                        <TabsTrigger value="documentos">Cargar Documentos</TabsTrigger>
                                                        <TabsTrigger value="pagos">Historial de Pagos</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="requisitos" className="mt-4">
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Requisitos de Inscripción</h4>
                                                                {permiso.requisitosInscripcion.length > 0 ? (
                                                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                                        {permiso.requisitosInscripcion.map(req => <li key={req}>{req}</li>)}
                                                                    </ul>
                                                                ) : <p className="text-sm text-muted-foreground">No hay requisitos específicos listados.</p>}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Requisitos de Renovación</h4>
                                                                {permiso.requisitosRenovacion.length > 0 ? (
                                                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                                        {permiso.requisitosRenovacion.map(req => <li key={req}>{req}</li>)}
                                                                    </ul>
                                                                ) : <p className="text-sm text-muted-foreground">No hay requisitos de renovación listados.</p>}
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="cartas" className="mt-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {permiso.id === 'PERM-SAPI-002' ? (
                                                                 <div className="p-4 border rounded-lg md:col-span-2">
                                                                    <h4 className="font-semibold mb-2">Planilla de Solicitud de Resguardo Temporal (Pre-llenada)</h4>
                                                                    <div className="text-xs text-muted-foreground bg-secondary p-3 rounded-md font-mono h-64 overflow-auto whitespace-pre-wrap">
                                                                        {getPlanillaResguardoTemporalContent()}
                                                                    </div>
                                                                    <div className="flex gap-2 mt-2">
                                                                        <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(getPlanillaResguardoTemporalContent()); toast({title: "Copiado"})}}>Copiar</Button>
                                                                        <Button size="sm" variant="outline" onClick={() => handleDownloadLetter(selectedPermit, 'planilla_resguardo')}>Descargar (.docx)</Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="p-4 border rounded-lg">
                                                                        <h4 className="font-semibold mb-2">Modelo de Carta de Solicitud</h4>
                                                                        <div className="text-xs text-muted-foreground bg-secondary p-3 rounded-md font-mono h-48 overflow-auto whitespace-pre-wrap">
                                                                            {getLetterContent(selectedPermit)}
                                                                        </div>
                                                                        <div className="flex gap-2 mt-2">
                                                                            <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(getLetterContent(selectedPermit)); toast({title: "Copiado"})}}>Copiar</Button>
                                                                            <Button size="sm" variant="outline" onClick={() => handleDownloadLetter(selectedPermit, 'solicitud')}>Descargar (.docx)</Button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-4 border rounded-lg">
                                                                        <h4 className="font-semibold mb-2">Modelo de Carta de Renovación</h4>
                                                                        <Button size="sm" variant="outline" onClick={() => handleDownloadLetter(selectedPermit, 'renovacion')}>Descargar (.docx)</Button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="documentos" className="mt-4">
                                                        <div className="space-y-4">
                                                            <div className="space-y-2">
                                                                <Label>Adjuntar Inscripción / Renovación / Pago</Label>
                                                                <FileInputTrigger onFileSelect={handleFileSelect}>
                                                                    <Button variant="outline" className="w-full">
                                                                        <FileUp className="mr-2 h-4 w-4" />
                                                                        Cargar Documento (PDF, JPG, PNG)
                                                                    </Button>
                                                                </FileInputTrigger>
                                                                {selectedFile && 
                                                                    <div className="flex items-center justify-center text-sm text-green-500 font-medium pt-2">
                                                                        <CheckCircle className="h-4 w-4 mr-2"/>
                                                                        <p>Archivo cargado: {selectedFile.name}</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <CardFooter className="p-0 pt-2">
                                                               <p className="text-xs text-muted-foreground flex items-center gap-2"><Info className="h-4 w-4 shrink-0"/>Los documentos se archivarán de forma segura por 10 años.</p>
                                                            </CardFooter>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="pagos" className="mt-4">
                                                        <div className="space-y-4">
                                                            <h4 className="font-semibold">Pagos Registrados</h4>
                                                            <div className="border rounded-md max-h-48 overflow-y-auto">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Fecha</TableHead>
                                                                            <TableHead>Referencia</TableHead>
                                                                            <TableHead className="text-right">Monto</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {payments[permiso.id]?.length > 0 ? payments[permiso.id].map(p => (
                                                                            <TableRow key={p.id}>
                                                                                <TableCell>{formatDateString(p.fecha)}</TableCell>
                                                                                <TableCell>{p.referencia}</TableCell>
                                                                                <TableCell className="text-right">{formatCurrency(p.monto, "Bs.")}</TableCell>
                                                                            </TableRow>
                                                                        )) : (
                                                                            <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No hay pagos registrados.</TableCell></TableRow>
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <form onSubmit={(e) => handleAddPayment(permiso.id, e)}>
                                                                <div className="grid sm:grid-cols-3 gap-2 border-t pt-4 mt-4">
                                                                    <Input name="fecha" type="date" required/>
                                                                    <Input name="referencia" placeholder="Referencia" required/>
                                                                    <Input name="monto" type="number" placeholder="Monto (Bs.)" required/>
                                                                    <Button type="submit" className="sm:col-span-3">Registrar Pago</Button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </TabsContent>
                                                </Tabs>
                                                <DialogFooter className="gap-2 sm:gap-0 sm:justify-between pt-4 border-t">
                                                    <Button variant="secondary" onClick={() => handleDownloadLetter(selectedPermit, 'solicitud')}>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Descargar Solicitud
                                                    </Button>
                                                    {(permiso.estado === "Por Vencer" || permiso.estado === "Vencido") && (
                                                        <Button onClick={() => handleRenew(permiso.id)}>
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            Iniciar Renovación
                                                        </Button>
                                                    )}
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                         )}
                                         
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSignature, Download, Printer, HardHat, CheckCircle, Store, Building, Stamp, FileText } from "lucide-react";
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

export default function LegalizacionEmpresaPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        ingeniero: "Nombre del Ingeniero",
        civ: "123.456",
        proyecto: "Nombre del Proyecto",
        cliente: "Nombre del Cliente/Empresa",
        direccion: "Dirección Completa del Proyecto",
        fecha: new Date().toISOString().split('T')[0],
    });
    
    const getActaContent = () => `
Nosotros, [NOMBRES Y APELLIDOS DE LOS SOCIOS], mayores de edad, de nacionalidad [Nacionalidad], titulares de la Cédula de Identidad N° V-[C.I. Socio 1] y V-[C.I. Socio 2], domiciliados en la ciudad de Caracas, por medio del presente documento declaramos que hemos convenido en constituir, como en efecto lo hacemos, una Compañía Anónima que se regirá por las cláusulas que se detallan a continuación.

CLÁUSULA PRIMERA: DENOMINACIÓN
La compañía se denominará Kyron, C.A.

CLÁUSULA SEGUNDA: DOMICILIO
El domicilio de la compañía estará en la ciudad de Caracas, pudiendo establecer sucursales o agencias en cualquier otro lugar del territorio nacional o en el extranjero.

CLÁUSULA TERCERA: OBJETO
El objeto de la compañía es la asesoría contable, sistema de financiamiento, sistema de crédito a emprendimientos con intereses, desarrollo y aplicación de tecnologías blockchain, incluyendo sistemas de verificación biométrica como la huella dactilar, para la seguridad y trazabilidad de las transacciones, asesoría de publicidad y marketing, con sistema de app digital de cambio de moneda, asesoría de clases de materia contable, app de todas las carrera con asesoria de profesionales de la materia, venta de productos online, venta de todo tipo de artículos de papelería y escolares, software y artículos de contabilidad, equipos fiscales, y la comercialización de computadoras de marca propia. Adicionalmente, la fabricación y distribución de papeleras inteligentes de marca propia. Realizar convenios y alianzas para el canje de productos plásticos por dinero y alianzas con empresas. Tramitación de documentos y asesorías jurídicas, y todos los servicios administrativos, jurídicos, de ingeniería y marketing. 

Adicionalmente, la empresa podrá operar como una Institución de Tecnología Financiera del Sector Bancario (ITFB), ofreciendo servicios financieros en las categorías de productos de pago y almacenamientos de dinero, productos dentro de instituciones bancarías y nuevos modelos de negocio a las Instituciones del sector bancario, las cuales se desarrollan dentro de las actividades siguientes:
1. Apertura de cuenta bancaria a través de nuevas tecnologías.
2. Soluciones bancarias multiplataforma.
3. Utilización de datos estadísticos de libre dominio con fines financieros.
4. Plataformas de conexión de FINTECH y de instituciones bancarias.
5. Autenticación de voz del usuario.
6. Interacción automatizada de los usuarios financieros.
7. Software de cumplimiento (Compliance) y gestión de riesgos.
8. Integración de redes sociales-pagos-finanzas-venta al por menor.
9. La banca como servicio (BaaS).

Parágrafo Único: En caso de que las Instituciones de Tecnología Financiera del Sector Bancario deseen ofrecer productos de pago y almacenamientos de dinero a clientes o usuarios distintos a las Instituciones Bancarias, deberán obtener la autorización del Banco Central de Venezuela, a los fines de operar como un Proveedor no Bancario de Servicios de Pago, cumpliendo para ello con los requisitos y condiciones establecidos en la normativa dictada por el Ente Emisor en la materia. Se entiende por productos de pago y almacenamientos de dinero a que se refiere el presente Parágrafo, las siguientes operaciones:
a. Ahorros Automatizados de las Cuentas de los Usuarios a una Nueva Cuenta.
b. Ahorros Automatizados en redes sociales de cuentas de usuarios a una plataforma P2P.
c. Pagos Móviles.
d. Pagos Móviles de Cooperación Directa Banco-Operador de Red Móvil.
e. Pagos móviles-cobro directo a la cuenta del teléfono móvil.
f. Pagos con tarjetas de crédito mediante API.
g. Tarjetas virtuales prepagadas.
h. Pasarelas (gateway) de pagos.

En general, la sociedad podrá realizar cualquier otra actividad de lícito comercio conexa o no con su objeto principal.

CLÁUSULA CUARTA: CAPITAL SOCIAL
El capital social es de [MONTO DEL CAPITAL] (Bs. X.XXX,XX), dividido en [NÚMERO DE ACCIONES] (XX) acciones nominativas no convertibles al portador, con un valor nominal de [VALOR NOMINAL] (Bs. X.XXX,XX) cada una, las cuales han sido suscritas y pagadas en su totalidad por los socios de la siguiente manera: [Socio 1] suscribe y paga [Número] acciones, y [Socio 2] suscribe y paga [Número] acciones.

CLÁUSULA QUINTA: AUTORIZACIÓN ESPECIAL
Se autoriza ampliamente al ciudadano(a) [NOMBRE DEL AUTORIZADO], titular de la Cédula de Identidad N° V-[C.I. AUTORIZADO], para que realice todos los trámites necesarios para el registro, inscripción y publicación de la presente Acta Constitutiva, así como para la obtención del Registro Único de Información Fiscal (RIF) y cualquier otra gestión requerida para la plena legalización de la empresa.
`;

    const handleAction = (action: string) => {
        if (action === 'impresa') {
             toast({
                title: "Iniciando Impresión",
                description: `El modelo de Acta Constitutiva ha sido enviado a la impresora.`,
            });
            window.print();
        } else if (action === 'descargado') {
            const content = getActaContent();
            const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                "xmlns='http://www.w3.org/TR/REC-html40'>"+
                "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
            const footer = "</body></html>";
            const sourceHTML = header + `<pre>${content}</pre>` + footer;
            
            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = 'Acta_Constitutiva.docx';
            fileDownload.click();
            document.body.removeChild(fileDownload);
            toast({
                title: `Acta Constitutiva Descargada`,
                description: `El documento ha sido descargado como archivo Word.`,
            });
        }
    };

    const pasosLegalizacion = [
        {
            paso: 1,
            titulo: "Reserva de Nombre y Denominación Social (SAREN)",
            descripcion: "El primer paso es verificar la disponibilidad del nombre de la empresa y reservarlo a través del sistema del Servicio Autónomo de Registros y Notarías (SAREN)."
        },
        {
            paso: 2,
            titulo: "Redacción y Visado del Acta Constitutiva",
            descripcion: "Se debe redactar el documento constitutivo de la empresa, detallando su objeto, capital, socios y estructura. Este documento debe ser visado por un abogado colegiado."
        },
         {
            paso: 3,
            titulo: "Inscripción en el Registro Mercantil",
            descripcion: "El acta constitutiva se presenta y se inscribe en el Registro Mercantil correspondiente a la jurisdicción del domicilio de la empresa para darle personalidad jurídica."
        },
         {
            paso: 4,
            titulo: "Publicación en Periódico Mercantil",
            descripcion: "Una vez registrada, el acta debe ser publicada en un periódico mercantil para dar fe pública de la constitución de la empresa."
        },
         {
            paso: 5,
            titulo: "Inscripción en el SENIAT (Obtención del RIF)",
            descripcion: "Finalmente, se debe registrar la empresa ante el Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT) para obtener el Registro Único de Información Fiscal (RIF)."
        },
    ];

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between print:hidden">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Stamp className="h-8 w-8" />
                Guía de Legalización de Empresas
            </h1>
            <p className="text-muted-foreground mt-2">
              Proceso paso a paso para la constitución y registro de tu empresa en Venezuela.
            </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Pasos para la Constitución de una Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="relative border-l border-border ml-4 space-y-10">
                        {pasosLegalizacion.map((paso) => (
                            <li key={paso.paso} className="ml-8">
                                <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {paso.paso}
                                </span>
                                <h3 className="font-semibold">{paso.titulo}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{paso.descripcion}</p>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm shadow-xl print:shadow-none print:border-none print:bg-white dark:print:bg-black">
                 <CardHeader className="text-center p-6">
                    <CardTitle className="text-xl flex items-center justify-center gap-2"><FileText/>Modelo de Acta Constitutiva</CardTitle>
                    <CardDescription>Utiliza este modelo como base para tu documento.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 prose prose-sm dark:prose-invert max-w-none text-justify h-[60vh] overflow-y-auto">
                    <p>
                        Nosotros, [NOMBRES Y APELLIDOS DE LOS SOCIOS], mayores de edad, de nacionalidad [Nacionalidad], titulares de la Cédula de Identidad N° V-[C.I. Socio 1] y V-[C.I. Socio 2], domiciliados en la ciudad de Caracas, por medio del presente documento declaramos que hemos convenido en constituir, como en efecto lo hacemos, una Compañía Anónima que se regirá por las cláusulas que se detallan a continuación.
                    </p>

                    <h4>CLÁUSULA PRIMERA: DENOMINACIÓN</h4>
                    <p>La compañía se denominará <strong>Kyron, C.A.</strong></p>

                    <h4>CLÁUSULA SEGUNDA: DOMICILIO</h4>
                    <p>El domicilio de la compañía estará en la ciudad de Caracas, pudiendo establecer sucursales o agencias en cualquier otro lugar del territorio nacional o en el extranjero.</p>

                    <h4>CLÁUSULA TERCERA: OBJETO</h4>
                    <p>El objeto de la compañía es la asesoría contable, sistema de financiamiento, sistema de crédito a emprendimientos con intereses, desarrollo y aplicación de tecnologías blockchain, incluyendo sistemas de verificación biométrica como la huella dactilar, para la seguridad y trazabilidad de las transacciones, asesoría de publicidad y marketing, con sistema de app digital de cambio de moneda, asesoría de clases de materia contable, app de todas las carrera con asesoria de profesionales de la materia, venta de productos online, venta de todo tipo de artículos de papelería y escolares, software y artículos de contabilidad, equipos fiscales, y la comercialización de computadoras de marca propia. Adicionalmente, la fabricación y distribución de papeleras inteligentes de marca propia. Realizar convenios y alianzas para el canje de productos plásticos por dinero y alianzas con empresas. Tramitación de documentos y asesorías jurídicas, y todos los servicios administrativos, jurídicos, de ingeniería y marketing.</p>
                    <p>Adicionalmente, la empresa podrá operar como una Institución de Tecnología Financiera del Sector Bancario (ITFB), ofreciendo servicios financieros en las categorías de productos de pago y almacenamientos de dinero, productos dentro de instituciones bancarías y nuevos modelos de negocio a las Instituciones del sector bancario, las cuales se desarrollan dentro de las actividades siguientes:
                        <ol className="list-decimal pl-6 my-2">
                            <li>Apertura de cuenta bancaria a través de nuevas tecnologías.</li>
                            <li>Soluciones bancarias multiplataforma.</li>
                            <li>Utilización de datos estadísticos de libre dominio con fines financieros.</li>
                            <li>Plataformas de conexión de FINTECH y de instituciones bancarias.</li>
                            <li>Autenticación de voz del usuario.</li>
                            <li>Interacción automatizada de los usuarios financieros.</li>
                            <li>Software de cumplimiento (Compliance) y gestión de riesgos.</li>
                            <li>Integración de redes sociales-pagos-finanzas-venta al por menor.</li>
                            <li>La banca como servicio (BaaS).</li>
                        </ol>
                    </p>
                     <p><strong>Parágrafo Único:</strong> En caso de que las Instituciones de Tecnología Financiera del Sector Bancario deseen ofrecer productos de pago y almacenamientos de dinero a clientes o usuarios distintos a las Instituciones Bancarias, deberán obtener la autorización del Banco Central de Venezuela, a los fines de operar como un Proveedor no Bancario de Servicios de Pago, cumpliendo para ello con los requisitos y condiciones establecidos en la normativa dictada por el Ente Emisor en la materia. Se entiende por productos de pago y almacenamientos de dinero a que se refiere el presente Parágrafo, las siguientes operaciones:</p>
                        <ol className="list-alpha pl-6 my-2">
                           <li>Ahorros Automatizados de las Cuentas de los Usuarios a una Nueva Cuenta.</li>
                            <li>Ahorros Automatizados en redes sociales de cuentas de usuarios a una plataforma P2P.</li>
                            <li>Pagos Móviles.</li>
                            <li>Pagos Móviles de Cooperación Directa Banco-Operador de Red Móvil.</li>
                            <li>Pagos móviles-cobro directo a la cuenta del teléfono móvil.</li>
                            <li>Pagos con tarjetas de crédito mediante API.</li>
                            <li>Tarjetas virtuales prepagadas.</li>
                            <li>Pasarelas (gateway) de pagos.</li>
                        </ol>
                    <p>En general, la sociedad podrá realizar cualquier otra actividad de lícito comercio conexa o no con su objeto principal.</p>

                    <h4>CLÁUSULA CUARTA: CAPITAL SOCIAL</h4>
                    <p>El capital social es de [MONTO DEL CAPITAL] (Bs. X.XXX,XX), dividido en [NÚMERO DE ACCIONES] (XX) acciones nominativas no convertibles al portador, con un valor nominal de [VALOR NOMINAL] (Bs. X.XXX,XX) cada una, las cuales han sido suscritas y pagadas en su totalidad por los socios de la siguiente manera: [Socio 1] suscribe y paga [Número] acciones, y [Socio 2] suscribe y paga [Número] acciones.</p>
                    
                    <h4>CLÁUSULA QUINTA: AUTORIZACIÓN ESPECIAL</h4>
                    <p>Se autoriza ampliamente al ciudadano(a) <strong>[NOMBRE DEL AUTORIZADO]</strong>, titular de la Cédula de Identidad N° V-[C.I. AUTORIZADO], para que realice todos los trámites necesarios para el registro, inscripción y publicación de la presente Acta Constitutiva, así como para la obtención del Registro Único de Información Fiscal (RIF) y cualquier otra gestión requerida para la plena legalización de la empresa.</p>
                    
                    <div className="grid grid-cols-2 gap-12 pt-16">
                        <div className="text-center">
                            <p className="border-t-2 border-foreground pt-2">[Firma Socio 1]</p>
                        </div>
                        <div className="text-center">
                            <p className="border-t-2 border-foreground pt-2">[Firma Socio 2]</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 border-t flex justify-end gap-2">
                     <Button variant="outline" onClick={() => handleAction('impresa')}>
                        <Printer className="mr-2"/> Imprimir Modelo
                    </Button>
                    <Button onClick={() => handleAction('descargado')}>
                        <Download className="mr-2"/> Descargar (.docx)
                    </Button>
                </CardFooter>
            </Card>
      </div>

    </div>
  );
}

    
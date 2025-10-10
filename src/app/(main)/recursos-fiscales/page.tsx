
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Search, FileDown, BookOpen, Newspaper, FileWarning, Calendar, FileEdit, UserCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const jurisprudencia = [
    {
        id: "SC-00123",
        titulo: "Sentencia sobre Doble Tributación Municipal",
        fecha: "15/03/2023",
        sala: "Sala Constitucional",
        resumen: "Se establece criterio sobre la prohibición de doble tributación en impuestos a la actividad económica entre municipios...",
    },
    {
        id: "SPA-00456",
        titulo: "Validez de Notificaciones Electrónicas del SENIAT",
        fecha: "22/08/2023",
        sala: "Sala Político-Administrativa",
        resumen: "La Sala determina los requisitos de validez para las notificaciones fiscales realizadas a través de medios electrónicos...",
    },
    {
        id: "SCC-00789",
        titulo: "Interpretación de Contratos de Adhesión",
        fecha: "10/11/2023",
        sala: "Sala de Casación Civil",
        resumen: "Análisis sobre las cláusulas abusivas en contratos de adhesión y la protección al consumidor en el ámbito mercantil...",
    }
];

const gacetasOficiales = [
    {
        id: "GO-43032",
        titulo: "Gaceta Oficial N° 43.032 - Calendario de Contribución Especial de Pensiones 2025",
        fecha: "19/12/2024",
        resumen: "Se establece el calendario para la declaración y pago de la Contribución Especial para la Protección de las Pensiones de Seguridad Social para el ejercicio fiscal 2025.",
    },
    {
        id: "GO-43031",
        titulo: "Gaceta Oficial N° 43.031 - Calendario de Sujetos Pasivos Especiales 2025",
        fecha: "18/12/2024",
        resumen: "Se publican las fechas y plazos para las obligaciones tributarias de los Sujetos Pasivos Especiales durante el año 2025.",
    }
];

const providenciasSeniat = [
    {
        id: "SNAT/2011/0071",
        titulo: "Providencia sobre Emisión de Facturas",
        resumen: "Establece las normas generales para la emisión de facturas y otros documentos fiscales, regulando los medios de emisión (formatos, formas libres y máquinas fiscales)."
    },
    {
        id: "SNAT/2018/0141",
        titulo: "Providencia sobre Sujetos Pasivos Especiales",
        resumen: "Define los criterios para la calificación de los contribuyentes como Sujetos Pasivos Especiales y establece sus obligaciones específicas."
    },
    {
        id: "SNAT/2015/0049",
        titulo: "Providencia sobre Retenciones de IVA",
        resumen: "Regula el régimen de retenciones del Impuesto al Valor Agregado, designando a los agentes de retención y estableciendo los porcentajes aplicables."
    }
];

const calendariosHistoricos = [
    { year: "2024", content: "Gaceta Oficial N° 42.782 de fecha 20 de diciembre 2023: Calendario Vigente de Sujetos Pasivos para el año 2024" },
    { year: "2018", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para el año 2018" },
    { year: "2017", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para el año 2017\nCalendario de Sujetos Pasivos No Calificados como Especiales para Actividades de Juegos de Envite o Azar para el año 2017" },
    { year: "2016", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para el año 2016\nCalendario de Sujetos Pasivos No Calificados como Especiales para Actividades de Juegos de Envite o Azar para el año 2016" },
    { year: "2015", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para el año 2015\nCalendario de Sujetos Pasivos No Calificados como Especiales para Actividades de Juegos de Envite o Azar para el año 2015" },
    { year: "2014", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para el año 2014\nCalendario de Sujetos Pasivos No Calificados como Especiales para Actividades de Juegos de Envite o Azar para el año 2014" },
    { year: "2013", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para aquellas obligaciones que deben cumplirse para el año 2013\nCalendario de Sujetos Pasivos No Calificados como Especiales para Actividades de Juegos de Envite o Azar a cumplirse para el año 2013" },
    { year: "2012", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para aquellas obligaciones que deben cumplirse para el año 2012\nCalendario de Sujetos Pasivos No Calificados como Especiales para Actividades de Juegos de Envite o Azar a cumplirse para el año 2012" },
    { year: "2011", content: "Calendario de Sujetos Pasivos Especiales y Agentes de Retención para aquellas obligaciones que deben cumplirse para el año 2011\nCalendario de Sujetos Pasivos Ordinarios para Actividades de Juegos de Envite o Azar para el año 2011" },
    { year: "2010", content: "Aviso Oficial mediante el cual se corrigen los errores materiales de la Providencia Administrativa N° SNAT/2010/0091\nCalendario de Sujetos Pasivos Especiales y Agentes de Retención para aquellas obligaciones que deben cumplirse para el año 2010" },
    { year: "2009", content: "Modificación del Calendario de Sujetos Pasivos Especiales y Agentes de Retención, para aquellas obligaciones que deban cumplirse a partir del mes de agosto del año 2009\nCalendario de Contribuyentes Especiales y Agentes de Retención" },
];

const marcoLegalContaduria = {
    titulo: "Marco Legal y Ético",
    documentos: [
        "Ley de Ejercicio de la Contaduría Pública y Reglamento",
        "Código de Ética Profesional del Contador Público Venezolano",
        "Código de Ética para regular el ejercicio profesional del Contador Público (IFAC)",
        "Estatutos de la Federación de Colegios de Contadores Públicos de Venezuela",
        "Estatutos del Colegio de Contadores Público del Distrito Capital",
        "Reglamento de Protección del Ejercicio Profesional del Contador Público Colegiado",
        "Normas que Regula El Servicio de Registro de Actuación Profesional del Contador Público Colegiado",
        "Reglamento de la Orden del Contador Público",
        "Reglamento de uso del Papel Único de Seguridad",
        "Reglamento de Exoneraciones",
    ]
};

const normasIrhm = {
    titulo: "Normas de Interés (Histórico IRHM)",
    documentos: [
        "Norma IRHM Marzo 2022", "NORMA IRHM Abril 2022", "NORMA IRHM Mayo 2022",
        "NORMA IRHM Junio 2022", "NORMA IRHM Julio 2022", "NORMA IRHM Agosto 2022",
        "NORMA IRHM Septiembre 2022", "NORMA IRHM Octubre 2022", "NORMA IRHM Noviembre 2022",
        "NORMA IRHM Diciembre 2022", "NORMA IRHM Enero 2023",
    ]
};


export default function RecursosFiscalesPage() {
    const { toast } = useToast();

    const handleDownload = (documentId: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `El documento ${documentId} se está descargando en formato PDF.`,
        });
    }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-8 w-8" />
            Recursos Fiscales y Gacetas
        </h1>
        <p className="text-muted-foreground mt-2">
          Consulta la jurisprudencia del TSJ, leyes, gacetas y otros recursos de interés.
        </p>
      </header>

       <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
                type="text"
                placeholder="Buscar sentencias, leyes, gacetas..."
                className="w-full max-w-lg bg-background border rounded-md h-12 pl-12 pr-4"
            />
        </div>
      </div>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><FileEdit className="h-5 w-5" /> Normas sobre la Información Fiscal del Contribuyente (RIF)</CardTitle>
          <CardDescription>
            Obligaciones legales relacionadas con el Registro Único de Información Fiscal (RIF) en Venezuela.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>
                En la República Bolivariana de Venezuela, la Providencia Administrativa No. 0073 (G.O. No. 38.389) establece que todas las personas naturales o jurídicas sujetas a tributos administrados por el SENIAT deben inscribirse en el Registro Único de Información Fiscal (RIF). Esto incluye a entidades no residentes que realicen actividades económicas en el país.
            </p>
             <p>
                El número de RIF es único, permanente y de uso obligatorio en cualquier trámite ante el SENIAT, así como en declaraciones, facturas y otros documentos fiscales.
            </p>
             <p className="font-semibold text-foreground">Obligación de Actualización:</p>
             <p>
                El Código Orgánico Tributario (G.O. N° 37.305) obliga a los contribuyentes a notificar al SENIAT, en un plazo máximo de un (1) mes, cualquier cambio en:
             </p>
             <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Directores, administradores, o razón o denominación social de la entidad.</li>
                <li>Cambio del domicilio fiscal (según los artículos 30 al 35 del COT).</li>
                <li>Cambio de la actividad principal.</li>
                <li>Cesación, suspensión o paralización de la actividad económica habitual del contribuyente.</li>
            </ul>
             <p className="text-sm italic pt-2">
                Mantener la información del RIF actualizada es crucial para el control fiscal y para evitar sanciones.
            </p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Sistema Tributario Venezolano y Tributos Internos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>
                La República Bolivariana de Venezuela es un estado federal con 22 estados, un Distrito Capital y dependencias federales. El sistema tributario se basa en los principios constitucionales de legalidad, progresividad, equidad, justicia, capacidad contributiva, no retroactividad y no confiscación.
            </p>
            <p>
                La potestad tributaria se distribuye en tres niveles: nacional, estadal y municipal.
            </p>
            <p className="font-semibold text-foreground">
                Actualmente, el SENIAT tiene jurisdicción sobre los siguientes impuestos a nivel nacional:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Impuesto sobre la Renta (ISLR)</li>
                <li>Impuesto al Valor Agregado (IVA)</li>
                <li>Impuesto sobre Sucesiones y Donaciones</li>
                <li>Impuestos sobre Cigarrillos, Licores y Especies Alcohólicas</li>
                <li>Impuestos sobre actividades de juegos de envite y azar</li>
            </ul>
            <p className="text-sm italic pt-2">
                ¡Cumple con tu deber constitucional de contribuir con las cargas públicas, para que así el Gobierno Nacional pueda disponer de los recursos necesarios para propiciar el bienestar de la colectividad!
            </p>
        </CardContent>
      </Card>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><UserCog className="h-5 w-5" />Regulación Profesional del Contador Público</CardTitle>
            <CardDescription>
                Marco legal y normativo que rige el ejercicio de la contaduría pública en Venezuela.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="marco-legal">
                    <AccordionTrigger>{marcoLegalContaduria.titulo}</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-4 pt-4">
                            {marcoLegalContaduria.documentos.map(doc => (
                                <div key={doc} className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                                    <span className="text-sm font-medium">{doc}</span>
                                    <Button variant="outline" size="sm"><BookOpen className="mr-2 h-4 w-4"/>Ver Documento</Button>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="normas-irhm">
                    <AccordionTrigger>{normasIrhm.titulo}</AccordionTrigger>
                    <AccordionContent>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                            {normasIrhm.documentos.map(doc => (
                                <div key={doc} className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                                    <span className="text-sm font-medium">{doc}</span>
                                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                                        <FileDown className="mr-2 h-4 w-4"/>Descargar
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gacetas Oficiales de Interés</CardTitle>
          <CardDescription>
            Información relevante y calendarios fiscales publicados recientemente.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            {gacetasOficiales.map(item => (
                 <Card key={item.id} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex justify-between items-start">
                           <span className="flex items-center gap-3"><Newspaper className="h-5 w-5"/>{item.titulo}</span>
                           <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                        </CardTitle>
                        <CardDescription>
                           Fecha de Publicación: {item.fecha}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.resumen}</p>
                        <div className="flex gap-2">
                             <Button variant="outline">
                                <BookOpen className="mr-2" />
                                Ver Gaceta Completa
                            </Button>
                             <Button variant="secondary" onClick={() => handleDownload(item.id)}>
                                <FileDown className="mr-2" />
                                Descargar PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Providencias Administrativas del SENIAT</CardTitle>
          <CardDescription>
            Normativas clave que regulan las obligaciones tributarias en Venezuela.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            {providenciasSeniat.map(item => (
                 <Card key={item.id} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex justify-between items-start">
                           <span className="flex items-center gap-3"><FileWarning className="h-5 w-5"/>{item.titulo}</span>
                           <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.resumen}</p>
                        <div className="flex gap-2">
                             <Button variant="outline">
                                <BookOpen className="mr-2" />
                                Ver Documento Completo
                            </Button>
                             <Button variant="secondary" onClick={() => handleDownload(item.id)}>
                                <FileDown className="mr-2" />
                                Descargar PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Calendarios Fiscales Anteriores (Histórico)</CardTitle>
            <CardDescription>Consulta los calendarios de Sujetos Pasivos de años anteriores.</CardDescription>
          </CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {calendariosHistoricos.map((item) => (
                    <AccordionItem value={`item-${item.year}`} key={item.year}>
                        <AccordionTrigger>
                            <span className="font-semibold text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-primary"/> Año {item.year}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="prose prose-sm dark:prose-invert whitespace-pre-line text-muted-foreground p-4 bg-secondary/30 rounded-md">
                                {item.content}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
          </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Jurisprudencia del TSJ (Materia Mercantil)</CardTitle>
          <CardDescription>
            Decisiones recientes del Tribunal Supremo de Justicia con impacto en el ámbito empresarial.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            {jurisprudencia.map(item => (
                 <Card key={item.id} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex justify-between items-start">
                           <span>{item.titulo}</span>
                           <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                        </CardTitle>
                        <CardDescription>
                           {item.sala} | {item.fecha}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.resumen}</p>
                        <div className="flex gap-2">
                             <Button variant="outline">
                                <BookOpen className="mr-2" />
                                Ver Sentencia Completa
                            </Button>
                             <Button variant="secondary" onClick={() => handleDownload(item.id)}>
                                <FileDown className="mr-2" />
                                Descargar PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Search, FileDown, BookOpen, Newspaper, FileWarning, Calendar, File as FileEdit, UserCog, Gavel, Link as LinkIcon, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    }
];

const gacetasOficiales = [
    {
        id: "GO-43032",
        titulo: "Gaceta Oficial N° 43.032 - Calendario de Contribución Especial de Pensiones 2025",
        fecha: "19/12/2024",
        resumen: "Se establece el calendario para la declaración y pago de la Contribución Especial para la Protección de las Pensiones de Seguridad Social para el ejercicio fiscal 2025.",
    }
];

const providenciasSeniat = [
    {
        id: "SNAT/2011/0071",
        titulo: "Providencia sobre Emisión de Facturas",
        resumen: "Establece las normas generales para la emisión de facturas y otros documentos fiscales, regulando los medios de emisión (formatos, formas libres y máquinas fiscales)."
    }
];

export default function RecursosFiscalesPage() {
    const { toast } = useToast();

    const handleDownload = (documentId: string, title: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `El documento "${title}" se está descargando.`,
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });

        // Simular descarga de archivo
        const content = `REFERENCIA: ${documentId}\nTÍTULO: ${title}\n\nEste es un documento generado por el Sistema Kyron para fines de consulta legal y fiscal.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${documentId.replace(/\//g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            Recursos Fiscales y Gacetas
        </h1>
        <p className="text-muted-foreground mt-2">
          Consulta la jurisprudencia del TSJ, leyes, gacetas y providencias administrativas actualizadas.
        </p>
      </header>

       <div className="mb-8">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
                type="text"
                placeholder="Buscar sentencias, leyes, gacetas..."
                className="bg-background border rounded-xl h-12 pl-12 pr-4 shadow-sm"
            />
        </div>
      </div>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><FileEdit className="h-5 w-5 text-primary" /> Normas sobre la Información Fiscal (RIF)</CardTitle>
          <CardDescription>
            Obligaciones legales relacionadas con el Registro Único de Información Fiscal en Venezuela.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground text-sm">
            <p>
                En la República Bolivariana de Venezuela, la Providencia Administrativa No. 0073 (G.O. No. 38.389) establece que todas las personas naturales o jurídicas sujetas a tributos administrados por el SENIAT deben inscribirse en el Registro Único de Información Fiscal (RIF).
            </p>
             <p className="font-semibold text-foreground">Obligación de Actualización:</p>
             <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Cambio de directores o razón social.</li>
                <li>Cambio del domicilio fiscal.</li>
                <li>Cambio de la actividad económica principal.</li>
            </ul>
        </CardContent>
      </Card>

       <div className="grid gap-8">
        <h3 className="text-xl font-bold border-l-4 border-primary pl-4">Documentos y Normativas Recientes</h3>
        
        {gacetasOficiales.map(item => (
            <Card key={item.id} className="bg-secondary/20">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg flex items-center gap-3"><Newspaper className="h-5 w-5 text-primary"/>{item.titulo}</CardTitle>
                        <Badge variant="outline" className="font-mono">{item.id}</Badge>
                    </div>
                    <CardDescription>Publicado el {item.fecha}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{item.resumen}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><BookOpen className="mr-2 h-4 w-4" /> Ver</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleDownload(item.id, item.titulo)}><FileDown className="mr-2 h-4 w-4" /> Descargar</Button>
                    </div>
                </CardContent>
            </Card>
        ))}

        {providenciasSeniat.map(item => (
            <Card key={item.id} className="bg-secondary/20">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg flex items-center gap-3"><FileWarning className="h-5 w-5 text-primary"/>{item.titulo}</CardTitle>
                        <Badge variant="outline" className="font-mono">{item.id}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{item.resumen}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><BookOpen className="mr-2 h-4 w-4" /> Ver Documento</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleDownload(item.id, item.titulo)}><FileDown className="mr-2 h-4 w-4" /> Descargar PDF</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Search, FileDown, BookOpen, Newspaper, FileWarning } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
            Recursos Fiscales y Jurisprudencia
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





    
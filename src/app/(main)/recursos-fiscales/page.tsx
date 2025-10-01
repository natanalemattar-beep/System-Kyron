
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Search, FileDown, BookOpen } from "lucide-react";
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

export default function RecursosFiscalesPage() {
    const { toast } = useToast();

    const handleDownload = (sentenciaId: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `La sentencia ${sentenciaId} se está descargando en formato PDF.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-8 w-8" />
            Recursos Fiscales y Jurisprudencia
        </h1>
        <p className="text-muted-foreground mt-2">
          Consulta la jurisprudencia del TSJ, leyes y otros recursos de interés.
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


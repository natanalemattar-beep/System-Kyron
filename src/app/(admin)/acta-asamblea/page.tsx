
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSignature, Printer, Download, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

const companyInfo = {
    name: "Empresa, C.A.",
    rif: "J-12345678-9",
    registro: "Registro Mercantil Primero de la Circunscripción Judicial del Distrito Capital",
    numero: "XX",
    tomo: "XX-A",
};

export default function ActaAsambleaPage() {
    const { toast } = useToast();
    const [tipo, setTipo] = useState("ordinaria");
    const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));
    const [detalles, setDetalles] = useState("");

    const getActaContent = () => `
ACTA DE ASAMBLEA ${tipo.toUpperCase()}
============================================

En la ciudad de Caracas, a los ${formatDate(fecha)}, siendo las [Hora] en la sede de la empresa ${companyInfo.name}, ubicada en [Dirección de la Empresa], se reunieron los accionistas que representan la totalidad del capital social para celebrar una Asamblea ${tipo}.

ORDEN DEL DÍA:
--------------------
1. [Punto 1 del Orden del Día]
2. [Punto 2 del Orden del Día]
3. [Punto 3 del Orden del Día]

DELIBERACIONES:
--------------------
Se constató el quórum reglamentario y se procedió a deliberar sobre los puntos del orden del día.

${detalles || "[No se han especificado detalles de las deliberaciones]"}

DECISIONES:
--------------------
La Asamblea, por unanimidad, acuerda:
1. Aprobar [Decisión 1].
2. Autorizar [Decisión 2].

LECTURA Y CONFORMIDAD:
--------------------
No habiendo más puntos que tratar, se levantó la sesión y, en señal de conformidad, firman:

_________________________
[Nombre Socio 1], C.I: [C.I. Socio 1]
Accionista

_________________________
[Nombre Socio 2], C.I: [C.I. Socio 2]
Accionista
`;

    const handleAction = (action: string) => {
        const content = getActaContent();
        
        if (action === 'impresa') {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`<html><head><title>Acta de Asamblea</title></head><body><pre style="white-space: pre-wrap; font-family: sans-serif;">${content}</pre></body></html>`);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
        } else if (action === 'descargada') {
            const blob = new Blob([content], { type: 'application/msword' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Acta_Asamblea_${tipo}_${fecha}.doc`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        toast({
            title: `Acta ${action}`,
            description: `El documento del acta de asamblea ha sido procesado exitosamente.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileSignature className="h-8 w-8 text-primary" />
                Redacción de Actas de Asamblea
            </h1>
            <p className="text-muted-foreground mt-2">
              Genera y gestiona las actas para las asambleas de tu empresa de forma automatizada.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleAction('impresa')}>
                <Printer className="mr-2 h-4 w-4"/> Imprimir Acta
            </Button>
            <Button size="sm" onClick={() => handleAction('descargada')}>
                <Download className="mr-2 h-4 w-4"/> Descargar Acta (.doc)
            </Button>
        </div>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Generador de Acta</CardTitle>
            <CardDescription>Completa los campos para redactar el acta de asamblea según la normativa vigente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tipo-asamblea">Tipo de Asamblea</Label>
                    <Select value={tipo} onValueChange={setTipo}>
                        <SelectTrigger id="tipo-asamblea">
                            <SelectValue placeholder="Seleccionar tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ordinaria">Ordinaria</SelectItem>
                            <SelectItem value="extraordinaria">Extraordinaria</SelectItem>
                            <SelectItem value="junta-directiva">Junta Directiva</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fecha-asamblea">Fecha de la Asamblea</Label>
                    <Input 
                        id="fecha-asamblea" 
                        type="date" 
                        value={fecha} 
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="detalles-asamblea">Orden del Día, Deliberaciones y Decisiones</Label>
                <Textarea 
                    id="detalles-asamblea" 
                    placeholder="Describe los puntos tratados y las decisiones tomadas en la asamblea..." 
                    className="h-48"
                    value={detalles}
                    onChange={(e) => setDetalles(e.target.value)}
                />
             </div>
        </CardContent>
         <CardFooter>
             <Button className="w-full" size="lg">
                <CheckCircle className="mr-2 h-5 w-5"/> Guardar y Registrar Acta
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

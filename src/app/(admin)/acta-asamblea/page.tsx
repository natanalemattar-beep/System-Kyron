
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSignature, Printer, Download, CheckCircle, PlusCircle } from "lucide-react";
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

const getActaContent = (tipo: string, fecha: string, detalles: string) => `
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

${detalles}

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


export default function ActaAsambleaPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Acta ${action}`,
            description: `El documento del acta de asamblea ha sido procesado.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileSignature className="h-8 w-8" />
                Redacción de Actas de Asamblea
            </h1>
            <p className="text-muted-foreground mt-2">
              Genera y gestiona las actas para las asambleas de tu empresa.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impresa')}>
                <Printer className="mr-2"/> Imprimir Acta
            </Button>
            <Button onClick={() => handleAction('descargada')}>
                <Download className="mr-2"/> Descargar Acta (.doc)
            </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Generador de Acta</CardTitle>
            <CardDescription>Completa los campos para redactar el acta de asamblea.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tipo-asamblea">Tipo de Asamblea</Label>
                    <Select defaultValue="ordinaria">
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
                    <Input id="fecha-asamblea" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="detalles-asamblea">Orden del Día, Deliberaciones y Decisiones</Label>
                <Textarea id="detalles-asamblea" placeholder="Describe los puntos tratados y las decisiones tomadas en la asamblea..." className="h-48"/>
             </div>
        </CardContent>
         <CardFooter>
             <Button className="w-full">
                <CheckCircle className="mr-2"/> Guardar y Registrar Acta
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}



"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Copy, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

const modelos = {
    anulacionMulta: {
        titulo: "Solicitud de Anulación de Multa",
        descripcion: "Redacta un escrito para solicitar la anulación de una sanción, argumentando los motivos.",
        plantilla: `Ciudad y Fecha,

Superintendente del SENIAT
Presente.-

Asunto: Solicitud de Anulación de Multa (Expediente N° [Número de Expediente])

Yo, [Tu Nombre Completo], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF J-XXXXXXXX-X, me dirijo a usted con el debido respeto para solicitar la anulación de la multa impuesta mediante el acto administrativo N° [Número del Acto], de fecha [Fecha del Acto], por un monto de [Monto de la Multa].

Fundamentamos nuestra solicitud en los siguientes hechos: [Explica de forma clara y concisa los argumentos, por ejemplo: "El retraso en la declaración se debió a una falla comprobable en el portal fiscal..."].

Anexamos los siguientes recaudos que sustentan nuestra petición: [Lista de documentos, ej: "Copia del RIF, Copia del Acta Constitutiva, Capturas de pantalla del error del portal"].

Agradeciendo de antemano su atención, quedamos a su disposición.

Atentamente,

_________________________
[Tu Nombre Completo]
[Tu Cédula]
[Cargo]
[Teléfono de Contacto]
`,
    },
    estatusFiscal: {
        titulo: "Consulta de Estatus Fiscal",
        descripcion: "Solicita formalmente información sobre el estatus fiscal actual de la empresa.",
        plantilla: `Ciudad y Fecha,

Superintendente del SENIAT
Presente.-

Asunto: Consulta de Estatus Fiscal

Yo, [Tu Nombre Completo], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF J-XXXXXXXX-X, me dirijo a usted con el fin de solicitar formalmente un informe detallado sobre el estatus fiscal actual de nuestra compañía.

Requerimos esta información para verificar que nos encontramos solventes con todas nuestras obligaciones tributarias y para fines de auditoría interna.

Agradeciendo su colaboración,

Atentamente,

_________________________
[Tu Nombre Completo]
[Tu Cédula]
[Cargo]
`,
    },
    cambioDomicilio: {
        titulo: "Notificación de Cambio de Domicilio Fiscal",
        descripcion: "Informa al SENIAT sobre el cambio de la dirección fiscal de la empresa.",
        plantilla: `Ciudad y Fecha,

Superintendente del SENIAT
Presente.-

Asunto: Notificación de Cambio de Domicilio Fiscal

Yo, [Tu Nombre Completo], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF J-XXXXXXXX-X, cumplo con notificar formalmente el cambio de nuestro domicilio fiscal.

Nuestra nueva dirección fiscal es: [Nueva Dirección Fiscal Completa].

Anexamos los siguientes documentos que soportan dicho cambio: [Copia del RIF actualizado, Recibo de servicio público a nombre de la empresa].

Agradeciendo su atención,

Atentamente,

_________________________
[Tu Nombre Completo]
[Tu Cédula]
[Cargo]
`,
    },
};

type ModeloKey = keyof typeof modelos;

export default function CartasSeniatPage() {
    const [selectedModelo, setSelectedModelo] = useState<ModeloKey>("anulacionMulta");
    const [contenido, setContenido] = useState(modelos.anulacionMulta.plantilla);
    const { toast } = useToast();

    const handleSelectModelo = (key: ModeloKey) => {
        setSelectedModelo(key);
        setContenido(modelos[key].plantilla);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(contenido);
        toast({
            title: "Texto Copiado",
            description: "El contenido de la carta ha sido copiado al portapapeles.",
        });
    };
    
    const handleDownload = () => {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<pre>${contenido}</pre>` + footer;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${modelos[selectedModelo].titulo.replace(/ /g, '_')}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
         toast({
            title: "Descarga Iniciada",
            description: "El modelo de carta se está descargando como un archivo de Word.",
        });
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow?.document.write(`<pre>${contenido}</pre>`);
        printWindow?.document.close();
        printWindow?.print();
        toast({
            title: "Imprimiendo Carta",
            description: "Se ha abierto la ventana de impresión.",
        });
    }

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Mail className="h-8 w-8" />
                Cartas y Comunicados para el SENIAT
            </h1>
            <p className="text-muted-foreground mt-2">
                Genera, edita y descarga modelos de cartas para tus trámites con el SENIAT.
            </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
                 {Object.entries(modelos).map(([key, value]) => (
                    <Card 
                        key={key} 
                        className={`cursor-pointer hover:border-primary transition-all bg-card/50 backdrop-blur-sm ${selectedModelo === key ? 'border-primary shadow-lg' : ''}`}
                        onClick={() => handleSelectModelo(key as ModeloKey)}
                    >
                        <CardHeader>
                            <CardTitle className="text-lg">{value.titulo}</CardTitle>
                            <CardDescription>{value.descripcion}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm sticky top-24">
                     <CardHeader>
                        <CardTitle>Editor de Carta</CardTitle>
                        <CardDescription>
                            Modifica la plantilla según tus necesidades antes de usarla.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            className="h-96 text-sm font-mono leading-relaxed"
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                         <Button variant="outline" onClick={handleCopy}>
                            <Copy className="mr-2"/>
                            Copiar Texto
                        </Button>
                         <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2"/>
                            Imprimir
                        </Button>
                         <Button onClick={handleDownload}>
                            <Download className="mr-2"/>
                            Descargar
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}

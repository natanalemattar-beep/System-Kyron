
"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Gavel } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";


const initialDocumentos: Solicitud[] = [
    {
        id: "DJ-2024-001",
        fecha: "10/06/2024",
        tipo: "Sentencia Definitiva",
        nombres: "Caso Expediente N° 123-456",
        estado: "Archivado",
        detalles: { tribunal: "Tribunal Supremo de Justicia", sala: "Sala de Casación Civil", juez: "Dr. Juan Mendoza", acta: "N/A", folio: "N/A", tomo: "N/A", registro: "N/A", ano: 2024 }
    },
    {
        id: "DJ-2024-002",
        fecha: "20/07/2024",
        tipo: "Auto de Admisión",
        nombres: "Caso Expediente N° 789-012",
        estado: "Activo",
        detalles: { tribunal: "Tribunal 15 de Primera Instancia en lo Civil", juez: "Dra. Ana Pérez", acta: "N/A", folio: "N/A", tomo: "N/A", registro: "N/A", ano: 2024 }
    },
    {
        id: "DJ-2024-003",
        fecha: "25/07/2024",
        tipo: "Medida Cautelar",
        nombres: "Caso Expediente N° 345-678",
        estado: "Activo",
        detalles: { tribunal: "Tribunal Superior 3ro en lo Contencioso", juez: "Dr. Carlos Gómez", acta: "N/A", folio: "N/A", tomo: "N/A", registro: "N/A", ano: 2024 }
    },
    {
        id: "DJ-2024-004",
        fecha: "28/07/2024",
        tipo: "Sentencia Interlocutoria",
        nombres: "Caso Expediente N° 999-111",
        estado: "Rechazado",
        motivoRechazo: "Faltan documentos de respaldo para la solicitud.",
        detalles: { tribunal: "Tribunal 4to de Mediación y Sustanciación", juez: "Dra. Luisa Rivas", acta: "N/A", folio: "N/A", tomo: "N/A", registro: "N/A", ano: 2024 }
    },
];

const getDocumentoJudicialContent = (doc: Solicitud) => `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 12px; line-height: 1.6; padding: 2cm; width: 21cm; height: 29.7cm; margin: auto; border: 1px solid #ddd; background: white; color: black; box-sizing: border-box;">
        <div style="text-align: center; margin-bottom: 2cm;">
            <p style="margin:0; font-weight: bold;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
            <p style="margin:0; font-weight: bold;">PODER JUDICIAL</p>
            <p style="margin:0;">${doc.detalles.tribunal?.toUpperCase()}</p>
        </div>
        <h1 style="text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 2cm;">${doc.tipo.toUpperCase()}</h1>
        <p><strong>EXPEDIENTE N°:</strong> ${doc.nombres}</p>
        <p><strong>FECHA:</strong> ${doc.fecha}</p>
        <br/>
        <p>Vistos, etc. Este Tribunal, administrando justicia en nombre de la República y por autoridad de la Ley, declara...</p>
        <br/>
        <p>[Contenido del dispositivo o de la decisión judicial]...</p>
        <br/>
        <p>Dada, firmada y sellada en la Sala de Despacho de este Tribunal.</p>
        <br/><br/><br/>
        <div style="text-align: center; padding-top: 3cm;">
            <p style="border-top: 1px solid black; padding-top: 5px;">${doc.detalles.juez}</p>
            <p style="font-weight: bold;">Juez(a)</p>
        </div>
    </div>
`;


export default function DocumentosJudicialesPage() {
    const { toast } = useToast();
    const [documentos, setDocumentos] = useState(initialDocumentos);
    const [filter, setFilter] = useState("todos");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const tipoDocRef = useRef<HTMLInputElement>(null);
    const nroCasoRef = useRef<HTMLInputElement>(null);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const tipoDoc = tipoDocRef.current?.value;
        const nroCaso = nroCasoRef.current?.value;

        if (!tipoDoc || !nroCaso) {
            toast({ variant: "destructive", title: "Error", description: "Por favor, complete todos los campos." });
            return;
        }
        
        const newDoc: Solicitud = {
            id: `DJ-${new Date().getFullYear()}-${String(documentos.length + 1).padStart(3, '0')}`,
            fecha: new Date().toLocaleDateString('es-VE'),
            tipo: tipoDoc,
            nombres: `Caso ${nroCaso}`,
            estado: "Activo",
            detalles: {
                tribunal: "Tribunal por Asignar",
                juez: "Juez por Asignar",
                acta: "N/A",
                folio: "N/A",
                tomo: "N/A",
                registro: "N/A",
                ano: new Date().getFullYear(),
            }
        };

        setDocumentos(prev => [newDoc, ...prev]);
        setIsDialogOpen(false);

         toast({
            title: "Solicitud Recibida",
            description: "Tu solicitud de documento judicial ha sido creada y está en proceso."
        });
    }

    const filteredDocumentos = documentos.filter(d => {
        if (filter === "todos") return true;
        const estadoNormalizado = d.estado.toLowerCase().replace(/\s+/g, '-');
        return estadoNormalizado === filter;
    });


  return (
    <div className="space-y-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gavel className="h-8 w-8"/>
            Documentos Judiciales
          </h1>
          <p className="text-muted-foreground">
            Consulta y gestiona tus documentos judiciales.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2" />
                  Nueva Solicitud
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle>Solicitar Nuevo Documento Judicial</DialogTitle>
                        <DialogDescription>
                            Completa los datos para iniciar el trámite.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="tipo-doc">Tipo de Documento</Label>
                            <Input ref={tipoDocRef} id="tipo-doc" name="tipo-doc" placeholder="Ej: Copia Certificada de Sentencia" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nro-caso">Número de Expediente / Caso</Label>
                            <Input ref={nroCasoRef} id="nro-caso" name="nro-caso" placeholder="Ej: AP11-V-2024-000123" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Enviar Solicitud</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Mis Documentos</CardTitle>
            <CardDescription>Historial de documentos asociados a tus casos.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                 <TabsList className="grid w-full grid-cols-4 max-w-lg mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="activo">Activos</TabsTrigger>
                    <TabsTrigger value="archivado">Archivados</TabsTrigger>
                    <TabsTrigger value="rechazado">Rechazados</TabsTrigger>
                </TabsList>
                <TabsContent value={filter}>
                    <DocumentRequestTable 
                        solicitudes={filteredDocumentos} 
                        getDocumentContent={getDocumentoJudicialContent}
                        docTypeForDownload="Documento_Judicial"
                     />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

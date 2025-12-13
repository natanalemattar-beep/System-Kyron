
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye, QrCode, Gavel, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type Documento = {
  id: string;
  fecha: string;
  tipo: string;
  caso: string;
  estado: "Activo" | "Archivado";
   detalles: {
    tribunal: string;
    sala?: string;
    juez: string;
  }
};

const documentos: Documento[] = [
    {
        id: "DJ-2024-001",
        fecha: "10/06/2024",
        tipo: "Sentencia Definitiva",
        caso: "Expediente N° 123-456",
        estado: "Archivado",
        detalles: { tribunal: "Tribunal Supremo de Justicia", sala: "Sala de Casación Civil", juez: "Dr. Juan Mendoza" }
    },
    {
        id: "DJ-2024-002",
        fecha: "20/07/2024",
        tipo: "Auto de Admisión",
        caso: "Expediente N° 789-012",
        estado: "Activo",
        detalles: { tribunal: "Tribunal 15 de Primera Instancia en lo Civil", juez: "Dra. Ana Pérez" }
    },
    {
        id: "DJ-2024-003",
        fecha: "25/07/2024",
        tipo: "Medida Cautelar",
        caso: "Expediente N° 345-678",
        estado: "Activo",
        detalles: { tribunal: "Tribunal Superior 3ro en lo Contencioso", juez: "Dr. Carlos Gómez" }
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Archivado: "outline",
  Activo: "secondary",
};


export default function DocumentosJudicialesPage() {
    const { toast } = useToast();
    const [filter, setFilter] = useState("todos");

    const handleDownload = (id: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `El documento judicial ${id} se está descargando.`
        });
    }

    const handleCreate = () => {
         toast({
            title: "Solicitud Recibida",
            description: "Tu solicitud de documento judicial ha sido creada y está en proceso."
        });
    }

    const filteredDocumentos = documentos.filter(d => {
        if (filter === "todos") return true;
        return d.estado.toLowerCase() === filter;
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
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2" />
                  Nueva Solicitud
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Solicitar Nuevo Documento Judicial</DialogTitle>
                    <DialogDescription>
                        Completa los datos para iniciar el trámite.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="tipo-doc">Tipo de Documento</Label>
                        <Input id="tipo-doc" placeholder="Ej: Copia Certificada de Sentencia" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nro-caso">Número de Expediente / Caso</Label>
                        <Input id="nro-caso" placeholder="Ej: AP11-V-2024-000123" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleCreate}>Enviar Solicitud</Button>
                </DialogFooter>
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
                 <TabsList className="grid w-full grid-cols-3 max-w-md mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="activo">Activos</TabsTrigger>
                    <TabsTrigger value="archivado">Archivados</TabsTrigger>
                </TabsList>
                <TabsContent value={filter}>
                    <DocumentsTable documentos={filteredDocumentos} onDownload={handleDownload} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentsTable({ documentos, onDownload }: { documentos: Documento[], onDownload: (id: string) => void }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nro. Documento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Caso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {documentos.length > 0 ? (
                    documentos.map((doc) => (
                    <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.id}</TableCell>
                        <TableCell>{doc.fecha}</TableCell>
                        <TableCell>{doc.tipo}</TableCell>
                        <TableCell>{doc.caso}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[doc.estado]}>{doc.estado}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="mr-2">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Detalle del Documento: {doc.id}</DialogTitle>
                                         <DialogDescription>
                                            <span className="font-semibold">{doc.tipo}</span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-3 text-sm">
                                         <div className="space-y-1"><p className="text-muted-foreground">Nº de Caso/Expediente</p><p>{doc.caso}</p></div>
                                         <div className="space-y-1"><p className="text-muted-foreground">Tribunal</p><p>{doc.detalles.tribunal}</p></div>
                                         {doc.detalles.sala && <div className="space-y-1"><p className="text-muted-foreground">Sala</p><p>{doc.detalles.sala}</p></div>}
                                         <div className="space-y-1"><p className="text-muted-foreground">Juez</p><p>{doc.detalles.juez}</p></div>
                                         <div className="space-y-1"><p className="text-muted-foreground">Fecha</p><p>{doc.fecha}</p></div>
                                        <div className="flex justify-center pt-4">
                                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=doc-judicial-${doc.id}`} alt={`QR for ${doc.id}`} width={100} height={100} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button>Cerrar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon" onClick={() => onDownload(doc.id)}>
                                <FileDown className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
                ) : (
                     <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">No hay documentos en este estado.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

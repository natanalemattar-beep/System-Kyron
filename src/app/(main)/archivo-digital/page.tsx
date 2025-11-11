
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, PlusCircle, Download, Eye, Trash2, CheckCircle, FileUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addYears, format } from "date-fns";
import { FileInputTrigger } from "@/components/file-input-trigger";
import Image from "next/image";

const initialDocuments = [
    { id: "DOC-001", nombre: "Acta Constitutiva Original", categoria: "Documentos Legales", fechaCarga: new Date(2012, 5, 15), fechaVencimiento: addYears(new Date(2012, 5, 15), 12), facturaAsociada: null, imagenUrl: null },
    { id: "DOC-002", nombre: "RIF de la Empresa", categoria: "Fiscal", fechaCarga: new Date(2023, 0, 20), fechaVencimiento: addYears(new Date(2023, 0, 20), 12), facturaAsociada: null, imagenUrl: null },
    { id: "DOC-003", nombre: "Factura de Compra de OficinaTech", categoria: "Compras", fechaCarga: new Date(2024, 6, 18), fechaVencimiento: addYears(new Date(2024, 6, 18), 12), facturaAsociada: "F-2024-00123", imagenUrl: "https://picsum.photos/seed/invoice-photo1/100/100" },
    { id: "DOC-004", nombre: "Estado de Cuenta - Enero 2024", categoria: "Financiero", fechaCarga: new Date(2024, 0, 31), fechaVencimiento: addYears(new Date(2024, 0, 31), 12), facturaAsociada: null, imagenUrl: null },
    { id: "DOC-005", nombre: "Factura de Compra de Suministros", categoria: "Compras", fechaCarga: new Date(2024, 6, 19), fechaVencimiento: addYears(new Date(2024, 6, 19), 12), facturaAsociada: "F-2024-00890", imagenUrl: "https://picsum.photos/seed/invoice-photo2/100/100" },
];

type Documento = typeof initialDocuments[0];

const getStatus = (fechaVencimiento: Date) => {
    return new Date() > fechaVencimiento ? { text: "Vencido", variant: "destructive" as const } : { text: "Activo", variant: "default" as const };
};

export default function ArchivoDigitalPage() {
    const [documents, setDocuments] = useState(initialDocuments);
    const [file, setFile] = useState<File | null>(null);
    const [newDocInfo, setNewDocInfo] = useState({ categoria: "", facturaAsociada: ""});
    const { toast } = useToast();

    const handleFileUpload = (selectedFile: File) => {
        setFile(selectedFile);
        toast({
            title: "Archivo Seleccionado",
            description: `"${selectedFile.name}" listo para ser archivado.`,
        });
    };

    const handleSaveDocument = () => {
         if (!file) {
            toast({ variant: "destructive", title: "Error", description: "Por favor, selecciona un archivo." });
            return;
         };
        const newDoc: Documento = {
            id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
            nombre: file.name,
            categoria: newDocInfo.categoria || "General",
            fechaCarga: new Date(),
            fechaVencimiento: addYears(new Date(), 12),
            facturaAsociada: newDocInfo.facturaAsociada || null,
            imagenUrl: URL.createObjectURL(file)
        };
        setDocuments(prev => [newDoc, ...prev]);
        setFile(null);
        setNewDocInfo({ categoria: "", facturaAsociada: "" });
        toast({
            title: "Documento Archivado Exitosamente",
            description: "El archivo ha sido guardado y su período de retención de 12 años ha comenzado.",
            action: <CheckCircle className="text-green-500" />
        });
    }

    const handleDelete = (docId: string) => {
        setDocuments(documents.filter(doc => doc.id !== docId));
        toast({
            variant: "destructive",
            title: "Documento Eliminado",
            description: `El documento ${docId} ha sido eliminado del archivo.`
        });
    }

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Archive className="h-8 w-8" />
                        Archivo Digital y Fiscal
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Gestiona y almacena documentos críticos, asociando fotos de facturas a sus registros para fiscalización.
                    </p>
                </div>
                <Dialog onOpenChange={(open) => !open && (setFile(null), setNewDocInfo({ categoria: "", facturaAsociada: ""}))}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Cargar Documento
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Archivar Nuevo Documento</DialogTitle>
                            <DialogDescription>
                               Sube el archivo, clasifícalo y asócialo a una factura si es necesario.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                             <div className="space-y-2">
                                <Label htmlFor="categoria">Categoría</Label>
                                <Input id="categoria" placeholder="Ej: Compras, Documentos Legales, Fiscal" value={newDocInfo.categoria} onChange={(e) => setNewDocInfo({...newDocInfo, categoria: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facturaAsociada">Nro. de Factura Asociada (Opcional)</Label>
                                <Input id="facturaAsociada" placeholder="Ej: F-2024-00123" value={newDocInfo.facturaAsociada} onChange={(e) => setNewDocInfo({...newDocInfo, facturaAsociada: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Archivo</Label>
                                <FileInputTrigger onFileSelect={handleFileUpload}>
                                    <Button variant="outline" className="w-full">
                                        <FileUp className="mr-2 h-4 w-4" />
                                        {file ? file.name : "Seleccionar Archivo (PDF, JPG, etc.)"}
                                    </Button>
                                </FileInputTrigger>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSaveDocument} disabled={!file}>Guardar y Archivar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Repositorio de Documentos</CardTitle>
                    <CardDescription>
                        Listado de documentos archivados para cumplimiento fiscal y gestión interna.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Imagen</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead>Factura Asociada</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Fecha de Carga</TableHead>
                                <TableHead>Vencimiento del Archivo</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => {
                                const status = getStatus(doc.fechaVencimiento);
                                return (
                                <TableRow key={doc.id}>
                                     <TableCell>
                                        {doc.imagenUrl ? (
                                            <Image src={doc.imagenUrl} alt={`Vista previa de ${doc.nombre}`} width={40} height={40} className="rounded-md object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center">
                                                <FileText className="h-5 w-5 text-muted-foreground"/>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{doc.nombre}</TableCell>
                                    <TableCell className="font-mono text-xs">{doc.facturaAsociada || 'N/A'}</TableCell>
                                    <TableCell>{doc.categoria}</TableCell>
                                    <TableCell>{format(doc.fechaCarga, "dd/MM/yyyy")}</TableCell>
                                    <TableCell>{format(doc.fechaVencimiento, "dd/MM/yyyy")}</TableCell>
                                    <TableCell>
                                        <Badge variant={status.variant}>{status.text}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=doc-${doc.id}`} alt={`QR for ${doc.id}`} width={24} height={24} className="inline-block mr-2" />
                                        <Button variant="ghost" size="icon" title="Ver"><Eye className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="icon" title="Descargar"><Download className="h-4 w-4"/></Button>
                                         <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" title="Eliminar" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>¿Confirmar eliminación?</DialogTitle>
                                                    <DialogDescription>
                                                        Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar permanentemente el documento "{doc.nombre}"?
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="ghost">Cancelar</Button>
                                                    <Button variant="destructive" onClick={() => handleDelete(doc.id)}>Eliminar</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

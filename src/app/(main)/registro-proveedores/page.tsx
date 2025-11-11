
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, PlusCircle, CheckCircle, FileUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { Checkbox } from "@/components/ui/checkbox";

const initialProveedores = [
    { id: "PROV-001", nombre: "OficinaTech C.A.", rif: "J-12345678-9", contacto: "Juan González", email: "ventas@oficinatech.com", estado: "Activo" },
    { id: "PROV-002", nombre: "Suministros Globales", rif: "J-98765432-1", contacto: "Ana Castillo", email: "pagos@suministrosglobales.com", estado: "Activo" },
    { id: "PROV-003", nombre: "Importadora XYZ", rif: "J-88776655-0", contacto: "Carlos Mendoza", email: "admin@importadoraxyz.com", estado: "Inactivo" },
];

type Proveedor = typeof initialProveedores[0];

export default function RegistroProveedoresPage() {
    const { toast } = useToast();
    const [proveedores, setProveedores] = useState(initialProveedores);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleRegister = () => {
        toast({
            title: "Proveedor Registrado",
            description: "El nuevo proveedor ha sido añadido al sistema.",
        });
    };
    
    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        toast({
            title: "Documento Cargado",
            description: `"${file.name}" está listo para ser archivado junto con el registro del proveedor.`,
        });
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <UserCog className="h-8 w-8" />
                        Registro y Gestión de Proveedores
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Administra la información de tus proveedores para agilizar los pagos y la gestión de compras.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Proveedor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Registrar Nuevo Proveedor</DialogTitle>
                            <DialogDescription>
                                Completa la información fiscal y de contacto del proveedor.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="razon-social">Razón Social</Label>
                                    <Input id="razon-social" placeholder="Ej: Suministros C.A." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rif">RIF</Label>
                                    <Input id="rif" placeholder="J-12345678-9" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contacto-nombre">Nombre del Contacto</Label>
                                    <Input id="contacto-nombre" placeholder="Juan Pérez" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="contacto-email">Correo de Contacto</Label>
                                    <Input id="contacto-email" type="email" placeholder="contacto@proveedor.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="banco">Información Bancaria</Label>
                                <Input id="banco" placeholder="Banco, Nro de Cuenta, Titular, RIF/CI" />
                            </div>
                            <div className="space-y-2">
                                <Label>Documentos (RIF)</Label>
                                <FileInputTrigger onFileSelect={handleFileSelect}>
                                    <Button variant="outline" className="w-full">
                                        <FileUp className="mr-2 h-4 w-4" />
                                        {selectedFile ? selectedFile.name : "Cargar Archivo (PDF, JPG)"}
                                    </Button>
                                </FileInputTrigger>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="is-contribuyente" />
                                <Label htmlFor="is-contribuyente">¿Es Contribuyente Especial del IVA?</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleRegister}>Guardar Proveedor</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Directorio de Proveedores</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Razón Social</TableHead>
                                <TableHead>RIF</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {proveedores.map((proveedor) => (
                                <TableRow key={proveedor.id}>
                                    <TableCell className="font-medium">{proveedor.nombre}</TableCell>
                                    <TableCell>{proveedor.rif}</TableCell>
                                    <TableCell>{proveedor.contacto}</TableCell>
                                    <TableCell>{proveedor.email}</TableCell>
                                    <TableCell>{proveedor.estado}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, PlusCircle, Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

const initialActas = [
    { id: "AO-2024-001", fecha: "2024-03-15", tipo: "Asamblea Ordinaria", resumen: "Aprobación de estados financieros del ejercicio fiscal 2023.", estado: "Archivado" },
    { id: "AE-2024-002", fecha: "2024-06-20", tipo: "Asamblea Extraordinaria", resumen: "Aumento del capital social y modificación de la cláusula quinta.", estado: "Archivado" },
    { id: "JD-2024-003", fecha: "2024-07-10", tipo: "Acta de Junta Directiva", resumen: "Nombramiento de nuevo Gerente de Operaciones.", estado: "Activo" },
];

type Acta = typeof initialActas[0];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Activo: "default",
  Archivado: "secondary",
  Anulado: "outline",
};

export default function ActaAsambleaPage() {
    const [actas, setActas] = useState(initialActas);
    const { toast } = useToast();
    
    const handleRegister = () => {
        toast({
            title: "Acta Registrada",
            description: "La nueva acta de asamblea ha sido guardada en el sistema.",
        });
    };

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-8 w-8" />
                        Libro de Actas y Asambleas
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Gestiona el registro de todas las actas de asambleas de la compañía.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Nueva Acta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Registrar Nueva Acta</DialogTitle>
                            <DialogDescription>
                                Complete los datos del acta de asamblea para su registro.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="tipo-acta">Tipo de Acta</Label>
                                <Input id="tipo-acta" placeholder="Ej: Asamblea Extraordinaria" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fecha-acta">Fecha del Acta</Label>
                                <Input id="fecha-acta" type="date" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="resumen-acta">Resumen / Puntos Tratados</Label>
                                <Input id="resumen-acta" placeholder="Ej: Aprobación de estados financieros" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleRegister}>Guardar Acta</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Actas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Referencia</TableHead>
                                <TableHead>Tipo de Acta</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Resumen</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {actas.map((acta) => (
                                <TableRow key={acta.id}>
                                    <TableCell className="font-mono">{acta.id}</TableCell>
                                    <TableCell className="font-medium">{acta.tipo}</TableCell>
                                    <TableCell>{acta.fecha}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{acta.resumen}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[acta.estado]}>{acta.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Button variant="ghost" size="icon" title="Ver Documento">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                         <Button variant="ghost" size="icon" title="Descargar PDF">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

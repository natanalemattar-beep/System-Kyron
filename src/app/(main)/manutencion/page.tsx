
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HeartHandshake, PlusCircle, CheckCircle, Download, Eye, FileUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { formatDate } from "@/lib/utils";
import { processDocumentAction } from "@/app/(main)/data-entry/actions";
import type { AutomatedDataEntryOutput } from "@/ai/flows/automated-data-entry-from-image";

const initialPagos = [
    { id: "MAN-001", fecha: "2024-07-05", monto: 1500, beneficiario: "Menor A. Rodríguez", estado: "Verificado", reciboUrl: "#" },
    { id: "MAN-002", fecha: "2024-06-05", monto: 1500, beneficiario: "Menor A. Rodríguez", estado: "Verificado", reciboUrl: "#" },
    { id: "MAN-003", fecha: "2024-05-05", monto: 1400, beneficiario: "Menor A. Rodríguez", estado: "Verificado", reciboUrl: "#" },
];

type Pago = typeof initialPagos[0];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Verificado: "default",
  "Pendiente de Verificación": "secondary",
  Rechazado: "destructive",
};

export default function ManutencionPage() {
    const [pagos, setPagos] = useState(initialPagos);
    const [file, setFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [monto, setMonto] = useState("");
    const [fechaPago, setFechaPago] = useState(new Date().toISOString().substring(0, 10));
    const [beneficiario, setBeneficiario] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const { toast } = useToast();

    const handleFileSelect = async (selectedFile: File) => {
        setFile(selectedFile);
        setIsProcessing(true);
        toast({
            title: "Procesando Recibo...",
            description: "Extrayendo información del documento.",
        });

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = async () => {
            const photoDataUri = reader.result as string;
            const response = await processDocumentAction({ photoDataUri });

            setIsProcessing(false);
            if ("error" in response) {
                toast({
                    variant: "destructive",
                    title: "Error al Procesar",
                    description: response.error,
                });
            } else {
                setMonto(String(response.totalAmount || ""));
                if (response.date) {
                    setFechaPago(new Date(response.date).toISOString().substring(0, 10));
                }
                setBeneficiario(response.vendorName || "");
                toast({
                    title: "Información Extraída",
                    description: "Los datos del recibo han sido cargados en el formulario.",
                    action: <CheckCircle className="text-green-500" />
                });
            }
        };
        reader.onerror = () => {
            setIsProcessing(false);
            toast({
                variant: "destructive",
                title: "Error de Lectura",
                description: "No se pudo leer el archivo seleccionado.",
            });
        };
    };

    const handleRegisterPayment = () => {
        const newPayment: Pago = {
            id: `MAN-${String(pagos.length + 1).padStart(3, '0')}`,
            fecha: fechaPago,
            monto: Number(monto),
            beneficiario: beneficiario || "Menor A. Rodríguez",
            estado: "Pendiente de Verificación",
            reciboUrl: "#"
        };
        setPagos(prev => [newPayment, ...prev]);
        resetForm();
        setIsDialogOpen(false);
        toast({
            title: "Pago Registrado Exitosamente",
            description: "El pago está pendiente de verificación por la otra parte.",
            action: <CheckCircle className="text-green-500" />
        });
    }

    const resetForm = () => {
        setFile(null);
        setMonto("");
        setFechaPago(new Date().toISOString().substring(0, 10));
        setBeneficiario("");
    }

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <HeartHandshake className="h-8 w-8" />
                    Pagos de Manutención
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registra y gestiona los pagos de manutención de forma segura.
                </p>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Registrar Nuevo Pago
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Nuevo Pago de Manutención</DialogTitle>
                        <DialogDescription>
                            Completa los detalles del pago y adjunta el comprobante. La IA extraerá los datos.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                         <div className="space-y-2">
                            <Label>Comprobante de Pago</Label>
                            <FileInputTrigger onFileSelect={handleFileSelect} acceptedFileTypes="image/jpeg,image/png">
                                <Button variant="outline" className="w-full" disabled={isProcessing}>
                                    {isProcessing ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando Recibo...</>
                                    ) : (
                                        <><FileUp className="mr-2 h-4 w-4" /> Cargar Recibo (JPG, PNG)</>
                                    )}
                                </Button>
                            </FileInputTrigger>
                            {file && !isProcessing &&
                                <div className="flex items-center justify-center text-sm text-green-500 font-medium pt-2">
                                    <CheckCircle className="h-4 w-4 mr-2"/>
                                    <p>Archivo cargado: {file.name}</p>
                                </div>
                            }
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="monto">Monto del Pago (Bs.)</Label>
                            <Input id="monto" type="number" placeholder="Ej: 1500.00" value={monto} onChange={(e) => setMonto(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fecha-pago">Fecha de Pago</Label>
                            <Input id="fecha-pago" type="date" value={fechaPago} onChange={(e) => setFechaPago(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="beneficiario">Beneficiario</Label>
                            <Input id="beneficiario" placeholder="Nombre del beneficiario" value={beneficiario} onChange={(e) => setBeneficiario(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleRegisterPayment} disabled={!file || isProcessing}>Guardar Pago</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>
                    Registro de todos los pagos de manutención realizados.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID de Pago</TableHead>
                            <TableHead>Fecha de Pago</TableHead>
                            <TableHead>Beneficiario</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pagos.map((pago) => (
                            <TableRow key={pago.id}>
                                <TableCell className="font-mono">{pago.id}</TableCell>
                                <TableCell>{formatDate(pago.fecha)}</TableCell>
                                <TableCell className="font-medium">{pago.beneficiario}</TableCell>
                                <TableCell className="text-right">{formatCurrency(pago.monto, 'Bs.')}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={statusVariant[pago.estado]}>{pago.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="icon" title="Ver Recibo">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Descargar Recibo">
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

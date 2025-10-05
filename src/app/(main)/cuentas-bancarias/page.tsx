
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, PlusCircle, CreditCard, Eye, FileScan, Upload, CheckCircle, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const cuentasBancarias = [
    { id: 1, banco: "Banco de Venezuela", logo: "/banks/bdv.png", numero: "**** **** **** 1234", tipo: "Corriente", saldo: 150000, moneda: "Bs.", pais: "Venezuela" },
    { id: 2, banco: "Banesco", logo: "/banks/banesco.png", numero: "**** **** **** 5678", tipo: "Corriente", saldo: 25000, moneda: "Bs.", pais: "Venezuela" },
    { id: 3, banco: "Mercantil", logo: "/banks/mercantil.png", numero: "**** **** **** 9012", tipo: "Corriente", saldo: 75000, moneda: "Bs.", pais: "Venezuela" },
    { id: 4, banco: "Bancamiga", logo: "/banks/bancamiga.png", numero: "**** **** **** 3456", tipo: "Cuenta en Dólares", saldo: 12500, moneda: "USD", pais: "Venezuela" },
    { id: 5, banco: "Facebank", logo: "https://picsum.photos/seed/facebank/48/48", numero: "**** **** **** 1122", tipo: "Checking", saldo: 45000, moneda: "USD", pais: "EE.UU." },
    { id: 6, banco: "Banco Nacional de Crédito", logo: "/banks/bnc.png", numero: "**** **** **** 3344", tipo: "Corriente", saldo: 62000, moneda: "Bs.", pais: "Venezuela" },
    { id: 7, banco: "Oldenburgische Landesbank AG", logo: "https://picsum.photos/seed/olb/48/48", numero: "**** **** **** 5566", tipo: "Girokonto", saldo: 30000, moneda: "EUR", pais: "Alemania" },
    { id: 8, banco: "Banco Exterior", logo: "/banks/exterior.png", numero: "**** **** **** 7788", tipo: "Corriente", saldo: 31000, moneda: "Bs.", pais: "Venezuela" },
];

const puntosDeVenta = [
    { id: "POS-001", banco: "Banesco", cuentaAfiliada: "**** 5678", estado: "Activo" },
    { id: "POS-002", banco: "Banco de Venezuela", cuentaAfiliada: "**** 1234", estado: "Activo" },
    { id: "POS-003", banco: "Mercantil", cuentaAfiliada: "**** 9012", estado: "Inactivo" },
];

const statusVariant: { [key: string]: "default" | "destructive" } = {
  Activo: "default",
  Inactivo: "destructive",
};

export default function CuentasBancariasPage() {
    const { toast } = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleAction = (message: string) => {
        toast({
            title: "Acción Realizada",
            description: message,
        });
    };

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            toast({
                title: "Archivo Cargado y Guardado en la Nube",
                description: `"${selectedFile.name}" se ha archivado de forma segura y se conservará por 10 años.`,
                action: <CheckCircle className="text-green-500" />,
            });
            setSelectedFile(null); // Reset after upload
        }
    };

  return (
    <div>
      <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Landmark className="h-8 w-8" />
                Cuentas Bancarias y POS
            </h1>
            <p className="text-muted-foreground mt-2">
              Consulta saldos, carga estados de cuenta y gestiona tus puntos de venta.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Agregar Cuenta/POS
        </Button>
      </header>

      {/* Cuentas Bancarias */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cuentas Bancarias</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cuentasBancarias.map(cuenta => (
                <Card key={cuenta.id} className="flex flex-col bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <Image src={cuenta.logo} alt={`${cuenta.banco} logo`} width={48} height={48} className="rounded-md" />
                        <div>
                            <CardTitle>{cuenta.banco}</CardTitle>
                            <CardDescription>{cuenta.pais}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{cuenta.tipo}</p>
                        <p className="font-mono text-lg">{cuenta.numero}</p>
                        <p className="text-sm text-muted-foreground mt-4">Saldo Disponible</p>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(cuenta.saldo, cuenta.moneda)}</p>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2">
                         <Button variant="outline" className="w-full">
                            <Eye className="mr-2"/>
                            Ver Movimientos
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                               <Button variant="secondary" className="w-full">
                                    <Upload className="mr-2"/>
                                    Cargar Estado de Cuenta
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Cargar Estado de Cuenta para {cuenta.banco}</DialogTitle>
                                    <DialogDescription>
                                       Sube el archivo del estado de cuenta (PDF, JPG, etc.) para su archivo digital seguro.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                     <FileInputTrigger onFileSelect={handleFileSelect}>
                                        <Button variant="outline" className="w-full">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Seleccionar Archivo
                                        </Button>
                                    </FileInputTrigger>
                                    {selectedFile && (
                                        <div className="flex items-center justify-center text-sm text-green-500 font-medium pt-4">
                                            <CheckCircle className="h-4 w-4 mr-2"/>
                                            <p>Archivo: {selectedFile.name}</p>
                                        </div>
                                    )}
                                </div>
                                <DialogFooter className="flex-col items-start gap-2 pt-4 border-t">
                                     <Button onClick={handleUpload} disabled={!selectedFile} className="w-full">
                                        Cargar y Archivar
                                    </Button>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2"><Info className="h-4 w-4 shrink-0"/>El documento se guardará de forma segura en la nube por 10 años.</p>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>

      {/* Puntos de Venta */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Puntos de Venta (POS)</h2>
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Terminales Afiliados</CardTitle>
                <CardDescription>Gestiona los cierres de lote y el estado de tus puntos de venta.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID Terminal</TableHead>
                            <TableHead>Banco</TableHead>
                            <TableHead>Cuenta Afiliada</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {puntosDeVenta.map(pos => (
                            <TableRow key={pos.id}>
                                <TableCell className="font-mono">{pos.id}</TableCell>
                                <TableCell className="font-medium">{pos.banco}</TableCell>
                                <TableCell>{pos.cuentaAfiliada}</TableCell>
                                <TableCell><Badge variant={statusVariant[pos.estado]}>{pos.estado}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleAction(`Cierre de lote solicitado para ${pos.id}.`)}>
                                        <FileScan className="mr-2 h-4 w-4"/>
                                        Solicitar Cierre de Lote
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}

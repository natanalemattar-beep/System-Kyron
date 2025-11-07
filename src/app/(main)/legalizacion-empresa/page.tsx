
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Newspaper, Search, Stamp, Users, ArrowRight, ShieldCheck, Upload, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { formatCurrency } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const initialPasos = [
    { 
        paso: 1,
        titulo: "Reserva de Nombre y Denominación Social",
        descripcion: "Se realiza ante el SAREN para verificar que el nombre elegido para la empresa esté disponible.",
        ente: "SAREN",
        estado: "Completado",
        icon: Search,
        arancel: 150
    },
    { 
        paso: 2,
        titulo: "Redacción y Visado del Acta Constitutiva",
        descripcion: "Un abogado debe redactar el documento constitutivo, especificando el capital, los socios y los estatutos de la empresa.",
        ente: "Abogado Colegiado",
        estado: "Completado",
        icon: FileText,
        arancel: 0
    },
    { 
        paso: 3,
        titulo: "Inscripción en el Registro Mercantil",
        descripcion: "Se presenta el acta constitutiva visada ante el Registro Mercantil correspondiente para su inscripción y legalización.",
        ente: "SAREN / Registro Mercantil",
        estado: "Pendiente",
        icon: Stamp,
        arancel: 1250
    },
    { 
        paso: 4,
        titulo: "Publicación en un Periódico Mercantil",
        descripcion: "Una vez inscrita, el acta constitutiva debe publicarse en un periódico mercantil para darle validez pública.",
        ente: "Periódico Mercantil",
        estado: "Pendiente",
        icon: Newspaper,
        arancel: 300
    },
     { 
        paso: 5,
        titulo: "Inscripción en el RIF (SENIAT)",
        descripcion: "Con el acta registrada y publicada, se procede a inscribir la empresa en el Registro de Información Fiscal (RIF).",
        ente: "SENIAT",
        estado: "Pendiente",
        icon: ShieldCheck,
        arancel: 0
    },
    { 
        paso: 6,
        titulo: "Inscripciones Parafiscales Obligatorias",
        descripcion: "Inscribir la empresa en el IVSS, BANAVIH (FAOV), INPSASEL y el Registro Nacional de Entidades de Trabajo (RNET).",
        ente: "IVSS, BANAVIH, INPSASEL, MPPPST",
        estado: "Pendiente",
        icon: Users,
        arancel: 0
    },
];

type Paso = typeof initialPasos[0];

const statusInfo = {
    Completado: { icon: CheckCircle, color: "text-green-500", label: "Completado" },
    Pendiente: { icon: Clock, color: "text-yellow-500", label: "Pendiente" },
};


export default function LegalizacionEmpresaPage() {
    const { toast } = useToast();
    const [pasos, setPasos] = useState(initialPasos);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleProcessStep = (pasoId: number, titulo: string) => {
        setPasos(prevPasos => prevPasos.map(p => p.paso === pasoId ? { ...p, estado: "Completado" } : p));
        setSelectedFile(null);
        toast({
            title: "Trámite Procesado Exitosamente",
            description: `El paso "${titulo}" ha sido marcado como completado y notificado.`,
            action: <CheckCircle className="text-green-500" />
        });
    };
    
    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        toast({
            title: "Documento Cargado",
            description: `"${file.name}" está listo para ser procesado.`
        });
    }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Stamp className="h-8 w-8" />
            Legalización de Empresa
        </h1>
        <p className="text-muted-foreground mt-2">
          Sigue y ejecuta los pasos para la constitución y legalización de tu empresa en Venezuela.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Flujo de Legalización</CardTitle>
            <CardDescription>Sigue este flujo de trabajo para registrar formalmente tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-9 top-0 h-full w-0.5 bg-border -z-10"></div>
                
                {pasos.map((paso) => {
                     const status = statusInfo[paso.estado as keyof typeof statusInfo];
                     const esTramiteSaren = paso.ente.includes("SAREN");

                     return (
                        <div key={paso.paso} className="relative flex items-start gap-6 pb-12">
                            {/* Step Circle */}
                            <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full shrink-0 ${paso.estado === 'Completado' ? 'bg-green-500' : 'bg-secondary'}`}>
                                <paso.icon className={`h-6 w-6 ${paso.estado === 'Completado' ? 'text-white' : 'text-primary'}`} />
                            </div>

                            {/* Step Content */}
                            <div className="flex-1 pt-2">
                                <h3 className="text-lg font-semibold">{paso.titulo}</h3>
                                <p className="text-sm text-muted-foreground mt-1 mb-3">Ente responsable: <span className="font-medium">{paso.ente}</span></p>
                                <p className="text-sm">{paso.descripcion}</p>
                                
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                     <div className={`flex items-center gap-2 text-sm font-semibold ${status.color}`}>
                                        <status.icon className="h-4 w-4" />
                                        <span>{status.label}</span>
                                    </div>
                                    {paso.estado === 'Pendiente' && esTramiteSaren && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm">
                                                    Iniciar Trámite SAREN <ArrowRight className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Procesar: {paso.titulo}</DialogTitle>
                                                    <DialogDescription>Carga el documento requerido y paga el arancel para procesar este trámite en el SAREN.</DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4 space-y-6">
                                                     <div className="space-y-2">
                                                        <Label>1. Cargar Documento Requerido</Label>
                                                        <FileInputTrigger onFileSelect={handleFileSelect}>
                                                            <Button variant="outline" className="w-full">
                                                                <Upload className="mr-2 h-4 w-4" />
                                                                {selectedFile ? selectedFile.name : "Seleccionar Archivo (PDF, DOCX)"}
                                                            </Button>
                                                        </FileInputTrigger>
                                                     </div>
                                                      <div className="space-y-2">
                                                        <Label>2. Pagar Arancel</Label>
                                                        <div className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="h-5 w-5 text-green-500" />
                                                                <span className="font-medium">Monto a Pagar:</span>
                                                            </div>
                                                            <span className="font-bold text-lg">{formatCurrency(paso.arancel, "Bs.")}</span>
                                                        </div>
                                                     </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button 
                                                        onClick={() => handleProcessStep(paso.paso, paso.titulo)} 
                                                        disabled={!selectedFile}
                                                        className="w-full"
                                                    >
                                                        Pagar y Procesar en SAREN
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        </div>
                     )
                })}

            </div>
        </CardContent>
      </Card>
    </div>
  );
}

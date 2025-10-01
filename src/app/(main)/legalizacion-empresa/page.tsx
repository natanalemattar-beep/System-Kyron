
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, FileText, Newspaper, Search, Stamp, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pasos = [
    { 
        paso: 1,
        titulo: "Reserva de Nombre y Denominación Social",
        descripcion: "Se realiza ante el SAREN para verificar que el nombre elegido para la empresa esté disponible.",
        ente: "SAREN",
        estado: "Completado",
        icon: Search
    },
    { 
        paso: 2,
        titulo: "Redacción y Visado del Acta Constitutiva",
        descripcion: "Un abogado debe redactar el documento constitutivo, especificando el capital, los socios y los estatutos de la empresa.",
        ente: "Abogado Colegiado",
        estado: "Completado",
        icon: FileText
    },
    { 
        paso: 3,
        titulo: "Inscripción en el Registro Mercantil",
        descripcion: "Se presenta el acta constitutiva visada ante el Registro Mercantil correspondiente para su inscripción y legalización.",
        ente: "SAREN / Registro Mercantil",
        estado: "Completado",
        icon: Stamp
    },
    { 
        paso: 4,
        titulo: "Publicación en un Periódico Mercantil",
        descripcion: "Una vez inscrita, el acta constitutiva debe publicarse en un periódico mercantil para darle validez pública.",
        ente: "Periódico Mercantil",
        estado: "Pendiente",
        icon: Newspaper
    },
     { 
        paso: 5,
        titulo: "Inscripción en el RIF (SENIAT)",
        descripcion: "Con el acta registrada y publicada, se procede a inscribir la empresa en el Registro de Información Fiscal (RIF).",
        ente: "SENIAT",
        estado: "Pendiente",
        icon: ShieldCheck
    },
    { 
        paso: 6,
        titulo: "Inscripciones Obligatorias",
        descripcion: "Inscribir la empresa en el IVSS, BANAVIH (FAOV), INPSASEL y el Registro Nacional de Entidades de Trabajo (RNA).",
        ente: "IVSS, BANAVIH, INPSASEL, MPPPST",
        estado: "Pendiente",
        icon: Users
    },
];

const statusInfo = {
    Completado: { icon: CheckCircle, color: "text-green-500", label: "Completado" },
    Pendiente: { icon: Clock, color: "text-yellow-500", label: "Pendiente" },
};


export default function LegalizacionEmpresaPage() {
    const { toast } = useToast();

    const handleAction = (titulo: string) => {
        toast({
            title: "Proceso Iniciado",
            description: `Se ha iniciado el trámite para: ${titulo}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Stamp className="h-8 w-8" />
            Legalización de Empresa
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía paso a paso para la constitución y legalización de tu empresa en Venezuela.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Procedimiento de Legalización</CardTitle>
            <CardDescription>Sigue estos pasos para registrar formalmente tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-9 top-0 h-full w-0.5 bg-border -z-10"></div>
                
                {pasos.map((paso, index) => {
                     const status = statusInfo[paso.estado as keyof typeof statusInfo];
                     return (
                        <div key={paso.paso} className="relative flex items-start gap-6 pb-12">
                            {/* Step Circle */}
                            <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${paso.estado === 'Completado' ? 'bg-green-500' : 'bg-secondary'}`}>
                                <paso.icon className={`h-6 w-6 ${paso.estado === 'Completado' ? 'text-white' : 'text-primary'}`} />
                            </div>

                            {/* Step Content */}
                            <div className="flex-1 pt-2">
                                <h3 className="text-lg font-semibold">{paso.titulo}</h3>
                                <p className="text-sm text-muted-foreground mt-1 mb-3">Ente responsable: <span className="font-medium">{paso.ente}</span></p>
                                <p className="text-sm">{paso.descripcion}</p>
                                
                                <div className="mt-4 flex items-center gap-4">
                                     <div className={`flex items-center gap-2 text-sm font-semibold ${status.color}`}>
                                        <status.icon className="h-4 w-4" />
                                        <span>{status.label}</span>
                                    </div>
                                    {paso.estado === 'Pendiente' && (
                                        <Button size="sm" variant="outline" onClick={() => handleAction(paso.titulo)}>
                                            Iniciar Trámite <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Button>
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

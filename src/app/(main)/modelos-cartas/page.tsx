
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mail, Briefcase, AlertCircle, Printer, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

const modelos = [
    {
        tipo: "Carta de Trabajo",
        descripcion: "Genera una constancia de trabajo para un empleado activo, especificando cargo, salario y fecha de ingreso.",
        icon: Briefcase,
    },
    {
        tipo: "Notificación de Despido",
        descripcion: "Crea una notificación formal de despido (justificado o injustificado) para un empleado.",
        icon: AlertCircle,
        variant: "destructive"
    },
    {
        tipo: "Amonestación Escrita",
        descripcion: "Elabora una amonestación escrita por incumplimiento de normativas internas o faltas leves.",
        icon: AlertCircle,
        variant: "secondary"
    },
];

export default function ModelosCartasPage() {
  const { toast } = useToast();

  const handleAction = (type: string, action: string) => {
    toast({
      title: `Acción Realizada: ${action}`,
      description: `La ${type} ha sido ${action === 'imprimir' ? 'enviada a la impresora' : 'enviada por correo'}.`,
    });
  };

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Mail className="h-8 w-8" />
                Modelos de Cartas y Notificaciones
            </h1>
            <p className="text-muted-foreground mt-2">
                Genera documentos y comunicaciones laborales estandarizadas.
            </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modelos.map(modelo => (
                <Card key={modelo.tipo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex-row items-start gap-4">
                        <modelo.icon className={`h-8 w-8 mt-1 ${modelo.variant === 'destructive' ? 'text-destructive' : 'text-primary'}`} />
                        <div>
                            <CardTitle>{modelo.tipo}</CardTitle>
                            <CardDescription>{modelo.descripcion}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full" variant={modelo.variant === 'destructive' ? 'destructive' : 'default'}>
                                    Generar {modelo.tipo}
                                </Button>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Previsualización: {modelo.tipo}</DialogTitle>
                                    <DialogDescription>
                                        El documento para [Nombre del Empleado] está listo.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="prose prose-sm dark:prose-invert bg-secondary/30 p-4 rounded-md my-4 max-h-60 overflow-y-auto">
                                    <p>A quien pueda interesar,</p>
                                    <p>Por medio de la presente se hace constar que el ciudadano(a)...</p>
                                    {/* Dummy content */}
                                </div>
                                <DialogFooter className="gap-2">
                                     <Button variant="outline" onClick={() => handleAction(modelo.tipo, 'imprimir')}>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Imprimir
                                    </Button>
                                    <Button onClick={() => handleAction(modelo.tipo, 'enviar')}>
                                        <Send className="mr-2 h-4 w-4" />
                                        Enviar por Correo
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}

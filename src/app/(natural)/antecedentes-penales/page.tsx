
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, CirclePlus as PlusCircle, CircleCheck as CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const certificados = [
    { id: "AP-2024-005", fecha: "22/07/2024", motivo: "Trámites Migratorios", estado: "Aprobado", vence: "22/10/2024" },
];

export default function AntecedentesPenalesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Shield className="h-8 w-8" />
                        Antecedentes Penales
                    </h1>
                    <p className="text-muted-foreground mt-2">Certificaciones internacionales del Ministerio de Relaciones Interiores.</p>
                </div>
                <Button onClick={() => toast({ title: "Solicitud Enviada", description: "Se ha iniciado el trámite ante el MPPRIJP." })}>
                    <PlusCircle className="mr-2"/> Nueva Solicitud
                </Button>
            </header>

            <div className="grid gap-6">
                {certificados.map(cert => (
                    <Card key={cert.id}>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <CardTitle>Certificado {cert.id}</CardTitle>
                                <CardDescription>Motivo: {cert.motivo}</CardDescription>
                            </div>
                            <Badge>{cert.estado}</Badge>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p><strong>Fecha de Emisión:</strong> {cert.fecha}</p>
                            <p><strong>Vencimiento:</strong> {cert.vence}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Download className="mr-2 h-4 w-4"/> Descargar Certificado PDF
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

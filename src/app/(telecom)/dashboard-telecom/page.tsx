
"use client";

import {
  Signal,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from 'next/link';

const initialComplianceStatus = [
    { id: "CON-001", name: "Concesión de Espectro Radioeléctrico", expires: "2028-03-20", status: "Vigente" },
    { id: "CON-002", name: "Licencia de Proveedor de Servicios (ISP)", expires: "2028-04-01", status: "Vigente" },
    { id: "CON-003", name: "Habilitación Postal", expires: "2024-06-01", status: "Vencida" },
];

const statusVariant: { [key: string]: { text: string, color: string } } = {
  Vigente: { text: "ACTIVO", color: "text-green-400" },
  Vencida: { text: "CRÍTICO", color: "text-red-400" },
  "Por Vencer": { text: "ADVERTENCIA", color: "text-yellow-400" },
};

export default function DashboardTelecomPage() {
    const licenciaVencida = initialComplianceStatus.find(l => l.status === 'Vencida');

  return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Signal className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            <span className="font-mono">Plataforma de Operaciones Telecom</span>
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Visión de misión crítica para la gestión integral de la operadora.</p>
      </header>
      
       {licenciaVencida && (
           <Alert variant="destructive" className="mb-8 bg-destructive/10 border-l-4 border-destructive">
                <span className="font-bold absolute left-4 top-4 text-sm">[TX!]</span>
                <AlertTitle className="ml-10 font-bold">ALERTA DE CUMPLIMIENTO CRÍTICO</AlertTitle>
                <AlertDescription className="ml-10 flex items-center justify-between">
                    <span>Su "{licenciaVencida.name}" está <strong>VENCIDA</strong> desde el {formatDate(licenciaVencida.expires)}. Existe riesgo de multas.</span>
                    <Button asChild variant="destructive" size="sm">
                       <Link href="/conatel/licenses">Iniciar Renovación Urgente</Link>
                    </Button>
                </AlertDescription>
            </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <Card>
                    <CardHeader>
                        <CardTitle>Resumen de Cumplimiento (CONATEL)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="text-primary">Licencia / Permiso</TableHead>
                            <TableHead className="text-primary">Estado</TableHead>
                            <TableHead className="text-right text-primary">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialComplianceStatus.map(item => (
                                <TableRow key={item.id} className="border-b border-border/50">
                                    <TableCell className="font-mono text-sm">
                                        {item.name} ({item.id})
                                        <p className="text-xs text-muted-foreground">Vence: {formatDate(item.expires)}</p>
                                    </TableCell>
                                    <TableCell>
                                       <span className={`font-bold text-sm ${statusVariant[item.status as keyof typeof statusVariant].color}`}>
                                          {statusVariant[item.status as keyof typeof statusVariant].text}
                                       </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href="/conatel/licenses">
                                                Gestionar <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
          </div>
          <div className="lg:col-span-2">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Información de Contacto CONATEL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm font-mono">
                    <h4 className="font-bold text-primary">[ PRESENTACIÓN PRESENCIAL OBLIGATORIA ]</h4>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li><strong className="text-foreground">Lugar:</strong> Oficina de Atención al Ciudadano.</li>
                        <li><strong className="text-foreground">Horario:</strong> L-V, 8:00-12:00 / 13:30-16:30.</li>
                        <li><strong className="text-foreground">Requisito:</strong> Representante legal o apoderado.</li>
                        <li><strong className="text-foreground">Base Legal:</strong> LOTEL, Art. 26.</li>
                    </ul>
                </CardContent>
             </Card>
          </div>
       </div>
    </div>
  );
}

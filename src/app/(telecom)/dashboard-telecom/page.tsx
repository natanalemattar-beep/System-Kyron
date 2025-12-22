
"use client";

import {
  Signal,
  ShieldCheck,
  FileText,
  AlertTriangle,
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

const statusVariant: { [key: string]: { pillClass: string, text: string } } = {
  Vigente: { pillClass: "bg-telecom-cyan-green/10 text-telecom-cyan-green", text: "ACTIVO" },
  Vencida: { pillClass: "bg-telecom-pink/10 text-telecom-pink", text: "CRÍTICO" },
  "Por Vencer": { pillClass: "bg-telecom-amber/10 text-telecom-amber", text: "ADVERTENCIA" },
};

export default function DashboardTelecomPage() {
    const licenciaVencida = initialComplianceStatus.find(l => l.status === 'Vencida');

  return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Signal className="h-8 w-8 md:h-10 md:w-10 text-telecom-cyan" />
            <span className="font-mono">TELECOM⌇</span>
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Plataforma de Operaciones Telecom. Visión de misión crítica.</p>
      </header>
      
       {licenciaVencida && (
           <Alert variant="destructive" className="mb-8 bg-telecom-magenta/5 border-l-4 border-telecom-magenta text-telecom-magenta">
                <span className="font-bold absolute left-4 top-4 text-sm">[TX!]</span>
                <AlertTitle className="ml-4 font-bold">ALERTA DE CUMPLIMIENTO CRÍTICO</AlertTitle>
                <AlertDescription className="ml-4 flex items-center justify-between">
                    <span>Su "{licenciaVencida.name}" está <strong>VENCIDA</strong>. Riesgo de multas activo.</span>
                    <Button asChild variant="destructive" size="sm" className="bg-telecom-magenta hover:bg-telecom-magenta/80 text-telecom-black font-bold">
                       <Link href="/conatel/licenses">Iniciar Renovación Urgente</Link>
                    </Button>
                </AlertDescription>
            </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <Card className="telecom-panel">
                    <CardHeader className="panel-header">
                        <CardTitle>Resumen de Cumplimiento (CONATEL)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table className="telecom-matrix">
                        <TableHeader>
                            <TableRow>
                            <TableHead>Licencia / Permiso</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialComplianceStatus.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono text-sm">
                                        {item.name} ({item.id})
                                        <p className="text-xs text-telecom-gray-4">Vence: {formatDate(item.expires)}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`px-2 py-1 rounded-full text-xs font-bold inline-block ${statusVariant[item.status as keyof typeof statusVariant].pillClass}`}>
                                            {statusVariant[item.status as keyof typeof statusVariant].text}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm" className="telecom-btn-secondary">
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
             <Card className="telecom-panel sticky top-24">
                <CardHeader className="panel-header">
                    <CardTitle>Información de Contacto CONATEL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm font-mono">
                    <h4 className="font-bold text-telecom-cyan">[ PRESENTACIÓN PRESENCIAL OBLIGATORIA ]</h4>
                    <ul className="list-disc pl-5 text-telecom-gray-4 space-y-2">
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

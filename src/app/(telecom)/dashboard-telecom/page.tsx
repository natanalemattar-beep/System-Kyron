
"use client";

import {
  Signal,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" } = {
  Vigente: "default",
  Vencida: "destructive",
  "Por Vencer": "secondary",
};


export default function DashboardTelecomPage() {
    const licenciaVencida = initialComplianceStatus.find(l => l.status === 'Vencida');

  return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Signal className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Telecomunicaciones
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Resumen de cumplimiento regulatorio y estado de la red.</p>
      </header>
      
       {licenciaVencida && (
           <Alert variant="destructive" className="mb-8">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>ALERTA DE CUMPLIMIENTO</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                    <span>Su "{licenciaVencida.name} ({licenciaVencida.id})" está <strong>VENCIDA</strong>. Existe riesgo de multas.</span>
                    <Button asChild variant="destructive" size="sm">
                       <Link href="/conatel/licenses">Iniciar Renovación Urgente</Link>
                    </Button>
                </AlertDescription>
            </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Resumen de Cumplimiento (CONATEL)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Licencia / Permiso</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Vencimiento</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialComplianceStatus.map(item => (
                                <TableRow key={item.id} className={item.status === 'Vencida' ? 'bg-destructive/10' : item.status === 'Por Vencer' ? 'bg-secondary/60' : ''}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge>
                                    </TableCell>
                                    <TableCell>{formatDate(item.expires)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href="/conatel/licenses">
                                                Ver Detalles <ArrowRight className="ml-2 h-4 w-4"/>
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
                <CardContent className="space-y-4 text-sm">
                    <h4 className="font-semibold">📞 Presentación Presencial Obligatoria</h4>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li><strong>Lugar:</strong> Oficina de Atención al Ciudadano de CONATEL.</li>
                        <li><strong>Horario:</strong> L-V, 8:00 a.m. - 12:00 m / 1:30 p.m. - 4:30 p.m.</li>
                        <li><strong>Requisito:</strong> Asistir el interesado o su representante legal con poder notariado.</li>
                        <li><strong>Base Legal:</strong> Formalidades del Artículo 26 de la LOTEL.</li>
                    </ul>
                </CardContent>
             </Card>
          </div>
       </div>
    </div>
  );
}

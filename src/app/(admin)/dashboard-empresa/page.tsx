
"use client";

import {
  Gavel,
  ShieldCheck,
  FileSignature,
  FileWarning,
  ArrowRight,
  Calculator,
  Bell,
  CheckCircle,
  Landmark,
  FileText,
  DollarSign,
  Scale,
  BookUser,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

const kpiData = [
  { title: "Contratos Activos", value: "28", icon: FileSignature, color: "text-blue-400" },
  { title: "Permisos por Vencer", value: "3", icon: FileWarning, color: "text-orange-400" },
  { title: "Nivel de Cumplimiento", value: "99.8%", icon: ShieldCheck, color: "text-green-400" },
  { title: "Casos Judiciales Activos", value: "4", icon: Gavel, color: "text-red-400" },
  { title: "Consultas Atendidas (Mes)", value: "42", icon: BookUser, color: "text-purple-400" },
  { title: "Presupuesto Legal Ejecutado", value: "75%", icon: DollarSign, color: "text-teal-400" },
];

const upcomingRenewals = [
    { name: "Licencia de Actividades Económicas", daysLeft: 15, priority: "Alta" },
    { name: "Conformidad de Uso de Bomberos", daysLeft: 28, priority: "Media" },
    { name: "Póliza de Responsabilidad Civil", daysLeft: 45, priority: "Baja" },
];

const juridicoModules = [
    { title: "Gestión de Contratos", href: "/contratos", description: "Crea, revisa y gestiona el ciclo de vida de tus contratos." },
    { title: "Cumplimiento Normativo", href: "/cumplimiento", description: "Monitorea el cumplimiento de normativas y leyes clave." },
    { title: "Gestión de Poderes", href: "/poderes-representacion", description: "Administra los poderes notariales y representaciones." },
    { title: "Trámites y Permisos", href: "/permisos", description: "Centraliza y renueva todas tus licencias operativas." },
];

const judicialCases = [
    { expediente: "AP11-V-2024-000123", materia: "Mercantil", instancia: "Tribunal 3° de 1ra Instancia", proximaFecha: "2024-08-15", estado: "En curso" },
    { expediente: "LP01-L-2023-000456", materia: "Laboral", instancia: "Tribunal 5° de Juicio", proximaFecha: "2024-09-02", estado: "Concluido" },
];

const documentsToApprove = [
    { id: "CON-024", tipo: "Contrato de Servicio", solicitante: "Ventas" },
    { id: "ESC-005", tipo: "Escrito de Contestación", solicitante: "Abg. Externo" },
];

const priorityVariant: { [key: string]: "destructive" | "secondary" | "outline" } = {
  Alta: "destructive",
  Media: "secondary",
  Baja: "outline",
};

const caseStatusVariant: { [key: string]: "default" | "outline" } = {
    "En curso": "default",
    Concluido: "outline",
};

const tasasSaren = {
    "acta_constitutiva": { tasa: 1, petros: 0.5 },
    "venta_inmueble": { tasa: 0.02, petros: 2 },
    "registro_marca": { tasa: 0, petros: 1 },
};

export default function DashboardAdminPage() {
    const [tramite, setTramite] = useState("");
    const [montoBase, setMontoBase] = useState("");
    const [costoEstimado, setCostoEstimado] = useState<{arancel: number, tasa: number, total: number} | null>(null);

    const calcularCosto = () => {
        const base = Number(montoBase);
        const tramiteData = tasasSaren[tramite as keyof typeof tasasSaren];
        if (!tramite || isNaN(base) || !tramiteData) {
            setCostoEstimado(null);
            return;
        };

        const petroValor = 3600; // Asumir un valor fijo para el Petro a efectos del simulador
        const arancel = base * tramiteData.tasa;
        const tasaFija = tramiteData.petros * petroValor;
        const total = arancel + tasaFija;
        
        setCostoEstimado({ arancel, tasa: tasaFija, total });
    };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando Legal
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard estratégico para la gestión del cumplimiento, contratos y riesgos legales.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-medium flex items-center gap-2">
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                            {kpi.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    </CardContent>
                </Card>
              </motion.div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle>Matriz de Riesgo: Próximas Renovaciones</CardTitle>
                  <CardDescription>Identifica y gestiona los documentos que requieren atención inmediata.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Documento / Permiso</TableHead>
                        <TableHead className="text-center">Prioridad</TableHead>
                        <TableHead className="text-center">Días Restantes</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {upcomingRenewals.map(item => (
                          <TableRow key={item.name} className={item.priority === "Alta" ? "bg-destructive/10" : ""}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
                              </TableCell>
                              <TableCell className={`text-center font-semibold ${item.daysLeft < 30 ? 'text-destructive' : 'text-muted-foreground'}`}>{item.daysLeft}</TableCell>
                              <TableCell className="text-right">
                                  <Button asChild variant="ghost" size="sm">
                                      <Link href="/permisos">Gestionar <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Seguimiento de Casos Judiciales</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Expediente</TableHead><TableHead>Materia</TableHead><TableHead>Instancia</TableHead><TableHead>Próxima Fecha Clave</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {judicialCases.map(c => (
                                <TableRow key={c.expediente}>
                                    <TableCell className="font-mono">{c.expediente}</TableCell>
                                    <TableCell>{c.materia}</TableCell>
                                    <TableCell>{c.instancia}</TableCell>
                                    <TableCell>{c.proximaFecha}</TableCell>
                                    <TableCell><Badge variant={caseStatusVariant[c.estado]}>{c.estado}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calculator/> Simulador de Aranceles (SAREN)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tramite-tipo">Tipo de Trámite</Label>
                    <Select onValueChange={setTramite}>
                        <SelectTrigger id="tramite-tipo"><SelectValue placeholder="Seleccione..."/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="acta_constitutiva">Acta Constitutiva</SelectItem>
                            <SelectItem value="venta_inmueble">Venta de Inmueble</SelectItem>
                            <SelectItem value="registro_marca">Registro de Marca (SAPI)</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monto-base">Monto Base (Bs.)</Label>
                    <Input id="monto-base" type="number" value={montoBase} onChange={(e) => setMontoBase(e.target.value)} placeholder="Ej: 50000" />
                  </div>
                  <Button onClick={calcularCosto} className="w-full">Calcular Costos</Button>
                  {costoEstimado && (
                      <div className="pt-4 space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Arancel (%):</span><span>{formatCurrency(costoEstimado.arancel, 'Bs.')}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Tasa Fija (Petros):</span><span>{formatCurrency(costoEstimado.tasa, 'Bs.')}</span></div>
                          <div className="flex justify-between font-bold border-t pt-2 mt-2"><span className="text-primary">Total Estimado:</span><span className="text-primary">{formatCurrency(costoEstimado.total, 'Bs.')}</span></div>
                      </div>
                  )}
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader><CardTitle>Documentos Pendientes de Aprobación</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {documentsToApprove.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                           <div>
                             <p className="font-semibold text-sm">{doc.tipo}</p>
                             <p className="text-xs text-muted-foreground">Solicitado por: {doc.solicitante}</p>
                           </div>
                           <div className="flex gap-2">
                            <Button size="sm" variant="outline">Revisar</Button>
                            <Button size="sm">Aprobar</Button>
                           </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}

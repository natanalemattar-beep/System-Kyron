
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
  TrendingUp,
  ShoppingCart,
  Briefcase,
  Users,
  Clock,
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
  { title: "Casos Judiciales Activos", value: "4", icon: Gavel, color: "text-purple-400" },
  { title: "Permisos por Vencer", value: "3", icon: FileWarning, color: "text-orange-400" },
  { title: "Consultas Internas (Mes)", value: "42", icon: Users, color: "text-blue-400" },
  { title: "Nivel de Cumplimiento", value: "99.8%", icon: ShieldCheck, color: "text-green-400" },
  { title: "Presupuesto Legal Ejecutado", value: "75%", icon: DollarSign, color: "text-green-400" },
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

const priorityVariant: { [key: string]: "destructive" | "secondary" | "outline" } = {
  Alta: "destructive",
  Media: "secondary",
  Baja: "outline",
};

const judicialCases = [
    { id: "EXP-001-2024", caso: "Demanda Laboral vs. Ex-empleado", instancia: "Tribunal 3ro de Juicio", estado: "En Lapso de Pruebas", proximaFecha: "15/08/2024" },
    { id: "EXP-002-2024", caso: "Recurso de Nulidad vs. SENIAT", instancia: "Tribunal Superior Contencioso", estado: "Apelación", proximaFecha: "01/09/2024" },
];

const pendingDocs = [
    { id: "C-VENTA-015", tipo: "Contrato de Venta", solicitante: "Ventas", fecha: "20/07/2024" },
    { id: "NDA-008", tipo: "Acuerdo de Confidencialidad", solicitante: "RR.HH.", fecha: "18/07/2024" },
];

export default function DashboardAdminPage() {
    const [tramite, setTramite] = useState("");
    const [montoBase, setMontoBase] = useState("");
    const [costoEstimado, setCostoEstimado] = useState<{arancel: number, tasa: number, total: number} | null>(null);

    const handleCalculate = () => {
        if (!tramite || !montoBase) return;
        const tasa = tramite === 'registro' ? 0.02 : 0.01;
        const arancel = 500;
        const total = (Number(montoBase) * tasa) + arancel;
        setCostoEstimado({ arancel, tasa: tasa*100, total });
    };

    return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando Legal
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard estratégico para la gestión del cumplimiento, contratos y riesgos legales.</p>
      </header>

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
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
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

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Matriz de Riesgo: Próximas Renovaciones</CardTitle>
                    <CardDescription>Documentos que requieren atención inmediata.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Documento / Permiso</TableHead>
                                <TableHead className="text-center">Prioridad</TableHead>
                                <TableHead className="text-center">Días Restantes</TableHead>
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
                        <TableHeader>
                            <TableRow>
                                <TableHead>Caso</TableHead>
                                <TableHead>Instancia</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Próxima Fecha Clave</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {judicialCases.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.caso}</TableCell>
                                    <TableCell>{item.instancia}</TableCell>
                                    <TableCell><Badge variant="secondary">{item.estado}</Badge></TableCell>
                                    <TableCell>{item.proximaFecha}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
              </CardContent>
            </Card>

        </div>

        <div className="lg:col-span-2 space-y-8">
           <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator/> Calculadora de Aranceles (SAREN)</CardTitle>
                    <CardDescription>Estima los costos para trámites de registro.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="tramite-tipo">Tipo de Trámite</Label>
                        <Select onValueChange={setTramite}>
                            <SelectTrigger id="tramite-tipo">
                                <SelectValue placeholder="Seleccionar trámite..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="registro">Registro de Documento</SelectItem>
                                <SelectItem value="copia">Copia Certificada</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="monto-base">Monto Base del Acto (Bs.)</Label>
                        <Input id="monto-base" type="number" placeholder="Ej: 50000" value={montoBase} onChange={e => setMontoBase(e.target.value)} />
                    </div>
                    <Button className="w-full" onClick={handleCalculate}>Calcular Costos</Button>
                    {costoEstimado && (
                        <div className="pt-4 space-y-2 text-sm">
                             <div className="flex justify-between"><span className="text-muted-foreground">Arancel Fijo:</span> <span>{formatCurrency(costoEstimado.arancel, 'Bs.')}</span></div>
                             <div className="flex justify-between"><span className="text-muted-foreground">Tasa ({costoEstimado.tasa}%):</span> <span>{formatCurrency(Number(montoBase) * (costoEstimado.tasa / 100), 'Bs.')}</span></div>
                             <div className="flex justify-between font-bold text-base border-t pt-2 mt-2"><span className="text-primary">Total Estimado:</span> <span className="text-primary">{formatCurrency(costoEstimado.total, 'Bs.')}</span></div>
                        </div>
                    )}
                </CardContent>
          </Card>
           <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Clock/> Documentos Pendientes de Aprobación</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3">
                      {pendingDocs.map(doc => (
                         <li key={doc.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div>
                                <p className="font-medium text-sm">{doc.tipo}</p>
                                <p className="text-xs text-muted-foreground">Solicitado por: {doc.solicitante}</p>
                            </div>
                            <Button variant="outline" size="sm">Revisar y Aprobar</Button>
                        </li>
                      ))}
                  </ul>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    

"use client";

import { 
  Gavel, 
  FileSignature, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  PlusCircle, 
  Download,
  Eye,
  FileText,
  Search
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const kpiData = [
  { title: "Contratos Activos", value: "24", icon: FileSignature, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Alertas Críticas", value: "3", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
  { title: "Poderes Vigentes", value: "8", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Trámites en Curso", value: "5", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const expedientesRecientes = [
  { id: "EXP-2024-001", asunto: "Renovación Marca Kyron", fecha: "25/07/2024", estado: "En Revisión", prioridad: "Alta" },
  { id: "EXP-2024-042", asunto: "Contrato Servicios TechSolutions", fecha: "22/07/2024", estado: "Aprobado", prioridad: "Media" },
  { id: "EXP-2024-015", asunto: "Poder Judicial Especial - Chacao", fecha: "18/07/2024", estado: "Vencido", prioridad: "Crítica" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "En Revisión": "secondary",
  "Aprobado": "default",
  "Vencido": "destructive",
};

export default function EscritorioJuridicoPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8 text-primary" />
            Centro de Mando Legal
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestión estratégica de cumplimiento, contratos y representación legal.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-10">
            <Download className="mr-2 h-4 w-4" /> Exportar Reporte
          </Button>
          <Button size="sm" className="h-10">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Expediente
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-transparent hover:border-primary/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{kpi.title}</CardTitle>
                <div className={cn("p-2 rounded-lg", kpi.bg)}>
                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tighter">{kpi.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Expedientes y Trámites</CardTitle>
                <CardDescription>Seguimiento de gestiones ante registros y notarías.</CardDescription>
            </div>
            <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-8 h-9" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref.</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expedientesRecientes.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="font-mono text-xs text-primary">{exp.id}</TableCell>
                    <TableCell className="font-medium text-sm">{exp.asunto}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{exp.fecha}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={statusVariant[exp.estado]} className="text-[10px] h-5">{exp.estado}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t bg-secondary/10 p-4">
            <Button variant="link" asChild className="p-0 h-auto font-bold text-xs">
              <Link href="/poderes-representacion" className="flex items-center">
                Ver todos los expedientes <Clock className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Modelos de Contratos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Accede a la biblioteca de borradores legales homologados y actualizados.
              </p>
              <div className="grid gap-2">
                <Button variant="secondary" className="justify-start h-10 text-xs font-bold rounded-xl" asChild>
                  <Link href="/contratos">Gestión de Contratos Pro</Link>
                </Button>
                <Button variant="outline" className="justify-start h-10 text-xs rounded-xl" asChild>
                  <Link href="/licencia-software">Contrato de Licencia de Software</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Vencimientos Próximos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-orange-600">Poder de Administración</p>
                  <p className="text-muted-foreground">Vence en 12 días (Ana Pérez)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-red-600">Habilitación CONATEL</p>
                  <p className="text-muted-foreground font-semibold">VENCIDA (CON-003)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

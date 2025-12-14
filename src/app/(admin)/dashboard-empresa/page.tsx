
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
  Briefcase
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
  { title: "Ingresos Totales (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign, color: "text-green-400" },
  { title: "Costos Operativos", value: formatCurrency(180000, 'Bs.'), icon: TrendingUp, color: "text-red-400" },
  { title: "Margen de Utilidad", value: "28%", icon: Scale, color: "text-blue-400" },
  { title: "Nuevos Clientes (Mes)", value: "15", icon: BookUser, color: "text-purple-400" },
];

const adminModules = [
    { title: "Gestión Financiera", href: "/analisis-rentabilidad", description: "Analiza la rentabilidad, costos y estados financieros.", icon: DollarSign },
    { title: "Gestión de Ventas", href: "/analisis-ventas", description: "Accede al TPV, análisis de ventas y facturación.", icon: ShoppingCart },
    { title: "Gestión de RR.HH.", href: "/dashboard-rrhh", description: "Administra nóminas, personal y cumplimiento laboral.", icon: Briefcase },
    { title: "Gestión Legal", href: "/escritorio-juridico", description: "Controla contratos, permisos y cumplimiento normativo.", icon: Gavel },
];

const recentActivities = [
    { description: "Se procesó el cierre de caja del TPV-01.", time: "Hace 15 minutos" },
    { description: "Nueva solicitud de crédito recibida de 'Innovate Corp'.", time: "Hace 1 hora" },
    { description: "Alerta: Factura FAC-C-002 para 'Innovate Corp' ha vencido.", time: "Hace 3 horas" },
];


export default function DashboardAdminPage() {
    const [tramite, setTramite] = useState("");
    const [montoBase, setMontoBase] = useState("");
    const [costoEstimado, setCostoEstimado] = useState<{arancel: number, tasa: number, total: number} | null>(null);

    return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Building className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Sala de Situación Financiera y Administrativa
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard de control general para la toma de decisiones estratégicas.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

       <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Módulos de Gestión Central</CardTitle>
                <CardDescription>Acceso rápido a las áreas clave de la empresa.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {adminModules.map((module) => (
                  <Card key={module.title} className="bg-card/50 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader>
                          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                            <module.icon className="h-6 w-6 text-primary"/>
                          </div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription className="text-xs">{module.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="mt-auto">
                           <Button asChild className="w-full" variant="outline">
                              <Link href={module.href}>
                                  Gestionar Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                              </Link>
                          </Button>
                      </CardFooter>
                  </Card>
              ))}
          </div>
       </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle>Actividad Reciente del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3">
                    {recentActivities.map((item, index) => (
                         <li key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                            <p className="text-sm flex-1">{item.description}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                        </li>
                    ))}
                  </ul>
              </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
           <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Alertas de Cumplimiento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                        <FileWarning className="h-5 w-5 mt-0.5 shrink-0 text-destructive"/>
                        <p className="text-sm text-destructive-foreground">Factura FACC-002 vencida. Se requiere acción de cobranza.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

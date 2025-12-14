
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
  BookOpen,
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

const finanzasModules = [
  { title: "Análisis de Ventas", href: "/analisis-ventas", description: "Dashboard con KPIs de rendimiento comercial." },
  { title: "Contabilidad Central", href: "/contabilidad", description: "Gestiona libros, asientos y reportes contables." },
  { title: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", description: "Administra los cobros pendientes de tus clientes." },
  { title: "Cuentas por Pagar", href: "/cuentas-por-pagar", description: "Controla tus deudas con proveedores y optimiza pagos." },
];

const rrhhModules = [
  { title: "Gestión de Nóminas", href: "/nominas", description: "Calcula y procesa la nómina de tus empleados." },
  { title: "Portal de Reclutamiento", href: "/reclutamiento", description: "Gestiona vacantes y candidatos." },
];

const juridicoModules = [
    { title: "Gestión de Contratos", href: "/contratos", description: "Crea, revisa y gestiona el ciclo de vida de tus contratos." },
    { title: "Cumplimiento Normativo", href: "/cumplimiento", description: "Monitorea el cumplimiento de normativas y leyes clave." },
    { title: "Gestión de Poderes", href: "/poderes-representacion", description: "Administra los poderes notariales y representaciones." },
    { title: "Trámites y Permisos", href: "/permisos", description: "Centraliza y renueva todas tus licencias operativas." },
];

export default function DashboardAdminPage() {
    
  return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Building className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando: Finanzas y Administración
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard estratégico para la gestión del cumplimiento, contratos y riesgos legales.</p>
      </header>

      {/* Módulos de Acceso Rápido */}
      <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Módulos de Finanzas y Ventas</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {finanzasModules.map((module) => (
                    <Card key={module.title} className="bg-card/50 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader><CardTitle className="text-lg">{module.title}</CardTitle></CardHeader>
                        <CardContent className="flex-grow"><CardDescription>{module.description}</CardDescription></CardContent>
                        <CardFooter><Button asChild className="w-full"><Link href={module.href}>Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/></Link></Button></CardFooter>
                    </Card>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Módulos de Recursos Humanos</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rrhhModules.map((module) => (
                    <Card key={module.title} className="bg-card/50 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader><CardTitle className="text-lg">{module.title}</CardTitle></CardHeader>
                        <CardContent className="flex-grow"><CardDescription>{module.description}</CardDescription></CardContent>
                        <CardFooter><Button asChild className="w-full"><Link href={module.href}>Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/></Link></Button></CardFooter>
                    </Card>
                ))}
            </div>
          </div>
           <div>
            <h2 className="text-2xl font-semibold mb-4">Módulos de Gestión Jurídica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {juridicoModules.map((module) => (
                    <Card key={module.title} className="bg-card/50 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader><CardTitle className="text-lg">{module.title}</CardTitle></CardHeader>
                        <CardContent className="flex-grow"><CardDescription>{module.description}</CardDescription></CardContent>
                        <CardFooter><Button asChild className="w-full"><Link href={module.href}>Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/></Link></Button></CardFooter>
                    </Card>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
}

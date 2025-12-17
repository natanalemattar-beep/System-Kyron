

"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileWarning, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { OverviewChart } from "@/components/dashboard/overview-chart";

const kpiData = [
  { title: "Trámites en Proceso", value: "2", icon: Clock, color: "text-yellow-500", href: "/partidas-nacimiento" },
  { title: "Documentos Listos", value: "5", icon: CheckCircle, color: "text-green-500", href: "/documentos" },
  { title: "Alertas o Vencimientos", value: "1", icon: FileWarning, color: "text-red-500", href: "/notificaciones" },
];

const recentActivities = [
    { id: "PN-2024-001", type: "Partida de Nacimiento", date: "2024-07-10", status: "Aprobado", href: "/partidas-nacimiento" },
    { id: "AM-2024-001", type: "Acta de Matrimonio", date: "2024-07-18", status: "En Proceso", href: "/actas-matrimonio" },
    { id: "AP-2024-005", type: "Antecedentes Penales", date: "2024-07-22", status: "Solicitado", href: "/antecedentes-penales" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Solicitado: "outline",
};

function KpiCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 flex-row items-center justify-between">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
          <Skeleton className="h-8 w-1/4" />
      </CardContent>
    </Card>
  )
}

function RecentActivityTableSkeleton() {
    return (
        <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                </div>
            ))}
        </div>
    )
}

function OverviewChartSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pl-2">
                <Skeleton className="h-[350px] w-full" />
            </CardContent>
        </Card>
    );
}


export default function DashboardPersonalPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1500); // Simulate data fetching
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="space-y-8">
      <header className="mb-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            Bienvenido, Usuario
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mt-2 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
            Tu centro de mando para gestionar documentos y solicitudes de forma fácil y segura.
        </motion.p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-3">
         {isLoading ? (
            <>
              <KpiCardSkeleton />
              <KpiCardSkeleton />
              <KpiCardSkeleton />
            </>
         ) : (
             kpiData.map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Link href={kpi.href}>
                      <Card className="hover:shadow-lg transition-shadow hover:-translate-y-1">
                          <CardHeader className="pb-2 flex-row items-center justify-between">
                              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                          </CardHeader>
                          <CardContent>
                              <p className="text-3xl font-bold">{kpi.value}</p>
                          </CardContent>
                      </Card>
                  </Link>
                </motion.div>
            ))
         )}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
           <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente de Trámites</CardTitle>
              <CardDescription>Un resumen de tus últimas solicitudes y su estado actual.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <RecentActivityTableSkeleton />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Referencia</TableHead>
                                <TableHead>Tipo de Trámite</TableHead>
                                <TableHead>Fecha de Solicitud</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivities.map((activity) => (
                                <TableRow key={activity.id}>
                                    <TableCell className="font-mono">{activity.id}</TableCell>
                                    <TableCell className="font-medium">{activity.type}</TableCell>
                                    <TableCell>{formatDate(activity.date)}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={statusVariant[activity.status as keyof typeof statusVariant]}>{activity.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={activity.href}>Ver Detalles <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            {isLoading ? (
               <OverviewChartSkeleton />
            ) : (
               <OverviewChart />
            )}
        </motion.div>
      </div>
    </div>
  );
}

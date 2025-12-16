
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileWarning, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { InvoicesTable } from "@/components/invoices/invoices-table";
import { mockInvoices } from "@/lib/data";
import { OverviewChart } from "@/components/dashboard/overview-chart";


const kpiData = [
  { title: "Trámites en Proceso", value: "2", icon: Clock, color: "text-yellow-500", href: "/main/partidas-nacimiento" },
  { title: "Documentos Listos", value: "5", icon: CheckCircle, color: "text-green-500", href: "/main/documentos" },
  { title: "Alertas o Vencimientos", value: "1", icon: FileWarning, color: "text-red-500", href: "/main/notificaciones" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bienvenido, Usuario
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Tu centro de mando para gestionar documentos y solicitudes de forma fácil y segura.</p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-3">
         {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={kpi.href}>
                  <Card className="hover:shadow-lg transition-shadow">
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
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <OverviewChart />
        </div>
        <div className="lg:col-span-2">
           <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Resumen de tus últimas solicitudes.</CardDescription>
            </CardHeader>
            <CardContent>
               <InvoicesTable invoices={mockInvoices} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

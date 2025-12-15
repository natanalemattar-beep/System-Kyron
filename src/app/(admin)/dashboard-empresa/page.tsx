"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const managementModules = [
    {
        category: "Finanzas y Ventas",
        icon: DollarSign,
        items: [
            { title: "Análisis de Ventas", href: "/analisis-ventas", description: "Métricas y KPIs de rendimiento." },
            { title: "Contabilidad", href: "/contabilidad", description: "Libros, asientos y reportes contables." },
            { title: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", description: "Gestión inteligente y automatizada de la cobranza." },
            { title: "Cuentas por Pagar", href: "/cuentas-por-pagar", description: "Control de deudas con proveedores." },
        ]
    }
];

export default function DashboardAdminPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Contabilidad
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard contable para la gestión integral de la empresa.</p>
      </header>

      <div className="space-y-12">
        {managementModules.map((module, index) => (
            <motion.div
                key={module.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
            >
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                           <div className="p-3 bg-primary/10 rounded-xl">
                             <module.icon className="h-6 w-6 text-primary" />
                           </div>
                           {module.category}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {module.items.map(item => (
                            <Card key={item.title} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{item.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={item.href}>
                                            Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </div>
    </div>
  );
}

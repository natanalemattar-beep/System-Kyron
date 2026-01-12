
"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { BookOpen, Scale, ArrowRight } from "lucide-react";
import { librosContablesNavItems } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";


export default function ContabilidadPage() {
  return (
    <div className="space-y-8">
      <motion.header 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Contabilidad
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard contable para la gestión integral de la empresa.</p>
      </motion.header>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatsCards />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                   <OverviewChart />
              </div>
              <div className="lg:col-span-2">
                   <RecentInvoices />
              </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
            <h2 className="text-2xl font-semibold tracking-tight">Recursos y Herramientas Fiscales</h2>
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-4">
                  <QuickAccess navGroups={[librosContablesNavItems]} />
              </div>
               <div className="lg:col-span-1">
                 <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <Scale className="h-6 w-6 text-primary"/>
                           Asesor Legal IA
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="flex-grow">
                       <CardDescription>Consulta a nuestro asistente de IA sobre la Gaceta Oficial N° 6.952.</CardDescription>
                    </CardContent>
                    <CardFooter>
                       <Button asChild className="w-full">
                         <Link href="/gaceta-6952">
                            Consultar Gaceta <ArrowRight className="ml-2 h-4 w-4"/>
                         </Link>
                       </Button>
                    </CardFooter>
                 </Card>
               </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}

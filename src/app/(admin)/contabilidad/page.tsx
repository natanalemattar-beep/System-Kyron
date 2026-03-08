
"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { BookOpen, Scale, ArrowRight, Bot, CheckCircle, Settings2, Sparkles } from "lucide-react";
import { librosContablesNavItems } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ContabilidadPage() {
  const { toast } = useToast();

  const handleConfigSave = () => {
    toast({
      title: "Configuración Actualizada",
      description: "Los niveles de autonomía del Agente Fiscal han sido guardados.",
    });
  };

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
        {/* Nueva Funcionalidad: Agente Fiscal Autónomo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="h-24 w-24 text-primary" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    Agente Fiscal Autónomo (Beta)
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Estado: Activo • aprendiendo de tus transacciones
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings2 className="mr-2 h-4 w-4" />
                      Configurar Autonomía
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Niveles de Autorización</DialogTitle>
                      <DialogDescription>
                        Define qué acciones puede tomar el agente sin tu intervención.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <RadioGroup defaultValue="consult">
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                          <RadioGroupItem value="auto" id="r1" />
                          <Label htmlFor="r1" className="cursor-pointer">
                            <p className="font-bold">Permitir acciones sin consultar</p>
                            <p className="text-xs text-muted-foreground">Limitado a transacciones menores a $1,000.</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/50 transition-colors mt-2">
                          <RadioGroupItem value="consult" id="r2" />
                          <Label htmlFor="r2" className="cursor-pointer">
                            <p className="font-bold">Consultar siempre</p>
                            <p className="text-xs text-muted-foreground">El agente sugerirá cambios pero esperará aprobación.</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/50 transition-colors mt-2">
                          <RadioGroupItem value="off" id="r3" />
                          <Label htmlFor="r3" className="cursor-pointer text-destructive">
                            <p className="font-bold">Desactivar agente</p>
                            <p className="text-xs text-muted-foreground">Se detendrá todo el aprendizaje autónomo.</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleConfigSave}>Guardar Protocolo</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Prórroga IVA", desc: "Vencía hoy • Aprobada", icon: CheckCircle },
                  { title: "Detección Duplicados", desc: "Factura #F123 eliminada", icon: CheckCircle },
                  { title: "Optimización ISLR", desc: "Ahorro estimado $450", icon: CheckCircle },
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-white/5">
                    <action.icon className="h-5 w-5 text-green-500 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{action.title}</p>
                      <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

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

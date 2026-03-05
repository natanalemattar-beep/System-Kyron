
"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { BookOpen, Scale, ArrowRight, ShieldCheck, Terminal, Calculator, Landmark } from "lucide-react";
import { librosContablesNavItems } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ContabilidadPage() {
  return (
    <div className="space-y-12 pb-20 px-6 md:px-10">
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> NODO CONTABLE
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Centro de <span className="text-primary italic">Contabilidad</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Automatización bajo VEN-NIF • Gestión RIPF Activa</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                Sincronizar BCV
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
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
          <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                   <OverviewChart />
              </div>
              <div className="lg:col-span-4">
                   <RecentInvoices />
              </div>
          </div>
        </motion.div>

        {/* SECCIÓN DETALLADA DE INTELIGENCIA TÉCNICA */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex items-center gap-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">Protocolos de Ingeniería Contable</h2>
                <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] lg:col-span-2">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Concepto Maestro: Automatización VEN-NIF</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <p className="text-lg font-bold italic text-white/60 leading-relaxed text-justify">
                            El Centro de Contabilidad de Kyron opera bajo una arquitectura de ingeniería convergente que garantiza la integridad de los datos financieros bajo las normas VEN-NIF. El sistema realiza el **Reajuste por Inflación Fiscal (RIPF)** de forma actuarial, integrando los índices INPC publicados por el Banco Central de Venezuela (BCV). Esto elimina el error humano en balances complejos y proporciona una visión real de la salud económica de la empresa en un entorno multimoneda.
                        </p>
                        <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-8 flex items-center gap-3">
                                <Terminal className="h-4 w-4" /> Procedimiento de Cierre Maestro
                            </h4>
                            <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-4">
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[1]</span>
                                    <span>Importación masiva de transacciones desde el Nodo TPV y Ledger Blockchain.</span>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[2]</span>
                                    <span>Ejecución del motor de ajuste por inflación síncrono con los datos del BCV.</span>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[3]</span>
                                    <span>Generación automática de Estados de Situación Financiera y Flujo de Efectivo.</span>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[4]</span>
                                    <span>Sellado inmutable de los libros Diario, Mayor e Inventario para presentación legal.</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-10 border-t border-white/5 mt-10 flex justify-between items-center">
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/20">
                            <ShieldCheck className="h-4 w-4 text-primary" /> VALIDADO BAJO NORMATIVA FISCAL 2026
                        </div>
                        <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow uppercase tracking-widest">Protocolo Activo</Badge>
                    </CardFooter>
                </Card>

                <div className="space-y-8">
                    <Card className="glass-card border-none bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                            <Landmark className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3 relative z-10">
                            <Scale className="h-6 w-6" /> Asesor Legal IA
                        </h3>
                        <p className="text-sm font-bold opacity-80 leading-relaxed mb-8 relative z-10">
                            Consulte el impacto de la Gaceta Oficial N° 6.952 en sus balances contables actuales mediante nuestro nodo de inferencia jurídica.
                        </p>
                        <Button asChild className="w-full h-12 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-2xl">
                            <Link href="/gaceta-6952">INICIAR CONSULTA <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic pl-4">Herramientas Oficiales</h3>
                        <QuickAccess navGroups={[librosContablesNavItems as any]} />
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}

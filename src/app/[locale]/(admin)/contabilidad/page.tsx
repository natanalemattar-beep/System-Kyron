
"use client";

import React from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  Wallet, 
  Truck, 
  Activity, 
  FileText, 
  Landmark, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Globe,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const modules = [
  { label: "CONTABILIDAD", kpi: "AUDITORÍA OK", icon: Calculator, href: "/contabilidad" },
  { label: "CUENTAS X COBRAR", kpi: "Bs. 12.4K", icon: Wallet, href: "/cuentas-por-cobrar" },
  { label: "CUENTAS X PAGAR", kpi: "3 PENDIENTES", icon: Truck, href: "/cuentas-por-pagar" },
  { label: "AJUSTE RIPF", kpi: "INPC MAR'26", icon: Activity, href: "/ajuste-por-inflacion" },
  { label: "DECLARACIÓN IVA", kpi: "VENCE EN 5D", icon: FileText, href: "/declaracion-iva" },
  { label: "ISLR AR-C", kpi: "GENERADO", icon: Landmark, href: "/islr-arc" },
  { label: "ANÁLISIS CAJA", kpi: "FLUJO +12%", icon: TrendingUp, href: "/analisis-caja" },
  { label: "RENTABILIDAD PRO", kpi: "VAN: $450K", icon: BarChart3, href: "/analisis-rentabilidad" },
  { label: "FACTIBILIDAD", kpi: "TIR: 28%", icon: Target, href: "/estudio-factibilidad-economica" },
  { label: "BILLETERA CAMBIO", kpi: "TASAS BCV", icon: Globe, href: "/billetera-cambio" },
];

export default function ContabilidadMaestraPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white p-6 md:p-12 space-y-12">
      <style jsx global>{`
        .hud-grid {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .shadow-glow {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
        }
        .shadow-glow-text {
          text-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }
      `}</style>

      {/* HEADER SECCIÓN */}
      <div className="flex items-center gap-6 border-b border-white/5 pb-8 relative">
        <div className="p-4 bg-[#0A2472]/20 rounded-2xl border border-[#0A2472]/40 shadow-glow">
          <Calculator className="h-8 w-8 text-[#2563eb]" />
        </div>
        <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter shadow-glow-text">
            Finanzas y <span className="text-[#2563eb]">Contabilidad</span>
            </h1>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Terminal de Gestión Financiera • 2026</p>
        </div>
      </div>

      {/* GRID DE MÓDULOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {modules.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={item.href as any}>
              <Card className="bg-[#050810]/80 border-white/5 hover:border-[#2563eb]/40 hover:bg-[#0A2472]/10 transition-all duration-500 rounded-[2rem] h-[180px] group relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                  <div className="p-3 bg-white/5 rounded-xl w-fit border border-white/5 group-hover:scale-110 transition-transform shadow-inner">
                    <item.icon className="h-6 w-6 text-[#2563eb]" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-black text-xs md:text-sm uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest italic group-hover:text-[#64748b] transition-colors">
                      {item.kpi}
                    </p>
                  </div>

                  <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5 text-[#2563eb] translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* FOOTER TÉCNICO */}
      <div className="pt-12 border-t border-white/5 flex justify-between items-center opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-white italic">
          System Kyron v2.6.5 · Terminal Administrativa
        </p>
        <div className="flex gap-4">
            <div className="h-1 w-8 bg-white/20 rounded-full" />
            <div className="h-1 w-16 bg-primary/40 rounded-full" />
            <div className="h-1 w-8 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

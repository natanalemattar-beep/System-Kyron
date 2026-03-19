
"use client";

import { IntelligentPortfolioManager } from "@/components/cobranza/intelligent-portfolio-manager";
import { AutomatedCollectionSystem } from "@/components/cobranza/automated-collection-system";
import { PaymentReconciliation } from "@/components/cobranza/payment-reconciliation";
import { Landmark, ArrowLeft, Activity, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Gestión de Cuentas por Cobrar (Localizada y Activada).
 */

export default function CuentasPorCobrarPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
        <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Landmark className="h-3 w-3" /> NODO DE ACTIVOS
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Cuentas <span className="text-primary italic">por Cobrar</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Clientes • Conciliación de Ingresos 2026</p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                    <Link href="/contabilidad/cuentas"><ArrowLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                </Button>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <ShieldCheck className="mr-3 h-4 w-4" /> AUDITAR CARTERA
                </Button>
            </div>
        </header>

        <div className="grid gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <IntelligentPortfolioManager />
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <AutomatedCollectionSystem />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <PaymentReconciliation />
                </motion.div>
            </div>
        </div>

        <Card className="glass-card border-none bg-white/[0.02] p-10 rounded-[3rem] mt-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                    <Terminal className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Estado de Sincronización</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Conexión activa con el Libro Mayor y Ledger de Ventas</p>
                </div>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black px-6 py-2 rounded-xl uppercase tracking-[0.2em] shadow-glow-secondary">ONLINE</Badge>
        </Card>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}>{children}</div>;
}


"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Gavel, 
  Users, 
  Cpu, 
  Terminal,
  ChevronRight,
  Info,
  Lock,
  Search,
  FileText,
  Activity
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "@/navigation";

const manualSections = [
  {
    id: "getting-started",
    title: "1. Inicio Rápido",
    icon: Zap,
    content: "Para comenzar en System Kyron, localice el botón de 'ACCESO' en la barra superior. Seleccione el portal correspondiente a su rol (Empresa, Personal, Legal, etc.). El sistema utiliza autenticación de grado militar con soporte para biometría en dispositivos compatibles.",
    steps: ["Selección de Portal", "Autenticación Segura", "Sincronización de Nodo"]
  },
  {
    id: "accounting",
    title: "2. Módulo Contable (VEN-NIF)",
    icon: Cpu,
    content: "Automatización total de libros fiscales y balances. El motor IA procesa el ajuste por inflación automáticamente utilizando los índices oficiales del BCV. Los registros se sellan en el Ledger para garantizar inmutabilidad.",
    steps: ["Carga de Facturas", "Ajuste por Inflación", "Emisión de Balances"]
  },
  {
    id: "telecom",
    title: "3. Conectividad 5G & eSIM",
    icon: Radio,
    content: "Gestión de flotas de datos. Puede activar líneas nuevas o eSIMs digitales de forma remota. El sistema permite el monitoreo de consumo en tiempo real y la priorización de tráfico para aplicaciones críticas (Network Slicing).",
    steps: ["Activación Remota", "Recargas de Saldo", "Asignación de Números"]
  },
  {
    id: "legal",
    title: "4. Bóveda Legal & Contratos",
    icon: Gavel,
    content: "Resguardo inmutable de activos jurídicos. Utilice el Generador IA para redactar contratos homologados. El sistema emitirá alertas automáticas antes del vencimiento de poderes o licencias CONATEL/SAPI.",
    steps: ["Redacción con IA", "Cifrado de Documentos", "Gestión de Poderes"]
  }
];

export default function ManualUsuarioPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-6 md:px-16 relative overflow-hidden hud-grid">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-5xl mx-auto mb-16 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
          <BookOpen className="h-3 w-3" /> SOPORTE TÉCNICO
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Manual de <span className="text-primary">Usuario</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2">Protocolo de Operación v2.6.5 • Ecosistema Kyron</p>
      </header>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <section className="relative">
            <div className="absolute -left-10 top-0 h-full w-1 bg-white/5 hidden md:block"></div>
            <div className="relative space-y-12">
              {manualSections.map((section, idx) => (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-10 group overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><section.icon className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4 text-white">
                        <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                          <section.icon className="h-6 w-6 text-primary" />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                      <p className="text-sm font-bold text-white/60 leading-relaxed text-justify uppercase tracking-widest">{section.content}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {section.steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                            <span className="text-[10px] font-black text-primary">0{sIdx + 1}</span>
                            <span className="text-[9px] font-bold text-white/40 uppercase">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow border-none">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Lock className="h-32 w-32" /></div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" /> Protocolo Zero Risk
            </h3>
            <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">
              Toda la información procesada en los módulos financieros y legales está protegida por sellado inmutable en Blockchain.
            </p>
            <Button variant="secondary" className="w-full h-12 bg-white text-primary rounded-xl font-black uppercase text-[9px] tracking-widest">Ver Certificación</Button>
          </Card>

          <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-10">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-3">
              <Terminal className="h-4 w-4" /> Centro de Ayuda
            </h4>
            <div className="space-y-6">
              {[
                { label: "Preguntas Frecuentes", icon: Info },
                { label: "Gaceta Oficial", icon: Activity },
                { label: "Soporte Técnico", icon: Search }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between group p-2 hover:bg-white/5 rounded-lg transition-all text-left">
                  <div className="flex items-center gap-4">
                    <item.icon className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </Card>

          <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-white/5 text-center flex flex-col items-center">
            <Activity className="h-8 w-8 text-white/10 mb-4 animate-pulse" />
            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">Terminal System Kyron v2.6.5</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

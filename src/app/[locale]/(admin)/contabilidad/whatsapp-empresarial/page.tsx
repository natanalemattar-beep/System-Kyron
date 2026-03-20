"use client";

import React, { useState } from "react";
import { MessageSquare, Bot, Zap, CheckCircle, Users, Activity, Clock, Send, Phone, ArrowRight, RefreshCw, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const respuestasAuto = [
  {
    trigger: "Hola / Buenos días / Buenas",
    respuesta: "¡Bienvenido a System Kyron! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Escribe: 1) Facturación 2) Soporte 3) Pagos 4) Hablar con un asesor",
    activa: true,
    usos: 1234,
  },
  {
    trigger: "Factura / Facturación / Comprobante",
    respuesta: "Para solicitar tu factura o comprobante, por favor indica tu número de cédula o RIF y el número de operación. En minutos te enviamos el documento.",
    activa: true,
    usos: 567,
  },
  {
    trigger: "Pago / Pago móvil / Transferencia",
    respuesta: "Nuestros datos de pago: 📱 Pago Móvil: 0412-111-0001 (Banesco) | 🏦 Cuenta Corriente: 0134-****-4490 | Una vez realizado el pago, envíanos el comprobante aquí.",
    activa: true,
    usos: 892,
  },
  {
    trigger: "Precio / Costo / Cuánto vale",
    respuesta: "Con gusto te informamos los precios de nuestros servicios. ¿Qué servicio te interesa? 1) Contabilidad 2) Telefonía 3) Seguros 4) Internet Empresarial",
    activa: true,
    usos: 445,
  },
  {
    trigger: "Asesor / Agente / Persona / Humano",
    respuesta: "Entendido, en breve un asesor se comunicará contigo. Horario de atención: Lun-Vie 8AM-6PM, Sáb 9AM-1PM. ¡Gracias por tu paciencia!",
    activa: true,
    usos: 321,
  },
];

const mensajesRecientes = [
  { cliente: "María García", numero: "+58 412-222-3344", mensaje: "¿Cuánto cuesta el plan de contabilidad?", hora: "11:45 AM", respondido: true, canal: "AUTO" },
  { cliente: "Carlos Pérez", numero: "+58 424-555-6677", mensaje: "Necesito mi factura del mes pasado", hora: "12:02 PM", respondido: true, canal: "AUTO" },
  { cliente: "Empresa XYZ", numero: "+58 412-888-9900", mensaje: "Quiero hablar con un asesor", hora: "12:18 PM", respondido: false, canal: "HUMANO" },
  { cliente: "Ana Rodríguez", numero: "+58 426-111-2233", mensaje: "Buenos días, ¿están abiertos?", hora: "12:31 PM", respondido: true, canal: "AUTO" },
];

export default function WhatsappEmpresarialPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const guardar = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "RESPUESTAS GUARDADAS", description: "Las respuestas automáticas se han actualizado y activado." });
    }, 1500);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-green-500 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-green-500 mb-3">
            <MessageSquare className="h-3 w-3" /> WHATSAPP EMPRESARIAL IA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            WHATSAPP <span className="text-green-500 italic">EMPRESARIAL</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Respuestas Automáticas Inteligentes • Atención al Cliente 24/7
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={guardar} disabled={saving}>
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
            GUARDAR CONFIGURACIÓN
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Mensajes Hoy", val: "248 Recibidos", icon: MessageSquare, color: "text-green-500" },
          { label: "Respondidos Auto", val: "94.3%", icon: Bot, color: "text-emerald-500" },
          { label: "Tiempo Resp. Prom.", val: "< 3 seg", icon: Clock, color: "text-primary" },
          { label: "Clientes Atendidos", val: "112 Hoy", icon: Users, color: "text-amber-500" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tighter text-foreground">{kpi.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 flex items-start gap-5">
        <div className="p-3 bg-green-500/10 rounded-xl shrink-0">
          <Bot className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-green-500 tracking-widest mb-1">Asistente IA Activo – Respuestas en Tiempo Real</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            El sistema detecta automáticamente las preguntas de los clientes y responde de forma inmediata con información precisa sobre facturación, pagos, precios y servicios. Cuando el cliente requiere atención personalizada, la consulta es redirigida a un asesor humano.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-500/10 rounded-xl"><Zap className="h-5 w-5 text-green-500" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Respuestas Automáticas Configuradas</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="space-y-4">
          {respuestasAuto.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
              <Card className="glass-card border border-green-500/10 bg-card/40 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500/10 text-green-600 border-none text-[7px] font-black px-2 py-0.5 uppercase">TRIGGER</Badge>
                      <p className="text-[10px] font-black uppercase text-foreground/80 italic">{r.trigger}</p>
                    </div>
                    <p className="text-[9px] font-bold text-muted-foreground leading-relaxed border-l-2 border-green-500/30 pl-3">{r.respuesta}</p>
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40">{r.usos.toLocaleString('en-US')} usos este mes</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={cn("w-2 h-2 rounded-full", r.activa ? "bg-emerald-500" : "bg-muted")} />
                    <span className="text-[8px] font-black uppercase text-muted-foreground/60">{r.activa ? "ACTIVA" : "INACTIVA"}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <Button variant="outline" className="gap-2 text-[9px] font-black uppercase tracking-widest">
          <Zap className="h-3 w-3" /> AGREGAR NUEVA RESPUESTA
        </Button>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><MessageSquare className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Conversaciones Recientes</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {mensajesRecientes.map((m, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-500/10 rounded-xl">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{m.cliente}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{m.numero} · {m.hora}</p>
                    <p className="text-[9px] text-muted-foreground/70 mt-0.5 italic">"{m.mensaje}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", m.canal === "AUTO" ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600")}>
                    {m.canal}
                  </Badge>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", m.respondido ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600")}>
                    {m.respondido ? "RESPONDIDO" : "PENDIENTE"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

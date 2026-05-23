'use client';

import { useTranslations } from 'next-intl';
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Sparkles, Send, Loader2, Bot, ArrowRight } from "lucide-react";
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

const fallbackItems = [
  { question: "¿Cómo garantizan el cumplimiento fiscal en Venezuela?", answer: "Monitoreamos la Gaceta Oficial las 24/7 con algoritmos de vigilancia normativa. IVA 16%, IGTF 3% e ISLR se calculan automáticamente según la normativa VEN-NIF. El sistema genera libros de compra/venta y archivos .txt listos para SENIAT.", category: "fiscal" },
  { question: "¿Puedo gestionar varias empresas desde una sola cuenta?", answer: "Sí. El portal de Socios y Directivos permite consolidar la contabilidad de múltiples entidades en un Centro de Mando unificado. Cada empresa mantiene su independencia administrativa mientras usted tiene visibilidad total desde un solo dashboard.", category: "platform" },
  { question: "¿Cómo funciona la tasa BCV en las facturas?", answer: "Se actualiza automáticamente cada día desde el Banco Central de Venezuela. Cada factura genera su equivalente en USD y EUR con la tasa BCV del momento, y el sistema calcula el IGTF (3%) en operaciones con divisas de forma instantánea.", category: "fiscal" },
  { question: "¿Es difícil migrar mis datos desde otro sistema?", answer: "No. Para sistemas estándar (Excel, Profit, Mónica 8, Galac), la migración se completa en menos de 48 horas sin costo adicional. Nuestro equipo de ingeniería le asiste durante todo el proceso para garantizar continuidad operativa.", category: "migration" },
  { question: "¿Qué nivel de seguridad tiene la plataforma?", answer: "Cifrado AES-256 de grado bancario, autenticación JWT con cookies HTTP-only, verificación de dos factores (2FA) y registro de auditoría inmutable para cada acción realizada en la plataforma. Cumplimos con las mejores prácticas internacionales.", category: "security" },
  { question: "¿Cómo calcula las prestaciones sociales?", answer: "El sistema calcula automáticamente según el artículo 142 de la LOTTT, incluyendo garantía trimestral, intereses sobre prestaciones al tipo BCV, y liquidación final con ambos métodos (retroactivo y trimestral) para aplicar el más favorable al trabajador.", category: "laboral" },
  { question: "¿Puedo conectar mis cuentas bancarias?", answer: "Sí. El módulo de Conexión Bancaria permite la conciliación automática comparando sus registros contables con movimientos bancarios. Se actualiza diariamente con la tasa BCV y reduce el tiempo de cuadre en un 80%.", category: "fiscal" },
  { question: "¿Qué es el sistema de Eco-Créditos?", answer: "Es nuestro módulo de sostenibilidad Ameru. Mediante puntos de reciclaje con tecnología de inducción magnética, los residuos se clasifican mediante algoritmos de visión y se convierten en Eco-Créditos canjeables por servicios Kyron o en nuestro mercado interno de bonos verdes.", category: "sostenibilidad" },
  { question: "¿Cómo funciona la asesoría legal automatizada?", answer: "Nuestro motor genera borradores de contratos de trabajo, arrendamiento, poderes notariales, actas de asamblea y permisos CONATEL/SENIAT. Monitorea vencimiento de poderes, marcas comerciales (SAPI) y documentos notariales (SAREN).", category: "legal" },
  { question: "¿Ofrecen capacitación para mi equipo?", answer: "Sí, a través de la Academia Kyron. Cursos certificados, tutoriales en video paso a paso, webinars sobre actualizaciones legales y biblioteca técnica completa. Todo incluido en su plan sin costo adicional.", category: "soporte" },
  { question: "¿Puedo activar una línea 5G/eSIM desde la plataforma?", answer: "Sí. El módulo Mi Línea 5G permite activar eSIM (chips digitales) en minutos mediante código QR, sin ir a tienda física. Las empresas gestionan flotas de datos con control centralizado de consumo.", category: "telecom" },
  { question: "¿Qué tipos de pago aceptan?", answer: "Transferencias de los 29 bancos venezolanos, pagos móviles, Zelle, PayPal, Binance Pay, criptomonedas, punto de venta, efectivo (USD/Bs) y la Billetera Digital Kyron. Cada transacción incluye cálculo automático del IGTF.", category: "pagos" },
  { question: "¿Tienen garantía de disponibilidad?", answer: "Infraestructura con alta disponibilidad, redundancia, backups automáticos diarios y monitoreo 24/7. En caso de incidentes, nuestro equipo de ingeniería interviene de forma inmediata para restaurar el servicio.", category: "soporte" },
  { question: "¿Cómo funciona la facturación electrónica SENIAT?", answer: "El sistema genera facturas con todos los requisitos del SENIAT: RIF, control de IVA, retenciones, IGTF, numeración correlativa, y generación de archivos .txt para carga directa en el portal fiscal.", category: "fiscal" },
  { question: "¿Qué módulos de RRHH incluye?", answer: "Nómina con cálculos de IVSS, FAOV, LPH, INCES; prestaciones sociales LOTTT; vacaciones y utilidades; certificados laborales; libros laborales; viáticos; reclutamiento; clima organizacional; y bienestar laboral.", category: "laboral" },
  { question: "¿System Kyron ofrece API para integraciones?", answer: "Sí. Contamos con una API REST documentada para integrar con CRM, e-commerce y ERPs existentes. El equipo de ingeniería proporciona documentación y soporte completo para cada integración.", category: "platform" },
  { question: "¿Cómo maneja las retenciones de IVA e ISLR?", answer: "Calcula automáticamente las retenciones según el RIF y tipo de contribuyente, genera comprobantes electrónicos y archivos .txt para SENIAT. Soporta regímenes de retención parcial y total.", category: "fiscal" },
  { question: "¿Cuál es el tiempo de respuesta del soporte?", answer: "SLA según el plan: Estándar (8 horas hábiles), Prioritario (2 horas) y VIP (30 minutos, 24/7). Incidentes críticos reciben atención inmediata sin importar el plan.", category: "soporte" },
];

const categoryLabels: Record<string, string> = {
  fiscal: "Fiscal",
  platform: "Plataforma",
  security: "Seguridad",
  migration: "Migración",
  laboral: "RRHH / Laboral",
  legal: "Legal",
  telecom: "Telecomunicaciones",
  sostenibilidad: "Sostenibilidad",
  pagos: "Pagos",
  soporte: "Soporte",
};

export function FaqSection() {
    const t = useTranslations('FaqSection');
    const [search, setSearch] = useState('');
    const [aiQuery, setAiQuery] = useState('');
    const [aiReply, setAiReply] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    
    const categories = t.raw('categories') as Record<string, string>;
    const i18nItems = t.raw('items') as Array<{ question: string, answer: string, category: string }>;
    const allItems = [...i18nItems, ...fallbackItems].filter(
      (item, index, self) => index === self.findIndex(i => i.question === item.question)
    );

    const filteredItems = allItems.filter(item => 
        item.question.toLowerCase().includes(search.toLowerCase()) || 
        item.answer.toLowerCase().includes(search.toLowerCase())
    );

    const askAI = useCallback(async () => {
      if (!aiQuery.trim()) return;
      setAiLoading(true);
      setAiReply("");
      try {
        const res = await fetch("/api/ai/agent-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: aiQuery,
            context: "faq",
            systemPrompt: "Eres un asistente de soporte de System Kyron. Responde preguntas sobre la plataforma, sus módulos, planes, precios y funcionalidades. Sé conciso, profesional y en español. Si no sabes algo, indícalo y sugiere contactar al soporte.",
          }),
        });
        const data = await res.json();
        setAiReply(data.response || "Lo siento, no pude procesar tu consulta. Por favor contacta a soporte.");
      } catch {
        setAiReply("Error de conexión. Por favor intenta de nuevo o contacta a soporte.");
      } finally {
        setAiLoading(false);
      }
    }, [aiQuery]);

    return (
        <section className="py-24 relative overflow-hidden bg-[#03050a]">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-1 border-cyan-500/30 bg-cyan-500/5 text-cyan-400 uppercase tracking-widest text-[10px] font-black">
                        {t('badge')}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                        {t('title_highlight')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('title_rest')}</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative mb-12 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <Input 
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl focus:border-cyan-500/50 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 transition-all"
                        />
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                        {filteredItems.map((item, index) => (
                            <AccordionItem 
                                key={index} 
                                value={`item-${index}`}
                                className="border border-white/5 bg-white/[0.02] rounded-2xl px-6 overflow-hidden hover:bg-white/[0.04] transition-all"
                            >
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                            <HelpCircle className="h-5 w-5 text-cyan-400" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/60">
                                                {categoryLabels[item.category] || categories[item.category] || item.category}
                                            </span>
                                            <span className="text-white font-bold text-lg leading-tight">
                                                {item.question}
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 pt-2 text-slate-400 text-base leading-relaxed border-t border-white/5">
                                    <div className="pl-14">
                                        {item.answer}
                                        <div className="mt-4 flex items-center gap-2 text-cyan-400/40 text-[10px] font-black uppercase tracking-widest">
                                            <Sparkles className="h-3 w-3" /> System Kyron Assistant Verified
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                            <HelpCircle className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                                No se encontraron resultados para "{search}"
                            </p>
                            <p className="text-slate-600 text-sm mt-2">Prueba preguntándole directamente a nuestro asistente AI abajo.</p>
                        </div>
                    )}

                    <div className="mt-16 p-8 rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">¿No encuentras lo que buscas?</h3>
                          <p className="text-slate-400 text-sm">Pregúntale directamente a nuestro asistente AI</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={aiQuery}
                          onChange={(e) => setAiQuery(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") askAI(); }}
                          placeholder="Ej: ¿Cómo configuro el módulo de nómina?"
                          className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                        />
                        <Button
                          onClick={askAI}
                          disabled={aiLoading || !aiQuery.trim()}
                          size="icon"
                          className="h-12 w-12 rounded-xl bg-cyan-600/20 border border-cyan-500/20 hover:bg-cyan-600/30 text-cyan-400 shrink-0"
                        >
                          {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </div>
                      {aiReply && (
                        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
                          <MarkdownRenderer content={aiReply} />
                        </div>
                      )}
                    </div>
                    </div>

                    <div className="mt-8 text-center">
                      <a href="/faq">
                        <Button variant="outline" className="h-14 px-10 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all group">
                          Ver todas las preguntas frecuentes
                          <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </div>
                </div>
        </section>
    );
}

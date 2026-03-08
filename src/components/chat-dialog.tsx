
'use client';

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bot, Send, Loader2, Sparkles, Activity, MessageCircle, Info, ChevronRight, X, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chat, type ChatInput, type ChatOutput } from "@/ai/flows/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThinkingAnimation } from "./thinking-animation";

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const getPageContext = (pathname: string) => {
  if (pathname.includes('dashboard-empresa')) return "el dashboard principal de administración de la empresa (Centro de Mando)";
  if (pathname.includes('/contabilidad')) return "el dashboard del portal de Contabilidad";
  if (pathname.includes('/analisis-ventas')) return "el dashboard de Análisis de Ventas";
  if (pathname.includes('/dashboard-rrhh')) return "el dashboard de Recursos Humanos";
  if (pathname.includes('/escritorio-juridico')) return "el dashboard del Escritorio Jurídico";
  if (pathname.includes('/dashboard-socios')) return "el dashboard para Socios y Directivos (Holding)";
  if (pathname.includes('/dashboard-informatica')) return "el dashboard de Ingeniería e Informática";
  if (pathname.includes('/dashboard-telecom')) return "el dashboard de Telecomunicaciones";
  if (pathname.includes('/asesoria-publicidad')) return "el dashboard de Marketing y Publicidad";
  if (pathname.includes('/dashboard')) return "el dashboard personal para trámites civiles de una persona natural";
  if (pathname.includes('/cuentas-por-cobrar')) return "el módulo de Cuentas por Cobrar";
  if (pathname.includes('/cuentas-por-pagar')) return "el módulo de Cuentas por Pagar";
  if (pathname.includes('/punto-de-venta')) return "el Punto de Venta (TPV) para facturar";
  if (pathname === '/') return "la página de inicio de Kyron. Describe los servicios, características y testimonios.";
  return "una página general de la aplicación Kyron";
};

export function ChatDialog() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const pageContext = getPageContext(pathname);
      const botResponse = await chat({ message: input, context: pageContext });
      const botMessage: Message = { role: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'bot', text: "Lo siento, tuve un problema para conectarme. Inténtalo de nuevo." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-glow btn-3d-primary z-[100] group">
          <Bot className="h-8 w-8 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md p-0 bg-black/95 backdrop-blur-3xl border-l-white/10 flex flex-col h-full">
        <SheetHeader className="p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-glow-sm">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Consola de Agente IA</SheetTitle>
              <SheetDescription className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Protocolo de Asistencia Neuronal</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="acciones" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 bg-white/5 p-1 rounded-none border-b border-white/5">
            <TabsTrigger value="acciones" className="text-[8px] font-black uppercase tracking-widest">Acciones</TabsTrigger>
            <TabsTrigger value="sugerencias" className="text-[8px] font-black uppercase tracking-widest">Sugerencias</TabsTrigger>
            <TabsTrigger value="consulta" className="text-[8px] font-black uppercase tracking-widest">Consulta</TabsTrigger>
          </TabsList>

          <TabsContent value="acciones" className="flex-1 overflow-y-auto p-6 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Activity className="h-3 w-3" /> Eventos del Periodo
            </h4>
            {[
              { mod: "Contabilidad", text: "Prórroga IVA solicitada", status: "Aprobada", time: "hace 2h" },
              { mod: "Ventas", text: "IGTF corregido automáticamente", status: "Sincronizado", time: "hace 4h" },
              { mod: "Legal", text: "Análisis IDP Contrato #098", status: "Completado", time: "hace 1d" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-start group hover:bg-white/10 transition-all">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase text-primary/60">{item.mod}</p>
                  <p className="text-xs font-bold text-white/80">{item.text}</p>
                  <p className="text-[8px] font-medium text-white/20 uppercase">{item.time}</p>
                </div>
                <Badge variant="outline" className="text-[7px] border-primary/20 text-primary">{item.status}</Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="sugerencias" className="flex-1 overflow-y-auto p-6 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Optimizaciones Disponibles
            </h4>
            {[
              { mod: "Identidad", text: "RIF por vencer en 15 días", action: "Iniciar renovación" },
              { mod: "Ventas", text: "Factura duplicada detectada", action: "Revisar ledger" },
              { mod: "Ambiental", text: "Pico de mercado E-CR", action: "Vender créditos" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10 space-y-3">
                <div>
                  <p className="text-[8px] font-black uppercase text-secondary/60">{item.mod}</p>
                  <p className="text-xs font-bold text-white/80 leading-snug">{item.text}</p>
                </div>
                <Button variant="link" className="p-0 h-auto text-[9px] font-black uppercase text-secondary hover:text-white transition-all flex items-center gap-1">
                  {item.action} <ChevronRight className="h-2 w-2" />
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="consulta" className="flex-1 flex flex-col p-6 overflow-hidden">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4">
              {messages.length === 0 && !isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-8">
                  <MessageCircle className="h-12 w-12 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Núcleo de inteligencia en espera...</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                    <div className={cn('p-2 rounded-lg border', msg.role === 'user' ? 'bg-primary/10 border-primary/20' : 'bg-white/5 border-white/10')}>
                      {msg.role === 'user' ? <User className="h-3 w-3 text-primary" /> : <Bot className="h-3 w-3 text-emerald-500" />}
                    </div>
                    <div className={cn('max-w-[80%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed', msg.role === 'user' ? 'bg-primary text-white' : 'bg-white/5 text-white/80')}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10"><Bot className="h-3 w-3 text-emerald-500" /></div>
                  <div className="bg-white/5 rounded-2xl p-4"><ThinkingAnimation /></div>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="relative mt-auto">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribir comando..." 
                className="h-12 rounded-xl bg-white/5 border-white/10 text-xs font-bold focus-visible:ring-primary shadow-inner"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 btn-3d-primary rounded-lg" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4"/>
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <footer className="p-6 border-t border-white/5 bg-white/[0.02] text-center">
          <p className="text-[7px] font-black uppercase tracking-[0.5em] text-white/10">System Kyron Neuronal Hub • v2.6.5</p>
        </footer>
      </SheetContent>
    </Sheet>
  );
}

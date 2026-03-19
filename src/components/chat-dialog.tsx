
'use client';

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bot, Send, MessageCircle, ChevronRight, X, User, Wallet, Activity, Loader as Loader2, Sparkles, Gavel, Cpu, Recycle, ShieldCheck } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const getAIIdentity = (pathname: string) => {
  if (pathname.includes('/sector-privado-system-kyron')) {
    return {
      role: "Modelo Zedu — System Kyron",
      expertise: "Inteligencia Maestra del ecosistema completo System Kyron. Conoce todos los modulos: Contabilidad VEN-NIF (IVA, IGTF, ISLR, RIPF, tasa BCV), RRHH y Nomina LOTTT, Telecom 5G y eSIM, Sostenibilidad Ameru y Eco-Creditos, Asesoria Legal IA (contratos, poderes, SAREN/SAPI), Portal Ciudadano e integracion Gemini IA. Responde sobre cualquier area del ecosistema con autoridad tecnica y vision estrategica.",
      icon: Sparkles
    };
  }
  if (pathname.includes('/contabilidad') || pathname.includes('/resumen-negocio') || pathname.includes('/facturacion')) {
    return {
      role: "Administrador Fiscal",
      expertise: "Experto en normativas SENIAT, balances corporativos y optimización de rentabilidad.",
      icon: Wallet
    };
  }
  if (pathname.includes('/escritorio-juridico') || pathname.includes('/contratos') || pathname.includes('/permisos')) {
    return {
      role: "Consultor Jurídico",
      expertise: "Especialista en leyes venezolanas, redacción de contratos inmutables y trámites ante SAREN/SAPI.",
      icon: Gavel
    };
  }
  if (pathname.includes('/dashboard-telecom') || pathname.includes('/venta-linea') || pathname.includes('/dashboard-informatica')) {
    return {
      role: "Ingeniero de Operaciones",
      expertise: "Soporte técnico para redes 5G, aprovisionamiento eSIM y arquitectura de infraestructura de misión crítica.",
      icon: Cpu
    };
  }
  if (pathname.includes('/sostenibilidad') || pathname.includes('/mercado-ecocreditos')) {
    return {
      role: "Gestor Ambiental",
      expertise: "Experto en el mercado de Eco-Créditos, tecnología de reciclaje magnético y activos verdes Blockchain.",
      icon: Recycle
    };
  }
  if (pathname.includes('/dashboard-rrhh') || pathname.includes('/nominas')) {
    return {
      role: "Especialista de Talento",
      expertise: "Gestor de nóminas, beneficios LOTTT y cultura organizacional corporativa.",
      icon: User
    };
  }
  return {
    role: "Asistente Ciudadano",
    expertise: "Especialista en trámites civiles, identidad digital y servicios personales en el ecosistema Kyron.",
    icon: Sparkles
  };
};

export function ChatDialog() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { toast } = useToast();

  const identity = getAIIdentity(pathname || "");

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
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const context = `El usuario está en el portal gestionado por el ${identity.role}. Su experiencia es: ${identity.expertise}. Responde siempre con autoridad en esta área específica. No uses la palabra nodo.`;
      const botResponse = await chat({ message: currentInput, context });
      const botMessage: Message = { role: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'bot', text: "Error de enlace con el núcleo de inteligencia. Inténtalo de nuevo." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 md:h-16 md:w-16 rounded-full shadow-glow btn-3d-primary z-[100] group border-2 border-white/10">
          <Bot className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse shadow-glow-secondary" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-card/95 backdrop-blur-3xl border-l-border dark:border-l-white/10 flex flex-col h-full">
        <SheetHeader className="p-6 md:p-8 border-b border-border bg-muted/10">
          <div className="flex items-center gap-4 text-left">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-glow-sm">
              <identity.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">{identity.role}</SheetTitle>
              <SheetDescription className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Inteligencia Especializada Activa</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4 bg-muted/20 border-b border-border flex gap-2 overflow-x-auto no-scrollbar">
            <Button variant="outline" size="sm" className="h-8 px-4 rounded-lg text-[8px] font-black uppercase border-primary/20 text-primary bg-primary/5 shrink-0 shadow-inner" onClick={() => setIsWalletOpen(true)}>
                <Wallet className="mr-2 h-3 w-3" /> Billetera Digital
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-4 rounded-lg text-[8px] font-black uppercase border-border text-muted-foreground shrink-0 bg-background/50">
                <Activity className="mr-2 h-3 w-3" /> Estatus Red
            </Button>
        </div>

        <Tabs defaultValue="consulta" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 bg-muted/30 p-1 rounded-none border-b border-border">
            <TabsTrigger value="acciones" className="text-[8px] font-black uppercase tracking-widest">Eventos</TabsTrigger>
            <TabsTrigger value="sugerencias" className="text-[8px] font-black uppercase tracking-widest">Protocolos</TabsTrigger>
            <TabsTrigger value="consulta" className="text-[8px] font-black uppercase tracking-widest">Chat IA</TabsTrigger>
          </TabsList>

          <TabsContent value="acciones" className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Activity className="h-3 w-3" /> Historial Reciente
            </h4>
            
            {isWalletOpen && (
                <div className="p-6 bg-primary/10 rounded-2xl border border-primary/30 space-y-4 animate-in slide-in-from-top-4 shadow-glow-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-primary uppercase">Saldo Certificado</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsWalletOpen(false)}><X className="h-3 w-3"/></Button>
                    </div>
                    <div className="space-y-2 font-mono">
                        <div className="flex justify-between text-xs font-bold text-foreground/80"><span>VES</span> <span>45.678,90</span></div>
                        <div className="flex justify-between text-xs font-bold text-primary"><span>USD</span> <span>$ 12.345,67</span></div>
                    </div>
                </div>
            )}

            {[
              { mod: "Seguridad", text: "Identidad biométrica verificada", status: "Ok", time: "hace 10m" },
              { mod: "Fiscal", text: "Validación de RIF completada", status: "Ok", time: "hace 1h" },
              { mod: "Red", text: "Canal 5G sincronizado", status: "Ok", time: "hace 3h" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-background/50 rounded-2xl border border-border flex justify-between items-start group hover:border-primary/20 transition-all shadow-sm">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase text-primary/60">{item.mod}</p>
                  <p className="text-xs font-bold text-foreground/80">{item.text}</p>
                  <p className="text-[8px] font-medium text-muted-foreground/40 uppercase">{item.time}</p>
                </div>
                <Badge variant="outline" className="text-[7px] border-primary/20 text-primary uppercase h-5">{item.status}</Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="sugerencias" className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-secondary" /> Sugerencias IA
            </h4>
            {[
              { mod: "Prioridad", text: "Actualizar expediente legal antes del cierre.", action: "Ver Área" },
              { mod: "Ahorro", text: "Optimizar consumo de datos en la línea principal.", action: "Ver Detalles" },
              { mod: "Ambiente", text: "Canjear Eco-Créditos acumulados.", action: "Canjear" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10 space-y-3">
                <div>
                  <p className="text-[8px] font-black uppercase text-secondary/60">{item.mod}</p>
                  <p className="text-xs font-bold text-foreground/80 leading-snug">{item.text}</p>
                </div>
                <Button variant="link" className="p-0 h-auto text-[9px] font-black uppercase text-secondary hover:text-foreground transition-all flex items-center gap-1">
                  {item.action} <ChevronRight className="h-2 w-2" />
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="consulta" className="flex-1 flex flex-col p-6 overflow-hidden">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4">
              {messages.length === 0 && !isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-8">
                  <MessageCircle className="h-12 w-12 mb-4 text-muted-foreground" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Comunicación Cifrada Activa</p>
                  <p className="text-[8px] font-bold uppercase mt-2 text-muted-foreground">Personalidad actual: {identity.role}</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                    <div className={cn('p-2 rounded-lg border shrink-0', msg.role === 'user' ? 'bg-primary/10 border-primary/20' : 'bg-muted/50 border-border')}>
                      {msg.role === 'user' ? <User className="h-3 w-3 text-primary" /> : <Bot className="h-3 w-3 text-emerald-500" />}
                    </div>
                    <div className={cn('max-w-[85%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed', msg.role === 'user' ? 'bg-primary text-white shadow-glow-sm' : 'bg-muted/50 text-foreground/80 shadow-sm border border-border/50')}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted border border-border shrink-0"><Bot className="h-3 w-3 text-emerald-500" /></div>
                  <div className="bg-muted/30 rounded-2xl p-4 shadow-inner">
                    <span className="text-[10px] font-black text-primary animate-pulse uppercase tracking-widest italic">Procesando Inferencia...</span>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="relative mt-auto">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Comando para el ${identity.role}...`} 
                className="h-12 rounded-xl bg-muted/50 border-border/50 text-xs font-bold focus-visible:ring-primary shadow-inner text-foreground placeholder:text-muted-foreground/40"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 btn-3d-primary rounded-lg" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4"/>
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <footer className="p-6 border-t border-border bg-muted/10 text-center">
          <p className="text-[7px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic">Kyron Intelligence • 2026</p>
        </footer>
      </SheetContent>
    </Sheet>
  );
}

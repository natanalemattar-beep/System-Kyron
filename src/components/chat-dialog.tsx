'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Send, MessageSquareText, X, CircleUserRound, Trash2,
  TrendingUp, Scale, Smartphone, Leaf, RotateCcw, StopCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const getAIIdentity = (pathname: string) => {
  if (pathname.includes('/sector-privado-system-kyron')) {
    return {
      role: "Kyron Master",
      context: "El usuario está en el Panel de Sector Privado — vista ejecutiva del ecosistema completo. Dominas todos los módulos: Contabilidad VEN-NIF, RRHH LOTTT, Telecom 5G, Sostenibilidad, Legal, Portal Ciudadano. Puedes guiarlo a cualquier sección de la plataforma.",
      icon: Sparkles,
      greeting: "Soy Kyron Master. Tengo visión completa del ecosistema. ¿En qué módulo necesitas ayuda?",
    };
  }
  if (pathname.includes('/contabilidad') || pathname.includes('/resumen-negocio') || pathname.includes('/facturacion') || pathname.includes('/declaracion-iva') || pathname.includes('/islr') || pathname.includes('/inventario') || pathname.includes('/cuentas-por') || pathname.includes('/libro-compra') || pathname.includes('/libro-licores') || pathname.includes('/ajuste-por-inflacion') || pathname.includes('/estructura-costos') || pathname.includes('/analisis') || pathname.includes('/arqueo-caja') || pathname.includes('/proformas') || pathname.includes('/reportes') || pathname.includes('/reports') || pathname.includes('/tramites-fiscales') || pathname.includes('/dashboard-empresa') || pathname.includes('/pasarelas-pago') || pathname.includes('/billetera-cambio')) {
    return {
      role: "Kyron Fiscal",
      context: "El usuario está en el módulo Contable/Fiscal. Página actual: " + pathname + ". Conoces todas las sub-páginas: dashboard-empresa, resumen-negocio, contabilidad, facturación, inventario, cuentas por cobrar/pagar, declaración IVA, ISLR-ARC, libros fiscales, ajuste por inflación, análisis financiero/caja/mercado/rentabilidad/riesgo/ventas, arqueo de caja, proformas, reportes, trámites fiscales, pasarelas de pago, billetera de cambio. Prioriza respuestas sobre IVA 16%, ISLR, IGTF 3%, retenciones, SENIAT, tasa BCV, VEN-NIF.",
      icon: TrendingUp,
      greeting: "Soy Kyron Fiscal. Especialista en contabilidad VEN-NIF, impuestos y cumplimiento SENIAT. ¿Qué necesitas calcular o consultar?",
    };
  }
  if (pathname.includes('/escritorio-juridico') || pathname.includes('/contratos') || pathname.includes('/permisos')) {
    return {
      role: "Kyron Legal",
      context: "El usuario está en el Escritorio Jurídico. Página actual: " + pathname + ". Módulos disponibles: escritorio-juridico (panel principal con IA legal), contratos (gestión de contratos mercantiles), permisos (permisología ante SENIAT, ministerios, municipios, entes autónomos). Prioriza respuestas sobre SAREN, SAPI, registros mercantiles, constitución de empresas, poderes, actas de asamblea.",
      icon: Scale,
      greeting: "Soy Kyron Legal. Consultor jurídico especializado en legislación venezolana, contratos y registros. ¿En qué puedo asesorarte?",
    };
  }
  if (pathname.includes('/venta-linea') || pathname.includes('/mi-linea') || pathname.includes('/flota-empresarial') || pathname.includes('/telecom') || pathname.includes('/dashboard-informatica')) {
    return {
      role: "Kyron Telecom",
      context: "El usuario está en el módulo de Telecomunicaciones. Página actual: " + pathname + ". Módulos: mi-linea (gestión personal de eSIM, recargas, consumo 5G), flota-empresarial (gestión masiva de líneas corporativas, límites por empleado), venta-linea (punto de venta de líneas y planes). Se accede desde /login-linea con opción Personal o Corporativo.",
      icon: Smartphone,
      greeting: "Soy Kyron Telecom. Gestión de líneas 5G, eSIM y flota empresarial. ¿Qué necesitas configurar?",
    };
  }
  if (pathname.includes('/sostenibilidad') || pathname.includes('/mercado-ecocreditos')) {
    return {
      role: "Kyron Verde",
      context: "El usuario está en el módulo de Sostenibilidad. Página actual: " + pathname + ". Módulos: sostenibilidad (portal Eco-Créditos con registro de actividades de reciclaje, balance, impacto CO₂, historial de transacciones), mercado-ecocreditos (intercambio de créditos verdes). Se accede desde /login-sostenibilidad.",
      icon: Leaf,
      greeting: "Soy Kyron Verde. Gestor de sostenibilidad, Eco-Créditos y economía circular. ¿Qué quieres saber?",
    };
  }
  if (pathname.includes('/dashboard-rrhh') || pathname.includes('/nominas') || pathname.includes('/prestaciones') || pathname.includes('/reclutamiento') || pathname.includes('/desarrollo-personal') || pathname.includes('/clima-organizacional') || pathname.includes('/salud-seguridad') || pathname.includes('/libros-laborales')) {
    return {
      role: "Kyron RRHH",
      context: "El usuario está en el módulo de RRHH. Página actual: " + pathname + ". Módulos: dashboard-rrhh, nóminas (gestión LOTTT), prestaciones-sociales (cálculo Art. 142), reclutamiento, desarrollo-personal, clima-organizacional, salud-seguridad, libros-laborales. Prioriza: prestaciones trimestrales, utilidades 30-120 días, vacaciones 15 días + 1/año, cestaticket, IVSS, INCES 2%, BANAVIH 3%.",
      icon: CircleUserRound,
      greeting: "Soy Kyron RRHH. Especialista en nómina LOTTT, prestaciones y gestión de talento. ¿Qué necesitas calcular?",
    };
  }
  if (pathname.includes('/dashboard-socios') || pathname.includes('/acta-asamblea')) {
    return {
      role: "Kyron Socios",
      context: "El usuario está en el módulo de Socios. Página actual: " + pathname + ". Funcionalidades: composición accionaria con porcentajes, KPIs financieros, actas de asamblea, dividendos, gobernanza corporativa. Se accede desde /login-socios.",
      icon: CircleUserRound,
      greeting: "Soy Kyron. Estás en la Consola de Socios. Puedo ayudarte con composición accionaria, actas de asamblea y dividendos. ¿Qué necesitas?",
    };
  }
  if (pathname.includes('/dashboard') || pathname.includes('/cuenta-personal') || pathname.includes('/perfil') || pathname.includes('/seguridad') || pathname.includes('/notificaciones') || pathname.includes('/documentos') || pathname.includes('/carnet') || pathname.includes('/tarjeta') || pathname.includes('/directorio-medico') || pathname.includes('/antecedentes') || pathname.includes('/partidas') || pathname.includes('/actas-matrimonio') || pathname.includes('/manutencion') || pathname.includes('/registro-rif')) {
    return {
      role: "Kyron Personal",
      context: "El usuario está en el Portal Ciudadano Personal. Página actual: " + pathname + ". Módulos disponibles: dashboard (panel personal), cuenta-personal, perfil, seguridad, notificaciones (email/WhatsApp/SMS/in-app), documentos (bóveda digital), carnet-personal (QR), tarjeta-digital, tarjeta-reciclaje, directorio-medico, antecedentes-penales, partidas-nacimiento, actas-matrimonio, manutención, registro-rif. Se accede desde /login-personal.",
      icon: CircleUserRound,
      greeting: "Soy Kyron. Estoy aquí para ayudarte con tu cuenta personal, trámites y documentos. ¿Qué necesitas?",
    };
  }
  return {
    role: "Kyron",
    context: "Asistente general del ecosistema System Kyron. Página actual: " + pathname + ". Conoces todos los módulos: Contabilidad VEN-NIF (login-empresa), RRHH LOTTT (login-empresa), Legal (login-escritorio-juridico), Telecom 5G (login-linea), Sostenibilidad (login-sostenibilidad), Socios (login-socios), Portal Ciudadano (login-personal), Facturación (login-ventas). Guía al usuario al portal correcto según lo que necesite.",
    icon: Sparkles,
    greeting: "Soy Kyron, tu asistente inteligente. Conozco cada módulo de la plataforma. ¿En qué puedo ayudarte?",
  };
};

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const Tag = listType;
      elements.push(
        <Tag key={`list-${elements.length}`} className={cn("my-1.5 space-y-0.5", listType === 'ul' ? "list-disc" : "list-decimal", "pl-4")}>
          {listItems.map((item, i) => (
            <li key={i} className="text-[11px] leading-relaxed">{renderInline(item)}</li>
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const codeMatch = remaining.match(/`([^`]+)`/);

      let firstMatch: { index: number; length: number; node: React.ReactNode } | null = null;

      if (boldMatch && boldMatch.index !== undefined) {
        const candidate = { index: boldMatch.index, length: boldMatch[0].length, node: <strong key={key++} className="font-bold text-foreground">{boldMatch[1]}</strong> };
        if (!firstMatch || candidate.index < firstMatch.index) firstMatch = candidate;
      }
      if (codeMatch && codeMatch.index !== undefined) {
        const candidate = { index: codeMatch.index, length: codeMatch[0].length, node: <code key={key++} className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-primary">{codeMatch[1]}</code> };
        if (!firstMatch || candidate.index < firstMatch.index) firstMatch = candidate;
      }

      if (firstMatch) {
        if (firstMatch.index > 0) {
          parts.push(remaining.substring(0, firstMatch.index));
        }
        parts.push(firstMatch.node);
        remaining = remaining.substring(firstMatch.index + firstMatch.length);
      } else {
        parts.push(remaining);
        break;
      }
    }
    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(<h4 key={i} className="text-xs font-bold text-foreground mt-2 mb-1">{renderInline(trimmed.slice(4))}</h4>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h3 key={i} className="text-[13px] font-bold text-foreground mt-2.5 mb-1">{renderInline(trimmed.slice(3))}</h3>);
    } else if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(<h2 key={i} className="text-sm font-bold text-foreground mt-3 mb-1.5">{renderInline(trimmed.slice(2))}</h2>);
    } else if (/^[-*]\s/.test(trimmed)) {
      if (listType !== 'ul') { flushList(); listType = 'ul'; }
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ol') { flushList(); listType = 'ol'; }
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
    } else if (trimmed === '') {
      flushList();
      if (elements.length > 0) {
        elements.push(<div key={i} className="h-1.5" />);
      }
    } else {
      flushList();
      elements.push(<p key={i} className="text-[11px] leading-relaxed text-foreground/80">{renderInline(trimmed)}</p>);
    }
  }
  flushList();
  return <div className="space-y-0.5">{elements}</div>;
}

const QUICK_PROMPTS = [
  "¿Cómo calculo las prestaciones sociales?",
  "¿Cuál es la alícuota del IVA vigente?",
  "¿Qué necesito para registrar una empresa?",
  "¿Cómo funciona el IGTF?",
];

export function ChatDialog() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const identity = getAIIdentity(pathname || "");
  const IconComponent = identity.icon;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    if (streamingText) {
      setMessages(prev => [...prev, { role: 'assistant', content: streamingText }]);
      setStreamingText('');
    }
    setIsStreaming(false);
  }, [streamingText]);

  const isPersonalPortal = identity.role === 'Kyron Personal';

  const handleSend = useCallback(async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isStreaming) return;

    const userMsg: Message = { role: 'user', content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);
    setStreamingText('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const apiEndpoint = isPersonalPortal ? '/api/ai/kyron-chat-personal' : '/api/ai/kyron-chat';

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          context: identity.context,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Error de conexión' }));
        setMessages(prev => [...prev, { role: 'assistant', content: err.error || 'Error al procesar la solicitud.' }]);
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No readable stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              accumulated += data.text;
              setStreamingText(accumulated);
            }
            if (data.done) {
              setMessages(prev => [...prev, { role: 'assistant', content: accumulated }]);
              setStreamingText('');
              setIsStreaming(false);
              return;
            }
            if (data.error) {
              setMessages(prev => [...prev, { role: 'assistant', content: data.error }]);
              setStreamingText('');
              setIsStreaming(false);
              return;
            }
          } catch {}
        }
      }

      if (accumulated && !controller.signal.aborted) {
        setMessages(prev => [...prev, { role: 'assistant', content: accumulated }]);
        setStreamingText('');
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Inténtalo de nuevo.' }]);
    } finally {
      setIsStreaming(false);
      setStreamingText('');
    }
  }, [input, messages, isStreaming, identity.context, isPersonalPortal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const clearChat = () => {
    if (isStreaming) stopStreaming();
    setMessages([]);
    setStreamingText('');
  };

  const hasMessages = messages.length > 0 || isStreaming;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 md:h-16 md:w-16 rounded-full shadow-glow btn-3d-primary z-[100] group border-2 border-white/10">
          <Sparkles className="h-6 w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-[420px] p-0 bg-background border-l border-border flex flex-col h-full">
        <SheetHeader className="p-5 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div>
                <SheetTitle className="text-base font-bold text-foreground">{identity.role}</SheetTitle>
                <SheetDescription className="text-[10px] font-semibold text-muted-foreground">Asistente IA · En línea</SheetDescription>
              </div>
            </div>
            {hasMessages && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={clearChat} title="Limpiar chat">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <div ref={chatContainerRef} className="relative flex-1 overflow-y-auto p-4 space-y-4">
          {!hasMessages ? (
            <div className="h-full flex flex-col items-center justify-center px-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-4">
                <Sparkles className="h-10 w-10 text-primary/40" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{identity.role}</p>
              <p className="text-xs text-muted-foreground text-center mb-6 max-w-[260px] leading-relaxed">
                {identity.greeting}
              </p>
              <div className="w-full space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider px-1">Preguntas sugeridas</p>
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/20 transition-all text-[11px] font-medium text-foreground/70 hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  <div className={cn('shrink-0 mt-0.5', msg.role === 'user' ? 'hidden' : '')}>
                    <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/15">
                      <IconComponent className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </div>
                  <div className={cn(
                    'max-w-[82%] px-3.5 py-2.5 rounded-2xl',
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-muted/50 border border-border/50 rounded-bl-md'
                  )}>
                    {msg.role === 'user' ? (
                      <p className="text-[11px] font-medium leading-relaxed">{msg.content}</p>
                    ) : (
                      renderMarkdown(msg.content)
                    )}
                  </div>
                </div>
              ))}

              {isStreaming && (
                <div className="flex gap-2.5">
                  <div className="shrink-0 mt-0.5">
                    <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/15">
                      <IconComponent className="h-3.5 w-3.5 text-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="max-w-[82%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-muted/50 border border-border/50">
                    {streamingText ? (
                      <>
                        {renderMarkdown(streamingText)}
                        <span className="inline-block w-1.5 h-3.5 bg-primary/60 animate-pulse ml-0.5 rounded-sm" />
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5 py-0.5">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground/60 ml-1">Kyron está pensando...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 border-t border-border bg-muted/10">
          {isStreaming && (
            <div className="flex justify-center mb-2">
              <Button variant="outline" size="sm" onClick={stopStreaming} className="h-7 px-3 text-[10px] font-semibold gap-1.5 rounded-lg">
                <StopCircle className="h-3 w-3" /> Detener
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full h-11 pl-4 pr-12 rounded-xl bg-muted/50 border border-border/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 text-foreground placeholder:text-muted-foreground/50 transition-all"
              disabled={isStreaming}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm"
              disabled={isStreaming || !input.trim()}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
          <p className="text-[9px] text-muted-foreground/40 text-center mt-2 font-medium">Kyron puede cometer errores. Verifica la información importante.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

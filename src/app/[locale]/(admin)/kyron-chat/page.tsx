'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Send, Trash2, StopCircle,
  TrendingUp, Scale, Smartphone, Leaf, CircleUserRound,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/ui/motion";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const IDENTITIES = [
  { key: "master", role: "Kyron Master", icon: Sparkles, color: "from-[#0ea5e9] to-[#10b981]", desc: "Visión completa del ecosistema" },
  { key: "fiscal", role: "Kyron Fiscal", icon: TrendingUp, color: "from-[#f59e0b] to-[#ef4444]", desc: "IVA, ISLR, IGTF, SENIAT" },
  { key: "legal", role: "Kyron Legal", icon: Scale, color: "from-[#8b5cf6] to-[#6366f1]", desc: "Contratos, registros, SAREN" },
  { key: "telecom", role: "Kyron Telecom", icon: Smartphone, color: "from-[#06b6d4] to-[#3b82f6]", desc: "Líneas 5G, eSIM, flota" },
  { key: "verde", role: "Kyron Verde", icon: Leaf, color: "from-[#22c55e] to-[#10b981]", desc: "Eco-Créditos, sostenibilidad" },
  { key: "rrhh", role: "Kyron RRHH", icon: CircleUserRound, color: "from-[#ec4899] to-[#f43f5e]", desc: "Nómina LOTTT, prestaciones" },
];

const CONTEXTS: Record<string, string> = {
  master: "El usuario está en el Chat IA de página completa (/kyron-chat) y ha seleccionado la identidad Kyron Master. Está DENTRO de la plataforma autenticado. No le digas que vaya a otra página ni que está fuera de ningún módulo — puede hacerte cualquier pregunta sobre cualquier módulo desde aquí. Domina todos los módulos: Contabilidad VEN-NIF, RRHH LOTTT, Telecom 5G, Sostenibilidad, Legal, Portal Ciudadano.",
  fiscal: "El usuario está en el Chat IA de página completa (/kyron-chat) y ha seleccionado la identidad Kyron Fiscal. Está DENTRO de la plataforma autenticado. No le digas que vaya a otra página ni que está fuera del módulo contable — puede hacerte cualquier consulta fiscal desde aquí. Prioriza respuestas sobre IVA 16%, ISLR, IGTF 3%, retenciones, libros fiscales, SENIAT, tasa BCV y normativa VEN-NIF. Tienes acceso completo a todo el conocimiento contable/fiscal.",
  legal: "El usuario está en el Chat IA de página completa (/kyron-chat) y ha seleccionado la identidad Kyron Legal. Está DENTRO de la plataforma autenticado. No le digas que vaya a otra página — puede hacerte cualquier consulta legal desde aquí. Prioriza respuestas sobre contratos, SAREN, SAPI, registros mercantiles y normativa venezolana.",
  telecom: "El usuario está en el Chat IA de página completa (/kyron-chat) y ha seleccionado la identidad Kyron Telecom. Está DENTRO de la plataforma autenticado. No le digas que vaya a otra página — puede hacerte cualquier consulta telecom desde aquí. Prioriza respuestas sobre líneas 5G, eSIM, flota empresarial, planes y facturación telecom.",
  verde: "El usuario está en el Chat IA de página completa (/kyron-chat) y ha seleccionado la identidad Kyron Verde. Está DENTRO de la plataforma autenticado. No le digas que vaya a otra página — puede hacerte cualquier consulta de sostenibilidad desde aquí. Prioriza respuestas sobre Eco-Créditos, reciclaje tecnológico, economía circular y activos verdes.",
  rrhh: "El usuario está en el Chat IA de página completa (/kyron-chat) y ha seleccionado la identidad Kyron RRHH. Está DENTRO de la plataforma autenticado. No le digas que vaya a otra página — puede hacerte cualquier consulta de RRHH desde aquí. Prioriza respuestas sobre nómina LOTTT, prestaciones, vacaciones, liquidaciones, IVSS, INCES, BANAVIH.",
};

const GREETINGS: Record<string, string> = {
  master: "Soy Kyron Master. Tengo visión completa del ecosistema. ¿En qué módulo necesitas ayuda?",
  fiscal: "Soy Kyron Fiscal. Especialista en contabilidad VEN-NIF, impuestos y cumplimiento SENIAT. ¿Qué necesitas calcular o consultar?",
  legal: "Soy Kyron Legal. Consultor jurídico especializado en legislación venezolana, contratos y registros. ¿En qué puedo asesorarte?",
  telecom: "Soy Kyron Telecom. Gestión de líneas 5G, eSIM y flota empresarial. ¿Qué necesitas configurar?",
  verde: "Soy Kyron Verde. Gestor de sostenibilidad, Eco-Créditos y economía circular. ¿Qué quieres saber?",
  rrhh: "Soy Kyron RRHH. Especialista en nómina LOTTT, prestaciones y gestión de talento. ¿Qué necesitas calcular?",
};

const QUICK_PROMPTS: Record<string, string[]> = {
  master: [
    "¿Qué módulos tiene System Kyron?",
    "¿Cómo registro una empresa?",
    "¿Cuáles son las obligaciones fiscales principales?",
    "Necesito una guía general de inicio",
  ],
  fiscal: [
    "¿Cómo calculo el IVA de una factura en divisas?",
    "¿Cuál es la alícuota del IGTF vigente?",
    "¿Cuándo se declara el ISLR?",
    "¿Cómo funciona la retención de IVA del 75%?",
  ],
  legal: [
    "¿Qué necesito para registrar una empresa en SAREN?",
    "¿Cómo se redacta un contrato mercantil?",
    "¿Qué es una marca registrada en SAPI?",
    "¿Cuáles son los requisitos para un poder notariado?",
  ],
  telecom: [
    "¿Cómo activo una eSIM?",
    "¿Qué planes 5G están disponibles?",
    "¿Cómo administro una flota empresarial?",
    "¿Cómo transfiero una línea?",
  ],
  verde: [
    "¿Qué son los Eco-Créditos?",
    "¿Cómo certifico activos verdes?",
    "¿Cómo funciona el reciclaje tecnológico?",
    "¿Qué reportes de impacto ambiental se generan?",
  ],
  rrhh: [
    "¿Cómo calculo las prestaciones sociales?",
    "¿Cuántos días de vacaciones corresponden?",
    "¿Cómo se calcula el cestaticket?",
    "¿Cuáles son los aportes parafiscales obligatorios?",
  ],
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
        <Tag key={`list-${elements.length}`} className={cn("my-2 space-y-1.5", listType === 'ul' ? "list-disc" : "list-decimal", "pl-6")}>
          {listItems.map((item, i) => (
            <li key={i} className="text-base leading-relaxed">{renderInline(item)}</li>
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  };

  const renderInline = (txt: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = txt;
    let key = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const codeMatch = remaining.match(/`([^`]+)`/);

      type InlineMatch = { idx: number; len: number; node: React.ReactNode };
      let firstMatch: InlineMatch | null = null;

      if (boldMatch && typeof boldMatch.index === 'number') {
        const candidate: InlineMatch = { idx: boldMatch.index, len: boldMatch[0].length, node: <strong key={key++} className="font-bold text-foreground">{boldMatch[1]}</strong> };
        if (!firstMatch || candidate.idx < firstMatch.idx) firstMatch = candidate;
      }
      if (codeMatch && typeof codeMatch.index === 'number') {
        const candidate: InlineMatch = { idx: codeMatch.index, len: codeMatch[0].length, node: <code key={key++} className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-primary">{codeMatch[1]}</code> };
        if (!firstMatch || candidate.idx < firstMatch.idx) firstMatch = candidate;
      }

      if (firstMatch) {
        if (firstMatch.idx > 0) {
          parts.push(remaining.substring(0, firstMatch.idx));
        }
        parts.push(firstMatch.node);
        remaining = remaining.substring(firstMatch.idx + firstMatch.len);
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
      elements.push(<h4 key={i} className="text-lg font-bold text-foreground mt-3 mb-1.5">{renderInline(trimmed.slice(4))}</h4>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h3 key={i} className="text-xl font-bold text-foreground mt-4 mb-2">{renderInline(trimmed.slice(3))}</h3>);
    } else if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(<h2 key={i} className="text-2xl font-bold text-foreground mt-5 mb-2">{renderInline(trimmed.slice(2))}</h2>);
    } else if (/^[-*]\s/.test(trimmed)) {
      if (listType !== 'ul') { flushList(); listType = 'ul'; }
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ol') { flushList(); listType = 'ol'; }
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
    } else if (trimmed === '') {
      flushList();
      if (elements.length > 0) {
        elements.push(<div key={i} className="h-2" />);
      }
    } else {
      flushList();
      elements.push(<p key={i} className="text-base leading-relaxed text-foreground/80">{renderInline(trimmed)}</p>);
    }
  }
  flushList();
  return <div className="space-y-0.5">{elements}</div>;
}

const FULLCHAT_STORAGE_KEY = 'kyron-fullchat-history';
const FULLCHAT_MAX_STORED = 50;

function isValidMessage(m: unknown): m is Message {
  return typeof m === 'object' && m !== null &&
    ('role' in m) && (m as Message).role !== undefined &&
    ((m as Message).role === 'user' || (m as Message).role === 'assistant') &&
    ('content' in m) && typeof (m as Message).content === 'string';
}

function loadFullChatHistory(): Message[] {
  try {
    const stored = localStorage.getItem(FULLCHAT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed.filter(isValidMessage).slice(-FULLCHAT_MAX_STORED);
    }
  } catch {}
  return [];
}

function saveFullChatHistory(messages: Message[]) {
  try {
    localStorage.setItem(FULLCHAT_STORAGE_KEY, JSON.stringify(messages.slice(-FULLCHAT_MAX_STORED)));
  } catch {}
}

export default function KyronChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadFullChatHistory();
  });
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [selectedIdentity, setSelectedIdentity] = useState('master');
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const identity = IDENTITIES.find(i => i.key === selectedIdentity) || IDENTITIES[0];
  const IconComponent = identity.icon;

  useEffect(() => {
    if (messages.length > 0) {
      saveFullChatHistory(messages);
    }
  }, [messages]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollBtn(distFromBottom > 100);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current && !showScrollBtn) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, streamingText, showScrollBtn]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    if (streamingText) {
      setMessages(prev => [...prev, { role: 'assistant', content: streamingText }]);
      setStreamingText('');
    }
    setIsStreaming(false);
  }, [streamingText]);

  const handleSend = useCallback(async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isStreaming) return;

    const userMsg: Message = { role: 'user', content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);
    setStreamingText('');

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/ai/kyron-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          context: CONTEXTS[selectedIdentity] || CONTEXTS.master,
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
  }, [input, messages, isStreaming, selectedIdentity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (isStreaming) stopStreaming();
    setMessages([]);
    setStreamingText('');
    try { localStorage.removeItem(FULLCHAT_STORAGE_KEY); } catch {}
  };

  const hasMessages = messages.length > 0 || isStreaming;
  const prompts = QUICK_PROMPTS[selectedIdentity] || QUICK_PROMPTS.master;

  return (
    <PageTransition>
      <ModuleTutorial config={moduleTutorials["kyron-ia"]} />
      <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
        <div className="shrink-0 border-b border-border/40 bg-card/50 backdrop-blur-sm px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={cn("p-2.5 rounded-xl bg-gradient-to-br", identity.color)}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">{identity.role}</h1>
                <p className="text-sm font-semibold text-muted-foreground">Asistente IA · Claude Sonnet · En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasMessages && (
                <Button variant="outline" size="sm" onClick={clearChat} className="h-9 px-4 text-sm font-bold uppercase tracking-wider gap-1.5 rounded-lg">
                  <Trash2 className="h-4 w-4" /> Limpiar
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {IDENTITIES.map((id) => {
              const Icon = id.icon;
              const active = id.key === selectedIdentity;
              return (
                <button
                  key={id.key}
                  onClick={() => {
                    if (!isStreaming) {
                      setSelectedIdentity(id.key);
                      setMessages([]);
                      setStreamingText('');
                      try { localStorage.removeItem(FULLCHAT_STORAGE_KEY); } catch {}
                    }
                  }}
                  className={cn(
                    "shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-bold uppercase tracking-wider transition-all",
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border/40 bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                  disabled={isStreaming}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{id.role.replace('Kyron ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5 relative">
          {!hasMessages ? (
            <div className="h-full flex flex-col items-center justify-center px-4 max-w-lg mx-auto">
              <div className={cn("p-5 rounded-2xl bg-gradient-to-br mb-5 shadow-lg", identity.color)}>
                <IconComponent className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{identity.role}</h2>
              <p className="text-base text-muted-foreground text-center mb-8 leading-relaxed max-w-sm">
                {GREETINGS[selectedIdentity]}
              </p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left px-4 py-3.5 rounded-xl border border-border/50 bg-card/80 hover:bg-primary/5 hover:border-primary/20 transition-all text-base font-medium text-foreground/70 hover:text-foreground leading-relaxed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  {msg.role !== 'user' && (
                    <div className="shrink-0 mt-1">
                      <div className={cn("p-2 rounded-xl bg-gradient-to-br", identity.color)}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[75%] px-4 py-3 rounded-2xl',
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-card border border-border/50 rounded-bl-md shadow-sm'
                  )}>
                    {msg.role === 'user' ? (
                      <p className="text-base font-medium leading-relaxed">{msg.content}</p>
                    ) : (
                      renderMarkdown(msg.content)
                    )}
                  </div>
                </div>
              ))}

              {isStreaming && (
                <div className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <div className={cn("p-2 rounded-xl bg-gradient-to-br", identity.color)}>
                      <IconComponent className="h-4 w-4 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-md bg-card border border-border/50 shadow-sm">
                    {streamingText ? (
                      <>
                        {renderMarkdown(streamingText)}
                        <span className="inline-block w-1.5 h-4 bg-primary/60 animate-pulse ml-0.5 rounded-sm" />
                      </>
                    ) : (
                      <div className="flex items-center gap-2 py-1">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-sm text-muted-foreground/60 ml-1">{identity.role} está pensando...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {showScrollBtn && (
            <button
              onClick={scrollToBottom}
              className="sticky bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary/90 text-white shadow-lg flex items-center justify-center hover:bg-primary transition-colors z-10"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="shrink-0 border-t border-border/40 bg-card/50 backdrop-blur-sm px-4 sm:px-6 py-3">
          {isStreaming && (
            <div className="flex justify-center mb-2">
              <Button variant="outline" size="sm" onClick={stopStreaming} className="h-9 px-4 text-sm font-bold uppercase tracking-wider gap-1.5 rounded-lg">
                <StopCircle className="h-4 w-4" /> Detener respuesta
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder={`Pregúntale a ${identity.role}...`}
              className="w-full min-h-[48px] max-h-[120px] pl-4 pr-14 py-3 rounded-xl bg-muted/30 border border-border/50 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 text-foreground placeholder:text-muted-foreground/40 transition-all resize-none"
              disabled={isStreaming}
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm"
              disabled={isStreaming || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-sm text-muted-foreground/40 text-center mt-2 font-medium">
            Kyron puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import {
  X,
  Send,
  Loader2,
  User,
  Sparkles,
  BrainCircuit,
  Bot,
  EyeOff,
  MessageCircle,
  Square,
  Trash2,
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const HIDE_KEY = 'kyron-chat-hidden';
const HISTORY_KEY = 'kyron-floating-chat-history';
const MAX_HISTORY = 50;

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-MAX_HISTORY).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content || m.text || '',
    }));
  } catch { return []; }
}

function saveHistory(msgs: Message[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(msgs.slice(-MAX_HISTORY)));
  } catch {}
}

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const abortRef = useRef<AbortController | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(HIDE_KEY);
    if (stored === 'true') setHidden(true);
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, processing]);

  const isLanding = pathname === '/' || pathname === '/es' || pathname === '/en';

  const stopStreaming = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    saveHistory([]);
    toast({ title: 'Historial limpiado', description: 'Se borraron todos los mensajes.' });
  }, [toast]);

  const sendMessage = useCallback(
    async () => {
      const queryText = input.trim();
      if (!queryText || processing) return;

      if (isLanding) {
        const errorMsg: Message = { role: 'assistant', content: 'Inicia sesión para usar el chat con IA.' };
        setMessages((prev) => {
          const next = [...prev, { role: 'user' as const, content: queryText }, errorMsg];
          saveHistory(next);
          return next;
        });
        setInput('');
        return;
      }

      const newUserMsg: Message = { role: 'user', content: queryText };
      setMessages((prev) => [...prev, newUserMsg]);
      setInput('');
      setProcessing(true);
      setStreaming(false);

      const chatHistory = [...messages, newUserMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const res = await fetch('/api/ai/kyron-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatHistory }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const errorMsg = res.status === 401
            ? 'Inicia sesión para usar el chat con IA.'
            : res.status === 503
            ? 'El chat IA no está disponible en este momento.'
            : errorData.error || 'Error de conexión con Kyron Chat.';
          setMessages((prev) => {
            const next = [...prev, { role: 'assistant' as const, content: errorMsg }];
            saveHistory(next);
            return next;
          });
          return;
        }

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('text/event-stream') && res.body) {
          let fullText = '';
          setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
          setStreaming(true);

          const reader = res.body.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.slice(6));
                    if (data.text) {
                      fullText += data.text;
                      setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1] = { role: 'assistant', content: fullText };
                        return updated;
                      });
                    }
                    if (data.error) {
                      setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1] = { role: 'assistant', content: data.error };
                        return updated;
                      });
                    }
                  } catch {}
                }
              }
            }
          } catch (readErr: any) {
            if (readErr?.name !== 'AbortError') throw readErr;
          }

          setMessages((prev) => {
            saveHistory(prev);
            return prev;
          });
        } else {
          const data = await res.json();
          setMessages((prev) => {
            const next = [
              ...prev,
              { role: 'assistant' as const, content: data.reply || data.content || data.error || 'Sin respuesta.' },
            ];
            saveHistory(next);
            return next;
          });
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          setMessages((prev) => {
            saveHistory(prev);
            return prev;
          });
          return;
        }
        setMessages((prev) => {
          const next = [
            ...prev,
            { role: 'assistant' as const, content: 'Error de red. Verifica tu conexión e intenta de nuevo.' },
          ];
          saveHistory(next);
          return next;
        });
      } finally {
        setProcessing(false);
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [input, processing, messages, isLanding],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    stopStreaming();
  }, [stopStreaming]);

  const handleHide = useCallback(() => {
    setHidden(true);
    setOpen(false);
    stopStreaming();
    localStorage.setItem(HIDE_KEY, 'true');
    toast({
      title: 'Chat oculto',
      description: 'Puedes reactivarlo desde el botón en la esquina inferior izquierda.',
    });
  }, [toast, stopStreaming]);

  const handleShow = useCallback(() => {
    setHidden(false);
    localStorage.setItem(HIDE_KEY, 'false');
  }, []);

  if (!mounted) return null;

  if (hidden) {
    return (
      <div className="fixed bottom-6 left-6 z-[9990]">
        <button
          onClick={handleShow}
          className="group flex items-center gap-2 h-11 px-4 rounded-full bg-gradient-to-r from-primary/90 to-blue-600/90 border border-white/20 shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
          title="Mostrar Kyron Chat"
        >
          <MessageCircle className="h-4 w-4 text-white" />
          <span className="text-[9px] font-black uppercase tracking-wider text-white/90">Chat</span>
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="fixed bottom-6 left-6 z-[9990]">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 h-14 px-5 rounded-full bg-gradient-to-r from-primary via-blue-600 to-cyan-500 border border-white/20 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <BrainCircuit className="h-5 w-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[11px] font-black tracking-wider text-white uppercase">Kyron Chat</span>
            <span className="text-[8px] font-semibold tracking-wide text-white/50 uppercase">AI Assistant</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9990]">
      <div className="mb-4 w-[min(420px,calc(100vw-3rem))] h-[min(600px,calc(100vh-8rem))] flex flex-col rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-zinc-950/95 backdrop-blur-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
        <header className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl border bg-primary/10 border-primary/20">
              <BrainCircuit className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Kyron Chat</p>
              <p className={cn(
                'text-[8px] font-bold uppercase tracking-widest transition-colors',
                streaming ? 'text-amber-400' : processing ? 'text-amber-400' : 'text-emerald-500/60'
              )}>
                {streaming ? 'Generando respuesta...' : processing ? 'Procesando...' : 'Kyron AI · Listo'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40"
                onClick={clearHistory}
                title="Limpiar historial"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40"
              onClick={handleHide}
              title="Ocultar chat"
            >
              <EyeOff className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40"
              onClick={handleClose}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden px-4 py-3">
          <div className="h-full overflow-y-auto pr-1 custom-scrollbar" ref={scrollRef}>
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="py-14 text-center space-y-3 opacity-30">
                  <Sparkles className="h-8 w-8 mx-auto text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] px-6 leading-relaxed text-white/80">
                    {isLanding
                      ? 'Inicia sesión para chatear con Kyron.'
                      : 'Kyron Chat listo. Escribe un mensaje.'}
                  </p>
                  <p className="text-[8px] uppercase tracking-wider text-white/40 px-4">
                    Inteligencia corporativa venezolana
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.role === 'user' ? (
                    <div className="flex items-start gap-2.5 flex-row-reverse">
                      <div className="p-1.5 rounded-lg border shrink-0 mt-0.5 bg-primary/10 border-primary/20">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <div className="max-w-[85%]">
                        <div className="px-3.5 py-2.5 rounded-2xl rounded-br-md bg-primary text-white text-[11px] font-medium leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg border shrink-0 mt-0.5 bg-orange-500/10 border-orange-500/20">
                        <Bot className="h-3 w-3 text-orange-400" />
                      </div>
                      <div className="max-w-[85%]">
                        <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/5 border border-white/10 text-[11px] leading-relaxed">
                          <MarkdownRenderer content={msg.content} className="text-white/80 text-[11px] leading-relaxed [&_strong]:text-white [&_h1]:text-sm [&_h2]:text-xs [&_h3]:text-xs [&_li]:text-[11px]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {processing && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg border shrink-0 mt-0.5 bg-orange-500/10 border-orange-500/20">
                    <Bot className="h-3 w-3 text-orange-400" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin text-orange-400" />
                      <span className="text-[10px] text-white/30 font-medium">Procesando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="px-4 py-3 bg-white/[0.02] border-t border-white/5">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLanding ? 'Inicia sesión primero...' : 'Escribe un mensaje...'}
              className="h-9 rounded-xl bg-white/5 border-white/10 text-[11px] font-medium text-white placeholder:text-white/30 focus-visible:ring-primary/30"
              disabled={processing && !streaming}
            />
            {streaming ? (
              <Button
                type="button"
                size="icon"
                className="h-9 w-9 rounded-xl bg-red-600 hover:bg-red-500 shrink-0 transition-colors duration-200"
                onClick={stopStreaming}
                title="Detener generación"
              >
                <Square className="h-3 w-3 text-white fill-white" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shrink-0 transition-colors duration-200"
                disabled={!input.trim() || processing}
              >
                <Send className="h-3.5 w-3.5 text-white" />
              </Button>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}

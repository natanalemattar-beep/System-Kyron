'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  X,
  Send,
  Loader2,
  User,
  Sparkles,
  BrainCircuit,
  Bot,
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => setIsAuthenticated(r.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, processing]);

  const sendMessage = useCallback(
    async () => {
      const queryText = input.trim();
      if (!queryText || processing) return;

      setMessages((prev) => [...prev, { role: 'user', text: queryText }]);
      setInput('');
      setProcessing(true);

      try {
        const res = await fetch('/api/ai/kyron-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', text: data.error || 'Error de conexión con Kyron Chat.' },
          ]);
          return;
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: data.reply || 'Sin respuesta.' },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Error de red. Verifica tu conexión e intenta de nuevo.' },
        ]);
      } finally {
        setProcessing(false);
      }
    },
    [input, processing],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!isAuthenticated) return null;

  if (!open) {
    return (
      <div className="fixed bottom-6 left-6 z-[200]">
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
            <span className="text-[8px] font-semibold tracking-wide text-white/50 uppercase">Kyron AI</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[200]">
      <div className="mb-4 w-[420px] h-[600px] flex flex-col rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-zinc-950/95 backdrop-blur-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
        <header className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl border bg-primary/10 border-primary/20">
              <BrainCircuit className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Kyron Chat</p>
              <p className={cn(
                'text-[8px] font-bold uppercase tracking-widest transition-colors',
                processing ? 'text-amber-400' : 'text-emerald-500/60'
              )}>
                {processing ? 'Procesando...' : 'Kyron AI · Listo'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40"
            onClick={handleClose}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </header>

        <div className="flex-1 overflow-hidden px-4 py-3">
          <div className="h-full overflow-y-auto pr-1 custom-scrollbar" ref={scrollRef}>
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="py-14 text-center space-y-3 opacity-30">
                  <Sparkles className="h-8 w-8 mx-auto text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] px-6 leading-relaxed text-white/80">
                    Kyron Chat listo. Escribe un mensaje.
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
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg border shrink-0 mt-0.5 bg-orange-500/10 border-orange-500/20">
                        <Bot className="h-3 w-3 text-orange-400" />
                      </div>
                      <div className="max-w-[85%]">
                        <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {processing && (
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
              placeholder="Escribe un mensaje..."
              className="h-9 rounded-xl bg-white/5 border-white/10 text-[11px] font-medium text-white placeholder:text-white/30 focus-visible:ring-primary/30"
              disabled={processing}
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shrink-0 transition-colors duration-200"
              disabled={!input.trim() || processing}
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, Sparkles, X, Bot, User, 
  Trash2, StopCircle, ArrowDown 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface AgentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
  agentName: string;
  agentDescription: string;
  agentIcon: React.ReactNode;
}

export function AgentChatModal({
  isOpen,
  onClose,
  agentId,
  agentName,
  agentDescription,
  agentIcon
}: AgentChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

    try {
      const res = await fetch('/api/ai/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          messages: newMessages,
          context: `Consulta sobre ${agentName} en el portal ciudadano`,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Error en la comunicación');

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
          } catch {}
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu solicitud.' }]);
    } finally {
      setIsStreaming(false);
    }
  }, [input, messages, isStreaming, agentId, agentName]);

  const clearChat = () => {
    if (isStreaming) stopStreaming();
    setMessages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl h-[85vh] p-0 overflow-hidden bg-slate-950 border-white/10 flex flex-col gap-0 shadow-2xl">
        <DialogHeader className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
              {agentIcon}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {agentName}
                <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] border-none">Online</Badge>
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs mt-0.5">
                {agentDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/5"
        >
          {messages.length === 0 && !isStreaming && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Bot className="h-10 w-10 text-primary animate-bounce-slow" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Hola, soy el {agentName}</p>
                <p className="text-xs text-slate-400">¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-primary text-white" : "bg-slate-900 border border-white/5 text-primary"
              )}>
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={cn(
                "max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-slate-900/50 border border-white/5 text-slate-200 rounded-tl-none"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isStreaming && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 border border-white/5 text-primary flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 animate-pulse" />
              </div>
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-none bg-slate-900/50 border border-white/5 text-slate-200 text-[13px] leading-relaxed">
                {streamingText || "Pensando..."}
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 bg-primary ml-1 align-middle"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-900/30 border-t border-white/5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Escribe tu consulta al ${agentName}...`}
              className="bg-slate-950 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-primary/30"
              disabled={isStreaming}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isStreaming || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-white shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center justify-between mt-4">
            <p className="text-[10px] text-slate-500 font-medium tracking-wide flex items-center gap-1.5 uppercase">
              <Sparkles className="h-3 w-3 text-amber-500/50" />
              Potenciado por System Kyron Intelligence
            </p>
            {messages.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearChat}
                className="h-6 text-[9px] uppercase font-bold text-slate-500 hover:text-rose-400 gap-1.5"
              >
                <Trash2 className="h-3 w-3" /> Limpiar chat
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full font-bold", className)}>
      {children}
    </span>
  );
}

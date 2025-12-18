
'use client';

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bot, Send, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chat, type ChatInput, type ChatOutput } from "@/ai/flows/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  role: 'user' | 'bot';
  text: string;
};

// This function determines the context based on the current URL
const getPageContext = (pathname: string) => {
  if (pathname.startsWith('/admin/dashboard-empresa')) return "el dashboard principal de administración de la empresa (Centro de Mando)";
  if (pathname.startsWith('/contabilidad')) return "el dashboard del portal de Contabilidad";
  if (pathname.startsWith('/ventas/analisis-ventas')) return "el dashboard de Análisis de Ventas";
  if (pathname.startsWith('/hr/dashboard-rrhh')) return "el dashboard de Recursos Humanos";
  if (pathname.startsWith('/legal/escritorio-juridico')) return "el dashboard del Escritorio Jurídico";
  if (pathname.startsWith('/socios/dashboard-socios')) return "el dashboard para Socios y Directivos (Holding)";
  if (pathname.startsWith('/admin/dashboard-informatica')) return "el dashboard de Ingeniería e Informática";
  if (pathname.startsWith('/main/asesoria-publicidad')) return "el dashboard de Marketing y Publicidad";
  if (pathname.startsWith('/dashboard')) return "el dashboard personal para trámites civiles de una persona natural";
  if (pathname.startsWith('/main/cuentas-por-cobrar')) return "el módulo de Cuentas por Cobrar";
  if (pathname.startsWith('/main/cuentas-por-pagar')) return "el módulo de Cuentas por Pagar";
  if (pathname.startsWith('/ventas/punto-de-venta')) return "el Punto de Venta (TPV) para facturar";
  if (pathname === '/') return "la página de inicio de Kyron. Describe los servicios, características y testimonios.";
  // Add more specific contexts as needed
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
  }, [messages]);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg">
          <Bot className="h-8 w-8"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg flex flex-col h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" /> Asistente IA
          </DialogTitle>
          <DialogDescription>
            Hazme una pregunta sobre la página actual o cualquier otra duda.
          </DialogDescription>
        </DialogHeader>
        <div ref={chatContainerRef} className="flex-grow flex flex-col p-4 bg-secondary rounded-lg min-h-0 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-center text-muted-foreground">
              <p>Hola, ¿cómo puedo ayudarte hoy?</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'bot' && <Avatar className="h-8 w-8"><AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback></Avatar>}
                <div
                  className={cn('max-w-xs md:max-w-md rounded-lg px-4 py-2', msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.role === 'user' && <Avatar className="h-8 w-8"><AvatarFallback>TÚ</AvatarFallback></Avatar>}
              </div>
            ))
          )}
           {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8"><AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback></Avatar>
                <div className="bg-background max-w-xs md:max-w-md rounded-lg px-4 py-2 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                </div>
              </div>
            )}
        </div>
        <form onSubmit={handleSendMessage}>
            <div className="relative">
                <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4"/>
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

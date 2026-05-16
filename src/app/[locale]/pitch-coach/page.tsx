'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/motion';
import { cn } from '@/lib/utils';
import {
  Upload, Send, FileText, Image as ImageIcon, Trash2, StopCircle,
  Sparkles, MessageSquare, FileCheck, ArrowDown, Paperclip, X,
  Lightbulb, Target, Clock, AlertTriangle, Download
} from 'lucide-react';
import { PasswordGate } from '@/components/password-gate';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
};

const ALLOWED_TYPES = [
  'application/pdf', 
  'image/jpeg', 
  'image/png', 
  'image/webp',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation' // PPTX
];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

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
      let firstMatch: InlineMatch | null = null as any;

      if (boldMatch && typeof boldMatch.index === 'number') {
        const candidate: InlineMatch = { idx: boldMatch.index, len: boldMatch[0].length, node: <strong key={key++} className="font-bold text-foreground">{boldMatch[1]}</strong> };
        if (!firstMatch || (firstMatch && candidate.idx < firstMatch.idx)) firstMatch = candidate;
      }
      if (codeMatch && typeof codeMatch.index === 'number') {
        const candidate: InlineMatch = { idx: codeMatch.index, len: codeMatch[0].length, node: <code key={key++} className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-primary">{codeMatch[1]}</code> };
        if (!firstMatch || (firstMatch && candidate.idx < firstMatch.idx)) firstMatch = candidate;
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

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: 'Generar guion completo', prompt: 'Genera un guion completo para esta presentación con timing sugerido para cada sección.' },
  { icon: Target, label: 'Analizar fortalezas', prompt: '¿Cuáles son las fortalezas principales de esta presentación? ¿Qué destaca?' },
  { icon: AlertTriangle, label: 'Identificar debilidades', prompt: '¿Qué áreas debo mejorar en esta presentación? Sé honesto y constructivo.' },
  { icon: Clock, label: 'Optimizar timing', prompt: '¿Cómo puedo optimizar el timing de esta presentación para un pitch de 5 minutos?' },
];

export default function PitchCoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = useCallback(async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Tipo de archivo no permitido. Usa PDF, JPG, PNG o WebP.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('El archivo excede 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setUploadedFile({ name: file.name, type: file.type, size: file.size, dataUrl });
      setIsAnalyzing(true);
      setMessages([]);
      setStreamingText('');

      try {
        const res = await fetch('/api/pitch-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl, type: file.type }),
        });

        if (!res.ok) throw new Error('Error al analizar');

        const data = await res.json();
        setMessages([{ role: 'assistant', content: data.content }]);
      } catch (err) {
        setMessages([{ role: 'assistant', content: 'Error al analizar la presentación. Intenta de nuevo.' }]);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

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
    if (!messageText || isStreaming || isAnalyzing) return;

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
      const res = await fetch('/api/pitch-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Error de conexión' }));
        setMessages(prev => [...prev, { role: 'assistant', content: err.error || 'Error al procesar.' }]);
        setIsStreaming(false);
        return;
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Inténtalo de nuevo.' }]);
    } finally {
      setIsStreaming(false);
      setStreamingText('');
    }
  }, [input, messages, isStreaming, isAnalyzing]);

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
    setUploadedFile(null);
    setStreamingText('');
  };

  const downloadGuion = () => {
    if (messages.length === 0) return;
    
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    if (assistantMessages.length === 0) return;

    let content = `# GUION DE PITCH - ANÁLISIS IA\n\n`;
    content += `*Generado por Pitch Coach AI - System Kyron*\n\n`;
    content += `---\n\n`;
    
    assistantMessages.forEach((msg, i) => {
      content += `## Sección ${i + 1}\n\n${msg.content}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guion-pitch-${new Date().toISOString().slice(0,10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setMessages([]);
  };

  const hasContent = messages.length > 0 || uploadedFile !== null;

  return (
    <PasswordGate title="Pitch Coach AI">
      <PageTransition>
        <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="shrink-0 border-b border-border/40 bg-card/50 backdrop-blur-sm px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Pitch Coach AI</h1>
                <p className="text-sm font-semibold text-muted-foreground">Analiza tu presentación · Genera tu guion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.filter(m => m.role === 'assistant').length > 0 && (
                <Button variant="outline" size="sm" onClick={downloadGuion} className="h-9 px-4 text-sm font-bold uppercase tracking-wider gap-1.5 rounded-lg border-violet-500/30 text-violet-400 hover:bg-violet-500/10">
                  <Download className="h-4 w-4" /> Descargar Guion
                </Button>
              )}
              {hasContent && (
                <Button variant="outline" size="sm" onClick={clearChat} className="h-9 px-4 text-sm font-bold uppercase tracking-wider gap-1.5 rounded-lg">
                  <Trash2 className="h-4 w-4" /> Limpiar
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!hasContent && !isAnalyzing ? (
          /* Upload State */
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-xl w-full">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-4 shadow-lg">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Sube tu presentación</h2>
                <p className="text-base text-muted-foreground max-w-sm mx-auto">
                  Adjunta tu pitch deck (PDF, PNG, JPG o WebP) y la IA lo analizará para generar tu guion de presentación.
                </p>
              </div>

              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
                  isDragging
                    ? "border-violet-400 bg-violet-500/10"
                    : "border-border/50 hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.pptx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-base font-medium text-foreground mb-1">
                  Arrastra tu archivo aquí o <span className="text-primary">haz clic para seleccionar</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, JPG, PNG o WebP · Máximo 10 MB
                </p>
              </div>

              {/* Quick Tips */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: FileCheck, title: 'PDF o imágenes', desc: 'Sube diapositivas completas' },
                  { icon: MessageSquare, title: 'Chat interactivo', desc: 'Haz preguntas sobre tu pitch' },
                  { icon: Lightbulb, title: 'Guion optimizado', desc: 'Timing y narrativa incluidos' },
                ].map((tip, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-card/50 border border-border/30">
                    <tip.icon className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm font-semibold text-foreground">{tip.title}</p>
                    <p className="text-xs text-muted-foreground">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5 relative">
              {/* Uploaded File Banner */}
              {uploadedFile && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                  {uploadedFile.type === 'application/pdf' ? (
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-primary shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                  <button onClick={removeFile} className="p-1 rounded-md hover:bg-muted transition-colors">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              )}

              {/* Analyzing State */}
              {isAnalyzing && (
                <div className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                      <Sparkles className="h-4 w-4 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-md bg-card border border-border/50 shadow-sm">
                    <div className="flex items-center gap-2 py-1">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-muted-foreground/60 ml-1">Analizando presentación...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  {msg.role !== 'user' && (
                    <div className="shrink-0 mt-1">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                        <Sparkles className="h-4 w-4 text-white" />
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

              {/* Quick Actions (only after analysis) */}
              {messages.length > 0 && !isStreaming && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {QUICK_ACTIONS.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(action.prompt)}
                      className="flex items-center gap-2 text-left px-4 py-3 rounded-xl border border-border/50 bg-card/80 hover:bg-primary/5 hover:border-primary/20 transition-all text-sm font-medium text-foreground/70 hover:text-foreground"
                    >
                      <action.icon className="h-4 w-4 text-primary" />
                      {action.label}
                    </button>
                  ))}
                </div>
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

            {/* Input Area */}
            <div className="shrink-0 border-t border-border/40 bg-card/50 backdrop-blur-sm px-4 sm:px-6 py-3">
              {isStreaming && (
                <div className="flex justify-center mb-2">
                  <Button variant="outline" size="sm" onClick={stopStreaming} className="h-9 px-4 text-sm font-bold uppercase tracking-wider gap-1.5 rounded-lg">
                    <StopCircle className="h-4 w-4" /> Detener
                  </Button>
                </div>
              )}
              <form onSubmit={handleSubmit} className="relative">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-3 bottom-3 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  disabled={isStreaming || isAnalyzing}
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.pptx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Pregúntale al Pitch Coach..."
                  className="w-full min-h-[48px] max-h-[120px] pl-12 pr-14 py-3 rounded-xl bg-muted/30 border border-border/50 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 text-foreground placeholder:text-muted-foreground/40 transition-all resize-none"
                  disabled={isStreaming || isAnalyzing}
                  rows={1}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 bottom-2 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm"
                  disabled={isStreaming || isAnalyzing || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-sm text-muted-foreground/40 text-center mt-2 font-medium">
                Pitch Coach AI analiza tu presentación y genera guiones optimizados.
              </p>
            </div>
          </>
        )}
      </div>
      </PageTransition>
    </PasswordGate>
  );
}

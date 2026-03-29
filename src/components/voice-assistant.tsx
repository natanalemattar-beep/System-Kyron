'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Loader2,
  User,
  Sparkles,
  BrainCircuit,
  AlertCircle,
} from 'lucide-react';

type ModelProvider = 'gemini' | 'openai' | 'anthropic';

type ModelResponse = {
  model: ModelProvider;
  modelLabel: string;
  reply: string | null;
  error: string | null;
};

type Message = {
  role: 'user' | 'assistant';
  text?: string;
  responses?: ModelResponse[];
};

const MODEL_COLORS: Record<ModelProvider, { bg: string; border: string; text: string; label: string; dot: string }> = {
  gemini: { bg: 'bg-blue-500/8', border: 'border-blue-500/20', text: 'text-blue-400', label: 'GEM', dot: 'bg-blue-400' },
  openai: { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', text: 'text-emerald-400', label: 'GPT', dot: 'bg-emerald-400' },
  anthropic: { bg: 'bg-orange-500/8', border: 'border-orange-500/20', text: 'text-orange-400', label: 'CLA', dot: 'bg-orange-400' },
};

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((ev: Event) => void) | null;
  onresult: ((ev: Event) => void) | null;
  onerror: ((ev: Event) => void) | null;
  onend: ((ev: Event) => void) | null;
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  return (
    (w['SpeechRecognition'] as new () => SpeechRecognitionLike) ||
    (w['webkitSpeechRecognition'] as new () => SpeechRecognitionLike) ||
    null
  );
}

function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function speak(text: string, onDone: () => void) {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'es-VE';
  utt.rate = 1.05;
  utt.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find((v) => v.lang.startsWith('es'));
  if (esVoice) utt.voice = esVoice;
  utt.onend = onDone;
  utt.onerror = onDone;
  window.speechSynthesis.speak(utt);
}

function stopSpeech() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [tts, setTts] = useState(true);
  const [input, setInput] = useState('');
  const [interim, setInterim] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setVoiceSupported(getSpeechRecognition() !== null);
    if (canSpeak()) window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => setIsAuthenticated(r.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, processing, interim]);

  useEffect(() => {
    return () => {
      recRef.current?.abort();
      stopSpeech();
    };
  }, []);

  const sendMessage = useCallback(
    async (textOverride?: string) => {
      const queryText = (textOverride || input).trim();
      if (!queryText || processing) return;

      setMessages((prev) => [...prev, { role: 'user', text: queryText }]);
      setInput('');
      setInterim('');
      setProcessing(true);

      try {
        const res = await fetch('/api/ai/kyron-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', text: data.error || 'Error de conexión con el núcleo IA.' },
          ]);
          return;
        }

        const botMsg: Message = {
          role: 'assistant',
          responses: data.responses,
        };
        setMessages((prev) => [...prev, botMsg]);

        if (tts && canSpeak()) {
          const firstSuccess = data.responses?.find((r: ModelResponse) => r.reply);
          if (firstSuccess?.reply) {
            setSpeaking(true);
            speak(firstSuccess.reply, () => setSpeaking(false));
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Error de red. Verifica tu conexión e intenta de nuevo.' },
        ]);
      } finally {
        setProcessing(false);
      }
    },
    [input, processing, tts],
  );

  const toggleMic = useCallback(() => {
    const API = getSpeechRecognition();
    if (!API) {
      toast({ title: 'Micrófono no disponible', description: 'Usa Chrome o Edge para voz.', variant: 'destructive' });
      return;
    }

    if (listening) {
      recRef.current?.stop();
      setListening(false);
      setInterim('');
      return;
    }

    stopSpeech();

    const rec = new API();
    rec.lang = 'es-VE';
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setListening(true);
      setInterim('');
    };

    rec.onresult = (ev: Event) => {
      try {
        const results = (ev as unknown as { results: SpeechRecognitionResultList }).results;
        const last = results[results.length - 1];
        const transcript = last[0].transcript;
        if (last.isFinal) {
          setListening(false);
          setInterim('');
          if (transcript.trim()) sendMessage(transcript);
        } else {
          setInterim(transcript);
        }
      } catch {
        /* ignore */
      }
    };

    rec.onerror = (ev: Event) => {
      setListening(false);
      setInterim('');
      const err = (ev as unknown as { error: string }).error;
      if (err === 'not-allowed') {
        toast({ title: 'Micrófono bloqueado', description: 'Permite el acceso en tu navegador.', variant: 'destructive' });
      } else if (err === 'no-speech') {
        toast({ title: 'No se detectó voz', description: 'Habla más cerca del micrófono.' });
      }
    };

    rec.onend = () => setListening(false);
    recRef.current = rec;

    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }, [listening, sendMessage, toast]);

  const handleClose = useCallback(() => {
    recRef.current?.abort();
    setListening(false);
    stopSpeech();
    setSpeaking(false);
    setOpen(false);
    setInterim('');
  }, []);

  const statusText = listening
    ? 'Escuchando...'
    : processing
      ? 'Consultando 3 modelos...'
      : speaking
        ? 'Hablando...'
        : voiceSupported
          ? 'Listo'
          : 'Solo texto';

  const statusColor = listening
    ? 'text-red-400'
    : processing
      ? 'text-amber-400'
      : speaking
        ? 'text-cyan-400'
        : 'text-emerald-500/60';

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
            <span className="text-[11px] font-black tracking-wider text-white uppercase">Kyron Voice</span>
            <span className="text-[8px] font-semibold tracking-wide text-white/50 uppercase">Triple IA</span>
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
            <div
              className={cn(
                'p-2 rounded-xl border transition-colors duration-300',
                listening ? 'bg-red-500/15 border-red-500/30' : 'bg-primary/10 border-primary/20',
              )}
            >
              <BrainCircuit className={cn('h-4 w-4 transition-colors', listening ? 'text-red-400' : 'text-primary')} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Kyron Voice</p>
              <p className={cn('text-[8px] font-bold uppercase tracking-widest transition-colors', statusColor)}>
                {statusText}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5 mr-2">
              {(['gemini', 'openai', 'anthropic'] as ModelProvider[]).map((m) => (
                <span key={m} className={cn('w-1.5 h-1.5 rounded-full', MODEL_COLORS[m].dot)} />
              ))}
            </div>
            {canSpeak() && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40"
                onClick={() => {
                  if (speaking) {
                    stopSpeech();
                    setSpeaking(false);
                  }
                  setTts(!tts);
                }}
              >
                {tts ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
              </Button>
            )}
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
              {messages.length === 0 && !interim && (
                <div className="py-14 text-center space-y-3 opacity-30">
                  <Sparkles className="h-8 w-8 mx-auto text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] px-6 leading-relaxed text-white/80">
                    Asistente Kyron Triple IA listo.
                    {voiceSupported ? ' Escribe o usa tu voz.' : ' Escribe un mensaje.'}
                  </p>
                  <p className="text-[8px] uppercase tracking-wider text-white/40 px-4">
                    Gemini · GPT-4o · Claude responden simultáneamente
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
                  ) : msg.text ? (
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg border shrink-0 mt-0.5 bg-white/5 border-white/10">
                        <AlertCircle className="h-3 w-3 text-red-400" />
                      </div>
                      <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-red-500/10 text-red-300 text-[11px] font-medium leading-relaxed">
                        {msg.text}
                      </div>
                    </div>
                  ) : msg.responses ? (
                    <div className="space-y-2">
                      {msg.responses.map((resp) => {
                        const colors = MODEL_COLORS[resp.model];
                        return (
                          <div key={resp.model} className={cn('rounded-xl border p-3', colors.bg, colors.border)}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} />
                              <span className={cn('text-[8px] font-black uppercase tracking-wider', colors.text)}>
                                {colors.label}
                              </span>
                              <span className="text-[8px] font-semibold text-white/30 uppercase tracking-wide">
                                {resp.modelLabel}
                              </span>
                            </div>
                            {resp.reply ? (
                              <p className="text-[11px] font-medium leading-relaxed text-white/80 whitespace-pre-wrap">
                                {resp.reply}
                              </p>
                            ) : (
                              <p className="text-[10px] font-medium text-white/30 italic">
                                No disponible{resp.error ? `: ${resp.error}` : ''}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ))}

              {interim && (
                <div className="flex items-start gap-2.5 flex-row-reverse">
                  <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0 mt-0.5">
                    <Mic className="h-3 w-3 text-red-400" />
                  </div>
                  <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-md bg-primary/20 text-white/60 text-[11px] font-medium italic">
                    {interim}...
                  </div>
                </div>
              )}

              {processing && (
                <div className="space-y-2">
                  {(['gemini', 'openai', 'anthropic'] as ModelProvider[]).map((m) => {
                    const colors = MODEL_COLORS[m];
                    return (
                      <div key={m} className={cn('rounded-xl border p-3 animate-pulse', colors.bg, colors.border)}>
                        <div className="flex items-center gap-2">
                          <Loader2 className={cn('h-3 w-3 animate-spin', colors.text)} />
                          <span className={cn('text-[8px] font-black uppercase tracking-wider', colors.text)}>
                            {colors.label}
                          </span>
                          <span className="text-[8px] text-white/20">Procesando...</span>
                        </div>
                      </div>
                    );
                  })}
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
              disabled={processing || listening}
            />
            {voiceSupported && (
              <Button
                type="button"
                size="icon"
                className={cn(
                  'h-9 w-9 rounded-xl shrink-0 transition-all duration-200',
                  listening ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/15',
                )}
                onClick={toggleMic}
                disabled={processing}
              >
                {listening ? <MicOff className="h-3.5 w-3.5 text-white" /> : <Mic className="h-3.5 w-3.5 text-white/70" />}
              </Button>
            )}
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

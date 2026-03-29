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
  ChevronDown,
  BrainCircuit,
} from 'lucide-react';

type ModelProvider = 'gemini' | 'openai' | 'anthropic';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  model?: ModelProvider;
  modelLabel?: string;
};

const MODEL_OPTIONS: { value: ModelProvider; label: string; short: string; color: string }[] = [
  { value: 'gemini', label: 'Gemini Flash', short: 'GEM', color: 'text-blue-400' },
  { value: 'openai', label: 'GPT-4o Mini', short: 'GPT', color: 'text-emerald-400' },
  { value: 'anthropic', label: 'Claude Sonnet', short: 'CLA', color: 'text-orange-400' },
];

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
  const [model, setModel] = useState<ModelProvider>('gemini');
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [input, setInput] = useState('');
  const [interim, setInterim] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setVoiceSupported(getSpeechRecognition() !== null);
    if (canSpeak()) window.speechSynthesis.getVoices();
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
      const query = (textOverride || input).trim();
      if (!query || processing) return;

      setMessages((prev) => [...prev, { role: 'user', text: query }]);
      setInput('');
      setInterim('');
      setProcessing(true);

      try {
        const res = await fetch('/api/ai/kyron-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, model }),
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
          text: data.reply,
          model: data.model,
          modelLabel: data.modelLabel,
        };
        setMessages((prev) => [...prev, botMsg]);

        if (tts && canSpeak()) {
          setSpeaking(true);
          speak(data.reply, () => setSpeaking(false));
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
    [input, processing, model, tts],
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
    setModelMenuOpen(false);
  }, []);

  const currentModel = MODEL_OPTIONS.find((m) => m.value === model)!;

  const statusText = listening
    ? 'Escuchando...'
    : processing
      ? 'Procesando...'
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
            <span className="text-[8px] font-semibold tracking-wide text-white/50 uppercase">Multi-Modelo IA</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[200]">
      <div className="mb-4 w-[370px] h-[540px] flex flex-col rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-zinc-950/95 backdrop-blur-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
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

        <div className="px-4 py-2 border-b border-white/5">
          <div className="relative">
            <button
              onClick={() => setModelMenuOpen(!modelMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 border border-white/8 transition-colors w-full"
            >
              <span className={cn('text-[9px] font-black uppercase tracking-wider', currentModel.color)}>
                {currentModel.short}
              </span>
              <span className="text-[10px] font-semibold text-white/60 flex-1 text-left">{currentModel.label}</span>
              <ChevronDown className={cn('h-3 w-3 text-white/30 transition-transform', modelMenuOpen && 'rotate-180')} />
            </button>
            {modelMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-xl z-10">
                {MODEL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setModel(opt.value);
                      setModelMenuOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 w-full hover:bg-white/5 transition-colors',
                      model === opt.value && 'bg-white/5',
                    )}
                  >
                    <span className={cn('text-[9px] font-black uppercase tracking-wider w-7', opt.color)}>
                      {opt.short}
                    </span>
                    <span className="text-[10px] font-semibold text-white/70">{opt.label}</span>
                    {model === opt.value && <span className="ml-auto text-[8px] text-primary font-bold">ACTIVO</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-4 py-3">
          <div className="h-full overflow-y-auto pr-1 custom-scrollbar" ref={scrollRef}>
            <div className="space-y-3">
              {messages.length === 0 && !interim && (
                <div className="py-14 text-center space-y-3 opacity-30">
                  <Sparkles className="h-8 w-8 mx-auto text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] px-6 leading-relaxed text-white/80">
                    Asistente Kyron listo.
                    {voiceSupported ? ' Escribe o usa tu voz.' : ' Escribe un mensaje.'}
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn('flex items-start gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                >
                  <div
                    className={cn(
                      'p-1.5 rounded-lg border shrink-0 mt-0.5',
                      msg.role === 'user' ? 'bg-primary/10 border-primary/20' : 'bg-white/5 border-white/10',
                    )}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-3 w-3 text-primary" />
                    ) : (
                      <BrainCircuit className="h-3 w-3 text-cyan-400" />
                    )}
                  </div>
                  <div className="max-w-[80%]">
                    <div
                      className={cn(
                        'px-3.5 py-2.5 rounded-2xl text-[11px] font-medium leading-relaxed whitespace-pre-wrap',
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-white/5 text-white/80 rounded-bl-md',
                      )}
                    >
                      {msg.text}
                    </div>
                    {msg.role === 'assistant' && msg.modelLabel && (
                      <p className="text-[7px] font-bold uppercase tracking-wider text-white/20 mt-1 ml-1">
                        vía {msg.modelLabel}
                      </p>
                    )}
                  </div>
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
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    <Loader2 className="h-3 w-3 text-primary animate-spin" />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
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

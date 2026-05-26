'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, FileSearch, Gavel, Landmark, MessageSquare, Zap, Loader2, Send, X } from "lucide-react";
import { Link } from "@/navigation";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

type Shortcut = {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
};

const shortcuts: Shortcut[] = [
  { label: "Análisis Fiscal", href: "/gaceta-6952", icon: Landmark, color: "from-amber-500/20 to-amber-500/5" },

];

export function AiInspectionDropdown() {
  const [open, setOpen] = useState(false);
  const [showQuickAnalysis, setShowQuickAnalysis] = useState(false);
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const runQuickAnalysis = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setReply("");
    try {
      const res = await fetch("/api/ai/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          systemPrompt: "Eres Kyron Core Empresarial, el núcleo inteligente del portal de Asesoría Contable. Cubres contabilidad VEN-NIF, RRHH/LOTTT, marketing/ventas, legal. Respondes de forma CONCISA y PROFESIONAL en español. Usa formato markdown.",
        }),
      });
      const data = await res.json();
      setReply(data.response || "Sin respuesta.");
    } catch {
      setReply("Error al conectar con el asistente.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setOpen(!open)}
          className="flex-1 sm:flex-none h-14 px-6 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20 hover:from-violet-600/30 hover:to-purple-600/30 text-violet-300 font-semibold text-[12px] tracking-wide transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4" /> Inspección AI
        </Button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-80 z-50 p-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl">
            <div className="p-3 border-b border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400">
                Inspección AI
              </p>
              <p className="text-[11px] text-white/50 mt-1">
                Análisis inteligente para tu negocio
              </p>
            </div>

            <div className="p-2">
              <button
                onClick={() => { setOpen(false); setShowQuickAnalysis(true); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white">Inspección Rápida</p>
                  <p className="text-[10px] text-white/40">Análisis al instante</p>
                </div>
              </button>
            </div>

            <div className="border-t border-white/5 p-2">
              <p className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/30">
                Accesos Directos
              </p>
              <div className="grid grid-cols-2 gap-2">
                {shortcuts.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-br ${s.color} border border-white/5 hover:border-white/20 transition-all`}
                    >
                      <Icon className="h-3.5 w-3.5 text-white/70" />
                      <span className="text-[10px] font-semibold text-white/70 truncate">{s.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showQuickAnalysis} onOpenChange={setShowQuickAnalysis}>
        <DialogContent className="max-w-lg bg-black/95 border border-white/10 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Inspección AI Rápida
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") runQuickAnalysis(); }}
                placeholder="Ej: ¿Cuál es mi situación fiscal actual?"
                className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
              />
              <Button
                onClick={runQuickAnalysis}
                disabled={loading || !query.trim()}
                size="icon"
                className="h-12 w-12 rounded-xl bg-violet-600/20 border border-violet-500/20 hover:bg-violet-600/30 text-violet-400"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            {reply && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 max-h-80 overflow-y-auto">
                <MarkdownRenderer content={reply} />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {[
                "¿Cómo está mi flujo de caja?",
                "¿Qué vencimientos fiscales tengo?",
                "Análisis de rentabilidad",
                "Alertas regulatorias",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => { setQuery(q); }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

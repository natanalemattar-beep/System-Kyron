"use client";

import { useState, useEffect } from "react";
import { Sparkles, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BANNER_KEY = "sk-brand-kit-banner-v1";

type UpdateItem = {
  title: string;
  description: string;
};

const updates: UpdateItem[] = [
  { title: "Catálogo completo de permisos Venezuela", description: "Todos los permisos, licencias y habilitaciones del país ahora disponibles en la matriz de Carlos Mattar. Más de 800 registros cargados dinámicamente desde la base de datos central." },
  { title: "Filtros y búsqueda en vivo", description: "Filtra por organismo, estado de avance o busca cualquier permiso por nombre. Los cambios de estado se guardan automáticamente." },
  { title: "Estados interactivos", description: "Haz clic en los badges de estado (Completado → Pendiente → Crítico → No Iniciado) y prioridad para actualizarlos. Persisten en tu navegador." },
];

export function UpdateBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(BANNER_KEY) !== "seen") {
        setVisible(true);
      }
    } catch {}
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(BANNER_KEY, "seen"); } catch {}
  };

  if (!visible) return null;

  return (
    <div className="mb-8 p-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <button onClick={dismiss} className="absolute top-3 right-3 p-1.5 rounded-full bg-muted/50 hover:bg-muted/80 text-muted-foreground/40 hover:text-foreground transition-all">
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Actualización</p>
          <p className="text-sm font-bold text-foreground">Brand Kit — Nuevas funcionalidades</p>
        </div>
      </div>
      <ul className="space-y-2 mb-4">
        {updates.map((u, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-foreground">{u.title}:</span> {u.description}
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={dismiss} size="sm" className="rounded-xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-600 text-white font-bold uppercase text-[10px] tracking-widest h-9 px-5">
        Entendido
      </Button>
    </div>
  );
}

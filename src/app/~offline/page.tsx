"use client";

import { useEffect, useState } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (online) {
    window.location.reload();
    return null;
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#020617] text-white p-8">
      <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8">
        <WifiOff className="h-10 w-10 text-cyan-400" />
      </div>
      <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Sin Conexión</h1>
      <p className="text-slate-400 text-sm text-center max-w-xs mb-8">
        No tienes acceso a internet. Algunas funciones no están disponibles sin conexión.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 h-12 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all"
      >
        <RefreshCw className="h-4 w-4" />
        Reintentar
      </button>
    </div>
  );
}

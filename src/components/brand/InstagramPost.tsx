"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

const FEATURES = [
  { icon: "⚡", label: "Contabilidad Automatizada" },
  { icon: "🛡️", label: "Cumplimiento SENIAT" },
  { icon: "⚖️", label: "Gestión Legal & RRHH" },
  { icon: "🔐", label: "Ciberseguridad Fiscal" },
];

export function InstagramPost() {
  const postRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState("");

  useEffect(() => {
    fetch("/images/logo-kyron-hq.png")
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoDataUrl(reader.result as string);
        reader.readAsDataURL(blob);
      });
  }, []);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const canvas = await html2canvas(postRef.current!, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#020617",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "system-kyron-post.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Error capturing post:", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={postRef}
        className="relative w-[540px] h-[540px] overflow-hidden bg-[#020617] font-[family-name:var(--font-outfit)] select-none"
        style={{ width: "540px", height: "540px" }}
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="absolute top-[-25%] left-[-15%] w-[500px] h-[500px] bg-cyan-500/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[450px] h-[450px] bg-blue-600/6 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/4 blur-[100px] rounded-full" />

        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        <div className="absolute inset-0 flex flex-col p-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              {logoDataUrl && (
                <img
                  src={logoDataUrl}
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain brightness-0 invert"
                />
              )}
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
              System Kyron
            </span>
            <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-cyan-400">Corporativo</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center -mt-6">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-400/70 mb-5">
              Inteligencia Corporativa
            </p>

            <h1 className="text-[3rem] font-black tracking-tight leading-[0.85] text-white">
              System
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 bg-clip-text text-transparent">
                Kyron
              </span>
            </h1>

            <div className="flex items-center gap-3 mt-5 mb-6">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-cyan-400" />
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>

            <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-[320px]">
              El ecosistema de inteligencia corporativa que protege y potencia tu empresa en Venezuela.
            </p>

            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px] mt-8">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                >
                  <span className="text-xs">{f.icon}</span>
                  <span className="text-[7.5px] font-bold text-zinc-300 uppercase tracking-wider leading-tight">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-md bg-white/5 flex items-center justify-center">
                <svg className="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[7px] font-bold text-zinc-500 tracking-wide">systemkyron@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-md bg-white/5 flex items-center justify-center">
                <svg className="h-3 w-3 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.75h-9a.75.75 0 010-1.5h9a.75.75 0 010 1.5zm0-4h-9a.75.75 0 010-1.5h9a.75.75 0 010 1.5zm0-4h-9a.75.75 0 010-1.5h9a.75.75 0 010 1.5z" />
                </svg>
              </div>
              <span className="text-[7px] font-bold text-zinc-500 tracking-wide">@systemkyron</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50"
      >
        <Download className={`h-4 w-4 ${downloading ? "animate-spin" : ""}`} />
        {downloading ? "Generando..." : "Descargar PNG"}
      </button>
    </div>
  );
}

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Download, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  "Contabilidad Automatizada",
  "Cumplimiento SENIAT",
  "Gestión Legal & RRHH",
  "Ciberseguridad Fiscal",
];

export function InstagramPost() {
  const postRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = "/images/logo-kyron-hq.png";
  }, []);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const mod = await import("html2canvas");
      const html2canvas = typeof mod === 'function' ? mod : (mod as any).default ?? mod;
      let lastErr: unknown;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
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
          return;
        } catch (err) {
          lastErr = err;
          await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
        }
      }
      throw lastErr;
    } catch {
      console.error("Error capturing post after retries");
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
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[350px] h-[350px] bg-blue-600/8 blur-[100px] rounded-full" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative h-20 w-20 rounded-[1.25rem] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <Image
                src="/images/logo-kyron-hq.png"
                alt="System Kyron"
                width={56}
                height={56}
                className="object-contain brightness-0 invert"
                unoptimized
              />
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400/80">
              Inteligencia Corporativa
            </p>
            <h1 className="text-[2.5rem] font-black tracking-tight leading-[0.9] text-white">
              System
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Kyron
              </span>
            </h1>
          </div>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6" />

          <p className="text-sm text-zinc-400 font-medium leading-relaxed max-w-xs mb-8">
            El ecosistema de inteligencia corporativa que protege y potencia tu empresa en Venezuela.
          </p>

          <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs mb-8">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] shrink-0" />
                <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-wider">
                  {f}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span className="text-[7px] font-black uppercase tracking-[0.25em] text-zinc-500">
              systemkyron@gmail.com
            </span>
            <div className="h-3 w-[1px] bg-white/10" />
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500">
              @systemkyron
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-3 opacity-20">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white" />
            <span className="text-[6px] font-black uppercase tracking-[0.4em] text-white">InspiraVe 2026</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white" />
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

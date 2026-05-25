"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { ShieldCheck, Lock, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCESS_CODE = "kyron2026";

export default function CartaPage() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleUnlock = () => {
    if (code.toLowerCase() === ACCESS_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02040a] p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Lock className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Documento Protegido</h1>
            <p className="text-sm text-zinc-400">Ingresa el código de acceso para visualizar esta carta.</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              placeholder="Código de acceso"
              className="w-full h-14 px-6 rounded-2xl border border-white/10 bg-white/[0.03] text-white text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/40"
            />
            {error && <p className="text-xs text-red-400 font-medium">Código incorrecto</p>}
            <Button onClick={handleUnlock} className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-amber-600 hover:bg-amber-500 text-white">
              <ShieldCheck className="mr-3 h-4 w-4" /> Desbloquear
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Button variant="ghost" onClick={() => router.push('/brand-kit')} className="text-zinc-400 hover:text-white text-xs font-black uppercase tracking-widest">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Confidencial</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden print:shadow-none print:rounded-none" id="letter-content">
          <div className="p-12 md:p-20 space-y-8 text-zinc-800">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">System Kyron</h1>
                <p className="text-sm text-zinc-500 mt-1">Plataforma de Inteligencia Corporativa</p>
              </div>
              <div className="text-right text-sm text-zinc-400">
                <p>Caracas, {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-base font-semibold text-zinc-700">A quien corresponda,</p>
              <p className="text-base font-semibold text-zinc-700">FONACIT</p>
              <p className="text-sm text-zinc-400">Presente.&mdash;</p>
            </div>

            <div className="text-base leading-relaxed text-zinc-700 space-y-5">
              <p>
                Reciba un cordial saludo de parte del equipo de <strong>System Kyron</strong>. Por medio de la presente, deseamos expresar nuestro más sincero agradecimiento por el valioso tiempo y la atención brindada durante nuestras recientes comunicaciones.
              </p>

              <p>
                Valoramos profundamente el interés mostrado por FONACIT hacia nuestra propuesta de plataforma de inteligencia corporativa, así como la disposición para explorar mecanismos de colaboración que contribuyan al desarrollo tecnológico y la automatización de procesos en el ecosistema empresarial venezolano.
              </p>

              <p>
                En System Kyron creemos firmemente que la tecnología es un habilitador fundamental para la transformación productiva del país, y encontrar aliados institucionales como FONACIT, comprometidos con la innovación y el desarrollo, reafirma nuestra convicción de que vamos por el camino correcto.
              </p>

              <p>
                Quedamos a su entera disposición para cualquier información adicional que requieran, así como para concretar los próximos pasos que permitan materializar las iniciativas discutidas. Estaremos dando seguimiento a esta comunicación en los próximos días.
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-200 space-y-6">
              <div className="space-y-1">
                <p className="font-semibold text-zinc-800">Atentamente,</p>
                <p className="text-base text-zinc-700">El equipo de System Kyron</p>
              </div>

              <div className="text-sm text-zinc-400 space-y-1">
                <p><strong className="text-zinc-600">Email:</strong> systemkyronofficial@gmail.com</p>
                <p><strong className="text-zinc-600">Instagram:</strong> @systemkyron</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => window.print()}
            className="h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            <Download className="mr-3 h-4 w-4" /> Imprimir / Guardar PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

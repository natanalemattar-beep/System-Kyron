"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { ShieldCheck, Lock, ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { OfficialSealSvg } from "@/components/brand/OfficialSealSvg";

const ACCESS_CODE = "Carlos123";

export default function CartaPage() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [exporting, setExporting] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/images/logo-kyron-hq.png")
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoUrl(reader.result as string);
        reader.readAsDataURL(blob);
      });
  }, []);

  const handleDownloadPDF = async () => {
    if (exporting || !letterRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(letterRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        style: { fontFamily: "Arial" },
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgW = letterRef.current.offsetWidth;
      const imgH = letterRef.current.offsetHeight;
      const ratio = Math.min(pdfW / imgW, pdfH / imgH);
      const renderW = imgW * ratio;
      const renderH = imgH * ratio;
      const offsetX = (pdfW - renderW) / 2;
      const offsetY = (pdfH - renderH) / 2;
      pdf.addImage(dataUrl, "PNG", offsetX, offsetY, renderW, renderH);
      pdf.save("System-Kyron-Carta-FONACIT.pdf");
    } catch (err: any) {
      alert("Error al generar PDF: " + (err?.message || "desconocido"));
    } finally {
      setExporting(false);
    }
  };

  const handleUnlock = () => {
    if (code.toLowerCase() === ACCESS_CODE.toLowerCase()) {
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
            <p className="text-sm text-zinc-400">Ingresa el codigo de acceso para visualizar esta carta.</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              placeholder="Codigo de acceso"
              autoComplete="off"
              className="w-full h-14 px-6 rounded-2xl border border-white/10 bg-white/[0.03] text-white text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/40"
            />
            {error && <p className="text-xs text-red-400 font-medium">Codigo incorrecto</p>}
            <Button onClick={handleUnlock} className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-amber-600 hover:bg-amber-500 text-white">
              <ShieldCheck className="mr-3 h-4 w-4" /> Desbloquear
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] py-16 px-4 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12 print:hidden">
          <Button variant="ghost" onClick={() => router.push('/brand-kit')} className="text-zinc-400 hover:text-white text-xs font-black uppercase tracking-widest">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Confidencial</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div ref={letterRef} className="bg-white shadow-2xl overflow-hidden print:shadow-none flex flex-col" style={{ width: '21.59cm', height: '27.94cm', fontFamily: 'Arial' }}>
            <div className="h-1.5 bg-gradient-to-r from-[#1e3a5f] via-[#2d5f8a] to-[#1e3a5f] shrink-0" />

            <div className="flex-1 px-[0.9in] py-[0.55in] flex flex-col">
              <div className="flex justify-between items-start border-b-2 border-[#1e3a5f] pb-3 mb-4 shrink-0">
                <div className="flex items-center gap-3">
                  {logoUrl && (
                    <img src={logoUrl} alt="System Kyron" className="h-12 w-12 object-contain" />
                  )}
                  <div>
                    <h1 className="text-xl font-bold text-[#1e3a5f] tracking-tight">EMPRENDIMIENTO CARLOS MATTAR</h1>
                    <p className="text-[9px] text-gray-500 font-mono mt-0.5">RIF J-50832149-9</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-500">Caracas,</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="mb-7 shrink-0">
                <p className="text-sm font-semibold text-gray-800">A quien corresponda,</p>
                <p className="text-sm font-semibold text-gray-800">FONACIT</p>
                <p className="text-xs text-gray-400">Presente.&mdash;</p>
              </div>

              <div className="text-justify space-y-5 text-[15px] leading-[1.7] text-gray-800 flex-1">
                <p>
                  Reciba un cordial saludo de parte del equipo de <strong>System Kyron</strong>. Por medio de la presente, deseamos expresar nuestro mas sincero agradecimiento por el valioso tiempo y la atencion brindada durante nuestras recientes comunicaciones.
                </p>

                <p className="indent-8">
                  Valoramos profundamente el interes mostrado por FONACIT hacia nuestra propuesta de plataforma de inteligencia corporativa, asi como la disposicion para explorar mecanismos de colaboracion que contribuyan al desarrollo tecnologico y la automatizacion de procesos en el ecosistema empresarial venezolano.
                </p>

                <p className="indent-8">
                  En System Kyron creemos firmemente que la tecnologia es un habilitador fundamental para la transformacion productiva del pais, y encontrar aliados institucionales como FONACIT, comprometidos con la innovacion y el desarrollo, reafirma nuestra conviccion de que vamos por el camino correcto.
                </p>

                <p className="indent-8">
                  Quedamos a su entera disposicion para cualquier informacion adicional que requieran, asi como para concretar los proximos pasos que permitan materializar las iniciativas discutidas. Estaremos dando seguimiento a esta comunicacion en los proximos dias.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-auto shrink-0">
                <div className="text-[10px] text-gray-500 space-y-0.5 leading-relaxed">
                  <p><strong className="text-gray-700">Correo:</strong> systemkyronofficial@gmail.com &nbsp;|&nbsp; <strong className="text-gray-700">Instagram:</strong> @systemkyron</p>
                </div>

                <div className="mt-10">
                  <p className="text-sm font-semibold text-gray-800 mb-8">Atentamente,</p>

                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <div className="max-w-[14rem] border-t border-gray-400 pt-3 text-center">
                        <p className="text-sm font-bold text-gray-800">El equipo de System Kyron</p>
                        <p className="text-[10px] text-gray-500">EMPRENDIMIENTO CARLOS MATTAR</p>
                        <p className="text-[10px] text-gray-500">RIF J-50832149-9</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                      <OfficialSealSvg size={100} className="opacity-90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1.5 bg-gradient-to-r from-[#1e3a5f] via-[#2d5f8a] to-[#1e3a5f] shrink-0" />
          </div>
        </div>

        <div className="flex justify-center mt-8 print:hidden">
          <Button
            onClick={handleDownloadPDF}
            disabled={exporting}
            className="h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white disabled:opacity-50"
          >
            {exporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
            {exporting ? "Generando PDF..." : "Descargar PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}

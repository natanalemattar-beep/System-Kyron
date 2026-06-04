"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { ShieldCheck, Lock, ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const ACCESS_CODE = "Carlos123";

export default function CartaInactividadPage() {
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
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const imgH = (pdfW * letterRef.current.offsetHeight) / letterRef.current.offsetWidth;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfW, imgH);
      pdf.save("System-Kyron-Carta-Inactividad-SENIAT.pdf");
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
            <p className="text-sm text-zinc-400">Ingresa el código de acceso para visualizar esta carta.</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              placeholder="Código de acceso"
              autoComplete="off"
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

        <div ref={letterRef} className="bg-white rounded-[2rem] shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
          <div className="p-12 md:p-20 space-y-8 text-zinc-800">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-8">
              <div className="flex items-center gap-4">
                {logoUrl && (
                  <img src={logoUrl} alt="System Kyron" className="h-12 w-12 object-contain" />
                )}
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900">EMPRENDIMIENTO CARLOS MATTAR</h1>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">RIF J-50832149-9</p>
                </div>
              </div>
              <div className="text-right text-sm text-zinc-400 shrink-0">
                <p>Caracas, {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-base font-semibold text-zinc-700">SENIAT</p>
              <p className="text-base font-semibold text-zinc-700">Gerencia Regional de Tributos Internos de la Región Capital</p>
              <p className="text-sm text-zinc-400">Su despacho.&mdash;</p>
            </div>

            <div className="text-base leading-relaxed text-zinc-700 space-y-5 text-justify">
              <p className="font-bold text-lg uppercase tracking-tight text-zinc-800 text-center">
                Carta de Declaración de Inactividad Fiscal
              </p>

              <p>
                Yo, <strong>Carlos Alberto Mattar Zreik</strong>, venezolano, mayor de edad, titular de la cédula de identidad N° <strong>V-26.441.166</strong>, actuando en mi carácter de Representante Legal de la empresa mercantil <strong>EMPRENDIMIENTO CARLOS MATTAR</strong>, debidamente inscrita en el Registro de Información Fiscal (RIF) bajo el N° <strong>J-50832149-9</strong>, por medio de la presente y de conformidad con lo establecido en el <strong>Parágrafo Segundo del Artículo 100 del Reglamento de la Ley de Impuesto sobre la Renta</strong>, me dirijo a ustedes para realizar la siguiente declaración:
              </p>

              <p>
                En mi carácter de Representante Legal y bajo juramento, declaro que durante el período fiscal comprendido entre el <strong>primer día del mes de enero y el treinta y uno de diciembre del año {new Date().getFullYear() - 1}</strong>, la empresa <strong>EMPRENDIMIENTO CARLOS MATTAR</strong> no ha realizado actividad comercial, industrial, financiera ni de ninguna otra naturaleza que genere hechos imponibles sujetos al Impuesto sobre la Renta ni al Impuesto al Valor Agregado (IVA).
              </p>

              <p>
                En consecuencia, durante el mencionado período fiscal, no se han generado ingresos, egresos, compras, ventas, importaciones, exportaciones, ni se han emitido facturas o documentos fiscales de ningún tipo. Tampoco se han presentado declaraciones de Impuesto sobre la Renta (ISLR) ni de Impuesto al Valor Agregado (IVA), por cuanto no ha existido actividad económica gravable.
              </p>

              <p>
                La presente declaración se realiza en cumplimiento con lo dispuesto en el <strong>Parágrafo Segundo del Artículo 100 del Reglamento de la Ley de Impuesto sobre la Renta</strong>, el cual establece la obligación de los contribuyentes de informar al SENIAT sobre los períodos fiscales en los que no se hubieren realizado operaciones gravadas, así como en acatamiento a las disposiciones contenidas en el <strong>Código Orgánico Tributario</strong> vigente.
              </p>

              <p>
                Asimismo, manifiesto mi compromiso de notificar inmediatamente al SENIAT en caso de que la empresa inicie cualquier actividad económica que genere obligaciones tributarias, a fin de dar cumplimiento oportuno a todas las obligaciones formales y sustanciales que correspondan conforme a la legislación tributaria venezolana.
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-200 space-y-8">
              <div className="text-sm text-zinc-500 space-y-1">
                <p><strong className="text-zinc-600">Dirección Fiscal:</strong> Calle Los Pinos, Edificio Mattar, Piso 1, La Florida, Caracas, Distrito Capital, Venezuela.</p>
                <p><strong className="text-zinc-600">Registro de Información Fiscal (RIF):</strong> J-50832149-9</p>
                <p><strong className="text-zinc-600">Correo Electrónico:</strong> systemkyronofficial@gmail.com</p>
                <p><strong className="text-zinc-600">Teléfono de Contacto:</strong> +58 412-1234567</p>
              </div>

              <div className="pt-6 space-y-6">
                <p className="font-semibold text-zinc-800">Atentamente,</p>

                <div className="flex flex-col items-center py-4">
                  <div className="w-64 border-t border-zinc-300 pt-3 text-center">
                    <p className="font-bold text-zinc-800">Carlos Alberto Mattar Zreik</p>
                    <p className="text-sm text-zinc-500">C.I. V-26.441.166</p>
                    <p className="text-sm text-zinc-500">Representante Legal</p>
                    <p className="text-sm text-zinc-500">EMPRENDIMIENTO CARLOS MATTAR</p>
                    <p className="text-sm text-zinc-500">RIF J-50832149-9</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
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

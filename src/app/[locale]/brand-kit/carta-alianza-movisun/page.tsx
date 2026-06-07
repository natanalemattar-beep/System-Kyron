"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { ShieldCheck, Lock, ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { OfficialSealSvg } from "@/components/brand/OfficialSealSvg";

const ACCESS_CODE = "Carlos123";

export default function CartaAlianzaMovisunPage() {
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
      })
      .catch(console.error);
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
      pdf.save("System-Kyron-Carta-Alianza-Movisun-Colombia.pdf");
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
            
            <div className="flex-1 px-[0.9in] py-[0.5in] flex flex-col">
              <div className="flex justify-between items-start border-b-2 border-[#1e3a5f] pb-3 mb-3 shrink-0">
                <div className="flex items-center gap-3">
                  {logoUrl && (
                    <img src={logoUrl} alt="System Kyron" className="h-10 w-10 object-contain" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#1e3a5f] tracking-tight">EMPRENDIMIENTO CARLOS MATTAR</p>
                    <p className="text-[9px] text-gray-500 font-mono">RIF J-50832149-9</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-gray-500">Caracas,</p>
                  <p className="text-[11px] text-gray-500">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            
              <div className="mb-4 shrink-0">
                <p className="text-sm font-semibold text-gray-800">MOVISUN COLOMBIA S.A.S.</p>
                <p className="text-sm font-semibold text-gray-800">Att.: Direccion General / Departamento Legal</p>
                <p className="text-[11px] text-gray-400">Bogota D.C., Colombia.&mdash;</p>
              </div>
            
              <div className="text-justify space-y-3 text-[13px] leading-[1.55] text-gray-800 flex-1">
                <p className="font-bold text-sm uppercase tracking-tight text-[#1e3a5f] text-center border-b border-gray-200 pb-2 mb-3">
                  Solicitud de Representacion de Marca y Gestion de Permisos
                </p>
            
                <p className="indent-8">
                  Reciba un cordial saludo de parte de <strong>EMPRENDIMIENTO CARLOS MATTAR</strong>, empresa venezolana identificada con RIF J-50832149-9, desarrolladora del ecosistema de inteligencia corporativa <strong>System Kyron</strong>. Por medio de la presente, nos dirigimos a ustedes con el proposito de solicitar formalmente la <strong>representacion de la marca MOVISUN</strong> en los territorios de <strong>Venezuela y España</strong>, asi como la gestion de los permisos y contratos necesarios para llevar a cabo dicha representacion.
                </p>
            
                <p className="indent-8">
                  Nuestra empresa cuenta con una solida trayectoria en el desarrollo e integracion de soluciones tecnologicas, con presencia en el mercado venezolano y proyeccion internacional. Creemos firmemente que los productos y servicios ofrecidos por <strong>MOVISUN COLOMBIA S.A.S.</strong> tienen un alto potencial de penetracion en los mercados venezolano y espanol, y estamos preparados para asumir la representacion de la marca con responsabilidad, profesionalismo y dedicacion.
                </p>
            
                <p className="indent-8">
                  El objetivo de esta solicitud es establecer una relacion de representacion comercial que nos permita:
                </p>
            
                <ul className="list-disc pl-5 space-y-1 text-[13px] leading-[1.45]">
                  <li><strong>Representacion en Venezuela:</strong> Tramitar los registros sanitarios, permisos de importacion, homologaciones y demas requisitos legales exigidos por las autoridades venezolanas (SENIAT, SENCAMER, INTT, entre otros) para la comercializacion de los productos y servicios MOVISUN en el territorio nacional.</li>
                  <li><strong>Representacion en España:</strong> Gestionar los permisos, certificaciones y contratos necesarios ante las autoridades espanolas y europeas para la introduccion y comercializacion de la marca MOVISUN en el mercado espanol, incluyendo los tramites ante la Oficina Espanola de Patentes y Marcas y demas organismos competentes.</li>
                  <li><strong>Gestion de contratos:</strong> Elaborar, negociar y suscribir los contratos de representacion, distribucion y licencia que ambas partes acuerden, asegurando el cumplimiento de la normativa legal aplicable en cada jurisdiccion.</li>
                  <li><strong>Proteccion de la marca:</strong> Velar por la proteccion de los derechos de propiedad intelectual e industrial de MOVISUN en ambos territorios, incluyendo el registro y defensa de las marcas y patentes correspondientes.</li>
                </ul>
            
                <p className="indent-8">
                  Quedamos a la espera de su respuesta para concretar una reunion donde podamos presentar formalmente nuestra propuesta de representacion, asi como para iniciar los tramites legales y administrativos necesarios. Estamos seguros de que esta relacion comercial sera beneficiosa para ambas partes y contribuira al crecimiento y posicionamiento de la marca MOVISUN en los mercados de habla hispana.
                </p>
              </div>
            
              <div className="pt-3 border-t border-gray-200 mt-auto shrink-0">
                <div className="text-[9.5px] text-gray-500 space-y-0.5 leading-relaxed">
                  <p><strong className="text-gray-700">Empresa:</strong> EMPRENDIMIENTO CARLOS MATTAR &nbsp;|&nbsp; <strong className="text-gray-700">RIF:</strong> J-50832149-9</p>
                  <p><strong className="text-gray-700">Direccion Fiscal:</strong> Av. Playa Grande, Edif. Belo Horizonte, Piso 15, Apt. 155 B, Catia La Mar, Estado La Guaira, Venezuela</p>
                  <p><strong className="text-gray-700">Correo:</strong> systemkyronofficial@gmail.com &nbsp;|&nbsp; <strong className="text-gray-700">Web:</strong> system-kyron.vercel.app</p>
                </div>
            
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Atentamente,</p>
                    <div className="max-w-[12rem] border-t border-gray-400 pt-1.5 text-center">
                      <p className="text-[12px] font-bold text-gray-800 leading-tight">Carlos Alberto Natanale Mattar Hernandez</p>
                      <p className="text-[9.5px] text-gray-500">C.I. V-32855496</p>
                      <p className="text-[9.5px] text-gray-500">Representante Legal</p>
                      <p className="text-[9.5px] text-gray-500">EMPRENDIMIENTO CARLOS MATTAR</p>
                      <p className="text-[9.5px] text-gray-500">System Kyron</p>
                    </div>
                  </div>
            
                  <div className="flex flex-col items-center shrink-0">
                    <OfficialSealSvg size={100} className="opacity-90" />
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

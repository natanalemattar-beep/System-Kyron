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
        style: { fontFamily: "'Times New Roman', Times, serif" },
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
            
            <div className="flex-1 px-[0.8in] py-[0.4in] flex flex-col" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              <div className="flex justify-between items-start border-b-2 border-[#1e3a5f] pb-2 mb-2 shrink-0">
                <div className="flex items-center gap-3">
                  {logoUrl && (
                    <img src={logoUrl} alt="System Kyron" className="h-10 w-10 object-contain" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#1e3a5f] tracking-tight">EMPRENDIMIENTO CARLOS MATTAR</p>
                    <p className="text-[8px] text-gray-500 font-mono">RIF J-50832149-9</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-gray-500">Caracas,</p>
                  <p className="text-[10px] text-gray-500">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            
              <div className="mb-3 shrink-0">
                <p className="text-xs font-semibold text-gray-800">MOVISUN COLOMBIA S.A.S.</p>
                <p className="text-xs font-semibold text-gray-800">Att.: Direccion de Alianzas Estrategicas</p>
                <p className="text-[10px] text-gray-400">Bogota D.C., Colombia.&mdash;</p>
              </div>
            
              <div className="text-justify space-y-2 text-[12.5px] leading-[1.4] text-gray-800 flex-1">
                <p className="font-bold text-sm uppercase tracking-tight text-[#1e3a5f] text-center border-b border-gray-200 pb-1.5 mb-2">
                  Carta de Intencion de Alianza Comercial
                </p>
            
                <p className="indent-8">
                  Reciba un cordial saludo de parte de <strong>EMPRENDIMIENTO CARLOS MATTAR</strong>, empresa venezolana identificada con RIF J-50832149-9, desarrolladora del ecosistema de inteligencia corporativa <strong>System Kyron</strong>. Por medio de la presente, manifestamos nuestro formal interes en establecer una <strong>alianza comercial estrategica</strong> con <strong>MOVISUN COLOMBIA S.A.S.</strong>
                </p>
            
                <p className="indent-8">
                  System Kyron es una plataforma corporativa integral que unifica mas de 100 modulos en areas como contabilidad (VEN-NIF/SENIAT), facturacion electronica, nomina (LOTTT), telecomunicaciones 5G, legal, inteligencia artificial, sostenibilidad y seguridad. Actualmente operamos en Venezuela con proyeccion de expansion regional.
                </p>
            
                <p className="indent-8">
                  Entendemos que MOVISUN COLOMBIA es una empresa lider en el sector de <strong>telecomunicaciones y tecnologia movil</strong> en Colombia, con una solida trayectoria y presencia en el mercado colombiano. Creemos que existe una oportunidad significativa para desarrollar sinergias comerciales que beneficien a ambas organizaciones.
                </p>
            
                <p className="font-semibold text-gray-800">
                  Objeto de la Alianza:
                </p>
            
                <p className="indent-8">
                  La presente carta de intencion tiene como objetivo explorar y establecer los terminos para una alianza comercial que podria incluir, sin limitarse a:
                </p>
            
                <ul className="list-disc pl-5 space-y-0.5 text-[12px] leading-[1.35]">
                  <li><strong>Distribucion cruzada de servicios:</strong> Integracion de soluciones MOVISUN en el ecosistema System Kyron para el mercado colombiano, y viceversa.</li>
                  <li><strong>Paquetes comerciales conjuntos:</strong> Desarrollo de ofertas empaquetadas que combinen servicios de telecomunicaciones MOVISUN con modulos corporativos de System Kyron.</li>
                  <li><strong>Expansion geografica:</strong> Colaboracion para la entrada de System Kyron en el mercado colombiano, aprovechando la infraestructura y conocimiento local de MOVISUN.</li>
                  <li><strong>Innovacion tecnologica:</strong> Co-desarrollo de soluciones integradas de transformacion digital para el sector empresarial colombiano.</li>
                </ul>
            
                <p className="indent-8">
                  Quedamos a la espera de su response para concretar una reunion de trabajo donde podamos presentar formalmente nuestra propuesta y explorar en detalle los terminos de esta potencial alianza. Estamos seguros de que esta colaboracion generara valor significativo para ambas organizaciones y, sobre todo, para nuestros clientes.
                </p>
              </div>
            
              <div className="pt-3 border-t border-gray-200 mt-auto shrink-0">
                <div className="text-[8.5px] text-gray-500 space-y-0.5 leading-relaxed">
                  <p><strong className="text-gray-700">Empresa:</strong> EMPRENDIMIENTO CARLOS MATTAR &nbsp;|&nbsp; <strong className="text-gray-700">RIF:</strong> J-50832149-9</p>
                  <p><strong className="text-gray-700">Direccion Fiscal:</strong> Av. Playa Grande, Edif. Belo Horizonte, Piso 15, Apt. 155 B, Catia La Mar, Estado La Guaira, Venezuela</p>
                  <p><strong className="text-gray-700">Correo:</strong> systemkyronofficial@gmail.com &nbsp;|&nbsp; <strong className="text-gray-700">Web:</strong> system-kyron.vercel.app</p>
                </div>
            
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-800 mb-3">Atentamente,</p>
                    <div className="max-w-[12rem] border-t border-gray-400 pt-1.5 text-center">
                      <p className="text-[11px] font-bold text-gray-800 leading-tight">Carlos Alberto Natanale Mattar Hernandez</p>
                      <p className="text-[8.5px] text-gray-500">C.I. V-32855496</p>
                      <p className="text-[8.5px] text-gray-500">Representante Legal</p>
                      <p className="text-[8.5px] text-gray-500">EMPRENDIMIENTO CARLOS MATTAR</p>
                      <p className="text-[8.5px] text-gray-500">System Kyron</p>
                    </div>
                  </div>
            
                  <div className="flex flex-col items-center shrink-0">
                    <OfficialSealSvg size={100} className="opacity-90" />
                    <p className="text-[8px] text-gray-400 italic mt-0.5">Sello oficial</p>
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

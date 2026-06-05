"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { ShieldCheck, Lock, ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

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
              <p className="text-base font-semibold text-zinc-700">MOVISUN COLOMBIA S.A.S.</p>
              <p className="text-base font-semibold text-zinc-700">Att.: Direccion de Alianzas Estrategicas</p>
              <p className="text-sm text-zinc-400">Bogota D.C., Colombia.&mdash;</p>
            </div>

            <div className="text-base leading-relaxed text-zinc-700 space-y-5 text-justify">
              <p className="font-bold text-lg uppercase tracking-tight text-zinc-800 text-center">
                Carta de Intencion de Alianza Comercial
              </p>

              <p>
                Reciba un cordial saludo de parte de <strong>EMPRENDIMIENTO CARLOS MATTAR</strong>, empresa venezolana 
                identificada con RIF J-50832149-9, desarrolladora del ecosistema de inteligencia corporativa 
                <strong> System Kyron</strong>. Por medio de la presente, manifestamos nuestro formal interes en 
                establecer una <strong>alianza comercial estrategica</strong> con <strong>MOVISUN COLOMBIA S.A.S.</strong>
              </p>

              <p>
                System Kyron es una plataforma corporativa integral que unifica mas de 100 modulos en areas como 
                contabilidad (VEN-NIF/SENIAT), facturacion electronica, nomina (LOTTT), telecomunicaciones 5G,
                legal, inteligencia artificial, sostenibilidad y seguridad. Actualmente operamos en Venezuela 
                con proyeccion de expansion regional.
              </p>

              <p>
                Entendemos que MOVISUN COLOMBIA es una empresa lider en el sector de <strong>telecomunicaciones 
                y tecnologia movil</strong> en Colombia, con una solida trayectoria y presencia en el mercado 
                colombiano. Creemos que existe una oportunidad significativa para desarrollar sinergias 
                comerciales que beneficien a ambas organizaciones.
              </p>

              <p className="font-semibold text-zinc-800">
                Objeto de la Alianza:
              </p>

              <p>
                La presente carta de intencion tiene como objetivo explorar y establecer los terminos para 
                una alianza comercial que podria incluir, sin limitarse a:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                <li>
                  <strong>Distribucion cruzada de servicios:</strong> Integracion de soluciones MOVISUN 
                  en el ecosistema System Kyron para el mercado colombiano, y viceversa.
                </li>
                <li>
                  <strong>Paquetes comerciales conjuntos:</strong> Desarrollo de ofertas empaquetadas 
                  que combinen servicios de telecomunicaciones MOVISUN con modulos corporativos de 
                  System Kyron.
                </li>
                <li>
                  <strong>Expansion geografica:</strong> Colaboracion para la entrada de System Kyron 
                  en el mercado colombiano, aprovechando la infraestructura y conocimiento local de MOVISUN.
                </li>
                <li>
                  <strong>Innovacion tecnologica:</strong> Co-desarrollo de soluciones integradas de 
                  transformacion digital para el sector empresarial colombiano.
                </li>
              </ul>

              <p>
                Quedamos a la espera de su respuesta para concretar una reunion de trabajo donde podamos 
                presentar formalmente nuestra propuesta y explorar en detalle los terminos de esta 
                potencial alianza. Estamos seguros de que esta colaboracion generara valor significativo 
                para ambas organizaciones y, sobre todo, para nuestros clientes.
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-200 space-y-8">
              <div className="text-sm text-zinc-500 space-y-1">
                <p><strong className="text-zinc-600">Empresa:</strong> EMPRENDIMIENTO CARLOS MATTAR</p>
                <p><strong className="text-zinc-600">RIF:</strong> J-50832149-9</p>
                <p><strong className="text-zinc-600">Direccion Fiscal:</strong> Av. Playa Grande, Edif. Belo Horizonte, Piso 15, Apt. 155 B, Catia La Mar, Estado La Guaira, Venezuela</p>
                <p><strong className="text-zinc-600">Correo Electronico:</strong> systemkyronofficial@gmail.com</p>
                <p><strong className="text-zinc-600">Plataforma:</strong> systemkyron.com</p>
              </div>

              <div className="pt-6 space-y-6">
                <p className="font-semibold text-zinc-800">Atentamente,</p>

                <div className="flex flex-col items-center py-4">
                  <div className="w-64 border-t border-zinc-300 pt-3 text-center">
                    <p className="font-bold text-zinc-800">Carlos Alberto Mattar Zreik</p>
                    <p className="text-sm text-zinc-500">C.I. V-26.441.166</p>
                    <p className="text-sm text-zinc-500">Representante Legal</p>
                    <p className="text-sm text-zinc-500">EMPRENDIMIENTO CARLOS MATTAR</p>
                    <p className="text-sm text-zinc-500">System Kyron</p>
                  </div>
                </div>

                <div className="flex flex-col items-center py-2">
                  <div className="w-64 border-t border-zinc-300 pt-3 text-center">
                    <p className="font-bold text-zinc-800">MOVISUN COLOMBIA S.A.S.</p>
                    <p className="text-sm text-zinc-500">Representante Autorizado</p>
                    <div className="mt-4 h-10" />
                    <p className="text-xs text-zinc-400 italic">Firma y sello de la empresa</p>
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

"use client";

import { useEffect, useState } from "react";
import { LetterWrapper, LetterPage } from "@/components/brand/letter-wrapper";
import { OfficialSealSvg } from "@/components/brand/OfficialSealSvg";

export default function CartaAlianzaMovisunPage() {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    fetch("/images/logo-kyron-hq.png")
      .then((r) => r.blob())
      .then((b) => {
        const reader = new FileReader();
        reader.onload = () => setLogoUrl(reader.result as string);
        reader.readAsDataURL(b);
      })
      .catch(() => setLogoUrl(""));
  }, []);

  return (
    <LetterWrapper filename="System-Kyron-Carta-Alianza-Movisun.pdf">
      <LetterPage>
        <div className="flex flex-col min-h-full">
          {/* Header: logo + date */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-20">
              {logoUrl && <img src={logoUrl} alt="Logo Kyron" className="w-full" />}
            </div>
            <div className="text-right">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Fecha</p>
              <p className="text-[11px] text-gray-700 font-medium">{new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>

          {/* Thin decorative divider */}
          <div className="h-px bg-gradient-to-r from-[#1e3a5f]/20 via-[#1e3a5f]/60 to-[#1e3a5f]/20 mb-6" />

          {/* Recipient */}
          <div className="mb-5">
            <p className="text-[12px] text-gray-700 leading-relaxed">
              <span className="font-bold">Señores:</span><br />
              MOVISUN C.A.<br />
              Presente.
            </p>
          </div>

          {/* Reference box */}
          <div className="bg-[#1e3a5f]/5 border-l-4 border-[#1e3a5f] rounded-r-sm px-4 py-3 mb-5">
            <p className="text-[9px] text-[#1e3a5f]/60 uppercase tracking-widest font-bold mb-0.5">Referencia</p>
            <p className="text-[12px] font-bold text-[#1e3a5f]">Carta de Intención de Alianza Comercial — System Kyron × Movisun</p>
          </div>

          {/* Body */}
          <div className="space-y-3.5 text-[12px] leading-[1.7] text-gray-700">
            <p>De mi mayor consideración:</p>

            <p>
              Por medio de la presente, yo, <strong>Carlos Mattar</strong>, titular de la cédula de identidad <strong>V-32855496</strong>, actuando en nombre y representación de <strong>System Kyron</strong>, emprendimiento registrado bajo el <strong>RIF J-50832149-9</strong>, hago constar mi intención formal de establecer una <strong>alianza comercial estratégica</strong> con <strong>Movisun C.A.</strong>, para la promoción y comercialización conjunta de productos y servicios tecnológicos en el mercado venezolano.
            </p>

            <p>
              El objetivo fundamental de esta alianza es combinar la infraestructura tecnológica, plataforma de negocios y capacidad de desarrollo de System Kyron con la experiencia, portafolio de productos y presencia comercial de Movisun, a fin de generar sinergias que permitan:
            </p>

            <ol className="pl-5 space-y-2 list-decimal marker:text-[#1e3a5f] marker:font-bold">
              <li><strong>Distribuir y comercializar</strong> los productos de audio y tecnología de Movisun a través de los canales digitales de System Kyron.</li>
              <li><strong>Integrar</strong> los servicios de System Kyron (facturación electrónica, inventario, CRM, contabilidad) como valor agregado en la oferta comercial de Movisun hacia sus clientes corporativos.</li>
              <li><strong>Desarrollar campañas de marketing</strong> conjuntas bajo la marca compartida System Kyron × Movisun.</li>
              <li><strong>Explorar oportunidades de importación</strong> de productos tecnológicos desde Colombia, aprovechando los acuerdos comerciales de la CAN (Comunidad Andina).</li>
            </ol>

            <p>
              La presente carta de intención no constituye un contrato vinculante, sino una manifestación de voluntad para iniciar las negociaciones formales que culminarán en la firma de un acuerdo comercial definitivo. Ambas partes se comprometen a actuar de buena fe durante el proceso de negociación.
            </p>

            <p>Sin otro particular, quedo a la espera de su grata respuesta para coordinar la reunión formal de firma del acuerdo.</p>
          </div>

          {/* Signature area */}
          <div className="mt-auto pt-8 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />
            <p className="text-[12px] font-bold text-gray-800 uppercase tracking-wider">Atentamente,</p>
            <div className="my-4 flex justify-center">
              <OfficialSealSvg size={100} />
            </div>
            <div className="my-2 flex justify-center">
              <div className="border-b border-gray-400 w-64 h-10" />
            </div>
            <p className="text-[13px] font-bold text-gray-800">Carlos Mattar</p>
            <p className="text-[11px] text-gray-500">Director General — System Kyron</p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-[10px] text-gray-400">RIF J-50832149-9</span>
              <span className="text-[8px] text-gray-300">|</span>
              <span className="text-[10px] text-gray-400">carlosmattar@systemkyron.com</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
          <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">System Kyron × Movisun — Documento Confidencial</p>
        </div>
      </LetterPage>
    </LetterWrapper>
  );
}

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
          <div className="flex items-start justify-between mb-6">
            <div className="w-28">
              {logoUrl && <img src={logoUrl} alt="Logo Kyron" className="w-full" />}
            </div>
            <OfficialSealSvg size={70} />
          </div>

          <p className="text-[10px] text-gray-500 mb-6 text-right">Caracas, {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</p>

          <div className="space-y-3 text-[11.5px] leading-[1.6] text-gray-800">
            <p className="font-bold">Señores:<br />MOVISUN C.A.<br />Presente.</p>

            <p className="font-bold">Ref: Carta de Intención de Alianza Comercial — System Kyron × Movisun</p>

            <p>De mi mayor consideración:</p>

            <p>
              Por medio de la presente, yo, <strong>Carlos Mattar</strong>, titular de la cédula de identidad <strong>V-28.373.374</strong>, actuando en nombre y representación de <strong>System Kyron</strong>, emprendimiento registrado bajo el <strong>RIF J-50832149-9</strong>, hago constar mi intención formal de establecer una <strong>alianza comercial estratégica</strong> con <strong>Movisun C.A.</strong>, para la promoción y comercialización conjunta de productos y servicios tecnológicos en el mercado venezolano.
            </p>

            <p>
              El objetivo fundamental de esta alianza es combinar la infraestructura tecnológica, plataforma de negocios y capacidad de desarrollo de System Kyron con la experiencia, portafolio de productos y presencia comercial de Movisun, a fin de generar sinergias que permitan:
            </p>

            <ol className="pl-5 space-y-1.5 list-decimal">
              <li><strong>Distribuir y comercializar</strong> los productos de audio y tecnología de Movisun a través de los canales digitales y físicos de System Kyron.</li>
              <li><strong>Integrar</strong> los servicios de System Kyron (facturación electrónica, inventario, CRM, contabilidad) como valor agregado en la oferta comercial de Movisun hacia sus clientes corporativos.</li>
              <li><strong>Desarrollar campañas de marketing</strong> conjuntas bajo la marca compartida System Kyron × Movisun, incluyendo la campaña publicitaria &ldquo;Zapato Roto + Audífono Movisun&rdquo;.</li>
              <li><strong>Explorar oportunidades de importación</strong> de calzado y productos tecnológicos desde Colombia, aprovechando los acuerdos comerciales de la CAN (Comunidad Andina).</li>
            </ol>

            <p>
              La presente carta de intención no constituye un contrato vinculante, sino una manifestación de voluntad para iniciar las negociaciones formales que culminarán en la firma de un acuerdo comercial definitivo. Ambas partes se comprometen a actuar de buena fe durante el proceso de negociación.
            </p>

            <p>Sin otro particular, quedo a la espera de su grata respuesta para coordinar la reunión formal de firma del acuerdo.</p>
          </div>

          <div className="mt-auto pt-8 text-center">
            <p className="text-[11px] font-bold text-gray-800">Atentamente,</p>
            <div className="my-6 flex justify-center">
              <div className="border-b border-gray-400 w-64 h-12" />
            </div>
            <p className="text-[11px] font-bold text-gray-800">Carlos Mattar</p>
            <p className="text-[10px] text-gray-500">Director General — System Kyron</p>
            <p className="text-[10px] text-gray-500">RIF J-50832149-9</p>
            <p className="text-[10px] text-gray-500">carlosmattar@systemkyron.com</p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-300 text-center">
          <p className="text-[9px] text-gray-400">System Kyron × Movisun — Documento Confidencial</p>
        </div>
      </LetterPage>
    </LetterWrapper>
  );
}

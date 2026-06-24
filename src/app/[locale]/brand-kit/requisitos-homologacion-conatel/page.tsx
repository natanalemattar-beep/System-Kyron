"use client";

import { useEffect, useState } from "react";
import { LetterWrapper, LetterPage } from "@/components/brand/letter-wrapper";
import { Shield, FileCheck, AlertCircle } from "lucide-react";

export default function RequisitosHomologacionConatelPage() {
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
    <LetterWrapper filename="System-Kyron-Requisitos-Homologacion-Conatel.pdf">
      <LetterPage>
        <div className="flex flex-col min-h-full">
          <div className="flex items-start justify-between mb-6">
            <div className="w-20">
              {logoUrl && <img src={logoUrl} alt="Logo Kyron" className="w-full" />}
            </div>
            <div className="text-right">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Fecha</p>
              <p className="text-[11px] text-gray-700 font-medium">{new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-[#1e3a5f]/20 via-[#1e3a5f]/60 to-[#1e3a5f]/20 mb-6" />

          <div className="bg-[#1e3a5f]/5 border-l-4 border-[#1e3a5f] rounded-r-sm px-4 py-3 mb-5">
            <p className="text-[9px] text-[#1e3a5f]/60 uppercase tracking-widest font-bold mb-0.5">Documento Técnico</p>
            <p className="text-[12px] font-bold text-[#1e3a5f]">Requisitos para Homologación de Equipos ante CONATEL en Venezuela</p>
          </div>

          <p className="text-[11px] text-gray-600 leading-relaxed mb-5">
            El presente documento detalla los requisitos, organismos y procedimientos necesarios para la homologación de equipos de telecomunicaciones en Venezuela, incluyendo las competencias de <strong>CONATEL</strong>, <strong>SENCAMER</strong>, <strong>SENIAT</strong> y <strong>SAPI</strong>.
          </p>

          <Section title="1. CONATEL — Homologación de Equipos">
            <p className="mb-2">
              La <strong>Comisión Nacional de Telecomunicaciones (CONATEL)</strong> es el ente rector encargado de certificar que los equipos de telecomunicaciones cumplan con las normas técnicas venezolanas antes de su comercialización y uso en el país.
            </p>

            <SubSection title="Equipos sujetos a homologación">
              <ul>
                <li>Teléfonos móviles y smartphones</li>
                <li>Módems y routers (Wi-Fi, LTE, 5G)</li>
                <li>Equipos de radiofrecuencia (walkie-talkies, radios bidireccionales)</li>
                <li>Antenas y repetidores de señal</li>
                <li>Equipos de comunicación satelital</li>
                <li>Dispositivos IoT con módulo de comunicación inalámbrica</li>
                <li>Equipos de transmisión de datos por microondas</li>
              </ul>
            </SubSection>

            <SubSection title="Requisitos documentales ante CONATEL">
              <ul>
                <li><strong>Solicitud formal</strong> dirigida a CONATEL, indicando tipo de equipo, marca, modelo y características técnicas</li>
                <li><strong>Certificado de origen</strong> del equipo (factura comercial o declaración del fabricante)</li>
                <li><strong>Manual técnico</strong> del equipo en español (especificaciones, diagramas de bloque, manual de usuario)</li>
                <li><strong>Informe de pruebas técnicas</strong> emitido por laboratorio acreditado (ensayos de compatibilidad electromagnética, seguridad eléctrica, exposición a RF)</li>
                <li><strong>Declaración de conformidad</strong> firmada por el fabricante o representante legal</li>
                <li><strong>Certificado de garantía</strong> y servicio postventa en territorio nacional</li>
                <li><strong>Pago de tasa</strong> por concepto de homologación (monto variable según el tipo de equipo)</li>
              </ul>
            </SubSection>

            <SubSection title="Vigencia y renovación">
              <p>La homologación tiene una vigencia de <strong>3 años</strong> prorrogables. Transcurrido este período, el titular debe solicitar la renovación presentando una declaración jurada de que el equipo mantiene las mismas características técnicas.</p>
            </SubSection>
          </Section>
        </div>

        <div className="mt-4 pt-3 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
          <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">System Kyron — Documento Técnico</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="2. SENCAMER — Normalización y Calidad">
          <p className="mb-2">
            El <strong>Servicio Autónomo Nacional de Normalización, Calidad, Metrología y Reglamentos Técnicos (SENCAMER)</strong> es el organismo encargado de velar por el cumplimiento de las normas de calidad y seguridad de los productos comercializados en Venezuela.
          </p>

          <SubSection title="Requisitos ante SENCAMER para equipos de telecomunicaciones">
            <ul>
              <li><strong>Registro de producto</strong> ante SENCAMER, mediante el Sistema de Registro de Productos (SIRPRO)</li>
              <li><strong>Certificado de conformidad</strong> emitido por un organismo de certificación acreditado ante SENCAMER</li>
              <li><strong>Informe de ensayos</strong> de laboratorio que demuestre el cumplimiento de las normas COVENIN aplicables</li>
              <li><strong>Etiquetado</strong> del producto con la información técnica y de seguridad en español</li>
              <li><strong>Declaración de contenido nacional</strong> (si aplica)</li>
              <li><strong>Registro Único de Productos (RUP)</strong> para cada modelo de equipo</li>
            </ul>
          </SubSection>

          <SubSection title="Normas COVENIN aplicables">
            <ul>
              <li><strong>COVENIN 3837:</strong> Compatibilidad electromagnética (CEM) para equipos electrónicos</li>
              <li><strong>COVENIN 3840:</strong> Seguridad de equipos de tecnología de la información</li>
              <li><strong>COVENIN 3723:</strong> Límites de exposición a radiaciones no ionizantes</li>
              <li><strong>COVENIN 2743:</strong> Requisitos de etiquetado de productos eléctricos y electrónicos</li>
            </ul>
          </SubSection>

          <SubSection title="Proceso de certificación SENCAMER">
            <ol>
              <li>Solicitud de certificación ante organismo acreditado (ej. FONDONORMA, BVQI)</li>
              <li>Evaluación documental de especificaciones técnicas</li>
              <li>Ensayos de laboratorio según normas COVENIN aplicables</li>
              <li>Auditoría de planta de producción (si aplica)</li>
              <li>Emisión del certificado de conformidad (vigencia 1 a 3 años)</li>
              <li>Registro del producto en SIRPRO y obtención del RUP</li>
            </ol>
          </SubSection>
        </Section>

        <Section title="3. SENIAT — Tributación y Aduanas">
          <p className="mb-2">
            El <strong>Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)</strong> regula los aspectos fiscales y aduaneros para la importación y comercialización de equipos de telecomunicaciones en Venezuela.
          </p>

          <SubSection title="Requisitos ante SENIAT">
            <ul>
              <li><strong>Registro Único de Información Fiscal (RIF)</strong> del importador, actualizado y con actividad económica compatible</li>
              <li><strong>Registro de Importador</strong> ante el SENIAT, habilitado para la importación de equipos de telecomunicaciones</li>
              <li><strong>Declaración Única de Aduanas (DUA)</strong> para el despacho de los equipos en puerto o frontera</li>
              <li><strong>Pago de tributos aduaneros:</strong>
                <ul>
                  <li>Arancel de importación (según partida arancelaria del equipo)</li>
                  <li>IVA (16% sobre base imponible)</li>
                  <li>Tasa por servicios de aduana (0.5% - 1%)</li>
                </ul>
              </li>
              <li><strong>Certificado de no producción nacional</strong> emitido por el Ministerio de Industrias (si aplica para exención arancelaria)</li>
              <li><strong>Factura comercial</strong> y documento de transporte (conocimiento de embarque o guía aérea)</li>
              <li><strong>Póliza de seguro</strong> de la mercancía</li>
            </ul>
          </SubSection>

          <SubSection title="Partidas arancelarias comunes">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1e3a5f", color: "white" }}>
                    <th style={{ padding: "4px 8px", textAlign: "left", border: "1px solid #ccc" }}>Producto</th>
                    <th style={{ padding: "4px 8px", textAlign: "center", border: "1px solid #ccc" }}>Partida</th>
                    <th style={{ padding: "4px 8px", textAlign: "right", border: "1px solid #ccc" }}>Arancel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Teléfonos móviles</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>8517.12</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>0% - 5%</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Módems y routers</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>8517.62</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>5% - 15%</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Equipos de radiofrecuencia</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>8525.50</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>10% - 20%</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Antenas y repetidores</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>8517.71</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>5% - 10%</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Equipos satelitales</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>8529.10</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>0% - 5%</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <div className="mt-4 pt-3 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
          <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">System Kyron — Documento Técnico</p>
        </div>
      </LetterPage>

      <LetterPage>
        <Section title="4. SAPI — Propiedad Intelectual">
          <p className="mb-2">
            El <strong>Servicio Autónomo de Propiedad Intelectual (SAPI)</strong> protege los derechos de propiedad industrial e intelectual asociados a los equipos y marcas comercializados en Venezuela.
          </p>

          <SubSection title="Requisitos ante SAPI">
            <ul>
              <li><strong>Registro de marca</strong> del equipo o línea de productos ante SAPI (vigencia 15 años, renovable)</li>
              <li><strong>Búsqueda de antecedentes marcarios</strong> para verificar disponibilidad de la marca en la clase correspondiente</li>
              <li><strong>Solicitud de registro de nombre comercial</strong> si el equipo se comercializa bajo una denominación específica</li>
              <li><strong>Registro de lemas comerciales</strong> y frases publicitarias asociadas al producto</li>
              <li><strong>Depósito legal de manuales técnicos</strong> y documentación del equipo (protección de derechos de autor sobre el contenido técnico)</li>
              <li><strong>Contratos de licencia de uso de marca</strong> si el importador no es el titular de la marca original</li>
            </ul>
          </SubSection>

          <SubSection title="Clasificación de Niza aplicable">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1e3a5f", color: "white" }}>
                    <th style={{ padding: "4px 8px", textAlign: "left", border: "1px solid #ccc" }}>Clase</th>
                    <th style={{ padding: "4px 8px", textAlign: "left", border: "1px solid #ccc" }}>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>9</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Aparatos e instrumentos científicos, eléctricos, de comunicación</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>35</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Servicios de venta al por mayor y menor de equipos de telecomunicaciones</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>37</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Instalación, reparación y mantenimiento de equipos de telecomunicaciones</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>38</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Servicios de telecomunicaciones</td></tr>
                  <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>42</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Servicios de diseño y desarrollo de equipos de telecomunicaciones</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Proceso de registro marcario">
            <ol>
              <li>Búsqueda de antecedentes en la base de datos de SAPI (1-2 semanas)</li>
              <li>Publicación de la solicitud en el Boletín de Propiedad Industrial (30 días hábiles para oposiciones)</li>
              <li>Análisis de fondo por parte de SAPI (2-4 meses)</li>
              <li>Otorgamiento del registro y emisión del certificado</li>
              <li>Pago de tasas anuales para mantener la vigencia del registro</li>
            </ol>
          </SubSection>
        </Section>

        <Section title="5. Resumen del Proceso Integral">
          <div style={{ overflowX: "auto" }} className="mt-2">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px" }}>
              <thead>
                <tr style={{ backgroundColor: "#1e3a5f", color: "white" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left", border: "1px solid #ccc" }}>Organismo</th>
                  <th style={{ padding: "4px 8px", textAlign: "left", border: "1px solid #ccc" }}>Responsabilidad</th>
                  <th style={{ padding: "4px 8px", textAlign: "center", border: "1px solid #ccc" }}>Plazo</th>
                  <th style={{ padding: "4px 8px", textAlign: "right", border: "1px solid #ccc" }}>Costo Estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", fontWeight: 600 }}>CONATEL</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Homologación técnica del equipo</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>30 - 90 días</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>$200 - $1,000</td></tr>
                <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", fontWeight: 600 }}>SENCAMER</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Certificación de calidad y normas COVENIN</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>15 - 60 días</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>$300 - $1,500</td></tr>
                <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", fontWeight: 600 }}>SENIAT</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Registro de importador y pago de tributos</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>5 - 15 días</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>Variable (5-20% del valor FOB)</td></tr>
                <tr><td style={{ padding: "4px 8px", border: "1px solid #ccc", fontWeight: 600 }}>SAPI</td><td style={{ padding: "4px 8px", border: "1px solid #ccc" }}>Registro de marca y propiedad intelectual</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "center" }}>60 - 180 días</td><td style={{ padding: "4px 8px", border: "1px solid #ccc", textAlign: "right" }}>$100 - $500</td></tr>
                <tr style={{ backgroundColor: "#f0f4f8", fontWeight: "bold" }}><td style={{ padding: "5px 8px", border: "1px solid #ccc" }}>TOTAL</td><td style={{ padding: "5px 8px", border: "1px solid #ccc" }}>Proceso completo de homologación</td><td style={{ padding: "5px 8px", border: "1px solid #ccc", textAlign: "center" }}>3 - 12 meses</td><td style={{ padding: "5px 8px", border: "1px solid #ccc", textAlign: "right" }}>$1,000 - $5,000+</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <div className="mt-auto pt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-sm px-4 py-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-amber-800 mb-0.5">Nota importante</p>
                <p className="text-[9.5px] text-amber-700 leading-relaxed">
                  Los requisitos, plazos y costos aquí indicados son referenciales y pueden variar según el tipo de equipo, el volumen de importación y las disposiciones vigentes de cada organismo. Se recomienda consultar directamente con CONATEL, SENCAMER, SENIAT y SAPI para obtener información actualizada.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
          <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">System Kyron — Documento Técnico</p>
        </div>
      </LetterPage>
    </LetterWrapper>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-[13px] font-bold text-[#1e3a5f] uppercase tracking-tight border-b border-gray-200 pb-1 mb-2.5">{title}</h2>
      <div className="text-[11px] leading-[1.6] text-gray-700 space-y-2 [&_ul]:pl-4 [&_ul]:space-y-1 [&_li]:text-[11px] [&_ol]:pl-4 [&_ol]:space-y-1 [&_li]:text-[11px] [&_p]:text-[11px]">{children}</div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-2.5">
      <h3 className="text-[11.5px] font-bold text-gray-800 mb-1">{title}</h3>
      <div className="text-[11px] leading-[1.5] text-gray-700 space-y-1 [&_ul]:pl-4 [&_ul]:space-y-0.5 [&_li]:text-[11px] [&_p]:text-[11px]">{children}</div>
    </div>
  );
}

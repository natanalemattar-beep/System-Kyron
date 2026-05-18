'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText, ShieldCheck, FileDown, Leaf, Recycle, Globe, Banknote,
  Target, Megaphone, Milestone, Zap, Cpu, Printer, Loader2,
  Signal, BarChart3, Building2, TreePine, Sparkles, Layers, Wifi,
  Eye, Monitor,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/landing-header';
import Image from 'next/image';

type ViewMode = 'screen' | 'print';

function useLazySection(threshold = 0.05, rootMargin = '400px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

const LazySection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useLazySection();
  return (
    <div
      ref={ref}
      className={className}
      style={{ contentVisibility: isVisible ? 'visible' : 'auto', containIntrinsicSize: '0 500px' }}
    >
      {isVisible ? children : <div className="h-32" />}
    </div>
  );
};

const Section = ({ number, title, icon: Icon, children, className = '' }: any) => {
  const { ref, isVisible } = useLazySection(0.02, '300px');
  
  return (
    <section
      ref={ref}
      className={`rounded-2xl border border-white/10 bg-zinc-900/60 p-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
    >
      <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
        <Icon className="h-4 w-4" /> {number}. {title}
      </h3>
      {isVisible && children}
    </section>
  );
};

export default function ResumenEjecutivoPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('screen');

  const LETTER_WIDTH_PX = 816;

  const handleExportWord = () => {
    const styles = `
      @page { size: 8.5in 11in; margin: 0.75in; }
      body { font-family: 'Segoe UI', Arial, sans-serif; padding: 0; color: #0f172a; background: #fff; font-size: 11pt; line-height: 1.5; }
      .page-break { page-break-after: always; }
      .page-break-before { page-break-before: always; }
      .kyron-header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0A2472; padding-bottom: 20px; }
      h1 { color: #0A2472; font-size: 24pt; font-weight: 900; text-transform: uppercase; margin: 0 0 8px 0; }
      h2 { color: #0A2472; font-size: 14pt; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #0A2472; padding-bottom: 6px; margin: 28px 0 14px 0; }
      h3 { color: #00A86B; font-size: 11pt; font-weight: 800; text-transform: uppercase; }
      p { font-size: 10.5pt; line-height: 1.6; color: #334155; margin-bottom: 10px; }
      .subtitle { font-size: 11pt; color: #64748b; text-transform: uppercase; letter-spacing: 2px; }
      .team { font-size: 9pt; color: #94a3b8; }
      .footer { text-align: center; font-size: 8pt; color: #94a3b8; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; }
      .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
      .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
      .card-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
      .price-card { text-align: center; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
      .price { font-size: 16pt; font-weight: 900; color: #0A2472; }
      .label { font-size: 8pt; font-weight: 700; text-transform: uppercase; color: #64748b; }
      .highlight-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 12px; }
      .stat-box { text-align: center; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
      .stat-value { font-size: 18pt; font-weight: 900; color: #0A2472; }
    `;
    const el = document.getElementById('print-content');
    if (!el) return;
    const content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/gi, '');
    const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Resumen Ejecutivo Kyron</title><style>${styles}</style></head>
<body>
<div class="kyron-header">
<h1>SYSTEM KYRON</h1>
<p class="subtitle">Resumen Ejecutivo — Reto Inspira 2026</p>
<p class="team">Equipo: Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
</div>
${content}
<div class="footer">
<p>System Kyron — El ecosistema que protege tu línea, tu negocio y el ambiente</p>
<p>&copy; 2026 Emprendimiento Carlos Mattar &bull; infosystemkyron@gmail.com &bull; RIF: J-50832149-9</p>
</div>
</body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-word' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'RESUMEN_EJECUTIVO_KYRON.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  const handleExportPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const page1El = document.getElementById('print-page-1');
      const page2El = document.getElementById('print-page-2');
      if (!page1El || !page2El) return;

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [816, 1056] });

      for (const [idx, el] of [page1El, page2El].entries()) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:absolute;top:-9999px;left:0;width:816px;background:#fff;color:#0f172a;font-size:11pt;padding:72px 72px 60px 72px;font-family:"Segoe UI",Arial,sans-serif;line-height:1.5;';
        wrapper.innerHTML = el.innerHTML;

        const imgs = wrapper.querySelectorAll('img');
        imgs.forEach((img) => {
          img.style.width = '56px';
          img.style.height = '56px';
          img.style.objectFit = 'contain';
        });

        document.body.appendChild(wrapper);
        await new Promise((r) => setTimeout(r, 300));

        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          imageTimeout: 15000,
          windowWidth: 816,
        });

        document.body.removeChild(wrapper);
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (idx > 0) pdf.addPage([816, 1056], 'portrait');
        pdf.addImage(imgData, 'JPEG', 0, 0, 816, (canvas.height * 816) / canvas.width);
      }

      pdf.save('System_Kyron_Resumen_Ejecutivo.pdf');
    } catch (error) {
      console.error('PDF Error:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  const PrintSection = ({ number, title, icon: Icon, children, className = '' }: { number: string; title: string; icon: React.ComponentType<any>; children: React.ReactNode; className?: string }) => (
    <div className={`mb-5 ${className}`}>
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0A2472] border-b-2 border-[#0A2472] pb-2 mb-4">
        <Icon className="h-4 w-4" /> {number}. {title}
      </h2>
      {children}
    </div>
  );

  const PrintContent = () => (
    <div id="print-content">
      <div id="print-page-1">
      {/* Header con logo */}
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-200">
        <div className="relative h-14 w-14 shrink-0">
          <Image src="/images/logo-kyron-hq.png" alt="System Kyron" fill className="object-contain" unoptimized loading="lazy" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0A2472] m-0">SYSTEM KYRON</h1>
          <p className="text-xs text-gray-500 m-0">
            <span className="font-bold uppercase text-[#0A2472]">Eslogan:</span>{' '}
            <span className="italic text-gray-700">&ldquo;El ecosistema que protege tu línea, tu negocio y el ambiente&rdquo;</span>
          </p>
          <p className="text-xs text-gray-500 m-0">
            <span className="font-bold uppercase text-[#0A2472]">Equipo:</span>{' '}
            <span className="text-gray-700">Carlos Mattar · Sebastián Garrido · Marcos Sousa</span>
          </p>
        </div>
      </div>

      {/* 1 */}
      <PrintSection number="1" title="Información General" icon={FileText}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase text-gray-400 mb-0.5">Nombre del Proyecto</p>
            <p className="text-sm font-bold text-[#0f172a] m-0">System Kyron</p>
            <p className="text-xs text-gray-600 m-0">El ecosistema que protege tu línea, tu negocio y el ambiente.</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-gray-400 mb-0.5">Equipo</p>
            <p className="text-sm font-bold text-[#0f172a] m-0">Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
            <p className="text-xs text-gray-600 m-0">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
          </div>
        </div>
      </PrintSection>

      {/* 2 */}
      <PrintSection number="2" title="Definición del Problema" icon={Globe}>
        <p className="text-xs leading-relaxed text-gray-700 mb-4">
          El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong className="text-[#0f172a]">&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Signal className="h-4 w-4 text-red-500" />
              <span className="text-[9px] font-bold uppercase text-red-600">Telecomunicaciones</span>
            </div>
            <p className="text-xs font-bold text-[#0f172a] m-0">21M+ líneas vulnerables</p>
            <p className="mt-0.5 text-[10px] text-gray-500 m-0">Bloqueos y fraudes constantes.</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Recycle className="h-4 w-4 text-amber-500" />
              <span className="text-[9px] font-bold uppercase text-amber-600">Sostenibilidad</span>
            </div>
            <p className="text-xs font-bold text-[#0f172a] m-0">+50% residuos sin reciclar</p>
            <p className="mt-0.5 text-[10px] text-gray-500 m-0">Falta de incentivos y trazabilidad.</p>
          </div>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-orange-500" />
              <span className="text-[9px] font-bold uppercase text-orange-600">Carga Administrativa</span>
            </div>
            <p className="text-xs font-bold text-[#0f172a] m-0">134 hrs/año perdidas</p>
            <p className="mt-0.5 text-[10px] text-gray-500 m-0">Burocracia y riesgo de multas.</p>
          </div>
        </div>
      </PrintSection>

      {/* 3 */}
      <PrintSection number="3" title="Propuesta de Valor (La Solución)" icon={Zap}>
        <p className="text-xs text-gray-700 mb-4">
          System Kyron es un <strong className="text-[#0f172a]">ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong className="text-[#0f172a]">cuatro pilares</strong>:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <span className="text-[9px] font-bold uppercase text-indigo-600">Seguridad (Kyron Shield)</span>
            </div>
            <p className="text-xs text-gray-700 m-0">Reposición de equipos, defensa legal y <strong className="text-[#0f172a]">Modo Reserva</strong> — accede a la App sin saldo ni megas.</p>
          </div>
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-cyan-500" />
              <span className="text-[9px] font-bold uppercase text-cyan-600">Software (SaaS)</span>
            </div>
            <p className="text-xs text-gray-700 m-0">Plataforma modular de operación empresarial sin contratos anuales.</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Printer className="h-4 w-4 text-amber-500" />
              <span className="text-[9px] font-bold uppercase text-amber-600">Hardware (Fintech Fiscal)</span>
            </div>
            <p className="text-xs text-gray-700 m-0">Infraestructura de facturación de lujo, 100% homologada por el SENIAT.</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-emerald-500" />
              <span className="text-[9px] font-bold uppercase text-emerald-600">Impacto</span>
            </div>
            <p className="text-xs text-gray-700 m-0">Reciclaje conectado que genera rentabilidad.</p>
          </div>
        </div>
      </PrintSection>

      {/* 4 */}
      <PrintSection number="4" title="Mercado Objetivo" icon={Target}>
        <p className="text-xs leading-relaxed text-gray-700 mb-4">
          Nuestro cliente ideal está representado por el perfil de <strong className="text-[#0f172a]">&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
        </p>
        <div className="flex items-center gap-3 rounded-lg border border-[#0A2472]/30 bg-[#0A2472]/5 p-3">
          <Building2 className="h-5 w-5 shrink-0 text-[#0A2472]" />
          <div>
            <p className="text-xs font-bold text-[#0f172a] m-0">Tamaño de Mercado</p>
            <p className="text-xs text-gray-700 m-0"><strong className="text-[#0f172a]">500,000 PyMEs</strong> existentes en Venezuela.</p>
          </div>
        </div>
      </PrintSection>
      </div>

      <div id="print-page-2">
      {/* 5 */}
      <PrintSection number="5" title="Modelo de Negocio" icon={Banknote}>
        <p className="text-xs text-gray-700 mb-4">Generamos ingresos a través de <strong className="text-[#0f172a]">tres vías escalables</strong>:</p>

        <div className="mb-4">
          <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase text-cyan-600">
            <Layers className="h-3 w-3" /> Suscripciones SaaS
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Microempresa</p>
              <p className="text-base font-black text-[#0A2472] m-0">$19.99/mes</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Comercio</p>
              <p className="text-base font-black text-[#0f172a] m-0">$49.99/mes</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Corporativo</p>
              <p className="text-base font-black text-[#0f172a] m-0">$99.99/mes</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase text-emerald-600">
            <Wifi className="h-3 w-3" /> Conectividad 5G Global
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Personal</p>
              <p className="text-base font-black text-[#0f172a] m-0">Desde $6.99</p>
              <p className="text-[10px] text-gray-500 m-0">Prepago · Pospago · eSIM</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Empresarial</p>
              <p className="text-base font-black text-[#0f172a] m-0">Desde $9.99</p>
              <p className="text-[10px] text-gray-500 m-0">Prepago · Pospago · eSIM</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase text-amber-600">
            <Printer className="h-3 w-3" /> Hardware Fiscal Premium
          </p>
          <div className="mb-3 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Impresora Fiscal</p>
              <p className="text-base font-black text-[#0f172a] m-0">$849</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Caja Auto-Pago</p>
              <p className="text-base font-black text-[#0f172a] m-0">$1,394</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-500 m-0">Kit TPV Completo</p>
              <p className="text-base font-black text-[#0f172a] m-0">$2,499</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-xs text-gray-700 m-0"><strong className="text-[#0f172a]">Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
          </div>
        </div>
      </PrintSection>

      {/* 6 */}
      <PrintSection number="6" title="Estrategia de Marketing y Ventas" icon={Megaphone}>
        <p className="text-xs text-gray-700 mb-4">
          Nuestra captación (B2B) se fundamenta en demostrar el <strong className="text-[#0f172a]">retorno de inversión</strong> y operar a través de alianzas de clase mundial:
        </p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="mb-0.5 text-[9px] font-bold uppercase text-cyan-600 m-0">Coca-Cola FEMSA</p>
            <p className="text-[10px] text-gray-500 m-0">Canal comercial de reciclaje.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="mb-0.5 text-[9px] font-bold uppercase text-cyan-600 m-0">The Factory HKA</p>
            <p className="text-[10px] text-gray-500 m-0">Manufactura de hardware.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="mb-0.5 text-[9px] font-bold uppercase text-cyan-600 m-0">Ameru.AI</p>
            <p className="text-[10px] text-gray-500 m-0">Tecnología IoT.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
            <p className="mb-0.5 text-[9px] font-bold uppercase text-emerald-600 m-0">Ahorro Fiscal</p>
            <p className="text-lg font-black text-[#0A2472] m-0">$8,500</p>
            <p className="text-[10px] text-gray-500 m-0">anuales por cliente</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
            <p className="mb-0.5 text-[9px] font-bold uppercase text-emerald-600 m-0">Tiempo Recuperado</p>
            <p className="text-lg font-black text-[#0A2472] m-0">15 hrs</p>
            <p className="text-[10px] text-gray-500 m-0">mensuales en gestión</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
            <p className="mb-0.5 text-[9px] font-bold uppercase text-emerald-600 m-0">ROI Proyectado</p>
            <p className="text-lg font-black text-[#0A2472] m-0">187%</p>
            <p className="text-[10px] text-gray-500 m-0">retorno de inversión</p>
          </div>
        </div>
      </PrintSection>

      {/* 7 */}
      <PrintSection number="7" title="Impacto Social o Ambiental" icon={TreePine}>
        <p className="text-xs leading-relaxed text-gray-700 mb-4">
          En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong className="text-[#0f172a]">Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <Recycle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <div>
              <p className="mb-0.5 text-[9px] font-bold uppercase text-emerald-600 m-0">Eco-créditos</p>
              <p className="text-xs text-gray-700 m-0">Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <div>
              <p className="mb-0.5 text-[9px] font-bold uppercase text-emerald-600 m-0">Huella de Carbono</p>
              <p className="text-xs text-gray-700 m-0"><strong className="text-[#0f172a]">1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
            </div>
          </div>
        </div>
      </PrintSection>

      {/* 8 */}
      <PrintSection number="8" title="Estado Actual y Hoja de Ruta" icon={Milestone}>
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <Zap className="h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs text-gray-700 m-0">Fase <strong className="text-[#0f172a]">pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
            <p className="mb-1 text-xs font-bold uppercase text-[#0A2472] m-0">2026</p>
            <p className="text-xs font-bold text-[#0f172a] m-0">Despliegue nacional</p>
            <p className="text-[10px] text-gray-500 m-0">Venezuela</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
            <p className="mb-1 text-xs font-bold uppercase text-[#0A2472] m-0">2027</p>
            <p className="text-xs font-bold text-[#0f172a] m-0">Expansión regional</p>
            <p className="text-[10px] text-gray-500 m-0">Colombia y Panamá</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
            <p className="mb-1 text-xs font-bold uppercase text-[#0A2472] m-0">2028</p>
            <p className="text-xs font-bold text-[#0f172a] m-0">Consolidación</p>
            <p className="text-[10px] text-gray-500 m-0">México y EE. UU.</p>
          </div>
        </div>
      </PrintSection>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 m-0">
          Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
        </p>
        <p className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400 m-0">
          Emprendimiento Carlos Mattar &middot; RIF: J-50832149-9 &middot; infosystemkyron@gmail.com
        </p>
      </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030711]">
      <LandingHeader />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Encabezado con controles */}
        <div className="mb-8 flex items-start justify-between gap-6 max-md:flex-col">
          <div>
            <div className="mb-1 flex items-center gap-2 text-primary">
              <FileText className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Documentación Oficial Reto Inspira 2026</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Resumen <span className="text-primary">Ejecutivo</span>
            </h1>
          </div>
          <div className="flex shrink-0 gap-3">
            <div className="flex rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setViewMode('screen')}
                className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'screen' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                <Monitor className="h-3.5 w-3.5" /> Pantalla
              </button>
              <button
                onClick={() => setViewMode('print')}
                className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'print' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                <Eye className="h-3.5 w-3.5" /> Vista Carta
              </button>
            </div>
            <Button variant="outline" onClick={handleExportPDF} disabled={isExporting} className="h-11 rounded-xl border-primary/20 px-5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-primary/5">
              {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Printer className="mr-2 h-4 w-4" />}
              {isExporting ? 'Generando...' : 'PDF'}
            </Button>
            <Button onClick={handleExportWord} className="h-11 rounded-xl bg-primary px-5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90">
              <FileDown className="mr-2 h-4 w-4" /> Word
            </Button>
          </div>
        </div>

        {viewMode === 'screen' ? (
          /* VISTA PANTALLA (dark mode original) */
          <div className="space-y-5">
            <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
              <div className="relative h-16 w-16 shrink-0">
                <Image src="/images/logo-kyron-hq.png" alt="System Kyron" fill className="object-contain" unoptimized priority />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">SYSTEM KYRON</h2>
                <div className="mb-2 h-0.5 w-24 bg-gradient-to-r from-primary to-transparent" />
                <p className="text-sm text-gray-400">
                  <span className="font-bold uppercase tracking-wider text-primary">Eslogan:</span>{' '}
                  <span className="font-semibold italic text-white/90">&ldquo;El ecosistema que protege tu línea, tu negocio y el ambiente&rdquo;</span>
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold uppercase tracking-wider text-primary">Equipo:</span>{' '}
                  <span className="font-semibold text-white/90">Carlos Mattar · Sebastián Garrido · Marcos Sousa</span>
                </p>
              </div>
            </div>

            <Section number="1" title="Información General" icon={FileText}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase text-gray-500">Nombre del Proyecto</p>
                  <p className="text-base font-bold text-white">System Kyron</p>
                  <p className="text-sm text-gray-400">El ecosistema que protege tu línea, tu negocio y el ambiente.</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase text-gray-500">Equipo</p>
                  <p className="text-base font-bold text-white">Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
                  <p className="text-sm text-gray-400">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                </div>
              </div>
            </Section>

            <Section number="2" title="Definición del Problema" icon={Globe}>
              <p className="mb-5 text-sm leading-relaxed text-gray-300">
                El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong className="text-white">&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Signal className="h-5 w-5 text-red-400" />
                    <span className="text-xs font-bold uppercase text-red-400">Telecomunicaciones</span>
                  </div>
                  <p className="text-sm font-bold text-white">21M+ líneas vulnerables</p>
                  <p className="mt-1 text-xs text-gray-500">Bloqueos y fraudes constantes.</p>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Recycle className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase text-amber-400">Sostenibilidad</span>
                  </div>
                  <p className="text-sm font-bold text-white">+50% residuos sin reciclar</p>
                  <p className="mt-1 text-xs text-gray-500">Falta de incentivos y trazabilidad.</p>
                </div>
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-400" />
                    <span className="text-xs font-bold uppercase text-orange-400">Carga Administrativa</span>
                  </div>
                  <p className="text-sm font-bold text-white">134 hrs/año perdidas</p>
                  <p className="mt-1 text-xs text-gray-500">Burocracia y riesgo de multas.</p>
                </div>
              </div>
            </Section>

            <Section number="3" title="Propuesta de Valor (La Solución)" icon={Zap}>
              <p className="mb-5 text-sm text-gray-300">
                System Kyron es un <strong className="text-white">ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong className="text-white">cuatro pilares</strong>:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-indigo-400" />
                    <span className="text-xs font-bold uppercase text-indigo-400">Seguridad (Kyron Shield)</span>
                  </div>
                  <p className="text-sm text-gray-300">Reposición de equipos, defensa legal y <strong className="text-white">Modo Reserva</strong> — accede a la App sin saldo ni megas.</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-cyan-400" />
                    <span className="text-xs font-bold uppercase text-cyan-400">Software (SaaS)</span>
                  </div>
                  <p className="text-sm text-gray-300">Plataforma modular de operación empresarial sin contratos anuales.</p>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Printer className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase text-amber-400">Hardware (Fintech Fiscal)</span>
                  </div>
                  <p className="text-sm text-gray-300">Infraestructura de facturación de lujo, 100% homologada por el SENIAT.</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase text-emerald-400">Impacto</span>
                  </div>
                  <p className="text-sm text-gray-300">Reciclaje conectado que genera rentabilidad.</p>
                </div>
              </div>
            </Section>

            <Section number="4" title="Mercado Objetivo" icon={Target}>
              <p className="mb-5 text-sm leading-relaxed text-gray-300">
                Nuestro cliente ideal está representado por el perfil de <strong className="text-white">&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
              </p>
              <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/10 p-5">
                <Building2 className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-white">Tamaño de Mercado</p>
                  <p className="text-sm text-gray-300"><strong className="text-white">500,000 PyMEs</strong> existentes en Venezuela.</p>
                </div>
              </div>
            </Section>

            <Section number="5" title="Modelo de Negocio" icon={Banknote}>
              <p className="mb-6 text-sm text-gray-300">Generamos ingresos a través de <strong className="text-white">tres vías escalables</strong>:</p>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-cyan-400">
                  <Layers className="h-3 w-3" /> Suscripciones SaaS
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Microempresa</p>
                    <p className="text-xl font-black text-primary">$19.99/mes</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Comercio</p>
                    <p className="text-xl font-black text-white">$49.99/mes</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Corporativo</p>
                    <p className="text-xl font-black text-white">$99.99/mes</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-emerald-400">
                  <Wifi className="h-3 w-3" /> Conectividad 5G Global
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Personal</p>
                    <p className="text-xl font-black text-white">Desde $6.99</p>
                    <p className="text-xs text-gray-500">Prepago · Pospago · eSIM</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Empresarial</p>
                    <p className="text-xl font-black text-white">Desde $9.99</p>
                    <p className="text-xs text-gray-500">Prepago · Pospago · eSIM</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-amber-400">
                  <Printer className="h-3 w-3" /> Hardware Fiscal Premium
                </p>
                <div className="mb-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Impresora Fiscal</p>
                    <p className="text-xl font-black text-white">$849</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Caja Auto-Pago</p>
                    <p className="text-xl font-black text-white">$1,394</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Kit TPV Completo</p>
                    <p className="text-xl font-black text-white">$2,499</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                  <Sparkles className="h-5 w-5 shrink-0 text-amber-400" />
                  <p className="text-sm text-gray-300"><strong className="text-white">Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
                </div>
              </div>
            </Section>

            <Section number="6" title="Estrategia de Marketing y Ventas" icon={Megaphone}>
              <p className="mb-5 text-sm text-gray-300">
                Nuestra captación (B2B) se fundamenta en demostrar el <strong className="text-white">retorno de inversión</strong> y operar a través de alianzas de clase mundial:
              </p>
              <div className="mb-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-zinc-800/50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase text-cyan-400">Coca-Cola FEMSA</p>
                  <p className="text-xs text-gray-500">Canal comercial de reciclaje.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-800/50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase text-cyan-400">The Factory HKA</p>
                  <p className="text-xs text-gray-500">Manufactura de hardware.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-800/50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase text-cyan-400">Ameru.AI</p>
                  <p className="text-xs text-gray-500">Tecnología IoT.</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
                  <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Ahorro Fiscal</p>
                  <p className="text-2xl font-black text-white">$8,500</p>
                  <p className="text-xs text-gray-500">anuales por cliente</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
                  <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Tiempo Recuperado</p>
                  <p className="text-2xl font-black text-white">15 hrs</p>
                  <p className="text-xs text-gray-500">mensuales en gestión</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
                  <p className="mb-1 text-xs font-bold uppercase text-emerald-400">ROI Proyectado</p>
                  <p className="text-2xl font-black text-white">187%</p>
                  <p className="text-xs text-gray-500">retorno de inversión</p>
                </div>
              </div>
            </Section>

            <Section number="7" title="Impacto Social o Ambiental" icon={TreePine} accent="emerald">
              <p className="mb-5 text-sm leading-relaxed text-gray-300">
                En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong className="text-white">Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <Recycle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Eco-créditos</p>
                    <p className="text-sm text-gray-300">Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Huella de Carbono</p>
                    <p className="text-sm text-gray-300"><strong className="text-white">1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section number="8" title="Estado Actual y Hoja de Ruta" icon={Milestone}>
              <div className="mb-5 flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                <Zap className="h-5 w-5 shrink-0 text-amber-400" />
                <p className="text-sm text-gray-300">Fase <strong className="text-white">pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                  <p className="mb-2 text-sm font-bold uppercase text-primary">2026</p>
                  <p className="text-sm font-bold text-white">Despliegue nacional</p>
                  <p className="text-xs text-gray-500">Venezuela</p>
                </div>
                <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                  <p className="mb-2 text-sm font-bold uppercase text-primary">2027</p>
                  <p className="text-sm font-bold text-white">Expansión regional</p>
                  <p className="text-xs text-gray-500">Colombia y Panamá</p>
                </div>
                <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center">
                  <p className="mb-2 text-sm font-bold uppercase text-primary">2028</p>
                  <p className="text-sm font-bold text-white">Consolidación</p>
                  <p className="text-xs text-gray-500">México y EE. UU.</p>
                </div>
              </div>
            </Section>
          </div>
        ) : (
          /* VISTA CARTA (preview en pantalla) */
          <div className="flex justify-center">
            <div
              className="bg-white shadow-2xl"
              style={{
                width: `${LETTER_WIDTH_PX}px`,
                minHeight: '1056px',
                padding: '72px 72px 60px 72px',
                fontFamily: '"Segoe UI", Arial, sans-serif',
                fontSize: '11pt',
                lineHeight: '1.5',
                color: '#0f172a',
              }}
            >
              <PrintContent />
            </div>
          </div>
        )}

        {/* Footer general */}
        {viewMode === 'screen' && (
          <div className="mt-8 text-center">
            <div className="mx-auto mb-4 h-px w-48 bg-primary/30" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
              Emprendimiento Carlos Mattar &middot; RIF: J-50832149-9
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



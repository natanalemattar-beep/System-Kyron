'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText, ShieldCheck, FileDown, Leaf, Recycle, Globe, Banknote,
  Target, Megaphone, Milestone, Zap, Cpu, Printer, Loader2,
  Signal, BarChart3, Building2, TreePine, Sparkles, Layers, Wifi,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/landing-header';
import Image from 'next/image';

export default function ResumenEjecutivoPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportWord = () => {
    const styles = `
      body { font-family: 'Segoe UI', Arial, sans-serif; padding: 48px; color: #0f172a; background: #fff; }
      .kyron-header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0A2472; padding-bottom: 24px; }
      h1 { color: #0A2472; font-size: 28pt; font-weight: 900; text-transform: uppercase; }
      h2 { color: #0A2472; font-size: 16pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-top: 40px; }
      h3 { color: #00A86B; font-size: 12pt; font-weight: 800; text-transform: uppercase; }
      p { font-size: 11pt; line-height: 1.7; color: #334155; margin-bottom: 12px; }
      ul { margin-bottom: 20px; padding-left: 24px; }
      li { font-size: 11pt; color: #334155; margin-bottom: 8px; }
      .footer { text-align: center; font-size: 9pt; color: #94a3b8; margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    `;
    const el = document.getElementById('reporte-contenido');
    if (!el) return;
    const content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/gi, '');
    const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Resumen Ejecutivo Kyron</title><style>${styles}</style></head>
<body>
<div class="kyron-header">
<h1>SYSTEM KYRON</h1>
<p style="font-size: 12pt; color: #64748b; text-transform: uppercase; letter-spacing: 3px;">Resumen Ejecutivo — Reto Inspira 2026</p>
<p style="font-size: 10pt; color: #94a3b8;">Equipo: Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
</div>
${content}
<div class="footer">
<p>System Kyron — El ecosistema que protege tu linea, tu negocio y el ambiente</p>
<p>&copy; 2026 Emprendimiento Carlos Mattar &bull; infosystemkyron@gmail.com</p>
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

      const mainEl = document.getElementById('printable-content');
      if (!mainEl) return;

      const wrapper = document.createElement('div');
      wrapper.style.cssText =
        'position:fixed;top:0;left:0;width:816px;background:#fff;color:#000;font-size:14px;padding:48px;font-family:"Segoe UI",Arial,sans-serif;z-index:-1000;pointer-events:none';
      wrapper.innerHTML = mainEl.innerHTML;

      const imgs = wrapper.querySelectorAll('img');
      imgs.forEach((img) => {
        img.style.width = '64px';
        img.style.height = '64px';
        img.style.objectFit = 'contain';
      });

      const darkHeadings = wrapper.querySelectorAll('h2, h3');
      darkHeadings.forEach((h) => {
        if (h.tagName === 'H2') h.style.cssText += ';color:#0A2472;font-weight:900';
        if (h.tagName === 'H3') h.style.cssText += ';color:#0A2472;font-weight:800';
      });

      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
      });

      document.body.removeChild(wrapper);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 0.5;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        position = margin - (pageHeight - margin * 2 - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      pdf.save('System_Kyron_Resumen_Ejecutivo.pdf');
    } catch (error) {
      console.error('PDF Error:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  const Section = ({ number, title, icon: Icon, children, className = '', accent = 'primary' }: any) => (
    <section className={`rounded-2xl border border-white/10 bg-zinc-900/60 p-6 ${className}`}>
      <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
        <Icon className="h-4 w-4" /> {number}. {title}
      </h3>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-[#030711]">
      <LandingHeader />

      <div className="mx-auto w-full max-w-4xl px-6 py-28">
        {/* Encabezado */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-start justify-between gap-6 max-md:flex-col">
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
            <Button variant="outline" onClick={handleExportPDF} disabled={isExporting} className="h-11 rounded-xl border-primary/20 px-5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-primary/5">
              {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Printer className="mr-2 h-4 w-4" />}
              {isExporting ? 'Generando...' : 'PDF'}
            </Button>
            <Button onClick={handleExportWord} className="h-11 rounded-xl bg-primary px-5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90">
              <FileDown className="mr-2 h-4 w-4" /> Word
            </Button>
          </div>
        </motion.div>

        {/* CONTENIDO PRINCIPAL */}
        <div id="printable-content" className="space-y-5">
          {/* Header con logo */}
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
            <div className="relative h-16 w-16 shrink-0">
              <Image src="/images/logo-kyron-hq.png" alt="System Kyron" fill className="object-contain" unoptimized />
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

          {/* 1 */}
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

          {/* 2 */}
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

          {/* 3 */}
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

          {/* 4 */}
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

          {/* 5 */}
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

          {/* 6 */}
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

          {/* 7 */}
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

          {/* 8 */}
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

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="mx-auto mb-4 h-px w-48 bg-primary/30" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
            Emprendimiento Carlos Mattar &middot; RIF: J-50832149-9
          </p>
        </div>
      </div>
    </div>
  );
}

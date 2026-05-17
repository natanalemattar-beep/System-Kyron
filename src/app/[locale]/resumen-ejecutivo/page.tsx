'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ShieldCheck, FileDown, Leaf, Recycle, Globe, Banknote, Target, Megaphone, Milestone, Zap, Cpu, Printer, Loader2, Signal, BarChart3, Building2, TreePine, Sparkles, Layers, Wifi, Users, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/landing-header';
import Image from 'next/image';

export default function ResumenEjecutivoPage() {
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

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
      const element = pdfRef.current;
      if (!element) return;
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
      });
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

  return (
    <div className="min-h-screen bg-[#030711] selection:bg-primary/20">
      <LandingHeader />

      <div className="mx-auto w-full max-w-4xl px-6 py-28">
        {/* Encabezado con botones */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-start justify-between gap-6 print:hidden">
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

        {/* CARD PRINCIPAL — VERSIÓN WEB (dark) */}
        <div id="reporte-contenido" className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-8 shadow-2xl md:p-12">
          {/* Logo + Título */}
          <div className="mb-8 flex items-center gap-5 border-b border-white/10 pb-6">
            <div className="relative h-16 w-16 shrink-0">
              <Image src="/images/logo-kyron-hq.png" alt="System Kyron" fill className="object-contain" unoptimized />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">SYSTEM KYRON</h2>
              <div className="mb-2 mt-1 h-0.5 w-24 bg-gradient-to-r from-primary to-transparent" />
              <p className="text-xs text-gray-500">
                <span className="font-bold uppercase tracking-wider text-primary">Eslogan:</span>{' '}
                <span className="font-semibold italic text-white/80">&ldquo;El ecosistema que protege tu línea, tu negocio y el ambiente&rdquo;</span>
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-bold uppercase tracking-wider text-primary">Equipo:</span>{' '}
                <span className="font-semibold text-white/80">Carlos Mattar · Sebastián Garrido · Marcos Sousa</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* 1. Información General */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <FileText className="h-4 w-4" /> 1. Información General
              </h3>
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
            </section>

            {/* 2. Definición del Problema */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Globe className="h-4 w-4" /> 2. Definición del Problema
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong className="text-white">&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Signal className="h-4 w-4 text-red-400" />
                    <span className="text-xs font-bold uppercase text-red-400">Telecomunicaciones</span>
                  </div>
                  <p className="text-sm font-bold text-white">21M+ líneas vulnerables</p>
                  <p className="mt-1 text-xs text-gray-500">Bloqueos y fraudes constantes.</p>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase text-amber-400">Sostenibilidad</span>
                  </div>
                  <p className="text-sm font-bold text-white">+50% residuos sin reciclar</p>
                  <p className="mt-1 text-xs text-gray-500">Falta de incentivos y trazabilidad.</p>
                </div>
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-400" />
                    <span className="text-xs font-bold uppercase text-orange-400">Carga Administrativa</span>
                  </div>
                  <p className="text-sm font-bold text-white">134 hrs/año perdidas</p>
                  <p className="mt-1 text-xs text-gray-500">Burocracia y riesgo de multas.</p>
                </div>
              </div>
            </section>

            {/* 3. Propuesta de Valor */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Zap className="h-4 w-4" /> 3. Propuesta de Valor (La Solución)
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                System Kyron es un <strong className="text-white">ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong className="text-white">cuatro pilares</strong>:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold uppercase text-indigo-400">Seguridad (Kyron Shield)</span>
                  </div>
                  <p className="text-sm text-gray-400">Reposición de equipos, defensa legal y <strong className="text-white">Modo Reserva</strong> — accede a la App sin saldo ni megas.</p>
                </div>
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase text-cyan-400">Software (SaaS)</span>
                  </div>
                  <p className="text-sm text-gray-400">Plataforma modular de operación empresarial sin contratos anuales.</p>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Printer className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase text-amber-400">Hardware (Fintech Fiscal)</span>
                  </div>
                  <p className="text-sm text-gray-400">Infraestructura de facturación de lujo, 100% homologada por el SENIAT.</p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase text-emerald-400">Impacto</span>
                  </div>
                  <p className="text-sm text-gray-400">Reciclaje conectado que genera rentabilidad.</p>
                </div>
              </div>
            </section>

            {/* 4. Mercado Objetivo */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Target className="h-4 w-4" /> 4. Mercado Objetivo
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                Nuestro cliente ideal está representado por el perfil de <strong className="text-white">&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
              </p>
              <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Building2 className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-white">Tamaño de Mercado</p>
                  <p className="text-sm text-gray-400"><strong className="text-white">500,000 PyMEs</strong> existentes en Venezuela.</p>
                </div>
              </div>
            </section>

            {/* 5. Modelo de Negocio */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Banknote className="h-4 w-4" /> 5. Modelo de Negocio
              </h3>
              <p className="mb-6 text-sm text-gray-400">Generamos ingresos a través de <strong className="text-white">tres vías escalables</strong>:</p>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-cyan-400">
                  <Layers className="h-3 w-3" /> Suscripciones SaaS
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Microempresa</p>
                    <p className="text-lg font-bold text-primary">$19.99/mes</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Comercio</p>
                    <p className="text-lg font-bold text-white">$49.99/mes</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Corporativo</p>
                    <p className="text-lg font-bold text-white">$99.99/mes</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-emerald-400">
                  <Wifi className="h-3 w-3" /> Conectividad 5G Global
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Personal</p>
                    <p className="text-lg font-bold text-white">Desde $6.99</p>
                    <p className="text-xs text-gray-500">Prepago · Pospago · eSIM</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Empresarial</p>
                    <p className="text-lg font-bold text-white">Desde $9.99</p>
                    <p className="text-xs text-gray-500">Prepago · Pospago · eSIM</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-amber-400">
                  <Printer className="h-3 w-3" /> Hardware Fiscal Premium
                </p>
                <div className="mb-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Impresora Fiscal</p>
                    <p className="text-lg font-bold text-white">$849</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Caja Auto-Pago</p>
                    <p className="text-lg font-bold text-white">$1,394</p>
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4 text-center">
                    <p className="mb-1 text-xs font-bold uppercase text-gray-500">Kit TPV Completo</p>
                    <p className="text-lg font-bold text-white">$2,499</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                  <Sparkles className="h-5 w-5 shrink-0 text-amber-400" />
                  <p className="text-sm text-gray-400"><strong className="text-white">Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
                </div>
              </div>
            </section>

            {/* 6. Estrategia de Marketing */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Megaphone className="h-4 w-4" /> 6. Estrategia de Marketing y Ventas
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                Nuestra captación (B2B) se fundamenta en demostrar el <strong className="text-white">retorno de inversión</strong> y operar a través de alianzas de clase mundial:
              </p>
              <div className="mb-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="mb-1 text-xs font-bold uppercase text-cyan-400">Coca-Cola FEMSA</p>
                  <p className="text-xs text-gray-500">Canal comercial de reciclaje.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="mb-1 text-xs font-bold uppercase text-cyan-400">The Factory HKA</p>
                  <p className="text-xs text-gray-500">Manufactura de hardware.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="mb-1 text-xs font-bold uppercase text-cyan-400">Ameru.AI</p>
                  <p className="text-xs text-gray-500">Tecnología IoT.</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                  <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Ahorro Fiscal</p>
                  <p className="text-2xl font-black text-white">$8,500</p>
                  <p className="text-xs text-gray-500">anuales por cliente</p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                  <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Tiempo Recuperado</p>
                  <p className="text-2xl font-black text-white">15 hrs</p>
                  <p className="text-xs text-gray-500">mensuales en gestión</p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                  <p className="mb-1 text-xs font-bold uppercase text-emerald-400">ROI Proyectado</p>
                  <p className="text-2xl font-black text-white">187%</p>
                  <p className="text-xs text-gray-500">retorno de inversión</p>
                </div>
              </div>
            </section>

            {/* 7. Impacto Social o Ambiental */}
            <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">
                <TreePine className="h-4 w-4" /> 7. Impacto Social o Ambiental
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong className="text-white">Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <Recycle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Eco-créditos</p>
                    <p className="text-sm text-gray-400">Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-emerald-400">Huella de Carbono</p>
                    <p className="text-sm text-gray-400"><strong className="text-white">1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Estado Actual y Hoja de Ruta */}
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <Milestone className="h-4 w-4" /> 8. Estado Actual y Hoja de Ruta
              </h3>
              <div className="mb-4 flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                <Zap className="h-5 w-5 shrink-0 text-amber-400" />
                <p className="text-sm text-gray-400">Fase <strong className="text-white">pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <p className="mb-2 text-sm font-bold uppercase text-primary">2026</p>
                  <p className="text-sm font-bold text-white">Despliegue nacional</p>
                  <p className="text-xs text-gray-500">Venezuela</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <p className="mb-2 text-sm font-bold uppercase text-primary">2027</p>
                  <p className="text-sm font-bold text-white">Expansión regional</p>
                  <p className="text-xs text-gray-500">Colombia y Panamá</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <p className="mb-2 text-sm font-bold uppercase text-primary">2028</p>
                  <p className="text-sm font-bold text-white">Consolidación</p>
                  <p className="text-xs text-gray-500">México y EE. UU.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <div className="mx-auto mb-3 h-px w-48 bg-primary/20" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
              Emprendimiento Carlos Mattar &middot; RIF: J-50832149-9
            </p>
          </div>
        </div>

        {/* VERSIÓN PDF — blanco, fuera de pantalla (left: -9999px) */}
        <div
          ref={pdfRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '8.5in',
            background: '#ffffff',
            color: '#000000',
            fontFamily: '"Segoe UI", Arial, sans-serif',
          }}
        >
          {/* PDF: Logo + Título */}
          <div className="flex items-center gap-5 border-b border-gray-300 pb-6 mb-8" style={{ padding: '0.75in 0.75in 0 0.75in' }}>
            <img src="/images/logo-kyron-hq.png" alt="System Kyron" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0A2472', margin: 0 }}>SYSTEM KYRON</h2>
              <div style={{ height: '2px', width: '96px', background: '#0A2472', margin: '4px 0' }} />
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0' }}>
                <strong>Eslogan:</strong> <em>&ldquo;El ecosistema que protege tu línea, tu negocio y el ambiente&rdquo;</em>
              </p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0' }}>
                <strong>Equipo:</strong> Carlos Mattar · Sebastián Garrido · Marcos Sousa
              </p>
            </div>
          </div>

          <div style={{ padding: '0 0.75in' }}>
            {/* PDF section 1 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>1. Información General</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ verticalAlign: 'top', width: '50%', padding: '4px 0' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 4px 0' }}>Nombre del Proyecto</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>System Kyron</p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>El ecosistema que protege tu línea, tu negocio y el ambiente.</p>
                  </td>
                  <td style={{ verticalAlign: 'top', width: '50%', padding: '4px 0' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 4px 0' }}>Equipo</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                  </td>
                </tr>
              </table>
            </section>

            {/* PDF section 2 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>2. Definición del Problema</h3>
              <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#475569', margin: '0 0 16px 0' }}>
                El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong>&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #fecaca', borderRadius: '12px', background: '#fef2f2' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#dc2626', margin: '0 0 8px 0' }}>Telecomunicaciones</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>21M+ líneas vulnerables</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Bloqueos y fraudes constantes.</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #fde68a', borderRadius: '12px', background: '#fffbeb' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#d97706', margin: '0 0 8px 0' }}>Sostenibilidad</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>+50% residuos sin reciclar</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Falta de incentivos y trazabilidad.</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #fed7aa', borderRadius: '12px', background: '#fff7ed' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#ea580c', margin: '0 0 8px 0' }}>Carga Administrativa</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>134 hrs/año perdidas</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Burocracia y riesgo de multas.</p>
                    </div>
                  </td>
                </tr>
              </table>
            </section>

            {/* PDF section 3 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>3. Propuesta de Valor (La Solución)</h3>
              <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 16px 0' }}>
                System Kyron es un <strong>ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong>cuatro pilares</strong>:
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #c7d2fe', borderRadius: '12px', background: '#eef2ff' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#6366f1', margin: '0 0 8px 0' }}>Seguridad (Kyron Shield)</p>
                      <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Reposición de equipos, defensa legal y <strong>Modo Reserva</strong> — accede a la App sin saldo ni megas.</p>
                    </div>
                  </td>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #a5f3fc', borderRadius: '12px', background: '#ecfeff' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#06b6d4', margin: '0 0 8px 0' }}>Software (SaaS)</p>
                      <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Plataforma modular de operación empresarial sin contratos anuales.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #fde68a', borderRadius: '12px', background: '#fffbeb' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#d97706', margin: '0 0 8px 0' }}>Hardware (Fintech Fiscal)</p>
                      <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Infraestructura de facturación de lujo, 100% homologada por el SENIAT.</p>
                    </div>
                  </td>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #a7f3d0', borderRadius: '12px', background: '#ecfdf5' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 8px 0' }}>Impacto</p>
                      <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Reciclaje conectado que genera rentabilidad.</p>
                    </div>
                  </td>
                </tr>
              </table>
            </section>

            {/* PDF section 4 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>4. Mercado Objetivo</h3>
              <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#475569', margin: '0 0 16px 0' }}>
                Nuestro cliente ideal está representado por el perfil de <strong>&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #0A2472', borderRadius: '12px', background: '#f0f4ff' }}>
                <p style={{ fontSize: '12px', margin: 0 }}><strong>Tamaño de Mercado:</strong> <strong style={{ color: '#0A2472' }}>500,000 PyMEs</strong> existentes en Venezuela.</p>
              </div>
            </section>

            {/* PDF section 5 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>5. Modelo de Negocio</h3>
              <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 16px 0' }}>Generamos ingresos a través de <strong>tres vías escalables</strong>:</p>

              <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0891b2', margin: '0 0 8px 0' }}>▸ Suscripciones SaaS</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tr>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Microempresa</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0A2472', margin: 0 }}>$19.99/mes</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Comercio</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>$49.99/mes</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Corporativo</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>$99.99/mes</p>
                    </div>
                  </td>
                </tr>
              </table>

              <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 8px 0' }}>▸ Conectividad 5G Global</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tr>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Personal</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Desde $6.99</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>Prepago · Pospago · eSIM</p>
                    </div>
                  </td>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Empresarial</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Desde $9.99</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>Prepago · Pospago · eSIM</p>
                    </div>
                  </td>
                </tr>
              </table>

              <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#d97706', margin: '0 0 8px 0' }}>▸ Hardware Fiscal Premium</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
                <tr>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Impresora Fiscal</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>$849</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Caja Auto-Pago</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>$1,394</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 8px 0' }}>Kit TPV Completo</p>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>$2,499</p>
                    </div>
                  </td>
                </tr>
              </table>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #fde68a', borderRadius: '8px', background: '#fffbeb' }}>
                <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}><strong>Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
              </div>
            </section>

            {/* PDF section 6 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>6. Estrategia de Marketing y Ventas</h3>
              <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 16px 0' }}>
                Nuestra captación (B2B) se fundamenta en demostrar el <strong>retorno de inversión</strong> y operar a través de alianzas de clase mundial:
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tr>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff' }}>
                      <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0891b2', margin: '0 0 4px 0' }}>Coca-Cola FEMSA</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Canal comercial de reciclaje.</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff' }}>
                      <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0891b2', margin: '0 0 4px 0' }}>The Factory HKA</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Manufactura de hardware.</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff' }}>
                      <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0891b2', margin: '0 0 4px 0' }}>Ameru.AI</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Tecnología IoT.</p>
                    </div>
                  </td>
                </tr>
              </table>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #a7f3d0', borderRadius: '8px', background: '#ecfdf5', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 8px 0' }}>Ahorro Fiscal</p>
                      <p style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>$8,500</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>anuales por cliente</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #a7f3d0', borderRadius: '8px', background: '#ecfdf5', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 8px 0' }}>Tiempo Recuperado</p>
                      <p style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>15 hrs</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>mensuales en gestión</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '12px', border: '1px solid #a7f3d0', borderRadius: '8px', background: '#ecfdf5', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 8px 0' }}>ROI Proyectado</p>
                      <p style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>187%</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>retorno de inversión</p>
                    </div>
                  </td>
                </tr>
              </table>
            </section>

            {/* PDF section 7 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #a7f3d0', borderRadius: '12px', background: '#f0fdf4' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#059669', margin: '0 0 16px 0' }}>7. Impacto Social o Ambiental</h3>
              <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#475569', margin: '0 0 16px 0' }}>
                En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong>Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', gap: '12px', padding: '16px', border: '1px solid #a7f3d0', borderRadius: '12px', background: '#ffffff' }}>
                      <div>
                        <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 4px 0' }}>Eco-créditos</p>
                        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ width: '50%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', gap: '12px', padding: '16px', border: '1px solid #a7f3d0', borderRadius: '12px', background: '#ffffff' }}>
                      <div>
                        <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#059669', margin: '0 0 4px 0' }}>Huella de Carbono</p>
                        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}><strong>1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </section>

            {/* PDF section 8 */}
            <section style={{ marginBottom: '24px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0A2472', margin: '0 0 16px 0' }}>8. Estado Actual y Hoja de Ruta</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #fde68a', borderRadius: '8px', background: '#fffbeb', marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Fase <strong>pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0A2472', margin: '0 0 8px 0' }}>2026</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Despliegue nacional</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>Venezuela</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0A2472', margin: '0 0 8px 0' }}>2027</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Expansión regional</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>Colombia y Panamá</p>
                    </div>
                  </td>
                  <td style={{ width: '33%', padding: '4px', verticalAlign: 'top' }}>
                    <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0A2472', margin: '0 0 8px 0' }}>2028</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Consolidación</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>México y EE. UU.</p>
                    </div>
                  </td>
                </tr>
              </table>
            </section>
          </div>

          {/* PDF Footer */}
          <div style={{ padding: '0.75in', textAlign: 'center' }}>
            <div style={{ width: '192px', height: '1px', background: '#cbd5e1', margin: '0 auto 12px auto' }} />
            <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', margin: '0 0 4px 0' }}>
              Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
            </p>
            <p style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#cbd5e1', margin: 0 }}>
              Emprendimiento Carlos Mattar &middot; RIF: J-50832149-9
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

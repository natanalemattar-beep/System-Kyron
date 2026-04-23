"use client";

import React from 'react';
import { 
    Shield, 
    Zap, 
    Globe, 
    Users, 
    Calculator, 
    Smartphone, 
    Gavel, 
    Building2, 
    Target, 
    TrendingUp, 
    CheckCircle2, 
    ArrowRight,
    Lock,
    Cpu,
    Wifi,
    BarChart3,
    ShoppingCart,
    Recycle,
    BookOpen,
    ScanLine,
    Activity,
    Handshake,
    ShieldCheck,
    Coins,
    BarChart4,
    Scale,
    Rocket,
    Download,
    FileText,
    Printer as PrinterIcon,
    Image as ImageIcon
} from 'lucide-react';
import { Logo } from '@/components/logo';

export function FolletoView() {
    const [baseUrl, setBaseUrl] = React.useState('https://system-kyron.vercel.app');
    const [isExporting, setIsExporting] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
        }
    }, []);

    const QR_PRINCIPAL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${baseUrl}&color=03050a&bgcolor=ffffff&margin=4`;
    const QR_FEEDBACK = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${baseUrl}/es/feedback&color=03050a&bgcolor=ffffff&margin=4`;
    
    const handleDownloadPDF = async () => {
        if (isExporting) return;
        setIsExporting(true);
        const node = document.getElementById('folleto-content');
        if (!node) { setIsExporting(false); return; }

        const toolbar = document.getElementById('folleto-toolbar');
        if (toolbar) toolbar.style.display = 'none';

        // Remover el gap para evitar que el PDF se salga de la hoja por el espacio de diseño web
        const originalGap = node.style.gap;
        node.style.gap = '0px';

        try {
            // @ts-ignore
            const html2pdf = (await import('html2pdf.js')).default;
            
            const opt = {
                margin: 0,
                filename: 'System-Kyron-Folleto-General.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#03050a',
                    allowTaint: false
                },
                jsPDF: { 
                    unit: 'in', 
                    format: [11, 8.5], 
                    orientation: 'landscape' 
                },
                pagebreak: { mode: ['css', 'legacy'] }
            };

            await html2pdf().from(node).set(opt).save();
        } catch (error) {
            console.error('Error descargando PDF:', error);
        } finally {
            if (toolbar) toolbar.style.display = 'flex';
            node.style.gap = originalGap; // Restaurar el espacio web
            setIsExporting(false);
        }
    };

    const handleDownloadPNG = async (id: string, name: string) => {
        if (isExporting) return;
        setIsExporting(true);
        const node = document.getElementById(id);
        if (!node) { setIsExporting(false); return; }

        try {
            const h2c = (await import('html2canvas')).default;
            const canvas = await h2c(node, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#03050a',
                logging: false,
                allowTaint: false
            });
            
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            
            const link = document.createElement('a');
            link.download = `System-Kyron-Folleto-${name}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generando PNG:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleDownloadWord = async () => {
        if (isExporting) return;
        setIsExporting(true);
        const frontal = document.getElementById('cara-frontal');
        const interior = document.getElementById('cara-interior');
        
        if (!frontal || !interior) { setIsExporting(false); return; }

        try {
            const h2c = (await import('html2canvas')).default;
            
            // Reducir la escala a 1 para evitar bloqueos de memoria en la pestaña del navegador
            const canvasFrontal = await h2c(frontal, { scale: 1.0, useCORS: true, backgroundColor: '#03050a', allowTaint: false });
            const canvasInterior = await h2c(interior, { scale: 1.0, useCORS: true, backgroundColor: '#03050a', allowTaint: false });
            
            const imgFrontal = canvasFrontal.toDataURL('image/jpeg', 0.80);
            const imgInterior = canvasInterior.toDataURL('image/jpeg', 0.80);

            const panels = document.querySelectorAll('.print\\:break-after-page, .print\\:shadow-none');
            let textContent = "";
            panels.forEach(p => {
                textContent += (p as HTMLElement).innerText + "\n\n";
            });

            const html = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>System Kyron Brochure</title>
                <style>
                    @page {
                        size: 11in 8.5in;
                        margin: 0.2in;
                        mso-page-orientation: landscape;
                    }
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; }
                    .img-container { text-align: center; width: 100%; margin: 0; padding: 0; }
                    img { width: 10.5in; height: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
                    .text-content { white-space: pre-wrap; font-size: 11pt; color: #333; margin-top: 40px; padding: 0.5in; }
                </style>
                </head>
                <body>
                    <div class='img-container'>
                        <img src='${imgFrontal}' />
                    </div>
                    <br clear=all style='mso-special-character:line-break;page-break-before:always'>
                    <div class='img-container'>
                        <img src='${imgInterior}' />
                    </div>
                    <br clear=all style='mso-special-character:line-break;page-break-before:always'>
                    <div class='text-content'>
                        <hr>
                        <h2>CONTENIDO DEL FOLLETO</h2>
                        ${textContent.replace(/\n/g, '<br>')}
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'System-Kyron-General.doc';
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generando Súper Word:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div id="folleto-content" className="w-full bg-slate-900 p-8 flex flex-col items-center gap-12 overflow-x-auto print:bg-white print:p-0 print:gap-0 font-[family-name:var(--font-outfit)] relative">
            
            {/* Toolbar Flotante (Oculta en impresión) */}
            <div id="folleto-toolbar" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex gap-3 bg-black/90 backdrop-blur-3xl px-6 py-4 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] print:hidden transition-opacity duration-300">
                <button 
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-600/50 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-cyan-500/20"
                >
                    <PrinterIcon className={`h-4 w-4 ${isExporting ? 'animate-spin' : ''}`} /> {isExporting ? 'Procesando...' : 'PDF Full'}
                </button>
                <div className={`flex gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 ${isExporting ? 'opacity-50 pointer-events-none' : ''}`}>
                    <button 
                        onClick={() => handleDownloadPNG('cara-frontal', 'Frontal')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-600/20 text-emerald-400 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                    >
                        <ImageIcon className="h-3.5 w-3.5" /> Cara 1
                    </button>
                    <button 
                        onClick={() => handleDownloadPNG('cara-interior', 'Interior')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-600/20 text-emerald-400 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                    >
                        <ImageIcon className="h-3.5 w-3.5" /> Cara 2
                    </button>
                </div>
                <button 
                    onClick={handleDownloadWord}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600/10 hover:bg-blue-600/20 disabled:bg-blue-900/10 text-blue-400 hover:text-blue-300 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:scale-105 active:scale-95"
                >
                    <FileText className={`h-4 w-4 ${isExporting ? 'animate-pulse text-blue-500' : ''}`} /> {isExporting ? 'Generando...' : 'Word Doc'}
                </button>
            </div>

            {/* ═ CARA 1: EXTERIOR (Paneles: Propósito, Beneficios, Portada) ═ */}
            <div id="cara-frontal" style={{ pageBreakAfter: 'always' }} className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(14,165,233,0.12),transparent)] pointer-events-none" />

                {/* P1: PROPÓSITO & RENTABILIDAD (Solapa Izquierda) */}
                <div className="w-[3.62in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#020409]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                            <Coins className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-400/80">Todo en Uno</span>
                    </div>
                    <h3 className="text-[22px] font-black text-white leading-tight tracking-tighter mb-5">Crecer nunca fue tan<br/><span className="text-emerald-500">fácil y accesible.</span></h3>
                    
                    <div className="space-y-4">
                        <p className="text-[10px] text-slate-300 leading-relaxed text-justify">
                            Olvídate de pagar por múltiples programas o pelear con herramientas complicadas. System Kyron agrupa tus ventas, inventario y cuentas en una sola plataforma muy fácil de usar, ahorrándote tiempo y dinero desde el primer día.
                        </p>
                        <p className="text-[10px] text-slate-400 leading-relaxed text-justify">
                            Nuestra misión es que la tecnología trabaje para ti. Automatiza el trabajo aburrido para que puedas dedicarte a atender a tus clientes y hacer crecer tu negocio.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                            <h5 className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <BarChart4 className="h-3 w-3" /> Beneficios Inmediatos
                            </h5>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-[9px] text-slate-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Vende más rápido y controla tu caja.
                                </li>
                                <li className="flex items-center gap-2 text-[9px] text-slate-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Inventario siempre actualizado.
                                </li>
                                <li className="flex items-center gap-2 text-[9px] text-slate-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Facturación sin estrés ni multas.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                            </div>
                            <p className="text-[7px] text-slate-500 uppercase font-black tracking-widest leading-tight">Adaptable a tu tamaño:<br/>Perfecto para tu negocio de hoy y mañana.</p>
                         </div>
                    </div>
                </div>

                {/* P2: BLINDAJE & RIESGO CERO -> TRANQUILIDAD (Contraportada) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#03050a] overflow-hidden">
                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    
                    <div className="mb-6 relative z-10">
                        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400/80 mb-2">Tranquilidad Total</p>
                        <h3 className="text-[18px] font-black text-white uppercase tracking-tighter">Soporte y <span className="text-cyan-400">Seguridad</span></h3>
                    </div>

                    <div className="space-y-4 mb-6 relative z-10">
                        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Scale className="h-4 w-4 text-cyan-400" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Cumplimiento Legal Sencillo</h4>
                            </div>
                            <p className="text-[8.5px] text-slate-400 leading-relaxed">
                                El sistema te guía para cumplir con todas las normativas sin necesidad de ser un experto en leyes. Haz tus cuentas con paz mental.
                            </p>
                        </div>

                        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Tus Datos Protegidos</h4>
                            </div>
                            <p className="text-[8.5px] text-slate-400 leading-relaxed">
                                Respaldamos tu información automáticamente. Así se vaya el internet o se dañe una PC, nunca perderás tus datos de ventas.
                            </p>
                        </div>
                    </div>

                    {/* NUEVA SECCIÓN PARA RELLENAR ESPACIO (Infraestructura de Misión Crítica -> Soporte Amigable) */}
                    <div className="flex-1 flex flex-col justify-center relative z-10 py-4">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Zap className="h-4 w-4 text-cyan-400/80" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Rápido y Efectivo</h5>
                                    <p className="text-[7.5px] text-slate-500 leading-tight">Un sistema ligero que no necesita computadoras súper potentes para funcionar.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Users className="h-4 w-4 text-cyan-400/80" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Acompañamiento Real</h5>
                                    <p className="text-[7.5px] text-slate-500 leading-tight">No estás solo. Nuestro equipo te enseña a usarlo paso a paso hasta que domines todo.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Activity className="h-4 w-4 text-cyan-400/80" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Actualizaciones Gratis</h5>
                                    <p className="text-[7.5px] text-slate-500 leading-tight">Siempre tendrás la mejor versión de la plataforma sin tener que pagar reinstalaciones.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <p className="text-[7px] text-slate-500 uppercase font-black tracking-widest">Confianza Total</p>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 opacity-60">
                             <div className="text-center"><Shield className="h-6 w-6 mx-auto mb-1 text-cyan-400" /><p className="text-[6px] font-bold tracking-tighter">PROTEGIDO</p></div>
                             <div className="text-center"><CheckCircle2 className="h-6 w-6 mx-auto mb-1 text-cyan-400" /><p className="text-[6px] font-bold tracking-tighter">FÁCIL DE USAR</p></div>
                             <div className="text-center"><Zap className="h-6 w-6 mx-auto mb-1 text-cyan-400" /><p className="text-[6px] font-bold tracking-tighter">SÚPER RÁPIDO</p></div>
                        </div>
                    </div>
                </div>

                {/* P3: PORTADA DE IMPACTO (Derecha) */}
                <div className="w-[3.69in] p-8 flex flex-col relative z-10 overflow-hidden bg-[#050816]">
                    <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <img src="/images/logo-black.png" alt="Kyron" className="h-16 w-16 drop-shadow-[0_0_30px_rgba(34,211,238,0.7)] object-contain" crossOrigin="anonymous" />
                            <div className="flex flex-col items-end">
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-[7px] font-black uppercase tracking-widest text-cyan-400 mb-1">Para Todo Negocio</span>
                                <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase">Ecosistema Simple</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 mb-4 flex items-center gap-3">
                                <span className="h-px w-10 bg-slate-600 inline-block" /> Tecnología Accesible
                            </p>
                            <h1 className="text-[54px] font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">System<br/><span className="text-emerald-400">Kyron.</span></h1>
                            <p className="text-[12px] text-slate-300 leading-relaxed border-l-4 border-cyan-500 pl-5 font-medium">
                                El aliado digital que simplifica el trabajo de los emprendedores y comerciantes en Venezuela.
                            </p>
                        </div>

                        {/* CALL TO ACTION DUAL QR REDISEÑADO */}
                        <div className="mt-auto bg-white/5 backdrop-blur-2xl rounded-[3.5rem] border border-white/10 p-8 flex flex-col items-center shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40 mb-7">DESCUBRE MÁS AQUÍ</p>
                            
                            <div className="flex gap-10 w-full justify-center mb-7">
                                <div className="flex flex-col items-center gap-3 group">
                                    <div className="relative p-1 bg-white rounded-[2rem] shadow-[0_0_40px_rgba(34,211,238,0.2)] group-hover:scale-105 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 border-[3px] border-cyan-500/20 rounded-[2rem] animate-pulse" />
                                        <img src={QR_PRINCIPAL} alt="Portal" width={95} height={95} className="rounded-[1.8rem] relative z-10" crossOrigin="anonymous" />
                                    </div>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors">Ver Plataforma</p>
                                </div>
                                
                                <div className="flex flex-col items-center gap-3 group">
                                    <div className="relative p-1 bg-white rounded-[2rem] shadow-[0_0_40px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 border-[3px] border-emerald-500/20 rounded-[2rem] animate-pulse" />
                                        <img src={QR_FEEDBACK} alt="Encuesta" width={95} height={95} className="rounded-[1.8rem] relative z-10" crossOrigin="anonymous" />
                                    </div>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300 transition-colors">Danos tu opinión</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 group hover:border-cyan-500/30 transition-colors">
                                <ScanLine className="h-4 w-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors animate-pulse" />
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/80 group-hover:text-white">Escanea con la cámara</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center px-4">
                            <p className="text-[8px] text-slate-500 tracking-widest font-black uppercase">system-kyron.vercel.app</p>
                            <div className="flex gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═ CARA 2: INTERIOR (Paneles: Unidades de Negocio, Garantía, Escalabilidad) ═ */}
            <div id="cara-interior" className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />

                {/* P4: UNIDADES DE VALOR (Izquierda) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#020409]/60">
                    <div className="mb-8">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400/70 mb-2">Herramientas Incluidas</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Módulos de <span className="text-emerald-400">Trabajo</span></h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        {[
                            {I:Calculator, t:"Finanzas y Contabilidad", d:"Lleva el control de tus ingresos y gastos de forma organizada y fácil."},
                            {I:Users, t:"Gestión de Equipo", d:"Administra a tus empleados, sus pagos y turnos sin papeleo."},
                            {I:ShoppingCart, t:"Facturación y Punto de Venta", d:"Emite facturas al instante y controla tu inventario al vender."},
                            {I:Smartphone, t:"Acceso Móvil", d:"Supervisa tu negocio desde tu celular en cualquier lugar."},
                            {I:BarChart3, t:"Reportes Claros", d:"Gráficos simples para entender cuánto estás ganando realmente."}
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex gap-4 p-3 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all group">
                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                                    <I className="h-4 w-4 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white uppercase text-[9px] tracking-widest mb-1">{t}</h4>
                                    <p className="text-[9px] text-slate-400 leading-snug">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* P5: GARANTÍA DE CONTINUIDAD (Centro) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#03050a]">
                    <div className="mb-8">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400/70 mb-2">Nuestro Compromiso</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Garantía <span className="text-blue-500">Kyron</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="p-7 rounded-[2rem] border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                                <Zap className="h-16 w-16 text-blue-400" />
                            </div>
                            <h4 className="font-black text-blue-400 uppercase text-[11px] tracking-widest mb-3">Siempre Funcionando</h4>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                                Si necesitas ayuda o algo falla, nuestro equipo te asiste rápidamente para que las ventas de tu negocio no se detengan ni un solo minuto.
                            </p>
                        </div>

                        <div className="p-7 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5">
                            <h4 className="font-black text-emerald-400 uppercase text-[11px] tracking-widest mb-3">Soporte Humano</h4>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                                No te atiende un robot. Hablas directamente con nuestros asesores locales que entienden cómo funciona tu comercio.
                            </p>
                        </div>

                        <div className="p-7 rounded-[2rem] border border-white/10 bg-white/5">
                            <h4 className="font-black text-white uppercase text-[11px] tracking-widest mb-3">Sin Enredos</h4>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                                Hacemos que la tecnología sea invisible. Tú solo ocúpate de atender a tus clientes, la plataforma hace los cálculos por ti.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-transparent rounded-[2rem] border border-blue-500/30">
                        <p className="text-[11px] text-white font-black uppercase tracking-[0.2em] text-center italic">"Un aliado confiable para el día a día."</p>
                    </div>
                </div>

                {/* P6: VISIÓN & ESCALABILIDAD 2026 (Derecha) */}
                <div className="w-[3.62in] p-8 flex flex-col relative z-10 bg-[#050816]">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                        <img src="/images/logo-black.png" alt="Logo Fondo" className="w-[450px] h-[450px] object-contain opacity-20" crossOrigin="anonymous" />
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-400/70 mb-2">Visión a Futuro</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Crecemos <span className="text-cyan-400">Contigo</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <p className="text-[11px] text-slate-300 leading-relaxed text-justify font-medium">
                                Ya sea que tengas un emprendimiento desde casa o varias sucursales, System Kyron se ajusta a tu ritmo. Pagas solo por lo que necesitas y agregas funciones a medida que creces.
                            </p>
                            <p className="text-[11px] text-slate-400 leading-relaxed text-justify">
                                Queremos ser el motor digital que impulse a los negocios locales hacia el éxito, brindándote herramientas que antes solo las grandes empresas podían tener.
                            </p>
                        </div>

                        <div className="pt-8 grid grid-cols-1 gap-6">
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <Rocket className="h-6 w-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Innovación Constante</h5>
                                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter">Nuevas funciones cada mes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Comunidad</h5>
                                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter">Eventos y capacitación gratis</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto p-6 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/30 text-center">
                            <p className="text-[10px] text-white font-black uppercase tracking-widest leading-relaxed">
                                Súmate a la revolución comercial de Venezuela.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-end pt-8 border-t border-white/5">
                        <img src="/images/logo-black.png" alt="Kyron Mini" className="h-12 w-12 opacity-30 object-contain" crossOrigin="anonymous" />
                        <div className="text-right">
                            <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">System Kyron</p>
                            <p className="text-[7px] text-slate-600 font-bold">La solución para tu negocio</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FolletoView;

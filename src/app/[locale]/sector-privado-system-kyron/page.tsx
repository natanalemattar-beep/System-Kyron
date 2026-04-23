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
    Image as ImageIcon,
    Cloud,
    Package
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

    const QR_PRINCIPAL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(baseUrl)}&color=000000&bgcolor=ffffff&margin=2`;
    const QR_FEEDBACK = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(baseUrl + '/feedback')}&color=000000&bgcolor=ffffff&margin=2`;

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
                    backgroundColor: '#09090b',
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
                backgroundColor: '#09090b',
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
            const canvasFrontal = await h2c(frontal, { scale: 1.0, useCORS: true, backgroundColor: '#09090b', allowTaint: false });
            const canvasInterior = await h2c(interior, { scale: 1.0, useCORS: true, backgroundColor: '#09090b', allowTaint: false });
            
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
        <div id="folleto-content" className="w-full bg-zinc-950 p-8 flex flex-col items-center gap-12 overflow-x-auto print:bg-white print:p-0 print:gap-0 font-[family-name:var(--font-outfit)] relative">
            
            {/* Toolbar Flotante (Oculta en impresión) */}
            <div id="folleto-toolbar" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex gap-3 bg-zinc-900/90 backdrop-blur-3xl px-6 py-4 rounded-[2.5rem] border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] print:hidden transition-opacity duration-300">
                <button 
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-600/50 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-cyan-500/20"
                >
                    <PrinterIcon className={`h-4 w-4 ${isExporting ? 'animate-spin' : ''}`} /> {isExporting ? 'Procesando...' : 'PDF Full'}
                </button>
                <div className={`flex gap-1 bg-white/5 p-1 rounded-2xl border border-zinc-800 ${isExporting ? 'opacity-50 pointer-events-none' : ''}`}>
                    <button 
                        onClick={() => handleDownloadPNG('cara-frontal', 'Frontal')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-zinc-300 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                    >
                        <ImageIcon className="h-3.5 w-3.5 text-cyan-500" /> Cara 1
                    </button>
                    <button 
                        onClick={() => handleDownloadPNG('cara-interior', 'Interior')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-zinc-300 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                    >
                        <ImageIcon className="h-3.5 w-3.5 text-cyan-500" /> Cara 2
                    </button>
                </div>
                <button 
                    onClick={handleDownloadWord}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-5 py-3 bg-zinc-800/50 hover:bg-zinc-800 disabled:bg-zinc-900/50 text-zinc-300 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border border-zinc-700 shadow-lg hover:scale-105 active:scale-95"
                >
                    <FileText className={`h-4 w-4 ${isExporting ? 'animate-pulse text-cyan-500' : ''}`} /> {isExporting ? 'Generando...' : 'Word Doc'}
                </button>
            </div>

            {/* ═ CARA 1: EXTERIOR (Paneles: Qué es, Cierre, Portada) ═ */}
            <div id="cara-frontal" style={{ pageBreakAfter: 'always' }} className="w-[11in] h-[8.5in] bg-[#09090b] text-zinc-300 shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative font-[family-name:var(--font-outfit)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.04),transparent_50%)] pointer-events-none" />

                {/* P1 (C1-Left, Flap): QUÉ ES SYSTEM KYRON (Ancho: 3.62in) */}
                <div className="w-[3.62in] border-r border-zinc-800 p-9 flex flex-col relative z-10 bg-black/40 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    
                    <div className="mb-6 relative z-10">
                        <span className="inline-block px-2.5 py-1 bg-cyan-950 rounded-md text-[7px] font-bold uppercase tracking-widest text-cyan-400 mb-3 border border-cyan-900">La Solución Integral</span>
                        <h3 className="text-[20px] font-black text-white uppercase tracking-tighter">¿Qué es <br/><span className="text-cyan-400">System Kyron?</span></h3>
                    </div>

                    <div className="space-y-4 relative z-10 mb-8">
                        <p className="text-[10px] text-zinc-300 leading-relaxed text-justify">
                            System Kyron es un **Ecosistema Digital Unificado** (ERP + Punto de Venta + RRHH) diseñado para digitalizar el 100% de las operaciones de una empresa en una sola pantalla.
                        </p>
                        <p className="text-[10px] text-zinc-400 leading-relaxed text-justify">
                            En lugar de tener múltiples herramientas dispersas, centralizamos tus ventas, inventario, finanzas y empleados en **una sola plataforma en la nube, rápida y segura**.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center relative z-10 p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/50">
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Cloud className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-0.5">Operación en la Nube</h5>
                                    <p className="text-[8px] text-zinc-500 leading-tight">Accede a tu negocio desde cualquier lugar.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Zap className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-0.5">Sincronización Total</h5>
                                    <p className="text-[8px] text-zinc-500 leading-tight">Ventas e inventario actualizados al segundo.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-0.5">Seguridad Robusta</h5>
                                    <p className="text-[8px] text-zinc-500 leading-tight">Copias de seguridad automáticas diarias.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto relative z-10 pt-5 border-t border-zinc-800">
                        <div className="flex justify-between items-center px-1">
                             <div className="text-center"><p className="text-[7px] font-bold tracking-widest text-zinc-400">TODO EN UNO</p></div>
                             <div className="h-1 w-1 bg-zinc-600 rounded-full" />
                             <div className="text-center"><p className="text-[7px] font-bold tracking-widest text-cyan-400">EFICIENTE</p></div>
                        </div>
                    </div>
                </div>

                {/* P2 (C1-Center, Back Cover): CIERRE Y ACCIÓN (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-9 flex flex-col relative z-10 bg-[#09090b]">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                        <img src="/images/logo-black.png" alt="Logo Fondo" className="w-[450px] h-[450px] object-contain opacity-20" crossOrigin="anonymous" />
                    </div>
                    
                    <div className="mb-10">
                        <span className="inline-block px-2.5 py-1 bg-zinc-800 rounded-md text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-3 border border-zinc-700">El Siguiente Paso</span>
                        <h3 className="text-[20px] font-black uppercase tracking-tighter text-white leading-tight">Únete a la<br/><span className="text-zinc-500 font-medium">Evolución.</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <p className="text-[11px] text-zinc-300 leading-relaxed text-justify font-medium">
                            No dejes que el caos administrativo frene el potencial de tu empresa. Con System Kyron, adquieres **orden, rapidez y transparencia** desde el primer día.
                        </p>

                        <div className="p-6 bg-cyan-950/20 rounded-2xl border border-cyan-500/20 mt-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Shield className="h-16 w-16 text-cyan-400" />
                            </div>
                            <h5 className="text-[11px] font-black text-cyan-400 uppercase tracking-widest mb-4">Nuestra Promesa</h5>
                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> Soporte técnico humano, local y siempre disponible.
                                </li>
                                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> Capacitación total para ti y todo tu equipo.
                                </li>
                                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> Migración de datos sin perder tu información actual.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-end pt-6 border-t border-zinc-800">
                        <img src="/images/logo-black.png" alt="Kyron Mini" className="h-10 w-10 opacity-30 object-contain" crossOrigin="anonymous" />
                        <div className="text-right">
                            <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-1">Contacto Directo</p>
                            <p className="text-[7px] text-zinc-600 font-medium uppercase tracking-widest">+58 000-0000000</p>
                        </div>
                    </div>
                </div>

                {/* P3 (C1-Right, Front Cover): PORTADA (Ancho: 3.69in) */}
                <div className="w-[3.69in] p-9 flex flex-col relative z-10 overflow-hidden bg-black">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-10">
                            <img src="/images/logo-black.png" alt="Kyron" className="h-14 w-14 object-contain opacity-90" crossOrigin="anonymous" />
                            <div className="flex flex-col items-end">
                                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[7px] font-black uppercase tracking-widest text-zinc-300 mb-1">Presentación Oficial</span>
                                <span className="text-[7px] font-bold text-zinc-600 tracking-widest uppercase">Versión 2.0</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-3 flex items-center gap-2">
                                <span className="h-[2px] w-8 bg-cyan-500 inline-block" /> Plataforma Empresarial
                            </p>
                            <h1 className="text-[52px] font-black uppercase tracking-tighter leading-[0.9] mb-4 text-white">System<br/><span className="text-zinc-500">Kyron.</span></h1>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium border-l-2 border-cyan-500 pl-4">
                                El aliado digital definitivo que centraliza y optimiza todas las operaciones de tu negocio.
                            </p>
                        </div>

                        <div className="mt-auto bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] border border-zinc-800 p-6 flex flex-col items-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-5">CONOCE MÁS DE NUESTRO SISTEMA</p>
                            
                            <div className="flex gap-8 w-full justify-center mb-5">
                                <div className="flex flex-col items-center gap-2.5 group">
                                    <div className="p-1.5 bg-white rounded-2xl group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/20">
                                        <img src={QR_PRINCIPAL} alt="Portal" width={80} height={80} className="rounded-xl" crossOrigin="anonymous" />
                                    </div>
                                    <p className="text-[7px] font-bold uppercase tracking-widest text-cyan-400">Portal Web</p>
                                </div>
                                <div className="flex flex-col items-center gap-2.5 group">
                                    <div className="p-1.5 bg-white rounded-2xl group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-zinc-200">
                                        <img src={QR_FEEDBACK} alt="Contacto" width={80} height={80} className="rounded-xl" crossOrigin="anonymous" />
                                    </div>
                                    <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400">Contáctanos</p>
                                </div>
                            </div>
                            <p className="text-[7px] text-zinc-500 font-medium flex items-center gap-2">
                                <ScanLine className="h-3 w-3" /> Escanea con la cámara de tu móvil
                            </p>
                        </div>

                        <div className="mt-6 flex justify-between items-center px-2">
                            <p className="text-[8px] text-zinc-600 tracking-widest font-black uppercase">system-kyron.vercel.app</p>
                            <div className="flex gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═ CARA 2: INTERIOR (Paneles: Problemas, Módulos, Innovación) ═ */}
            <div id="cara-interior" className="w-[11in] h-[8.5in] bg-[#09090b] text-zinc-300 shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex shrink-0 overflow-hidden print:shadow-none relative font-[family-name:var(--font-outfit)]">
                
                {/* P4 (C2-Left, Inside Left): PROBLEMAS CRÍTICOS (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-9 flex flex-col relative z-10 bg-black/40">
                    <div className="mb-6">
                        <span className="inline-block px-2.5 py-1 bg-zinc-800 rounded-md text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-3 border border-zinc-700">El Reto Operativo</span>
                        <h3 className="text-[20px] font-black text-white leading-tight tracking-tighter">Problemas Críticos <br/><span className="text-zinc-500 font-medium">que tu negocio enfrenta.</span></h3>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors group">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <Activity className="h-3.5 w-3.5 text-rose-400 group-hover:scale-110 transition-transform" /> Fuga de Capital Oculta
                            </h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                La pérdida de mercancía, errores de cobro y el descontrol en los inventarios físicos generan hasta un 15% de pérdidas mensuales invisibles.
                            </p>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors group">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <TrendingUp className="h-3.5 w-3.5 text-rose-400 group-hover:scale-110 transition-transform" /> Caos Administrativo
                            </h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                Invertir cientos de horas calculando impuestos, nóminas y cierres de caja a mano o en Excel, aumentando el riesgo de costosas multas fiscales.
                            </p>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors group">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <Cpu className="h-3.5 w-3.5 text-rose-400 group-hover:scale-110 transition-transform" /> Sistemas Desconectados
                            </h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                Pagar por programas de facturación y hojas de cálculo que no se comunican entre sí, duplicando el trabajo del equipo.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-zinc-800">
                        <p className="text-[8px] text-zinc-500 font-medium leading-tight italic">"El 80% del tiempo de un comerciante se pierde en apagar fuegos operativos en lugar de pensar en expansión."</p>
                    </div>
                </div>

                {/* P5 (C2-Center, Inside Center): EL ECOSISTEMA (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-9 flex flex-col relative z-10 bg-[#09090b]">
                    <div className="mb-8">
                        <span className="inline-block px-2.5 py-1 bg-cyan-950 rounded-md text-[7px] font-bold uppercase tracking-widest text-cyan-400 mb-3 border border-cyan-900">Herramientas Base</span>
                        <h3 className="text-[20px] font-black uppercase tracking-tighter text-white leading-tight">El Ecosistema<br/><span className="text-cyan-400 font-medium">Funcional.</span></h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1 content-start mt-2">
                        {[
                            {I:ShoppingCart, t:"Punto de Venta", d:"Ventas rápidas."},
                            {I:Package, t:"Inventario", d:"Control de stock."},
                            {I:Users, t:"Recursos Humanos", d:"Nómina y control."},
                            {I:Calculator, t:"Finanzas", d:"Cuentas al día."},
                            {I:FileText, t:"Facturación", d:"Manejo de IGTF."},
                            {I:BarChart3, t:"Reportes", d:"Métricas precisas."},
                            {I:Lock, t:"Seguridad", d:"Permisos y roles."},
                            {I:Smartphone, t:"App Móvil", d:"Acceso remoto."}
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex flex-col p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-colors cursor-default">
                                <I className="h-5 w-5 text-cyan-400 mb-2.5" />
                                <h4 className="font-bold text-white uppercase text-[8px] tracking-widest mb-1">{t}</h4>
                                <p className="text-[7.5px] text-zinc-500 leading-tight">{d}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
                        <p className="text-[8px] text-zinc-400 font-medium leading-relaxed italic">
                            "Módulos interconectados que trabajan en perfecta armonía."
                        </p>
                    </div>
                </div>

                {/* P6 (C2-Right, Inside Right): LA INNOVACIÓN (Ancho: 3.62in) */}
                <div className="w-[3.62in] p-9 flex flex-col relative z-10 bg-[#09090b]">
                    <div className="mb-8">
                        <span className="inline-block px-2.5 py-1 bg-zinc-800 rounded-md text-[7px] font-bold uppercase tracking-widest text-zinc-400 mb-3 border border-zinc-700">Ventaja Competitiva</span>
                        <h3 className="text-[20px] font-black uppercase tracking-tighter text-white leading-tight">La Innovación<br/><span className="text-zinc-500 font-medium">detrás del sistema.</span></h3>
                    </div>

                    <div className="space-y-6 flex-1 mt-4">
                        <div className="relative pl-7 border-l-[1.5px] border-cyan-500/50 pb-2">
                            <div className="absolute left-[-9.5px] top-0 h-4 w-4 rounded-full bg-[#09090b] border-2 border-cyan-500 flex items-center justify-center">
                                <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                            </div>
                            <h4 className="font-black text-white uppercase text-[10px] tracking-widest mb-1.5">Conectividad Híbrida</h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                ¿Se cayó el internet? No hay problema. Nuestro sistema te permite seguir facturando de manera local y **sincroniza todo automáticamente** en cuanto vuelve la conexión.
                            </p>
                        </div>

                        <div className="relative pl-7 border-l-[1.5px] border-zinc-700 pb-2">
                            <div className="absolute left-[-9.5px] top-0 h-4 w-4 rounded-full bg-[#09090b] border-2 border-zinc-700" />
                            <h4 className="font-black text-white uppercase text-[10px] tracking-widest mb-1.5">Actualización Autónoma</h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                System Kyron se actualiza a las últimas normas del SENIAT sin que tengas que descargar parches o pagar licencias extras. Cumples la ley por defecto.
                            </p>
                        </div>

                        <div className="relative pl-7 border-l-[1.5px] border-zinc-700 pb-2">
                            <div className="absolute left-[-9.5px] top-0 h-4 w-4 rounded-full bg-[#09090b] border-2 border-zinc-700" />
                            <h4 className="font-black text-white uppercase text-[10px] tracking-widest mb-1.5">Métricas Dinámicas</h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                Los reportes ya no son tablas de Excel aburridas. Observa gráficos interactivos que te dicen exactamente qué se vende más y a qué hora.
                            </p>
                        </div>

                        <div className="relative pl-7 border-l-[1.5px] border-transparent">
                            <div className="absolute left-[-9.5px] top-0 h-4 w-4 rounded-full bg-[#09090b] border-2 border-zinc-700" />
                            <h4 className="font-black text-white uppercase text-[10px] tracking-widest mb-1.5">Multi-Sucursal Escalable</h4>
                            <p className="text-[9px] text-zinc-400 leading-relaxed text-justify">
                                Empieza con una tienda y crece a cincuenta. Gestiona el inventario central y el traslado entre sedes desde tu mismo panel administrativo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

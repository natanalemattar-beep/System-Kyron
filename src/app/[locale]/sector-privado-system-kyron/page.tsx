"use client";

import React from 'react';
import {
    Shield,
    Zap,
    Users,
    Calculator,
    Smartphone,
    TrendingUp,
    CircleCheck,
    Lock,
    Cpu,
    ChartColumn,
    ShoppingCart,
    ScanLine,
    Activity,
    ShieldCheck,
    FileText,
    Printer as PrinterIcon,
    Image as ImageIcon,
    Cloud,
    Package,
    Phone,
    Instagram
} from 'lucide-react';
import { KyronDocumentAi } from '@/components/ai/document-ai';

export default function SectorPrivadoPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = React.use(params);
    const [baseUrl, setBaseUrl] = React.useState('https://system-kyron.com');
    const [isExporting, setIsExporting] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
            // Permitir scroll horizontal en esta página específica para el folleto de 11in
            document.documentElement.classList.remove('overflow-x-hidden');
            document.body.classList.remove('overflow-x-hidden');
        }
        return () => {
            if (typeof window !== 'undefined') {
                document.documentElement.classList.add('overflow-x-hidden');
                document.body.classList.add('overflow-x-hidden');
            }
        };
    }, []);

    // Si no está montado en el cliente, retornamos un placeholder o nada para evitar errores de servidor
    if (!mounted) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white font-bold animate-pulse">Cargando Ecosistema...</div>;

    const QR_PRINCIPAL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(baseUrl)}&color=000000&bgcolor=ffffff&margin=2`;
    const QR_FEEDBACK = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(baseUrl + '/feedback')}&color=000000&bgcolor=ffffff&margin=2`;
    const QR_INSTAGRAM = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://instagram.com/systemkyron')}&color=000000&bgcolor=ffffff&margin=2`;
    const handleExportPDF = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            const h2c = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            // Clonar temporalmente para asegurar dimensiones perfectas sin importar el viewport
            const frontal = document.getElementById('cara-frontal');
            const interior = document.getElementById('cara-interior');
            
            const canvasOpts = { 
                scale: 3, // Aumentamos a 3 para nitidez suprema
                useCORS: true, 
                backgroundColor: '#09090b', 
                logging: false,
                windowWidth: 1056, // Forzamos ancho de 11in en pixeles (96dpi)
                windowHeight: 816   // Forzamos alto de 8.5in
            };
            
            const canvas1 = await h2c(frontal!, canvasOpts);
            const canvas2 = await h2c(interior!, canvasOpts);

            const pdf = new jsPDF({ 
                orientation: 'landscape', 
                unit: 'in', 
                format: 'letter',
                compress: true
            });

            pdf.addImage(canvas1.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 11, 8.5);
            pdf.addPage();
            pdf.addImage(canvas2.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 11, 8.5);

            pdf.save('System-Kyron-Folleto-Elite.pdf');
        } catch (error) {
            console.error('Error generando PDF:', error);
            alert('Error en la generación del PDF. Intente en un navegador de escritorio.');
        } finally {
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
                scale: 1.5, // 1.5x es ideal para calidad sin saturar VRAM
                useCORS: true,
                backgroundColor: '#09090b',
                logging: false,
                allowTaint: false
            });
            
            // JPEG codifica más rápido y usa menos memoria que PNG
            const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
            
            const link = document.createElement('a');
            link.download = `System-Kyron-Folleto-${name}.jpg`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generando Imagen:', error);
            alert('Hubo un error procesando la imagen de alta calidad.');
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
            
            // Escala 1.0 para mantener el DOM del word ligero
            const canvasFrontal = await h2c(frontal, { scale: 1.0, useCORS: true, backgroundColor: '#09090b', allowTaint: false });
            const canvasInterior = await h2c(interior, { scale: 1.0, useCORS: true, backgroundColor: '#09090b', allowTaint: false });
            
            const imgFrontal = canvasFrontal.toDataURL('image/jpeg', 0.85);
            const imgInterior = canvasInterior.toDataURL('image/jpeg', 0.85);

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
            
            // Timeout de recolección de basura para evitar corrupción de descarga
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error('Error generando Súper Word:', error);
            alert('Hubo un error de procesamiento. Reintenta la descarga.');
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
            <motion.div 
                id="cara-frontal" 
                style={{ pageBreakAfter: 'always' }} 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-[11in] h-[8.5in] bg-[#09090b] text-zinc-300 shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative font-[family-name:var(--font-outfit)]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.04),transparent_50%)] pointer-events-none" />

                {/* P1 (C1-Left, Flap): QUÉ ES SYSTEM KYRON (Ancho: 3.62in) */}
                <div className="w-[3.62in] border-r border-zinc-800 p-7 flex flex-col relative z-10 bg-black/40 overflow-hidden min-h-0">
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    
                    <div className="mb-4 relative z-10">
                        <span className="inline-block px-3 py-1 bg-cyan-950 rounded-md text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-2 border border-cyan-900 shadow-lg">La Solución Integral</span>
                        <h3 className="text-[22px] font-black text-white uppercase tracking-tighter leading-tight">¿Qué es <br/><span className="text-cyan-400">System Kyron?</span></h3>
                    </div>

                    <div className="space-y-3 relative z-10 mb-6">
                        <p className="text-[16px] text-white font-black leading-tight text-justify">
                            System Kyron es un <span className="text-cyan-400">Ecosistema Digital Unificado</span> (ERP + Punto de Venta + RRHH) diseñado para digitalizar el 100% de las operaciones de una empresa en una sola pantalla.
                        </p>
                        <p className="text-[14px] text-white font-bold leading-snug text-justify">
                            En lugar de tener múltiples herramientas dispersas, centralizamos tus ventas, inventario, finanzas y empleados en <span className="text-cyan-400">una sola plataforma en la nube, rápida y segura</span>.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center relative z-10 p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 min-h-0">
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Cloud className="h-7 w-7 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-black text-white uppercase tracking-widest mb-1">Operación en la Nube</h5>
                                    <p className="text-[13px] text-zinc-200 font-bold leading-tight">Acceso total desde cualquier lugar.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Zap className="h-7 w-7 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-black text-white uppercase tracking-widest mb-1">Sincronización Total</h5>
                                    <p className="text-[13px] text-zinc-200 font-bold leading-tight">Actualización en tiempo real.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-7 w-7 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-black text-white uppercase tracking-widest mb-1">Seguridad Robusta</h5>
                                    <p className="text-[13px] text-zinc-200 font-bold leading-tight">Copias de seguridad diarias.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto relative z-10 pt-5 border-t border-zinc-800">
                        <div className="flex justify-between items-center px-1">
                             <div className="text-center"><p className="text-[11px] font-black tracking-widest text-zinc-400">TODO EN UNO</p></div>
                             <div className="h-2 w-2 bg-zinc-600 rounded-full" />
                             <div className="text-center"><p className="text-[11px] font-black tracking-widest text-cyan-400">EFICIENTE</p></div>
                        </div>
                    </div>
                </div>

                {/* P2 (C1-Center, Back Cover): CIERRE Y ACCIÓN (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-7 flex flex-col relative z-10 bg-[#09090b] min-h-0">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                        <img src="/images/logo-black.png" alt="Logo Fondo" className="w-[450px] h-[450px] object-contain opacity-20" crossOrigin="anonymous" />
                    </div>
                    
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-zinc-800 rounded-md text-[11px] font-black uppercase tracking-widest text-zinc-300 mb-2 border border-zinc-700 shadow-lg">El Siguiente Paso</span>
                        <h3 className="text-[22px] font-black uppercase tracking-tighter text-white leading-tight">ÚNETE A LA<br/><span className="text-cyan-400">EVOLUCIÓN.</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <p className="text-[16px] text-white leading-tight text-justify font-black">
                            No dejes que el caos administrativo frene el potencial de tu empresa. Con System Kyron, adquieres <span className="text-cyan-400">orden, rapidez y transparencia</span> desde el primer día.
                        </p>

                        <div className="p-5 bg-cyan-950/20 rounded-2xl border border-cyan-500/20 mt-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Shield className="h-20 w-20 text-cyan-400" />
                            </div>
                            <h5 className="text-[15px] font-black text-cyan-400 uppercase tracking-widest mb-4">Nuestra Promesa</h5>
                            <ul className="space-y-5 relative z-10">
                                <li className="flex items-start gap-3 text-[14px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-6 w-6 text-cyan-400 shrink-0" /> Soporte técnico humano, local y siempre disponible.
                                </li>
                                <li className="flex items-start gap-3 text-[14px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-6 w-6 text-cyan-400 shrink-0" /> Capacitación total para ti y todo tu equipo.
                                </li>
                                <li className="flex items-start gap-3 text-[14px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-6 w-6 text-cyan-400 shrink-0" /> Migración de datos sin perder tu información actual.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-end pt-5 border-t border-zinc-800">
                        <img src="/images/logo-black.png" alt="Kyron Mini" className="h-16 w-16 opacity-30 object-contain" crossOrigin="anonymous" />
                        <div className="text-right">
                            <p className="text-[14px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-1">Contacto Directo</p>
                            <p className="text-[20px] text-white font-black uppercase tracking-widest">0424-1846016</p>
                            <p className="text-[15px] text-zinc-300 font-black tracking-wide flex items-center justify-end gap-2">
                                <Instagram className="h-4 w-4 text-cyan-400" /> @systemkyron
                            </p>
                            <p className="text-[13px] text-zinc-400 font-bold tracking-tight">systemkyronofficial@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* P3 (C1-Right, Front Cover): PORTADA (Ancho: 3.69in) */}
                <div className="w-[3.69in] p-7 flex flex-col relative z-10 overflow-hidden bg-black min-h-0">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <img src="/images/logo-black.png" alt="Kyron" className="h-14 w-14 object-contain opacity-90" crossOrigin="anonymous" />
                            <div className="flex flex-col items-end">
                                <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-[12px] font-black uppercase tracking-widest text-white mb-1 shadow-lg">Presentación Oficial</span>
                                <span className="text-[11px] font-black text-zinc-500 tracking-widest uppercase">Versión 2.0</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-[12px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-10 bg-cyan-500 inline-block" /> Plataforma Empresarial
                            </p>
                            <h1 className="text-[52px] font-black uppercase tracking-tighter leading-[0.9] mb-4 text-white">System<br/><span className="text-zinc-500">Kyron.</span></h1>
                            <p className="text-[13px] text-zinc-400 leading-relaxed font-medium border-l-2 border-cyan-500 pl-4">
                                El aliado digital definitivo que centraliza y optimiza todas las operaciones de tu negocio.
                            </p>
                        </div>

                        <div className="mt-auto bg-zinc-900/50 backdrop-blur-xl rounded-[1.5rem] border border-zinc-800 p-5 flex flex-col items-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 text-center">CONOCE MÁS DE NUESTRO SISTEMA</p>
                            
                            <div className="flex flex-col gap-6 w-full items-center">
                                {/* QR Principal - Arriba solo para que sea el foco primario */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <div className="p-2 bg-white rounded-xl group-hover:scale-110 transition-transform shadow-[0_10px_25px_rgba(6,182,212,0.4)] border border-cyan-500/30">
                                        <img src={QR_PRINCIPAL} alt="Portal" width={110} height={110} className="rounded-lg" crossOrigin="anonymous" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-400">Plataforma Principal</p>
                                </div>

                                {/* QRs de Acción - Separados para evitar escaneos accidentales */}
                                <div className="flex justify-between w-full px-6 pt-2 border-t border-white/5">
                                    <div className="flex flex-col items-center gap-2 group">
                                        <div className="p-1.5 bg-white rounded-xl group-hover:scale-110 transition-transform shadow-[0_10px_25px_rgba(236,72,153,0.3)] border border-pink-500/30">
                                            <img src={QR_INSTAGRAM} alt="Instagram" width={75} height={75} className="rounded-lg" crossOrigin="anonymous" />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-pink-500">Instagram</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 group">
                                        <div className="p-1.5 bg-white rounded-xl group-hover:scale-110 transition-transform shadow-[0_10px_25px_rgba(251,191,36,0.3)] border border-amber-500/30">
                                            <img src={QR_FEEDBACK} alt="Encuesta" width={75} height={75} className="rounded-lg" crossOrigin="anonymous" />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-400">Tu Encuesta</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] text-zinc-400 font-bold flex items-center gap-2 mt-4">
                                <ScanLine className="h-5 w-5 text-cyan-500" /> Escaneo de Seguridad Activo
                            </p>
                        </div>

                        <div className="mt-6 flex justify-between items-center px-2">
                            <div className="flex flex-col">
                                <p className="text-[12px] text-zinc-500 tracking-widest font-black uppercase">system-kyron.com</p>
                                <p className="text-[10px] text-cyan-500/60 font-black uppercase tracking-[0.2em] flex items-center gap-1.5 mt-1">
                                    <Instagram className="h-3 w-3" /> @systemkyron
                                </p>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ═ CARA 2: INTERIOR (Paneles: Problemas, Módulos, Innovación) ═ */}
            <motion.div 
                id="cara-interior" 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-[11in] h-[8.5in] bg-[#09090b] text-zinc-300 shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex shrink-0 overflow-hidden print:shadow-none relative font-[family-name:var(--font-outfit)]"
            >
                
                {/* P4 (C2-Left, Inside Left): PROBLEMAS CRÍTICOS (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-7 flex flex-col relative z-10 bg-black/40 min-h-0">
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-zinc-800 rounded-md text-[11px] font-black uppercase tracking-widest text-zinc-300 mb-2 border border-zinc-700 shadow-lg">El Reto Operativo</span>
                        <h3 className="text-[22px] font-black text-white leading-tight tracking-tighter">Problemas Críticos <br/><span className="text-zinc-500 font-medium">que tu negocio enfrenta.</span></h3>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                        <div className="p-3.5 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors group">
                            <h4 className="text-[14px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform" /> Fuga de Capital Oculta
                            </h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                La pérdida de mercancía, errores de cobro y el descontrol en los inventarios físicos generan hasta un 15% de pérdidas mensuales invisibles.
                            </p>
                        </div>
                        <div className="p-3.5 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors group">
                            <h4 className="text-[14px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform" /> Caos Administrativo
                            </h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                Invertir cientos de horas calculando impuestos, nóminas y cierres de caja a mano o en Excel, aumentando el riesgo de costosas multas fiscales.
                            </p>
                        </div>
                        <div className="p-3.5 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors group">
                            <h4 className="text-[14px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <Cpu className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform" /> Sistemas Desconectados
                            </h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                Pagar por programas de facturación y hojas de cálculo que no se comunican entre sí, duplicando el trabajo del equipo.
                            </p>
                        </div>
                        <div className="p-3.5 bg-zinc-900/50 rounded-xl border border-rose-900/40 hover:border-rose-500/50 transition-colors group bg-rose-950/10">
                            <h4 className="text-[14px] font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform" /> Estafas Telefónicas
                            </h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                Llamadas fraudulentas que suplantan a proveedores o bancos generan pérdidas económicas directas y dañan la reputación sin dejar rastro.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800">
                        <p className="text-[13px] text-white font-black leading-tight italic">"El fraude y el desorden son los enemigos silenciosos de tu negocio."</p>
                    </div>
                </div>

                {/* P5 (C2-Center, Inside Center): EL ECOSISTEMA (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-7 flex flex-col relative z-10 bg-[#09090b] min-h-0">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-cyan-950 rounded-md text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-2 border border-cyan-900 shadow-lg">Herramientas Base</span>
                        <h3 className="text-[22px] font-black uppercase tracking-tighter text-white leading-tight">El Ecosistema<br/><span className="text-cyan-400 font-medium">Funcional.</span></h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 flex-1 content-start mt-1">
                        {[
                            {I:ShoppingCart, t:"Punto de Venta", d:"Ventas rápidas."},
                            {I:Package, t:"Inventario", d:"Control de stock."},
                            {I:Users, t:"Recursos Humanos", d:"Nómina y control."},
                            {I:Calculator, t:"Finanzas", d:"Cuentas al día."},
                            {I:FileText, t:"Facturación", d:"Manejo de IGTF."},
                            {I:ChartColumn, t:"Reportes", d:"Métricas precisas."},
                            {I:Lock, t:"Seguridad", d:"Permisos y roles."},
                            {I:Phone, t:"Líneas Telefónicas", d:"Comunicación segura."}
                        ].map(({I,t,d},i)=>(
                            <motion.div 
                                key={i} 
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                className="flex flex-col p-3 bg-zinc-900/40 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition-colors cursor-default min-h-0"
                            >
                                <I className="h-7 w-7 text-cyan-400 mb-2" />
                                <h4 className="font-black text-white uppercase text-[11px] tracking-widest mb-1">{t}</h4>
                                <p className="text-[10px] text-zinc-300 font-bold leading-tight">{d}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
                        <p className="text-[14px] text-white font-black leading-tight italic">
                            "Módulos interconectados en armonía."
                        </p>
                    </div>
                </div>

                {/* P6 (C2-Right, Inside Right): LA INNOVACIÓN (Ancho: 3.62in) */}
                <div className="w-[3.62in] p-7 flex flex-col relative z-10 bg-[#09090b] min-h-0">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-zinc-800 rounded-md text-[11px] font-black uppercase tracking-widest text-zinc-300 mb-2 border border-zinc-700 shadow-lg">Ventaja Competitiva</span>
                        <h3 className="text-[22px] font-black uppercase tracking-tighter text-white leading-tight">La Innovación<br/><span className="text-zinc-500 font-medium">detrás del sistema.</span></h3>
                    </div>

                    <div className="space-y-4 flex-1 mt-2">
                        <div className="relative pl-6 border-l-[2px] border-cyan-500 pb-3">
                            <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-cyan-500 border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                <div className="h-2 w-2 bg-white rounded-full" />
                            </div>
                            <h4 className="font-black text-white uppercase text-[14px] tracking-widest mb-1.5">Conectividad Híbrida</h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                ¿Sin internet? Sigue facturando localmente. Todo se <span className="text-cyan-400">sincroniza automáticamente</span> al recuperar la conexión.
                            </p>
                        </div>

                        <div className="relative pl-6 border-l-[2px] border-zinc-700 pb-3">
                            <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-[#09090b] border-2 border-zinc-700" />
                            <h4 className="font-black text-white uppercase text-[14px] tracking-widest mb-1.5">Actualización Autónoma</h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                Normas del SENIAT al día automáticamente. Cumples la ley sin esfuerzo y sin parches manuales.
                            </p>
                        </div>

                        <div className="relative pl-6 border-l-[2px] border-zinc-700 pb-3">
                            <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-[#09090b] border-2 border-zinc-700" />
                            <h4 className="font-black text-white uppercase text-[14px] tracking-widest mb-1.5">Métricas Dinámicas</h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                Gráficos interactivos en tiempo real. Analiza qué vendes y a qué hora para tomar decisiones inteligentes.
                            </p>
                        </div>

                        <div className="relative pl-6 border-l-[2px] border-transparent">
                            <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-[#09090b] border-2 border-zinc-700" />
                            <h4 className="font-black text-white uppercase text-[14px] tracking-widest mb-1.5">Escalabilidad Total</h4>
                            <p className="text-[13px] text-white font-bold leading-snug text-justify">
                                Crece de una a cien sucursales. Gestiona inventarios centrales y sedes desde un único panel administrativo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═ DIGITAL SUPPLEMENT: INTELLIGENCE REPORT (Document AI) ═ */}
            <div className="w-full max-w-[11in] mt-24 mb-32 no-print">
                <div className="mb-12 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        Suplemento Digital Exclusivo
                    </span>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Unidad de Inteligencia <span className="text-cyan-400">Kyron</span></h2>
                    <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
                        Utilice este módulo integrado para realizar consultas profundas, generar borradores legales o analizar infraestructuras técnicas directamente sobre el ecosistema.
                    </p>
                </div>
                <KyronDocumentAi />
            </div>
        </div>
    );
}


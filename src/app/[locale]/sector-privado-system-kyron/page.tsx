"use client";

import React from 'react';
import {
    Shield,
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
    FileText,
    Printer as PrinterIcon,
    Image as ImageIcon,
    Globe,
    Package,
    Instagram,
    Sparkles,
    Leaf,
    Recycle,
    PhoneCall,
    Scale
} from 'lucide-react';
import { ResourceHeader } from '@/components/brand/ResourceHeader';
import { Link } from '@/navigation';

export default function SectorPrivadoPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = React.use(params);
    const [baseUrl, setBaseUrl] = React.useState('https://system-kyron.vercel.app');
    const [isExporting, setIsExporting] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
            // Permitir scroll horizontal en esta página específica para el folleto de 11in
            document.documentElement.classList.remove('overflow-x-hidden');
            document.body.classList.remove('overflow-x-hidden');

            // Trigger auto-download if requested
            const params = new URLSearchParams(window.location.search);
            if (params.get('download') === 'true') {
                setTimeout(() => {
                    const btn = document.querySelector('#folleto-toolbar button') as HTMLButtonElement;
                    if (btn) btn.click();
                }, 1500);
            }
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
    const preloadBrochureImages = async () => {
        const imgs = document.querySelectorAll('#cara-frontal img, #cara-interior img');
        const promises = Array.from(imgs).map(async (img) => {
            const src = (img as HTMLImageElement).src;
            if (!src || src.startsWith('data:')) return;
            try {
                const resp = await fetch(src, { mode: 'cors', credentials: 'omit' });
                const blob = await resp.blob();
                const dataUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
                (img as HTMLImageElement).src = dataUrl;
            } catch {
                console.warn('Could not preload brochure image:', src);
            }
        });
        await Promise.all(promises);
    };

    const handleDownloadPDF = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            await preloadBrochureImages();
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

            pdf.save('System-Kyron-Folleto-System Kyron.pdf');
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
            await preloadBrochureImages();
            const h2c = (await import('html2canvas')).default;
            const canvas = await h2c(node, {
                scale: 1.5, // 1.5x es ideal para calidad sin saturar VRAM
                useCORS: true,
                backgroundColor: '#09090b',
                logging: false,
                allowTaint: false,
                windowWidth: 1056,
                windowHeight: 816
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
            await preloadBrochureImages();
            const h2c = (await import('html2canvas')).default;
            
            // Escala 1.0 para mantener el DOM del word ligero
            const wordOpts = { scale: 1.0, useCORS: true, backgroundColor: '#09090b', allowTaint: false, windowWidth: 1056, windowHeight: 816 };
            const canvasFrontal = await h2c(frontal, wordOpts);
            const canvasInterior = await h2c(interior, wordOpts);
            
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
        <div className="flex flex-col">
            <ResourceHeader />
            <div id="folleto-content" className="w-full bg-zinc-950 p-8 flex flex-col items-center gap-12 overflow-x-auto print:bg-white print:p-0 print:gap-0 font-[family-name:var(--font-outfit)] relative">
            
            {/* Toolbar Flotante (Oculta en impresión) */}
            <div id="folleto-toolbar" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex gap-2 bg-zinc-900/95 px-4 py-3 rounded-lg border border-zinc-800/60 shadow-lg print:hidden">
                <button 
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-800 text-white rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors"
                >
                    <PrinterIcon className={`h-3.5 w-3.5 ${isExporting ? 'animate-spin' : ''}`} /> {isExporting ? 'PDF...' : 'PDF'}
                </button>
                <div className={`flex gap-1 ${isExporting ? 'opacity-50 pointer-events-none' : ''}`}>
                    <button 
                        onClick={() => handleDownloadPNG('cara-frontal', 'Frontal')}
                        className="flex items-center gap-1.5 px-3 py-2 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors"
                    >
                        <ImageIcon className="h-3.5 w-3.5" /> Cara 1
                    </button>
                    <button 
                        onClick={() => handleDownloadPNG('cara-interior', 'Interior')}
                        className="flex items-center gap-1.5 px-3 py-2 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors"
                    >
                        <ImageIcon className="h-3.5 w-3.5" /> Cara 2
                    </button>
                </div>
                <button 
                    onClick={handleDownloadWord}
                    disabled={isExporting}
                    className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 text-zinc-400 hover:text-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors border border-zinc-700"
                >
                    <FileText className={`h-3.5 w-3.5 ${isExporting ? 'animate-pulse' : ''}`} /> {isExporting ? 'Doc...' : 'Word'}
                </button>
                <div className="w-px h-6 bg-zinc-700 mx-1" />
                <Link 
                    href={"/brand-kit" as any}
                    className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors"
                >
                    <Sparkles className="h-3.5 w-3.5" /> Recursos
                </Link>
            </div>

            {/* --- CARA 1: EXTERIOR (Paneles: Qué es, Cierre, Portada) --- */}
            <div 
                id="cara-frontal" 
                className="w-[11in] h-[8.5in] bg-[#09090b] text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative font-[family-name:var(--font-outfit)]"
            >
                {/* P1 (C1-Left, Flap): QUÉ ES SYSTEM KYRON (Ancho: 3.62in) */}
                <div className="w-[3.62in] border-r border-zinc-800 p-6 flex flex-col relative z-10 bg-black/40 overflow-hidden min-h-0">
                    
                    <div className="mb-4 relative z-10">
                        <span className="inline-block text-[9px] font-black uppercase tracking-[0.25em] text-cyan-400 mb-2">◆ El Ecosistema Completo</span>
                        <h3 className="text-[20px] font-black text-white uppercase tracking-tighter leading-tight">¿Qué es <br/><span className="text-cyan-400">System Kyron?</span></h3>
                    </div>

                    <p className="text-[12px] text-white font-black leading-snug mb-4 relative z-10">
                        La plataforma empresarial <span className="text-cyan-400">más completa de Venezuela</span>. Un ecosistema digital que unifica ERP, POS, RRHH, Legal, Telecomunicaciones, Marketing y Sostenibilidad en un solo sistema inteligente en la nube.
                    </p>

                    <div className="flex-1 relative z-10">
                        {[
                            {I:ShoppingCart, t:"Punto de Venta", d:"POS táctil, facturación fiscal NFC, comandas y múltiples métodos de pago."},
                            {I:Package, t:"Inventario & Logística", d:"Stock multicentro, alertas de reposición y escaneo de códigos de barras."},
                            {I:Calculator, t:"Contabilidad & Finanzas", d:"CxC, CxP, conciliación bancaria, presupuestos y cierre contable."},
                            {I:Users, t:"RRHH & Nómina LOTTT", d:"Control de asistencia, nómina, vacaciones, utilidades y expedientes digitales."},
                            {I:FileText, t:"Facturación & Fiscal", d:"IVA, IGTF, retenciones, documentos electrónicos y reportes SENIAT."},
                            {I:Scale, t:"Legal & Permisología", d:"Contratos inteligentes, 48+ permisos, compliance corporativo y firma digital."},
                            {I:PhoneCall, t:"Telecomunicaciones", d:"Mi Línea 5G: eSIM corporativa, gestión de flotas y comunicación unificada."},
                            {I:Globe, t:"Marketing & E-commerce", d:"Brand-kit, tienda online, CRM y automatización de campañas digitales."},
                            {I:Recycle, t:"Sostenibilidad & ESG", d:"Cero Papel, huella de carbono, Eco-Créditos y Smart Bins con IA."},
                            {I:ChartColumn, t:"IA & Automatización", d:"Dashboards predictivos, alertas inteligentes y API para integraciones."}
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex items-start gap-3 py-2 border-b border-zinc-800/40 last:border-b-0">
                                <div className="mt-0.5 shrink-0">
                                    <I className="h-3.5 w-3.5 text-cyan-400/70" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest leading-tight">{t}</h5>
                                    <p className="text-[7.5px] text-zinc-500 font-bold leading-tight">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 relative z-10 pt-3 border-t border-zinc-800">
                        <div className="flex justify-between items-center px-1">
                             <div className="text-center"><p className="text-[9px] font-black tracking-[0.25em] text-zinc-500">UN SISTEMA</p></div>
                             <div className="h-px w-4 bg-zinc-700" />
                             <div className="text-center"><p className="text-[9px] font-black tracking-[0.25em] text-cyan-400">INFINITAS SOLUCIONES</p></div>
                        </div>
                    </div>
                </div>

                {/* P2 (C1-Center, Back Cover): CIERRE Y ACCIÓN (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-6 flex flex-col relative z-10 bg-[#09090b] min-h-0">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                        <img src="/images/logo-black.png" alt="Logo Fondo" className="w-[450px] h-[450px] object-contain opacity-20" />
                    </div>
                    
                    <div className="mb-4">
                        <span className="inline-block text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-2">— El Siguiente Paso</span>
                        <h3 className="text-[20px] font-black uppercase tracking-tighter text-white leading-tight">ÚNETE A LA<br/><span className="text-cyan-400">EVOLUCIÓN.</span></h3>
                    </div>

                    <div className="space-y-4 flex-1">
                        <p className="text-[14px] text-white leading-tight text-justify font-black">
                            No dejes que el caos administrativo frene el potencial de tu empresa. Con System Kyron, adquieres <span className="text-cyan-400">orden, rapidez y transparencia</span> desde el primer día.
                        </p>

                        <div className="p-4 bg-cyan-950/20 rounded-2xl border border-cyan-500/20 mt-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Shield className="h-16 w-16 text-cyan-400" />
                            </div>
                            <h5 className="text-[13px] font-black text-cyan-400 uppercase tracking-widest mb-3">Nuestra Promesa</h5>
                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start gap-3 text-[12px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-5 w-5 text-cyan-400 shrink-0" /> Soporte técnico humano, local y siempre disponible.
                                </li>
                                <li className="flex items-start gap-3 text-[12px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-5 w-5 text-cyan-400 shrink-0" /> Capacitación total para ti y todo tu equipo.
                                </li>
                                <li className="flex items-start gap-3 text-[12px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-5 w-5 text-cyan-400 shrink-0" /> Compromiso Sostenible: Modelo 'Cero Papel' que elimina desperdicios físicos y protege el medio ambiente.
                                </li>
                                <li className="flex items-start gap-3 text-[12px] text-white font-bold leading-tight">
                                    <CircleCheck className="h-5 w-5 text-cyan-400 shrink-0" /> Migración de datos sin perder tu información actual.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-end pt-4 border-t border-zinc-800">
                        <img src="/images/logo-black.png" alt="Kyron Mini" className="h-12 w-12 opacity-30 object-contain" />
                        <div className="text-right">
                            <p className="text-[12px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-1">Contacto Directo</p>
                            <p className="text-[18px] text-white font-black uppercase tracking-widest">0424-1846016</p>
                            <p className="text-[13px] text-zinc-300 font-black tracking-wide flex items-center justify-end gap-1.5 mt-1">
                                <Instagram className="h-3 w-3 text-cyan-400" /> @systemkyron
                            </p>
                            <p className="text-[11px] text-zinc-400 font-bold tracking-tight">systemkyronofficial@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* P3 (C1-Right, Front Cover): PORTADA (Ancho: 3.69in) */}
                <div className="w-[3.69in] p-6 flex flex-col relative z-10 overflow-hidden bg-black min-h-0">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <img src="/images/logo-black.png" alt="Kyron" className="h-12 w-12 object-contain opacity-90" />
                            <div className="flex flex-col items-end">
                                <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-white mb-1 shadow-lg">Presentación Oficial</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-8 bg-cyan-500 inline-block" /> Plataforma Empresarial
                            </p>
                            <h1 className="text-[48px] font-black uppercase tracking-tighter leading-[0.9] mb-3 text-white">System<br/><span className="text-zinc-500">Kyron.</span></h1>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium border-l-2 border-cyan-500 pl-3">
                                El aliado digital definitivo que centraliza y optimiza todas las operaciones de tu negocio.
                            </p>
                        </div>

                        <div className="flex-1 min-h-0" />

                        <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800/60 p-4 flex flex-col items-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 text-center">CONOCE MÁS DE NUESTRO SISTEMA</p>
                            
                            <div className="flex flex-col gap-4 w-full items-center">
                                {/* QR Principal */}
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="p-1.5 bg-white rounded-xl">
                                        <img src={QR_PRINCIPAL} alt="Portal" className="rounded-lg w-[90px] h-[90px]" />
                                    </div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-400">Plataforma Principal</p>
                                </div>

                                {/* QRs de Acción */}
                                <div className="flex justify-between w-full px-4 pt-2 border-t border-white/5">
                                    <div className="flex flex-col items-center gap-1 group">
                                        <div className="p-1.5 bg-white rounded-xl">
                                            <img src={QR_INSTAGRAM} alt="Instagram" className="rounded-lg w-[55px] h-[55px]" />
                                        </div>
                                        <p className="text-[8px] font-black uppercase tracking-[0.15em] text-pink-500">Instagram</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 group">
                                        <div className="p-1.5 bg-white rounded-xl">
                                            <img src={QR_FEEDBACK} alt="Encuesta" className="rounded-lg w-[55px] h-[55px]" />
                                        </div>
                                        <p className="text-[8px] font-black uppercase tracking-[0.15em] text-amber-400">Tu Encuesta</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[9px] text-zinc-400 font-bold flex items-center gap-1.5 mt-3">
                                <ScanLine className="h-4 w-4 text-cyan-500" /> Escaneo de Seguridad Activo
                            </p>
                        </div>

                        <div className="mt-4 flex justify-between items-center px-1">
                            <div className="flex flex-col">
                                <p className="text-[10px] text-zinc-500 tracking-widest font-black uppercase">system-kyron.vercel.app</p>
                                <p className="text-[9px] text-cyan-500/60 font-black uppercase tracking-[0.2em] flex items-center gap-1 mt-0.5">
                                    <Instagram className="h-2.5 w-2.5" /> @systemkyron
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <div className="h-1 w-1 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                <div className="h-1 w-1 rounded-full bg-zinc-700" />
                                <div className="h-1 w-1 rounded-full bg-zinc-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CARA 2: INTERIOR (Paneles: Problemas, Módulos, Innovación) --- */}
            <div 
                id="cara-interior" 
                className="w-[11in] h-[8.5in] bg-[#09090b] text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex shrink-0 overflow-hidden print:shadow-none relative font-[family-name:var(--font-outfit)]"
            >
                
                {/* P4 (C2-Left, Inside Left): PROBLEMAS CRÍTICOS (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-6 flex flex-col relative z-10 bg-black/40 min-h-0">
                    <div className="mb-4">
                        <span className="inline-block text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-2">— El Reto Operativo</span>
                        <h3 className="text-[20px] font-black text-white leading-tight tracking-tighter">Problemas Críticos <br/><span className="text-zinc-500 font-medium">que tu negocio enfrenta.</span></h3>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <div className="pl-3 border-l-2 border-rose-500/50 py-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Activity className="h-3.5 w-3.5 text-rose-400 shrink-0" /> Fuga de Capital Oculta
                            </h4>
                            <p className="text-[10px] text-zinc-400 font-bold leading-snug mt-0.5">
                                Pérdida de mercancía, errores de cobro y descontrol en inventarios generan hasta un 15% de pérdidas mensuales invisibles.
                            </p>
                        </div>
                        <div className="py-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="h-3.5 w-3.5 text-rose-400 shrink-0" /> Caos Administrativo
                            </h4>
                            <p className="text-[10px] text-zinc-400 font-bold leading-snug mt-0.5">
                                Cientos de horas calculando impuestos, nóminas y cierres de caja a mano o en Excel, con riesgo de costosas multas fiscales.
                            </p>
                        </div>
                        <div className="pl-3 border-l-2 border-zinc-700 py-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Cpu className="h-3.5 w-3.5 text-rose-400 shrink-0" /> Sistemas Desconectados
                            </h4>
                            <p className="text-[10px] text-zinc-400 font-bold leading-snug mt-0.5">
                                Programas de facturación y hojas de cálculo que no se comunican entre sí, duplicando el trabajo del equipo.
                            </p>
                        </div>
                        <div className="py-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Smartphone className="h-3.5 w-3.5 text-rose-400 shrink-0" /> Estafas Telefónicas
                            </h4>
                            <p className="text-[10px] text-zinc-400 font-bold leading-snug mt-0.5">
                                Llamadas fraudulentas que suplantan proveedores o bancos, generando pérdidas económicas directas sin dejar rastro.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800">
                        <p className="text-[12px] text-white font-black leading-tight italic">"El fraude y el desorden son los enemigos silenciosos de tu negocio."</p>
                    </div>
                </div>

                {/* P5 (C2-Center, Inside Center): EL ECOSISTEMA (Ancho: 3.69in) */}
                <div className="w-[3.69in] border-r border-zinc-800 p-6 flex flex-col relative z-10 bg-[#09090b] min-h-0">
                    <div className="mb-4">
                        <span className="inline-block text-[9px] font-black uppercase tracking-[0.25em] text-cyan-400 mb-2">◆ Todo Integrado</span>
                        <h3 className="text-[20px] font-black uppercase tracking-tighter text-white leading-tight">El Ecosistema<br/><span className="text-cyan-400 font-medium">Funcional.</span></h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 flex-1 content-start mt-1">
                        {[
                            {I:ShoppingCart, t:"Punto de Venta", d:"POS táctil, facturación fiscal, comandas, NFC y múltiples métodos de pago."},
                            {I:Package, t:"Inventario", d:"Stock multicentro en tiempo real, alertas de reposición, escaneo de barras y transferencias."},
                            {I:Users, t:"RRHH & Nómina", d:"Nómina LOTTT, asistencia biométrica, vacaciones, utilidades y expedientes digitales."},
                            {I:Calculator, t:"Contabilidad", d:"CxC, CxP, conciliación bancaria, flujo de caja, presupuestos y cierre automatizado."},
                            {I:FileText, t:"Facturación", d:"Doc. fiscales electrónicos, IGTF, IVA, retenciones y reportes SENIAT automatizados."},
                            {I:Scale, t:"Legal", d:"Contratos inteligentes, 48+ permisos, compliance corporativo y firma electrónica."},
                            {I:PhoneCall, t:"Telecomunicación", d:"Mi Línea 5G: eSIM empresarial, flotas móviles y comunicación unificada."},
                            {I:Leaf, t:"Sostenibilidad", d:"Cero Papel, huella de carbono, Eco-Créditos y Smart Bins con IA."},
                            {I:ChartColumn, t:"IA & Reportes", d:"Dashboards en tiempo real, KPI's, alertas predictivas y análisis de rentabilidad."}
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex items-start gap-2 p-2">
                                <I className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-black text-white uppercase text-[8px] tracking-widest leading-tight">{t}</h4>
                                    <p className="text-[6.5px] text-zinc-500 font-bold leading-tight mt-0.5">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-zinc-800">
                        <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] text-center leading-tight">
                            El único ecosistema venezolano que integra <span className="text-white">Contabilidad + Legal + Telecom + Sostenibilidad + IA</span>.
                        </p>
                    </div>
                </div>

                {/* P6 (C2-Right, Inside Right): SOLUCIONES PREMIUM (Ancho: 3.62in) */}
                <div className="w-[3.62in] p-6 flex flex-col relative z-10 bg-[#09090b] min-h-0">
                    <div className="mb-4">
                        <span className="inline-block px-2 py-1 bg-cyan-950 rounded-md text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-2 border border-cyan-900 shadow-lg">Tecnología de Punta</span>
                        <h3 className="text-[20px] font-black uppercase tracking-tighter text-white leading-tight">Soluciones<br/><span className="text-cyan-400 font-medium">de Alto Impacto.</span></h3>
                    </div>

                    <div className="space-y-2 flex-1 mt-1">
                        {/* Kyron Shield Card */}
                        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/30">
                            <div className="h-7 w-7 rounded-md bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Scale className="h-3.5 w-3.5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-white uppercase text-[10px] tracking-widest">Kyron Shield</h4>
                                <p className="text-[9px] text-zinc-400 font-bold leading-tight">Blindaje Legal con IA</p>
                            </div>
                        </div>

                        {/* Mi Línea 5G Card */}
                        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/30">
                            <div className="h-7 w-7 rounded-md bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <PhoneCall className="h-3.5 w-3.5 text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-white uppercase text-[10px] tracking-widest">Mi Línea 5G</h4>
                                <p className="text-[9px] text-zinc-400 font-bold leading-tight">Conectividad Corporativa</p>
                            </div>
                        </div>

                        {/* Sostenibilidad Ameru Card */}
                        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/30">
                            <div className="h-7 w-7 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Recycle className="h-3.5 w-3.5 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-white uppercase text-[10px] tracking-widest">Sostenibilidad Ameru</h4>
                                <p className="text-[9px] text-zinc-400 font-bold leading-tight">Inteligencia Verde</p>
                            </div>
                        </div>

                        {/* Kyron Permisología Card */}
                        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/30">
                            <div className="h-7 w-7 rounded-md bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Lock className="h-3.5 w-3.5 text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-white uppercase text-[10px] tracking-widest">Kyron Permisología</h4>
                                <p className="text-[9px] text-zinc-400 font-bold leading-tight">Gestión Documental Inteligente</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800">
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest text-center">
                            Hardware Partners: Star Micronics, Bixolon, OKI, Dascom
                        </p>
                    </div>
                </div>
            </div>
        </div>


        </div>
    );
}


"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { 
    Printer as PrinterIcon, 
    ArrowLeft, 
    Download, 
    Sparkles, 
    QrCode, 
    Bookmark as BookmarkIcon, 
    Circle, 
    Contact,
    Mail,
    Globe,
    Phone,
    MapPin,
    ShieldCheck
} from 'lucide-react';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ResourceHeader } from '@/components/brand/ResourceHeader';

type AssetType = 'stickers' | 'bookmarks' | 'business-cards';

export default function IdentityAssetsPage() {
    const [mounted, setMounted] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [assetType, setAssetType] = useState<AssetType>('stickers');
    
    useEffect(() => {
        setMounted(true);
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
    }, []);

    if (!mounted) return null;

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const element = document.getElementById('assets-sheet');
            if (!element) return;

            // Desactivar efectos para captura ultra-limpia
            const originalStyle = element.getAttribute('style');
            element.style.transform = 'none';
            element.style.transition = 'none';

            const canvas = await html2canvas(element, {
                scale: 4, // Calidad Ultra-HD
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                width: element.offsetWidth,
                height: element.offsetHeight,
                imageTimeout: 0,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById('assets-sheet');
                    if (clonedElement) {
                        clonedElement.style.transform = 'none';
                    }
                }
            });

            if (originalStyle) element.setAttribute('style', originalStyle);

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter',
                compress: true
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'SLOW');
            pdf.save(`System-Kyron-${assetType.charAt(0).toUpperCase() + assetType.slice(1)}-Elite.pdf`);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, intente de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    const qrUrl = "https://system-kyron.vercel.app";
    const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrUrl)}&color=000000&bgcolor=ffffff&margin=2`;

    return (
        <div className="min-h-screen bg-[#030711] text-white font-[family-name:var(--font-outfit)] print:bg-white print:text-black">
            <ResourceHeader />
            
            {/* Toolbar Elite */}
            <div className="p-6 flex flex-col lg:flex-row justify-between items-center bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 print:hidden sticky top-0 z-50 gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">Generador de Identidad Elite</h1>
                        <p className="text-zinc-500 text-[10px] mt-0.5 font-black uppercase tracking-[0.2em]">Asset Engineering System • v2.2 Ultra</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {/* Selector de Tipo */}
                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                        <button 
                            onClick={() => setAssetType('stickers')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                assetType === 'stickers' ? "bg-cyan-600 text-white shadow-lg" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            <Circle className="h-3.5 w-3.5" /> Stickers
                        </button>
                        <button 
                            onClick={() => setAssetType('bookmarks')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                assetType === 'bookmarks' ? "bg-blue-600 text-white shadow-lg" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            <BookmarkIcon className="h-3.5 w-3.5" /> Marca Libros
                        </button>
                        <button 
                            onClick={() => setAssetType('business-cards')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                assetType === 'business-cards' ? "bg-emerald-600 text-white shadow-lg" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            <Contact className="h-3.5 w-3.5" /> Tarjetas
                        </button>
                    </div>

                    <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                        <ArrowLeft className="h-3.5 w-3.5" /> Volver
                    </Link>
                    
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white disabled:opacity-50 text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"
                    >
                        <Download className={`h-3.5 w-3.5 ${isExporting ? 'animate-spin' : ''}`} /> 
                        {isExporting ? 'PROCESANDO...' : 'DESCARGAR PDF'}
                    </button>

                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
                    >
                        <PrinterIcon className="h-3.5 w-3.5" /> IMPRIMIR
                    </button>
                </div>
            </div>

            {/* Preview Banner Premium */}
            <div className="max-w-4xl mx-auto px-6 py-8 print:hidden">
                <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-white/10 rounded-[2.5rem] p-8 flex items-start gap-6 backdrop-blur-xl">
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                        {assetType === 'stickers' && <Circle className="h-8 w-8 text-cyan-400" />}
                        {assetType === 'bookmarks' && <BookmarkIcon className="h-8 w-8 text-blue-400" />}
                        {assetType === 'business-cards' && <Contact className="h-8 w-8 text-emerald-400" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Protocolo de Alta Fidelidad</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                            {assetType === 'stickers' && "Optimizado para troquel circular de 2.25\". Formato de branding para equipos y empaques."}
                            {assetType === 'bookmarks' && "Dimensiones de 2\" x 6\". Ideal para documentación física y material corporativo."}
                            {assetType === 'business-cards' && "Dimensiones estándar de 3.5\" x 2\". Diseño minimalista premium con QR de acceso directo."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hoja de Activos */}
            <div className="pb-20 px-4 print:p-0 flex justify-center">
                <div 
                    id="assets-sheet"
                    className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.6)] print:shadow-none w-[8.5in] h-[11in] p-[0.5in] flex flex-col items-center justify-center overflow-hidden"
                >
                    {assetType === 'stickers' && (
                        <div className="grid grid-cols-3 gap-y-16 gap-x-12">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <StickerItem key={index} qrCodeImage={qrCodeImage} />
                            ))}
                        </div>
                    )}
                    {assetType === 'bookmarks' && (
                        <div className="grid grid-cols-2 gap-y-12 gap-x-16">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <BookmarkItem key={index} qrCodeImage={qrCodeImage} />
                            ))}
                        </div>
                    )}
                    {assetType === 'business-cards' && (
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <BusinessCard key={index} qrCodeImage={qrCodeImage} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Estilos para impresión */}
            <style jsx global>{`
                @media print {
                    @page { size: letter; margin: 0; }
                    body { background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    #assets-sheet {
                        box-shadow: none !important; margin: 0 !important; padding: 0.5in !important;
                        width: 8.5in !important; height: 11in !important;
                        display: flex !important; flex-direction: column !important;
                        align-items: center !important; justify-content: center !important;
                    }
                }
            `}</style>
        </div>
    );
}

function StickerItem({ qrCodeImage }: { qrCodeImage: string }) {
    return (
        <div className="w-[2.25in] h-[2.25in] bg-white rounded-full flex flex-col items-center justify-center relative overflow-hidden break-inside-avoid border-[0.5px] border-zinc-100">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-zinc-200 pointer-events-none z-20 opacity-30" />
            <div className="flex flex-col items-center w-full relative z-10 translate-y-1">
                <div className="relative w-16 h-16 mb-1 flex items-center justify-center overflow-hidden">
                    <img 
                        src="/images/logo-black.png" 
                        alt="Kyron Logo" 
                        className="max-w-full max-h-full object-contain" 
                        style={{ imageRendering: 'auto' }}
                    />
                </div>
                <div className="flex flex-col items-center mb-4">
                    <h2 className="text-black font-black uppercase tracking-[-0.05em] text-[22px] leading-none text-center">System</h2>
                    <span className="text-cyan-600 font-black uppercase text-[18px] tracking-[0.18em] leading-none mt-1">Kyron</span>
                </div>
                <div className="p-3 bg-white border border-zinc-100 rounded-[2rem] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    <img src={qrCodeImage} alt="QR" className="w-20 h-20" crossOrigin="anonymous" />
                </div>
                <div className="mt-4 flex items-center gap-1.5 opacity-20">
                    <div className="h-[1px] w-4 bg-black" />
                    <span className="text-[6px] font-black uppercase tracking-widest text-black">Authentic Identity</span>
                    <div className="h-[1px] w-4 bg-black" />
                </div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rotate-12 border-[0.5px] border-zinc-900 rounded-[4rem]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 -rotate-12 border-[0.5px] border-zinc-900 rounded-[4rem]" />
            </div>
        </div>
    );
}

function BookmarkItem({ qrCodeImage }: { qrCodeImage: string }) {
    return (
        <div className="w-[2in] h-[6in] bg-white border border-zinc-200 flex flex-col items-center justify-between p-8 relative overflow-hidden break-inside-avoid">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-zinc-50 border-r border-zinc-100" />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-zinc-50 border-l border-zinc-100" />
            <div className="flex flex-col items-center gap-4 relative z-10 pt-4">
                <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 flex items-center justify-center p-4 shadow-2xl">
                    <img 
                        src="/images/logo-kyron-hq.png" 
                        alt="Kyron Logo" 
                        className="max-w-full max-h-full object-contain" 
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-black font-black uppercase tracking-tighter text-3xl leading-none">KYRON</h2>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 mt-2">Elite System</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                    <img src={qrCodeImage} alt="QR" className="w-24 h-24" crossOrigin="anonymous" />
                </div>
            </div>
            <div className="text-center relative z-10 pb-4">
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Innovación Empresarial</p>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[7px] font-black uppercase text-zinc-300">Reto InspiraVe 2026</span>
                </div>
            </div>
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none z-0 flex flex-col items-center justify-around">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="text-[40px] font-black text-black rotate-[-45deg] whitespace-nowrap">KYRON SYSTEM</div>
                ))}
            </div>
        </div>
    );
}

function BusinessCard({ qrCodeImage }: { qrCodeImage: string }) {
    return (
        <div className="w-[3.5in] h-[2in] bg-white border-[0.5px] border-zinc-200 flex p-6 relative overflow-hidden break-inside-avoid shadow-sm">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 -mr-16 -mt-16 rounded-full opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-50 -ml-12 -mb-12 rounded-full opacity-30" />
            
            <div className="flex-1 flex flex-col justify-between relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 flex items-center justify-center overflow-hidden">
                        <img src="/images/logo-black.png" alt="Kyron" className="max-w-full max-h-full object-contain" />
                    </div>
                        <div className="h-4 w-[1px] bg-zinc-200" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-600">Elite</span>
                    </div>
                    <h2 className="text-black font-black uppercase tracking-tight text-xl leading-none">Carlos Mattar</h2>
                    <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Founder & CEO · System Kyron</p>
                </div>
                
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <Mail className="h-2.5 w-2.5 text-cyan-600" />
                        <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider">systemkyronofficial@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="h-2.5 w-2.5 text-cyan-600" />
                        <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider">www.system-kyron.app</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-2.5 w-2.5 text-cyan-600" />
                        <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider">Caracas, Venezuela</span>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-3 pl-6 border-l border-zinc-100 relative z-10">
                <div className="p-2 bg-white border border-zinc-100 rounded-xl shadow-md">
                    <img src={qrCodeImage} alt="QR" className="w-16 h-16" crossOrigin="anonymous" />
                </div>
                <div className="flex items-center gap-1 opacity-40">
                    <ShieldCheck className="h-2 w-2 text-zinc-900" />
                    <span className="text-[5px] font-black uppercase tracking-widest text-black">Secure ID</span>
                </div>
            </div>
            
            {/* Identity line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        </div>
    );
}

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

            // Renderizar el PDF con un factor de escala alto para nitidez extrema
            const canvas = await html2canvas(element, {
                scale: 3, // Balance entre calidad y tamaño de archivo
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                imageTimeout: 15000, // Dar tiempo a que carguen los assets externos
                onclone: (clonedDoc) => {
                    const clonedSheet = clonedDoc.getElementById('assets-sheet');
                    if (clonedSheet) {
                        // Forzar estilos ultra-limpios para la captura
                        clonedSheet.style.transform = 'none';
                        clonedSheet.style.margin = '0';
                        clonedSheet.style.padding = '0.5in';
                        
                        // Asegurar que las imágenes tengan crossOrigin si es necesario
                        const imgs = clonedSheet.getElementsByTagName('img');
                        for (let i = 0; i < imgs.length; i++) {
                            imgs[i].style.display = 'block';
                            imgs[i].style.maxWidth = '100%';
                        }
                    }
                }
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11, undefined, 'FAST');
            pdf.save(`System-Kyron-${assetType.charAt(0).toUpperCase() + assetType.slice(1)}.pdf`);

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

            {/* Toolbar System Kyron */}
            <div className="p-6 flex flex-col lg:flex-row justify-between items-center bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 print:hidden sticky top-0 z-50 gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">System Kyron | Asset Hub</h1>
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
            <div className="max-w-6xl mx-auto px-6 py-8 print:hidden grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-white/10 rounded-[2.5rem] p-8 flex items-start gap-6 backdrop-blur-xl h-full">
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

                {/* Animated Glass Preview for Business Cards */}
                {assetType === 'business-cards' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/20 p-1 rounded-[2rem] overflow-hidden shadow-2xl">
                             <div className="transform scale-75 origin-top-left -mb-[25%] -mr-[25%] pointer-events-none">
                                <BusinessCard qrCodeImage={qrCodeImage} />
                             </div>
                             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full flex items-center gap-2">
                             <Sparkles className="h-3 w-3 text-cyan-400" />
                             <span className="text-[8px] font-black uppercase tracking-widest text-white">Live Preview</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Hoja de Activos */}
            <div className="pb-20 px-4 print:p-0 flex justify-center">
                <div
                    id="assets-sheet"
                    className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.6)] print:shadow-none w-[8.5in] h-[11in] p-[0.5in] flex flex-col items-center justify-center overflow-hidden"
                >
                    {assetType === 'stickers' && (
                        <div className="grid grid-cols-3 gap-y-6 gap-x-4 place-items-center">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <StickerItem key={index} qrCodeImage={qrCodeImage} />
                            ))}
                        </div>
                    )}
                    {assetType === 'bookmarks' && (
                        <div className="flex gap-8 justify-center items-center w-full h-full">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <BookmarkItem key={index} qrCodeImage={qrCodeImage} />
                            ))}
                        </div>
                    )}
                    {assetType === 'business-cards' && (
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {Array.from({ length: 8 }).map((_, index) => (
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
        <div className="w-[2.25in] h-[2.25in] bg-white rounded-full flex flex-col items-center justify-center relative overflow-hidden break-inside-avoid border border-zinc-200 shadow-sm">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-zinc-200 pointer-events-none z-20 opacity-30" />
            <div className="flex flex-col items-center w-full relative z-10 pt-1">
                <div className="relative w-10 h-10 mb-1.5 flex items-center justify-center">
                    <img
                        src="/images/logo-black.png"
                        alt="Kyron Logo"
                        className="max-w-full max-h-full object-contain"
                        style={{ imageRendering: 'auto' }}
                    />
                </div>
                <div className="flex flex-col items-center mb-3">
                    <h2 className="text-black font-black uppercase tracking-tight text-[16px] leading-none text-center">System</h2>
                    <span className="text-cyan-600 font-black uppercase text-[12px] tracking-[0.15em] leading-none mt-1">Kyron</span>
                </div>
                <div className="p-1.5 bg-white border border-zinc-100 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    <img src={qrCodeImage} alt="QR" className="w-12 h-12" crossOrigin="anonymous" />
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 opacity-30">
                    <div className="h-[1px] w-3 bg-black" />
                    <span className="text-[5px] font-black uppercase tracking-widest text-black">Authentic Identity</span>
                    <div className="h-[1px] w-3 bg-black" />
                </div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rotate-12 border-[0.5px] border-zinc-900 rounded-[2rem]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 -rotate-12 border-[0.5px] border-zinc-900 rounded-[2rem]" />
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
                <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-950 flex items-center justify-center p-3 shadow-2xl">
                    <img 
                        src="/images/logo-kyron-hq.png" 
                        alt="Kyron Logo" 
                        className="max-w-full max-h-full object-contain" 
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-black font-black uppercase tracking-tight text-[10px] leading-none mb-1 opacity-40">System</h2>
                    <h2 className="text-black font-black uppercase tracking-tighter text-3xl leading-none">Kyron</h2>
                </div>
            </div>

            {/* Dedication Message */}
            <div className="relative z-10 px-4 text-center">
                <div className="h-px w-8 bg-zinc-100 mx-auto mb-4" />
                <p className="text-[10px] font-medium text-zinc-500 leading-relaxed italic">
                    "Para aquellos que se atreven a soñar en grande y construir el futuro de Venezuela. Sigue adelante."
                </p>
                <div className="h-px w-8 bg-zinc-100 mx-auto mt-4" />
            </div>
            <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="p-3 bg-white border border-zinc-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                    <img src={qrCodeImage} alt="QR" className="w-14 h-14" crossOrigin="anonymous" />
                </div>
                <p className="text-[7px] font-black uppercase tracking-widest text-zinc-300">Escanear para acceso</p>
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
        <div className="w-[3.5in] h-[2in] bg-white border border-zinc-100 flex p-8 relative overflow-hidden break-inside-avoid shadow-sm font-[family-name:var(--font-outfit)]">
            {/* Left Content Area */}
            <div className="flex-1 flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                    {/* Header Branding */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 flex items-center justify-center p-1 bg-zinc-950 rounded-xl shadow-lg">
                            <img src="/images/logo-transparent.png" alt="Kyron" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="h-6 w-[1px] bg-zinc-100" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600">System Kyron</span>
                    </div>

                    {/* Person Information */}
                    <div>
                        <h2 className="text-black font-black uppercase tracking-tighter text-3xl leading-none mb-1">Carlos Mattar</h2>
                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] italic">Founder & CEO · System Kyron</p>
                    </div>
                </div>

                {/* Contact Information List */}
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-lg bg-zinc-50 flex items-center justify-center">
                            <Mail className="h-2.5 w-2.5 text-cyan-600" />
                        </div>
                        <span className="text-[7.5px] font-bold text-zinc-600 uppercase tracking-widest">systemkyronofficial@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-lg bg-zinc-50 flex items-center justify-center">
                            <Phone className="h-2.5 w-2.5 text-cyan-600" />
                        </div>
                        <div className="flex gap-3">
                            <span className="text-[7.5px] font-bold text-zinc-600 uppercase tracking-widest">+58 424-1846016</span>
                            <div className="w-[1px] h-3 bg-zinc-100" />
                            <span className="text-[7.5px] font-bold text-zinc-400 uppercase tracking-widest">0212-3510609</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - QR Code and ID */}
            <div className="w-1/3 flex flex-col items-center justify-center border-l border-zinc-50/50 pl-6">
                <div className="relative mb-4">
                    <div className="absolute -inset-4 bg-zinc-400/5 blur-2xl rounded-full" />
                    <div className="p-4 bg-white border border-zinc-100 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)] relative z-10">
                        <img src={qrCodeImage} alt="QR" className="w-20 h-20 object-contain" crossOrigin="anonymous" />
                    </div>
                </div>
                <div className="flex items-center gap-1.5 opacity-40">
                    <ShieldCheck className="h-3 w-3 text-zinc-900" />
                    <span className="text-[6px] font-black uppercase tracking-[0.3em] text-black">Secure ID</span>
                </div>
            </div>

            {/* Subtle background texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.02] -mr-16 -mt-16 rounded-full blur-3xl" />
        </div>
    );
}

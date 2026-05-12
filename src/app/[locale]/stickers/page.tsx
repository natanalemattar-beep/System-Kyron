"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Printer as PrinterIcon, ArrowLeft, Download, Sparkles, QrCode } from 'lucide-react';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickersPage() {
    const [mounted, setMounted] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    
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

            const element = document.getElementById('stickers-sheet');
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 3, // High quality
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('System-Kyron-Stickers-Oficiales.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, intente de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    const stickersArray = Array.from({ length: 12 });
    const qrUrl = "https://system-kyron.vercel.app";
    const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}&color=000000&bgcolor=ffffff&margin=1`;

    return (
        <div className="min-h-screen bg-[#030711] text-white font-[family-name:var(--font-outfit)] print:bg-white print:text-black">
            
            {/* Toolbar No Imprimible */}
            <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 print:hidden sticky top-0 z-50 gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">Generador Elite de Stickers</h1>
                        <p className="text-zinc-500 text-xs mt-0.5 font-medium uppercase tracking-widest">System Kyron Digital Identity Assets</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/5">
                        <ArrowLeft className="h-3.5 w-3.5" /> Volver
                    </Link>
                    
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-zinc-700 shadow-xl"
                    >
                        <Download className={`h-3.5 w-3.5 ${isExporting ? 'animate-bounce' : ''}`} /> 
                        {isExporting ? 'Generando...' : 'Descargar PDF'}
                    </button>

                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_25px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95"
                    >
                        <PrinterIcon className="h-3.5 w-3.5" /> Imprimir Ahora
                    </button>
                </div>
            </div>

            {/* Preview Banner */}
            <div className="max-w-4xl mx-auto px-6 py-8 print:hidden">
                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-3xl p-6 flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl">
                        <PrinterIcon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">Instrucciones de Impresión</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Para obtener resultados óptimos, utilice **papel adhesivo brillante o mate (Letter/Carta)**. 
                            Asegúrese de configurar la escala al **100% (Tamaño Real)** en los ajustes de impresión para que los stickers mantengan su dimensión original.
                        </p>
                    </div>
                </div>
            </div>

            {/* Hoja de Stickers (Formato Carta) */}
            <div className="pb-20 px-4 print:p-0 flex justify-center">
                <div 
                    id="stickers-sheet"
                    className="bg-white shadow-[0_0_80px_rgba(0,0,0,0.5)] print:shadow-none w-[8.5in] min-h-[11in] p-[0.75in] origin-top transform transition-transform duration-500"
                >
                    <div className="grid grid-cols-3 gap-y-12 gap-x-12">
                        {stickersArray.map((_, index) => (
                            <div 
                                key={index} 
                                className="aspect-square bg-white border border-zinc-200 rounded-full flex flex-col items-center justify-center p-12 relative overflow-hidden break-inside-avoid shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
                            >
                                {/* Borde de corte sutil */}
                                <div className="absolute inset-0 rounded-full border border-zinc-100 pointer-events-none" />
                                
                                <div className="flex flex-col items-center w-full relative z-10 translate-y-2">
                                    {/* Logo Principal - Aumentado significativamente */}
                                    <div className="relative w-28 h-16 mb-2 flex items-center justify-center">
                                        <img 
                                            src="/images/logo-black.png" 
                                            alt="Kyron Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col items-center mb-5">
                                        <h2 className="text-black font-black uppercase tracking-[-0.05em] text-[20px] leading-none text-center">
                                            System
                                        </h2>
                                        <span className="text-cyan-600 font-black uppercase text-[18px] tracking-[0.15em] leading-none mt-1">Kyron</span>
                                    </div>

                                    {/* QR Code - Un poco más grande al quitar el texto */}
                                    <div className="p-3 bg-white border border-zinc-100 rounded-[1.75rem] shadow-[0_6px_15px_rgba(0,0,0,0.06)]">
                                        <img 
                                            src={qrCodeImage} 
                                            alt="QR" 
                                            className="w-20 h-20"
                                            crossOrigin="anonymous"
                                        />
                                    </div>
                                </div>

                                {/* Subtle background pattern */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none z-0">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rotate-12 border-[0.5px] border-zinc-900 rounded-[4rem]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Estilos para impresión */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: letter;
                        margin: 0;
                    }
                    body {
                        background-color: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    #stickers-sheet {
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 0.75in !important;
                        width: 8.5in !important;
                        min-height: 11in !important;
                    }
                }
            `}</style>
        </div>
    );
}

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
                    const clonedElement = clonedDoc.getElementById('stickers-sheet');
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
            pdf.save('System-Kyron-Stickers-Premium.pdf');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, intente de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    const stickersArray = Array.from({ length: 12 });
    const qrUrl = "https://system-kyron.vercel.app";
    // QR de alta resolución con margen para evitar errores de lectura
    const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrUrl)}&color=000000&bgcolor=ffffff&margin=2`;

    return (
        <div className="min-h-screen bg-[#030711] text-white font-[family-name:var(--font-outfit)] print:bg-white print:text-black">
            
            {/* Toolbar Elite */}
            <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 print:hidden sticky top-0 z-50 gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">Activos de Identidad Kyron</h1>
                        <p className="text-zinc-500 text-[10px] mt-0.5 font-black uppercase tracking-[0.2em]">Asset Generation Engine • v2.0 Premium</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                        <ArrowLeft className="h-3.5 w-3.5" /> Volver
                    </Link>
                    
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white disabled:opacity-50 text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"
                    >
                        <Download className={`h-3.5 w-3.5 ${isExporting ? 'animate-spin' : ''}`} /> 
                        {isExporting ? 'PROCESANDO...' : 'DESCARGAR PDF ELITE'}
                    </button>

                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_10px_25px_rgba(6,182,212,0.3)]"
                    >
                        <PrinterIcon className="h-3.5 w-3.5" /> IMPRIMIR AHORA
                    </button>
                </div>
            </div>

            {/* Preview Banner Premium */}
            <div className="max-w-4xl mx-auto px-6 py-8 print:hidden">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[2.5rem] p-8 flex items-start gap-6 backdrop-blur-xl">
                    <div className="p-4 bg-cyan-500/20 rounded-3xl border border-cyan-500/30">
                        <PrinterIcon className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Protocolo de Alta Fidelidad</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                            Este documento ha sido optimizado para **impresión láser de alta resolución**. 
                            Use papel adhesivo de grado premium (Glossy/Mate). La cuadrícula ha sido calibrada para un corte perfecto con troquel circular de 2.25".
                        </p>
                    </div>
                </div>
            </div>

            {/* Hoja de Stickers (Formato Carta Oficial) */}
            <div className="pb-20 px-4 print:p-0 flex justify-center">
                <div 
                    id="stickers-sheet"
                    className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.6)] print:shadow-none w-[8.5in] h-[11in] p-[0.5in] flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="grid grid-cols-3 gap-y-16 gap-x-12">
                        {stickersArray.map((_, index) => (
                            <div 
                                key={index} 
                                className="w-[2.25in] h-[2.25in] bg-white rounded-full flex flex-col items-center justify-center relative overflow-hidden break-inside-avoid border-[0.5px] border-zinc-100"
                            >
                                {/* Anillo de Corte de Precisión */}
                                <div className="absolute inset-0 rounded-full border-[1.5px] border-zinc-200 pointer-events-none z-20 opacity-30" />
                                
                                {/* Contenido Central */}
                                <div className="flex flex-col items-center w-full relative z-10 translate-y-1">
                                    
                                    {/* Logo HQ */}
                                    <div className="relative w-24 h-12 mb-2 flex items-center justify-center">
                                        <img 
                                            src="/images/logo-black.png" 
                                            alt="Kyron Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col items-center mb-4">
                                        <h2 className="text-black font-black uppercase tracking-[-0.05em] text-[22px] leading-none text-center">
                                            System
                                        </h2>
                                        <span className="text-cyan-600 font-black uppercase text-[18px] tracking-[0.18em] leading-none mt-1">Kyron</span>
                                    </div>

                                    {/* QR Code de Alta Fidelidad */}
                                    <div className="p-3 bg-white border border-zinc-100 rounded-[2rem] shadow-[0_8px_20px_rgba(0,0,0,0.06)] ring-1 ring-zinc-50">
                                        <img 
                                            src={qrCodeImage} 
                                            alt="QR SCANNABLE" 
                                            className="w-20 h-20"
                                            crossOrigin="anonymous"
                                        />
                                    </div>
                                    
                                    <div className="mt-4 flex items-center gap-1.5 opacity-20">
                                        <div className="h-[1px] w-4 bg-black" />
                                        <span className="text-[6px] font-black uppercase tracking-widest text-black">Authentic Identity</span>
                                        <div className="h-[1px] w-4 bg-black" />
                                    </div>
                                </div>

                                {/* Patrón de Seguridad de Fondo (Watermark) */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rotate-12 border-[0.5px] border-zinc-900 rounded-[4rem]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 -rotate-12 border-[0.5px] border-zinc-900 rounded-[4rem]" />
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
                        padding: 0.5in !important;
                        width: 8.5in !important;
                        height: 11in !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                    }
                }
            `}</style>
        </div>
    );
}

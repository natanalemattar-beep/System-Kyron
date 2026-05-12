"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Printer as PrinterIcon, ArrowLeft } from 'lucide-react';
import { Link } from '@/navigation';

export default function StickersPage() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        // Permitir scroll libre para ver todos los stickers
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
    }, []);

    if (!mounted) return null;

    const handlePrint = () => {
        window.print();
    };

    // Generamos un arreglo de 24 stickers (4 columnas x 6 filas) para llenar una página carta
    const stickersArray = Array.from({ length: 24 });

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-[family-name:var(--font-outfit)] print:bg-white print:text-black">
            
            {/* Toolbar No Imprimible */}
            <div className="p-6 flex justify-between items-center bg-zinc-900 border-b border-zinc-800 print:hidden sticky top-0 z-50">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Generador de Stickers</h1>
                    <p className="text-zinc-400 text-sm mt-1">Imprime esta página en papel adhesivo para tener stickers oficiales de System Kyron.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-bold transition-all">
                        <ArrowLeft className="h-4 w-4" /> Volver
                    </Link>
                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                        <PrinterIcon className="h-4 w-4" /> Imprimir Stickers
                    </button>
                </div>
            </div>

            {/* Hoja de Stickers (Formato A4/Carta) */}
            <div className="p-8 mx-auto w-full max-w-[8.5in] print:p-0 print:m-0 print:max-w-none">
                <div className="grid grid-cols-4 gap-4 print:gap-2">
                    {stickersArray.map((_, index) => (
                        <div 
                            key={index} 
                            className="aspect-square bg-white border-2 border-dashed border-zinc-300 print:border-solid print:border-zinc-200 rounded-full flex flex-col items-center justify-center p-4 relative overflow-hidden break-inside-avoid"
                        >
                            {/* Borde de corte */}
                            <div className="absolute inset-1 rounded-full border border-zinc-100 print:border-zinc-100 pointer-events-none" />
                            
                            <div className="relative w-16 h-16 mb-2">
                                <Image 
                                    src="/images/logo-black.png" 
                                    alt="Kyron Logo" 
                                    fill 
                                    className="object-contain" 
                                />
                            </div>
                            <h2 className="text-black font-black uppercase tracking-tighter text-[11px] leading-none text-center">
                                System<br/>
                                <span className="text-zinc-500 text-[10px]">Kyron</span>
                            </h2>
                            <p className="text-[6px] font-bold text-zinc-400 tracking-[0.2em] mt-1 uppercase">system-kyron.vercel.app</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Estilos para impresión */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: letter;
                        margin: 0.5in;
                    }
                    body {
                        background-color: white !important;
                    }
                }
            `}</style>
        </div>
    );
}

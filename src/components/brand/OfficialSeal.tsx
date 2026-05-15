'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

export function OfficialSeal({ className }: { className?: string }) {
    const sealRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = useCallback(async () => {
        if (!sealRef.current) return;
        setDownloading(true);
        try {
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(sealRef.current, {
                width: 800,
                height: 800,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
            });
            const link = document.createElement('a');
            link.download = 'sello-system-kyron.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Error downloading seal:', err);
        } finally {
            setDownloading(false);
        }
    }, []);

    return (
        <div className="flex flex-col items-center gap-8">
            {/* Seal */}
            <div
                ref={sealRef}
                className={cn(
                    "relative w-72 h-72 lg:w-80 lg:h-80 rounded-full",
                    "bg-white text-[#1e293b]",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(0,0,0,0.06)]",
                    className
                )}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer double ring */}
                    <circle cx="200" cy="200" r="190" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <circle cx="200" cy="200" r="183" fill="none" stroke="#1e293b" strokeWidth="0.75" />

                    {/* Tick marks around edge (notary style) */}
                    {Array.from({ length: 48 }).map((_, i) => {
                        const angle = (i * 7.5) - 90;
                        const rad = (angle * Math.PI) / 180;
                        const isMajor = i % 4 === 0;
                        const r1 = isMajor ? 186 : 189;
                        const r2 = isMajor ? 175 : 180;
                        return (
                            <line key={i}
                                x1={200 + r1 * Math.cos(rad)} y1={200 + r1 * Math.sin(rad)}
                                x2={200 + r2 * Math.cos(rad)} y2={200 + r2 * Math.sin(rad)}
                                stroke="#1e293b" strokeWidth={isMajor ? 2 : 0.8} />
                        );
                    })}

                    {/* Inner ring */}
                    <circle cx="200" cy="200" r="155" fill="none" stroke="#1e293b" strokeWidth="0.5" />

                    {/* Top arc: REPUBLICA BOLIVARIANA DE VENEZUELA */}
                    <path id="top-arc" d="M 55 200 A 145 145 0 0 1 345 200" fill="none" />
                    <text fontSize="10.5" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" fill="#1e293b" letterSpacing="3.5">
                        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">REPÚBLICA BOLIVARIANA DE VENEZUELA</textPath>
                    </text>

                    {/* Bottom arc: SYSTEM KYRON */}
                    <path id="bottom-arc" d="M 345 200 A 145 145 0 0 1 55 200" fill="none" />
                    <text fontSize="15" fontWeight="900" fontFamily="Georgia, 'Times New Roman', serif" fill="#1e293b" letterSpacing="5">
                        <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
                    </text>

                    {/* Star top center */}
                    <text x="200" y="108" textAnchor="middle" fontSize="16" fill="#1e293b" fontFamily="Georgia, serif">★</text>

                    {/* Logo in center */}
                    <image href="/images/logo-kyron-hq.png" x="148" y="145" width="104" height="104" />

                    {/* Official text below logo */}
                    <text x="200" y="280" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" fill="#1e293b" letterSpacing="2">
                        RIF J-50832149-9
                    </text>
                    <text x="200" y="296" textAnchor="middle" fontSize="7.5" fontWeight="600" fontFamily="Arial, sans-serif" fill="#1e293b" letterSpacing="2.5">
                        EMPRENDIMIENTO CARLOS MATTAR
                    </text>

                    {/* Bottom star */}
                    <text x="200" y="318" textAnchor="middle" fontSize="8" fill="#1e293b" fontFamily="Georgia, serif">✦</text>
                </svg>
            </div>

            {/* Download button */}
            <button
                onClick={handleDownload}
                disabled={downloading}
                className={cn(
                    "flex items-center gap-2.5 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all",
                    "bg-[#1e293b] hover:bg-[#0f172a] text-white",
                    "shadow-lg hover:shadow-xl",
                    downloading && "opacity-50 cursor-not-allowed"
                )}
            >
                <Download className="h-4 w-4" />
                {downloading ? 'Descargando...' : 'Descargar Sello PNG'}
            </button>
        </div>
    );
}

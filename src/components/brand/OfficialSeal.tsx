'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Download, FileText, FileImage } from 'lucide-react';

export function OfficialSeal({ className }: { className?: string }) {
    const sealRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState<string | null>(null);

    const getPngData = useCallback(async () => {
        if (!sealRef.current) return null;
        const { toPng } = await import('html-to-image');
        return toPng(sealRef.current, {
            width: 800, height: 800, pixelRatio: 2, backgroundColor: '#ffffff',
        });
    }, []);

    const downloadPng = useCallback(async () => {
        setDownloading('png');
        try {
            const dataUrl = await getPngData();
            if (!dataUrl) return;
            const link = document.createElement('a');
            link.download = 'sello-system-kyron.png';
            link.href = dataUrl;
            link.click();
        } finally { setDownloading(null); }
    }, [getPngData]);

    const downloadPdf = useCallback(async () => {
        setDownloading('pdf');
        try {
            const dataUrl = await getPngData();
            if (!dataUrl) return;
            const { default: jsPDF } = await import('jspdf');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgSize = 80;
            const x = (pageWidth - imgSize) / 2;
            pdf.addImage(dataUrl, 'PNG', x, 20, imgSize, imgSize);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
            pdf.text('REPÚBLICA BOLIVARIANA DE VENEZUELA', pageWidth / 2, 115, { align: 'center' });
            pdf.setFontSize(11);
            pdf.text('System Kyron - Sello Oficial', pageWidth / 2, 125, { align: 'center' });
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.text('RIF J-50832149-9 | Emprendimiento Carlos Mattar', pageWidth / 2, 135, { align: 'center' });
            pdf.text('Este documento ha sido firmado electrónicamente con el sello oficial de System Kyron.', pageWidth / 2, 150, { align: 'center' });
            pdf.text('Válido para efectos legales ante la República Bolivariana de Venezuela.', pageWidth / 2, 157, { align: 'center' });
            pdf.save('sello-system-kyron.pdf');
        } finally { setDownloading(null); }
    }, [getPngData]);

    const downloadWord = useCallback(async () => {
        setDownloading('docx');
        try {
            const dataUrl = await getPngData();
            if (!dataUrl) return;
            const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><title>System Kyron - Sello Oficial</title>
<style>
    body { font-family: 'Georgia', 'Times New Roman', serif; padding: 40px; color: #1e293b; }
    .seal-container { text-align: center; margin: 30px 0; }
    .seal-container img { width: 250px; height: 250px; }
    h1 { text-align: center; font-size: 18pt; font-weight: bold; margin-top: 30px; }
    .rif { text-align: center; font-size: 11pt; margin: 5px 0; }
    .footer { text-align: center; font-size: 8pt; color: #666; margin-top: 50px; border-top: 1px solid #ccc; padding-top: 15px; }
    .verification { text-align: center; font-size: 9pt; font-weight: bold; margin-top: 30px; letter-spacing: 3px; }
</style></head>
<body>
    <div class="seal-container"><img src="${dataUrl}" alt="Sello System Kyron" /></div>
    <h1>REPÚBLICA BOLIVARIANA DE VENEZUELA</h1>
    <p style="text-align:center;font-size:14pt;font-weight:bold;">System Kyron</p>
    <p class="rif">RIF J-50832149-9</p>
    <p class="rif">Emprendimiento Carlos Mattar</p>
    <div class="verification">✦ DOCUMENTO VERIFICADO ✦</div>
    <p style="text-align:center;font-size:9pt;margin-top:30px;">Este documento ha sido firmado electrónicamente con el sello oficial de System Kyron.</p>
    <p style="text-align:center;font-size:8pt;">Válido para efectos legales ante la República Bolivariana de Venezuela.</p>
    <div class="footer">System Kyron &mdash; Ecosistema de Inteligencia Corporativa &mdash; ${new Date().toLocaleDateString('es-VE')}</div>
</body></html>`;
            const blob = new Blob([html], { type: 'application/msword' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'sello-system-kyron.doc';
            link.click();
            URL.revokeObjectURL(link.href);
        } finally { setDownloading(null); }
    }, [getPngData]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div ref={sealRef}
                className={cn(
                    "relative w-72 h-72 lg:w-80 lg:h-80 rounded-full",
                    "bg-white text-[#1e293b]",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(0,0,0,0.06)]",
                    className
                )}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="190" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <circle cx="200" cy="200" r="183" fill="none" stroke="#1e293b" strokeWidth="0.75" />
                    {Array.from({ length: 48 }).map((_, i) => {
                        const angle = (i * 7.5) - 90;
                        const rad = (angle * Math.PI) / 180;
                        const isMajor = i % 4 === 0;
                        const r1 = isMajor ? 186 : 189;
                        const r2 = isMajor ? 175 : 180;
                        return <line key={i} x1={200 + r1 * Math.cos(rad)} y1={200 + r1 * Math.sin(rad)} x2={200 + r2 * Math.cos(rad)} y2={200 + r2 * Math.sin(rad)} stroke="#1e293b" strokeWidth={isMajor ? 2 : 0.8} />;
                    })}
                    <circle cx="200" cy="200" r="155" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                    <path id="top-arc" d="M 55 200 A 145 145 0 0 1 345 200" fill="none" />
                    <text fontSize="10.5" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" fill="#1e293b" letterSpacing="3.5">
                        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">REPÚBLICA BOLIVARIANA DE VENEZUELA</textPath>
                    </text>
                    <path id="bottom-arc" d="M 345 200 A 145 145 0 0 1 55 200" fill="none" />
                    <text fontSize="15" fontWeight="900" fontFamily="Georgia, 'Times New Roman', serif" fill="#1e293b" letterSpacing="5">
                        <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
                    </text>
                    <text x="200" y="108" textAnchor="middle" fontSize="16" fill="#1e293b" fontFamily="Georgia, serif">★</text>
                    <image href="/images/logo-kyron-hq.png" x="148" y="145" width="104" height="104" />
                    <text x="200" y="280" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" fill="#1e293b" letterSpacing="2">RIF J-50832149-9</text>
                    <text x="200" y="296" textAnchor="middle" fontSize="7.5" fontWeight="600" fontFamily="Arial, sans-serif" fill="#1e293b" letterSpacing="2.5">EMPRENDIMIENTO CARLOS MATTAR</text>
                    <text x="200" y="318" textAnchor="middle" fontSize="8" fill="#1e293b" fontFamily="Georgia, serif">✦</text>
                </svg>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <button onClick={downloadPng} disabled={!!downloading}
                    className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl",
                        "bg-[#1e293b] hover:bg-[#0f172a] text-white", downloading === 'png' && "opacity-50 cursor-not-allowed")}>
                    <FileImage className="h-4 w-4" />
                    {downloading === 'png' ? '...' : 'PNG'}
                </button>
                <button onClick={downloadPdf} disabled={!!downloading}
                    className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl",
                        "bg-[#dc2626] hover:bg-[#b91c1c] text-white", downloading === 'pdf' && "opacity-50 cursor-not-allowed")}>
                    <FileText className="h-4 w-4" />
                    {downloading === 'pdf' ? '...' : 'PDF'}
                </button>
                <button onClick={downloadWord} disabled={!!downloading}
                    className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl",
                        "bg-[#2563eb] hover:bg-[#1d4ed8] text-white", downloading === 'docx' && "opacity-50 cursor-not-allowed")}>
                    <FileText className="h-4 w-4" />
                    {downloading === 'docx' ? '...' : 'WORD'}
                </button>
            </div>
        </div>
    );
}

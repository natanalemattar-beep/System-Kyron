'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Download, FileText, FileImage, AlertCircle } from 'lucide-react';

export function OfficialSeal({ className }: { className?: string }) {
    const sealRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getPngData = useCallback(async () => {
        if (!sealRef.current) return null;
        const el = sealRef.current;
        const origWidth = el.style.width;
        const origHeight = el.style.height;
        el.style.width = '600px';
        el.style.height = '600px';
        await new Promise(r => requestAnimationFrame(r));
        const { toPng } = await import('html-to-image');
        const dataUrl = await toPng(el, {
            width: 1200, height: 1200, pixelRatio: 3, backgroundColor: '#ffffff',
            cacheBust: true,
        });
        el.style.width = origWidth;
        el.style.height = origHeight;
        return dataUrl;
    }, []);

    const downloadPng = useCallback(async () => {
        setDownloading('png');
        setError(null);
        try {
            const dataUrl = await getPngData();
            if (!dataUrl) { setError('No se pudo generar el sello'); return; }
            const link = document.createElement('a');
            link.download = 'sello-system-kyron.png';
            link.href = dataUrl;
            link.click();
        } catch { setError('Error al descargar PNG'); } finally { setDownloading(null); }
    }, [getPngData]);

    const downloadPdf = useCallback(async () => {
        setDownloading('pdf');
        setError(null);
        try {
            const dataUrl = await getPngData();
            if (!dataUrl) { setError('No se pudo generar el sello'); return; }
            const { default: jsPDF } = await import('jspdf');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgSize = 130;
            const x = (pageWidth - imgSize) / 2;
            pdf.addImage(dataUrl, 'PNG', x, 20, imgSize, imgSize);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(16);
            pdf.text('SYSTEM KYRON', pageWidth / 2, 130, { align: 'center' });
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.text('Sello Oficial — Inteligencia Corporativa', pageWidth / 2, 140, { align: 'center' });
            pdf.setFontSize(9);
            pdf.text('RIF J-50832149-9', pageWidth / 2, 150, { align: 'center' });
            pdf.setFontSize(8);
            pdf.text('Documento verificado electrónicamente con el sello oficial de System Kyron.', pageWidth / 2, 165, { align: 'center' });
            pdf.text(`Emitido: ${new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, 175, { align: 'center' });
            pdf.save('sello-system-kyron.pdf');
        } catch { setError('Error al descargar PDF'); } finally { setDownloading(null); }
    }, [getPngData]);

    const downloadWord = useCallback(async () => {
        setDownloading('docx');
        setError(null);
        try {
            const dataUrl = await getPngData();
            if (!dataUrl) { setError('No se pudo generar el sello'); return; }
            const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>System Kyron — Sello Oficial</title>
<style>
    body { font-family: 'Inter', 'Segoe UI', sans-serif; padding: 48px; color: #0f172a; background: #fafafa; }
    .seal-container { text-align: center; margin: 30px 0; }
    .seal-container img { width: 400px; height: 400px; }
    h1 { text-align: center; font-size: 24pt; font-weight: 900; letter-spacing: 2px; margin-top: 20px; color: #0f172a; }
    .sub { text-align: center; font-size: 11pt; font-weight: 700; color: #475569; letter-spacing: 1px; margin: 4px 0; text-transform: uppercase; }
    .meta { text-align: center; font-size: 10pt; color: #64748b; margin: 16px 0 0; }
    .line { width: 60%; margin: 24px auto; border: none; border-top: 1px solid #cbd5e1; }
    .footer { text-align: center; font-size: 8pt; color: #94a3b8; margin-top: 32px; }
</style></head>
<body>
    <div class="seal-container"><img src="${dataUrl}" alt="Sello System Kyron" /></div>
    <h1>SYSTEM KYRON</h1>
    <p class="sub">Sello Oficial — Inteligencia Corporativa</p>
    <hr class="line" />
    <p class="meta">RIF J-50832149-9</p>
    <p style="text-align:center;font-size:9pt;color:#64748b;margin-top:20px;">Documento verificado electrónicamente</p>
    <div class="footer">System Kyron — Ecosistema de Inteligencia Corporativa — ${new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
</body></html>`;
            const blob = new Blob([html], { type: 'application/msword' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'sello-system-kyron.doc';
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        } catch { setError('Error al descargar Word'); } finally { setDownloading(null); }
    }, [getPngData]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div ref={sealRef}
                className={cn(
                    "relative w-80 h-80 lg:w-96 lg:h-96",
                    "bg-white",
                    "shadow-[0_20px_60px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]",
                    className
                )}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="circleClip"><circle cx="200" cy="200" r="195" /></clipPath>
                    </defs>
                    <circle cx="200" cy="200" r="195" fill="#f8fafc" />
                    <circle cx="200" cy="200" r="192" fill="none" stroke="#0f172a" strokeWidth="3" />
                    <circle cx="200" cy="200" r="185" fill="none" stroke="#0f172a" strokeWidth="1" />
                    <circle cx="200" cy="200" r="178" fill="none" stroke="#0f172a" strokeWidth="0.5" />
                    {Array.from({ length: 24 }).map((_, i) => {
                        const angle = (i * 360) / 24;
                        const rad = (angle * Math.PI) / 180;
                        const x = 200 + 187 * Math.cos(rad);
                        const y = 200 + 187 * Math.sin(rad);
                        return <circle key={i} cx={x} cy={y} r="2.5" fill="#0f172a" />;
                    })}
                    <path id="arcTop" d="M 65 200 A 135 135 0 0 1 335 200" fill="none" />
                    <path id="arcBottom" d="M 75 210 A 125 125 0 0 0 325 210" fill="none" />
                    <text fontSize="12" fontWeight="900" fontFamily="'Inter','Segoe UI',sans-serif" fill="#0f172a" letterSpacing="5">
                        <textPath href="#arcTop" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
                    </text>
                    <text fontSize="8" fontWeight="700" fontFamily="'Inter','Segoe UI',sans-serif" fill="#475569" letterSpacing="2">
                        <textPath href="#arcBottom" startOffset="50%" textAnchor="middle">INTELIGENCIA CORPORATIVA</textPath>
                    </text>
                    <image href="/images/logo-black.png" x="160" y="160" width="80" height="80" opacity="0.95" />
                    <text x="200" y="295" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="'Inter',sans-serif" fill="#0f172a" letterSpacing="3">RIF J-50832149-9</text>
                </svg>
            </div>

            {error && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <span className="text-xs font-bold text-red-600">{error}</span>
                </div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button onClick={downloadPng} disabled={!!downloading}
                    className={cn("flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl",
                        "bg-[#0f172a] hover:bg-[#1e293b] text-white", downloading === 'png' && "opacity-50 cursor-not-allowed")}>
                    <FileImage className="h-5 w-5" />
                    {downloading === 'png' ? '...' : 'PNG'}
                </button>
                <button onClick={downloadPdf} disabled={!!downloading}
                    className={cn("flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl",
                        "bg-[#dc2626] hover:bg-[#b91c1c] text-white", downloading === 'pdf' && "opacity-50 cursor-not-allowed")}>
                    <FileText className="h-5 w-5" />
                    {downloading === 'pdf' ? '...' : 'PDF'}
                </button>
                <button onClick={downloadWord} disabled={!!downloading}
                    className={cn("flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl",
                        "bg-[#2563eb] hover:bg-[#1d4ed8] text-white", downloading === 'docx' && "opacity-50 cursor-not-allowed")}>
                    <Download className="h-5 w-5" />
                    {downloading === 'docx' ? '...' : 'WORD'}
                </button>
            </div>
        </div>
    );
}

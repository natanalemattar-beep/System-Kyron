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
        const { toPng } = await import('html-to-image');
        return toPng(sealRef.current, {
            width: 800, height: 800, pixelRatio: 2, backgroundColor: '#ffffff',
            cacheBust: true, useCORS: 'anonymous',
        });
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
            const imgSize = 80;
            const x = (pageWidth - imgSize) / 2;
            pdf.addImage(dataUrl, 'PNG', x, 20, imgSize, imgSize);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
            pdf.text('System Kyron — Sello Oficial', pageWidth / 2, 115, { align: 'center' });
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.text('RIF J-50832149-9', pageWidth / 2, 130, { align: 'center' });
            pdf.text('Documento verificado electrónicamente con el sello oficial de System Kyron.', pageWidth / 2, 145, { align: 'center' });
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
    .seal-container { text-align: center; margin: 20px 0; }
    .seal-container img { width: 200px; height: 200px; }
    h1 { text-align: center; font-size: 20pt; font-weight: 800; letter-spacing: -0.5px; margin-top: 20px; }
    .meta { text-align: center; font-size: 10pt; color: #64748b; margin: 4px 0; }
    .footer { text-align: center; font-size: 8pt; color: #94a3b8; margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 16px; }
</style></head>
<body>
    <div class="seal-container"><img src="${dataUrl}" alt="Sello System Kyron" /></div>
    <h1>System Kyron</h1>
    <p class="meta">RIF J-50832149-9</p>
    <p style="text-align:center;font-size:9pt;color:#64748b;margin-top:24px;">Documento verificado electrónicamente</p>
    <div class="footer">System Kyron — Ecosistema de Inteligencia Corporativa — ${new Date().toLocaleDateString('es-VE')}</div>
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
                    "relative w-64 h-64 lg:w-72 lg:h-72",
                    "bg-white",
                    "shadow-[0_20px_60px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]",
                    className
                )}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="195" fill="#f8fafc" />
                    <circle cx="200" cy="200" r="190" fill="none" stroke="#0f172a" strokeWidth="2" />
                    <circle cx="200" cy="200" r="185" fill="none" stroke="#0f172a" strokeWidth="0.5" />
                    <path id="arc" d="M 60 200 A 140 140 0 0 1 340 200" fill="none" />
                    <text fontSize="13" fontWeight="800" fontFamily="'Inter','Segoe UI',sans-serif" fill="#0f172a" letterSpacing="6">
                        <textPath href="#arc" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
                    </text>
                    <image href="/images/logo-black.png" x="155" y="155" width="90" height="90" opacity="0.9" />
                    <text x="200" y="290" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="'Inter',sans-serif" fill="#1e293b" letterSpacing="3">RIF J-50832149-9</text>
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
                    className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md",
                        "bg-[#0f172a] hover:bg-[#1e293b] text-white", downloading === 'png' && "opacity-50 cursor-not-allowed")}>
                    <FileImage className="h-4 w-4" />
                    {downloading === 'png' ? '...' : 'PNG'}
                </button>
                <button onClick={downloadPdf} disabled={!!downloading}
                    className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md",
                        "bg-[#dc2626] hover:bg-[#b91c1c] text-white", downloading === 'pdf' && "opacity-50 cursor-not-allowed")}>
                    <FileText className="h-4 w-4" />
                    {downloading === 'pdf' ? '...' : 'PDF'}
                </button>
                <button onClick={downloadWord} disabled={!!downloading}
                    className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md",
                        "bg-[#2563eb] hover:bg-[#1d4ed8] text-white", downloading === 'docx' && "opacity-50 cursor-not-allowed")}>
                    <FileText className="h-4 w-4" />
                    {downloading === 'docx' ? '...' : 'WORD'}
                </button>
            </div>
        </div>
    );
}

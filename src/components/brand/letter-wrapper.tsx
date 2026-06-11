'use client';

import { useState, useRef, type ReactNode } from 'react';
import { useRouter } from '@/navigation';
import { ShieldCheck, Lock, ArrowLeft, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const ACCESS_CODE = 'Carlos123';

interface LetterWrapperProps {
  children: ReactNode;
  title: string;
  filename: string;
  backHref?: string;
}

export function LetterWrapper({ children, title, filename, backHref = '/brand-kit' }: LetterWrapperProps) {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [exporting, setExporting] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unlock = () => {
    if (code.toLowerCase() === ACCESS_CODE.toLowerCase()) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleDownloadPDF = async () => {
    if (exporting || !letterRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(letterRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: { fontFamily: 'Arial' },
      });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgW = letterRef.current.offsetWidth;
      const imgH = letterRef.current.offsetHeight;
      const ratio = Math.min(pdfW / imgW, pdfH / imgH);
      pdf.addImage(dataUrl, 'PNG', (pdfW - imgW * ratio) / 2, (pdfH - imgH * ratio) / 2, imgW * ratio, imgH * ratio);
      pdf.save(filename);
    } catch (err: any) {
      alert('Error al generar PDF: ' + (err?.message || 'desconocido'));
    } finally {
      setExporting(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02040a] p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Lock className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Documento Protegido</h1>
            <p className="text-sm text-zinc-400">Ingresa el código de acceso para visualizar este documento.</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(false); }}
              onKeyDown={e => { if (e.key === 'Enter') unlock(); }}
              placeholder="Código de acceso"
              autoComplete="off"
              className="w-full h-14 px-6 rounded-2xl border border-white/10 bg-white/[0.03] text-white text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/40"
            />
            {error && <p className="text-xs text-red-400 font-medium">Código incorrecto</p>}
            <Button onClick={unlock} className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-amber-600 hover:bg-amber-500 text-white">
              <ShieldCheck className="mr-3 h-4 w-4" /> Desbloquear
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] py-16 px-4 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12 print:hidden">
          <Button variant="ghost" onClick={() => router.push(backHref)} className="text-zinc-400 hover:text-white text-xs font-black uppercase tracking-widest">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Confidencial</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div ref={letterRef} className="bg-white shadow-2xl overflow-hidden print:shadow-none flex flex-col" style={{ width: '21.59cm', minHeight: '27.94cm', fontFamily: 'Arial' }}>
            <div className="h-1.5 bg-gradient-to-r from-[#1e3a5f] via-[#2d5f8a] to-[#1e3a5f] shrink-0" />
            <div className="flex-1 px-[0.9in] py-[0.5in] flex flex-col">
              <h1 className="text-lg font-black text-[#1e3a5f] text-center uppercase tracking-tight border-b-2 border-[#1e3a5f] pb-3 mb-6">
                {title}
              </h1>
              {children}
            </div>
            <div className="h-1.5 bg-gradient-to-r from-[#1e3a5f] via-[#2d5f8a] to-[#1e3a5f] shrink-0" />
          </div>
        </div>

        <div className="flex justify-center mt-8 print:hidden">
          <Button
            onClick={handleDownloadPDF}
            disabled={exporting}
            className="h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white disabled:opacity-50"
          >
            {exporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
            {exporting ? 'Generando PDF...' : 'Descargar PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
}

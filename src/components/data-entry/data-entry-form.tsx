
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, TriangleAlert, UploadCloud, Download, ShieldCheck } from "lucide-react";
import { processDocumentAction, type AutomatedDataEntryOutput } from "@/app/[locale]/(main)/data-entry/actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileInputTrigger } from "../file-input-trigger";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";

export function DataEntryForm() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<AutomatedDataEntryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
    setStatus('idle');
    
    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !filePreview) return;

    setStatus("uploading");
    
    const response = await processDocumentAction({
      imageUrl: filePreview,
      targetModule: "General",
    });

    if ("error" in response) {
      setStatus("error");
      setError(response.error);
      setResult(null);
    } else {
      setStatus("success");
      setResult(response);
      setError(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card className="glass-card border-none bg-white/[0.02]">
        <CardHeader>
          <CardTitle className="uppercase tracking-widest text-xs font-black">Cargar Documento</CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase opacity-50">Sube la imagen para auditoría determinista.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent>
                <FileInputTrigger onFileSelect={handleFileChange}>
                     <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2rem] border-white/10 cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-all overflow-hidden">
                        {filePreview ? (
                            <Image src={filePreview} alt="Vista previa" width={250} height={250} className="object-contain h-full w-full p-4"/>
                        ) : (
                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-3 text-white/20" />
                                <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                                <span className="text-white">Haz clic para subir</span>
                                </p>
                            </div>
                        )}
                    </div>
                </FileInputTrigger>
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={!file || status === "uploading"} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                    {status === "uploading" ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Auditando...</>
                    ) : (
                        "Iniciar Auditoría"
                    )}
                </Button>
            </CardFooter>
        </form>
      </Card>

      <Card className="glass-card border-none bg-white/[0.02]">
        <CardHeader>
          <CardTitle className="uppercase tracking-widest text-xs font-black flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-500" /> Resultado de Auditoría
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center">
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center h-full text-center text-white/20">
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Esperando documento...</p>
            </div>
          )}
          {status === "uploading" && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
              <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/40">Analizando estructura...</p>
            </div>
          )}
          {status === "success" && result && (
            <div className="space-y-6 w-full">
                <div className="p-6 rounded-[1.5rem] bg-cyan-500/5 border border-cyan-500/20 text-center">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">{result.extractedData.mensaje}</h3>
                    <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">{result.extractedData.instruccion}</p>
                </div>
                <div className="flex items-center justify-center gap-4 py-4 opacity-50">
                    <ShieldCheck className="h-10 w-10 text-cyan-500/20" />
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">System Kyron Security Protocol</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

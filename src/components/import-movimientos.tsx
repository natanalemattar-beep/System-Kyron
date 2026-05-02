"use client";

import React, { useState, useRef } from "react";
import { Upload, FileSpreadsheet, CircleCheck, TriangleAlert, Loader2, X, Download, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CuentaBancaria {
  id: number;
  banco: string;
  cuenta: string;
}

interface ImportResult {
  success: boolean;
  importados: number;
  errores: number;
  detalle_errores?: { fila: number; error: string }[];
  total_filas: number;
  columnas_detectadas?: Record<string, string>;
}

interface ImportError {
  error: string;
  columnas_detectadas?: string[];
  columnas_mapeadas?: Record<string, string>;
  sugerencia?: string;
  errores?: { fila: number; error: string }[];
}

export function ImportMovimientos({ cuentas, onImportComplete }: { cuentas: CuentaBancaria[]; onImportComplete: () => void }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [cuentaId, setCuentaId] = useState<string>("none");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<ImportError | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setCuentaId("none");
  };

  const close = () => {
    reset();
    setOpen(false);
  };

  const handleFile = (f: File) => {
    const name = f.name.toLowerCase();
    if (!name.endsWith('.xlsx') && !name.endsWith('.xls') && !name.endsWith('.csv')) {
      toast({ title: "Formato no válido", description: "Solo se aceptan archivos .xlsx, .xls o .csv", variant: "destructive" });
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: "El tamaño máximo es 5 MB", variant: "destructive" });
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (cuentaId !== "none") formData.append('cuenta_id', cuentaId);

      const res = await fetch('/api/contabilidad/import', { method: 'POST', body: formData });
      let data: Record<string, unknown>;
      try {
        data = await res.json();
      } catch {
        data = { error: `Error del servidor (${res.status})` };
      }

      if (!res.ok) {
        const errData = data as unknown as ImportError;
        setError(errData);
        toast({ title: "Error en importación", description: errData.error || 'Error desconocido', variant: "destructive" });
      } else {
        setResult(data as unknown as ImportResult);
        toast({ title: "Importación exitosa", description: `${(data as ImportResult).importados} movimientos importados` });
        onImportComplete();
      }
    } catch {
      const errObj: ImportError = { error: 'No se pudo conectar con el servidor. Verifique su conexión e intente de nuevo.' };
      setError(errObj);
      toast({ title: "Error de conexión", description: errObj.error, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csv = "fecha,concepto,monto,tipo,referencia,categoria\n2025-01-15,Pago de proveedor ABC,15000.00,debito,REF-001,Proveedores\n2025-01-16,Deposito cliente XYZ,25000.00,credito,DEP-002,Ventas\n2025-01-17,Pago servicios publicos,3500.50,debito,SRV-003,Servicios";
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_movimientos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)} className="rounded-xl">
        <Upload className="mr-2 h-4 w-4" /> Importar Movimientos
      </Button>
    );
  }

  return (
    <Card className="rounded-2xl border shadow-lg overflow-hidden border-blue-500/20">
      <CardHeader className="p-5 border-b bg-blue-500/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-blue-500" /> Importar Movimientos desde Archivo
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={close}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/30">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-[11px] text-muted-foreground leading-relaxed space-y-1">
            <p className="font-bold text-foreground/70">Formatos aceptados: Excel (.xlsx, .xls) y CSV</p>
            <p>El sistema detecta automáticamente las columnas. Mínimo necesita: <strong>fecha</strong>, <strong>concepto/descripción</strong> y <strong>monto</strong> (o columnas separadas de débito y crédito).</p>
            <p>Formatos de fecha: 15/01/2025, 2025-01-15, 15-01-2025. Montos: 15.000,00 o 15000.00</p>
          </div>
        </div>

        {!result && !error && (
          <>
            <div
              className={cn(
                "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
                dragOver ? "border-blue-500 bg-blue-500/5" : file ? "border-emerald-500/40 bg-emerald-500/5" : "border-border/50 hover:border-blue-500/40 hover:bg-blue-500/5"
              )}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <FileSpreadsheet className="h-10 w-10 text-emerald-500" />
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">{(file.size / 1024).toFixed(1)} KB · Haga clic para cambiar</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground/30" />
                  <p className="text-sm font-semibold text-muted-foreground">Arrastre su archivo aquí o haga clic para seleccionar</p>
                  <p className="text-[10px] text-muted-foreground/60">Excel (.xlsx, .xls) o CSV · Máx. 5 MB · Hasta 5,000 movimientos</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Cuenta Bancaria (opcional)</label>
                <Select value={cuentaId} onValueChange={setCuentaId}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue placeholder="Asociar a cuenta..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Sin asociar —</SelectItem>
                    {cuentas.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.banco} · {c.cuenta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="link" onClick={downloadTemplate} className="text-[11px] text-blue-500 h-10 px-0">
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Descargar plantilla CSV de ejemplo
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={close} className="rounded-xl">Cancelar</Button>
              <Button onClick={handleUpload} disabled={!file || uploading} className="rounded-xl">
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {uploading ? 'Procesando...' : 'Importar Movimientos'}
              </Button>
            </div>
          </>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <CircleCheck className="h-8 w-8 text-emerald-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Importación completada</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {result.importados} movimientos importados de {result.total_filas} filas procesadas
                  {result.errores > 0 && ` · ${result.errores} filas con errores`}
                </p>
              </div>
            </div>
            {result.detalle_errores && result.detalle_errores.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Filas con errores (primeras 20)</p>
                <div className="max-h-40 overflow-y-auto rounded-lg border border-border/30">
                  {result.detalle_errores.map((e, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 text-[11px] border-b border-border/20 last:border-0">
                      <Badge variant="outline" className="text-[11px] h-5 shrink-0">Fila {e.fila}</Badge>
                      <span className="text-muted-foreground">{e.error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={reset} className="rounded-xl">Importar otro archivo</Button>
              <Button onClick={close} className="rounded-xl">Cerrar</Button>
            </div>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <TriangleAlert className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">{error.error}</p>
                {error.sugerencia && <p className="text-xs text-muted-foreground mt-1">{error.sugerencia}</p>}
                {error.columnas_detectadas && Array.isArray(error.columnas_detectadas) && (
                  <div className="mt-2">
                    <p className="text-[10px] font-bold text-muted-foreground mb-1">Columnas encontradas en el archivo:</p>
                    <div className="flex flex-wrap gap-1">
                      {error.columnas_detectadas.map((c, i) => (
                        <Badge key={i} variant="outline" className="text-[11px] h-5">{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {error.errores && error.errores.length > 0 && (
              <div className="max-h-40 overflow-y-auto rounded-lg border border-border/30">
                {error.errores.map((e, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 text-[11px] border-b border-border/20 last:border-0">
                    <Badge variant="outline" className="text-[11px] h-5 shrink-0">Fila {e.fila}</Badge>
                    <span className="text-muted-foreground">{e.error}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={reset} className="rounded-xl">Intentar de nuevo</Button>
              <Button variant="outline" onClick={close} className="rounded-xl">Cerrar</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

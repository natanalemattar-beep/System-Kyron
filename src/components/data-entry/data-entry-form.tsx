
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, CheckCircle, AlertCircle, Download } from "lucide-react";
import { processDocumentAction } from "@/app/(main)/data-entry/actions";
import type { AutomatedDataEntryOutput } from "@/ai/flows/automated-data-entry-from-image";
import { formatCurrency, formatDate } from "@/lib/utils";

export function DataEntryForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<AutomatedDataEntryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      const response = await processDocumentAction({
        photoDataUri,
        description: "Extract data from this financial document.",
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
    reader.onerror = () => {
      setStatus("error");
      setError("Failed to read the file.");
      setResult(null);
    };
  };

  const handleDownload = () => {
    if (!result) return;

    let content = `
RECAUDO - DATOS EXTRAÍDOS
==================================

PROVEEDOR: ${result.vendorName}
FECHA: ${formatDate(result.date)}

----------------------------------
DETALLES
----------------------------------
`;
    result.items.forEach(item => {
      content += `
Descripción: ${item.description}
Cantidad:    ${item.quantity || 'N/A'}
Precio Unit.: ${formatCurrency(item.unitPrice)}
`;
    });
    content += `
----------------------------------
TOTAL: ${formatCurrency(result.totalAmount)}
MÉTODO DE PAGO: ${result.paymentMethod || 'N/A'}
----------------------------------
`;
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + `<pre>${content}</pre>` + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `Recaudo_${result.vendorName.replace(/ /g, '_')}.docx`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Cargar Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Recibo o Factura</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, o PDF
                    </p>
                    {file && (
                      <p className="mt-4 text-sm font-medium text-primary">
                        {file.name}
                      </p>
                    )}
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, application/pdf"
                  />
                </label>
              </div>
            </div>
            <Button type="submit" disabled={!file || status === "uploading"} className="w-full">
              {status === "uploading" ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Procesar Documento"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Datos Extraídos</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <p>Sube un documento para ver los datos extraídos aquí.</p>
            </div>
          )}
          {status === "uploading" && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="mt-4">Extrayendo datos, por favor espera...</p>
            </div>
          )}
          {status === "error" && (
             <div className="flex flex-col items-center justify-center h-full text-center text-destructive">
                <AlertCircle className="w-12 h-12" />
                <p className="mt-4 font-semibold">Error al Procesar</p>
                <p className="text-sm">{error}</p>
             </div>
          )}
          {status === "success" && result && (
            <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="text-lg font-semibold">{result.vendorName}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(result.date)}</p>
                </div>
                <div className="space-y-2">
                    {result.items.map((item, index) => (
                        <div key={index} className="flex justify-between p-2 rounded-md hover:bg-secondary/30">
                            <p>{item.description} {item.quantity && `(x${item.quantity})`}</p>
                            <p className="font-mono">{formatCurrency(item.unitPrice)}</p>
                        </div>
                    ))}
                </div>
                <div className="pt-4 mt-4 border-t">
                    <div className="flex justify-between font-bold text-lg">
                        <p>Total</p>
                        <p>{formatCurrency(result.totalAmount)}</p>
                    </div>
                     {result.paymentMethod && (
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <p>Método de Pago</p>
                            <p>{result.paymentMethod}</p>
                        </div>
                    )}
                </div>
            </div>
          )}
        </CardContent>
        {status === "success" && result && (
            <CardFooter className="flex-col gap-2">
                <Button className="w-full" onClick={() => { /* Logic to save transaction */ }}>Guardar Transacción</Button>
                <Button variant="outline" className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4"/>
                    Descargar Recaudo (.docx)
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}

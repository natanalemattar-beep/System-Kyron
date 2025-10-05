
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, CheckCircle, AlertCircle } from "lucide-react";
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

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Receipt or Invoice</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, or PDF
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
                "Process Document"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Extracted Data</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <p>Upload a document to see the extracted data here.</p>
            </div>
          )}
          {status === "uploading" && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="mt-4">Extracting data, please wait...</p>
            </div>
          )}
          {status === "error" && (
             <div className="flex flex-col items-center justify-center h-full text-center text-destructive">
                <AlertCircle className="w-12 h-12" />
                <p className="mt-4 font-semibold">Error Processing Document</p>
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
                            <p>Payment Method</p>
                            <p>{result.paymentMethod}</p>
                        </div>
                    )}
                </div>
                <Button className="w-full mt-4">Save Transaction</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

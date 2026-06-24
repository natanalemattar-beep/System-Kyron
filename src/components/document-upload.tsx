'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileText, Image, Loader2, CircleCheck, Camera } from 'lucide-react';
import { DocumentVerification, VerificationResult } from '@/components/document-verification';

export interface UploadedDoc {
  name: string;
  storedName: string;
  url: string;
  size: number;
  type: string;
  docType: string;
  verification?: VerificationResult;
}

interface DocumentRequirement {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  accept?: string;
}

interface DocumentUploadProps {
  requirements: DocumentRequirement[];
  onDocumentsChange: (docs: Record<string, UploadedDoc | null>) => void;
  documents: Record<string, UploadedDoc | null>;
  className?: string;
  autoVerify?: boolean;
  showCamera?: boolean;
}

export function DocumentUpload({
  requirements,
  onDocumentsChange,
  documents,
  className,
  autoVerify = true,
  showCamera = true,
}: DocumentUploadProps) {
  const [uploading, setUploading]   = useState<string | null>(null);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const cameraInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileSelect = async (reqId: string, file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [reqId]: 'El archivo excede 25 MB' }));
      return;
    }

    const allowedTypes = [
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/heic', 'image/heif',
      'text/plain', 'text/csv',
    ];
    const allowedExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.heic', '.heif', '.txt', '.csv'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExts.includes(ext)) {
      setErrors(prev => ({ ...prev, [reqId]: 'Formato no soportado. Use PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, WEBP, HEIC, TXT o CSV' }));
      return;
    }

    setErrors(prev => { const n = { ...prev }; delete n[reqId]; return n; });
    setUploading(reqId);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', reqId);
      formData.append('purpose', 'registration');

      const res  = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors(prev => ({ ...prev, [reqId]: data.error || 'Error al subir' }));
        return;
      }

      const updated = { ...documents, [reqId]: data.file as UploadedDoc };
      onDocumentsChange(updated);
    } catch {
      setErrors(prev => ({ ...prev, [reqId]: 'Error de conexión al subir el archivo' }));
    } finally {
      setUploading(null);
    }
  };

  const handleVerified = (reqId: string, verification: VerificationResult) => {
    const doc = documents[reqId];
    if (!doc) return;
    const updated = { ...documents, [reqId]: { ...doc, verification } };
    onDocumentsChange(updated);
  };

  const handleRemove = (reqId: string) => {
    const updated = { ...documents, [reqId]: null };
    onDocumentsChange(updated);
    if (inputRefs.current[reqId]) {
      inputRefs.current[reqId]!.value = '';
    }
    if (cameraInputRefs.current[reqId]) {
      cameraInputRefs.current[reqId]!.value = '';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024)      return `${bytes} B`;
    if (bytes < 1024*1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <div className={cn('space-y-3', className)}>
      {requirements.map((req) => {
        const doc         = documents[req.id];
        const error       = errors[req.id];
        const isUploading = uploading === req.id;

        return (
          <div key={req.id} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                {req.label}
                {req.required && <span className="text-destructive ml-1">*</span>}
              </label>
              {doc && (
                <button
                  type="button"
                  onClick={() => handleRemove(req.id)}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Eliminar
                </button>
              )}
            </div>

            {req.description && (
              <p className="text-xs text-muted-foreground mb-2">{req.description}</p>
            )}

            {doc ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                  <div className="shrink-0 p-2 rounded-lg bg-emerald-500/10">
                    {isImage(doc.type)
                      ? <Image    className="h-4 w-4 text-emerald-500" />
                      : <FileText className="h-4 w-4 text-emerald-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{formatSize(doc.size)}</p>
                  </div>
                  <CircleCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                </div>

                <DocumentVerification
                  filePath={doc.url}
                  originalName={doc.name}
                  mimeType={doc.type}
                  docCategory={doc.docType}
                  compact
                  autoVerify={autoVerify}
                  onVerified={(result) => handleVerified(req.id, result)}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  onClick={() => !isUploading && inputRefs.current[req.id]?.click()}
                  onKeyDown={(e) => { if (!isUploading && (e.key === 'Enter' || e.key === ' ')) inputRefs.current[req.id]?.click(); }}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer',
                    isUploading
                      ? 'border-primary/40 bg-primary/5 cursor-wait'
                      : error
                      ? 'border-destructive/40 bg-destructive/5 hover:border-destructive/60'
                      : 'border-border/40 bg-card/40 hover:border-primary/40 hover:bg-primary/5'
                  )}
                >
                  <input
                    ref={(el) => { inputRefs.current[req.id] = el; }}
                    type="file"
                    accept={req.accept || '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.heif,.txt,.csv'}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(req.id, file);
                    }}
                  />
                  {isUploading
                    ? <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    : <Upload  className="h-5 w-5 text-muted-foreground" />
                  }
                  <span className="text-xs font-medium text-muted-foreground">
                    {isUploading ? 'Subiendo...' : 'PDF, DOC, XLS, PPT, JPG, PNG, HEIC — máx. 25 MB'}
                  </span>
                </div>

                {showCamera && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => !isUploading && cameraInputRefs.current[req.id]?.click()}
                      disabled={isUploading}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                        isUploading
                          ? 'text-muted-foreground/50 cursor-wait'
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      )}
                    >
                      <Camera className="h-3.5 w-3.5" />
                      Usar cámara
                    </button>
                    <input
                      ref={(el) => { cameraInputRefs.current[req.id] = el; }}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(req.id, file);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {error && (
              <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                <X className="h-3 w-3" /> {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

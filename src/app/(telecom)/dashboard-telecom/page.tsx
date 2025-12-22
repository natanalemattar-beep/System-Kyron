
"use client";

import { useState, useEffect } from "react";
import {
  Signal,
  HardHat,
  Network,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Gavel,
  Calculator,
  PlusCircle,
  Info,
  Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInDays } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

const initialComplianceStatus = [
    { id: "CON-001", name: "Concesión de Espectro Radioeléctrico", expires: "2028-03-20", status: "Vigente", diasMora: 0, dailyPenalty: 25, requirements: ["form_A", "payment_proof"] },
    { id: "CON-002", name: "Licencia de Proveedor de Servicios (ISP)", expires: "2028-04-01", status: "Vigente", diasMora: 0, dailyPenalty: 20, requirements: ["form_B", "financial_statement"] },
    { id: "CON-003", name: "Habilitación Postal", expires: "2024-06-01", status: "Vencida", diasMora: 45, dailyPenalty: 15.50, requirements: ["form_FUR-02", "payment_proof_fine", "previous_license_copy", "rif_copy", "solvencia_seniat", "solvencia_ivss"] },
];

const tramiteRequisitos: Record<string, { id: string; label: string; type: 'download' | 'calculator' | 'upload' }> = {
    "form_FUR-02": { id: "req-1", label: "Formulario Único de Renovación (FUR-02)", type: "download" },
    "payment_proof_fine": { id: "req-2", label: "Pago de derechos administrativos + multa por mora", type: "calculator" },
    "previous_license_copy": { id: "req-3", label: "Copia de la habilitación anterior", type: "upload" },
    "rif_copy": { id: "req-4", label: "Copia del RIF actualizado", type: "upload" },
    "solvencia_seniat": { id: "req-5", label: "Solvencia de Obligaciones Tributarias (SENIAT)", type: "upload" },
    "solvencia_ivss": { id: "req-6", label: "Solvencia Laboral (IVSS, FAOV, INCES)", type: "upload" },
};


const statusVariant: { [key: string]: "default" | "destructive" | "secondary" } = {
  Vigente: "default",
  Vencida: "destructive",
  "Por Vencer": "secondary",
};


export default function DashboardTelecomPage() {
    const { toast } = useToast();
    const [complianceStatus, setComplianceStatus] = useState(initialComplianceStatus);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedTramite, setSelectedTramite] = useState("");
    const [selectedLicencia, setSelectedLicencia] = useState("");
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [multaCalculada, setMultaCalculada] = useState<{ derecho: number, multa: number, total: number } | null>(null);

    const licenciaVencida = complianceStatus.find(l => l.status === 'Vencida');

    const handleOpenWizard = (licenciaId?: string) => {
        // TODO: This could be a call to a Cloud Function `startRenewalProcess(licenciaId)`
        // which creates a document in `compliance_actions` and sets the license status.
        setWizardStep(1);
        setSelectedTramite(licenciaId ? "renovacion" : "");
        setSelectedLicencia(licenciaId || "");
        if (licenciaId) setWizardStep(2); // Skip to step 2 if license is pre-selected
        setIsWizardOpen(true);
    };

    const handleCalculateMulta = () => {
        const licencia = complianceStatus.find(l => l.id === selectedLicencia);
        if (licencia) {
            // TODO: Replace with actual CONATEL fine calculation logic from a backend function
            // e.g., const result = await calculatePenalty({ licenseId: licencia.id });
            const derecho = 500; // Example base fee
            const multa = licencia.diasMora * licencia.dailyPenalty;
            setMultaCalculada({ derecho, multa, total: derecho + multa });
        }
    };
    
    // TODO: Implement Cloud Function `checkVencimientos`
    // This function would run daily to update the status of licenses in Firestore.
    // Pseudocode for the Cloud Function:
    /*
      functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
        const db = admin.firestore();
        const licenciasRef = db.collection('licenses');
        const snapshot = await licenciasRef.get();
        const batch = db.batch();
        const today = new Date();

        snapshot.forEach(doc => {
          const licencia = doc.data();
          const vencimiento = licencia.expirationDate.toDate();
          const diffDays = differenceInDays(vencimiento, today);
          let newStatus = 'Vigente';
          if (diffDays < 0) {
            newStatus = 'Vencida';
          } else if (diffDays <= 30) {
            newStatus = 'Por Vencer';
          }
          
          if (licencia.status !== newStatus) {
            const docRef = licenciasRef.doc(doc.id);
            const diasMora = Math.max(0, -diffDays);
            const multaCalculada = diasMora * (licencia.dailyPenalty || 0);

            batch.update(docRef, { 
                status: newStatus, 
                daysExpired: diasMora,
                calculatedPenalty: multaCalculada,
                alertLevel: newStatus === 'Vencida' ? 'critical' : 'warning'
            });
          }
        });
        await batch.commit();
        console.log('License statuses updated.');
      });
    */

  return (
    <div className="space-y-8">
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Signal className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Plataforma de Gestión Telecom
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Gestión de infraestructura de red, proyectos y cumplimiento regulatorio.</p>
      </header>
      
       {licenciaVencida && (
           <Alert variant="destructive" className="mb-8">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>ALERTA DE CUMPLIMIENTO</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                    <span>Su "{licenciaVencida.name} ({licenciaVencida.id})" está <strong>VENCIDA</strong> desde el {formatDate(licenciaVencida.expires)}. Existe riesgo de multas.</span>
                    <Button variant="destructive" size="sm" onClick={() => handleOpenWizard(licenciaVencida.id)}>Iniciar Renovación Urgente</Button>
                </AlertDescription>
            </Alert>
      )}

      <div className="flex gap-4 mb-8">
        <Button size="lg" onClick={() => handleOpenWizard()}>
            <PlusCircle className="mr-2"/>
            Iniciar Trámite CONATEL
        </Button>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
               <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Estado de Cumplimiento (CONATEL)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Licencia / Permiso (ID)</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Vencimiento</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complianceStatus.map(item => (
                                <TableRow key={item.id} className={item.status === 'Vencida' ? 'bg-destructive/10' : item.status === 'Por Vencer' ? 'bg-secondary/60' : ''}>
                                    <TableCell className="font-medium">{item.name} <span className="text-xs text-muted-foreground font-mono">({item.id})</span></TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge>
                                        {item.diasMora > 0 && <span className="text-xs text-destructive ml-2">({item.diasMora} días)</span>}
                                    </TableCell>
                                    <TableCell>{formatDate(item.expires)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant={item.status === 'Vencida' ? "destructive" : "outline"} 
                                            size="sm"
                                            onClick={() => handleOpenWizard(item.id)}
                                        >
                                          {item.status === 'Vencida' ? 'Renovar Urgente' : item.status === 'Por Vencer' ? 'Programar Renovación' : 'Ver Certificado'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
          </div>
          <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Info className="text-primary"/>Información Oficial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <h4 className="font-semibold">📞 Presentación Presencial Obligatoria</h4>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li><strong>Lugar:</strong> Oficina de Atención al Ciudadano de CONATEL.</li>
                        <li><strong>Horario:</strong> L-V, 8:00 a.m. a 12:00 m / 1:30 p.m. a 4:30 p.m.</li>
                        <li><strong>Requisito:</strong> Asistir el interesado o su representante legal con poder notariado.</li>
                        <li><strong>Base Legal:</strong> Formalidades del Artículo 26 de la LOTEL.</li>
                    </ul>
                </CardContent>
             </Card>
          </div>
       </div>

        <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Asistente de Trámites CONATEL</DialogTitle>
                </DialogHeader>
                {wizardStep === 1 && (
                    <div className="py-4 space-y-4">
                        <Label>Paso 1: ¿Qué trámite necesita?</Label>
                        <Select onValueChange={(val) => { setSelectedTramite(val); setWizardStep(2); }}>
                            <SelectTrigger><SelectValue placeholder="Seleccione una opción..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="renovacion">Renovación de Licencia/Habilitación</SelectItem>
                                <SelectItem value="nueva">Nueva Licencia/Habilitación</SelectItem>
                                <SelectItem value="consulta">Consulta o Modificación de Trámite</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
                 {wizardStep === 2 && (
                    <div className="py-4 space-y-4">
                        <Label>Paso 2: ¿Para qué licencia?</Label>
                        <Select onValueChange={(val) => { setSelectedLicencia(val); setWizardStep(3); }} value={selectedLicencia}>
                            <SelectTrigger><SelectValue placeholder="Seleccione la licencia..." /></SelectTrigger>
                            <SelectContent>
                                {complianceStatus.map(l => (
                                    <SelectItem key={l.id} value={l.id} className={l.status === 'Vencida' ? 'text-destructive' : ''}>
                                        {l.name} ({l.id}) - {l.status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {wizardStep === 3 && selectedLicencia && (
                     <div className="py-4">
                        <DialogTitle>Paso 3: Checklist de Requisitos</DialogTitle>
                        <DialogDescription>
                            Para la "Renovación de {complianceStatus.find(l=>l.id === selectedLicencia)?.name}" necesita:
                        </DialogDescription>
                        <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-2">
                             {(complianceStatus.find(l=>l.id === selectedLicencia)?.requirements || []).map(reqKey => {
                                const req = tramiteRequisitos[reqKey];
                                if (!req) return null;
                                return (
                                 <div key={req.id} className="flex items-center gap-4 justify-between p-3 rounded-lg bg-secondary/50">
                                     <div className="flex items-center gap-3">
                                        <Checkbox id={req.id}/>
                                        <Label htmlFor={req.id}>{req.label}</Label>
                                     </div>
                                     {req.type === 'calculator' && (
                                        <Button variant="secondary" size="sm" onClick={() => { handleCalculateMulta(); setIsCalculatorOpen(true); }}>
                                            <Calculator className="mr-2 h-4 w-4"/>Calcular
                                        </Button>
                                     )}
                                     {req.type === 'download' && <Button variant="secondary" size="sm"><Download className="mr-2 h-4 w-4"/>Descargar</Button>}
                                     {req.type === 'upload' && <Button variant="secondary" size="sm" asChild><FileInputTrigger onFileSelect={() => {}}><FileText className="mr-2 h-4 w-4"/>Adjuntar</FileInputTrigger></Button>}
                                 </div>
                             )})}
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsWizardOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Calculadora de Costos y Multas</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <p><strong>Licencia:</strong> {complianceStatus.find(l=>l.id === selectedLicencia)?.name}</p>
                    <p><strong>Días de retraso:</strong> {complianceStatus.find(l=>l.id === selectedLicencia)?.diasMora}</p>
                    {multaCalculada && (
                        <div className="pt-4 border-t space-y-2">
                            <div className="flex justify-between"><span>Derecho de Renovación:</span> <span>{formatCurrency(multaCalculada.derecho, "$")}</span></div>
                            <div className="flex justify-between text-destructive"><span>Multa por mora:</span> <span>{formatCurrency(multaCalculada.multa, "$")}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total a pagar estimado:</span> <span>{formatCurrency(multaCalculada.total, "$")}</span></div>
                        </div>
                    )}
                </div>
                 <DialogFooter>
                    <Button onClick={() => setIsCalculatorOpen(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  );
}

    
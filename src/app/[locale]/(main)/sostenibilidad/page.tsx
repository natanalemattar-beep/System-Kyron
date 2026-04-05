"use client";

import { useState, useEffect, useCallback } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Recycle, Leaf, MapPin, Coins, ShieldCheck, Zap, Cpu, Battery, Wifi, Download, Activity, Terminal, Loader2, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import placeholderImagesData from "@/app/lib/placeholder-images.json";

const PlaceHolderImages = placeholderImagesData.placeholderImages;

type EcoBalance = {
  balance: string;
  nivel: string;
  total_kg_reciclado: string;
};

type EcoTransaccion = {
  id: number;
  tipo_material: string;
  peso_kg: string;
  eco_creditos: string;
  punto_ameru: string | null;
  verificado: boolean;
  fecha_reciclaje: string;
};

const MATERIALES = [
  { value: 'papel', label: 'Papel' },
  { value: 'plastico', label: 'Plástico' },
  { value: 'vidrio', label: 'Vidrio' },
  { value: 'aluminio', label: 'Aluminio' },
  { value: 'carton', label: 'Cartón' },
  { value: 'organico', label: 'Orgánico' },
];

const NIVEL_COLORS: Record<string, string> = {
  bronce: 'text-amber-600',
  plata: 'text-slate-400',
  oro: 'text-yellow-500',
  platino: 'text-violet-500',
};

const emptyForm = { tipo_material: '', peso_kg: '', punto_ameru: '' };

export default function SostenibilidadPage() {
  const { toast } = useToast();
  const [balance, setBalance] = useState<EcoBalance | null>(null);
  const [transacciones, setTransacciones] = useState<EcoTransaccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const ameruImage = PlaceHolderImages.find(img => img.id === "ameru-ia-bin");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/eco-creditos');
      if (!res.ok) throw new Error('Error al cargar datos');
      const data = await res.json();
      setBalance(data.balance || null);
      setTransacciones(data.transacciones || []);
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar los datos de sostenibilidad.' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async () => {
    if (!form.tipo_material || !form.peso_kg) {
      toast({ variant: 'destructive', title: 'Campos requeridos', description: 'Material y peso son obligatorios.' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/eco-creditos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al registrar');
      toast({ title: 'Reciclaje registrado', description: `+${data.creditos_ganados} ECR ganados` });
      setShowForm(false);
      setForm(emptyForm);
      await fetchData();
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo registrar el reciclaje.' });
    } finally {
      setSaving(false);
    }
  };

  const balanceNum = parseFloat(balance?.balance || '0');
  const totalKg = parseFloat(balance?.total_kg_reciclado || '0');
  const nivel = balance?.nivel || 'bronce';
  const co2Mitigado = Math.round(totalKg * 2.5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-secondary animate-spin mx-auto" />
          <p className="text-xs text-muted-foreground">Cargando datos ambientales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <ModuleTutorial config={moduleTutorials["sostenibilidad"]} />
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/10 border border-secondary/20 text-[11px] font-semibold uppercase tracking-wide text-secondary mb-4">
            <Leaf className="h-3 w-3" /> ÁREA SUSTENTABLE
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase">Impacto <span className="text-secondary italic">Ambiental</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Gestión de Activos Verdes • Ameru IA Ecosystem 2026</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => { setForm(emptyForm); setShowForm(true); }} size="sm" className="h-9 px-4 rounded-xl text-xs font-semibold bg-secondary hover:bg-secondary/90 text-white">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Reciclaje
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider" onClick={() => window.print()}>
            <Download className="mr-2 h-3.5 w-3.5" /> Exportar
          </Button>
        </div>
      </header>

      <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden group">
        <div className="p-6 md:p-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge className="bg-secondary text-white border-none text-[10px] font-bold px-3 py-1 uppercase tracking-wide">Hardware 3ra Gen</Badge>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase text-foreground leading-none">AMERU <span className="text-secondary">IA</span></h2>
              <p className="text-sm text-muted-foreground leading-relaxed">La papelera inteligente definitiva para el sector privado. Clasificación autónoma con IA edge.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, label: "Inducción Magnética", desc: "Clasificación síncrona de metales y polímeros." },
                { icon: Cpu, label: "Inferencia Edge", desc: "Visión artificial para validación en tiempo real." },
              ].map((feat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-secondary">
                    <feat.icon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">{feat.label}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/50 leading-snug">{feat.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="h-11 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-secondary hover:bg-secondary/90 text-white">ORDENAR DISPOSITIVO</Button>
              <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[10px] uppercase tracking-wider">FICHA TÉCNICA</Button>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/20 bg-muted/10 flex items-center justify-center group-hover:border-secondary/20 transition-all duration-500">
            {ameruImage && (
              <Image
                src={ameruImage.imageUrl}
                alt={ameruImage.description}
                fill
                className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                data-ai-hint={ameruImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="relative z-10 flex gap-6 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/70 bg-background/60 backdrop-blur-md px-5 py-2 rounded-full border border-border/20">
              <span className="flex items-center gap-2"><Battery className="h-3 w-3 text-secondary" /> 100% SOLAR</span>
              <span className="flex items-center gap-2"><Wifi className="h-3 w-3 text-secondary" /> 5G NATIVE</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Saldo Eco-Créditos", val: `${balanceNum.toLocaleString('en-US')} ECR`, icon: Coins, color: "text-secondary", bgColor: "bg-secondary/10 border-secondary/15", desc: `Nivel: ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}` },
          { label: "CO₂ Mitigado", val: `${co2Mitigado} KG`, icon: Recycle, color: "text-blue-400", bgColor: "bg-blue-400/10 border-blue-400/15", desc: `${totalKg.toFixed(1)} kg reciclado` },
          { label: "Transacciones", val: String(transacciones.length), icon: MapPin, color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15", desc: "Total registrado" },
          { label: "Nivel Ameru", val: nivel.toUpperCase(), icon: ShieldCheck, color: NIVEL_COLORS[nivel] || "text-primary", bgColor: "bg-primary/10 border-primary/15", desc: "Score de participación" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.01] transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">{kpi.label}</p>
              <div className={cn("p-1.5 rounded-lg border", kpi.bgColor)}>
                <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.val}</p>
            <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.desc}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-2xl bg-card/50 overflow-hidden">
          <CardHeader className="p-6 border-b border-border/30">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-secondary" /> Historial de Reciclaje
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transacciones.length === 0 ? (
              <div className="py-12 px-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center">
                  <Recycle className="h-5 w-5 text-muted-foreground/30" />
                </div>
                <p className="text-sm font-medium text-muted-foreground/60">Sin registros de reciclaje</p>
                <p className="text-xs text-muted-foreground/40">Registre su primera actividad de reciclaje para comenzar a acumular Eco-Créditos.</p>
                <Button onClick={() => { setForm(emptyForm); setShowForm(true); }} variant="outline" size="sm" className="rounded-lg text-xs mt-2">
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Reciclaje
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-none">
                    <TableHead className="pl-6 py-4 text-[11px] font-semibold uppercase tracking-wider opacity-30">Fecha / Origen</TableHead>
                    <TableHead className="py-4 text-[11px] font-semibold uppercase tracking-wider opacity-30">Material</TableHead>
                    <TableHead className="text-center py-4 text-[11px] font-semibold uppercase tracking-wider opacity-30">Peso</TableHead>
                    <TableHead className="text-right pr-6 py-4 text-[11px] font-semibold uppercase tracking-wider opacity-30">Recompensa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transacciones.map((row) => (
                    <TableRow key={row.id} className="border-border/20 hover:bg-muted/20 transition-colors group">
                      <TableCell className="pl-6 py-4">
                        <p className="font-bold text-xs text-foreground/80 group-hover:text-secondary transition-colors">{row.punto_ameru || 'Punto Ameru'}</p>
                        <p className="text-[11px] text-muted-foreground">{new Date(row.fecha_reciclaje).toLocaleDateString('es-VE')}</p>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="text-[10px] font-bold uppercase border-secondary/20 text-secondary bg-secondary/5">
                          {MATERIALES.find(m => m.value === row.tipo_material)?.label || row.tipo_material}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center py-4 font-mono text-xs font-bold text-foreground/60">{parseFloat(row.peso_kg).toFixed(1)} kg</TableCell>
                      <TableCell className="text-right pr-6 py-4 font-bold text-lg text-secondary tracking-tight">+{parseFloat(row.eco_creditos).toFixed(0)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          {transacciones.length > 0 && (
            <CardFooter className="p-5 bg-muted/10 border-t border-border/20 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-muted-foreground/40">
                <Terminal className="h-3.5 w-3.5" /> Sello Blockchain RFC 3161
              </div>
              <Button variant="outline" size="sm" className="h-8 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider">Ver Ledger</Button>
            </CardFooter>
          )}
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Coins className="h-24 w-24" /></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <h3 className="text-sm font-semibold uppercase tracking-tight mb-2">Canje de Activos</h3>
            <p className="text-[11px] opacity-80 leading-relaxed mb-5">Utilice sus Eco-Créditos para liquidar facturas de telecomunicaciones o inyectar liquidez.</p>
            <Button variant="secondary" size="sm" className="bg-white text-emerald-700 font-bold text-[10px] uppercase tracking-wider rounded-xl h-9 px-5 hover:bg-white/90">ACCEDER AL EXCHANGE</Button>
          </Card>

          <Card className="glass-card border-none p-5 rounded-2xl bg-card/50">
            <h4 className="text-[10px] font-semibold uppercase tracking-wide text-secondary mb-6 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" /> Resumen de Cuenta
            </h4>
            <div className="space-y-4">
              {[
                { label: "Total Reciclado", val: `${totalKg.toFixed(1)} kg`, color: "text-emerald-500" },
                { label: "Nivel Actual", val: nivel.charAt(0).toUpperCase() + nivel.slice(1), color: NIVEL_COLORS[nivel] || "text-secondary" },
                { label: "Registros", val: `${transacciones.length} actividades`, color: "text-secondary" },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center border-b border-border/15 pb-3 last:border-none last:pb-0">
                  <span className="text-[10px] font-bold text-muted-foreground">{stat.label}</span>
                  <span className={cn("text-xs font-semibold uppercase", stat.color)}>{stat.val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold uppercase tracking-wider">Registrar Reciclaje</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Material *</Label>
              <Select value={form.tipo_material} onValueChange={v => setForm(f => ({ ...f, tipo_material: v }))}>
                <SelectTrigger className="rounded-lg text-xs h-9"><SelectValue placeholder="Seleccionar material" /></SelectTrigger>
                <SelectContent>
                  {MATERIALES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Peso (kg) *</Label>
              <Input type="number" step="0.1" min="0.1" value={form.peso_kg} onChange={e => setForm(f => ({ ...f, peso_kg: e.target.value }))} placeholder="Ej: 2.5" className="rounded-lg text-xs h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Punto Ameru (opcional)</Label>
              <Input value={form.punto_ameru} onChange={e => setForm(f => ({ ...f, punto_ameru: e.target.value }))} placeholder="Ej: Ameru IA - Sede A" className="rounded-lg text-xs h-9" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-lg text-xs">Cancelar</Button>
            <Button onClick={handleSubmit} disabled={saving} className="rounded-lg text-xs bg-secondary hover:bg-secondary/90 text-white">
              {saving && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

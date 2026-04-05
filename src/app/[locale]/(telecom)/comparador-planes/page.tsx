'use client';

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Smartphone, Signal, Wifi, Globe, DollarSign, Check, X,
  ArrowLeft, Activity, Zap, Phone, MessageSquare, Star, Crown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

type Plan = {
  id: string;
  operator: string;
  operatorColor: string;
  name: string;
  price: number;
  data: number;
  minutes: string;
  sms: string;
  has5G: boolean;
  roaming: boolean;
  extras: string[];
  category: string[];
};

const PLANS: Plan[] = [
  {
    id: "movistar-basico",
    operator: "Movistar",
    operatorColor: "bg-blue-500",
    name: "Plan Básico",
    price: 5,
    data: 3,
    minutes: "100 min",
    sms: "50 SMS",
    has5G: false,
    roaming: false,
    extras: ["Llamadas nacionales"],
    category: ["basico"],
  },
  {
    id: "movistar-plus",
    operator: "Movistar",
    operatorColor: "bg-blue-500",
    name: "Plan Plus",
    price: 10,
    data: 10,
    minutes: "Ilimitadas",
    sms: "Ilimitados",
    has5G: false,
    roaming: true,
    extras: ["Redes sociales ilimitadas", "Llamadas nacionales"],
    category: ["basico", "social", "trabajo"],
  },
  {
    id: "movistar-premium",
    operator: "Movistar",
    operatorColor: "bg-blue-500",
    name: "Plan Premium",
    price: 20,
    data: 30,
    minutes: "Ilimitadas",
    sms: "Ilimitados",
    has5G: true,
    roaming: true,
    extras: ["Redes sociales ilimitadas", "Streaming HD", "Hotspot incluido", "Roaming Latam"],
    category: ["social", "trabajo", "gaming"],
  },
  {
    id: "digitel-conecta",
    operator: "Digitel",
    operatorColor: "bg-red-500",
    name: "Plan Conecta",
    price: 4,
    data: 2,
    minutes: "80 min",
    sms: "30 SMS",
    has5G: false,
    roaming: false,
    extras: ["WhatsApp incluido"],
    category: ["basico"],
  },
  {
    id: "digitel-max",
    operator: "Digitel",
    operatorColor: "bg-red-500",
    name: "Plan Max",
    price: 9,
    data: 8,
    minutes: "Ilimitadas",
    sms: "Ilimitados",
    has5G: false,
    roaming: true,
    extras: ["Redes sociales ilimitadas", "Música streaming"],
    category: ["basico", "social", "trabajo"],
  },
  {
    id: "digitel-ultra",
    operator: "Digitel",
    operatorColor: "bg-red-500",
    name: "Plan Ultra",
    price: 18,
    data: 25,
    minutes: "Ilimitadas",
    sms: "Ilimitados",
    has5G: true,
    roaming: true,
    extras: ["Redes sociales ilimitadas", "Streaming 4K", "Cloud 50GB", "Roaming USA"],
    category: ["social", "trabajo", "gaming"],
  },
  {
    id: "movilnet-popular",
    operator: "Movilnet",
    operatorColor: "bg-orange-500",
    name: "Plan Popular",
    price: 3,
    data: 1,
    minutes: "50 min",
    sms: "20 SMS",
    has5G: false,
    roaming: false,
    extras: ["Llamadas nacionales"],
    category: ["basico"],
  },
  {
    id: "movilnet-avanzado",
    operator: "Movilnet",
    operatorColor: "bg-orange-500",
    name: "Plan Avanzado",
    price: 7,
    data: 5,
    minutes: "Ilimitadas",
    sms: "Ilimitados",
    has5G: false,
    roaming: false,
    extras: ["Redes sociales básicas", "Llamadas nacionales"],
    category: ["basico", "social"],
  },
  {
    id: "movilnet-total",
    operator: "Movilnet",
    operatorColor: "bg-orange-500",
    name: "Plan Total",
    price: 15,
    data: 20,
    minutes: "Ilimitadas",
    sms: "Ilimitados",
    has5G: false,
    roaming: true,
    extras: ["Redes sociales ilimitadas", "Streaming HD", "Hotspot incluido"],
    category: ["social", "trabajo", "gaming"],
  },
];

const CATEGORIES = [
  { id: "todos", label: "Todos", icon: Signal },
  { id: "basico", label: "Uso básico", icon: Phone },
  { id: "social", label: "Redes sociales", icon: MessageSquare },
  { id: "trabajo", label: "Trabajo remoto", icon: Globe },
  { id: "gaming", label: "Gaming/Streaming", icon: Zap },
];

const OPERATOR_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Movistar: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  Digitel: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  Movilnet: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
};

export default function ComparadorPlanesPage() {
  const [selectedPlans, setSelectedPlans] = useState<string[]>(["movistar-plus", "digitel-max", "movilnet-avanzado"]);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [dataUsage, setDataUsage] = useState(5);
  const [only5G, setOnly5G] = useState(false);

  const filteredPlans = useMemo(() => {
    let plans = PLANS;
    if (activeCategory !== "todos") {
      plans = plans.filter(p => p.category.includes(activeCategory));
    }
    if (only5G) {
      plans = plans.filter(p => p.has5G);
    }
    return plans;
  }, [activeCategory, only5G]);

  const comparedPlans = useMemo(() => {
    return selectedPlans.map(id => PLANS.find(p => p.id === id)).filter(Boolean) as Plan[];
  }, [selectedPlans]);

  const bestValueId = useMemo(() => {
    if (comparedPlans.length === 0) return null;
    let best = comparedPlans[0];
    for (const p of comparedPlans) {
      if (p.data / p.price > best.data / best.price) {
        best = p;
      }
    }
    return best.id;
  }, [comparedPlans]);

  const fittingPlans = useMemo(() => {
    return PLANS.filter(p => p.data >= dataUsage).sort((a, b) => a.price - b.price);
  }, [dataUsage]);

  const handleSelectPlan = (index: number, planId: string) => {
    setSelectedPlans(prev => {
      const next = [...prev];
      next[index] = planId;
      return next;
    });
  };

  const addSlot = () => {
    if (selectedPlans.length < 3) {
      const used = new Set(selectedPlans);
      const available = PLANS.find(p => !used.has(p.id));
      if (available) {
        setSelectedPlans(prev => [...prev, available.id]);
      }
    }
  };

  const removeSlot = (index: number) => {
    if (selectedPlans.length > 2) {
      setSelectedPlans(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <Link href="/mi-linea">
          <Button variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground hover:text-foreground rounded-lg text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Mi Línea
          </Button>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-cyan-400" />
          <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-widest border-cyan-500/30 text-cyan-400">
            COMPARADOR DE PLANES
          </Badge>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
        >
          Encuentra el Plan Perfecto para Ti
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground mt-1"
        >
          Compara planes de Movistar, Digitel y Movilnet — Venezuela
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap items-center gap-2"
      >
        {CATEGORIES.map(cat => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "rounded-lg text-xs gap-1.5 h-8 transition-all",
              activeCategory === cat.id
                ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/20"
                : "border-border/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </Button>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-muted-foreground">Solo 5G</span>
          <Switch checked={only5G} onCheckedChange={setOnly5G} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Calculadora de Consumo</CardTitle>
                <p className="text-[10px] text-muted-foreground mt-0.5">¿Cuántos GB necesitas al mes?</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Wifi className="h-4 w-4 text-cyan-400 shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={dataUsage}
                  onChange={e => setDataUsage(Number(e.target.value))}
                  className="flex-1 h-2 bg-muted/50 rounded-full appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/30"
                />
                <span className="text-sm font-bold text-cyan-400 tabular-nums min-w-[60px] text-right">{dataUsage} GB</span>
              </div>
              {fittingPlans.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground mr-1">Planes que cubren tu consumo:</span>
                  {fittingPlans.map(p => {
                    const style = OPERATOR_STYLES[p.operator];
                    return (
                      <Badge key={p.id} variant="outline" className={cn("text-[10px] px-2 py-0.5 rounded-md", style.bg, style.text, style.border)}>
                        {p.operator} {p.name} — ${p.price}/mes
                      </Badge>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground/60">Ningún plan cubre {dataUsage} GB. Considera un plan empresarial.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Star className="h-4 w-4 text-cyan-400" />
            Comparación de Planes
          </h2>
          {selectedPlans.length < 3 && (
            <Button variant="outline" size="sm" onClick={addSlot} className="rounded-lg text-xs border-border/50 text-muted-foreground hover:text-foreground">
              + Agregar plan
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedPlans.map((planId, index) => {
            const plan = PLANS.find(p => p.id === planId);
            if (!plan) return null;
            const isBestValue = plan.id === bestValueId;
            const style = OPERATOR_STYLES[plan.operator];
            const gbPerDollar = (plan.data / plan.price).toFixed(2);

            return (
              <motion.div
                key={`slot-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className={cn(
                  "bg-card/60 border rounded-xl overflow-hidden relative group hover:-translate-y-1 transition-all duration-300",
                  isBestValue ? "border-cyan-500/50 ring-1 ring-cyan-500/20" : "border-border/50"
                )}>
                  {isBestValue && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400" />
                  )}

                  {isBestValue && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-3 right-3 z-10"
                    >
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-[11px] font-bold gap-1 px-2 py-0.5">
                        <Crown className="h-3 w-3" /> Mejor Valor
                      </Badge>
                    </motion.div>
                  )}

                  <CardHeader className="px-4 pt-4 pb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <Select value={planId} onValueChange={(val) => handleSelectPlan(index, val)}>
                        <SelectTrigger className="w-full h-8 rounded-lg text-xs border-border/50 bg-muted/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg bg-card border-border">
                          {filteredPlans.map(p => (
                            <SelectItem key={p.id} value={p.id} className="text-xs">
                              {p.operator} — {p.name} (${p.price}/mes)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedPlans.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSlot(index)}
                          className="h-7 w-7 ml-1 rounded-md text-muted-foreground hover:text-rose-400 shrink-0"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={cn("p-1.5 rounded-lg", style.bg)}>
                        <Smartphone className={cn("h-4 w-4", style.text)} />
                      </div>
                      <div>
                        <Badge variant="outline" className={cn("text-[11px] font-semibold px-2 py-0 rounded-md", style.bg, style.text, style.border)}>
                          {plan.operator}
                        </Badge>
                        <p className="text-sm font-bold text-foreground mt-0.5">{plan.name}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 pb-4 space-y-4">
                    <div className="text-center py-3 bg-muted/10 rounded-lg border border-border/30">
                      <p className="text-3xl font-bold text-foreground tabular-nums">
                        ${plan.price}
                        <span className="text-xs font-normal text-muted-foreground">/mes</span>
                      </p>
                      <p className="text-[10px] text-cyan-400 font-medium mt-1">{gbPerDollar} GB por dólar</p>
                    </div>

                    <div className="space-y-2.5">
                      <FeatureRow icon={Wifi} label="Datos" value={`${plan.data} GB`} />
                      <FeatureRow icon={Phone} label="Minutos" value={plan.minutes} />
                      <FeatureRow icon={MessageSquare} label="SMS" value={plan.sms} />
                      <FeatureCheck icon={Zap} label="Red 5G" enabled={plan.has5G} />
                      <FeatureCheck icon={Globe} label="Roaming" enabled={plan.roaming} />
                    </div>

                    {plan.extras.length > 0 && (
                      <div className="pt-2 border-t border-border/30 space-y-1.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Extras</p>
                        {plan.extras.map((extra, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span className="text-xs text-foreground/70">{extra}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      className={cn(
                        "w-full rounded-lg text-xs font-semibold h-9 transition-all",
                        isBestValue
                          ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/20"
                          : "bg-muted/20 hover:bg-muted/40 text-foreground border border-border/50"
                      )}
                    >
                      {isBestValue ? "★ Plan Recomendado" : "Seleccionar Plan"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Signal className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Todos los Planes Disponibles</CardTitle>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {filteredPlans.length} plan{filteredPlans.length !== 1 ? "es" : ""} disponible{filteredPlans.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredPlans.map((plan, i) => {
                const style = OPERATOR_STYLES[plan.operator];
                const isSelected = selectedPlans.includes(plan.id);
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-lg border transition-all cursor-pointer hover:-translate-y-0.5",
                        isSelected
                          ? "border-cyan-500/40 bg-cyan-500/5 ring-1 ring-cyan-500/10"
                          : "border-border/30 bg-muted/5 hover:border-border/60"
                      )}
                      onClick={() => {
                        if (!isSelected && selectedPlans.length < 3) {
                          setSelectedPlans(prev => {
                            const next = [...prev];
                            const emptyIdx = next.findIndex((_, idx) => idx >= next.length);
                            if (emptyIdx === -1) next.push(plan.id);
                            else next[emptyIdx] = plan.id;
                            return next;
                          });
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={cn("text-[11px] px-1.5 py-0 rounded-md", style.bg, style.text, style.border)}>
                          {plan.operator}
                        </Badge>
                        <span className="text-sm font-bold text-foreground tabular-nums">${plan.price}</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{plan.name}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Wifi className="h-3 w-3" />{plan.data} GB</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{plan.minutes}</span>
                        {plan.has5G && <span className="flex items-center gap-1 text-cyan-400"><Zap className="h-3 w-3" />5G</span>}
                      </div>
                      {isSelected && (
                        <Badge className="mt-2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[11px]">
                          En comparación
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function FeatureRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs font-semibold text-foreground">{value}</span>
    </div>
  );
}

function FeatureCheck({ icon: Icon, label, enabled }: { icon: React.ElementType; label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      {enabled ? (
        <Check className="h-4 w-4 text-emerald-500" />
      ) : (
        <X className="h-4 w-4 text-rose-500/60" />
      )}
    </div>
  );
}

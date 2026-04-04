"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Smartphone, ShoppingCart, CircleCheck, DollarSign,
  Search, Filter, Star, Plus, Download, Shield
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Equipo {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  precio: number;
  precioDescuento: number | null;
  homologado: boolean;
  red5G: boolean;
  ram: string;
  almacenamiento: string;
  pantalla: string;
  bateria: string;
  rating: number;
  stock: number;
  imagen: string;
}

const MOCK_EQUIPOS: Equipo[] = [
  { id: "E1", nombre: "iPhone 16 Pro", marca: "Apple", modelo: "A3078", precio: 1199, precioDescuento: 1099, homologado: true, red5G: true, ram: "8 GB", almacenamiento: "256 GB", pantalla: "6.3\"", bateria: "4685 mAh", rating: 4.8, stock: 15, imagen: "" },
  { id: "E2", nombre: "Galaxy S25 Ultra", marca: "Samsung", modelo: "SM-S938", precio: 1299, precioDescuento: null, homologado: true, red5G: true, ram: "12 GB", almacenamiento: "512 GB", pantalla: "6.9\"", bateria: "5000 mAh", rating: 4.7, stock: 8, imagen: "" },
  { id: "E3", nombre: "Pixel 9 Pro", marca: "Google", modelo: "G4HPD", precio: 999, precioDescuento: 899, homologado: true, red5G: true, ram: "16 GB", almacenamiento: "256 GB", pantalla: "6.3\"", bateria: "4700 mAh", rating: 4.6, stock: 12, imagen: "" },
  { id: "E4", nombre: "Galaxy A55", marca: "Samsung", modelo: "SM-A556", precio: 449, precioDescuento: 399, homologado: true, red5G: true, ram: "8 GB", almacenamiento: "128 GB", pantalla: "6.6\"", bateria: "5000 mAh", rating: 4.3, stock: 25, imagen: "" },
  { id: "E5", nombre: "Redmi Note 14 Pro", marca: "Xiaomi", modelo: "24117RK66G", precio: 349, precioDescuento: null, homologado: false, red5G: true, ram: "8 GB", almacenamiento: "256 GB", pantalla: "6.67\"", bateria: "5500 mAh", rating: 4.4, stock: 0, imagen: "" },
  { id: "E6", nombre: "Motorola Edge 50", marca: "Motorola", modelo: "XT2451", precio: 599, precioDescuento: 549, homologado: true, red5G: true, ram: "8 GB", almacenamiento: "256 GB", pantalla: "6.7\"", bateria: "5000 mAh", rating: 4.2, stock: 10, imagen: "" },
];

export default function CotizadorEquiposPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [carrito, setCarrito] = useState<{ id: string; cantidad: number }[]>([]);

  const filtrados = MOCK_EQUIPOS.filter(e => {
    const matchSearch = e.nombre.toLowerCase().includes(search.toLowerCase()) || e.marca.toLowerCase().includes(search.toLowerCase());
    if (filtro === "homologados") return matchSearch && e.homologado;
    if (filtro === "5g") return matchSearch && e.red5G;
    if (filtro === "stock") return matchSearch && e.stock > 0;
    return matchSearch;
  });

  const totalCarrito = carrito.reduce((s, c) => {
    const eq = MOCK_EQUIPOS.find(e => e.id === c.id);
    if (!eq) return s;
    return s + (eq.precioDescuento || eq.precio) * c.cantidad;
  }, 0);

  const addToCart = (equipo: Equipo) => {
    setCarrito(prev => {
      const existing = prev.find(c => c.id === equipo.id);
      if (existing) return prev.map(c => c.id === equipo.id ? { ...c, cantidad: c.cantidad + 1 } : c);
      return [...prev, { id: equipo.id, cantidad: 1 }];
    });
    toast({ title: "Agregado al Cotizador", description: `${equipo.nombre} añadido a la cotización.` });
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Smartphone className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Cotizador de Equipos</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Catálogo de equipos homologados CONATEL con cotización masiva.</p>
        </div>
        <div className="flex items-center gap-2">
          {carrito.length > 0 && (
            <Badge className="bg-primary text-primary-foreground text-[10px] px-2.5 py-1">
              <ShoppingCart className="mr-1 h-3 w-3" /> {carrito.reduce((s, c) => s + c.cantidad, 0)} equipos · {formatCurrency(totalCarrito, 'USD')}
            </Badge>
          )}
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar PDF
          </Button>
        </div>
      </header>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
          <Input placeholder="Buscar equipo, marca..." value={search} onChange={e => setSearch(e.target.value)} className="h-9 pl-9 rounded-lg text-xs" />
        </div>
        <div className="flex gap-1.5">
          {[
            { value: "todos", label: "Todos" },
            { value: "homologados", label: "Homologados" },
            { value: "5g", label: "5G" },
            { value: "stock", label: "En Stock" },
          ].map(f => (
            <Button key={f.value} variant={filtro === f.value ? "default" : "outline"} size="sm" className="h-8 px-3 rounded-lg text-[10px] font-semibold"
              onClick={() => setFiltro(f.value)}>
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map((eq, i) => (
          <motion.div key={eq.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className={cn("bg-card/60 border border-border/50 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300", !eq.homologado && "opacity-75")}>
              <div className="h-32 bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center relative">
                <Smartphone className="h-14 w-14 text-primary/20" />
                <div className="absolute top-2 left-2 flex gap-1">
                  {eq.homologado && (
                    <Badge className="text-[8px] px-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <Shield className="h-2 w-2 mr-0.5" /> CONATEL
                    </Badge>
                  )}
                  {eq.red5G && <Badge className="text-[8px] px-1.5 bg-primary/10 text-primary border border-primary/20">5G</Badge>}
                </div>
                {eq.precioDescuento && (
                  <Badge className="absolute top-2 right-2 text-[8px] px-1.5 bg-rose-500 text-white">
                    -{Math.round(((eq.precio - eq.precioDescuento) / eq.precio) * 100)}%
                  </Badge>
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">{eq.marca}</p>
                  <p className="text-sm font-bold text-foreground">{eq.nombre}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={cn("h-2.5 w-2.5", si < Math.floor(eq.rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30")} />
                    ))}
                    <span className="text-[9px] text-muted-foreground ml-1">{eq.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                  <div className="p-1.5 rounded bg-muted/10 text-center"><span className="text-muted-foreground">RAM</span><br /><span className="font-bold text-foreground">{eq.ram}</span></div>
                  <div className="p-1.5 rounded bg-muted/10 text-center"><span className="text-muted-foreground">Storage</span><br /><span className="font-bold text-foreground">{eq.almacenamiento}</span></div>
                  <div className="p-1.5 rounded bg-muted/10 text-center"><span className="text-muted-foreground">Pantalla</span><br /><span className="font-bold text-foreground">{eq.pantalla}</span></div>
                  <div className="p-1.5 rounded bg-muted/10 text-center"><span className="text-muted-foreground">Batería</span><br /><span className="font-bold text-foreground">{eq.bateria}</span></div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {eq.precioDescuento ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-black text-primary">{formatCurrency(eq.precioDescuento, 'USD')}</span>
                        <span className="text-xs text-muted-foreground line-through">{formatCurrency(eq.precio, 'USD')}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-black text-primary">{formatCurrency(eq.precio, 'USD')}</span>
                    )}
                  </div>
                  <Badge variant="outline" className={cn("text-[9px]", eq.stock > 0 ? "text-emerald-500 border-emerald-500/20" : "text-rose-500 border-rose-500/20")}>
                    {eq.stock > 0 ? `${eq.stock} en stock` : "Agotado"}
                  </Badge>
                </div>

                <Button
                  className="w-full h-9 rounded-lg text-xs font-semibold"
                  disabled={eq.stock === 0 || !eq.homologado}
                  onClick={() => addToCart(eq)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  {!eq.homologado ? "No Homologado" : eq.stock === 0 ? "Agotado" : "Agregar a Cotización"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {!MOCK_EQUIPOS.every(e => e.homologado) && (
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-500">Equipos No Homologados</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Los equipos sin homologación CONATEL no pueden ser cotizados ni adquiridos para uso en redes
              venezolanas. Conforme a la LOTEL Art. 15-25, todos los equipos de telecomunicaciones deben
              contar con certificación vigente del ente regulador.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
